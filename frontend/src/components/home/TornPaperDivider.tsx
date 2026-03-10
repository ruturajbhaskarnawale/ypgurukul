"use client";

import React, { useId } from 'react';

interface TornPaperDividerProps {
  fill?: string;
  invertY?: boolean;
  className?: string;
}

/**
 * TornPaperDivider — Simplified high-fidelity static paper tear.
 * Maintains the fibrous organic edge via SVG filters but removes all motion effects.
 */
export const TornPaperDivider: React.FC<TornPaperDividerProps> = ({
  fill = '#f5f0e8',
  invertY = false,
  className = '',
}) => {
  const filterId = useId().replace(/:/g, "");

  // Ultra-organic, non-linear path with dramatic dips to match the reference exactly
  const baseCurve = "M-50,200 L-50,20 C150,15 300,130 500,110 C700,90 850,25 1050,45 C1200,60 1350,15 1490,30 L1490,200 Z";

  return (
    <div
      className={`relative w-full overflow-hidden leading-none ${className}`}
      aria-hidden="true"
      style={{ 
        transform: invertY ? 'scaleY(-1)' : undefined,
        zIndex: 40,
        margin: invertY ? "-1px 0 0 0" : "0 0 -1px 0"
      }}
    >
      <svg
        viewBox="0 0 1440 160"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height: '100px' }}
      >
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.05 0.08" 
              numOctaves="5" 
              seed="5"
              result="noise" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="20" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>

          <filter id={`${filterId}-texture`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="txt" />
            <feDiffuseLighting in="txt" lightingColor="white" surfaceScale="1">
              <feDistantLight azimuth="45" elevation="60" />
            </feDiffuseLighting>
            <feComposite operator="arithmetic" k1="0" k2="1" k3="0.2" k4="0" in="SourceGraphic" />
          </filter>
        </defs>

        {/* Glowing Edge Effect - Simulates light-scattering at the fiber tips */}
        <path
          d={baseCurve}
          fill="none"
          stroke="white"
          strokeWidth="7"
          opacity="0.4"
          filter={`url(#${filterId})`}
          className="blur-[5px]"
        />

        {/* Primary Paper Body with Surface Texture */}
        <path
          d={baseCurve}
          fill={fill}
          filter={`url(#${filterId}) url(#${filterId}-texture)`}
        />
        
        {/* Sharp Glowing Edge Accent */}
        <path
          d={baseCurve}
          fill="none"
          stroke="white"
          strokeWidth="1.8"
          opacity="3.9"
          filter={`url(#${filterId})`}
          className="mix-blend-overlay"
        />
      </svg>
    </div>
  );
};
