import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import CreatorPortfolio from './components/CreatorPortfolio';
import BrandDirectory from './components/BrandDirectory';
import EscrowMilestoneTracker from './components/EscrowMilestoneTracker';
import MediaVaultModal from './components/MediaVaultModal';
import FakeFollowerScannerModal from './components/FakeFollowerScannerModal';
import AIPitchGeneratorModal from './components/AIPitchGeneratorModal';
import MatchScoreModal from './components/MatchScoreModal';
import AuthModal from './components/AuthModal';
import CreatorOnboardingModal from './components/CreatorOnboardingModal';
import CreateCampaignModal from './components/CreateCampaignModal';
import { LiveActivityMarquee } from './components/FloatingElements';

// Initial fallback creators data matching backend
const initialCreators = [
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
    calculatedMatchScore: 94,
    tags: ["Photography", "Luxury Fashion", "Product Still Life", "Editorial"],
    socialStats: {
      instagram: "185K",
      tiktok: "92K",
      engagementRate: "4.8%",
      avgReach: "64.2K",
      authenticityScore: 98,
      demographics: {
        topCountries: [{ country: "France", percent: 38 }, { country: "USA", percent: 34 }, { country: "UK", percent: 18 }],
        ageGroups: [{ group: "18-24", percent: 22 }, { group: "25-34", percent: 56 }, { group: "35-44", percent: 16 }],
        gender: { female: 62, male: 38 }
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
    calculatedMatchScore: 97,
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
    calculatedMatchScore: 88,
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

const initialCampaigns = [
  {
    id: "camp-001",
    brandName: "Aura Botanicals",
    brandLogo: "🌿",
    title: "Eco-Friendly Skincare Summer Launch",
    productCategory: "Skincare",
    budget: "$4,500",
    tags: ["Skincare", "Clean Beauty", "Sustainability", "Editorial"],
    deliverables: "1x High-Res Editorial Flatlay + 2x Cinematic IG Reels"
  },
  {
    id: "camp-002",
    brandName: "Lumina Tech",
    brandLogo: "⚡",
    title: "Minimalist Magnetic Charger Showcase",
    productCategory: "Tech & Workspace Design",
    budget: "$3,200",
    tags: ["Tech", "Design", "Productivity", "Photography"],
    deliverables: "1x Desk Setup Feature Video + 3x Static Carousel Posts"
  }
];

function MainApp() {
  const { currentRole } = useAuth();
  const [activeView, setActiveView] = useState('portfolio'); // 'portfolio' | 'directory' | 'escrow'
  const [creators, setCreators] = useState(initialCreators);
  const [selectedCreator, setSelectedCreator] = useState(initialCreators[0]); // Nelson Vance
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState(initialCampaigns[0]);

  // Modals state
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isPitchOpen, setIsPitchOpen] = useState(false);
  const [isMediaVaultOpen, setIsMediaVaultOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCreatorOnboardingOpen, setIsCreatorOnboardingOpen] = useState(false);
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);

  // Fetch live creators from backend
  const fetchCreators = () => {
    fetch('/api/creators')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.creators?.length) {
          setCreators(data.creators);
          const found = data.creators.find(c => c.id === selectedCreator.id);
          if (found) setSelectedCreator(found);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  const handleSelectCreator = (creator) => {
    setSelectedCreator(creator);
    setActiveView('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreatorCreated = (newCreator) => {
    setCreators([newCreator, ...creators]);
    setSelectedCreator(newCreator);
    setActiveView('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCampaignCreated = (newCampaign) => {
    setCampaigns([newCampaign, ...campaigns]);
    setSelectedCampaign(newCampaign);
    setActiveView('directory');
    fetchCreators();
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#181A1B] flex flex-col selection:bg-sage-200">
      
      {/* Dynamic Marquee Header Ticker */}
      <LiveActivityMarquee />

      {/* Main Navbar with Auth & Onboarding Triggers */}
      <Navbar 
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenCreatorOnboarding={() => setIsCreatorOnboardingOpen(true)}
        onOpenCreateCampaign={() => setIsCreateCampaignOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'portfolio' && (
          <CreatorPortfolio 
            creator={selectedCreator}
            onOpenEscrow={() => setActiveView('escrow')}
            onOpenMediaVault={() => setIsMediaVaultOpen(true)}
            onOpenScanner={() => setIsScannerOpen(true)}
            onOpenPitchGenerator={() => setIsPitchOpen(true)}
            onOpenMatchScoreModal={() => setIsMatchModalOpen(true)}
          />
        )}

        {activeView === 'directory' && (
          <BrandDirectory 
            creators={creators}
            onSelectCreator={handleSelectCreator}
            onOpenMatchModal={(c) => {
              setSelectedCreator(c);
              setIsMatchModalOpen(true);
            }}
            onOpenScanner={(c) => {
              setSelectedCreator(c);
              setIsScannerOpen(true);
            }}
            campaigns={campaigns}
            selectedCampaign={selectedCampaign}
            setSelectedCampaign={setSelectedCampaign}
          />
        )}

        {activeView === 'escrow' && (
          <EscrowMilestoneTracker 
            currentRole={currentRole}
            onOpenMediaVault={() => setIsMediaVaultOpen(true)}
          />
        )}
      </main>

      {/* Interactive Feature Modals */}
      <MatchScoreModal 
        isOpen={isMatchModalOpen}
        onClose={() => setIsMatchModalOpen(false)}
        creator={selectedCreator}
        campaign={selectedCampaign}
      />

      <FakeFollowerScannerModal 
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        creator={selectedCreator}
      />

      <AIPitchGeneratorModal 
        isOpen={isPitchOpen}
        onClose={() => setIsPitchOpen(false)}
        creator={selectedCreator}
      />

      <MediaVaultModal 
        isOpen={isMediaVaultOpen}
        onClose={() => setIsMediaVaultOpen(false)}
        creator={selectedCreator}
      />

      {/* Day 2 Auth & Onboarding Modals */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onOpenCreatorOnboarding={() => setIsCreatorOnboardingOpen(true)}
        onOpenBrandOnboarding={() => setIsCreateCampaignOpen(true)}
      />

      <CreatorOnboardingModal 
        isOpen={isCreatorOnboardingOpen}
        onClose={() => setIsCreatorOnboardingOpen(false)}
        onCreatorCreated={handleCreatorCreated}
      />

      <CreateCampaignModal 
        isOpen={isCreateCampaignOpen}
        onClose={() => setIsCreateCampaignOpen(false)}
        onCampaignCreated={handleCampaignCreated}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
