import React from 'react';

export default function RotatingStamp({ text = "MY PROJECTS • MY PROJECTS • ", size = 110 }) {
  // SVG TextPath rotating badge (Identical to the reference image design!)
  return (
    <div 
      className="relative flex items-center justify-center select-none" 
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full rotating-stamp"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <path
            id="circlePath"
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
          />
        </defs>
        <text 
          fill="#1C1E21" 
          fontSize="9.5" 
          fontWeight="600" 
          letterSpacing="2.2"
          className="uppercase tracking-widest font-sans"
        >
          <textPath href="#circlePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      {/* Down arrow in the center matching the reference */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-ink-900">
        <svg 
          className="w-5 h-5 animate-bounce" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}
