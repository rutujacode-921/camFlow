import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Sparkles, 
  Briefcase, 
  DollarSign, 
  Tag, 
  Calendar, 
  Target, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

export default function CreateCampaignModal({ isOpen, onClose, onCampaignCreated }) {
  const { user } = useAuth();
  const [title, setTitle] = useState('Autumn Silk & Fragrance Editorial Drop');
  const [productCategory, setProductCategory] = useState('Product & Editorial Photography');
  const [budget, setBudget] = useState('$5,200');
  const [deliverables, setDeliverables] = useState('2x 4K Cinematic Reels + 4x Editorial Product Stills');
  const [targetAge, setTargetAge] = useState('25-34');
  const [deadline, setDeadline] = useState('Dec 15, 2026');
  const [tags, setTags] = useState('Photography, Luxury Fashion, Still Life, Editorial');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const campaignPayload = {
      brandName: user?.companyName || user?.name || 'Aura Botanicals',
      title,
      productCategory,
      budget,
      deliverables,
      deadline,
      targetAge,
      tags: tags.split(',').map(t => t.trim())
    };

    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignPayload)
      });
      const data = await res.json();
      setLoading(false);
      if (data.success && onCampaignCreated) {
        onCampaignCreated(data.campaign);
        onClose();
      }
    } catch (err) {
      setLoading(false);
      // Fallback local creation
      const localCamp = {
        id: `camp-${Date.now()}`,
        brandName: user?.companyName || user?.name || 'My Brand',
        brandLogo: '✨',
        title,
        productCategory,
        budget,
        tags: tags.split(',').map(t => t.trim()),
        deliverables,
        deadline,
        targetDemographics: { targetAge, targetGender: 'any', minAuthenticity: 90 },
        status: 'Active'
      };
      if (onCampaignCreated) onCampaignCreated(localCamp);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-sage-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-sage-200 flex items-center justify-between bg-[#F8FAF7]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-sage-800">
                Brand Brief Creator
              </span>
              <h3 className="text-xl font-editorial font-semibold text-ink-900">
                Post Marketing Campaign Brief
              </h3>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-sage-200 flex items-center justify-center text-ink-500 hover:text-ink-900 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
              Campaign Title
            </label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Clean Skincare Winter Launch"
              className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3.5 py-2.5 text-xs text-ink-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sage-300"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                Product Category
              </label>
              <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3 py-2.5 text-xs text-ink-900 font-medium focus:outline-none"
              >
                <option value="Product & Editorial Photography">Product & Editorial Photography</option>
                <option value="Eco-Friendly Skincare & Beauty">Eco-Friendly Skincare & Beauty</option>
                <option value="Tech & Workspace Design">Tech & Workspace Design</option>
                <option value="Luxury Fashion">Luxury Fashion</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                Campaign Budget (Escrow-Backed)
              </label>
              <input 
                type="text" 
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. $4,500"
                className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3.5 py-2.5 text-xs text-ink-900 font-bold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
              Deliverables Required
            </label>
            <input 
              type="text" 
              required
              value={deliverables}
              onChange={(e) => setDeliverables(e.target.value)}
              placeholder="e.g. 1x Editorial Moodboard + 2x Cinematic IG Reels"
              className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3.5 py-2.5 text-xs text-ink-900 font-medium focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                Target Age Group
              </label>
              <select
                value={targetAge}
                onChange={(e) => setTargetAge(e.target.value)}
                className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3 py-2 text-xs text-ink-900 font-medium"
              >
                <option value="18-24">18–24 Years</option>
                <option value="25-34">25–34 Years (Core)</option>
                <option value="35-44">35–44 Years</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                Target Completion Deadline
              </label>
              <input 
                type="text" 
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. Dec 2026"
                className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3 py-2 text-xs text-ink-900 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
              Niche Tags (Comma-Separated for AI Match Scoring)
            </label>
            <input 
              type="text" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. Skincare, Clean Beauty, Editorial"
              className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3.5 py-2.5 text-xs text-ink-900 font-medium"
            />
          </div>

          <div className="bg-[#EBF3EA] p-3.5 rounded-2xl border border-sage-300 text-xs text-sage-900 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Publishing this brief dynamically recalculates the AI Match Score for all creators in your directory!
            </span>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-sage-800 hover:bg-sage-900 text-white font-semibold text-xs py-3 px-6 rounded-xl shadow-md transition flex items-center space-x-1.5 disabled:opacity-50"
            >
              <span>{loading ? 'Publishing Brief...' : 'Publish Campaign Brief'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
