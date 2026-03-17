"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// GSAP ScrollTrigger registration handled globally in SmoothScrollProvider

export const HeroBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Background animation or static state could be added here if needed for B&W
      return () => {
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-[120vh] bg-background"
    >
      <div className="relative w-full h-full"> 
        {/* Parallax layers removed for strict B&W theme */}
        
        {/* Subtle overlay for depth integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80 z-[30]" />
      </div>
    </div>
  );
};
