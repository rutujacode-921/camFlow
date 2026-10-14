import React from 'react';
import { 
  X, 
  Sparkles, 
  Tag, 
  Users, 
  ShieldCheck,
  Target,
  TrendingUp,
  Info
} from 'lucide-react';

// Calculate score pillar breakdown dynamically based on creator + campaign
function computePillars(creator, campaign) {
  const pillars = [];

  // Pillar 1: Tag Overlap (Jaccard Similarity) — max 25 pts
  let tagScore = 0;
  let matchingTags = [];
  if (campaign?.tags && creator?.tags) {
    matchingTags = creator.tags.filter(tag =>
      campaign.tags.some(ct => ct.toLowerCase() === tag.toLowerCase())
    );
    const union = new Set([...creator.tags.map(t => t.toLowerCase()), ...campaign.tags.map(t => t.toLowerCase())]);
    const jaccard = matchingTags.length / union.size;
    tagScore = Math.round(jaccard * 25);
  }
  pillars.push({
    icon: Tag,
    label: 'Niche & Tag Overlap',
    description: `Jaccard similarity across tag taxonomy. ${
      matchingTags.length > 0
        ? `Overlapping: ${matchingTags.slice(0, 3).map(t => `"${t}"`).join(', ')}.`
        : 'No direct tag matches with campaign brief.'
    }`,
    earned: tagScore,
    max: 25,
    color: 'sage'
  });

  // Pillar 2: Category Alignment — max 15 pts
  let catScore = 0;
  if (campaign?.productCategory && creator?.category) {
    const a = creator.category.toLowerCase();
    const b = campaign.productCategory.toLowerCase();
    if (a.includes(b) || b.includes(a)) catScore = 15;
    else if (a.split(/\s+/).some(w => b.includes(w) || w.length > 4 && b.includes(w.slice(0, -2)))) catScore = 8;
  }
  pillars.push({
    icon: Target,
    label: 'Category & Aesthetic Alignment',
    description: `Creator vertical "${creator?.category}" ${catScore === 15 ? 'directly maps to' : catScore > 0 ? 'partially aligns with' : 'does not overlap with'} campaign category "${campaign?.productCategory}".`,
    earned: catScore,
    max: 15,
    color: 'amber'
  });

  // Pillar 3: Audience Demographics — max 10 pts
  let demoScore = 0;
  let demoReason = 'Demographic data unavailable.';
  if (campaign?.targetDemographics && creator?.socialStats?.demographics) {
    const targetAge = campaign.targetDemographics.targetAge;
    const ageGroups = creator.socialStats.demographics.ageGroups || [];
    const match = ageGroups.find(a => a.group === targetAge);
    if (match && match.percent >= 40) {
      demoScore = 10;
      demoReason = `Target age ${targetAge} represents ${match.percent}% of this creator's audience — ${match.percent >= 50 ? '1.4x' : '1.1x'} industry benchmark concentration.`;
    } else if (match) {
      demoScore = 5;
      demoReason = `Target age ${targetAge} represents ${match.percent}% of audience — partial alignment.`;
    } else {
      demoReason = `Target age group ${targetAge} not dominant in creator's audience demographics.`;
    }

    // Gender bonus
    const targetGender = campaign.targetDemographics.targetGender;
    const gender = creator.socialStats.demographics.gender;
    if (targetGender === 'female' && gender?.female >= 60) demoScore = Math.min(demoScore + 2, 10);
    if (targetGender === 'male' && gender?.male >= 60) demoScore = Math.min(demoScore + 2, 10);
  }
  pillars.push({
    icon: Users,
    label: 'Audience Demographic Match',
    description: demoReason,
    earned: demoScore,
    max: 10,
    color: 'indigo'
  });

  // Pillar 4: Authenticity Bonus — max 5 pts
  const authScore = creator?.socialStats?.authenticityScore || 0;
  const minAuth = campaign?.targetDemographics?.minAuthenticity || 90;
  const authEarned = authScore >= 95 ? 5 : authScore >= minAuth ? 3 : 0;
  pillars.push({
    icon: ShieldCheck,
    label: 'Audience Authenticity Bonus',
    description: `${authScore}% verified authentic engagement score — ${authScore >= 95 ? 'surpasses' : authScore >= minAuth ? 'meets' : 'falls below'} brand's minimum ${minAuth}% authenticity requirement.`,
    earned: authEarned,
    max: 5,
    color: 'emerald'
  });

  // Base 50 pts
  const totalPillars = pillars.reduce((sum, p) => sum + p.earned, 0);
  const totalScore = Math.min(50 + totalPillars, 99);

  return { pillars, totalScore, pillarsTotal: totalPillars };
}

const COLOR_MAP = {
  sage: { bg: 'bg-sage-100', text: 'text-sage-800', bar: 'bg-sage-600', track: 'bg-sage-100', badge: 'bg-sage-50 text-sage-900 border-sage-200' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-800', bar: 'bg-amber-500', track: 'bg-amber-100', badge: 'bg-amber-50 text-amber-900 border-amber-200' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-800', bar: 'bg-indigo-500', track: 'bg-indigo-100', badge: 'bg-indigo-50 text-indigo-900 border-indigo-200' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-800', bar: 'bg-emerald-500', track: 'bg-emerald-100', badge: 'bg-emerald-50 text-emerald-900 border-emerald-200' },
};

export default function MatchScoreModal({ isOpen, onClose, creator, campaign }) {
  if (!isOpen) return null;

  const { pillars, totalScore, pillarsTotal } = computePillars(creator, campaign);

  // Compute score ring
  const pct = totalScore;
  const ringColor = pct >= 90 ? '#10b981' : pct >= 75 ? '#f59e0b' : '#6b8f71';
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-sage-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-sage-200 flex items-center justify-between bg-[#F8FAF7]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-800">Killer Feature 1</span>
                <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">Algorithmic Matching</span>
              </div>
              <h3 className="text-xl font-editorial font-semibold text-ink-900">
                AI Match Score Breakdown
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
          
          {/* Score Hero: Ring Gauge + Campaign Context */}
          <div className="flex items-center gap-6 bg-[#FAFBF9] border border-sage-200 rounded-2xl p-5">
            {/* SVG Score Ring */}
            <div className="relative flex-shrink-0">
              <svg width="92" height="92" viewBox="0 0 92 92">
                <circle cx="46" cy="46" r="36" fill="none" stroke="#f0f4ef" strokeWidth="10" />
                <circle
                  cx="46" cy="46" r="36"
                  fill="none"
                  stroke={ringColor}
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90 46 46)"
                  style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                />
                <text x="46" y="50" textAnchor="middle" className="text-base font-bold" fill="#181A1B" fontSize="18" fontWeight="700">{pct}%</text>
              </svg>
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <img src={creator?.avatar} alt={creator?.name} className="w-7 h-7 rounded-lg object-cover border border-sage-200" />
                <span className="text-sm font-bold text-ink-900">{creator?.name}</span>
                <span className="text-xs text-ink-400">{creator?.handle}</span>
              </div>
              <p className="text-xs text-ink-500 mb-2">Evaluated against campaign:</p>
              <h4 className="text-sm font-bold text-ink-900">{campaign?.title || 'Eco-Friendly Skincare Summer Launch'}</h4>
              <p className="text-xs text-ink-500">{campaign?.brandName} • {campaign?.budget}</p>
              <div className="flex items-center gap-3 mt-3">
                <div className="text-center">
                  <div className="text-sm font-bold text-ink-900">50</div>
                  <div className="text-[9px] text-ink-400">base pts</div>
                </div>
                <span className="text-ink-300">+</span>
                <div className="text-center">
                  <div className="text-sm font-bold text-amber-600">{pillarsTotal}</div>
                  <div className="text-[9px] text-ink-400">pillar pts</div>
                </div>
                <span className="text-ink-300">=</span>
                <div className="text-center">
                  <div className="text-sm font-bold" style={{ color: ringColor }}>{pct}%</div>
                  <div className="text-[9px] text-ink-400">final score</div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillar Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-ink-700">
              Weighted Evaluation Pillars:
            </h4>

            {pillars.map((pillar, idx) => {
              const C = COLOR_MAP[pillar.color];
              const IconComp = pillar.icon;
              const pct = pillar.max > 0 ? (pillar.earned / pillar.max) * 100 : 0;
              return (
                <div key={idx} className="bg-white border border-sage-200 rounded-2xl p-4 shadow-xs">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-xl ${C.bg} ${C.text} mt-0.5 flex-shrink-0`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-ink-900">{pillar.label}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${C.badge}`}>
                          +{pillar.earned} / {pillar.max} pts
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div className={`w-full h-1.5 rounded-full ${C.track} overflow-hidden mb-2`}>
                        <div
                          className={`h-full rounded-full ${C.bar} transition-all duration-700`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="text-xs text-ink-600 leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Algorithm Specification */}
          <div className="bg-[#F5F8F4] border border-sage-200 rounded-2xl p-4 flex items-start space-x-3">
            <Info className="w-4 h-4 text-sage-700 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-ink-700">
              <span className="font-bold text-sage-900 uppercase tracking-wider block mb-1">Algorithm Architecture:</span>
              CamFlow computes match vectors using <strong>Jaccard tag similarity</strong>, categorical taxonomy proximity, demographic intersection weighting (age concentration × gender affinity), and an authenticity bonus tier. Base score is 50; pillar bonuses are capped at 49 — ensuring no creator artificially reaches 100%.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
