"use client";

import React, { useEffect, useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import { apiClient } from '@/lib/apiClient';
import Link from 'next/link';
import { CourseGlobe } from '@/components/courses/CourseGlobe';
import { SectionBackground } from '@/components/home/SectionBackground';

interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  duration: string;
  feeStructure: string | null;
  previewImage?: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await apiClient.get<Course[]>('/public/courses');
        setCourses(data);
      } catch {
        setError('ARCHIVAL DATA MODE');
        setCourses([
          { id: '1', title: 'MHT-CET COMPLETE GUIDE', slug: 'mht-cet-guide', category: 'State Board', description: 'Comprehensive manual for MHT-CET preparation focusing on Physics, Chemistry, and Mathematics.', duration: '6 Months', feeStructure: '₹15,000', previewImage: '/images/courses/mht_cet_guide_cinematic_1773085224064.png' },
          { id: '2', title: 'NDA MATHEMATICS INTENSIVE', slug: 'nda-math', category: 'Defense', description: 'Intensive coaching for NDA entrance with a focus on higher mathematics and logic.', duration: '1 Year', feeStructure: '₹25,000/YR', previewImage: '/images/courses/nda_math_intensive_cinematic_1773085240254.png' },
          { id: '3', title: 'BOARDS PREP ELITE', slug: 'boards-elite', category: 'Board Prep', description: 'Specialized batch for 10th and 12th board exams ensuring high percentage results.', duration: '1 Year', feeStructure: '₹20,000/YR', previewImage: '/images/courses/boards_prep_elite_cinematic_1773085257290.png' },
          { id: '4', title: 'SCHOLARSHIP MASTERCLASS', slug: 'scholarship-master', category: 'Scholarship', description: 'Preparation for various competitive scholarship exams including NTSE and Olympiads.', duration: '4 Months', feeStructure: '₹8,000', previewImage: '/images/courses/scholarship_masterclass_cinematic_1773085273898.png' },
          { id: '5', title: 'NEET SUPER 30', slug: 'neet-super-30', category: 'Premium', description: 'Targeted medical entrance preparation with daily doubt sessions and AI analytics.', duration: '1 Year', feeStructure: '₹60,000/YR', previewImage: '/images/courses/neet_super_30_cinematic_1773085290079.png' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))];
  const filtered = activeCategory === 'All' ? courses : courses.filter((c) => c.category === activeCategory);

  return (
    <div className="relative min-h-screen h-screen overflow-hidden flex flex-col bg-background selection:bg-primary/20">
      
      {/* Dynamic Immersive Background - Refined B&W */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SectionBackground src="/images/backgrounds/light_cinematic_ambient_bg.png" alt="Light Atmosphere" className="opacity-40 mix-blend-multiply grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      {/* Minimal Floating Header */}
      <header className="fixed top-0 inset-x-0 pt-8 md:pt-16 pb-4 md:pb-8 z-40 flex flex-col items-center pointer-events-none">
        <FadeIn>
          <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tighter-editorial leading-none text-foreground">
            Gurukul <span className="opacity-10 italic">Universe</span>
          </h1>
        </FadeIn>
      </header>

      {/* Floating Filter Bar */}
      <nav className="fixed top-28 md:top-36 inset-x-0 z-40">
        <div className="max-w-[90vw] md:max-fit mx-auto overflow-x-auto no-scrollbar backdrop-blur-2xl border border-border rounded-full pointer-events-auto shadow-xl bg-background/60">
          <div className="flex gap-6 md:gap-10 items-center px-6 md:px-8 py-3 md:py-4 min-w-max">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`text-[9px] font-black uppercase tracking-[0.4em] transition-all relative py-1 ${
                  activeCategory === cat ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero 3D Section - Full Screen */}
      <main className="flex-1 w-full relative z-10">
        <CourseGlobe 
          courses={filtered} 
          onSelect={(id) => {
            const course = courses.find(c => c.id === id);
            if (course) setSelectedCourse(course);
          }} 
        />
      </main>

      {/* Course Detail Pop-up Overlay */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-md bg-background/40 overflow-y-auto">
          <FadeIn className="max-w-4xl w-full my-auto">
            <div className="relative backdrop-blur-3xl border border-border rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl bg-background/90">
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full border border-border bg-background/20 flex items-center justify-center hover:bg-background transition-colors z-20"
              >
                <div className="w-3 md:w-4 h-[2px] rotate-45 absolute bg-foreground" />
                <div className="w-3 md:w-4 h-[2px] -rotate-45 absolute bg-foreground" />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-secondary">
                {selectedCourse.previewImage && (
                  <img 
                    src={selectedCourse.previewImage} 
                    alt={selectedCourse.title}
                    className="w-full h-full object-cover grayscale opacity-80"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background via-background/20 to-transparent" />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/60 mb-3 md:mb-4">
                  {selectedCourse.category}
                </span>
                <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter-editorial mb-4 md:mb-6 leading-none text-foreground">
                  {selectedCourse.title}
                </h2>
                <p className="text-xs md:text-base mb-8 md:mb-10 leading-relaxed font-bold lowercase text-muted-foreground">
                  {selectedCourse.description}
                </p>
                
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div>
                    <span className="block text-[8px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Duration</span>
                    <span className="text-sm font-black uppercase text-foreground">{selectedCourse.duration}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Investment</span>
                    <span className="text-sm font-black uppercase text-foreground">{selectedCourse.feeStructure}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                   <Link href={`/courses/${selectedCourse.slug}`} className="flex-1">
                    <button className="w-full py-5 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl">
                      Explore Blueprint
                    </button>
                  </Link>
                  <button className="px-10 py-5 border border-border rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:bg-secondary">
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      )}

    </div>
  );
}
