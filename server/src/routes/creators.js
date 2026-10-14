import express from 'express';
import { 
  creators, 
  campaigns, 
  updateCreator, 
  addProjectToCreator, 
  updateProjectInCreator, 
  removeProjectFromCreator, 
  syncCreatorSocial, 
  updateCreatorTheme 
} from '../data/mockStore.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// ─── MATCH SCORE ALGORITHM v2 ────────────────────────────────────────────────
// CamFlow multi-factor affinity engine:
// Base 50 pts + Tag Jaccard Similarity (25) + Category Alignment (15) + Demographics (10) + Authenticity (5)
export function calculateMatchScore(creator, campaign) {
  let score = 50; // base score

  // 1. Tag Jaccard Similarity (max +25 points)
  // Jaccard = |intersection| / |union|
  if (campaign.tags && creator.tags) {
    const creatorTagsLower = creator.tags.map(t => t.toLowerCase());
    const campaignTagsLower = campaign.tags.map(t => t.toLowerCase());
    const intersection = creatorTagsLower.filter(t => campaignTagsLower.includes(t));
    const union = new Set([...creatorTagsLower, ...campaignTagsLower]);
    const jaccard = intersection.length / union.size;
    score += Math.round(jaccard * 25);
  }

  // 2. Category Alignment (max +15 points)
  if (campaign.productCategory && creator.category) {
    const creatorCat = creator.category.toLowerCase();
    const campCat = campaign.productCategory.toLowerCase();
    if (creatorCat.includes(campCat) || campCat.includes(creatorCat)) {
      score += 15;
    } else {
      // Partial word overlap
      const campWords = campCat.split(/[\s&]+/).filter(w => w.length > 3);
      const hasPartial = campWords.some(w => creatorCat.includes(w));
      if (hasPartial) score += 7;
    }
  }

  // 3. Audience Demographics (max +10 points)
  if (campaign.targetDemographics && creator.socialStats?.demographics) {
    const creatorAges = creator.socialStats.demographics.ageGroups || [];
    const targetAge = campaign.targetDemographics.targetAge;
    const targetAgeGroup = creatorAges.find(a => a.group === targetAge);
    
    if (targetAgeGroup && targetAgeGroup.percent >= 40) {
      score += 8;
    } else if (targetAgeGroup && targetAgeGroup.percent >= 25) {
      score += 4;
    }

    // Gender affinity bonus (max +2)
    const gender = creator.socialStats.demographics.gender;
    const targetGender = campaign.targetDemographics.targetGender;
    if (targetGender === 'female' && gender?.female >= 60) score += 2;
    if (targetGender === 'male' && gender?.male >= 60) score += 2;
  }

  // 4. Authenticity Bonus (max +5 points)
  const authScore = creator.socialStats?.authenticityScore || 0;
  const minAuth = campaign.targetDemographics?.minAuthenticity || 90;
  if (authScore >= 95) {
    score += 5;
  } else if (authScore >= minAuth) {
    score += 3;
  }

  return Math.min(score, 99); // capped at 99 — no creator is a "perfect" match
}

// Helper: parse engagement rate string to float
function parseEngagement(str) {
  return parseFloat((str || '0').replace('%', '')) || 0;
}

// Helper: parse rate string to numeric (e.g. "₹1,50,000 / project" → 150000)
function parseRate(str) {
  if (!str) return 150000;
  return parseInt(str.replace(/[^0-9]/g, ''), 10) || 150000;
}

// ─── ROUTES ──────────────────────────────────────────────────────────────────

// GET /api/creators — Full directory with match scoring, multi-filter support
router.get('/', (req, res) => {
  const { 
    campaignId, 
    search,
    tags,          // comma-separated tag list
    budgetMin,     // numeric
    budgetMax,     // numeric
    minMatch,      // 0-99
    minAuthenticity,
    minEngagement,
    sortBy         // matchScore | engagement | authenticity | rating
  } = req.query;

  const activeCampaign = campaigns.find(c => c.id === campaignId) || campaigns[0];

  // Step 1: Score all creators
  let results = creators.map(creator => {
    const matchScore = calculateMatchScore(creator, activeCampaign);
    return {
      ...creator,
      calculatedMatchScore: matchScore,
      matchReason: `${matchScore}% Match for ${activeCampaign.title}`
    };
  });

  // Step 2: Apply filters
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.handle.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (tags) {
    const tagList = tags.split(',').map(t => t.trim().toLowerCase());
    results = results.filter(c =>
      tagList.every(ft => c.tags.some(t => t.toLowerCase() === ft))
    );
  }

  if (minMatch) {
    results = results.filter(c => c.calculatedMatchScore >= Number(minMatch));
  }

  if (minAuthenticity) {
    results = results.filter(c => (c.socialStats?.authenticityScore || 0) >= Number(minAuthenticity));
  }

  if (minEngagement) {
    results = results.filter(c => parseEngagement(c.socialStats?.engagementRate) >= Number(minEngagement));
  }

  if (budgetMin || budgetMax) {
    const min = Number(budgetMin) || 0;
    const max = Number(budgetMax) || Infinity;
    results = results.filter(c => {
      const rate = parseRate(c.startingRate);
      return rate >= min && rate <= max;
    });
  }

  // Step 3: Sort
  const sort = sortBy || 'matchScore';
  results = results.sort((a, b) => {
    switch (sort) {
      case 'engagement':
        return parseEngagement(b.socialStats?.engagementRate) - parseEngagement(a.socialStats?.engagementRate);
      case 'authenticity':
        return (b.socialStats?.authenticityScore || 0) - (a.socialStats?.authenticityScore || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return b.calculatedMatchScore - a.calculatedMatchScore;
    }
  });

  res.json({
    success: true,
    total: results.length,
    activeCampaignContext: {
      id: activeCampaign.id,
      title: activeCampaign.title,
      budget: activeCampaign.budget,
      tags: activeCampaign.tags
    },
    creators: results
  });
});

// GET /api/creators/leaderboard — Top 10 by match score against selected campaign
router.get('/leaderboard', (req, res) => {
  const { campaignId } = req.query;
  const activeCampaign = campaigns.find(c => c.id === campaignId) || campaigns[0];

  const ranked = creators
    .map(creator => ({
      id: creator.id,
      name: creator.name,
      handle: creator.handle,
      avatar: creator.avatar,
      category: creator.category,
      matchScore: calculateMatchScore(creator, activeCampaign),
      engagementRate: creator.socialStats?.engagementRate,
      authenticityScore: creator.socialStats?.authenticityScore,
      rating: creator.rating,
      startingRate: creator.startingRate
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10);

  res.json({
    success: true,
    campaign: activeCampaign.title,
    leaderboard: ranked
  });
});

// GET /api/creators/:id — Single creator with match score
router.get('/:id', (req, res) => {
  const creator = creators.find(c => c.id === req.params.id);
  if (!creator) {
    return res.status(404).json({ success: false, message: 'Creator not found' });
  }

  const defaultCampaign = campaigns[0];
  const matchScore = calculateMatchScore(creator, defaultCampaign);

  res.json({
    success: true,
    creator: {
      ...creator,
      calculatedMatchScore: matchScore,
      matchReason: `${matchScore}% Match for ${defaultCampaign.title}`
    }
  });
});

// PUT /api/creators/:id — Update creator portfolio details
router.put('/:id', requireAuth, (req, res) => {
  const updatedCreator = updateCreator(req.params.id, req.body);
  if (!updatedCreator) {
    return res.status(404).json({ success: false, message: 'Creator not found' });
  }
  res.json({ success: true, message: 'Creator portfolio updated successfully', creator: updatedCreator });
});

// POST /api/creators/:id/projects — Add a showcase project
router.post('/:id/projects', requireAuth, (req, res) => {
  const result = addProjectToCreator(req.params.id, req.body);
  if (!result) {
    return res.status(404).json({ success: false, message: 'Creator not found' });
  }
  res.status(201).json({ success: true, message: 'Project added to portfolio', project: result.project, creator: result.creator });
});

// PUT /api/creators/:id/projects/:projectId — Update a showcase project
router.put('/:id/projects/:projectId', requireAuth, (req, res) => {
  const { id: creatorId, projectId } = req.params;
  const result = updateProjectInCreator(creatorId, projectId, req.body);
  if (!result) {
    return res.status(404).json({ success: false, message: 'Creator or project not found' });
  }
  res.json({ success: true, message: 'Project updated', project: result.project, creator: result.creator });
});

// DELETE /api/creators/:id/projects/:projectId — Remove a project
router.delete('/:id/projects/:projectId', requireAuth, (req, res) => {
  const { id: creatorId, projectId } = req.params;
  const updatedCreator = removeProjectFromCreator(creatorId, projectId);
  if (!updatedCreator) {
    return res.status(404).json({ success: false, message: 'Creator not found' });
  }
  res.json({ success: true, message: 'Project removed', creator: updatedCreator });
});

// POST /api/creators/:id/sync-social — Live social handle sync
router.post('/:id/sync-social', requireAuth, (req, res) => {
  const { platform = 'instagram', handle } = req.body;
  const updatedCreator = syncCreatorSocial(req.params.id, { platform, handle });
  if (!updatedCreator) {
    return res.status(404).json({ success: false, message: 'Creator not found' });
  }
  res.json({ success: true, message: `Synced live metrics from ${platform}`, socialStats: updatedCreator.socialStats, creator: updatedCreator });
});

// PATCH /api/creators/:id/theme — Update editorial palette
router.patch('/:id/theme', requireAuth, (req, res) => {
  const { theme = 'sage' } = req.body;
  const updatedCreator = updateCreatorTheme(req.params.id, theme);
  if (!updatedCreator) {
    return res.status(404).json({ success: false, message: 'Creator not found' });
  }
  res.json({ success: true, message: `Theme updated to ${theme}`, theme: updatedCreator.theme, creator: updatedCreator });
});

export default router;
