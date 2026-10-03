import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Download, 
  Eye, 
  AlertTriangle,
  Sparkles,
  CheckCircle2 
} from 'lucide-react';

export default function MediaVaultModal({ isOpen, onClose, creator }) {
  const [isWatermarkActive, setIsWatermarkActive] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const sampleAsset = "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85";

  const handleDownload = () => {
    if (isWatermarkActive) {
      alert("⚠️ Raw download restricted: Milestone has not been approved yet. The raw unwatermarked asset unlocks automatically when the brand releases escrow funds.");
      return;
    }
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-sage-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-sage-200 flex items-center justify-between bg-[#F8FAF7]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-indigo-700">
                  Killer Feature 3
                </span>
                <span className="text-xs bg-indigo-50 border border-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full font-bold">
                  Dynamic Vault
                </span>
              </div>
              <h3 className="text-xl font-editorial font-semibold text-ink-900">
                Secure Content Watermark & Vault
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

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Explanation Box */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 flex items-start space-x-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>The Content Theft Problem:</strong> Creators routinely lose intellectual property when brands screenshot or download pre-payment drafts. CamFlow renders dynamic, tamper-evident HTML5 canvas watermarks during the review stage. Raw, uncompressed master files remain cryptographically locked until payment release.
            </div>
          </div>

          {/* Interactive State Toggle */}
          <div className="flex items-center justify-between bg-[#F5F8F4] p-3 rounded-2xl border border-sage-200">
            <span className="text-xs font-semibold text-ink-800">
              Current Vault State:
            </span>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsWatermarkActive(true)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${isWatermarkActive ? 'bg-amber-500 text-white font-semibold shadow-xs' : 'bg-white text-ink-700'}`}
              >
                🔒 Draft Review (Watermarked)
              </button>
              <button 
                onClick={() => setIsWatermarkActive(false)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${!isWatermarkActive ? 'bg-emerald-600 text-white font-semibold shadow-xs' : 'bg-white text-ink-700'}`}
              >
                🔓 Escrow Paid (Raw Unlocked)
              </button>
            </div>
          </div>

          {/* Dynamic Media Preview Container */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-sage-300 bg-black/5 aspect-[16/10] flex items-center justify-center select-none">
            <img 
              src={sampleAsset} 
              alt="Protected Creator Draft" 
              className="w-full h-full object-cover"
            />

            {/* Dynamic Watermark Overlay */}
            {isWatermarkActive ? (
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex flex-col items-center justify-center pointer-events-none p-6 text-center">
                <div className="transform -rotate-12 space-y-4">
                  <div className="bg-rose-600/90 text-white text-sm md:text-base font-extrabold uppercase tracking-widest px-6 py-2 rounded-xl shadow-2xl border border-white/40">
                    PROTECTED DRAFT — AURA BOTANICALS REVIEW
                  </div>
                  <div className="text-xs font-mono text-white/90 drop-shadow-md">
                    CAMFLOW SECURE VAULT • STAMP: {new Date().toLocaleDateString()} • NOT FOR COMMERCIAL BROADCAST
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-white/90 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md">
                  <span>Protected by CamFlow Client DRM</span>
                  <span className="flex items-center text-amber-300 font-semibold">
                    <Lock className="w-3 h-3 mr-1" />
                    Raw Asset Locked
                  </span>
                </div>
              </div>
            ) : (
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-emerald-900/80 px-4 py-2 rounded-xl backdrop-blur-md border border-emerald-400/40">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold">Payment Released: Raw High-Resolution Master Unlocked</span>
                </div>
                <span className="text-[10px] bg-emerald-700 px-2 py-0.5 rounded-full font-bold">100% Commercial Rights</span>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-ink-500">
              Format: 4K Pro-Res JPEG (12.4 MB) • Hash: <span className="font-mono text-ink-700">sha256:7f8a9...c32</span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={handleDownload}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 text-xs font-semibold px-5 py-2.5 rounded-xl shadow-sm transition ${
                  isWatermarkActive 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>{isWatermarkActive ? 'Download Locked' : 'Download Raw Master File'}</span>
              </button>
            </div>
          </div>

          {downloadSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold text-center border border-emerald-200">
              ✅ Raw 4K master asset downloaded with commercial license certificate.
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
