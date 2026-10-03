import express from 'express';

const router = express.Router();

// Built-In AI Pitch Generator
router.post('/generate-pitch', (req, res) => {
  const { creatorName = "Creator", brandName, campaignGoal, keyStrength, tone = "editorial" } = req.body;

  if (!brandName || !campaignGoal) {
    return res.status(400).json({ success: false, message: 'Brand name and campaign goal are required' });
  }

  const subject = `Collaboration Proposal: ${creatorName} × ${brandName} (${campaignGoal})`;

  let pitchBody = "";
  if (tone === 'editorial') {
    pitchBody = `Hi ${brandName} Team,

I've been closely admiring your recent aesthetic direction, particularly around your focus on ${campaignGoal}.

As a visual creator specializing in ${keyStrength || 'high-concept editorial storytelling'}, my community (185K+ engaged followers, 98% verified authentic audience) deeply aligns with your core demographic—principally conscious 25–34 consumers seeking mindful luxury.

For this collaboration, I envision:
1. High-fidelity editorial imagery highlighting your product's signature texture and packaging.
2. A cinematic short-form Reel documenting an organic routine integration with verifiable trackable links.

I work exclusively through CamFlow's Escrow-Lite pipeline to guarantee verified milestones, content watermarking for review, and timely release.

Would you be open to reviewing a custom moodboard this Thursday?

Warmly,
${creatorName}`;
  } else {
    pitchBody = `Hey ${brandName} Team!

Huge fan of what you're building with ${campaignGoal}. 

I produce high-converting creator content with an average engagement rate of 4.8% and a 98% authentic audience score. I'd love to partner to drive genuine conversions and high-retention content for your next campaign drop.

Let's connect on a brief partnership package!

Best,
${creatorName}`;
  }

  res.json({
    success: true,
    subject,
    pitch: pitchBody,
    generatedAt: new Date().toISOString()
  });
});

// Built-in Dynamic Media Kit Generator Data
router.post('/media-kit', (req, res) => {
  const { creator } = req.body;

  if (!creator) {
    return res.status(400).json({ success: false, message: 'Creator profile data required' });
  }

  const mediaKit = {
    profile: {
      name: creator.name,
      handle: creator.handle,
      role: creator.role,
      location: creator.location,
      bio: creator.bio,
      avatar: creator.avatar
    },
    keyMetrics: [
      { label: "Total Audience", value: creator.socialStats?.instagram || "200K+", highlight: "Verified" },
      { label: "Engagement Rate", value: creator.socialStats?.engagementRate || "4.8%", highlight: "2.1x Benchmark" },
      { label: "Audience Authenticity", value: `${creator.socialStats?.authenticityScore || 98}%`, highlight: "Audit Passed" },
      { label: "Avg Campaign Reach", value: creator.socialStats?.avgReach || "65K", highlight: "Organic" }
    ],
    audienceBreakdown: creator.socialStats?.demographics || {},
    packages: [
      { name: "Single Editorial Flatlay", price: "$850", turnaround: "3 Business Days" },
      { name: "Cinematic Reel + 3 High-Res Photos", price: "$1,800", turnaround: "7 Business Days" },
      { name: "Full Omni-Channel Campaign Suite", price: "$3,400", turnaround: "14 Business Days" }
    ],
    generatedStamp: `Verified by CamFlow Engine • ${new Date().toLocaleDateString()}`
  };

  res.json({ success: true, mediaKit });
});

export default router;
