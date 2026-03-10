"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PARALLAX_LAYERS = [
  // Background layer slightly blurred and darkened for better contrast with text and foreground
  { id: 'bg', src: '/images/hero_gurukul_painting.png', depthXY: 0.02, depthYScroll: 0.1, zIndex: 0, scale: 1.02, opacity: 1, objectFit: 'cover', alignment: 'inset-0', imageClassName: 'blur-[4px] brightness-[0.7] saturate-[0.8]' },
  
  // Custom Floating Midground/Foreground Elements (AI Generated) - Enlaged
  { id: 'fg_books', src: '/images/parallax/floating_books%20copy.png', depthXY: 0.05, depthYScroll: 0.35, zIndex: 12, scale: 1.1, opacity: 0.9, objectFit: 'contain', alignment: 'top-[5%] left-[2%] w-[45%] md:w-[35%] h-[50%]', mixBlend: 'multiply' },
  { id: 'fg_astrolabe', src: '/images/parallax/glowing_astrolabe%20copy.png', depthXY: 0.08, depthYScroll: 0.6, zIndex: 18, scale: 1.2, opacity: 0.95, objectFit: 'contain', alignment: 'top-[10%] right-[2%] md:right-[10%] w-[50%] md:w-[35%] h-[45%]', mixBlend: 'multiply' },
  
  // Foreground Students (Left and Right) - Enlarged
  { id: 'student_left', src: '/images/parallax/student%203.png', depthXY: -0.06, depthYScroll: 0.5, zIndex: 25, scale: 1.15, opacity: 1, objectFit: 'contain', alignment: 'bottom-0 left-[-10%] w-[45%] md:w-[45%] h-[65%]' },
  { id: 'student_right', src: '/images/parallax/student2.png', depthXY: -0.08, depthYScroll: 0.6, zIndex: 26, scale: 1.15, opacity: 1, objectFit: 'contain', alignment: 'bottom-0 right-[-10%] w-[45%] md:w-[45%] h-[70%]' },
];

export const HeroBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !layerRefs.current.length) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      
      // 1. Mouse Interaction Parallax (quickTo for performance)
      const xSetters = PARALLAX_LAYERS.map((_, i) => gsap.quickTo(layerRefs.current[i], "x", { duration: 0.8, ease: "power3.out" }));
      const ySetters = PARALLAX_LAYERS.map((_, i) => gsap.quickTo(layerRefs.current[i], "y", { duration: 0.8, ease: "power3.out" }));

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 500; // Normalized X offset
        const y = (e.clientY / window.innerHeight - 0.5) * 500; // Normalized Y offset

        PARALLAX_LAYERS.forEach((layer, i) => {
          if (layerRefs.current[i]) {
            xSetters[i](x * layer.depthXY);
            ySetters[i](y * layer.depthXY);
          }
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // 2. Scroll Parallax (Depth translation + Sketch Transition)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      PARALLAX_LAYERS.forEach((layer, i) => {
        if (layerRefs.current[i]) {
          // Vertical parallax based on scroll
          tl.to(layerRefs.current[i], {
            y: `+=${window.innerHeight * layer.depthYScroll}`,
            ease: "none"
          }, 0); // All start at time 0
          
          // Sketch transition for all layers combined
          tl.to(layerRefs.current[i], {
             filter: "contrast(200%) grayscale(100%) brightness(200%)",
             opacity: 0.1,
             ease: "none",
          }, 0);
        }
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-[120vh]"
    >
      <div className="relative w-full h-full"> {/* Removed flex-center from root layer container so alignment works */}
        {PARALLAX_LAYERS.map((layer, index) => (
          <div
            key={layer.id}
            ref={(el) => { layerRefs.current[index] = el; }}
            className={`absolute will-change-transform ${layer.alignment || 'inset-0 flex items-center justify-center'}`}
            style={{ 
              zIndex: layer.zIndex,
              opacity: layer.opacity
            }}
          >
            <div 
              className="relative w-full h-full"
              style={{ 
                transform: `scale(${layer.scale})`,
                mixBlendMode: (layer as any).mixBlend || 'normal'
              }}
            >
              <Image 
                src={layer.src} 
                alt={`Parallax Layer ${index}`} 
                fill 
                priority={index === 0}
                className={`${layer.objectFit === 'cover' ? 'object-cover' : 'object-contain'} ${(layer as any).imageClassName || ''}`}
              />
            </div>
          </div>
        ))}
        {/* Subtle overlay for depth integration bridging the layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80 z-[30]" />
      </div>
    </div>
  );
};
