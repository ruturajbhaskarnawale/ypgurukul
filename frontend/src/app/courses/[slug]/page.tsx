"use client";

import React, { useEffect, useState, use } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, SlideUp } from '@/components/animations/MotionUtils';
import { apiClient } from '@/lib/apiClient';
import Link from 'next/link';
import { SectionBackground } from '@/components/home/SectionBackground';
import Image from 'next/image';

interface CourseDetail {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  duration: string;
  feeStructure: string | null;
  subjects: string | null;     // JSON string
  batchTimings: string | null; // JSON string
  previewImage?: string;
}

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courses = await apiClient.get<CourseDetail[]>('/public/courses');
        const found = courses.find((c) => c.slug === slug);
        
        if (found) {
          setCourse(found);
        } else {
          setError('ARCHIVAL RECORD NOT FOUND');
        }
      } catch {
        setError('OFFLINE MODE — SHOWING ARCHIVAL DATA');
        
        // Match mock image to slug
        const mockImages: Record<string, string> = {
          'mht-cet-guide': '/images/backgrounds/mht_cet_guide_cinematic_1773085224064.png',
          'nda-math': '/images/backgrounds/nda_math_intensive_cinematic_1773085240254.png',
          'boards-elite': '/images/backgrounds/boards_prep_elite_cinematic_1773085257290.png',
          'scholarship-master': '/images/backgrounds/scholarship_masterclass_cinematic_1773085273898.png',
          'neet-super-30': '/images/backgrounds/neet_super_30_cinematic_1773085290079.png',
        };

        setCourse({
          id: 'mock',
          title: slug.split('-').map(w => w.toUpperCase()).join(' '),
          slug: slug,
          category: slug === 'neet-super-30' ? 'Premium' : slug === 'nda-math' ? 'Defense' : 'Academic Elite',
          description: 'This program is engineered for candidates who demand absolute precision in their academic trajectory. We combine rigorous testing, daily practice papers (DPPs), and one-on-one architectural mentoring to ensure mastery of core concepts and competitive edge.',
          duration: slug === 'mht-cet-guide' ? '6 Months' : '1 Year',
          feeStructure: slug === 'neet-super-30' ? '₹85,000 P.A.' : '₹45,000 P.A.',
          subjects: JSON.stringify(["Advanced Theory Mastery", "Quantitative Logic & Strategy", "Conceptual Architectural Maps", "Simulation-Based Drills"]),
          batchTimings: JSON.stringify({ "Morning Alpha": "8:00 AM - 12:00 PM", "Evening Delta": "4:00 PM - 8:00 PM", "Weekend Omega": "9:00 AM - 3:00 PM" }),
          previewImage: mockImages[slug] || '/images/backgrounds/BG-3.png'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <span className="font-script text-4xl animate-pulse text-muted-foreground/40">retrieving syllabus...</span>
      </div>
    );
  }

  // Parse JSON fields safely
  let subjectsList: string[] = [];
  try { if (course?.subjects) subjectsList = JSON.parse(course.subjects); } catch (e) {}
  
  let timingsObj: Record<string, string> = {};
  try { if (course?.batchTimings) timingsObj = JSON.parse(course.batchTimings); } catch (e) {}

  return (
    <div className="min-h-screen pb-32 relative overflow-hidden bg-background text-foreground selection:bg-primary/20">
      
      {/* Dynamic Immersive Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SectionBackground src="/images/backgrounds/light_cinematic_ambient_bg.png" alt="Light Backdrop" className="opacity-40 mix-blend-multiply grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      <div className="relative z-10">
        {/* Course Header — Cinematic Style */}
        <section className="pt-48 pb-32 border-b border-border relative">
          <div className="max-w-[1800px] mx-auto px-12">
            <FadeIn>
              <div className="flex flex-col items-start leading-[0.85]">
                <Link href="/courses" className="text-[10px] font-black uppercase tracking-[0.5em] transition-all mb-12 block group text-muted-foreground/40 hover:text-foreground">
                  <span className="inline-block group-hover:-translate-x-2 transition-transform">←</span> [ archival index ]
                </Link>
                <div className="flex flex-col md:flex-row gap-20 items-end w-full">
                  <div className="flex-1">
                    <span className="font-script text-4xl lowercase mb-8 block text-muted-foreground/40">course_manifest</span>
                    <h1 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter-editorial mb-12 text-foreground">
                      {course?.title.split(' ').map((word, i) => (
                        <React.Fragment key={i}>
                          {i === 2 ? <br /> : null}
                          <span className={i % 2 !== 0 ? 'text-muted-foreground/30' : ''}>{word}</span>{' '}
                        </React.Fragment>
                      ))}
                    </h1>
                  </div>
                  {/* Hero Course Image Preview */}
                  <div className="w-full md:w-96 aspect-square rounded-[3rem] overflow-hidden border border-border relative group shadow-2xl bg-secondary">
                     {course?.previewImage && (
                       <Image 
                         src={course.previewImage} 
                         alt={course.title} 
                         fill 
                         className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0" 
                       />
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40" />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-12 w-full pt-16 border-t border-border mt-20">
                   <div className="flex flex-col group/stat border-l border-border pl-8">
                     <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2 italic text-muted-foreground/30">Classification</span>
                     <span className="text-2xl font-black group-hover:translate-x-2 transition-transform duration-500 text-foreground">{course?.category}</span>
                   </div>
                   <div className="flex flex-col group/stat border-l border-border pl-8">
                     <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2 italic text-muted-foreground/30">Temporal_Span</span>
                     <span className="text-2xl font-black group-hover:translate-x-2 transition-transform duration-500 text-foreground">{course?.duration}</span>
                   </div>
                   <div className="flex flex-col group/stat border-l border-border pl-8">
                     <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2 italic text-muted-foreground/30">Institutional_Investment</span>
                     <span className="text-2xl font-black group-hover:translate-x-2 transition-transform duration-500 text-foreground">{course?.feeStructure || 'N/A'}</span>
                   </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Deep Dive Content — Multi-Section Layout */}
        <section className="py-40">
          <div className="max-w-[1800px] mx-auto px-12">
            <div className="grid lg:grid-cols-12 gap-24">
              
              {/* Primary Content (Overview & Modules) */}
              <div className="lg:col-span-8 space-y-48">
                <FadeIn>
                  <div className="backdrop-blur-3xl border border-border p-16 rounded-[4rem] shadow-sm bg-secondary/20">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 block text-muted-foreground/40">Program_Methodology</span>
                    <p className="text-3xl md:text-5xl font-light leading-tight tracking-tight lowercase mb-12 text-foreground/90">
                      {course?.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-border">
                        <div className="space-y-4">
                           <h4 className="font-black uppercase tracking-wider text-sm italic text-foreground">Elite Architectural Feedback</h4>
                           <p className="text-xs leading-relaxed lowercase text-muted-foreground/60">Continuous assessment loops with analytics to identify and patch conceptual gaps in real-time.</p>
                        </div>
                        <div className="space-y-4">
                           <h4 className="font-black uppercase tracking-wider text-sm italic text-foreground">Immersive Simulation</h4>
                           <p className="text-xs leading-relaxed lowercase text-muted-foreground/60">Rigorous mock environments that mirror actual exam conditions, training both speed and stamina.</p>
                        </div>
                    </div>
                  </div>
                </FadeIn>

                {subjectsList.length > 0 && (
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 block text-muted-foreground/40">Curriculum_Architecture</span>
                    <StaggerContainer className="grid md:grid-cols-2 gap-8">
                      {subjectsList.map((item, i) => (
                        <StaggerItem key={i}>
                          <div className="border border-border backdrop-blur-3xl group transition-all duration-700 rounded-[3rem] overflow-hidden relative shadow-sm hover:shadow-xl p-10 bg-background/40 hover:bg-background">
                             <div className="absolute top-0 right-0 p-8 text-[8px] font-black uppercase tracking-[0.5em] text-muted-foreground/10">Module_0{i+1}</div>
                             <div className="flex flex-col">
                                <span className="text-2xl font-black uppercase tracking-tighter mb-4 transition-transform duration-500 group-hover:translate-x-2 text-foreground">{item}</span>
                                <p className="text-[10px] lowercase tracking-widest text-muted-foreground/40">Scientific approach to precision mastery.</p>
                             </div>
                             <div className="h-px w-0 transition-all duration-1000 ease-in-out mt-10 group-hover:w-full bg-primary/20" />
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                )}

                {/* Success Metrics */}
                <div className="pt-24 border-t border-border">
                   <SlideUp>
                      <div className="grid md:grid-cols-3 gap-12">
                         <div className="text-center">
                            <span className="text-7xl font-black block mb-4 uppercase tracking-tighter text-muted-foreground/10">98.2%</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Success_Rate</span>
                         </div>
                         <div className="text-center">
                            <span className="text-7xl font-black block mb-4 uppercase tracking-tighter text-muted-foreground/10">12:1</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Mentor_Ratio</span>
                         </div>
                         <div className="text-center">
                            <span className="text-7xl font-black block mb-4 uppercase tracking-tighter text-muted-foreground/10">5K+</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Archived_Alumni</span>
                         </div>
                      </div>
                   </SlideUp>
                </div>
              </div>

              {/* Sidebar — Schedule & Enrollment */}
              <div className="lg:col-span-4">
                <div className="sticky top-48 space-y-12">
                  <FadeIn>
                     <div className="border border-border backdrop-blur-3xl rounded-[4rem] relative overflow-hidden group/side shadow-2xl p-12 bg-background/60">
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 blur-[100px] rounded-full transition-colors duration-1000 bg-secondary group-hover/side:bg-muted" />
                        
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 block text-muted-foreground/20">Operational_Windows</span>
                        
                        <div className="divide-y divide-border">
                          {Object.entries(timingsObj).map(([batch, time], i) => (
                            <div key={i} className="py-8 flex justify-between items-center group/item hover:pl-2 transition-all duration-500">
                               <div className="flex flex-col">
                                  <span className="text-xs font-black uppercase tracking-widest transition-colors text-muted-foreground group-hover/item:text-foreground">{batch}</span>
                                  <span className="text-[8px] font-black uppercase tracking-tighter mt-1 text-muted-foreground/20">active_session</span>
                               </div>
                               <span className="text-sm font-black text-right text-foreground">{time as string}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-12 mt-12 border-t border-border space-y-6 relative z-10">
                          <Link href="/contact" className="block w-full">
                            <button className="w-full py-8 font-black uppercase tracking-[0.5em] text-[10px] hover:scale-105 transition-all duration-500 rounded-full shadow-lg bg-primary text-primary-foreground shadow-primary/20">
                              Initiate Admission
                            </button>
                          </Link>
                          <button className="w-full py-6 text-[10px] font-black uppercase tracking-[0.5em] transition-all border border-border rounded-full text-muted-foreground/40 hover:text-foreground hover:bg-secondary">
                             Download Brochure
                          </button>
                        </div>

                        <div className="absolute bottom-4 right-12 opacity-5 text-4xl font-black italic tracking-tighter text-foreground">YP_G</div>
                     </div>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                     <div className="p-12 border border-border rounded-[3rem] bg-secondary/20">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] leading-relaxed italic text-muted-foreground/40">
                          "Institutional excellence is not an act, but a measurable standard of academic engineering."
                        </p>
                     </div>
                  </FadeIn>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
