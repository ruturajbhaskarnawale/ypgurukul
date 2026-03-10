"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const DaVinciLines = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-30">
      <svg
        ref={svgRef}
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Golden Ratio Spiral / Geometric Proof Lines */}
        <motion.path
          d="M 500,500 m -400,0 a 400,400 0 1,0 800,0 a 400,400 0 1,0 -800,0"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          className="text-foreground/40"
        />
        
        {/* Horizontal & Vertical Grid Lines */}
        <motion.line
          x1="0" y1="500" x2="1000" y2="500"
          stroke="currentColor" strokeWidth="0.5"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
          className="text-foreground/20"
        />
        <motion.line
          x1="500" y1="0" x2="500" y2="1000"
          stroke="currentColor" strokeWidth="0.5"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
          className="text-foreground/20"
        />

        {/* Diagonal Lines */}
        <motion.line
          x1="0" y1="0" x2="1000" y2="1000"
          stroke="currentColor" strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 1 }}
          className="text-foreground/10"
        />
        <motion.line
          x1="1000" y1="0" x2="0" y2="1000"
          stroke="currentColor" strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 1 }}
          className="text-foreground/10"
        />

        {/* Concentric Circles */}
        {[200, 300, 400].map((radius, i) => (
          <motion.circle
            key={radius}
            cx="500" cy="500" r={radius}
            fill="none" stroke="currentColor" strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 1 + i * 0.2 }}
            className="text-foreground/20"
          />
        ))}

        {/* Ellipses */}
        <motion.ellipse
          cx="500" cy="500" rx="450" ry="250"
          fill="none" stroke="currentColor" strokeWidth="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 1.5 }}
          className="text-foreground/15"
        />
      </svg>
    </div>
  );
};
