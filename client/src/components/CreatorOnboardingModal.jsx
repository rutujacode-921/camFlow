import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Camera, 
  Sparkles, 
  Instagram, 
  TrendingUp, 
  Tag, 
  DollarSign, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function CreatorOnboardingModal({ isOpen, onClose, onCreatorCreated }) {
  const { completeCreatorOnboarding, user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [roleTitle, setRoleTitle] = useState('Editorial Photographer & Visual Director');
  const [handle, setHandle] = useState(`@${user?.name?.toLowerCase().replace(/\s+/g, '') || 'creator'}`);
  const [location, setLocation] = useState('New York / Paris');
  const [bio, setBio] = useState('Crafting high-fidelity editorial visual campaigns and minimalist product still lifes with verified organic audience conversion.');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80');

  // Step 2: Metrics
  const [audienceSize, setAudienceSize] = useState('145K');
  const [engagementRate, setEngagementRate] = useState('5.1%');
  
  // Step 3: Category & Tags
  const [category, setCategory] = useState('Product & Editorial Photography');
  const availableTags = ['Photography', 'Editorial', 'Luxury Fashion', 'Clean Beauty', 'Skincare', 'Still Life', 'Minimalism', 'Short-form Video'];
  const [selectedTags, setSelectedTags] = useState(['Photography', 'Editorial', 'Still Life']);
  const [featuredTitle, setFeaturedTitle] = useState('Studio Essence & Glass');
  const [featuredDescription, setFeaturedDescription] = useState('A monochromatic study in product transparency and natural refraction.');

  // Step 4: Pricing
  const [startingRate, setStartingRate] = useState('$1,800 / project');
  const [acceptEscrow, setAcceptEscrow] = useState(true);

  if (!isOpen) return null;

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleFinish = async () => {
    if (!acceptEscrow) {
      setError('You must accept the CamFlow Escrow-Lite payment terms to guarantee milestone security.');
      return;
    }

    setLoading(true);
    setError('');

    const creatorPayload = {
      roleTitle,
      handle,
      location,
      bio,
      avatarUrl,
      category,
      tags: selectedTags,
      audienceSize,
      engagementRate,
      startingRate,
      featuredTitle,
      featuredDescription
    };

    const res = await completeCreatorOnboarding(creatorPayload);
    setLoading(false);

    if (res.success) {
      onClose();
      if (onCreatorCreated) {
        onCreatorCreated(res.creator);
      }
    } else {
      setError(res.error || 'Failed to complete onboarding');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-sage-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-sage-200 flex items-center justify-between bg-[#F8FAF7]">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-sage-800">
              Creator Onboarding • Step {step} of 4
            </span>
            <h3 className="text-xl font-editorial font-semibold text-ink-900">
              {step === 1 && 'Define Your Visual Identity'}
              {step === 2 && 'Verify Channel & Audience Reach'}
              {step === 3 && 'Editorial Category & Showcase'}
              {step === 4 && 'Commercial Rates & Escrow Protection'}
            </h3>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-sage-200 flex items-center justify-center text-ink-500 hover:text-ink-900 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-sage-100 h-1.5 flex">
          <div className="bg-sage-800 h-1.5 transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 bg-[#F5F8F4] p-4 rounded-2xl border border-sage-200">
                <img 
                  src={avatarUrl} 
                  alt="Avatar Preview" 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm"
                />
                <div className="flex-1">
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                    Profile Avatar URL
                  </label>
                  <input 
                    type="url" 
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="w-full bg-white border border-sage-200 rounded-xl px-3 py-1.5 text-xs text-ink-900 focus:outline-none focus:ring-1 focus:ring-sage-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                    Professional Title / Discipline
                  </label>
                  <input 
                    type="text" 
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    placeholder="e.g. Editorial Photographer"
                    className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3 py-2 text-xs text-ink-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                    Public Social Handle
                  </label>
                  <input 
                    type="text" 
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="@yourhandle"
                    className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3 py-2 text-xs text-ink-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                  Base Location(s)
                </label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Paris / New York"
                  className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3 py-2 text-xs text-ink-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                  Editorial Portfolio Bio
                </label>
                <textarea 
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3 py-2 text-xs text-ink-900 font-normal leading-relaxed"
                ></textarea>
              </div>
            </div>
          )}

          {/* STEP 2: METRICS */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-[#EBF3EA] p-4 rounded-2xl border border-sage-300 text-xs text-sage-900 flex items-center space-x-3">
                <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
                <div>
                  <strong>Audience Demographics Pre-check:</strong> These metrics initialize your verified Trust Badge and feed directly into brand AI Match calculations.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                    Primary Audience Size
                  </label>
                  <input 
                    type="text" 
                    value={audienceSize}
                    onChange={(e) => setAudienceSize(e.target.value)}
                    placeholder="e.g. 145K"
                    className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3 py-2.5 text-xs text-ink-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                    Average Engagement Rate
                  </label>
                  <input 
                    type="text" 
                    value={engagementRate}
                    onChange={(e) => setEngagementRate(e.target.value)}
                    placeholder="e.g. 5.1%"
                    className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3 py-2.5 text-xs text-ink-900 font-semibold"
                  />
                </div>
              </div>

              <div className="p-4 bg-white border border-sage-200 rounded-2xl space-y-2">
                <div className="text-xs font-bold text-ink-900 flex items-center space-x-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Audited Demographic Projections</span>
                </div>
                <p className="text-xs text-ink-600">
                  Top Age Bracket: <strong>25–34 Years (54%)</strong> • Primary Geographies: <strong>USA (45%), UK (25%)</strong> • Bot Ratio: <strong>&lt; 1.5% (Clean Organic)</strong>
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: CATEGORY & SHOWCASE */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1.5">
                  Primary Market Vertical
                </label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl p-2.5 text-xs font-semibold text-ink-900 focus:outline-none"
                >
                  <option value="Product & Editorial Photography">Product & Editorial Photography</option>
                  <option value="Eco-Friendly Skincare & Beauty">Eco-Friendly Skincare & Beauty</option>
                  <option value="Tech & Workspace Design">Tech & Workspace Design</option>
                  <option value="Luxury Fashion & Lifestyle">Luxury Fashion & Lifestyle</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1.5">
                  Select Niche Tags (Used in AI Match Algorithm)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition ${selectedTags.includes(tag) ? 'bg-sage-800 text-white border-sage-800 font-semibold' : 'bg-white text-ink-700 border-sage-200 hover:bg-sage-50'}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-sage-200 space-y-3">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-700">
                  Featured Case Study (Displays on 1:1 Reference Card)
                </label>
                <input 
                  type="text" 
                  value={featuredTitle}
                  onChange={(e) => setFeaturedTitle(e.target.value)}
                  placeholder="Featured Project Title"
                  className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3 py-2 text-xs text-ink-900 font-semibold"
                />
                <textarea 
                  rows={2}
                  value={featuredDescription}
                  onChange={(e) => setFeaturedDescription(e.target.value)}
                  placeholder="Brief description of the visual campaign..."
                  className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3 py-2 text-xs text-ink-900 font-normal"
                ></textarea>
              </div>
            </div>
          )}

          {/* STEP 4: PRICING & ESCROW TERMS */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                  Starting Campaign Package Rate
                </label>
                <input 
                  type="text" 
                  value={startingRate}
                  onChange={(e) => setStartingRate(e.target.value)}
                  placeholder="e.g. $1,800 / project"
                  className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3 py-2.5 text-xs text-ink-900 font-bold"
                />
              </div>

              {/* Escrow Guarantee Agreement */}
              <div className="bg-[#FAF8F5] border border-amber-300 rounded-2xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>CamFlow Escrow-Lite Creator Commitment</span>
                </div>
                <p className="text-xs text-ink-700 leading-relaxed">
                  By joining, you agree to submit draft content through CamFlow's Watermarked Preview Vault. In return, brands are required to lock 100% of agreed milestone funds into escrow before you begin production.
                </p>
                <label className="flex items-center space-x-2 pt-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={acceptEscrow} 
                    onChange={(e) => setAcceptEscrow(e.target.checked)}
                    className="rounded text-sage-800 focus:ring-sage-800"
                  />
                  <span className="text-xs font-semibold text-ink-900">
                    I agree to the Escrow-Lite payment terms & watermarked draft workflow.
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-6 border-t border-sage-200 bg-[#F8FAF7] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-ink-700 hover:text-ink-900 bg-white border border-sage-200 px-4 py-2 rounded-xl"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div></div>}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-sage-800 hover:bg-sage-900 text-white px-5 py-2.5 rounded-xl shadow transition"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={loading}
              onClick={handleFinish}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl shadow-md transition disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{loading ? 'Creating Portfolio...' : 'Launch My Live Portfolio'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
