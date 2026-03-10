"use client";

import React, { useState, useEffect } from 'react';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { SectionBackground } from '@/components/home/SectionBackground';

export default function AboutPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && resolvedTheme === 'light';

  const stats = [
    { num: "500+", label: "JEE SELECTIONS" },
    { num: "850+", label: "NEET QUALIFIERS" },
    { num: "15+", label: "YEARS HERITAGE" },
    { num: "01", label: "MISSION: EXCELLENCE" }
  ];

  const methodology = [
    { id: "01", title: "Conceptual Architecture", desc: "We build knowledge from the first principles, ensuring that the foundation of every student is structurally sound." },
    { id: "02", title: "Synthesized Learning", desc: "Merging traditional rigorous methodologies with modern analytics to track and patch neural gaps." },
    { id: "03", title: "Simulated Pressure", desc: "Training the mind to perform under extreme cognitive load through simulated high-stakes environments." }
  ];

  const milestones = [
    { year: "2010", event: "Foundation of YP Gurukul with a single cohort of 12 visionary students." },
    { year: "2015", event: "Expansion to the Main Campus; Recorded first Top 100 Rank in JEE Advanced." },
    { year: "2019", event: "Launch of YP Gurukul Knowledge City—a sustainable, high-tech academic forest." },
    { year: "2024", event: "Achieved the milestone of 5,000 alumni positioned in premier global institutions." }
  ];

  const leadership = [
    { name: "YASH PRAKASH", role: "FOUNDER & MD", bio: "Visionary educator with a decade of engineering success stories. Dedicated to crafting the next generation of academic architects." },
    { name: "DR. A. VERMA", role: "ACADEMIC DIRECTOR", bio: "Pioneer in physics pedagogy. Focuses on the intersection of theoretical depth and competitive execution." },
    { name: "R. SHARMA", role: "STRATEGY HEAD", bio: "Ex-IIT Delhi scholar. Orchestrates the institutional trajectory toward global educational standards." }
  ];

  return (
    <div className={`min-h-screen pb-32 transition-colors duration-700 relative overflow-hidden ${isLight ? 'bg-white text-slate-900' : 'bg-[#050505] text-white'}`}>
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {isLight ? (
          <SectionBackground src="/images/backgrounds/light_cinematic_ambient_bg.png" alt="Light Backdrop" className="opacity-40 mix-blend-multiply" />
        ) : (
          <SectionBackground src="/images/backgrounds/BG-3.png" alt="Dark Backdrop" className="opacity-20" />
        )}
      </div>

      <div className="relative z-10">
        {/* Editorial Header */}
        <section className="pt-32 md:pt-48 pb-16 md:pb-32 border-b border-border transition-colors">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12">
            <div className="flex flex-col items-start leading-[0.85]">
              <FadeIn>
                <span className="font-script text-3xl md:text-4xl lowercase mb-6 md:mb-8 block text-muted-foreground/60">the_heritage</span>
                <h1 className="text-fluid-hero font-black uppercase tracking-tighter-editorial text-foreground">
                  Heritage <br /> <span className="text-foreground/10">& Vision</span>
                </h1>
                <p className="text-xl lowercase mt-12 max-w-xl leading-relaxed text-muted-foreground">
                  a decade of academic precision. we don't just teach—we engineer the future of elite education through uncompromising institutional standards.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Narrative Section - Bento Story Tiles */}
        <section className="py-16 md:py-32 border-b border-border">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
               <FadeIn>
                 <div className="space-y-12">
                   <span className="text-[10px] font-bold uppercase tracking-[0.4em] block text-muted-foreground/40">The Archival Philosophy</span>
                   <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-foreground">
                     Igniting <br /> <span className="text-foreground/10">The Deep Spark</span>
                   </h2>
                   <p className="text-xl lowercase leading-relaxed max-w-md text-muted-foreground">
                     at yp gurukul, education is treated as an art of refinement. we strip away the noise of rote learning to reveal the core of conceptual mastery.
                   </p>
                   <div className="h-px w-24 bg-border" />
                 </div>
               </FadeIn>
 
               <div className="grid grid-cols-2 gap-6">
                  <SlideUp className="aspect-[3/4] border border-border flex items-center justify-center p-8 group overflow-hidden rounded-[2rem] transition-colors bg-secondary/10 hover:bg-background">
                     <div className="text-center group-hover:scale-110 transition-transform duration-700">
                        <span className="text-6xl font-black mb-4 block text-foreground/5">01</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">Precision</span>
                     </div>
                  </SlideUp>
                  <SlideUp delay={0.1} className="aspect-[3/4] border border-border flex items-center justify-center p-8 mt-12 group overflow-hidden rounded-[2rem] transition-colors bg-secondary/20 hover:bg-background">
                     <div className="text-center group-hover:scale-110 transition-transform duration-700">
                        <span className="text-6xl font-black mb-4 block text-foreground/5">02</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">Integrity</span>
                     </div>
                  </SlideUp>
               </div>
            </div>
          </div>
        </section>

        {/* The Architectural Blueprint (Methodology) */}
        <section className="py-20 md:py-40 border-b border-border">
           <div className="max-w-[1800px] mx-auto px-6 md:px-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] mb-12 md:mb-24 block text-muted-foreground/40">The Architectural Blueprint</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:grid-cols-3 gap-12">
                 {methodology.map((m) => (
                   <FadeIn key={m.id}>
                      <div className="p-12 border border-border backdrop-blur-3xl rounded-[3rem] group transition-all duration-700 h-full bg-secondary/10 hover:bg-background">
                         <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8 block text-foreground/10">Concept_0{m.id}</span>
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-6 transition-transform duration-500 group-hover:translate-x-2 text-foreground">{m.title}</h3>
                         <p className="text-sm lowercase tracking-widest leading-relaxed text-muted-foreground">{m.desc}</p>
                      </div>
                   </FadeIn>
                 ))}
              </div>
           </div>
        </section>

        {/* Founder's Message - Cinematic Break */}
        <section className="py-24 md:py-48 relative overflow-hidden transition-colors bg-secondary/10">
           <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center relative z-10">
              <FadeIn>
                 <span className="font-script text-3xl md:text-4xl lowercase mb-8 md:mb-12 block text-muted-foreground/30">from the_founder</span>
                 <blockquote className="text-2xl md:text-6xl font-medium leading-tight tracking-tight lowercase text-foreground">
                   "education is not the learning of facts, but the training of the mind to think. we engineer the environment where elite minds are forged for global impact."
                 </blockquote>
                 <div className="mt-16 flex flex-col items-center">
                    <div className="w-12 h-px mb-8 bg-border" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground">Yash Prakash</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] mt-2 text-muted-foreground">Institutional Architect</span>
                 </div>
              </FadeIn>
           </div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-black pointer-events-none select-none uppercase tracking-tighter text-foreground/[0.01]">
             Vision
           </div>
        </section>

        {/* Temporal Index (Milestones) */}
        <section className="py-20 md:py-40 border-y border-border bg-background">
           <div className="max-w-[1800px] mx-auto px-6 md:px-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] mb-12 md:mb-24 block text-muted-foreground/40">The Temporal Index (Milestones)</span>
              <div className="space-y-12">
                 {milestones.map((m, i) => (
                   <SlideUp key={i} delay={i * 0.1}>
                      <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-start pb-12 border-b border-border group transition-all duration-700 hover:pl-4 hover:bg-secondary/10">
                         <span className="text-5xl font-black tracking-tighter transition-colors text-foreground/10 group-hover:text-foreground">{m.year}</span>
                         <p className="text-xl md:text-2xl font-light lowercase transition-colors max-w-3xl text-muted-foreground group-hover:text-foreground">
                           {m.event}
                         </p>
                      </div>
                   </SlideUp>
                 ))}
              </div>
           </div>
        </section>

        {/* Legacy Stats Grid */}
        <section className="py-20 md:py-40 border-b border-border">
           <div className="max-w-[1800px] mx-auto px-6 md:px-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] mb-12 md:mb-24 block text-muted-foreground/40">Measurable Outcomes</span>
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-24 text-center">
                 {stats.map((stat, i) => (
                   <StaggerItem key={i}>
                      <div className="flex flex-col items-center group">
                         <span className="text-6xl md:text-8xl font-black tracking-tighter-editorial mb-4 transition-transform duration-500 group-hover:scale-110 text-foreground">{stat.num}</span>
                         <span className="text-[10px] font-bold uppercase tracking-[0.4em] transition-colors text-muted-foreground group-hover:text-foreground">{stat.label}</span>
                         <div className="h-px w-0 transition-all duration-700 mt-6 group-hover:w-16 bg-border group-hover:bg-foreground" />
                      </div>
                   </StaggerItem>
                 ))}
              </StaggerContainer>
           </div>
        </section>

        {/* Elite Leadership — Multi-Scale Layout */}
        <section className="py-24 md:py-48">
           <div className="max-w-[1800px] mx-auto px-6 md:px-12">
              <div className="flex flex-col items-start mb-16 md:mb-32">
                 <span className="font-script text-3xl md:text-4xl lowercase mb-4 md:mb-6 text-muted-foreground/40">the_elite</span>
                 <h2 className="text-fluid-title font-black uppercase tracking-tighter-editorial leading-[0.8] text-foreground">
                   Institutional <br /> <span className="text-foreground/10">Architects</span>
                 </h2>
              </div>
    
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {leadership.map((person, i) => (
                   <StaggerItem key={i}>
                      <div className="group border border-border p-12 transition-all duration-700 relative overflow-hidden rounded-[3rem] h-full bg-secondary/10 hover:bg-background">
                         <div className="absolute top-0 right-0 p-10 font-black text-6xl transition-colors text-foreground/[0.02] group-hover:text-foreground/[0.05]">0{i+1}</div>
                         <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-12 block transition-colors text-muted-foreground group-hover:text-foreground">{person.role}</span>
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-6 leading-none text-foreground">{person.name}</h3>
                         <p className="text-base font-light lowercase leading-relaxed tracking-wide transition-colors text-muted-foreground group-hover:text-foreground">
                           {person.bio}
                         </p>
                         <div className="h-px w-0 transition-all duration-1000 ease-in-out mt-12 group-hover:w-full bg-border" />
                      </div>
                   </StaggerItem>
                 ))}
              </StaggerContainer>
           </div>
        </section>
      </div>

    </div>
  );
}
