"use client";

import React, { useEffect, useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import { apiClient } from '@/lib/apiClient';
import Link from 'next/link';
import { CourseGlobe } from '@/components/courses/CourseGlobe';
import { useTheme } from 'next-themes';
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
          { id: '1', title: 'MHT-CET COMPLETE GUIDE', slug: 'mht-cet-guide', category: 'State Board', description: 'Comprehensive manual for MHT-CET preparation focusing on Physics, Chemistry, and Mathematics.', duration: '6 Months', feeStructure: '₹15,000', previewImage: '/images/backgrounds/mht_cet_guide_cinematic_1773085224064.png' },
          { id: '2', title: 'NDA MATHEMATICS INTENSIVE', slug: 'nda-math', category: 'Defense', description: 'Intensive coaching for NDA entrance with a focus on higher mathematics and logic.', duration: '1 Year', feeStructure: '₹25,000/YR', previewImage: '/images/backgrounds/nda_math_intensive_cinematic_1773085240254.png' },
          { id: '3', title: 'BOARDS PREP ELITE', slug: 'boards-elite', category: 'Board Prep', description: 'Specialized batch for 10th and 12th board exams ensuring high percentage results.', duration: '1 Year', feeStructure: '₹20,000/YR', previewImage: '/images/backgrounds/boards_prep_elite_cinematic_1773085257290.png' },
          { id: '4', title: 'SCHOLARSHIP MASTERCLASS', slug: 'scholarship-master', category: 'Scholarship', description: 'Preparation for various competitive scholarship exams including NTSE and Olympiads.', duration: '4 Months', feeStructure: '₹8,000', previewImage: '/images/backgrounds/scholarship_masterclass_cinematic_1773085273898.png' },
          { id: '5', title: 'NEET SUPER 30', slug: 'neet-super-30', category: 'Premium', description: 'Targeted medical entrance preparation with daily doubt sessions and AI analytics.', duration: '1 Year', feeStructure: '₹60,000/YR', previewImage: '/images/backgrounds/neet_super_30_cinematic_1773085290079.png' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))];
  const filtered = activeCategory === 'All' ? courses : courses.filter((c) => c.category === activeCategory);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && resolvedTheme === 'light';

  return (
    <div className={`relative min-h-screen h-screen overflow-hidden flex flex-col transition-colors duration-700 ${isLight ? 'bg-[#fcfcfc] selection:bg-primary/20' : 'bg-[#050505] selection:bg-primary/30'}`}>
      
      {/* Dynamic Immersive Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {isLight ? (
          <>
            <SectionBackground src="/images/backgrounds/light_cinematic_ambient_bg.png" alt="Light Atmosphere" className="opacity-80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/80" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          </>
        ) : (
          <>
            <SectionBackground src="/images/backgrounds/BG-3.png" alt="Dark Universe" className="opacity-40 grayscale-[0.2]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
          </>
        )}
      </div>

      {/* Minimal Floating Header */}
      <header className="fixed top-0 inset-x-0 pt-16 pb-8 z-40 flex flex-col items-center pointer-events-none">
        <FadeIn>
          <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter-editorial leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Gurukul <span className="opacity-20 italic">Universe</span>
          </h1>
        </FadeIn>
      </header>

      {/* Floating Filter Bar */}
      <nav className="fixed top-36 inset-x-0 z-40 pointer-events-none">
        <div className={`max-w-fit mx-auto px-6 py-3 backdrop-blur-2xl border rounded-full pointer-events-auto shadow-xl transition-all duration-700 ${isLight ? 'bg-white/60 border-slate-200' : 'bg-muted/40 border-border shadow-2xl'}`}>
          <div className="flex gap-10 items-center">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`text-[9px] font-bold uppercase tracking-[0.4em] transition-all relative py-1 ${
                  activeCategory === cat ? (isLight ? 'text-slate-900' : 'text-foreground') : (isLight ? 'text-slate-400 hover:text-slate-900' : 'text-muted-foreground hover:text-foreground')
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <div className="absolute -bottom-1 left-1.2 right-1.2 h-[2px] bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero 3D Section - Full Screen */}
      <main className="flex-1 w-full relative z-10 transition-all duration-1000">
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
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm transition-all duration-300 ${isLight ? 'bg-slate-900/10' : 'bg-black/40'}`}>
          <FadeIn className="max-w-4xl w-full">
            <div className={`relative backdrop-blur-3xl border rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-[0_40px_100px_rgba(0,0,0,0.1)] transition-all duration-700 ${isLight ? 'bg-white/80 border-slate-200' : 'bg-background/60 border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]'}`}>
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCourse(null)}
                className={`absolute top-8 right-8 w-12 h-12 rounded-full border flex items-center justify-center transition-colors z-10 ${isLight ? 'bg-slate-900/5 border-slate-900/10 hover:bg-slate-900/10' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
              >
                <div className={`w-4 h-[2px] rotate-45 absolute ${isLight ? 'bg-slate-900' : 'bg-white'}`} />
                <div className={`w-4 h-[2px] -rotate-45 absolute ${isLight ? 'bg-slate-900' : 'bg-white'}`} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                {selectedCourse.previewImage && (
                  <img 
                    src={selectedCourse.previewImage} 
                    alt={selectedCourse.title}
                    className={`w-full h-full object-cover ${isLight ? 'grayscale-[0.2]' : ''}`}
                  />
                )}
                <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r to-transparent ${isLight ? 'from-white/90' : 'from-background/80'}`} />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary mb-4">
                  {selectedCourse.category}
                </span>
                <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tighter-editorial mb-6 leading-none ${isLight ? 'text-slate-900' : 'text-foreground'}`}>
                  {selectedCourse.title}
                </h2>
                <p className={`text-sm md:text-base mb-10 leading-relaxed font-medium transition-colors ${isLight ? 'text-slate-600' : 'text-muted-foreground opacity-80'}`}>
                  {selectedCourse.description}
                </p>
                
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div>
                    <span className={`block text-[8px] uppercase tracking-widest mb-1 ${isLight ? 'text-slate-400' : 'text-muted-foreground'}`}>Duration</span>
                    <span className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-foreground'}`}>{selectedCourse.duration}</span>
                  </div>
                  <div>
                    <span className={`block text-[8px] uppercase tracking-widest mb-1 ${isLight ? 'text-slate-400' : 'text-muted-foreground'}`}>Investment</span>
                    <span className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-foreground'}`}>{selectedCourse.feeStructure}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                   <Link href={`/courses/${selectedCourse.slug}`} className="flex-1">
                    <button className={`w-full py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl ${isLight ? 'bg-slate-900 text-white shadow-slate-900/10' : 'bg-primary text-primary-foreground shadow-primary/20'}`}>
                      Explore Blueprint
                    </button>
                  </Link>
                  <button className={`px-10 py-5 border rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isLight ? 'border-slate-200 hover:bg-slate-50 text-slate-900' : 'border-foreground/10 bg-foreground/5 hover:bg-foreground/10 text-foreground'}`}>
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
