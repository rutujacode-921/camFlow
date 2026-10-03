import React, { useState } from 'react';
import RotatingStamp from './RotatingStamp';
import { FloatingPill1, FloatingPill2, FloatingEscrowChip } from './FloatingElements';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Share2, 
  ExternalLink,
  CheckCircle2,
  Mail,
  Instagram,
  Eye,
  Award
} from 'lucide-react';

export default function CreatorPortfolio({ 
  creator, 
  onOpenEscrow, 
  onOpenMediaVault, 
  onOpenScanner, 
  onOpenPitchGenerator,
  onOpenMatchScoreModal 
}) {
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submittedInquiry, setSubmittedInquiry] = useState(false);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryEmail) return;
    setSubmittedInquiry(true);
    setTimeout(() => setSubmittedInquiry(false), 4000);
    setInquiryEmail('');
    setInquiryMessage('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16">
      
      {/* Top Banner: Killer Feature Quick-Launch Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-sage-200/80 rounded-2xl p-3 px-5 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-700">Verified Creator Profile</span>
          <span className="hidden sm:inline text-xs text-ink-300">|</span>
          <span className="hidden sm:inline text-xs text-sage-800 font-medium">CamFlow Smart Escrow Enabled</span>
        </div>
        
        {/* Killer Feature Direct Action Triggers */}
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => onOpenMatchScoreModal(creator)}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-sage-100 hover:bg-sage-200 text-sage-900 px-3 py-1.5 rounded-full transition-colors border border-sage-300/60"
            title="Inspect AI Match Score Algorithm"
          >
            <Sparkles className="w-3.5 h-3.5 text-sage-700" />
            <span>AI Match: {creator.calculatedMatchScore || 94}%</span>
          </button>

          <button 
            onClick={() => onOpenScanner(creator)}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full transition-colors border border-emerald-200"
            title="Run Fake Follower & Audience Audit"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Trust Badge: {creator.socialStats?.authenticityScore || 98}%</span>
          </button>

          <button 
            onClick={() => onOpenEscrow(creator)}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 px-3 py-1.5 rounded-full transition-colors border border-amber-200"
            title="View Escrow-Lite Milestone Pipeline"
          >
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            <span>Escrow Milestones</span>
          </button>

          <button 
            onClick={() => onOpenMediaVault(creator)}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-900 px-3 py-1.5 rounded-full transition-colors border border-indigo-200"
            title="Inspect Watermarked Content Vault"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-600" />
            <span>Watermark Vault</span>
          </button>

          <button 
            onClick={() => onOpenPitchGenerator(creator)}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-900 px-3 py-1.5 rounded-full transition-colors border border-rose-200"
            title="Generate AI Pitch & Media Kit"
          >
            <FileText className="w-3.5 h-3.5 text-rose-600" />
            <span>AI Pitch Generator</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: HERO SECTION (Exact 1:1 match to reference image) */}
      <section className="relative pt-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Bio, and Call to Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-medium uppercase tracking-widest text-ink-500">
              <span>{creator.category}</span>
              <span>•</span>
              <span>{creator.location}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial font-medium tracking-tight text-ink-900 leading-[1.12]">
              Hello! I'm {creator.name.split(' ')[0]}, a {creator.category.toLowerCase().includes('photo') ? 'photographer' : 'visual creator'}
            </h1>

            <p className="text-base sm:text-lg text-ink-700 leading-relaxed max-w-lg font-normal">
              {creator.bio}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <a 
                href="#featured" 
                className="inline-flex items-center space-x-2 text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors group"
              >
                <span>More about me</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => onOpenPitchGenerator(creator)}
                className="inline-flex items-center space-x-2 text-xs font-semibold bg-ink-900 text-white hover:bg-ink-800 px-4 py-2.5 rounded-full shadow-md transition-transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Instant Pitch & Media Kit</span>
              </button>
            </div>
          </div>

          {/* Right Column: Arched Hero Portrait with Rotating Stamp & Motion Pills */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center">
            
            {/* Rotating Stamp (Matching the reference layout placed to the left of the arch) */}
            <div className="absolute -left-4 sm:left-4 md:left-8 top-1/3 z-20">
              <RotatingStamp text="MY PROJECTS • MY PROJECTS • " size={120} />
            </div>

            {/* Kinetic Floating Pills */}
            <FloatingPill1 score={`${creator.socialStats?.authenticityScore || 98}%`} />
            <FloatingPill2 stat="+42% ROI" label="Avg Conversion Lift" />
            <FloatingEscrowChip />

            {/* The Arched Portrait Frame (Exact match to the reference image) */}
            <div className="relative w-[280px] sm:w-[340px] md:w-[380px] h-[390px] sm:h-[460px] md:h-[500px] overflow-hidden arch-portrait shadow-2xl bg-sage-100 border-[6px] border-white transition-all duration-500 hover:scale-[1.01]">
              <img 
                src={creator.avatar} 
                alt={creator.name}
                className="w-full h-full object-cover object-center filter saturate-[1.02] contrast-[1.02]"
              />
              {/* Soft editorial gradient tint at base */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: FEATURED WORK (Soft Pastel Matcha Green Container matching reference) */}
      <section id="featured" className="w-full">
        <div className="bg-[#EBF3EA] rounded-3xl p-8 sm:p-12 lg:p-14 border border-sage-200/80 shadow-sm relative overflow-hidden">
          
          {/* Subtle decorative background watermarks */}
          <div className="absolute top-4 right-8 text-sage-200/40 text-7xl font-editorial select-none pointer-events-none">
            01
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Metadata & Description */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-sage-800">
                {creator.featuredWork?.category || "Product photography"}
              </span>

              <h2 className="text-3xl sm:text-4xl font-editorial font-semibold text-ink-900 leading-tight">
                {creator.featuredWork?.title || "Paris secrets"}
              </h2>

              <p className="text-sm sm:text-base text-ink-700 leading-relaxed font-normal">
                {creator.featuredWork?.description || "Sint occaecat deserunt aliquip do occaecat ut quis. Cupidatat magna fugiat quis sit duis est in volup."}
              </p>

              <div className="pt-2">
                <button 
                  onClick={() => onOpenMediaVault(creator)}
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-ink-900 hover:text-sage-900 group"
                >
                  <span>View project</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column: 3 Vertical Image Cards side by side */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-3 sm:gap-4">
              {(creator.featuredWork?.images || []).map((imgUrl, idx) => (
                <div 
                  key={idx}
                  className="relative group aspect-[9/16] rounded-2xl overflow-hidden bg-white shadow-md border-2 border-white/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <img 
                    src={imgUrl} 
                    alt={`Featured shot ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink-900/10 group-hover:bg-transparent transition-colors"></div>
                  
                  {/* Subtle hover badge */}
                  <div className="absolute bottom-2 left-2 right-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] bg-white/90 backdrop-blur-sm text-ink-900 font-semibold px-2 py-0.5 rounded-full shadow">
                      Verified Shot
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: TESTIMONIAL PILL (Soft tint with circular client cutout matching reference) */}
      <section className="w-full">
        <div className="bg-[#F5F8F4] rounded-3xl p-6 sm:p-8 border border-sage-200/60 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            
            {/* Circular Client Avatar Cutout */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-sage-200">
                <img 
                  src={creator.testimonial?.clientAvatar || creator.avatar} 
                  alt="Client"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-rose-500">
                Testimonials
              </span>
              <p className="text-base sm:text-lg font-editorial italic text-ink-900 leading-snug">
                "{creator.testimonial?.quote}"
              </p>
              <div className="text-xs font-semibold text-ink-700">
                <span>Verified Brand Partner</span> • <span className="text-sage-800">{creator.testimonial?.client}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: OTHER PROJECTS (Grid with 3 projects & Explore link matching reference) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl sm:text-3xl font-editorial font-semibold text-ink-900">
            Other projects
          </h3>
          <button 
            onClick={() => onOpenMediaVault(creator)}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(creator.otherProjects || []).map((project) => (
            <div 
              key={project.id}
              className="group space-y-3 cursor-pointer"
              onClick={() => onOpenMediaVault(creator)}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sage-100 shadow-sm border border-sage-200/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-semibold text-ink-800 shadow-xs">
                  {project.category}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink-900 group-hover:text-rose-600 transition-colors">
                  {project.title}
                </h4>
                <p className="text-xs text-ink-500">CamFlow Verified Asset</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: SAY HELLO & PROPOSAL DRAWER (Dark rounded bottom card matching reference) */}
      <section className="w-full pt-6">
        <div className="bg-[#181A1B] text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          
          {/* Subtle decorative glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Trust Copy */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-medium leading-tight">
                Say hello and let's work together !
              </h2>
              <p className="text-sm sm:text-base text-gray-300 max-w-md font-light leading-relaxed">
                Ready to elevate your brand campaign with verified reach? All deals initiated here are backed by CamFlow's Escrow-Lite payment protection and dynamic watermark preview vault.
              </p>

              <div className="pt-4 flex items-center space-x-4 text-gray-400 text-xs">
                <div className="flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Escrow Safe</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero Ghosting Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-6">
              {submittedInquiry ? (
                <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-semibold text-white">Proposal Sent to {creator.name}!</h4>
                  <p className="text-xs text-gray-300">
                    A draft contract pipeline has been generated. You can lock milestones in the Escrow tracker.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1.5">
                      Email
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="Your brand work email"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full bg-[#24272B] border border-gray-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1.5">
                      Input your message
                    </label>
                    <textarea 
                      rows={3}
                      required
                      placeholder="Describe your project, budget, and desired deliverables..."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full bg-[#24272B] border border-gray-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-gray-400">
                      Standard response time: ~2 hours
                    </span>
                    <button 
                      type="submit"
                      className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-lg transition-transform active:scale-95"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

          {/* Bottom Bar: Copyright & Subtle Links */}
          <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div>
              © 2026 CamFlow Inc. • Privacy • Terms • Escrow Rules
            </div>
            <div className="flex items-center space-x-4 text-gray-400">
              <span className="hover:text-white cursor-pointer">Instagram</span>
              <span className="hover:text-white cursor-pointer">LinkedIn</span>
              <span className="hover:text-white cursor-pointer">Security Vault</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
