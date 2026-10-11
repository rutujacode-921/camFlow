import React, { useState } from 'react';
import RotatingStamp from './RotatingStamp';
import { FloatingPill1, FloatingPill2, FloatingEscrowChip } from './FloatingElements';
import ThemeSelector, { EDITORIAL_THEMES } from './ThemeSelector';
import { useAuth } from '../context/AuthContext';
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
  Award,
  Edit3,
  Plus,
  RefreshCw,
  Palette,
  Sliders,
  Trash2
} from 'lucide-react';

export default function CreatorPortfolio({ 
  creator, 
  onOpenEscrow, 
  onOpenMediaVault, 
  onOpenScanner, 
  onOpenPitchGenerator,
  onOpenMatchScoreModal,
  onOpenEditPortfolio,
  onOpenProjectManager,
  onOpenSocialSync,
  onSelectTheme,
  onDeleteProject
}) {
  const { user } = useAuth();
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submittedInquiry, setSubmittedInquiry] = useState(false);

  if (!creator) return null;

  // Determine if viewing as creator owner
  const isOwner = user?.role === 'creator' && (user?.profileId === creator.id || (!user?.profileId && creator.id === 'creator-nelson'));

  // Active theme aesthetic
  const currentThemeId = creator.theme || 'sage';
  const activeTheme = EDITORIAL_THEMES[currentThemeId] || EDITORIAL_THEMES.sage;

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryEmail) return;
    setSubmittedInquiry(true);
    setTimeout(() => setSubmittedInquiry(false), 4000);
    setInquiryEmail('');
    setInquiryMessage('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      
      {/* DAY 3: CREATOR STUDIO MANAGEMENT BAR (Visible when viewing own profile) */}
      {isOwner && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border-2 border-sage-300 rounded-2xl p-3 px-5 shadow-sm animate-fadeIn">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-900">
              ✨ Creator Studio Mode
            </span>
            <span className="hidden sm:inline text-xs text-ink-300">|</span>
            <span className="hidden sm:inline text-xs text-sage-800 font-medium">
              Live Customization Engine Active
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ThemeSelector 
              currentTheme={currentThemeId} 
              onSelectTheme={onSelectTheme} 
            />

            <button 
              onClick={onOpenEditPortfolio}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-sage-50 hover:bg-sage-100 text-ink-900 px-3 py-1.5 rounded-full border border-sage-200 transition-colors shadow-xs"
              title="Edit Profile, Bio, Rates & Tags"
            >
              <Edit3 className="w-3.5 h-3.5 text-sage-700" />
              <span>Edit Profile</span>
            </button>

            <button 
              onClick={onOpenProjectManager}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-sage-50 hover:bg-sage-100 text-ink-900 px-3 py-1.5 rounded-full border border-sage-200 transition-colors shadow-xs"
              title="Add & Manage Showcase Projects"
            >
              <Plus className="w-3.5 h-3.5 text-sage-700" />
              <span>Manage Projects</span>
            </button>

            <button 
              onClick={onOpenSocialSync}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-full border border-emerald-200 transition-colors shadow-xs"
              title="Sync Real-Time Metrics & Handles"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sync Socials</span>
            </button>
          </div>
        </div>
      )}

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

      {/* SECTION 1: HERO SECTION (Exact 1:1 match to reference image with Theme accents) */}
      <section className="relative pt-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Bio, and Call to Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-medium uppercase tracking-widest text-ink-500">
              <span className={`font-semibold ${activeTheme.accentText}`}>{creator.category}</span>
              <span>•</span>
              <span>{creator.location}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial font-medium tracking-tight text-ink-900 leading-[1.12]">
              Hello! I'm {creator.name.split(' ')[0]}, a {creator.category.toLowerCase().includes('photo') ? 'photographer' : 'visual creator'}
            </h1>

            <p className="text-base sm:text-lg text-ink-700 leading-relaxed max-w-lg font-normal">
              {creator.bio}
            </p>

            {/* Niche Taxonomy Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(creator.tags || []).map((tag, idx) => (
                <span 
                  key={idx} 
                  className={`text-xs px-2.5 py-1 rounded-full border ${activeTheme.tagBg}`}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Starting Rate & Verification Pill */}
            <div className="flex items-center space-x-4 pt-1 text-xs text-ink-600">
              <span className="font-semibold text-ink-900">
                Starting: <span className={activeTheme.accentText}>{creator.startingRate}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{creator.completedDeals || 42} Verified Deals</span>
              </span>
              <span>•</span>
              <button
                onClick={onOpenSocialSync}
                className="flex items-center space-x-1 hover:text-ink-900 transition-colors cursor-pointer"
                title="View Live Social Connection"
              >
                <Instagram className="w-3.5 h-3.5 text-rose-500" />
                <span className="underline decoration-dotted">{creator.socialStats?.instagram || '185K'} Reach</span>
              </button>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
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

              {isOwner && (
                <button
                  onClick={onOpenEditPortfolio}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-white hover:bg-sage-50 text-ink-800 px-3.5 py-2 rounded-full border border-sage-200 transition-colors shadow-xs"
                >
                  <Edit3 className="w-3.5 h-3.5 text-sage-700" />
                  <span>Customize Portfolio</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Arched Hero Portrait with Rotating Stamp & Motion Pills */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center">
            
            {/* Rotating Stamp for Creator Profile */}
            <div className="absolute -left-4 sm:left-4 md:left-8 top-1/3 z-20">
              <RotatingStamp text="MY PROFILE • MY PROFILE • " size={120} />
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

      {/* SECTION 2: FEATURED WORK (Themed Pastel Container matching reference) */}
      <section id="featured" className="w-full">
        <div className={`${activeTheme.cardBg} rounded-3xl p-8 sm:p-12 lg:p-14 border ${activeTheme.borderColor} shadow-sm relative overflow-hidden transition-colors duration-500`}>
          
          {/* Subtle decorative background watermarks */}
          <div className="absolute top-4 right-8 text-black/5 text-7xl font-editorial select-none pointer-events-none">
            01
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Metadata & Description */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center space-x-2">
                <span className={`text-xs uppercase tracking-widest font-semibold ${activeTheme.accentText}`}>
                  {creator.featuredWork?.category || "Product photography"}
                </span>
                {isOwner && (
                  <button 
                    onClick={onOpenEditPortfolio}
                    className="p-1 rounded hover:bg-black/5 text-ink-500"
                    title="Edit Case Study"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                )}
              </div>

              <h2 className="text-3xl sm:text-4xl font-editorial font-semibold text-ink-900 leading-tight">
                {creator.featuredWork?.title || "Paris secrets"}
              </h2>

              <p className="text-sm sm:text-base text-ink-700 leading-relaxed font-normal">
                {creator.featuredWork?.description || "Sint occaecat deserunt aliquip do occaecat ut quis. Cupidatat magna fugiat quis sit duis est in volup."}
              </p>

              <div className="pt-2">
                <button 
                  onClick={() => onOpenMediaVault(creator)}
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-ink-900 hover:text-black group"
                >
                  <span>View project vault</span>
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
        <div className={`${activeTheme.testimonialBg} rounded-3xl p-6 sm:p-8 border ${activeTheme.borderColor} shadow-sm transition-colors duration-500`}>
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
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-rose-500">
                  Testimonials
                </span>
                {isOwner && (
                  <button 
                    onClick={onOpenEditPortfolio}
                    className="p-0.5 rounded hover:bg-black/5 text-ink-400"
                    title="Edit Testimonial"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                )}
              </div>
              <p className="text-base sm:text-lg font-editorial italic text-ink-900 leading-snug">
                "{creator.testimonial?.quote}"
              </p>
              <div className="text-xs font-semibold text-ink-700">
                <span>Verified Brand Partner</span> • <span className={activeTheme.accentText}>{creator.testimonial?.client}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: OTHER PROJECTS (Grid with dynamic project management) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-2xl sm:text-3xl font-editorial font-semibold text-ink-900">
              Other projects
            </h3>
            <span className="text-xs text-ink-500">({creator.otherProjects?.length || 0})</span>
          </div>

          <div className="flex items-center space-x-3">
            {isOwner && (
              <button 
                onClick={onOpenProjectManager}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-white hover:bg-sage-50 text-ink-900 px-3 py-1.5 rounded-full border border-sage-200 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-sage-700" />
                <span>Add / Manage</span>
              </button>
            )}

            <button 
              onClick={() => onOpenMediaVault(creator)}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors"
            >
              <span>Explore Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(creator.otherProjects || []).map((project) => (
            <div 
              key={project.id}
              className="group space-y-3 relative"
            >
              <div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sage-100 shadow-sm border border-sage-200/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md cursor-pointer"
                onClick={() => onOpenMediaVault(creator)}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-semibold text-ink-800 shadow-xs">
                  {project.category}
                </div>

                {/* Quick Delete action for owner */}
                {isOwner && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Remove "${project.title}" from portfolio?`)) {
                        onDeleteProject(creator.id, project.id);
                      }
                    }}
                    className="absolute top-3 left-3 p-1.5 rounded-full bg-white/90 text-rose-600 hover:bg-white shadow-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div>
                <h4 
                  onClick={() => onOpenMediaVault(creator)}
                  className="text-sm font-semibold text-ink-900 group-hover:text-rose-600 transition-colors cursor-pointer"
                >
                  {project.title}
                </h4>
                <p className="text-xs text-ink-500">
                  {project.client ? `Client: ${project.client}` : 'CamFlow Verified Asset'}
                </p>
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
              <span onClick={onOpenSocialSync} className="hover:text-white cursor-pointer">Instagram</span>
              <span onClick={onOpenSocialSync} className="hover:text-white cursor-pointer">YouTube</span>
              <span onClick={onOpenSocialSync} className="hover:text-white cursor-pointer">TikTok</span>
              <span onClick={() => onOpenMediaVault(creator)} className="hover:text-white cursor-pointer">Security Vault</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
