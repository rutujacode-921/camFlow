import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Clock, 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function SubmitProposalModal({ 
  isOpen, 
  onClose, 
  creator, 
  campaigns = [], 
  selectedCampaign,
  onSubmitProposal 
}) {
  const [targetCampaignId, setTargetCampaignId] = useState(selectedCampaign?.id || (campaigns[0]?.id || ''));
  const [pitchMessage, setPitchMessage] = useState(
    `Hello! I'd love to partner on your upcoming campaign. My aesthetic aligns naturally with your brand identity and audience demographics, delivering authentic engagement and polished high-res deliverables.`
  );
  const [proposedRate, setProposedRate] = useState(creator?.startingRate || '₹1,50,000');
  const [deliverablesOffered, setDeliverablesOffered] = useState('1x High-Res Editorial Flatlay + 2x 4K Cinematic Reels');
  const [estimatedDays, setEstimatedDays] = useState(14);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const currentCampaign = campaigns.find(c => c.id === targetCampaignId) || selectedCampaign;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      campaignId: currentCampaign?.id || 'camp-custom',
      creatorId: creator?.id || 'creator-nelson',
      creatorName: creator?.name || 'Nelson Vance',
      creatorHandle: creator?.handle || '@nelson.vance',
      creatorAvatar: creator?.avatar,
      brandName: currentCampaign?.brandName || 'Brand Partner',
      pitchMessage,
      proposedRate,
      deliverablesOffered,
      estimatedDays: Number(estimatedDays)
    };

    if (onSubmitProposal) {
      const res = await onSubmitProposal(payload);
      setSubmitting(false);
      if (res?.success) {
        setSubmittedSuccess(true);
        setTimeout(() => {
          setSubmittedSuccess(false);
          onClose();
        }, 1800);
      }
    } else {
      setSubmitting(false);
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        onClose();
      }, 1800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-sage-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-sage-200 flex items-center justify-between bg-[#F8FAF7]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-sage-800 text-white flex items-center justify-center shadow-sm">
              <Send className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-sage-800">
                  Day 5 Pipeline
                </span>
                <span className="text-[10px] bg-sage-100 text-sage-900 px-2 py-0.5 rounded-full font-bold">
                  Proposal Submission
                </span>
              </div>
              <h3 className="text-xl font-editorial font-semibold text-ink-900">
                Submit Campaign Proposal
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

        {/* Content */}
        {submittedSuccess ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-editorial font-bold text-ink-900">Proposal Dispatched!</h4>
            <p className="text-xs text-ink-500 max-w-sm mx-auto">
              Your customized brief pitch has been logged into the brand's review pipeline. When accepted, a smart contract is drafted automatically.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
            {/* Target Campaign Picker */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-700 mb-1">
                Target Campaign Brief
              </label>
              <select
                value={targetCampaignId}
                onChange={(e) => setTargetCampaignId(e.target.value)}
                className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3.5 py-2.5 text-xs text-ink-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sage-300"
              >
                {campaigns.map(camp => (
                  <option key={camp.id} value={camp.id}>
                    {camp.title} — {camp.brandName} ({camp.budget})
                  </option>
                ))}
              </select>
            </div>

            {/* Pitch Message */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-700">
                  Custom Collaboration Pitch
                </label>
                <span className="text-[10px] text-sage-800 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Editorial pitch tone
                </span>
              </div>
              <textarea
                rows={4}
                required
                value={pitchMessage}
                onChange={(e) => setPitchMessage(e.target.value)}
                placeholder="Describe why your artistic vision and audience demographic fits this brief..."
                className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl p-3 text-xs text-ink-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-sage-300"
              />
            </div>

            {/* Rate & Deliverables */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-700 mb-1">
                  Proposed Deal Sum
                </label>
                <input
                  type="text"
                  required
                  value={proposedRate}
                  onChange={(e) => setProposedRate(e.target.value)}
                  placeholder="e.g. ₹1,50,000"
                  className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3.5 py-2.5 text-xs text-ink-900 font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-700 mb-1">
                  Estimated Delivery Turnaround
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={3}
                    max={60}
                    value={estimatedDays}
                    onChange={(e) => setEstimatedDays(e.target.value)}
                    className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3.5 py-2.5 text-xs text-ink-900 font-bold focus:outline-none pr-14"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-ink-400 font-medium">
                    days
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-ink-700 mb-1">
                Deliverables Scope
              </label>
              <input
                type="text"
                required
                value={deliverablesOffered}
                onChange={(e) => setDeliverablesOffered(e.target.value)}
                placeholder="e.g. 1x High-Res Editorial Flatlay + 2x Cinematic IG Reels"
                className="w-full bg-[#FAFBF9] border border-sage-200 rounded-xl px-3.5 py-2.5 text-xs text-ink-900 font-medium focus:outline-none"
              />
            </div>

            {/* Escrow Notice */}
            <div className="bg-[#EBF3EA] p-3.5 rounded-2xl border border-sage-300 text-xs text-sage-900 flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>CamFlow Smart Escrow Protection:</strong> Upon brand acceptance, this proposal triggers automatic milestone drafting with escrow lock guarantees.
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 border border-sage-200 rounded-xl text-xs font-semibold text-ink-600 hover:bg-sage-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-sage-800 hover:bg-sage-900 text-white font-semibold text-xs py-2.5 px-6 rounded-xl shadow-md transition flex items-center space-x-1.5 disabled:opacity-50"
              >
                <span>{submitting ? 'Submitting...' : 'Send Formal Proposal'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

