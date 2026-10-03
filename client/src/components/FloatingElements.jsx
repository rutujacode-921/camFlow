import React from 'react';
import { ShieldCheck, TrendingUp, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export function FloatingPill1({ score = "98%", label = "Audience Authenticity" }) {
  return (
    <div className="floating-element-1 absolute -top-6 -left-8 md:-left-12 z-20 bg-white/90 backdrop-blur-md border border-sage-200 shadow-xl rounded-2xl p-3 px-4 flex items-center space-x-3 pointer-events-auto hover:scale-105 transition-transform duration-300">
      <div className="w-9 h-9 rounded-xl bg-sage-100 flex items-center justify-center text-sage-800">
        <ShieldCheck className="w-5 h-5 text-emerald-600" />
      </div>
      <div>
        <div className="flex items-center space-x-1.5">
          <span className="text-xs uppercase tracking-wider font-semibold text-ink-500">Trust Badge</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
        </div>
        <div className="text-sm font-bold text-ink-900">{score} Authentic</div>
      </div>
    </div>
  );
}

export function FloatingPill2({ stat = "+42% ROI", label = "Avg Brand Lift" }) {
  return (
    <div className="floating-element-2 absolute -bottom-5 -right-6 md:-right-10 z-20 bg-white/95 backdrop-blur-md border border-blush-200 shadow-xl rounded-2xl p-3 px-4 flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
      <div className="w-9 h-9 rounded-xl bg-blush-100 flex items-center justify-center text-rose-600">
        <TrendingUp className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider font-semibold text-ink-500">{label}</div>
        <div className="text-sm font-bold text-ink-900">{stat}</div>
      </div>
    </div>
  );
}

export function FloatingEscrowChip() {
  return (
    <div className="floating-element-3 absolute top-1/2 -right-12 hidden lg:flex z-20 bg-white/95 backdrop-blur-md border border-amber-200/80 shadow-lg rounded-full py-1.5 px-4 items-center space-x-2">
      <Lock className="w-3.5 h-3.5 text-amber-600" />
      <span className="text-xs font-semibold text-ink-800">Escrow Protected</span>
      <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">$2,400</span>
    </div>
  );
}

export function LiveActivityMarquee() {
  const items = [
    "✨ AI Match Algorithm: 94% fit with Eco-Friendly Skincare",
    "🛡️ Escrow Milestone: $1,000 locked for Draft Review",
    "🔒 Secure Vault: Dynamic watermarking active for proof review",
    "📊 Fake Follower Scanner: 0.9% bot ratio detected (Organic)",
    "💼 New Proposal: Aura Botanicals invited Nelson Vance",
    "🚀 CamFlow Milestone 2: Watermark unlocked upon brand approval"
  ];

  return (
    <div className="w-full bg-[#EBF3EA]/60 border-y border-sage-200/60 py-2.5 overflow-hidden select-none">
      <div className="flex w-max animate-marquee space-x-8 items-center text-xs font-medium text-sage-900">
        {[...items, ...items].map((text, idx) => (
          <span key={idx} className="flex items-center space-x-2">
            <span>{text}</span>
            <span className="text-sage-300">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
