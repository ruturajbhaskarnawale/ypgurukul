"use client";

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/home/HeroSection';
import { QuickInquiry } from '@/components/home/QuickInquiry';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import Image from 'next/image';
import { SectionThemeController } from '@/components/home/SectionThemeController';


// Redesigned Components
import { TestSeriesPreview } from '@/components/home/TestSeriesPreview';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { MentorshipScene } from '@/components/home/MentorshipScene';
import { SuccessStories } from '@/components/home/SuccessStories';
import { SceneContainer, Scene } from '@/components/home/SceneContainer';
import { FoundationScene } from '@/components/home/FoundationScene';

// GSAP Imports
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { TornPaperDivider } from '@/components/home/TornPaperDivider';
import { SectionBackground } from '@/components/home/SectionBackground';

export default function Home() {
  const programRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 3D Fan-in for Program Cards
        if (programRef.current) {
          const cards = programRef.current.querySelectorAll('.program-card-3d');
          gsap.set(cards, { rotateY: 45, opacity: 0, x: 50 });

          ScrollTrigger.batch(cards, {
            onEnter: (batch) => {
              gsap.to(batch, {
                rotateY: 0,
                opacity: 1,
                x: 0,
                stagger: 0.15,
                duration: 1.2,
                ease: "power3.out",
                overwrite: true
              });
            },
            start: "top 85%",
          });
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
         // Fallback: static visibility
         if (programRef.current) {
           const cards = programRef.current.querySelectorAll('.program-card-3d');
           gsap.set(cards, { rotateY: 0, opacity: 1, x: 0 });
         }
      });

      return () => mm.revert();
    }
  }, []);

  return (
    <SceneContainer>

      {/* SCENE 0: THE NEXUS (HERO) */}
      <Scene id="nexus">
        <HeroSection />
      </Scene>
      
      {/* SECTION DIVIDER: Hero (Dark fading) -> Foundation (Golden) */}
      <div className="relative z-30 w-full translate-y-2 pointer-events-none">
        <TornPaperDivider fill="#f9fafb" invertY={true} />
      </div>

      {/* SCENE 1: FOUNDATION (STATS, WHY CHOOSE US, TEST SERIES) */}
      <div id="foundation" className="relative z-10 -mt-10 bg-background">
        <FoundationScene />
      </div>

      {/* SCENE 2: THE PATH (PROGRAMS) */}
      <Scene id="path">
        <section className="relative py-48 border-b border-border overflow-hidden min-h-screen bg-background">
          
          {/* Subtle line grid overlay like the reference site */}
          <div className="absolute inset-0 bg-[url('/images/backgrounds/Line_Grid.svg')] bg-[length:100px_100px] opacity-10 pointer-events-none" />
          <div className="max-w-[1800px] mx-auto px-12" ref={programRef}>
             <FadeIn>
               <div className="flex flex-col items-center mb-40">
                 <span className="font-script text-4xl text-muted-foreground lowercase mb-6">the</span>
                 <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter-editorial text-center leading-[0.85] text-foreground">
                   Popular <br /> <span className="text-foreground/10">Programs</span>
                 </h2>
               </div>
             </FadeIn>

             <div className="grid md:grid-cols-3 gap-8" style={{ perspective: '2000px' }}>
               {[
                 { 
                   title: "Class 11 Science Batches", 
                   tag: "Foundation", 
                   desc: "Comprehensive 2-year classroom program building strong foundation.",
                   img: "/images/programs/foundation.png"
                 },
                 { 
                   title: "Target Batch", 
                   tag: "Premium", 
                   desc: "Intensive 1-year droppers batch focusing on problem-solving.",
                   img: "/images/programs/target.png"
                 },
                 { 
                   title: "Weekend Test Series", 
                   tag: "Specialized", 
                   desc: "All-India test series with detailed performance analytics.",
                   img: "/images/programs/test_series.png"
                 }
               ].map((program, i) => (
                 <div key={i} className="program-card-3d group flex flex-col items-start cursor-pointer origin-left will-change-transform bg-secondary/20 border border-border rounded-3xl p-6 overflow-hidden relative">
                   <div className="h-[400px] bg-muted w-full relative mb-8 rounded-2xl border border-border overflow-hidden">
                     <Image 
                       src={program.img} 
                       alt={program.title} 
                       fill 
                       className="object-cover group-hover:scale-110 transition-transform duration-700 blur-[2px] group-hover:blur-none opacity-60 group-hover:opacity-100"
                     />
                     <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                   </div>
                   <div className="relative z-10 p-2">
                     <span className="text-[10px] font-bold px-4 py-2 bg-foreground text-background uppercase tracking-[0.2em] mb-6 rounded-full inline-block">{program.tag}</span>
                     <h3 className="text-4xl font-black text-foreground mb-4 uppercase tracking-tighter">{program.title}</h3>
                     <p className="text-sm font-medium text-muted-foreground lowercase tracking-wide max-w-sm mb-8">{program.desc}</p>
                     <div className="h-px w-12 bg-border group-hover:w-full transition-all duration-500" />
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Cinematic Exit Gradient */}
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        </section>
      </Scene>


      {/* SCENE 3: MENTORSHIP (FACULTY & TESTIMONIALS) */}
      <Scene id="mentorship">
        <MentorshipScene />
      </Scene>

      {/* SCENE 4: LEGACY (SUCCESS STORIES, GALLERY, INQUIRY) */}
      <Scene id="legacy">
        <SuccessStories />
        <QuickInquiry />
      </Scene>
    </SceneContainer>
  );
}
