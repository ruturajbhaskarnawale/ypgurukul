"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryItems = [
  {
    title: "Smart Classroom",
    image: "/images/gallery/smart_classroom.png",
    size: "large", // spans 2x2
  },
  {
    title: "Tech Lab",
    image: "/images/gallery/tech_lab.png",
    size: "medium", // spans 2x1
  },
  {
    title: "Library",
    image: "/images/gallery/library.png",
    size: "small",
  },
  {
    title: "Doubt Desk",
    image: "/images/gallery/doubt_desk.png",
    size: "medium",
  },
  {
    title: "Wall of Fame",
    image: "/images/gallery/wall_of_fame.png",
    size: "small",
  }
];

export const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll('.gallery-item');
    
    gsap.fromTo(items, 
      { 
        y: 100, 
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-background border-b border-border overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-12">
        <div className="flex flex-col items-center mb-32">
          <span className="font-script text-4xl text-muted-foreground lowercase mb-6">explore</span>
          <h2 className="text-fluid-title font-black uppercase tracking-tighter-editorial text-center leading-[0.85]">
            Our <br /> <span className="text-foreground/30">Infrastructure</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[800px]">
          {/* Smart Classroom - Large (Top Left) */}
          <div className="gallery-item md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl border border-border">
            <Image 
              src="/images/gallery/smart_classroom.png"
              alt="Smart Classroom"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Smart Classroom</h3>
            </div>
          </div>

          {/* Tech Lab - Medium (Top Right) */}
          <div className="gallery-item md:col-span-2 relative h-[300px] md:h-auto group overflow-hidden rounded-3xl border border-border">
            <Image 
              src="/images/gallery/tech_lab.png"
              alt="Tech Lab"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Tech Lab</h3>
            </div>
          </div>

          {/* Library - Small (Bottom Right 1) */}
          <div className="gallery-item relative h-[300px] md:h-auto group overflow-hidden rounded-3xl border border-border">
            <Image 
              src="/images/gallery/library.png"
              alt="Library"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-lg font-black text-white uppercase tracking-tighter">Library</h3>
            </div>
          </div>

          {/* Doubt Desk - Small (Bottom Right 2) */}
          <div className="gallery-item relative h-[300px] md:h-auto group overflow-hidden rounded-3xl border border-border">
            <Image 
              src="/images/gallery/doubt_desk.png"
              alt="Doubt Desk"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-lg font-black text-white uppercase tracking-tighter">Doubt Desk</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
