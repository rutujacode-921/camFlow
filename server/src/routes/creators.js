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

// Algorithm to calculate AI Match Score between a Brand Campaign and a Creator
export function calculateMatchScore(creator, campaign) {
  let score = 50; // base score

  // 1. Tag overlap calculation (max +25 points)
  if (campaign.tags && creator.tags) {
    const matchingTags = creator.tags.filter(tag => 
      campaign.tags.some(ct => ct.toLowerCase() === tag.toLowerCase())
    );
    const tagRatio = matchingTags.length / Math.max(campaign.tags.length, 1);
    score += Math.round(tagRatio * 25);
  }

  // 2. Category alignment (max +15 points)
  if (campaign.productCategory && creator.category) {
    if (creator.category.toLowerCase().includes(campaign.productCategory.toLowerCase()) ||
        campaign.productCategory.toLowerCase().includes(creator.category.toLowerCase())) {
      score += 15;
    }
  }

  // 3. Demographics matching (max +10 points)
  if (campaign.targetDemographics && creator.socialStats?.demographics) {
    const creatorAges = creator.socialStats.demographics.ageGroups;
    const targetAgeGroup = creatorAges.find(a => a.group === campaign.targetDemographics.targetAge);
    if (targetAgeGroup && targetAgeGroup.percent >= 40) {
      score += 10;
    } else if (targetAgeGroup) {
      score += 5;
    }
  }

  // 4. Authenticity bonus (max +5 points)
  if (creator.socialStats?.authenticityScore >= 95) {
    score += 5;
  }

  return Math.min(score, 99); // capped at 99% for authenticity
}

// GET all creators with optional match score against an active campaign
router.get('/', (req, res) => {
  const { campaignId, category, search } = req.query;
  const activeCampaign = campaigns.find(c => c.id === campaignId) || campaigns[0];

  let results = creators.map(creator => {
    const matchScore = calculateMatchScore(creator, activeCampaign);
    return {
      ...creator,
      calculatedMatchScore: matchScore,
      matchReason: `${matchScore}% Match for ${activeCampaign.title}`
    };
  });

  if (category && category !== 'All') {
    results = results.filter(c => c.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.handle.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  res.json({
    success: true,
    total: results.length,
    activeCampaignContext: activeCampaign,
    creators: results
  });
});

// GET creator by ID
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
      matchReason: `${matchScore}% Match for your Eco-Friendly Skincare Campaign`
    }
  });
});

// PUT /api/creators/:id — Update creator portfolio details
router.put('/:id', requireAuth, (req, res) => {
  const creatorId = req.params.id;
  const updatedCreator = updateCreator(creatorId, req.body);

  if (!updatedCreator) {
    return res.status(404).json({ success: false, message: 'Creator not found' });
  }

  res.json({
    success: true,
    message: 'Creator portfolio updated successfully',
    creator: updatedCreator
  });
});

// POST /api/creators/:id/projects — Add a showcase project
router.post('/:id/projects', requireAuth, (req, res) => {
  const creatorId = req.params.id;
  const result = addProjectToCreator(creatorId, req.body);

  if (!result) {
    return res.status(404).json({ success: false, message: 'Creator not found' });
  }

  res.status(201).json({
    success: true,
    message: 'New showcase project added to portfolio',
    project: result.project,
    creator: result.creator
  });
});

// PUT /api/creators/:id/projects/:projectId — Update a showcase project
router.put('/:id/projects/:projectId', requireAuth, (req, res) => {
  const { id: creatorId, projectId } = req.params;
  const result = updateProjectInCreator(creatorId, projectId, req.body);

  if (!result) {
    return res.status(404).json({ success: false, message: 'Creator or project not found' });
  }

  res.json({
    success: true,
    message: 'Showcase project updated',
    project: result.project,
    creator: result.creator
  });
});

// DELETE /api/creators/:id/projects/:projectId — Remove a showcase project
router.delete('/:id/projects/:projectId', requireAuth, (req, res) => {
  const { id: creatorId, projectId } = req.params;
  const updatedCreator = removeProjectFromCreator(creatorId, projectId);

  if (!updatedCreator) {
    return res.status(404).json({ success: false, message: 'Creator not found' });
  }

  res.json({
    success: true,
    message: 'Project removed from portfolio',
    creator: updatedCreator
  });
});

// POST /api/creators/:id/sync-social — Live social handle sync & metrics simulation
router.post('/:id/sync-social', requireAuth, (req, res) => {
  const creatorId = req.params.id;
  const { platform = 'instagram', handle } = req.body;
  const updatedCreator = syncCreatorSocial(creatorId, { platform, handle });

  if (!updatedCreator) {
    return res.status(404).json({ success: false, message: 'Creator not found' });
  }

  res.json({
    success: true,
    message: `Successfully synced live metrics from ${platform}`,
    socialStats: updatedCreator.socialStats,
    socialLinks: updatedCreator.socialLinks,
    creator: updatedCreator
  });
});

// PATCH /api/creators/:id/theme — Update editorial palette accent
router.patch('/:id/theme', requireAuth, (req, res) => {
  const creatorId = req.params.id;
  const { theme = 'sage' } = req.body;
  const updatedCreator = updateCreatorTheme(creatorId, theme);

  if (!updatedCreator) {
    return res.status(404).json({ success: false, message: 'Creator not found' });
  }

  res.json({
    success: true,
    message: `Editorial theme updated to ${theme}`,
    theme: updatedCreator.theme,
    creator: updatedCreator
  });
});

export default router;

