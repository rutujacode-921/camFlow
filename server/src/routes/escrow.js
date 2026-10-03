import express from 'express';
import { escrowDeals } from '../data/mockStore.js';

const router = express.Router();

// GET all escrow deals or by ID
router.get('/', (req, res) => {
  res.json({ success: true, deals: escrowDeals });
});

router.get('/:dealId', (req, res) => {
  const deal = escrowDeals.find(d => d.id === req.params.dealId);
  if (!deal) {
    return res.status(404).json({ success: false, message: 'Escrow deal not found' });
  }
  res.json({ success: true, deal });
});

// Brand Approves Milestone & Releases Funds
router.post('/:dealId/milestones/:milestoneId/approve', (req, res) => {
  const { dealId, milestoneId } = req.params;
  const deal = escrowDeals.find(d => d.id === dealId);
  if (!deal) {
    return res.status(404).json({ success: false, message: 'Deal not found' });
  }

  const milestone = deal.milestones.find(m => m.id === milestoneId);
  if (!milestone) {
    return res.status(404).json({ success: false, message: 'Milestone not found' });
  }

  // State Transition
  milestone.status = 'COMPLETED';
  milestone.completedDate = new Date().toISOString().split('T')[0];
  milestone.isWatermarked = false; // Raw unwatermarked asset unlocked!
  milestone.notes = `Approved by brand. $${milestone.amount} successfully transferred to creator wallet.`;

  // Check if all milestones are completed
  const allDone = deal.milestones.every(m => m.status === 'COMPLETED');
  if (allDone) {
    deal.escrowStatus = 'COMPLETED';
  }

  res.json({
    success: true,
    message: `Milestone "${milestone.title}" approved! $${milestone.amount} released from escrow.`,
    milestone,
    deal
  });
});

// Creator Submits Content Proof
router.post('/:dealId/milestones/:milestoneId/submit', (req, res) => {
  const { dealId, milestoneId } = req.params;
  const { proofUrl, notes } = req.body;

  const deal = escrowDeals.find(d => d.id === dealId);
  if (!deal) {
    return res.status(404).json({ success: false, message: 'Deal not found' });
  }

  const milestone = deal.milestones.find(m => m.id === milestoneId);
  if (!milestone) {
    return res.status(404).json({ success: false, message: 'Milestone not found' });
  }

  milestone.status = 'SUBMITTED';
  milestone.submissionDate = new Date().toISOString().split('T')[0];
  if (proofUrl) milestone.proofAssetUrl = proofUrl;
  if (notes) milestone.notes = notes;
  milestone.isWatermarked = true;
  milestone.watermarkText = `CAMFLOW PROTECTED — ${deal.brandName} — ${new Date().toLocaleDateString()}`;

  res.json({
    success: true,
    message: 'Proof submitted with dynamic watermark overlay. Brand notified for review.',
    milestone,
    deal
  });
});

export default router;
