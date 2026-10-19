import React, { useState } from 'react';
import { 
  Briefcase, 
  Send, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  ArrowUpRight, 
  Filter, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  DollarSign
} from 'lucide-react';

export default function ProposalsPipeline({ 
  proposals = [], 
  currentRole = 'brand',
  onUpdateStatus,
  onViewContract,
  onOpenSubmitProposal
}) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [activeTab, setActiveTab] = useState(currentRole === 'creator' ? 'outgoing' : 'incoming');

  const filtered = proposals.filter(p => {
    if (filterStatus === 'ALL') return true;
    return p.status === filterStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-full">Pending Review</span>;
      case 'UNDER_REVIEW':
        return <span className="bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold px-2.5 py-1 rounded-full">Under Review</span>;
      case 'SHORTLISTED':
        return <span className="bg-purple-50 text-purple-800 border border-purple-200 text-[10px] font-bold px-2.5 py-1 rounded-full">Shortlisted</span>;
      case 'ACCEPTED':
      case 'CONTRACT_GENERATED':
        return <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full">Contract Generated</span>;
      case 'REJECTED':
        return <span className="bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-bold px-2.5 py-1 rounded-full">Declined</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-[10px] font-bold px-2.5 py-1 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-sage-200/80 pb-8">
        <div>
          <div className="inline-flex items-center space-x-2 bg-sage-100 border border-sage-300 text-sage-900 text-xs px-3 py-1 rounded-full font-semibold mb-3">
            <Briefcase className="w-3.5 h-3.5 text-sage-800" />
            <span>Campaign Pipeline & Finite State Machine (FSM)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-editorial font-medium text-ink-900">
            Collaboration Proposals & Contracts
          </h1>
          <p className="text-sm text-ink-600 mt-2 max-w-2xl leading-relaxed">
            Manage proposals through state transitions: <code className="text-xs bg-sage-50 px-1.5 py-0.5 rounded border border-sage-200">PENDING</code> &rarr; <code className="text-xs bg-sage-50 px-1.5 py-0.5 rounded border border-sage-200">UNDER_REVIEW</code> &rarr; <code className="text-xs bg-sage-50 px-1.5 py-0.5 rounded border border-sage-200">SHORTLISTED</code> &rarr; <code className="text-xs bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">CONTRACT_GENERATED</code>.
          </p>
        </div>

        {/* Submit Proposal Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSubmitProposal}
            className="bg-sage-800 hover:bg-sage-900 text-white font-semibold text-xs py-3 px-5 rounded-xl shadow-md transition flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit New Proposal</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          {['ALL', 'PENDING', 'UNDER_REVIEW', 'SHORTLISTED', 'CONTRACT_GENERATED', 'REJECTED'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`text-xs px-3.5 py-2 rounded-xl border transition ${
                filterStatus === st 
                  ? 'bg-sage-800 text-white border-sage-800 font-semibold shadow-xs' 
                  : 'bg-white text-ink-700 border-sage-200 hover:bg-sage-50'
              }`}
            >
              {st === 'ALL' ? 'All Stages' : st.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="text-xs text-ink-500 font-medium">
          Showing <strong>{filtered.length}</strong> active proposals
        </div>
      </div>

      {/* Pipeline Proposals List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-sage-200 text-ink-400 space-y-3">
            <Briefcase className="w-10 h-10 mx-auto text-sage-300" />
            <h4 className="text-base font-bold text-ink-800">No Proposals in this Stage</h4>
            <p className="text-xs text-ink-500 max-w-sm mx-auto">
              Proposals submitted by creators or initiated by brands appear here in the collaborative pipeline.
            </p>
          </div>
        ) : (
          filtered.map(prop => (
            <div 
              key={prop.id}
              className="bg-white rounded-3xl border border-sage-200/80 p-6 shadow-sm hover:shadow-md transition flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Creator & Campaign Info */}
              <div className="flex items-start space-x-4 min-w-0">
                <img 
                  src={prop.creatorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"} 
                  alt={prop.creatorName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-sage-200 shrink-0 shadow-xs" 
                />

                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <h3 className="text-base font-editorial font-bold text-ink-900">
                      {prop.creatorName}
                    </h3>
                    <span className="text-xs text-ink-400 font-medium">{prop.creatorHandle}</span>
                    {getStatusBadge(prop.status)}
                  </div>

                  <div className="text-xs text-sage-800 font-semibold flex items-center gap-1.5">
                    <span>Campaign:</span>
                    <span className="text-ink-900 font-bold">{prop.campaignTitle}</span>
                    <span>• Brand: {prop.brandName}</span>
                  </div>

                  <p className="text-xs text-ink-600 line-clamp-2 leading-relaxed bg-[#F8FAF7] p-2.5 rounded-xl border border-sage-100">
                    "{prop.pitchMessage}"
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-ink-500 pt-1">
                    <span><strong>Rate:</strong> <span className="text-emerald-700 font-bold">{prop.proposedRate}</span></span>
                    <span>•</span>
                    <span><strong>Turnaround:</strong> {prop.estimatedDays} Days</span>
                    <span>•</span>
                    <span><strong>Deliverables:</strong> {prop.deliverablesOffered}</span>
                  </div>
                </div>
              </div>

              {/* FSM Workflow Actions */}
              <div className="flex flex-col sm:flex-row items-stretch lg:items-center gap-2.5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-sage-100">
                
                {/* State: PENDING */}
                {prop.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => onUpdateStatus(prop.id, 'UNDER_REVIEW')}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold px-3.5 py-2.5 rounded-xl transition"
                    >
                      Start Review
                    </button>
                    <button
                      onClick={() => onUpdateStatus(prop.id, 'SHORTLISTED')}
                      className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl shadow-xs transition"
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => onUpdateStatus(prop.id, 'REJECTED')}
                      className="bg-white hover:bg-rose-50 text-rose-600 border border-sage-200 text-xs font-semibold px-3 py-2.5 rounded-xl transition"
                    >
                      Decline
                    </button>
                  </>
                )}

                {/* State: UNDER_REVIEW */}
                {prop.status === 'UNDER_REVIEW' && (
                  <>
                    <button
                      onClick={() => onUpdateStatus(prop.id, 'SHORTLISTED')}
                      className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition"
                    >
                      Shortlist Creator
                    </button>
                    <button
                      onClick={() => onUpdateStatus(prop.id, 'CONTRACT_GENERATED')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition flex items-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Accept & Generate Contract</span>
                    </button>
                  </>
                )}

                {/* State: SHORTLISTED */}
                {prop.status === 'SHORTLISTED' && (
                  <button
                    onClick={() => onUpdateStatus(prop.id, 'CONTRACT_GENERATED')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md transition flex items-center justify-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Generate Binding Contract</span>
                  </button>
                )}

                {/* State: CONTRACT_GENERATED */}
                {prop.status === 'CONTRACT_GENERATED' && (
                  <button
                    onClick={() => onViewContract(prop)}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5"
                  >
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <span>View Executed Contract</span>
                  </button>
                )}

                {/* State: REJECTED */}
                {prop.status === 'REJECTED' && (
                  <button
                    onClick={() => onUpdateStatus(prop.id, 'UNDER_REVIEW')}
                    className="bg-white hover:bg-sage-50 text-ink-600 border border-sage-200 text-xs font-semibold px-3 py-2 rounded-xl transition"
                  >
                    Re-open Review
                  </button>
                )}

              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

