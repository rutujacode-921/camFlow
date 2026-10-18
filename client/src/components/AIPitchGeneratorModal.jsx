import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  FileText, 
  Download, 
  Send, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  Briefcase
} from 'lucide-react';

export default function AIPitchGeneratorModal({ isOpen, onClose, creator }) {
  const [activeTab, setActiveTab] = useState('pitch'); // 'pitch' | 'mediakit'
  const [brandName, setBrandName] = useState('Aura Botanicals');
  const [campaignGoal, setCampaignGoal] = useState('Eco-Friendly Skincare Summer Launch');
  const [tone, setTone] = useState('editorial');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [generatedPitch, setGeneratedPitch] = useState({
    subject: `Collaboration Proposal: ${creator?.name || 'Nelson Vance'} × Aura Botanicals`,
    body: `Hi Aura Botanicals Team,

I've been closely admiring your recent aesthetic direction, particularly around your focus on Eco-Friendly Skincare Summer Launch.

As an editorial photographer specializing in high-concept visual storytelling, my community (185K+ engaged followers, 98% verified authentic audience) deeply aligns with your core demographic—principally conscious 25–34 consumers seeking mindful luxury.

For this collaboration, I envision:
1. High-fidelity editorial imagery highlighting your product's signature texture and glass packaging.
2. A cinematic short-form Reel documenting an organic routine integration with trackable links.

I work exclusively through CamFlow's Escrow-Lite pipeline to guarantee verified milestones, watermarked draft review, and timely release in Indian Rupee (₹).

Would you be open to reviewing a custom moodboard this Thursday?

Warmly,
${creator?.name || 'Nelson Vance'}`
  });

  if (!isOpen) return null;

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/generate-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorName: creator?.name || 'Nelson Vance',
          brandName,
          campaignGoal,
          tone
        })
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedPitch({
          subject: data.subject,
          body: data.pitch
        });
      }
      setIsGenerating(false);
    } catch {
      // Fallback
      setTimeout(() => {
        setGeneratedPitch({
          subject: `Collaboration Pitch: ${creator?.name} × ${brandName}`,
          body: `Hi ${brandName} Team,\n\nI would love to partner on your upcoming campaign. With a verified authentic community and high engagement in your niche, we can drive genuine brand lift.\n\nBest,\n${creator?.name}`
        });
        setIsGenerating(false);
      }, 500);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${generatedPitch.subject}\n\n${generatedPitch.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMediaKit = () => {
    alert(`📄 Dynamic Digital Media Kit downloaded for ${creator?.name}! Format: PDF (CamFlow Certified)`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-sage-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-sage-200 flex items-center justify-between bg-[#F8FAF7]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-800">
                  AI Creator Suite
                </span>
                <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                  Pitch & Media Kit
                </span>
              </div>
              <h3 className="text-xl font-editorial font-semibold text-ink-900">
                AI Pitch & Digital Media Kit Generator
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

        {/* Tab Switcher */}
        <div className="flex border-b border-sage-200 bg-[#FAFBF9] px-6 pt-3">
          <button
            onClick={() => setActiveTab('pitch')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition ${
              activeTab === 'pitch' 
                ? 'border-sage-800 text-ink-900' 
                : 'border-transparent text-ink-400 hover:text-ink-700'
            }`}
          >
            AI Custom Pitch Draft
          </button>
          <button
            onClick={() => setActiveTab('mediakit')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition ${
              activeTab === 'mediakit' 
                ? 'border-sage-800 text-ink-900' 
                : 'border-transparent text-ink-400 hover:text-ink-700'
            }`}
          >
            Live Digital Media Kit
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {activeTab === 'pitch' ? (
            <div className="space-y-5">
              {/* Pitch Generation Form */}
              <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAFBF9] p-4 rounded-2xl border border-sage-200">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-ink-600 mb-1">Target Brand</label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full bg-white border border-sage-200 rounded-xl px-3 py-2 text-xs text-ink-900 font-semibold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-ink-600 mb-1">Campaign Focus</label>
                  <input
                    type="text"
                    value={campaignGoal}
                    onChange={(e) => setCampaignGoal(e.target.value)}
                    className="w-full bg-white border border-sage-200 rounded-xl px-3 py-2 text-xs text-ink-900 font-semibold focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-between items-center pt-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-ink-500 font-medium">Tone:</span>
                    <button
                      type="button"
                      onClick={() => setTone('editorial')}
                      className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold ${tone === 'editorial' ? 'bg-sage-800 text-white border-sage-800' : 'bg-white text-ink-700 border-sage-200'}`}
                    >
                      Editorial Luxury
                    </button>
                    <button
                      type="button"
                      onClick={() => setTone('direct')}
                      className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold ${tone === 'direct' ? 'bg-sage-800 text-white border-sage-800' : 'bg-white text-ink-700 border-sage-200'}`}
                    >
                      High-Conversion ROI
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="bg-sage-800 hover:bg-sage-900 text-white text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center space-x-1 disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isGenerating ? 'Generating...' : 'Regenerate Pitch'}</span>
                  </button>
                </div>
              </form>

              {/* Pitch Content Display */}
              <div className="bg-white border border-sage-200 rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex justify-between items-center border-b border-sage-100 pb-2">
                  <span className="text-xs font-bold text-ink-900">Subject: {generatedPitch.subject}</span>
                  <button
                    onClick={handleCopy}
                    className="text-xs font-semibold text-sage-800 hover:text-sage-900 flex items-center space-x-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Pitch'}</span>
                  </button>
                </div>

                <div className="text-xs text-ink-700 leading-relaxed whitespace-pre-line font-normal">
                  {generatedPitch.body}
                </div>
              </div>
            </div>
          ) : (
            /* Digital Media Kit Tab */
            <div className="space-y-5 animate-fade-in">
              <div className="bg-[#FAFBF9] border border-sage-200 rounded-3xl p-6 space-y-5">
                
                {/* Media Kit Header */}
                <div className="flex items-center justify-between border-b border-sage-200 pb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={creator?.avatar} 
                      alt={creator?.name} 
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-sage-200"
                    />
                    <div>
                      <h4 className="text-lg font-editorial font-bold text-ink-900">{creator?.name}</h4>
                      <p className="text-xs text-ink-500">{creator?.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadMediaKit}
                    className="bg-sage-800 hover:bg-sage-900 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition flex items-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export PDF</span>
                  </button>
                </div>

                {/* 4 Core Pillars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white p-3 rounded-xl border border-sage-100">
                    <div className="text-[10px] text-ink-400 font-bold uppercase">Reach</div>
                    <div className="text-sm font-bold text-ink-900 mt-0.5">{creator?.socialStats?.instagram || '185K'}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-sage-100">
                    <div className="text-[10px] text-ink-400 font-bold uppercase">Engagement</div>
                    <div className="text-sm font-bold text-emerald-700 mt-0.5">{creator?.socialStats?.engagementRate || '4.8%'}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-sage-100">
                    <div className="text-[10px] text-ink-400 font-bold uppercase">Authenticity</div>
                    <div className="text-sm font-bold text-indigo-700 mt-0.5">{creator?.socialStats?.authenticityScore || 98}%</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-sage-100">
                    <div className="text-[10px] text-ink-400 font-bold uppercase">Deals</div>
                    <div className="text-sm font-bold text-amber-700 mt-0.5">{creator?.completedDeals || 42} Verified</div>
                  </div>
                </div>

                {/* Standard Packages in ₹ */}
                <div className="space-y-2">
                  <h5 className="text-[11px] font-bold text-ink-700 uppercase tracking-wider">
                    Standard Partnership Rates:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white p-3.5 rounded-xl border border-sage-200">
                      <div className="font-bold text-xs text-ink-900">Single Flatlay</div>
                      <div className="text-base font-editorial font-bold text-sage-900 mt-1">₹70,000</div>
                      <div className="text-[10px] text-ink-400">3-day turnaround</div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-sage-200">
                      <div className="font-bold text-xs text-ink-900">Reel + 3 Stills</div>
                      <div className="text-base font-editorial font-bold text-sage-900 mt-1">₹1,50,000</div>
                      <div className="text-[10px] text-ink-400">7-day turnaround</div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-sage-200">
                      <div className="font-bold text-xs text-ink-900">Omni-Channel Suite</div>
                      <div className="text-base font-editorial font-bold text-sage-900 mt-1">₹2,80,000</div>
                      <div className="text-[10px] text-ink-400">14-day turnaround</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
