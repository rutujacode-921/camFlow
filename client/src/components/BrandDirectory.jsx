import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2, 
  Star,
  MapPin,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Product & Editorial Photography', 'Eco-Friendly Skincare & Beauty', 'Tech & Workspace Design'];

  const filteredCreators = creators.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header with AI Match Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-sage-200/80 pb-8">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-sage-800">
            Brand Discovery Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-editorial font-medium text-ink-900 mt-1">
            Curated Creator Marketplace
          </h1>
          <p className="text-sm text-ink-500 mt-2 max-w-xl">
            Match with verified editorial creators scored dynamically against your live campaign parameters using CamFlow's multi-factor affinity algorithm.
          </p>
        </div>

        {/* Campaign Context Selector for Live Match Scoring */}
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
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-ink-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search creator, niche, or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-sage-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-sage-300 shadow-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3.5 py-2 rounded-xl transition ${
                selectedCategory === cat 
                  ? 'bg-sage-800 text-white font-semibold shadow-sm' 
                  : 'bg-white hover:bg-sage-50 text-ink-700 border border-sage-200'
              }`}
            >
              {cat === 'All' ? 'All Niches' : cat.split('&')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Creator Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCreators.map(creator => {
          return (
            <div 
              key={creator.id}
              className="bg-white rounded-3xl border border-sage-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              {/* Creator Card Header with Cover & Avatar */}
              <div className="relative">
                <div className="h-32 w-full overflow-hidden bg-sage-100">
                  <img 
                    src={creator.cover} 
                    alt={creator.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>

                {/* Match Score Badge (Killer Feature 1) */}
                <div 
                  onClick={() => onOpenMatchModal(creator)}
                  className="absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-sage-200 px-3 py-1 rounded-full shadow-md flex items-center space-x-1.5 cursor-pointer hover:bg-sage-100 transition"
                  title="Click to see AI Match breakdown"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span className="text-xs font-bold text-ink-900">
                    {creator.calculatedMatchScore || 94}% Match
                  </span>
                </div>

                {/* Avatar with Arch Accent */}
                <div className="absolute -bottom-7 left-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-sage-200">
                    <img 
                      src={creator.avatar} 
                      alt={creator.name} 
                      className="w-full h-full object-cover"
                    />
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
                      <p className="text-xs text-ink-500 font-medium">
                        {creator.handle}
                      </p>
                    </div>
                    
                    {/* Trust Badge (Killer Feature 4) */}
                    <button 
                      onClick={() => onOpenScanner(creator)}
                      className="flex items-center space-x-1 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100 transition"
                      title="Inspect Fake Follower Audit"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{creator.socialStats?.authenticityScore || 98}% Safe</span>
                    </button>
                  </div>

                  <p className="text-xs text-ink-600 line-clamp-2 mt-3 font-normal leading-relaxed">
                    {creator.bio}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {creator.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] font-medium bg-[#F5F8F4] text-ink-700 px-2.5 py-0.5 rounded-md border border-sage-200/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

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
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onSelectCreator(creator)}
                    className="flex-1 bg-sage-800 hover:bg-sage-900 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow transition flex items-center justify-center space-x-1.5"
                  >
                    <span>View 1:1 Portfolio</span>
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
        })}
      </div>

    </div>
  );
}
