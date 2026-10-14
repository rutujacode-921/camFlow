import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  X, 
  ShieldCheck, 
  Download, 
  User, 
  Calendar, 
  Award,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function ContractViewerModal({ isOpen, onClose, proposal }) {
  const [downloading, setDownloading] = useState(false);

  if (!isOpen || !proposal) return null;

  const contract = proposal.contract || {
    contractNumber: `CAMFLOW-CTR-${proposal.id?.slice(-4) || '9901'}`,
    effectiveDate: new Date().toISOString().split('T')[0],
    brandSignee: `${proposal.brandName || 'Brand'} Legal`,
    creatorSignee: proposal.creatorName,
    totalEscrowSum: proposal.proposedRate || '₹1,50,000',
    milestonesCount: 3,
    rightsTerm: '12 Months Digital Worldwide Exclusivity'
  };

  const handleSimulateDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('📄 Contract PDF downloaded: ' + contract.contractNumber);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-sage-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-sage-200 flex items-center justify-between bg-[#F8FAF7]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-emerald-800">
                  Executed Agreement
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  Legally Binding FSM State
                </span>
              </div>
              <h3 className="text-xl font-editorial font-semibold text-ink-900">
                {contract.contractNumber}
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

        {/* Contract Parchment Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Certificate Badge */}
          <div className="bg-[#FAFBF9] border border-sage-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-ink-500 tracking-wider">Campaign Partnership:</span>
              <h4 className="text-sm font-bold text-ink-900">{proposal.campaignTitle}</h4>
              <p className="text-xs text-ink-500">Effective Date: {contract.effectiveDate}</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-editorial font-bold text-emerald-700">{contract.totalEscrowSum}</span>
              <div className="text-[10px] text-ink-400 font-semibold">Locked in Escrow</div>
            </div>
          </div>

          {/* Legal Terms Blocks */}
          <div className="space-y-3 text-xs text-ink-800">
            <h5 className="font-bold text-ink-900 uppercase tracking-wider text-[11px]">
              Key Contractual Clauses:
            </h5>

            <div className="bg-white border border-sage-200 rounded-xl p-3.5 space-y-1">
              <div className="font-bold text-ink-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>1. Escrow-Lite Fund Protection</span>
              </div>
              <p className="text-ink-600 leading-relaxed text-[11px]">
                The brand ({proposal.brandName}) agrees that 100% of the deal sum ({contract.totalEscrowSum}) is deposited into the CamFlow escrow ledger prior to creator commencement. Funds are disbursed strictly across verified milestone deliverables.
              </p>
            </div>

            <div className="bg-white border border-sage-200 rounded-xl p-3.5 space-y-1">
              <div className="font-bold text-ink-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-sage-700" />
                <span>2. Deliverables & Commercial Rights</span>
              </div>
              <p className="text-ink-600 leading-relaxed text-[11px]">
                Creator ({proposal.creatorName}) shall deliver: <em>{proposal.deliverablesOffered}</em>. Brand receives {contract.rightsTerm}. Raw unwatermarked master assets remain encrypted in CamFlow Vault until final milestone release.
              </p>
            </div>

            <div className="bg-white border border-sage-200 rounded-xl p-3.5 space-y-1">
              <div className="font-bold text-ink-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>3. Delivery Window & Turnaround</span>
              </div>
              <p className="text-ink-600 leading-relaxed text-[11px]">
                Execution turnaround is established at {proposal.estimatedDays || 14} business days from milestone 1 deposit.
              </p>
            </div>
          </div>

          {/* Digital Signature Blocks */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-[#FAFBF9] border border-sage-200 rounded-2xl p-4 text-center space-y-2">
              <div className="text-[10px] uppercase font-bold text-ink-400">Brand Authorized Signatory</div>
              <div className="font-editorial text-base italic text-ink-900 underline decoration-sage-300">
                {contract.brandSignee}
              </div>
              <span className="inline-block text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                ✓ Cryptographically Verified
              </span>
            </div>

            <div className="bg-[#FAFBF9] border border-sage-200 rounded-2xl p-4 text-center space-y-2">
              <div className="text-[10px] uppercase font-bold text-ink-400">Creator Authorized Signatory</div>
              <div className="font-editorial text-base italic text-ink-900 underline decoration-sage-300">
                {contract.creatorSignee}
              </div>
              <span className="inline-block text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                ✓ Cryptographically Verified
              </span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8FAF7] border-t border-sage-200 flex items-center justify-between">
          <div className="text-[10px] text-ink-400">
            SHA-256 Hash: 4e9a8f21...c81b (Immutable Audit Trail)
          </div>
          <button
            onClick={handleSimulateDownload}
            disabled={downloading}
            className="bg-sage-800 hover:bg-sage-900 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? 'Preparing PDF...' : 'Download Signed Agreement'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}

