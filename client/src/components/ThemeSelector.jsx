import React from 'react';
import { Palette, Check } from 'lucide-react';

export const EDITORIAL_THEMES = {
  sage: {
    id: 'sage',
    name: 'Matcha Sage',
    swatch: '#D7E7D5',
    cardBg: 'bg-[#F5F8F4]',
    pillBg: 'bg-sage-100 text-sage-900 border-sage-300/60',
    accentText: 'text-sage-800',
    borderColor: 'border-sage-200/80',
    heroAccent: 'text-sage-700',
    testimonialBg: 'bg-[#F5F8F4]',
    tagBg: 'bg-sage-100 text-sage-800 border-sage-200'
  },
  rose: {
    id: 'rose',
    name: 'Blush Rose',
    swatch: '#F8D7DA',
    cardBg: 'bg-[#FDF3F4]',
    pillBg: 'bg-rose-100 text-rose-900 border-rose-300/60',
    accentText: 'text-rose-800',
    borderColor: 'border-rose-200/80',
    heroAccent: 'text-rose-700',
    testimonialBg: 'bg-[#FDF3F4]',
    tagBg: 'bg-rose-100 text-rose-800 border-rose-200'
  },
  noir: {
    id: 'noir',
    name: 'Noir Silk',
    swatch: '#2D3748',
    cardBg: 'bg-[#F4F4F6]',
    pillBg: 'bg-zinc-200 text-zinc-900 border-zinc-300',
    accentText: 'text-zinc-900',
    borderColor: 'border-zinc-300/80',
    heroAccent: 'text-zinc-800',
    testimonialBg: 'bg-[#F4F4F6]',
    tagBg: 'bg-zinc-200 text-zinc-800 border-zinc-300'
  },
  champagne: {
    id: 'champagne',
    name: 'Champagne Warmth',
    swatch: '#F6E5B8',
    cardBg: 'bg-[#FAF6EE]',
    pillBg: 'bg-amber-100 text-amber-900 border-amber-300/60',
    accentText: 'text-amber-800',
    borderColor: 'border-amber-200/80',
    heroAccent: 'text-amber-700',
    testimonialBg: 'bg-[#FAF6EE]',
    tagBg: 'bg-amber-100 text-amber-800 border-amber-200'
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean Mist',
    swatch: '#BEE3F8',
    cardBg: 'bg-[#F0F6F8]',
    pillBg: 'bg-sky-100 text-sky-900 border-sky-300/60',
    accentText: 'text-sky-800',
    borderColor: 'border-sky-200/80',
    heroAccent: 'text-sky-700',
    testimonialBg: 'bg-[#F0F6F8]',
    tagBg: 'bg-sky-100 text-sky-800 border-sky-200'
  }
};

export default function ThemeSelector({ currentTheme = 'sage', onSelectTheme }) {
  return (
    <div className="inline-flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full border border-sage-200/80 shadow-xs">
      <div className="flex items-center space-x-1 text-[11px] font-semibold text-ink-600 mr-1">
        <Palette className="w-3.5 h-3.5 text-ink-500" />
        <span className="hidden sm:inline">Theme Palette:</span>
      </div>

      <div className="flex items-center space-x-1.5">
        {Object.values(EDITORIAL_THEMES).map((th) => {
          const isSelected = currentTheme === th.id;
          return (
            <button
              key={th.id}
              onClick={() => onSelectTheme(th.id)}
              title={`Switch to ${th.name}`}
              className={`w-5 h-5 rounded-full transition-all relative flex items-center justify-center ${
                isSelected ? 'ring-2 ring-ink-900 ring-offset-1 scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: th.swatch }}
            >
              {isSelected && <Check className="w-2.5 h-2.5 text-ink-900 stroke-[3]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

