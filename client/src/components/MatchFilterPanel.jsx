import React, { useState } from 'react';
import { SlidersHorizontal, X, Search, Tag, ChevronDown, Zap } from 'lucide-react';

const ALL_TAGS = [
  'Photography', 'Luxury Fashion', 'Product Still Life', 'Editorial',
  'Skincare', 'Clean Beauty', 'Sustainability', 'Wellness',
  'Tech', 'Design', 'Minimalism', 'Desk Setup', 'Productivity',
  'Lifestyle', 'Fashion', 'Food', 'Travel', 'Fitness'
];

export default function MatchFilterPanel({ filters, onChange, onReset, totalResults }) {
  const [expanded, setExpanded] = useState(true);

  const toggleTag = (tag) => {
    const current = filters.tags || [];
    const next = current.includes(tag)
      ? current.filter(t => t !== tag)
      : [...current, tag];
    onChange({ ...filters, tags: next });
  };

  const budgetPresets = [
    { label: 'Under ₹1L', min: 0, max: 100000 },
    { label: '₹1L – ₹2L', min: 100000, max: 200000 },
    { label: '₹2L – ₹4L', min: 200000, max: 400000 },
    { label: '₹4L+', min: 400000, max: 9999999 },
  ];

  const formatBudget = (val) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
    return `₹${val}`;
  };

  return (
    <div className="bg-white border border-sage-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Panel Header */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-[#F8FAF7] border-b border-sage-200 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-sage-800" />
          <span className="text-xs font-bold text-ink-900 uppercase tracking-wider">Smart Filters</span>
          {totalResults !== undefined && (
            <span className="text-[10px] bg-sage-100 text-sage-900 px-2 py-0.5 rounded-full font-semibold">
              {totalResults} creators
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => { e.stopPropagation(); onReset(); }}
            className="text-[10px] text-ink-500 hover:text-rose-600 font-semibold flex items-center space-x-1 transition"
          >
            <X className="w-3 h-3" />
            <span>Reset</span>
          </button>
          <ChevronDown className={`w-4 h-4 text-ink-500 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {expanded && (
        <div className="p-4 space-y-5">

          {/* Minimum Match Score */}
          <div>
            <label className="text-[10px] uppercase font-bold text-ink-700 tracking-wider block mb-2 flex items-center space-x-1">
              <Zap className="w-3 h-3 text-amber-500" />
              <span>Min. AI Match Score: <span className="text-amber-600">{filters.minMatch || 50}%</span></span>
            </label>
            <input
              type="range"
              min={50}
              max={99}
              step={1}
              value={filters.minMatch || 50}
              onChange={(e) => onChange({ ...filters, minMatch: Number(e.target.value) })}
              className="w-full h-1.5 appearance-none bg-sage-100 rounded-full accent-sage-800 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-ink-400 mt-1">
              <span>50%</span><span>75%</span><span>99%</span>
            </div>
          </div>

          {/* Budget Range Slider */}
          <div>
            <label className="text-[10px] uppercase font-bold text-ink-700 tracking-wider block mb-2">
              Budget Range: <span className="text-sage-800">{formatBudget(filters.budgetMin || 0)} – {formatBudget(filters.budgetMax || 500000)}</span>
            </label>
            {/* Dual Slider Simulation via two inputs */}
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min={0}
                max={500000}
                step={10000}
                value={filters.budgetMin || 0}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val < (filters.budgetMax || 500000)) onChange({ ...filters, budgetMin: val });
                }}
                className="w-full h-1.5 appearance-none bg-sage-100 rounded-full accent-sage-800 cursor-pointer"
              />
            </div>
            <div className="flex items-center space-x-2 mt-1.5">
              <input
                type="range"
                min={0}
                max={500000}
                step={10000}
                value={filters.budgetMax || 500000}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val > (filters.budgetMin || 0)) onChange({ ...filters, budgetMax: val });
                }}
                className="w-full h-1.5 appearance-none bg-rose-100 rounded-full accent-rose-500 cursor-pointer"
              />
            </div>
            {/* Quick presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {budgetPresets.map(preset => {
                const isActive = filters.budgetMin === preset.min && filters.budgetMax === preset.max;
                return (
                  <button
                    key={preset.label}
                    onClick={() => onChange({ ...filters, budgetMin: preset.min, budgetMax: preset.max })}
                    className={`text-[10px] px-2.5 py-1 rounded-lg border font-semibold transition ${
                      isActive ? 'bg-sage-800 text-white border-sage-800' : 'bg-white text-ink-700 border-sage-200 hover:bg-sage-50'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Multi-Tag Filter Chips */}
          <div>
            <label className="text-[10px] uppercase font-bold text-ink-700 tracking-wider block mb-2 flex items-center space-x-1">
              <Tag className="w-3 h-3 text-ink-600" />
              <span>Niche Tags {filters.tags?.length > 0 && <span className="text-amber-600 ml-1">({filters.tags.length} active)</span>}</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_TAGS.map(tag => {
                const active = (filters.tags || []).includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-[10px] px-2.5 py-1 rounded-lg border font-semibold transition ${
                      active
                        ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-sm'
                        : 'bg-white text-ink-600 border-sage-200 hover:bg-sage-50 hover:border-sage-400'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minimum Authenticity Score */}
          <div>
            <label className="text-[10px] uppercase font-bold text-ink-700 tracking-wider block mb-2">
              Min. Authenticity Score: <span className="text-emerald-700">{filters.minAuthenticity || 90}%</span>
            </label>
            <input
              type="range"
              min={80}
              max={99}
              step={1}
              value={filters.minAuthenticity || 90}
              onChange={(e) => onChange({ ...filters, minAuthenticity: Number(e.target.value) })}
              className="w-full h-1.5 appearance-none bg-emerald-50 rounded-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-ink-400 mt-1">
              <span>80%</span><span>90%</span><span>99%</span>
            </div>
          </div>

          {/* Engagement Rate Filter */}
          <div>
            <label className="text-[10px] uppercase font-bold text-ink-700 tracking-wider block mb-2">
              Min. Engagement Rate: <span className="text-indigo-600">{(filters.minEngagement || 3.0).toFixed(1)}%</span>
            </label>
            <input
              type="range"
              min={1}
              max={8}
              step={0.5}
              value={filters.minEngagement || 3.0}
              onChange={(e) => onChange({ ...filters, minEngagement: Number(e.target.value) })}
              className="w-full h-1.5 appearance-none bg-indigo-50 rounded-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-ink-400 mt-1">
              <span>1%</span><span>4%</span><span>8%+</span>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-[10px] uppercase font-bold text-ink-700 tracking-wider block mb-2">Sort Results By</label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { value: 'matchScore', label: 'Match Score' },
                { value: 'engagement', label: 'Engagement' },
                { value: 'authenticity', label: 'Authenticity' },
                { value: 'rating', label: 'Rating' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => onChange({ ...filters, sortBy: opt.value })}
                  className={`text-[10px] px-2.5 py-1 rounded-lg border font-semibold transition ${
                    (filters.sortBy || 'matchScore') === opt.value
                      ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                      : 'bg-white text-ink-600 border-sage-200 hover:bg-sage-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

