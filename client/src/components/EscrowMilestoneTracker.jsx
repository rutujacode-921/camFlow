import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Lock, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  DollarSign, 
  ShieldCheck, 
  Eye, 
  Sparkles,
  Download,
  Unlock
} from 'lucide-react';

export default function EscrowMilestoneTracker({ 
  currentRole, 
  onOpenMediaVault 
}) {
  const [deal, setDeal] = useState({
    id: "deal-701",
    brandName: "Aura Botanicals",
    creatorName: "Nelson Vance",
    campaignTitle: "Eco-Friendly Skincare Summer Launch",
    totalAmount: 2400,
    escrowStatus: "LOCKED_IN_ESCROW",
    milestones: [
      {
        id: "m1",
        stepNumber: 1,
        title: "Concept Moodboard & Shot List",
        amount: 600,
        status: "COMPLETED",
        date: "Oct 2, 2026",
        notes: "Approved by Brand Director. $600 released to creator wallet."
      },
      {
        id: "m2",
        stepNumber: 2,
        title: "Draft Watermarked Content & Reel Upload",
        amount: 1000,
        status: "SUBMITTED",
        date: "Oct 3, 2026",
        isWatermarked: true,
        proofUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
        notes: "Draft review currently pending brand review. Watermarked preview active."
      },
      {
        id: "m3",
        stepNumber: 3,
        title: "Live Posting & Verified Analytics Report",
        amount: 800,
        status: "PENDING",
        date: "Est. Oct 10, 2026",
        notes: "Awaiting approval of milestone 2 before live publishing."
      }
    ]
  });

  const [notification, setNotification] = useState(null);

  const releasedAmount = deal.milestones
    .filter(m => m.status === 'COMPLETED')
    .reduce((sum, m) => sum + m.amount, 0);

  const lockedAmount = deal.totalAmount - releasedAmount;

  const handleApproveMilestone = (milestoneId) => {
    // Brand approves milestone 2
    setDeal(prev => {
      const updatedMilestones = prev.milestones.map(m => {
        if (m.id === milestoneId) {
          return {
            ...m,
            status: 'COMPLETED',
            isWatermarked: false,
            notes: `Approved by Brand! $${m.amount} transferred from Escrow to Creator wallet. Raw asset unlocked.`
          };
        }
        return m;
      });

      return {
        ...prev,
        milestones: updatedMilestones
      };
    });

    // Payout celebration confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setNotification({
      type: 'success',
      text: `🎉 Milestone approved! $1,000 released from Escrow to Nelson Vance. Watermark removed!`
    });
    setTimeout(() => setNotification(null), 6000);
  };

  const handleCreatorSubmitM3 = () => {
    setDeal(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => {
        if (m.id === 'm3') {
          return {
            ...m,
            status: 'SUBMITTED',
            date: 'Just now',
            notes: 'Live Instagram Reel link and analytics proof submitted for brand review.'
          };
        }
        return m;
      })
    }));

    setNotification({
      type: 'info',
      text: `📤 Proof for Milestone 3 submitted! Brand notified to review and release remaining $800.`
    });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-sage-200/80 pb-8">
        <div>
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 text-amber-900 text-xs px-3 py-1 rounded-full font-semibold mb-3">
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            <span>Killer Feature 2: Escrow-Lite Payment Vault</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-editorial font-medium text-ink-900">
            Milestone Payment Tracker
          </h1>
          <p className="text-sm text-ink-600 mt-2 max-w-xl leading-relaxed">
            Funds are locked in a simulated smart contract upon agreement. Money is only disbursed when work milestones are verified and approved, eliminating creator payment delays and brand ghosting.
          </p>
        </div>

        {/* Financial Escrow Summary Card */}
        <div className="bg-[#EBF3EA] border border-sage-300/80 rounded-2xl p-5 shadow-sm min-w-[280px]">
          <div className="flex justify-between items-center text-xs text-sage-800 font-semibold mb-2">
            <span>Escrow Vault Balance</span>
            <span className="bg-sage-200 text-sage-900 px-2 py-0.5 rounded-full">100% Guaranteed</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-editorial font-bold text-ink-900">${deal.totalAmount}</span>
            <span className="text-xs text-ink-500">Contract Total</span>
          </div>
          <div className="mt-3 pt-3 border-t border-sage-200 flex justify-between text-xs font-medium">
            <span className="text-emerald-700">Released: ${releasedAmount}</span>
            <span className="text-amber-800">Locked: ${lockedAmount}</span>
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
        {deal.milestones.map((m) => {
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
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : m.stepNumber}
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
                      <span className="text-xs text-ink-400 font-medium">{m.date}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-ink-900">
                      {m.title}
                    </h3>

                    <p className="text-xs text-ink-600 max-w-xl">
                      {m.notes}
                    </p>
                  </div>
                </div>

                {/* Amount & Direct Interactive Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                  <div className="text-right sm:pr-4">
                    <div className="text-xs text-ink-500">Milestone Value</div>
                    <div className="text-xl font-editorial font-bold text-ink-900">${m.amount}</div>
                  </div>

                  {/* Actions for Brand or Creator */}
                  {isSubmitted && (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleApproveMilestone(m.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md transition flex items-center space-x-1.5"
                      >
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Approve & Release ${m.amount}</span>
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

                  {isPending && m.id === 'm3' && (
                    <button 
                      onClick={handleCreatorSubmitM3}
                      className="bg-sage-800 hover:bg-sage-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition"
                    >
                      Submit Proof for Review
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
          CamFlow enforces a deterministic <strong>Finite State Machine (FSM)</strong>: `PENDING_DEPOSIT` &rarr; `LOCKED_IN_ESCROW` &rarr; `SUBMITTED_FOR_REVIEW` &rarr; `APPROVED_RELEASED`. Funds are held in a simulated smart vault ledger, providing milestone disbursement security for both creators and brand agencies.
        </p>
      </div>

    </div>
  );
}
