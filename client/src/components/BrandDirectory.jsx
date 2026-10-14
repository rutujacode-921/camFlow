import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  ShieldCheck, 
  ArrowUpRight, 
  TrendingUp,
  LayoutGrid,
  List,
  Users,
  Star,
  MapPin,
  X
} from 'lucide-react';
import MatchFilterPanel from './MatchFilterPanel';

// Parse rate strings like "₹1,50,000 / project" into numeric values
function parseRate(rateStr) {
  if (!rateStr) return 150000;
  const clean = rateStr.replace(/[^0-9]/g, '');
  return parseInt(clean, 10) || 150000;
}

function parseEngagement(engStr) {
  if (!engStr) return 4;
  return parseFloat(engStr.replace('%', '')) || 4;
}

export default function BrandDirectory({ 
  creators, 
  onSelectCreator, 
  onOpenMatchModal, 
  onOpenScanner,
  campaigns,
  selectedCampaign,
  setSelectedCampaign
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [filters, setFilters] = useState({
    tags: [],
    budgetMin: 0,
    budgetMax: 500000,
    minMatch: 50,
    minAuthenticity: 90,
    minEngagement: 3.0,
    sortBy: 'matchScore'
  });

  const handleResetFilters = () => {
    setFilters({
      tags: [],
      budgetMin: 0,
      budgetMax: 500000,
      minMatch: 50,
      minAuthenticity: 90,
      minEngagement: 3.0,
      sortBy: 'matchScore'
    });
    setSearchTerm('');
  };

  // Apply all filters
  const filteredCreators = useMemo(() => {
    let results = creators.filter(c => {
      // Search
      const q = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm ||
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q)) ||
        c.handle.toLowerCase().includes(q);

      // Match score
      const matchScore = c.calculatedMatchScore || 0;
      const matchesScore = matchScore >= filters.minMatch;

      // Tags (AND filter: must contain all selected tags)
      const matchesTags = filters.tags.length === 0 ||
        filters.tags.every(ft => c.tags.some(t => t.toLowerCase() === ft.toLowerCase()));

      // Budget (creator rate vs campaign budget range)
      const rate = parseRate(c.startingRate);
      const matchesBudget = rate >= filters.budgetMin && rate <= filters.budgetMax;

      // Authenticity
      const auth = c.socialStats?.authenticityScore || 95;
      const matchesAuth = auth >= filters.minAuthenticity;

      // Engagement
      const eng = parseEngagement(c.socialStats?.engagementRate);
      const matchesEng = eng >= filters.minEngagement;

      return matchesSearch && matchesScore && matchesTags && matchesBudget && matchesAuth && matchesEng;
    });

    // Sort
    results = [...results].sort((a, b) => {
      switch (filters.sortBy) {
        case 'engagement':
          return parseEngagement(b.socialStats?.engagementRate) - parseEngagement(a.socialStats?.engagementRate);
        case 'authenticity':
          return (b.socialStats?.authenticityScore || 0) - (a.socialStats?.authenticityScore || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default: // matchScore
          return (b.calculatedMatchScore || 0) - (a.calculatedMatchScore || 0);
      }
    });

    return results;
  }, [creators, searchTerm, filters]);

  const activeFilterCount = [
    filters.tags.length > 0,
    filters.budgetMin > 0 || filters.budgetMax < 500000,
    filters.minMatch > 50,
    filters.minAuthenticity > 90,
    filters.minEngagement > 3.0
  ].filter(Boolean).length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-sage-200/80 pb-8 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-sage-800">
            Brand Discovery Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-editorial font-medium text-ink-900 mt-1">
            Curated Creator Marketplace
          </h1>
          <p className="text-sm text-ink-500 mt-2 max-w-xl">
            Match with verified editorial creators scored dynamically using CamFlow's multi-factor affinity algorithm — Jaccard tag similarity, demographic intersection, and authenticity weighting.
          </p>
        </div>

        {/* Campaign Context Selector */}
        <div className="bg-white border border-sage-200 rounded-2xl p-3.5 shadow-sm space-y-1.5 min-w-[280px]">
          <div className="flex items-center space-x-1.5 text-xs text-ink-500 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Active Campaign Reference:</span>
          </div>
          <select 
            value={selectedCampaign?.id} 
            onChange={(e) => {
              const camp = campaigns.find(c => c.id === e.target.value);
              if (camp) setSelectedCampaign(camp);
            }}
            className="w-full bg-[#F5F8F4] border border-sage-200 rounded-lg text-xs font-semibold text-ink-900 p-2 focus:outline-none focus:ring-1 focus:ring-sage-800"
          >
            {campaigns.map(camp => (
              <option key={camp.id} value={camp.id}>
                {camp.title} ({camp.budget})
              </option>
            ))}
          </select>
          <div className="text-[10px] text-ink-400 px-1">
            Scores recalculated against selected campaign parameters
          </div>
        </div>
      </div>

      {/* Layout: Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Left Sidebar: Filter Panel */}
        <div className="lg:w-64 flex-shrink-0">
          <MatchFilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            totalResults={filteredCreators.length}
          />
        </div>

        {/* Right: Search + Grid/List */}
        <div className="flex-1 min-w-0">
          {/* Search Bar + View Toggle */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-ink-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search creator, niche, or tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-sage-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-sage-300 shadow-sm"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {activeFilterCount > 0 && (
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-1 rounded-full border border-amber-200">
                  {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
                </span>
              )}
              <div className="flex border border-sage-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 transition ${viewMode === 'grid' ? 'bg-sage-800 text-white' : 'bg-white text-ink-600 hover:bg-sage-50'}`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 transition ${viewMode === 'list' ? 'bg-sage-800 text-white' : 'bg-white text-ink-600 hover:bg-sage-50'}`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          {filteredCreators.length === 0 ? (
            <div className="text-center py-20 text-ink-400">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p className="font-medium text-sm">No creators match your filters.</p>
              <button onClick={handleResetFilters} className="text-sage-700 text-xs underline mt-2">Reset all filters</button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredCreators.map(creator => (
                viewMode === 'grid'
                  ? <CreatorCard key={creator.id} creator={creator} onSelectCreator={onSelectCreator} onOpenMatchModal={onOpenMatchModal} onOpenScanner={onOpenScanner} />
                  : <CreatorListRow key={creator.id} creator={creator} onSelectCreator={onSelectCreator} onOpenMatchModal={onOpenMatchModal} onOpenScanner={onOpenScanner} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── GRID CARD ─────────────────────────────────────────────────────────────────
function CreatorCard({ creator, onSelectCreator, onOpenMatchModal, onOpenScanner }) {
  const score = creator.calculatedMatchScore || 0;
  const scoreColor = score >= 90 ? 'text-emerald-700' : score >= 75 ? 'text-amber-600' : 'text-ink-500';
  const scoreBg = score >= 90 ? 'bg-emerald-50 border-emerald-200' : score >= 75 ? 'bg-amber-50 border-amber-200' : 'bg-sage-50 border-sage-200';

  return (
    <div className="bg-white rounded-3xl border border-sage-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
      
      {/* Cover + Avatar */}
      <div className="relative">
        <div className="h-32 w-full overflow-hidden bg-sage-100">
          <img src={creator.cover} alt={creator.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Match Score Badge */}
        <div 
          onClick={() => onOpenMatchModal(creator)}
          className={`absolute top-3 right-3 backdrop-blur-md border px-3 py-1 rounded-full shadow-md flex items-center space-x-1.5 cursor-pointer hover:opacity-90 transition ${scoreBg}`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span className={`text-xs font-bold ${scoreColor}`}>{score}% Match</span>
        </div>

        {/* Avatar */}
        <div className="absolute -bottom-7 left-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-sage-200">
            <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="pt-10 px-6 pb-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-editorial font-semibold text-ink-900 group-hover:text-sage-800 transition">
                {creator.name}
              </h3>
              <p className="text-xs text-ink-500 font-medium">{creator.handle}</p>
            </div>
            <button 
              onClick={() => onOpenScanner(creator)}
              className="flex items-center space-x-1 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100 transition"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{creator.socialStats?.authenticityScore || 98}% Safe</span>
            </button>
          </div>

          <p className="text-xs text-ink-600 line-clamp-2 mt-3 leading-relaxed">{creator.bio}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {creator.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] font-medium bg-[#F5F8F4] text-ink-700 px-2.5 py-0.5 rounded-md border border-sage-200/60">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* AI Match Score Bar — Day 4 Feature */}
        <MatchScoreBar score={score} />

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-2 bg-[#F9FAF8] rounded-xl p-2.5 border border-sage-100 text-center">
          <div>
            <div className="text-[10px] text-ink-500">Reach</div>
            <div className="text-xs font-bold text-ink-900">{creator.socialStats?.instagram}</div>
          </div>
          <div>
            <div className="text-[10px] text-ink-500">Engage</div>
            <div className="text-xs font-bold text-emerald-700">{creator.socialStats?.engagementRate}</div>
          </div>
          <div>
            <div className="text-[10px] text-ink-500">Rate</div>
            <div className="text-xs font-bold text-ink-900">{creator.startingRate?.split('/')[0]}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-1 flex items-center gap-2">
          <button
            onClick={() => onSelectCreator(creator)}
            className="flex-1 bg-sage-800 hover:bg-sage-900 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow transition flex items-center justify-center space-x-1.5"
          >
            <span>View Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onOpenMatchModal(creator)}
            className="bg-white hover:bg-sage-50 text-ink-800 border border-sage-300 p-2.5 rounded-xl transition"
            title="View Match Analysis"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MATCH SCORE BAR ────────────────────────────────────────────────────────────
function MatchScoreBar({ score }) {
  const pct = Math.min(Math.max(score, 0), 100);
  const color = pct >= 90 ? 'bg-emerald-500' : pct >= 75 ? 'bg-amber-400' : 'bg-sage-400';
  const trackColor = pct >= 90 ? 'bg-emerald-100' : pct >= 75 ? 'bg-amber-100' : 'bg-sage-100';

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-wider font-bold text-ink-500">AI Compatibility</span>
        <span className="text-[10px] font-bold text-ink-700">{pct}%</span>
      </div>
      <div className={`w-full h-1.5 rounded-full ${trackColor} overflow-hidden`}>
        <div 
          className={`h-full rounded-full ${color} transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── LIST ROW ──────────────────────────────────────────────────────────────────
function CreatorListRow({ creator, onSelectCreator, onOpenMatchModal, onOpenScanner }) {
  const score = creator.calculatedMatchScore || 0;
  const scoreColor = score >= 90 ? 'text-emerald-700' : score >= 75 ? 'text-amber-600' : 'text-ink-500';

  return (
    <div className="bg-white border border-sage-200 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition group">
      {/* Avatar */}
      <img src={creator.avatar} alt={creator.name} className="w-14 h-14 rounded-xl object-cover border-2 border-sage-100 flex-shrink-0" />

      {/* Main Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-bold text-ink-900 group-hover:text-sage-800 transition">{creator.name}</h3>
          <span className="text-[10px] text-ink-400 font-medium">{creator.handle}</span>
          {creator.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] font-medium bg-sage-50 text-ink-700 px-2 py-0.5 rounded border border-sage-200/60 hidden sm:inline-block">{tag}</span>
          ))}
        </div>
        <p className="text-xs text-ink-500 mt-0.5 truncate">{creator.bio}</p>
        <div className="flex items-center gap-4 mt-1.5 text-[10px] text-ink-500">
          <span><strong className="text-ink-800">{creator.socialStats?.instagram}</strong> reach</span>
          <span className="text-emerald-600 font-semibold">{creator.socialStats?.engagementRate} eng.</span>
          <span>{creator.startingRate?.split('/')[0]}</span>
        </div>
      </div>

      {/* Match Bar + Score */}
      <div className="w-28 flex-shrink-0 hidden md:block">
        <div className="text-right text-xs font-bold mb-1 {scoreColor}">
          <span className={scoreColor}>{score}%</span>
          <span className="text-ink-400 font-normal text-[10px] ml-1">match</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-sage-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${score >= 90 ? 'bg-emerald-500' : score >= 75 ? 'bg-amber-400' : 'bg-sage-400'}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => onOpenScanner(creator)}
          className="flex items-center space-x-1 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg text-[10px] font-semibold text-emerald-800 hover:bg-emerald-100 transition"
        >
          <ShieldCheck className="w-3 h-3" />
          <span>{creator.socialStats?.authenticityScore || 98}%</span>
        </button>
        <button
          onClick={() => onOpenMatchModal(creator)}
          className="p-2 border border-sage-200 rounded-lg text-amber-500 hover:bg-amber-50 transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onSelectCreator(creator)}
          className="bg-sage-800 hover:bg-sage-900 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
        >
          <span>View</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
