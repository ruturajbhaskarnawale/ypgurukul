"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SectionBackground } from './SectionBackground';

interface FacultyMember {
  name: string;
  subject: string;
  exp: string;
  image: string;
  speed: number;
}

const faculty: FacultyMember[] = [
  { name: "Dr. A. Verma", subject: "Physics", exp: "15+ Years Exp", image: "/images/faculty/verma.png", speed: 0.9 },
  { name: "Mr. R. Sharma", subject: "Mathematics", exp: "Ex-IIT Delhi", image: "/images/faculty/sharma.png", speed: 1.1 },
  { name: "Dr. S. Patil", subject: "Chemistry", exp: "Author & Mentor", image: "/images/faculty/patil.png", speed: 0.8 },
  { name: "Ms. K. Iyer", subject: "Biology", exp: "10+ Years Exp", image: "/images/faculty/iyer.png", speed: 1.2 },
];

const FacultyCard = ({ member, index }: { member: FacultyMember, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const xTo = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = ((x - centerX) / centerX) * 10;
      const rotateX = ((centerY - y) / centerY) * 10;
      
      xTo(rotateY);
      yTo(rotateX);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    // Portrait parallax scroll
    gsap.to(portraitRef.current, {
      y: (member.speed - 1) * 150,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [member.speed]);

  return (
    <div 
      ref={cardRef}
      className="faculty-card group relative flex flex-col items-start cursor-pointer will-change-transform bg-secondary/50 backdrop-blur-2xl border border-border rounded-[2.5rem] p-6 overflow-hidden"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="h-[480px] w-full relative mb-10 rounded-3xl border border-border overflow-hidden shadow-2xl bg-muted" style={{ transform: 'translateZ(30px)' }}>
        <div ref={portraitRef} className="absolute inset-x-0 w-full h-[120%] -top-[10%] will-change-transform">
          <Image 
            src={member.image} 
            alt={member.name} 
            fill 
            className="object-cover grayscale transition-all duration-1000 ease-expo scale-105 group-hover:scale-100"
          />
        </div>
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
        <div className="absolute inset-0 border border-border/50 group-hover:border-border transition-colors duration-700 rounded-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 w-full px-4" style={{ transform: 'translateZ(50px)' }}>
        <span className="text-[10px] font-black px-5 py-2.5 bg-foreground text-background uppercase tracking-[0.25em] rounded-full inline-block shadow-xl mb-6">
          {member.subject}
        </span>
        <h3 className="text-4xl font-black text-foreground mb-3 uppercase tracking-tighter hover:text-foreground transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-sm font-medium text-muted-foreground lowercase tracking-widest leading-relaxed mb-8">
          {member.exp}
        </p>
        
        <div className="h-px w-12 bg-border group-hover:w-full transition-all duration-700 ease-expo" />
      </div>

      {/* Background Accent Glow */}
      {/* Background Accent Glow Removed for strict B&W */}
    </div>
  );
};

export const MentorshipScene = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Cinematic Title Reveal
      gsap.from(".mentorship-title", {
        y: 80,
        opacity: 0,
        duration: 2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      });

      // Card Staggered Rise
      gsap.from(".faculty-card", {
        y: 150,
        opacity: 0,
        stagger: 0.15,
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-64 border-b border-border overflow-hidden min-h-screen"
    >
      {/* Background Texture for Editorial Depth */}
      <SectionBackground 
        src="/images/backgrounds/BG-G.png" 
        alt="Texture" 
        className="opacity-40 grayscale mix-blend-multiply transition-opacity duration-1000"
      />

      {/* Top Transition Gradient - Enhanced Visibility */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-background via-background/80 to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 max-w-[1800px] mx-auto px-12">
        <div className="mentorship-title flex flex-col items-center mb-56">
          <span className="font-script text-5xl text-muted-foreground lowercase mb-8 tracking-wider">the mentorship</span>
          <h2 className="text-8xl md:text-[11rem] font-black uppercase tracking-tighter-editorial text-center leading-[0.8] text-foreground">
            Master <br /> <span className="text-foreground/10 outline-text">Faculty</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {faculty.map((member, i) => (
            <FacultyCard key={i} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
