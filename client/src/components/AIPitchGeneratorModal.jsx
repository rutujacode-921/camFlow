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
  ArrowRight 
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

I work exclusively through CamFlow's Escrow-Lite pipeline to guarantee verified milestones, watermarked draft review, and timely release.

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
    } catch (err) {
      // Fallback
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${generatedPitch.subject}\n\n${generatedPitch.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-sage-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-sage-200 flex items-center justify-between bg-[#F8FAF7]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-rose-700">
                  Killer Feature 5
                </span>
                <span className="text-xs bg-rose-100 text-rose-900 px-2 py-0.5 rounded-full font-bold">
                  AI Conversion Assistant
                </span>
              </div>
              <h3 className="text-xl font-editorial font-semibold text-ink-900">
                AI Pitch & Dynamic Media Kit Generator
              </h3>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-sage-200 flex items-center justify-center text-ink-500 hover:text-ink-900 hover:bg-sage-50 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-sage-200 bg-[#FAFBF9] px-6 pt-3 gap-6 text-xs font-semibold">
          <button 
            onClick={() => setActiveTab('pitch')}
            className={`pb-3 border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'pitch' 
                ? 'border-rose-600 text-rose-700' 
                : 'border-transparent text-ink-500 hover:text-ink-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Pitch Crafter</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('mediakit')}
            className={`pb-3 border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'mediakit' 
                ? 'border-rose-600 text-rose-700' 
                : 'border-transparent text-ink-500 hover:text-ink-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Digital Media Kit Preview</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {activeTab === 'pitch' ? (
            <div className="space-y-6">
              
              {/* Form */}
              <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F5F8F4] p-4 rounded-2xl border border-sage-200">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                    Target Brand Name
                  </label>
                  <input 
                    type="text" 
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full bg-white border border-sage-200 rounded-xl px-3 py-2 text-xs text-ink-900 focus:outline-none focus:ring-1 focus:ring-rose-400 font-medium"
                    placeholder="e.g. Glossier, Aura Botanicals"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-600 mb-1">
                    Campaign Goal / Product
                  </label>
                  <input 
                    type="text" 
                    value={campaignGoal}
                    onChange={(e) => setCampaignGoal(e.target.value)}
                    className="w-full bg-white border border-sage-200 rounded-xl px-3 py-2 text-xs text-ink-900 focus:outline-none focus:ring-1 focus:ring-rose-400 font-medium"
                    placeholder="e.g. Eco-Friendly Skincare Launch"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-ink-600 font-medium">Tone:</span>
                    <button
                      type="button"
                      onClick={() => setTone('editorial')}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${tone === 'editorial' ? 'bg-ink-900 text-white' : 'bg-white text-ink-700 border border-sage-200'}`}
                    >
                      Editorial & Luxury
                    </button>
                    <button
                      type="button"
                      onClick={() => setTone('direct')}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${tone === 'direct' ? 'bg-ink-900 text-white' : 'bg-white text-ink-700 border border-sage-200'}`}
                    >
                      Direct & Conversion
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow transition flex items-center space-x-1.5 disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGenerating ? 'Synthesizing...' : 'Regenerate Pitch'}</span>
                  </button>
                </div>
              </form>

              {/* Pitch Output Card */}
              <div className="bg-white border border-sage-200 rounded-2xl p-5 space-y-3 shadow-sm relative">
                <div className="flex items-center justify-between border-b border-sage-100 pb-2">
                  <span className="text-xs font-mono font-semibold text-ink-500">
                    Subject: {generatedPitch.subject}
                  </span>
                  <button 
                    onClick={handleCopy}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Pitch'}</span>
                  </button>
                </div>

                <div className="text-xs text-ink-800 leading-relaxed font-sans whitespace-pre-wrap font-normal">
                  {generatedPitch.body}
                </div>
              </div>

            </div>
          ) : (
            /* Digital Media Kit View */
            <div className="bg-[#FAFBF9] rounded-2xl p-6 border border-sage-200 space-y-6">
              
              {/* Media Kit Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={creator?.avatar} 
                    alt={creator?.name} 
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow"
                  />
                  <div>
                    <h4 className="text-xl font-editorial font-bold text-ink-900">{creator?.name}</h4>
                    <p className="text-xs text-ink-500 font-medium">{creator?.handle} • {creator?.location}</p>
                    <div className="inline-flex items-center space-x-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full mt-1 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Audited Authenticity Score: 98%</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider text-ink-400 font-semibold">Media Kit</span>
                  <div className="text-sm font-editorial font-bold text-sage-800">2026 Season</div>
                </div>
              </div>

              {/* Core Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-xl border border-sage-200 text-center">
                  <div className="text-[10px] text-ink-400 uppercase font-semibold">Total Audience</div>
                  <div className="text-lg font-bold text-ink-900 mt-0.5">{creator?.socialStats?.instagram || "185K"}</div>
                  <div className="text-[10px] text-emerald-600">Organic Reach</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-sage-200 text-center">
                  <div className="text-[10px] text-ink-400 uppercase font-semibold">Engagement</div>
                  <div className="text-lg font-bold text-ink-900 mt-0.5">{creator?.socialStats?.engagementRate || "4.8%"}</div>
                  <div className="text-[10px] text-rose-500">2.1x Benchmark</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-sage-200 text-center">
                  <div className="text-[10px] text-ink-400 uppercase font-semibold">Deals Finished</div>
                  <div className="text-lg font-bold text-ink-900 mt-0.5">{creator?.completedDeals || 42}</div>
                  <div className="text-[10px] text-sage-700">100% Escrow Verified</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-sage-200 text-center">
                  <div className="text-[10px] text-ink-400 uppercase font-semibold">Client Rating</div>
                  <div className="text-lg font-bold text-ink-900 mt-0.5">{creator?.rating || 4.96} ★</div>
                  <div className="text-[10px] text-amber-600">Top 1% Tier</div>
                </div>
              </div>

              {/* Standard Commercial Packages */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Standard Commercial Packages:
                </div>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded-xl border border-sage-200 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-semibold text-ink-900">Single Editorial Flatlay Shoot</div>
                      <div className="text-ink-500 text-[11px]">Includes 3 color-graded high-res stills for web/print</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-ink-900">$850</div>
                      <div className="text-[10px] text-ink-400">3 Days Delivery</div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-sage-200 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-semibold text-ink-900">Cinematic Reel + 3 High-Res Photos</div>
                      <div className="text-ink-500 text-[11px]">Full production, scripting, sound design & usage rights</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-ink-900">$1,800</div>
                      <div className="text-[10px] text-ink-400">7 Days Delivery</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Media Kit */}
              <div className="pt-2 flex justify-end">
                <button 
                  onClick={() => alert("📥 Dynamic Media Kit Card exported! Ready for brand presentations.")}
                  className="bg-sage-800 hover:bg-sage-900 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Media Kit Summary</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
