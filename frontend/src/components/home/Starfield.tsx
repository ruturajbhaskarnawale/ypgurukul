"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface StarfieldProps {
  opacity?: number;
  starCount?: number;
}

export const Starfield = ({ opacity = 0.6, starCount = 50 }: StarfieldProps) => {
  const [stars, setStars] = useState<{width: string, height: string, top: string, left: string, opacity: number, animation: string}[]>([]);

  useEffect(() => {
    setStars([...Array(starCount)].map(() => ({
      width: Math.random() * 2 + 'px',
      height: Math.random() * 2 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      opacity: Math.random() * 0.7,
      animation: `twinkle ${2 + Math.random() * 5}s infinite ease-in-out`
    })));
  }, [starCount]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-background">
      {/* Background Image Texture */}
      <div className={`absolute inset-0 grayscale mix-blend-multiply transition-opacity duration-1000`} style={{ opacity }}>
        <Image 
          src="/images/backgrounds/BG-G.png" 
          alt="" 
          fill 
          className="object-cover"
          priority
        />
      </div>
      
      {/* Twinkling Stars Layer */}
      <div className="absolute inset-0">
         {stars.map((style, i) => (
           <div 
             key={i} 
             className="absolute rounded-full bg-foreground transition-opacity duration-1000"
             style={style}
           />
         ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
