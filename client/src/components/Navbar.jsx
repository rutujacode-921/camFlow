import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  User, 
  LogOut, 
  Plus, 
  Briefcase, 
  Camera, 
  ChevronDown 
} from 'lucide-react';

export default function Navbar({ 
  activeView, 
  setActiveView, 
  onOpenAuth,
  onOpenCreatorOnboarding,
  onOpenCreateCampaign
}) {
  const { user, logout, currentRole, setCurrentRole } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-sage-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveView('portfolio')}>
            <div className="w-10 h-10 rounded-2xl bg-sage-800 text-white flex items-center justify-center font-editorial font-bold text-xl shadow-md">
              C
            </div>
            <div>
              <span className="text-xl font-editorial font-bold tracking-tight text-ink-900">
                CamFlow
              </span>
              <span className="block text-[10px] uppercase tracking-widest font-semibold text-sage-800 -mt-1">
                Ecosystem
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <button 
              onClick={() => setActiveView('portfolio')}
              className={`transition-colors py-1 ${activeView === 'portfolio' ? 'text-ink-900 font-semibold border-b-2 border-sage-800' : 'text-ink-500 hover:text-ink-900'}`}
            >
              Creator Portfolio
            </button>
            <button 
              onClick={() => setActiveView('directory')}
              className={`transition-colors py-1 ${activeView === 'directory' ? 'text-ink-900 font-semibold border-b-2 border-sage-800' : 'text-ink-500 hover:text-ink-900'}`}
            >
              Brand Discovery & AI Match
            </button>
            <button 
              onClick={() => setActiveView('escrow')}
              className={`transition-colors py-1 ${activeView === 'escrow' ? 'text-ink-900 font-semibold border-b-2 border-sage-800' : 'text-ink-500 hover:text-ink-900'}`}
            >
              Escrow Milestone Tracker
            </button>
          </nav>

          {/* Right Actions: Role Switcher & User Profile Pill */}
          <div className="flex items-center space-x-3">
            
            {/* Quick Action Button depending on active role */}
            {currentRole === 'creator' ? (
              <button
                onClick={onOpenCreatorOnboarding}
                className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-semibold bg-white hover:bg-sage-50 text-sage-900 border border-sage-300 px-3.5 py-2 rounded-xl shadow-xs transition"
              >
                <Plus className="w-3.5 h-3.5 text-sage-700" />
                <span>Onboard Portfolio</span>
              </button>
            ) : (
              <button
                onClick={onOpenCreateCampaign}
                className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-semibold bg-white hover:bg-sage-50 text-sage-900 border border-sage-300 px-3.5 py-2 rounded-xl shadow-xs transition"
              >
                <Plus className="w-3.5 h-3.5 text-sage-700" />
                <span>Post Brief</span>
              </button>
            )}

            {/* Role Switcher Pill */}
            <div className="bg-[#EBF3EA] p-1 rounded-xl flex items-center border border-sage-200">
              <button 
                onClick={() => setCurrentRole('brand')}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${currentRole === 'brand' ? 'bg-white text-ink-900 shadow-sm font-semibold' : 'text-ink-700 hover:text-ink-900'}`}
              >
                Brand
              </button>
              <button 
                onClick={() => setCurrentRole('creator')}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${currentRole === 'creator' ? 'bg-white text-ink-900 shadow-sm font-semibold' : 'text-ink-700 hover:text-ink-900'}`}
              >
                Creator
              </button>
            </div>

            {/* User Profile Pill or Sign In Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 bg-white border border-sage-200 hover:border-sage-400 p-1.5 pl-2.5 rounded-2xl shadow-xs transition"
                >
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-bold text-ink-900 leading-tight">{user.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-sage-700 font-semibold uppercase">{user.role}</div>
                  </div>
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-xl object-cover border border-sage-200"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-ink-400" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-sage-200 p-2 z-50 animate-fade-in space-y-1">
                    <div className="p-2 border-b border-sage-100">
                      <div className="text-xs font-bold text-ink-900">{user.name}</div>
                      <div className="text-[11px] text-ink-500 truncate">{user.email}</div>
                    </div>

                    {user.role === 'creator' ? (
                      <button
                        onClick={() => { setProfileDropdownOpen(false); onOpenCreatorOnboarding(); }}
                        className="w-full text-left flex items-center space-x-2 p-2 rounded-xl text-xs text-ink-700 hover:bg-sage-50 font-medium"
                      >
                        <Camera className="w-3.5 h-3.5 text-sage-700" />
                        <span>Edit Creator Profile</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => { setProfileDropdownOpen(false); onOpenCreateCampaign(); }}
                        className="w-full text-left flex items-center space-x-2 p-2 rounded-xl text-xs text-ink-700 hover:bg-sage-50 font-medium"
                      >
                        <Briefcase className="w-3.5 h-3.5 text-sage-700" />
                        <span>Post Campaign Brief</span>
                      </button>
                    )}

                    <button
                      onClick={() => { setProfileDropdownOpen(false); onOpenAuth(); }}
                      className="w-full text-left flex items-center space-x-2 p-2 rounded-xl text-xs text-ink-700 hover:bg-sage-50 font-medium"
                    >
                      <User className="w-3.5 h-3.5 text-sage-700" />
                      <span>Switch Account</span>
                    </button>

                    <button
                      onClick={() => { setProfileDropdownOpen(false); logout(); }}
                      className="w-full text-left flex items-center space-x-2 p-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 font-medium border-t border-sage-100"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-sage-800 hover:bg-sage-900 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition"
              >
                Sign In
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
