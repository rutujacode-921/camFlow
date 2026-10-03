import React from 'react';

export default function Navbar({ 
  activeView, 
  setActiveView, 
  currentRole, 
  setCurrentRole 
}) {
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

          {/* Right Actions: Role Switcher */}
          <div className="flex items-center space-x-3">
            <span className="text-xs text-ink-500 hidden sm:inline font-medium">View as:</span>
            {/* Role Switcher Pill */}
            <div className="bg-[#EBF3EA] p-1 rounded-xl flex items-center border border-sage-200">
              <button 
                onClick={() => setCurrentRole('brand')}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition ${currentRole === 'brand' ? 'bg-white text-ink-900 shadow-sm font-semibold' : 'text-ink-700 hover:text-ink-900'}`}
              >
                Brand
              </button>
              <button 
                onClick={() => setCurrentRole('creator')}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition ${currentRole === 'creator' ? 'bg-white text-ink-900 shadow-sm font-semibold' : 'text-ink-700 hover:text-ink-900'}`}
              >
                Creator
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
