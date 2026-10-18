import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Download, 
  Eye, 
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Layers
} from 'lucide-react';

export default function MediaVaultModal({ isOpen, onClose, creator }) {
  const [isWatermarkActive, setIsWatermarkActive] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [watermarkDensity, setWatermarkDensity] = useState('diagonal'); // 'diagonal' | 'corner' | 'dense'
  const canvasRef = useRef(null);

  if (!isOpen) return null;

  const sampleAsset = "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85";
  const watermarkText = `CAMFLOW PROTECTED • DRAFT REVIEW ONLY • ${new Date().toLocaleDateString()}`;

  // Draw dynamic canvas watermark overlay
  useEffect(() => {
    if (!isWatermarkActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = sampleAsset;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Watermark styling
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.lineWidth = 2;
      ctx.font = 'bold 32px sans-serif';

      if (watermarkDensity === 'diagonal') {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-Math.PI / 4);
        ctx.textAlign = 'center';
        ctx.strokeText(watermarkText, 0, 0);
        ctx.fillText(watermarkText, 0, 0);
        ctx.strokeText(`CREATOR: ${creator?.name?.toUpperCase() || 'NELSON VANCE'}`, 0, 50);
        ctx.fillText(`CREATOR: ${creator?.name?.toUpperCase() || 'NELSON VANCE'}`, 0, 50);
        ctx.restore();
      } else {
        // Repeated grid pattern
        for (let x = 80; x < canvas.width; x += 380) {
          for (let y = 80; y < canvas.height; y += 220) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(-Math.PI / 6);
            ctx.strokeText('CAMFLOW DRAFT', 0, 0);
            ctx.fillText('CAMFLOW DRAFT', 0, 0);
            ctx.restore();
          }
        }
      }
    };
  }, [isWatermarkActive, watermarkDensity, creator]);

  const handleDownload = () => {
    if (isWatermarkActive) {
      alert("⚠️ Raw download restricted: Milestone has not been approved yet. The unwatermarked 4K master file unlocks automatically when the brand releases escrow funds.");
      return;
    }
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-sage-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-sage-200 flex items-center justify-between bg-[#F8FAF7]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-indigo-700">
                  Content Watermarking & DRM
                </span>
                <span className="text-xs bg-indigo-50 border border-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full font-bold">
                  Dynamic Canvas Overlay
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
            <div className="leading-relaxed">
              <strong>The Content Theft Problem:</strong> Creators routinely lose intellectual property when brands screenshot or download pre-payment review drafts. CamFlow dynamically draws dynamic, tamper-evident HTML5 canvas watermarks during review. Raw uncompressed masters unlock only upon escrow payout.
            </div>
          </div>

          {/* Interactive State Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#F5F8F4] p-3.5 rounded-2xl border border-sage-200 gap-3">
            <span className="text-xs font-semibold text-ink-800 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sage-800" />
              <span>Simulate Escrow Milestone State:</span>
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsWatermarkActive(true)}
                className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition flex items-center space-x-1.5 ${
                  isWatermarkActive 
                    ? 'bg-amber-500 text-white shadow-xs' 
                    : 'bg-white text-ink-700 border border-sage-200 hover:bg-sage-50'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Review Stage (Watermarked)</span>
              </button>

              <button
                onClick={() => setIsWatermarkActive(false)}
                className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition flex items-center space-x-1.5 ${
                  !isWatermarkActive 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'bg-white text-ink-700 border border-sage-200 hover:bg-sage-50'
                }`}
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Approved (Raw Released)</span>
              </button>
            </div>
          </div>

          {/* Canvas Watermark Display */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-sage-200 bg-ink-900 max-h-[380px] flex items-center justify-center">
            {isWatermarkActive ? (
              <canvas 
                ref={canvasRef} 
                className="w-full h-auto max-h-[360px] object-contain"
              />
            ) : (
              <img 
                src={sampleAsset} 
                alt="Unwatermarked Master" 
                className="w-full h-auto max-h-[360px] object-contain"
              />
            )}

            {/* Status Pill on Top */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-sage-200 text-xs font-bold text-ink-900 shadow-md flex items-center space-x-1.5">
              {isWatermarkActive ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-amber-800">DRM Watermark Active</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-800">4K Master Asset Unlocked</span>
                </>
              )}
            </div>
          </div>

          {/* Watermark Pattern Options */}
          {isWatermarkActive && (
            <div className="flex items-center justify-between text-xs text-ink-600 px-1">
              <span>Watermark Pattern:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setWatermarkDensity('diagonal')}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold ${watermarkDensity === 'diagonal' ? 'bg-sage-800 text-white border-sage-800' : 'bg-white text-ink-700 border-sage-200'}`}
                >
                  Diagonal Center
                </button>
                <button
                  onClick={() => setWatermarkDensity('dense')}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold ${watermarkDensity === 'dense' ? 'bg-sage-800 text-white border-sage-800' : 'bg-white text-ink-700 border-sage-200'}`}
                >
                  Grid Repeating
                </button>
              </div>
            </div>
          )}

          {/* Download & Security Details */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-sage-200">
            <div className="text-xs text-ink-500">
              <span>Asset Resolution: <strong>3840 × 2160 (ProRes 422)</strong></span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              {downloadSuccess && (
                <span className="text-xs text-emerald-700 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Master downloaded!</span>
                </span>
              )}

              <button
                onClick={handleDownload}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition shadow-sm ${
                  isWatermarkActive 
                    ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>{isWatermarkActive ? 'Download Locked' : 'Download Raw Asset'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
