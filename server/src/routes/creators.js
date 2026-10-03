import express from 'express';
import { creators, campaigns } from '../data/mockStore.js';

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

export default router;
