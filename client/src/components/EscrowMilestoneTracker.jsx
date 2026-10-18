import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Lock, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  Sparkles,
  Download,
  Unlock,
  Upload,
  FileCheck
} from 'lucide-react';

export default function EscrowMilestoneTracker({ 
  currentRole, 
  onOpenMediaVault 
}) {
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [submittingProof, setSubmittingProof] = useState(false);

  // Fetch live deals from backend API
  const fetchEscrow = () => {
    fetch('/api/escrow')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.deals?.length) {
          setDeal(data.deals[0]);
        }
        setLoading(false);
      })
      .catch(() => {
        // Fallback default deal in ₹
        setDeal({
          id: "deal-701",
          brandName: "Aura Botanicals",
          creatorName: "Nelson Vance",
          campaignTitle: "Eco-Friendly Skincare Summer Launch",
          totalAmount: 200000,
          escrowStatus: "LOCKED_IN_ESCROW",
          milestones: [
            {
              id: "m1",
              title: "Concept Moodboard & Shot List",
              amount: 50000,
              status: "COMPLETED",
              submissionDate: "2026-10-01",
              completedDate: "2026-10-02",
              notes: "Approved by Brand Director. ₹50,000 released to creator wallet."
            },
            {
              id: "m2",
              title: "Draft Watermarked Content & Reel Upload",
              amount: 85000,
              status: "SUBMITTED",
              submissionDate: "2026-10-03",
              isWatermarked: true,
              proofAssetUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
              notes: "Draft review currently pending brand review. Watermarked preview active."
            },
            {
              id: "m3",
              title: "Live Posting & Verified Analytics Report",
              amount: 65000,
              status: "PENDING",
              submissionDate: null,
              notes: "Awaiting approval of milestone 2 before live publishing."
            }
          ]
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEscrow();
  }, []);

  if (loading || !deal) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-20 text-center text-ink-400">
        <Clock className="w-8 h-8 mx-auto animate-spin mb-3 text-sage-600" />
        <p className="font-editorial text-sm">Loading Escrow Vault Ledger...</p>
      </div>
    );
  }

  const releasedAmount = deal.milestones
    .filter(m => m.status === 'COMPLETED')
    .reduce((sum, m) => sum + m.amount, 0);

  const lockedAmount = deal.totalAmount - releasedAmount;

  // Brand approves milestone via backend API
  const handleApproveMilestone = async (milestoneId) => {
    try {
      const res = await fetch(`/api/escrow/${deal.id}/milestones/${milestoneId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) {
        setDeal(data.deal);
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
        setNotification({
          type: 'success',
          text: `🎉 Milestone released! ₹${data.milestone.amount.toLocaleString('en-IN')} transferred to creator. Watermark removed!`
        });
      }
    } catch {
      // Local fallback
      setDeal(prev => ({
        ...prev,
        milestones: prev.milestones.map(m => m.id === milestoneId ? {
          ...m,
          status: 'COMPLETED',
          isWatermarked: false,
          notes: `Approved by Brand! ₹${m.amount.toLocaleString('en-IN')} released from escrow to creator wallet.`
        } : m)
      }));
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  // Creator submits proof via backend API
  const handleCreatorSubmitProof = async (milestoneId) => {
    setSubmittingProof(true);
    try {
      const res = await fetch(`/api/escrow/${deal.id}/milestones/${milestoneId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proofUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
          notes: "Live publication link & analytics dashboard submitted for brand review."
        })
      });
      const data = await res.json();
      setSubmittingProof(false);
      if (data.success) {
        setDeal(data.deal);
        setNotification({
          type: 'info',
          text: `📤 Deliverable submitted with tamper-evident watermark! Brand notified to review.`
        });
      }
    } catch {
      setSubmittingProof(false);
      setDeal(prev => ({
        ...prev,
        milestones: prev.milestones.map(m => m.id === milestoneId ? {
          ...m,
          status: 'SUBMITTED',
          notes: 'Proof uploaded with watermarked draft. Pending brand verification.'
        } : m)
      }));
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-sage-200/80 pb-8">
        <div>
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 text-amber-900 text-xs px-3 py-1 rounded-full font-semibold mb-3">
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            <span>Escrow-Lite Payment Vault</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-editorial font-medium text-ink-900">
            Milestone Payment Tracker
          </h1>
          <p className="text-sm text-ink-600 mt-2 max-w-xl leading-relaxed">
            Funds are locked in a simulated smart contract upon agreement in Indian Rupee (₹). Money is disbursed strictly when milestones are verified, eliminating delayed payments and brand risk.
          </p>
        </div>

        {/* Financial Escrow Summary Card in ₹ */}
        <div className="bg-[#EBF3EA] border border-sage-300/80 rounded-2xl p-5 shadow-sm min-w-[280px]">
          <div className="flex justify-between items-center text-xs text-sage-800 font-semibold mb-2">
            <span>Escrow Vault Balance</span>
            <span className="bg-sage-200 text-sage-900 px-2 py-0.5 rounded-full">100% Guaranteed</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-editorial font-bold text-ink-900">
              ₹{deal.totalAmount?.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-ink-500">Contract Total</span>
          </div>
          <div className="mt-3 pt-3 border-t border-sage-200 flex justify-between text-xs font-medium">
            <span className="text-emerald-700">Released: ₹{releasedAmount.toLocaleString('en-IN')}</span>
            <span className="text-amber-800">Locked: ₹{lockedAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`p-4 rounded-2xl border text-sm font-semibold flex items-center justify-between ${notification.type === 'success' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-blue-50 border-blue-300 text-blue-900'}`}>
          <span>{notification.text}</span>
          <button onClick={() => setNotification(null)} className="text-xs underline ml-4">Dismiss</button>
        </div>
      )}

      {/* Deal Metadata Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-ink-400 font-semibold">Active Collaboration Pipeline</span>
          <h2 className="text-2xl font-editorial font-semibold text-ink-900 mt-1">
            {deal.campaignTitle}
          </h2>
          <div className="flex items-center space-x-4 mt-2 text-xs text-ink-600">
            <span><strong>Brand:</strong> {deal.brandName}</span>
            <span>•</span>
            <span><strong>Creator:</strong> {deal.creatorName}</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Escrow Protection Active
            </span>
          </div>
        </div>

        <button 
          onClick={onOpenMediaVault}
          className="inline-flex items-center space-x-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 px-4 py-2.5 rounded-xl text-xs font-semibold transition"
        >
          <Eye className="w-4 h-4 text-indigo-600" />
          <span>Inspect Watermarked Media Vault</span>
        </button>
      </div>

      {/* Milestone Stages List */}
      <div className="space-y-6">
        {deal.milestones?.map((m, idx) => {
          const isDone = m.status === 'COMPLETED';
          const isSubmitted = m.status === 'SUBMITTED';
          const isPending = m.status === 'PENDING';

          return (
            <div 
              key={m.id}
              className={`rounded-3xl border transition-all p-6 sm:p-8 ${
                isDone 
                  ? 'bg-[#F5F8F4] border-emerald-200/80 shadow-sm' 
                  : isSubmitted 
                    ? 'bg-white border-amber-300 shadow-md ring-2 ring-amber-100' 
                    : 'bg-white/80 border-gray-200/80 opacity-90'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                
                {/* Milestone Info */}
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${
                    isDone 
                      ? 'bg-emerald-600 text-white' 
                      : isSubmitted 
                        ? 'bg-amber-500 text-white animate-pulse' 
                        : 'bg-gray-100 text-gray-500'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md ${
                        isDone 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : isSubmitted 
                            ? 'bg-amber-100 text-amber-900' 
                            : 'bg-gray-100 text-gray-700'
                      }`}>
                        {m.status.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-ink-400 font-medium">
                        {m.completedDate || m.submissionDate || 'Pending Submission'}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-ink-900">
                      {m.title}
                    </h3>

                    <p className="text-xs text-ink-600 max-w-xl">
                      {m.notes}
                    </p>
                  </div>
                </div>

                {/* Amount & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                  <div className="text-right sm:pr-4">
                    <div className="text-xs text-ink-500">Milestone Value</div>
                    <div className="text-xl font-editorial font-bold text-ink-900">
                      ₹{m.amount?.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Actions for Brand or Creator */}
                  {isSubmitted && (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleApproveMilestone(m.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md transition flex items-center space-x-1.5"
                      >
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Approve & Release ₹{m.amount?.toLocaleString('en-IN')}</span>
                      </button>

                      <button 
                        onClick={onOpenMediaVault}
                        className="bg-white hover:bg-sage-50 border border-sage-300 text-ink-800 text-xs font-medium px-3 py-2.5 rounded-xl transition"
                      >
                        Preview Draft
                      </button>
                    </div>
                  )}

                  {isDone && (
                    <div className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Funds Disbursed</span>
                    </div>
                  )}

                  {isPending && (
                    <button 
                      onClick={() => handleCreatorSubmitProof(m.id)}
                      disabled={submittingProof}
                      className="bg-sage-800 hover:bg-sage-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center space-x-1.5 disabled:opacity-50"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{submittingProof ? 'Uploading...' : 'Submit Deliverable'}</span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Escrow Architecture Specification Card */}
      <div className="bg-[#FAF8F5] border border-amber-200/60 rounded-3xl p-6 sm:p-8 space-y-3">
        <h4 className="text-sm font-bold text-ink-900 uppercase tracking-wider flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>CamFlow Escrow Protocol Specification</span>
        </h4>
        <p className="text-xs text-ink-700 leading-relaxed">
          CamFlow enforces a deterministic <strong>Finite State Machine (FSM)</strong>: `PENDING_DEPOSIT` &rarr; `LOCKED_IN_ESCROW` &rarr; `SUBMITTED_FOR_REVIEW` &rarr; `APPROVED_RELEASED`. Funds are held in a simulated smart vault ledger in Indian Rupee (₹), providing milestone disbursement security for both creators and brand agencies.
        </p>
      </div>

    </div>
  );
}
