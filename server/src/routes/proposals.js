import express from 'express';
import { proposals, addProposal, updateProposalStatus, campaigns } from '../data/mockStore.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/proposals — list proposals (optionally filtered by campaignId, creatorId, or brand)
router.get('/', (req, res) => {
  const { campaignId, creatorId, brandName, status } = req.query;
  let results = [...proposals];

  if (campaignId) {
    results = results.filter(p => p.campaignId === campaignId);
  }
  if (creatorId) {
    results = results.filter(p => p.creatorId === creatorId);
  }
  if (brandName) {
    results = results.filter(p => p.brandName?.toLowerCase() === brandName.toLowerCase());
  }
  if (status) {
    results = results.filter(p => p.status === status);
  }

  res.json({
    success: true,
    total: results.length,
    proposals: results
  });
});

// GET /api/proposals/:id — single proposal details
router.get('/:id', (req, res) => {
  const proposal = proposals.find(p => p.id === req.params.id);
  if (!proposal) {
    return res.status(404).json({ success: false, message: 'Proposal not found' });
  }
  res.json({ success: true, proposal });
});

// POST /api/proposals — submit a new pitch / proposal
router.post('/', (req, res) => {
  const {
    campaignId,
    creatorId,
    creatorName,
    creatorHandle,
    creatorAvatar,
    brandName,
    pitchMessage,
    proposedRate,
    deliverablesOffered,
    estimatedDays
  } = req.body;

  if (!pitchMessage) {
    return res.status(400).json({ success: false, message: 'Pitch message is required' });
  }

  const campaign = campaigns.find(c => c.id === campaignId) || campaigns[0];

  const newProposal = addProposal({
    campaignId: campaign?.id || 'camp-custom',
    campaignTitle: campaign?.title || 'Direct Brand Collaboration Brief',
    creatorId: creatorId || 'creator-nelson',
    creatorName: creatorName || 'Nelson Vance',
    creatorHandle: creatorHandle || '@nelson.vance',
    creatorAvatar: creatorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    brandName: brandName || campaign?.brandName || 'Aura Botanicals',
    pitchMessage,
    proposedRate: proposedRate || '₹1,50,000',
    deliverablesOffered: deliverablesOffered || '2x High-Res Editorial Stills + 1x Cinematic Video Reel',
    estimatedDays: estimatedDays || 10
  });

  res.status(201).json({
    success: true,
    message: 'Proposal successfully submitted to brand pipeline',
    proposal: newProposal
  });
});

// PATCH /api/proposals/:id/status — FSM state transitions (UNDER_REVIEW, SHORTLISTED, ACCEPTED, REJECTED, CONTRACT_GENERATED)
router.patch('/:id/status', requireAuth, (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const validStatuses = ['PENDING', 'UNDER_REVIEW', 'SHORTLISTED', 'ACCEPTED', 'REJECTED', 'CONTRACT_GENERATED'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
    });
  }

  const updated = updateProposalStatus(id, status, notes);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Proposal not found' });
  }

  res.json({
    success: true,
    message: `Proposal moved to ${status}`,
    proposal: updated
  });
});

export default router;

