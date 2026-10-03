import React from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Tag, 
  Users, 
  ShieldCheck,
  Target
} from 'lucide-react';

export default function MatchScoreModal({ isOpen, onClose, creator, campaign }) {
  if (!isOpen) return null;

  const score = creator?.calculatedMatchScore || 94;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-sage-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-sage-200 flex items-center justify-between bg-[#F8FAF7]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-800">
                  Killer Feature 1
                </span>
                <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                  Algorithmic Matching
                </span>
              </div>
              <h3 className="text-xl font-editorial font-semibold text-ink-900">
                AI Match Score Breakdown: {score}%
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Target Campaign Context */}
          <div className="bg-[#FAFBF9] border border-sage-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold">Evaluated Against Campaign:</span>
              <h4 className="text-sm font-bold text-ink-900">{campaign?.title || "Eco-Friendly Skincare Summer Launch"}</h4>
              <p className="text-xs text-ink-500">Brand: {campaign?.brandName || "Aura Botanicals"} • Budget: {campaign?.budget || "$4,500"}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-editorial font-bold text-amber-600">{score}%</span>
              <div className="text-[10px] text-ink-400 font-semibold">Compatibility</div>
            </div>
          </div>

          {/* 4 Algorithmic Scoring Factors */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-ink-700">
              Weighted Evaluation Pillars:
            </h4>

            {/* Pillar 1: Tag & Semantic Keyword Overlap */}
            <div className="bg-white border border-sage-200 rounded-2xl p-4 flex items-start space-x-3 shadow-xs">
              <div className="p-2 rounded-xl bg-sage-100 text-sage-800 mt-0.5">
                <Tag className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-ink-900">Niche & Tag Overlap</span>
                  <span className="text-xs font-bold text-emerald-700">+25 / 25 pts</span>
                </div>
                <p className="text-xs text-ink-600 mt-0.5">
                  Overlapping tags: <span className="font-semibold text-sage-900">"Editorial", "Skincare", "Clean Beauty"</span> match the campaign brief taxonomy.
                </p>
              </div>
            </div>

            {/* Pillar 2: Category Alignment */}
            <div className="bg-white border border-sage-200 rounded-2xl p-4 flex items-start space-x-3 shadow-xs">
              <div className="p-2 rounded-xl bg-sage-100 text-sage-800 mt-0.5">
                <Target className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-ink-900">Category & Aesthetic Harmony</span>
                  <span className="text-xs font-bold text-emerald-700">+15 / 15 pts</span>
                </div>
                <p className="text-xs text-ink-600 mt-0.5">
                  Creator primary vertical is <span className="font-semibold text-sage-900">Product & Editorial Photography</span>, perfectly suited for skincare product still lifes.
                </p>
              </div>
            </div>

            {/* Pillar 3: Audience Demographics Overlap */}
            <div className="bg-white border border-sage-200 rounded-2xl p-4 flex items-start space-x-3 shadow-xs">
              <div className="p-2 rounded-xl bg-sage-100 text-sage-800 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-ink-900">Audience Demographic Alignment</span>
                  <span className="text-xs font-bold text-emerald-700">+10 / 10 pts</span>
                </div>
                <p className="text-xs text-ink-600 mt-0.5">
                  Brand target age 25–34 represents <span className="font-semibold text-sage-900">56% of this creator's follower base</span> (1.4x industry average concentration).
                </p>
              </div>
            </div>

            {/* Pillar 4: Authenticity & Trust Score Bonus */}
            <div className="bg-white border border-sage-200 rounded-2xl p-4 flex items-start space-x-3 shadow-xs">
              <div className="p-2 rounded-xl bg-sage-100 text-sage-800 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-ink-900">Audience Authenticity Bonus</span>
                  <span className="text-xs font-bold text-emerald-700">+5 / 5 pts</span>
                </div>
                <p className="text-xs text-ink-600 mt-0.5">
                  98% verified authentic human engagement score surpasses the brand's minimum 90% authenticity requirement.
                </p>
              </div>
            </div>
          </div>

          {/* Algorithm Specification */}
          <div className="bg-[#F5F8F4] border border-sage-200 rounded-2xl p-4 text-xs text-ink-800">
            <span className="font-bold text-sage-900 uppercase tracking-wider block mb-1">Algorithm Precision Architecture:</span>
            CamFlow calculates match vectors combining tag Jaccard similarity, categorical taxonomy proximity, and demographic intersection weighting to deliver a single transparent compatibility coefficient.
          </div>

        </div>

      </div>
    </div>
  );
}
