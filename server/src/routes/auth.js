import express from 'express';
import { users, creators, addUser, addCreator, campaigns } from '../data/mockStore.js';
import { generateToken, requireAuth } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { email, password, name, role = 'creator' } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ success: false, message: 'Email, password, and name are required' });
  }

  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'User with this email already exists' });
  }

  const defaultAvatar = role === 'creator'
    ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';

  const newUser = addUser({
    email,
    password, // in real mongo production: await bcrypt.hash(password, 10)
    name,
    role,
    avatar: defaultAvatar,
    profileId: null,
    hasCompletedOnboarding: false
  });

  const token = generateToken({
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
    profileId: newUser.profileId
  });

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      avatar: newUser.avatar,
      profileId: newUser.profileId,
      hasCompletedOnboarding: newUser.hasCompletedOnboarding
    }
  });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid email or password credentials' });
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    profileId: user.profileId
  });

  // Attach associated creator profile if exists
  let creatorProfile = null;
  if (user.role === 'creator' && user.profileId) {
    creatorProfile = creators.find(c => c.id === user.profileId);
  }

  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      profileId: user.profileId,
      hasCompletedOnboarding: user.hasCompletedOnboarding !== false
    },
    creatorProfile
  });
});

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User session not found' });
  }

  let creatorProfile = null;
  if (user.role === 'creator' && user.profileId) {
    creatorProfile = creators.find(c => c.id === user.profileId);
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      profileId: user.profileId,
      hasCompletedOnboarding: user.hasCompletedOnboarding !== false
    },
    creatorProfile
  });
});

// POST /api/auth/onboarding/creator
router.post('/onboarding/creator', requireAuth, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const {
    roleTitle = "Visual Storyteller",
    handle = "@newcreator",
    bio = "Editorial creator creating aesthetic content.",
    location = "New York, USA",
    category = "Product & Editorial Photography",
    tags = ["Editorial", "Photography", "Visuals"],
    audienceSize = "45K",
    engagementRate = "4.6%",
    startingRate = "$1,500 / project",
    featuredTitle = "Signature Aesthetics",
    featuredDescription = "High-concept still life imagery highlighting natural materials and textures.",
    avatarUrl,
    coverUrl
  } = req.body;

  const newCreator = addCreator({
    name: user.name,
    role: roleTitle,
    handle: handle.startsWith('@') ? handle : `@${handle}`,
    bio,
    location,
    category,
    tags: Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()),
    audienceSize,
    engagementRate,
    startingRate,
    avatar: avatarUrl || user.avatar,
    cover: coverUrl || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    featuredTitle,
    featuredDescription
  });

  // Link user to creator profile
  user.profileId = newCreator.id;
  user.hasCompletedOnboarding = true;

  res.status(201).json({
    success: true,
    message: 'Creator onboarding completed! Your editorial portfolio is live.',
    creator: newCreator,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      profileId: user.profileId,
      hasCompletedOnboarding: true
    }
  });
});

// POST /api/auth/onboarding/brand
router.post('/onboarding/brand', requireAuth, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const { companyName, industry, website, initialCampaign } = req.body;

  user.companyName = companyName || user.name;
  user.industry = industry || "E-Commerce / Consumer";
  user.website = website || "https://example.com";
  user.hasCompletedOnboarding = true;

  let createdCampaign = null;
  if (initialCampaign && initialCampaign.title) {
    createdCampaign = {
      id: `camp-${Date.now().toString().slice(-4)}`,
      brandName: user.companyName,
      brandLogo: '✨',
      title: initialCampaign.title,
      productCategory: initialCampaign.productCategory || industry || 'General',
      budget: initialCampaign.budget || '$3,000',
      budgetNumeric: parseInt(initialCampaign.budget?.replace(/[^0-9]/g, '') || '3000', 10),
      tags: initialCampaign.tags || ['Clean Beauty', 'Editorial'],
      targetDemographics: {
        targetAge: initialCampaign.targetAge || '25-34',
        targetGender: 'any',
        minAuthenticity: 90
      },
      deliverables: initialCampaign.deliverables || '1x Editorial Shoot + 2x Posts',
      deadline: 'Dec 2026',
      status: 'Active'
    };
    campaigns.unshift(createdCampaign);
  }

  res.json({
    success: true,
    message: 'Brand onboarding completed!',
    user,
    createdCampaign
  });
});

export default router;
