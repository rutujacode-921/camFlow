import express from 'express';
import { campaigns } from '../data/mockStore.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, campaigns });
});

router.get('/:id', (req, res) => {
  const campaign = campaigns.find(c => c.id === req.params.id);
  if (!campaign) {
    return res.status(404).json({ success: false, message: 'Campaign not found' });
  }
  res.json({ success: true, campaign });
});

router.post('/', (req, res) => {
  const { brandName, title, productCategory, budget, tags, deliverables, deadline, targetAge, targetGender } = req.body;
  
  const newCampaign = {
    id: `camp-${Date.now().toString().slice(-4)}`,
    brandName: brandName || 'My Brand',
    brandLogo: '✨',
    title: title || 'New Campaign Brief',
    productCategory: productCategory || 'General',
    budget: budget || '$2,500',
    budgetNumeric: parseInt(budget?.replace(/[^0-9]/g, '') || '2500', 10),
    tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : ['Creator', 'Marketing'],
    targetDemographics: {
      targetAge: targetAge || '25-34',
      targetGender: targetGender || 'any',
      minAuthenticity: 85
    },
    deliverables: deliverables || '1x Editorial Shoot + 2x Posts',
    deadline: deadline || 'Dec 2026',
    status: 'Active'
  };

  campaigns.unshift(newCampaign);
  res.status(201).json({ success: true, campaign: newCampaign });
});

export default router;
