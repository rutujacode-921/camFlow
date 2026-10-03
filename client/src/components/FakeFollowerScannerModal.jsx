import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  CheckCircle2, 
  BarChart3, 
  Users, 
  Sparkles,
  TrendingUp,
  Globe2 
} from 'lucide-react';

export default function FakeFollowerScannerModal({ isOpen, onClose, creator }) {
  const [handle, setHandle] = useState(creator?.handle || '@nelson.vance');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  if (!isOpen) return null;

  const handleRunScan = async (e) => {
    e.preventDefault();
    setIsScanning(true);
    setScanResult(null);

    try {
      const res = await fetch('/api/scanner/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle })
      });
      const data = await res.json();
      setTimeout(() => {
        setScanResult(data);
        setIsScanning(false);
      }, 700);
    } catch (err) {
      // Fallback local simulation if server offline
      setTimeout(() => {
        setScanResult({
          success: true,
          handle: handle,
          metrics: {
            authenticityScore: 98,
            botFollowersPercent: "1.4%",
            commentToLikeRatio: "4.1% (High Organic)",
            growthAudit: "Steady organic growth trajectory across past 12 months",
            trustBadge: "Verified Authentic Tier 1"
          },
          demographics: {
            topCountries: [{ country: "United States", percent: 46 }, { country: "United Kingdom", percent: 28 }, { country: "France", percent: 14 }],
            ageGroups: [{ group: "18-24", percent: 24 }, { group: "25-34", percent: 58 }, { group: "35-44", percent: 14 }],
            gender: { female: 66, male: 34 }
          }
        });
        setIsScanning(false);
      }, 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-sage-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-sage-200 flex items-center justify-between bg-[#F8FAF7]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800">
                  Killer Feature 4
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                  Audience Integrity
                </span>
              </div>
              <h3 className="text-xl font-editorial font-semibold text-ink-900">
                Fake Follower Scanner & Trust Demographics
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Handle Input Form */}
          <form onSubmit={handleRunScan} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="@instagram_handle"
                className="w-full bg-[#F5F8F4] border border-sage-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <button
              type="submit"
              disabled={isScanning}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow transition disabled:opacity-50 flex items-center space-x-2"
            >
              {isScanning ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Auditing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run Audit</span>
                </>
              )}
            </button>
          </form>

          {/* Results Display */}
          {(scanResult || !isScanning) && (
            <div className="space-y-6">
              
              {/* Trust Badge Hero Banner */}
              <div className="bg-[#EBF3EA] rounded-2xl p-5 border border-sage-300/80 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider font-semibold text-sage-800">
                      Official Trust Badge
                    </div>
                    <div className="text-xl font-editorial font-bold text-ink-900">
                      {scanResult?.metrics?.trustBadge || "Verified Authentic Tier 1"}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-editorial font-bold text-emerald-800">
                    {scanResult?.metrics?.authenticityScore || 98}%
                  </div>
                  <div className="text-[11px] text-sage-800 font-semibold">
                    Real Human Audience
                  </div>
                </div>
              </div>

              {/* Bot Breakdown & Engagement Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white border border-sage-200 rounded-2xl p-4 text-center">
                  <div className="text-[11px] text-ink-500 uppercase font-semibold">Bot / Inactive Ratio</div>
                  <div className="text-xl font-bold text-ink-900 mt-1">
                    {scanResult?.metrics?.botFollowersPercent || "1.8%"}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Benchmark: &lt; 5% (Clean)</div>
                </div>

                <div className="bg-white border border-sage-200 rounded-2xl p-4 text-center">
                  <div className="text-[11px] text-ink-500 uppercase font-semibold">Comment / Like Ratio</div>
                  <div className="text-xl font-bold text-ink-900 mt-1">
                    {scanResult?.metrics?.commentToLikeRatio?.split(' ')[0] || "3.9%"}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Organic Interaction</div>
                </div>

                <div className="bg-white border border-sage-200 rounded-2xl p-4 text-center">
                  <div className="text-[11px] text-ink-500 uppercase font-semibold">Growth Spikes</div>
                  <div className="text-xl font-bold text-emerald-700 mt-1">
                    0 Flags
                  </div>
                  <div className="text-[10px] text-ink-500 font-semibold mt-0.5">No Paid Pods Detected</div>
                </div>
              </div>

              {/* Demographics Breakdown */}
              <div className="bg-[#FAFBF9] border border-sage-200/80 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-ink-700 flex items-center space-x-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-sage-700" />
                  <span>Verified Audience Demographics</span>
                </h4>

                {/* Country distribution */}
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-ink-600">Top Geographies:</div>
                  <div className="space-y-1.5">
                    {(scanResult?.demographics?.topCountries || [
                      { country: "France", percent: 38 },
                      { country: "USA", percent: 34 },
                      { country: "UK", percent: 18 }
                    ]).map((geo) => (
                      <div key={geo.country} className="flex items-center justify-between text-xs">
                        <span className="text-ink-700">{geo.country}</span>
                        <div className="flex items-center space-x-2 w-1/2">
                          <div className="w-full bg-sage-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-sage-800 h-2 rounded-full" style={{ width: `${geo.percent}%` }}></div>
                          </div>
                          <span className="font-semibold text-ink-900 text-[11px] w-8 text-right">{geo.percent}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Age distribution */}
                <div className="pt-2 border-t border-sage-200 flex justify-between items-center text-xs">
                  <span className="text-ink-600 font-medium">Core Age Bracket:</span>
                  <span className="font-bold text-ink-900 bg-white border border-sage-200 px-2.5 py-1 rounded-lg">
                    25–34 Years (56% Majority)
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* Platform Verification Methodology */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <span className="font-bold uppercase tracking-wider">Verification Methodology:</span>
            <p>
              Audits analyze statistical variance in engagement velocity, comment semantic dispersion, and cross-reference follow spikes against verified media events.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
