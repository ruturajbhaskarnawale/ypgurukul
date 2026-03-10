"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { SectionBackground } from './SectionBackground';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const FacultyPreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const faculty = [
    { name: "Dr. A. Verma", subject: "Physics", exp: "15+ Years Exp", image: "/images/faculty/verma.png", speed: 0.9 },
    { name: "Mr. R. Sharma", subject: "Mathematics", exp: "Ex-IIT Delhi", image: "/images/faculty/sharma.png", speed: 1.1 },
    { name: "Dr. S. Patil", subject: "Chemistry", exp: "Author & Mentor", image: "/images/faculty/patil.png", speed: 0.8 },
    { name: "Ms. K. Iyer", subject: "Biology", exp: "10+ Years Exp", image: "/images/faculty/iyer.png", speed: 1.2 },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = containerRef.current!.querySelectorAll('.faculty-card');
      
      // Staggered entry with Image Wipe
      const entries = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      entries.fromTo(cards, 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 1.2, 
          ease: "power4.out"
        }
      )
      .to(containerRef.current!.querySelectorAll('.image-reveal-wipe'), {
        scaleY: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "power4.inOut",
        transformOrigin: "bottom"
      }, "-=1");

      // Parallax images
      const images = containerRef.current!.querySelectorAll('.parallax-img');
      images.forEach((img, i) => {
        const speed = faculty[i].speed;
        gsap.to(img, {
          y: (speed - 1) * 200,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
       const cards = containerRef.current!.querySelectorAll('.faculty-card');
       gsap.set(cards, { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-48 border-b border-border bg-background overflow-hidden font-sans">
      {/* SectionBackground removed for strict B&W theme */}
      <div className="max-w-[1800px] mx-auto px-12 relative z-10">
          <div className="flex flex-col items-center mb-40">
            <span className="font-script text-4xl text-muted-foreground lowercase mb-6">the</span>
            <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter-editorial text-center leading-[0.85] text-foreground">
              Master <br /> <span className="text-foreground/10">Faculty</span>
            </h2>
          </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((member, idx) => (
            <div key={idx} className="faculty-card group flex flex-col items-start opacity-0 translate-y-[100px] will-change-transform bg-secondary/20 backdrop-blur-2xl border border-border rounded-3xl p-6 relative">
              <div className="h-[450px] bg-muted w-full relative mb-8 border border-border overflow-hidden rounded-2xl group/img">
                <div className="parallax-img w-full h-[120%] absolute top-[-10%] left-0 will-change-transform">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                  />
                </div>
                {/* Reveal Wipe Overlay */}
                <div className="image-reveal-wipe absolute inset-0 bg-secondary z-20 pointer-events-none" />
                
                {/* Visual frame overlay */}
                <div className="absolute inset-0 border-[0px] group-hover/img:border-[1px] border-border/50 transition-all duration-500 rounded-2xl z-30" />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-1000 pointer-events-none z-10" />
              </div>
              
              <div className="relative z-10 w-full p-2">
                <span className="text-[10px] font-bold px-4 py-2 bg-foreground text-background uppercase tracking-[0.2em] mb-4 rounded-full inline-block">
                  {member.subject}
                </span>
                <h3 className="text-3xl font-black text-foreground mb-2 uppercase tracking-tighter mt-2">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-muted-foreground lowercase tracking-wide">
                  {member.exp}
                </p>
                <div className="h-px w-0 bg-border group-hover:w-full transition-all duration-700 ease-in-out mt-8 block" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

