import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles, Image, Tag, DollarSign, MapPin, Award } from 'lucide-react';

const POPULAR_TAGS = [
  "Photography", "Luxury Fashion", "Product Still Life", "Editorial",
  "Clean Beauty", "Skincare", "Wellness", "Sustainability",
  "Tech", "Desk Setup", "Productivity", "Minimalism",
  "Cinematic Reels", "Travel", "Architecture"
];

export default function EditPortfolioModal({ isOpen, onClose, creator, onSave }) {
  if (!isOpen || !creator) return null;

  const [formData, setFormData] = useState({
    name: creator.name || '',
    role: creator.role || '',
    handle: creator.handle || '',
    location: creator.location || '',
    category: creator.category || '',
    startingRate: creator.startingRate || '',
    bio: creator.bio || '',
    avatar: creator.avatar || '',
    cover: creator.cover || '',
    tags: creator.tags || [],
    featuredTitle: creator.featuredWork?.title || '',
    featuredCategory: creator.featuredWork?.category || '',
    featuredDescription: creator.featuredWork?.description || '',
    testimonialQuote: creator.testimonial?.quote || '',
    testimonialClient: creator.testimonial?.client || '',
  });

  const [newTag, setNewTag] = useState('');
  const [activeTab, setActiveTab] = useState('identity'); // 'identity' | 'editorial' | 'featured'
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (creator) {
      setFormData({
        name: creator.name || '',
        role: creator.role || '',
        handle: creator.handle || '',
        location: creator.location || '',
        category: creator.category || '',
        startingRate: creator.startingRate || '',
        bio: creator.bio || '',
        avatar: creator.avatar || '',
        cover: creator.cover || '',
        tags: creator.tags || [],
        featuredTitle: creator.featuredWork?.title || '',
        featuredCategory: creator.featuredWork?.category || '',
        featuredDescription: creator.featuredWork?.description || '',
        testimonialQuote: creator.testimonial?.quote || '',
        testimonialClient: creator.testimonial?.client || '',
      });
    }
  }, [creator]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleTag = (tag) => {
    setFormData(prev => {
      const exists = prev.tags.includes(tag);
      return {
        ...prev,
        tags: exists ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]
      };
    });
  };

  const handleAddCustomTag = (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    if (!formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
    }
    setNewTag('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      name: formData.name,
      role: formData.role,
      handle: formData.handle.startsWith('@') ? formData.handle : `@${formData.handle}`,
      location: formData.location,
      category: formData.category,
      startingRate: formData.startingRate,
      bio: formData.bio,
      avatar: formData.avatar,
      cover: formData.cover,
      tags: formData.tags,
      featuredWork: {
        ...creator.featuredWork,
        title: formData.featuredTitle,
        category: formData.featuredCategory,
        description: formData.featuredDescription
      },
      testimonial: {
        ...creator.testimonial,
        quote: formData.testimonialQuote,
        client: formData.testimonialClient
      }
    };

    const res = await onSave(payload);
    setIsSaving(false);
    if (res?.success) {
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAFAF8] rounded-3xl shadow-2xl border border-sage-200/80 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-sage-200/60 bg-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-sage-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Day 3 Deep Customization</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-editorial font-semibold text-ink-900 mt-0.5">
              Edit Editorial Portfolio
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-sage-100 text-ink-500 hover:text-ink-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 sm:px-8 bg-sage-50/60 border-b border-sage-200/60 flex space-x-4">
          <button
            type="button"
            onClick={() => setActiveTab('identity')}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'identity'
                ? 'border-ink-900 text-ink-900'
                : 'border-transparent text-ink-500 hover:text-ink-800'
            }`}
          >
            1. Identity & Pricing
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('editorial')}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'editorial'
                ? 'border-ink-900 text-ink-900'
                : 'border-transparent text-ink-500 hover:text-ink-800'
            }`}
          >
            2. Bio & Niche Taxonomy
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('featured')}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'featured'
                ? 'border-ink-900 text-ink-900'
                : 'border-transparent text-ink-500 hover:text-ink-800'
            }`}
          >
            3. Case Study & Testimonial
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* TAB 1: IDENTITY & PRICING */}
          {activeTab === 'identity' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sage-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-700 uppercase tracking-wider mb-1.5">
                    Editorial Role / Discipline
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sage-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-700 uppercase tracking-wider mb-1.5">
                    Public Handle
                  </label>
                  <input
                    type="text"
                    name="handle"
                    value={formData.handle}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sage-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-700 uppercase tracking-wider mb-1.5">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-ink-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Paris / New York"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-sage-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-700 uppercase tracking-wider mb-1.5">
                    Primary Category Vertical
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Product & Editorial Photography"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sage-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-700 uppercase tracking-wider mb-1.5">
                    Starting Package Rate
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-ink-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="startingRate"
                      value={formData.startingRate}
                      onChange={handleChange}
                      placeholder="e.g. $1,800 / project"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-sage-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 uppercase tracking-wider mb-1.5">
                  Profile Avatar Image URL
                </label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sage-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30"
                />
              </div>
            </div>
          )}

          {/* TAB 2: BIO & TAXONOMY TAGS */}
          {activeTab === 'editorial' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block text-xs font-semibold text-ink-700 uppercase tracking-wider mb-1.5">
                  Editorial Artist Statement / Bio
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Articulate your visual aesthetic, brand philosophy, and style..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sage-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30 leading-relaxed"
                ></textarea>
                <span className="text-[11px] text-ink-400">Displayed in the hero showcase of your portfolio.</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 uppercase tracking-wider mb-2">
                  AI Match Taxonomy Tags ({formData.tags.length} selected)
                </label>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {POPULAR_TAGS.map(tag => {
                    const isSelected = formData.tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleToggleTag(tag)}
                        className={`text-xs px-3 py-1.5 rounded-full transition-all border ${
                          isSelected
                            ? 'bg-sage-800 text-white border-sage-900 font-semibold shadow-xs'
                            : 'bg-white text-ink-700 border-sage-200 hover:border-sage-300'
                        }`}
                      >
                        {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add custom niche keyword..."
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-sage-200 text-xs focus:outline-none focus:ring-2 focus:ring-sage-500/30"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomTag}
                    className="px-3 py-2 bg-sage-200 hover:bg-sage-300 text-sage-900 font-semibold rounded-xl text-xs transition-colors"
                  >
                    Add Tag
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FEATURED CASE STUDY & TESTIMONIAL */}
          {activeTab === 'featured' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 bg-white rounded-2xl border border-sage-200/80 space-y-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-sage-800 block">
                  Featured Case Study Showcase
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-ink-600 mb-1">
                      Case Study Title
                    </label>
                    <input
                      type="text"
                      name="featuredTitle"
                      value={formData.featuredTitle}
                      onChange={handleChange}
                      placeholder="e.g. Paris Secrets"
                      className="w-full px-3 py-2 rounded-xl bg-[#FAFAF8] border border-sage-200 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-ink-600 mb-1">
                      Sub-Category
                    </label>
                    <input
                      type="text"
                      name="featuredCategory"
                      value={formData.featuredCategory}
                      onChange={handleChange}
                      placeholder="e.g. Product Photography"
                      className="w-full px-3 py-2 rounded-xl bg-[#FAFAF8] border border-sage-200 text-xs focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-ink-600 mb-1">
                    Showcase Narrative
                  </label>
                  <textarea
                    rows={2}
                    name="featuredDescription"
                    value={formData.featuredDescription}
                    onChange={handleChange}
                    placeholder="Brief description of the campaign deliverables and aesthetic vision..."
                    className="w-full px-3 py-2 rounded-xl bg-[#FAFAF8] border border-sage-200 text-xs focus:outline-none leading-relaxed"
                  ></textarea>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-sage-200/80 space-y-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-rose-600 block">
                  Verified Client Testimonial
                </span>
                <div>
                  <label className="block text-[11px] font-semibold text-ink-600 mb-1">
                    Brand Partner Name
                  </label>
                  <input
                    type="text"
                    name="testimonialClient"
                    value={formData.testimonialClient}
                    onChange={handleChange}
                    placeholder="e.g. Aura Cosmetics"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAFAF8] border border-sage-200 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-ink-600 mb-1">
                    Client Quote
                  </label>
                  <textarea
                    rows={2}
                    name="testimonialQuote"
                    value={formData.testimonialQuote}
                    onChange={handleChange}
                    placeholder="Quote reflecting on performance, communication, or conversion results..."
                    className="w-full px-3 py-2 rounded-xl bg-[#FAFAF8] border border-sage-200 text-xs focus:outline-none leading-relaxed"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Footer Save Actions */}
          <div className="pt-4 border-t border-sage-200/60 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-ink-600 hover:text-ink-900 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving || saveSuccess}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all inline-flex items-center space-x-2 shadow-sm ${
                saveSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-ink-900 hover:bg-black text-white hover:scale-[1.02]'
              }`}
            >
              {isSaving ? (
                <span>Persisting Changes...</span>
              ) : saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Portfolio Saved!</span>
                </>
              ) : (
                <>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

