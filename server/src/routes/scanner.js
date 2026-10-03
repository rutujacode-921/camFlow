import express from 'express';

const router = express.Router();

// Simulated Fake Follower & Demographic Audit Engine
router.post('/audit', (req, res) => {
  const { handle, platform = 'instagram' } = req.body;

  if (!handle) {
    return res.status(400).json({ success: false, message: 'Social handle is required' });
  }

  // Deterministic seed based on handle string length/characters for consistent demo
  const cleanHandle = handle.replace('@', '').toLowerCase();
  const seed = cleanHandle.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const authenticityScore = 92 + (seed % 8); // 92% - 99% range
  const botFollowersPercent = (100 - authenticityScore - ((seed % 10) / 10)).toFixed(1);
  const commentToLikeRatio = (3.2 + ((seed % 15) / 10)).toFixed(1);
  
  // Anomaly checks
  const hasSpikes = authenticityScore < 94;
  const growthAudit = hasSpikes 
    ? "Minor spike detected 4 months ago (Likely viral reel; verified organic reach)" 
    : "Steady organic growth trajectory across past 12 months";

  const trustBadge = authenticityScore >= 96 
    ? "Verified Authentic — Tier 1" 
    : "Verified Authentic — Standard";

  const demographics = {
    topCountries: [
      { country: "United States", percent: 42 + (seed % 10) },
      { country: "United Kingdom", percent: 24 },
      { country: "France", percent: 18 },
      { country: "Other", percent: 16 }
    ],
    ageGroups: [
      { group: "18-24", percent: 25 },
      { group: "25-34", percent: 55 },
      { group: "35-44", percent: 15 },
      { group: "45+", percent: 5 }
    ],
    gender: {
      female: 68,
      male: 32
    }
  };

  res.json({
    success: true,
    handle: `@${cleanHandle}`,
    platform,
    scannedAt: new Date().toISOString(),
    metrics: {
      authenticityScore,
      botFollowersPercent: `${botFollowersPercent}%`,
      commentToLikeRatio: `${commentToLikeRatio}% (Industry avg: 1.5% - 3.0%)`,
      growthAudit,
      trustBadge,
      suspiciousActivityDetected: false
    },
    demographics
  });
});

export default router;
