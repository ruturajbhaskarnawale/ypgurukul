"use client";

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Scene } from './SceneContainer';
import { TestSeriesPreview } from './TestSeriesPreview';
import { WhyChooseUs } from './WhyChooseUs';
import { useCountUp } from '@/lib/hooks/useCountUp';
import { SectionBackground } from './SectionBackground';

const StatItem = ({ label, value, trigger }: { label: string, value: string, trigger: boolean }) => {
  const numericValue = parseInt(value, 10);
  const suffix = value.replace(numericValue.toString(), "");
  const count = useCountUp(numericValue, 2.5, suffix, trigger);
  
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elRef.current) return;
    const xTo = gsap.quickTo(elRef.current, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(elRef.current, "y", { duration: 0.6, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = elRef.current!.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      
      const dist = Math.sqrt(relX * relX + relY * relY);
      if (dist < 150) {
         xTo(relX * 0.2);
         yTo(relY * 0.2);
      } else {
         xTo(0);
         yTo(0);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={elRef} className="stat-item flex flex-col items-center opacity-0 translate-y-[50px] scale-90 will-change-transform z-20 pointer-events-auto">
      <span className="text-[12vw] md:text-[8vw] font-black tracking-tighter-editorial text-foreground leading-none mb-4 drop-shadow-md select-none">{count}</span>
      <span className="text-sm md:text-xl font-bold text-muted-foreground/60 uppercase tracking-[0.3em]">{label}</span>
    </div>
  );
};

export const FoundationScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const rafId = requestAnimationFrame(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=300%",
              scrub: 1.5,
              pin: true,
              anticipatePin: 1,
            }
          });

          // Background Parallax Layering
          tl.to(".section-bg-parallax", { y: -100, ease: "none", duration: 4 }, 0);

          tl.fromTo(".stat-item", 
            { opacity: 0, y: 50, scale: 0.9 },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              stagger: 0.1, 
              duration: 1,
              onStart: () => setStatsActive(true)
            },
            0 // Starts at timeline 0
          );
          
          tl.to({}, { duration: 0.5 });
          tl.to(".stat-item", { opacity: 0, y: -50, stagger: 0.05, duration: 0.5 });

          tl.fromTo(".why-choose-content",
            { opacity: 0, scale: 1.1 },
            { opacity: 1, scale: 1, duration: 1 }
          );
          tl.to({}, { duration: 0.5 });

          tl.to(".why-choose-content", { opacity: 0, x: -50, duration: 0.5 });
          
          // Test Series container fade in
          tl.fromTo(".test-series-content",
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }
          );
          // Test Series 3D cards stagger in
          tl.fromTo(".test-series-card",
            { opacity: 0, y: 150, rotateX: 30 },
            { opacity: 1, y: 0, rotateX: 0, stagger: 0.15, duration: 1, ease: "power3.out" },
            "<0.2"
          );

          tl.fromTo(scanLineRef.current,
            { scaleY: 0, opacity: 0 },
            { scaleY: 1, opacity: 1, duration: 0.5, ease: "power4.inOut" },
            0
          );
          tl.to(scanLineRef.current, { xPercent: 100, duration: 4, ease: "none" }, 0);
          tl.to(scanLineRef.current, { opacity: 0, duration: 0.3 });

        }, containerRef);
        return () => ctx.revert();
      });

      // Fallback for reduced motion: show everything static
      mm.add("(prefers-reduced-motion: reduce)", () => {
        setStatsActive(true);
        gsap.set(".stat-item, .why-choose-content, .test-series-content, .test-series-card", { opacity: 1, y: 0, scale: 1, x: 0, rotateX: 0 });
      });

      return () => mm.revert();
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div 
        ref={containerRef} 
        className="relative w-full overflow-hidden text-foreground bg-[#0a0a0a]"
        style={{ contain: 'content' }}
    >
      {/* Background substance (Subtle Texture & Parallax Wrapper) */}
      <div className="absolute inset-x-0 w-full h-[120%] -top-[10%] section-bg-parallax will-change-transform pointer-events-none z-0">
          <SectionBackground src="/images/backgrounds/BG-Y.png" alt="Yellow Textured Background" />
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-foreground/10 z-10" />
      
      {/* SCENE CONTENT WRAPPER */}
      <div className="relative h-screen w-full flex items-center justify-center will-change-transform z-10 pointer-events-none">
        
        {/* 1. STATS LAYER */}
        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-12 pointer-events-none">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 text-center w-full max-w-[1800px] will-change-transform">
            {[
              { label: "Students Taught", value: "10000+" },
              { label: "Selection Rate", value: "95%" },
              { label: "Expert Faculty", value: "50+" },
              { label: "Resource Access", value: "24/7" },
            ].map((stat, i) => (
              <StatItem key={i} label={stat.label} value={stat.value} trigger={statsActive} />
            ))}
          </div>
        </div>

        {/* 2. WHY CHOOSE US LAYER */}
        <div className="why-choose-content absolute inset-0 flex items-center justify-center opacity-0 p-4 md:p-12 pointer-events-none will-change-transform">
           <div className="w-full h-full pointer-events-auto">
                <WhyChooseUs isNested />
           </div>
        </div>

        {/* 3. TEST SERIES LAYER */}
        <div className="test-series-content absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none will-change-transform">
            <div className="w-full h-full pointer-events-auto flex flex-col">
                <TestSeriesPreview isNested />
            </div>
        </div>

        {/* DIGITAL SCAN LINE */}
        <div 
          ref={scanLineRef}
          className="absolute inset-y-0 left-0 w-1 bg-primary/20 blur-[1px] z-50 pointer-events-none origin-top"
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );
};

