// CamFlow In-Memory Data Store & Seed Database
// Designed for seamless full-stack MERN execution with MongoDB-compatible models

export const creators = [
  {
    id: "creator-nelson",
    name: "Nelson Vance",
    role: "Editorial Photographer & Visual Storyteller",
    handle: "@nelson.vance",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    cover: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    bio: "Occaecat elit pariatur non Lorem laborum proident Lorem non sint nostrud. Ut dolore incididunt mollit nostrud Lorem dolore. Qui aliquip aute amet eu adipisicing velit ullamco.",
    location: "Paris / New York",
    category: "Product & Editorial Photography",
    rating: 4.96,
    completedDeals: 42,
    startingRate: "$1,800 / project",
    tags: ["Photography", "Luxury Fashion", "Product Still Life", "Editorial"],
    socialStats: {
      instagram: "185K",
      tiktok: "92K",
      engagementRate: "4.8%",
      avgReach: "64.2K",
      authenticityScore: 98, // Trust Badge
      demographics: {
        topCountries: [{ country: "France", percent: 38 }, { country: "USA", percent: 34 }, { country: "UK", percent: 18 }],
        ageGroups: [{ group: "18-24", percent: 22 }, { group: "25-34", percent: 56 }, { group: "35-44", percent: 16 }],
        gender: { female: 62, male: 38 }
      },
      audit: {
        botFollowersEstimate: "1.8%",
        commentToLikeRatio: "Normal (3.9%)",
        growthSpikeAnomaly: "None detected (Organic)",
        trustBadge: "Verified Authentic Tier 1"
      }
    },
    featuredWork: {
      title: "Paris secrets",
      category: "Product photography",
      description: "Sint occaecat deserunt aliquip do occaecat ut quis. Cupidatat magna fugiat quis sit duis est in volup.",
      images: [
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80"
      ]
    },
    testimonial: {
      quote: "Sit veniam qui tempor ex ipsum voluptate deserunt cillum cillum excepteur elit mollit commodo fugiat enim veniam qui tempor ex ipsum voluptate.",
      client: "Aura Cosmetics",
      clientAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    otherProjects: [
      { id: "p1", title: "Minimalist Studio Gear", category: "Commercial Tech", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80" },
      { id: "p2", title: "Velvet Glow Skincare", category: "Beauty Editorial", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80" },
      { id: "p3", title: "Underwater Light Symphony", category: "Fine Art", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  {
    id: "creator-sophia",
    name: "Sophia Chen",
    role: "Clean Beauty & Wellness Creator",
    handle: "@sophiaglows",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    cover: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    bio: "Advocating for mindful skincare and clean beauty rituals. Certified holistic esthetician partnering with sustainable, ethical cosmetics brands.",
    location: "Los Angeles, CA",
    category: "Eco-Friendly Skincare & Beauty",
    rating: 4.98,
    completedDeals: 67,
    startingRate: "$2,200 / campaign",
    tags: ["Skincare", "Clean Beauty", "Sustainability", "Wellness"],
    socialStats: {
      instagram: "320K",
      tiktok: "410K",
      engagementRate: "5.4%",
      avgReach: "110K",
      authenticityScore: 99,
      demographics: {
        topCountries: [{ country: "USA", percent: 62 }, { country: "Canada", percent: 18 }, { country: "UK", percent: 12 }],
        ageGroups: [{ group: "18-24", percent: 30 }, { group: "25-34", percent: 52 }, { group: "35-44", percent: 12 }],
        gender: { female: 84, male: 16 }
      },
      audit: {
        botFollowersEstimate: "0.9%",
        commentToLikeRatio: "High Organic (4.7%)",
        growthSpikeAnomaly: "Zero flags",
        trustBadge: "Verified Authentic Tier 1"
      }
    },
    featuredWork: {
      title: "Botanical Essence Drop",
      category: "Reels & Organic Stories",
      description: "A 3-part aesthetic routine showcase driving over 85,000 saves and 3.2x benchmark conversion.",
      images: [
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80"
      ]
    },
    testimonial: {
      quote: "Sophia generated our highest converting launch video of the year. Our direct checkout rate surged 34% within 48 hours.",
      client: "PureBloom Organics",
      clientAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    },
    otherProjects: [
      { id: "p4", title: "Glass Skin Morning Protocol", category: "Video Reels", image: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&w=600&q=80" },
      { id: "p5", title: "Zero Waste Packaging Test", category: "Sustainability", image: "https://images.unsplash.com/photo-1542452255191-c85a98f2c5d1?auto=format&fit=crop&w=600&q=80" },
      { id: "p6", title: "Hydra Mist Review", category: "Product Launch", image: "https://images.unsplash.com/photo-1512290900672-1f022416fefd?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  {
    id: "creator-marcus",
    name: "Marcus Thorne",
    role: "Minimalist Tech & Workspace Architect",
    handle: "@marcusthorne.tech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    bio: "Designing clean workspaces and breaking down aesthetic tech gear for modern builders and remote professionals.",
    location: "Berlin, Germany",
    category: "Tech & Workspace Design",
    rating: 4.92,
    completedDeals: 38,
    startingRate: "$1,950 / package",
    tags: ["Tech", "Design", "Minimalism", "Desk Setup", "Productivity"],
    socialStats: {
      instagram: "142K",
      tiktok: "260K",
      engagementRate: "4.2%",
      avgReach: "58K",
      authenticityScore: 97,
      demographics: {
        topCountries: [{ country: "Germany", percent: 40 }, { country: "USA", percent: 32 }, { country: "Netherlands", percent: 14 }],
        ageGroups: [{ group: "18-24", percent: 18 }, { group: "25-34", percent: 64 }, { group: "35-44", percent: 14 }],
        gender: { female: 28, male: 72 }
      },
      audit: {
        botFollowersEstimate: "2.1%",
        commentToLikeRatio: "Healthy (3.6%)",
        growthSpikeAnomaly: "Zero flags",
        trustBadge: "Verified Authentic Tier 1"
      }
    },
    featuredWork: {
      title: "Nordic Desk Setup Tour",
      category: "Short-form Cinematic",
      description: "Visual exploration of ergonomic desk setups featuring matte walnut accessories and custom LED backlighting.",
      images: [
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
      ]
    },
    testimonial: {
      quote: "Marcus's video aesthetic represents our brand philosophy better than our internal creative agency. Highly recommended!",
      client: "Lumina Workspace",
      clientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    otherProjects: [
      { id: "p7", title: "Wireless Audio Series", category: "Sound Engineering", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80" },
      { id: "p8", title: "Mechanical Keyboard Custom Build", category: "Hardware", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80" },
      { id: "p9", title: "Minimalist Travel Tech", category: "Carry Gear", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80" }
    ]
  }
];

export const campaigns = [
  {
    id: "camp-001",
    brandName: "Aura Botanicals",
    brandLogo: "🌿",
    title: "Eco-Friendly Skincare Summer Launch",
    productCategory: "Skincare",
    budget: "$4,500",
    budgetNumeric: 4500,
    tags: ["Skincare", "Clean Beauty", "Sustainability", "Editorial"],
    targetDemographics: {
      targetAge: "25-34",
      targetGender: "female",
      minAuthenticity: 90
    },
    deliverables: "1x High-Res Editorial Flatlay + 2x Cinematic IG Reels",
    deadline: "Nov 15, 2026",
    status: "Active"
  },
  {
    id: "camp-002",
    brandName: "Lumina Tech",
    brandLogo: "⚡",
    title: "Minimalist Magnetic Charger Showcase",
    productCategory: "Tech & Workspace Design",
    budget: "$3,200",
    budgetNumeric: 3200,
    tags: ["Tech", "Design", "Productivity", "Photography"],
    targetDemographics: {
      targetAge: "25-34",
      targetGender: "any",
      minAuthenticity: 88
    },
    deliverables: "1x Desk Setup Feature Video + 3x Static Carousel Posts",
    deadline: "Nov 28, 2026",
    status: "Active"
  }
];

export const escrowDeals = [
  {
    id: "deal-701",
    campaignId: "camp-001",
    campaignTitle: "Eco-Friendly Skincare Summer Launch",
    brandName: "Aura Botanicals",
    creatorId: "creator-nelson",
    creatorName: "Nelson Vance",
    totalAmount: 2400,
    escrowStatus: "LOCKED_IN_ESCROW", // PENDING_DEPOSIT, LOCKED_IN_ESCROW, COMPLETED
    milestones: [
      {
        id: "m1",
        title: "Concept Moodboard & Shot List",
        amount: 600,
        status: "COMPLETED", // PENDING, SUBMITTED, COMPLETED
        submissionDate: "2026-10-01",
        completedDate: "2026-10-02",
        proofAssetUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
        isWatermarked: false,
        notes: "Approved by Brand Director. $600 released to creator wallet."
      },
      {
        id: "m2",
        title: "Draft Watermarked Content & Reel Upload",
        amount: 1000,
        status: "SUBMITTED",
        submissionDate: "2026-10-03",
        completedDate: null,
        proofAssetUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
        rawAssetUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1600&q=90",
        isWatermarked: true,
        watermarkText: "CAMFLOW DRAFT — AURA BOTANICALS — Oct 2026",
        notes: "Draft review currently pending brand review. Unwatermarked asset locked."
      },
      {
        id: "m3",
        title: "Live Posting & Verified Analytics Report",
        amount: 800,
        status: "PENDING",
        submissionDate: null,
        completedDate: null,
        proofAssetUrl: null,
        isWatermarked: false,
        notes: "Awaiting milestone 2 release."
      }
    ]
  }
];

export const users = [
  {
    id: "user-nelson",
    email: "nelson@camflow.io",
    password: "password123",
    name: "Nelson Vance",
    role: "creator",
    profileId: "creator-nelson",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    id: "user-sophia",
    email: "sophia@camflow.io",
    password: "password123",
    name: "Sophia Chen",
    role: "creator",
    profileId: "creator-sophia",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    createdAt: "2026-09-05T00:00:00.000Z"
  },
  {
    id: "user-aura",
    email: "aura@camflow.io",
    password: "password123",
    name: "Aura Botanicals",
    role: "brand",
    companyName: "Aura Botanicals Inc.",
    profileId: "brand-aura",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-08-15T00:00:00.000Z"
  }
];

export function addUser(userData) {
  const newUser = {
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...userData
  };
  users.push(newUser);
  return newUser;
}

export function addCreator(creatorData) {
  const newCreator = {
    id: `creator-${Date.now()}`,
    rating: 5.0,
    completedDeals: 0,
    socialStats: {
      instagram: creatorData.audienceSize || "50K",
      tiktok: "20K",
      engagementRate: creatorData.engagementRate || "4.5%",
      avgReach: "25K",
      authenticityScore: 97,
      demographics: {
        topCountries: [{ country: "USA", percent: 45 }, { country: "UK", percent: 25 }, { country: "France", percent: 15 }],
        ageGroups: [{ group: "18-24", percent: 28 }, { group: "25-34", percent: 54 }, { group: "35-44", percent: 14 }],
        gender: { female: 65, male: 35 }
      },
      audit: {
        botFollowersEstimate: "1.2%",
        commentToLikeRatio: "Organic (4.1%)",
        growthSpikeAnomaly: "Zero flags",
        trustBadge: "Verified Authentic Tier 1"
      }
    },
    featuredWork: {
      title: creatorData.featuredTitle || "Signature Visual Series",
      category: creatorData.category || "Editorial Photography",
      description: creatorData.featuredDescription || "Curated aesthetic still life and short-form lifestyle integration.",
      images: creatorData.featuredImages || [
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80"
      ]
    },
    testimonial: {
      quote: "Outstanding artistic vision, meticulous shot composition, and flawless delivery ahead of schedule.",
      client: "CamFlow Editorial Curation",
      clientAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    otherProjects: [
      { id: `p-${Date.now()}-1`, title: "Botanical Still Life", category: "Commercial", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80" },
      { id: `p-${Date.now()}-2`, title: "Studio Light Study", category: "Editorial", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80" },
      { id: `p-${Date.now()}-3`, title: "Minimalist Geometry", category: "Fine Art", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80" }
    ],
    ...creatorData
  };
  creators.unshift(newCreator);
  return newCreator;
}

