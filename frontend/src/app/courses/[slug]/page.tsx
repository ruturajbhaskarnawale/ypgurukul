"use client";

import React, { useEffect, useState, use } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, SlideUp } from '@/components/animations/MotionUtils';
import { apiClient } from '@/lib/apiClient';
import Link from 'next/link';
import { SectionBackground } from '@/components/home/SectionBackground';
import Image from 'next/image';
import { useTheme } from 'next-themes';

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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && resolvedTheme === 'light';
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
      <div className={`min-h-screen flex items-center justify-center ${isLight ? 'bg-[#fcfcfc]' : 'bg-[#050505]'}`}>
        <span className={`font-script text-4xl animate-pulse ${isLight ? 'text-slate-400' : 'text-white/50'}`}>retrieving syllabus...</span>
      </div>
    );
  }

  // Parse JSON fields safely
  let subjectsList: string[] = [];
  try { if (course?.subjects) subjectsList = JSON.parse(course.subjects); } catch (e) {}
  
  let timingsObj: Record<string, string> = {};
  try { if (course?.batchTimings) timingsObj = JSON.parse(course.batchTimings); } catch (e) {}

  return (
    <div className={`min-h-screen pb-32 relative overflow-hidden transition-colors duration-700 ${isLight ? 'bg-white text-slate-900 selection:bg-primary/20' : 'bg-[#050505] text-white selection:bg-primary/30'}`}>
      
      {/* Dynamic Immersive Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {isLight ? (
          <>
            <SectionBackground src="/images/backgrounds/light_cinematic_ambient_bg.png" alt="Light Backdrop" className="opacity-60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/90" />
          </>
        ) : (
          <>
            <SectionBackground src="/images/backgrounds/BG-3.png" alt="Dark Backdrop" className="opacity-30 grayscale-[0.3]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-90" />
          </>
        )}
      </div>

      <div className="relative z-10">
        {/* Course Header — Cinematic Style */}
        <section className={`pt-48 pb-32 border-b relative ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
          <div className="max-w-[1800px] mx-auto px-12">
            <FadeIn>
              <div className="flex flex-col items-start leading-[0.85]">
                <Link href="/courses" className={`text-[10px] font-bold uppercase tracking-[0.5em] transition-all mb-12 block group ${isLight ? 'text-slate-400 hover:text-slate-900' : 'text-white/40 hover:text-white'}`}>
                  <span className="inline-block group-hover:-translate-x-2 transition-transform">←</span> [ archival index ]
                </Link>
                <div className="flex flex-col md:flex-row gap-20 items-end w-full">
                  <div className="flex-1">
                    <span className={`font-script text-4xl lowercase mb-8 block ${isLight ? 'text-slate-400' : 'text-white/40'}`}>course_manifest</span>
                    <h1 className={`text-6xl md:text-[8rem] font-black uppercase tracking-tighter-editorial mb-12 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {course?.title.split(' ').map((word, i) => (
                        <React.Fragment key={i}>
                          {i === 2 ? <br /> : null}
                          <span className={`${isLight ? (i % 2 !== 0 ? 'text-slate-400' : '') : (i % 2 !== 0 ? 'text-white/30' : '')}`}>{word}</span>{' '}
                        </React.Fragment>
                      ))}
                    </h1>
                  </div>
                  {/* Hero Course Image Preview */}
                  <div className={`w-full md:w-96 aspect-square rounded-[3rem] overflow-hidden border relative group shadow-2xl ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                     {course?.previewImage && (
                       <Image 
                         src={course.previewImage} 
                         alt={course.title} 
                         fill 
                         className={`object-cover group-hover:scale-110 transition-transform duration-1000 ${isLight ? 'grayscale-[0.3] group-hover:grayscale-0' : 'grayscale-[0.5] group-hover:grayscale-0'}`} 
                       />
                     )}
                     <div className={`absolute inset-0 bg-gradient-to-t to-transparent ${isLight ? 'from-black/20 opacity-40' : 'from-black/80 opacity-60'}`} />
                  </div>
                </div>

                <div className={`grid md:grid-cols-3 gap-12 w-full pt-16 border-t mt-20 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
                   <div className={`flex flex-col group/stat border-l pl-8 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
                     <span className={`text-[10px] font-bold uppercase tracking-[0.4em] mb-2 italic ${isLight ? 'text-slate-300' : 'text-white/20'}`}>Classification</span>
                     <span className={`text-2xl font-black group-hover:translate-x-2 transition-transform duration-500 ${isLight ? 'text-slate-900' : 'text-white'}`}>{course?.category}</span>
                   </div>
                   <div className={`flex flex-col group/stat border-l pl-8 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
                     <span className={`text-[10px] font-bold uppercase tracking-[0.4em] mb-2 italic ${isLight ? 'text-slate-300' : 'text-white/20'}`}>Temporal_Span</span>
                     <span className={`text-2xl font-black group-hover:translate-x-2 transition-transform duration-500 ${isLight ? 'text-slate-900' : 'text-white'}`}>{course?.duration}</span>
                   </div>
                   <div className={`flex flex-col group/stat border-l pl-8 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
                     <span className={`text-[10px] font-bold uppercase tracking-[0.4em] mb-2 italic ${isLight ? 'text-slate-300' : 'text-white/20'}`}>Institutional_Investment</span>
                     <span className={`text-2xl font-black group-hover:translate-x-2 transition-transform duration-500 ${isLight ? 'text-slate-900' : 'text-white'}`}>{course?.feeStructure || 'N/A'}</span>
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
                  <div className={`backdrop-blur-3xl border p-16 rounded-[4rem] shadow-sm ${isLight ? 'bg-slate-50/60 border-slate-200' : 'bg-white/[0.02] border-white/5'}`}>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.4em] mb-12 block ${isLight ? 'text-slate-400' : 'text-white/20'}`}>Program_Methodology</span>
                    <p className={`text-3xl md:text-5xl font-light leading-tight tracking-tight lowercase mb-12 ${isLight ? 'text-slate-900 opacity-90' : 'text-white/90'}`}>
                      {course?.description}
                    </p>
                    <div className={`grid md:grid-cols-2 gap-12 pt-12 border-t ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
                        <div className="space-y-4">
                           <h4 className={`font-bold uppercase tracking-wider text-sm italic ${isLight ? 'text-slate-900' : 'text-white'}`}>Elite Architectural Feedback</h4>
                           <p className={`text-xs leading-relaxed lowercase ${isLight ? 'text-slate-500' : 'text-white/40'}`}>Continuous assessment loops with analytics to identify and patch conceptual gaps in real-time.</p>
                        </div>
                        <div className="space-y-4">
                           <h4 className={`font-bold uppercase tracking-wider text-sm italic ${isLight ? 'text-slate-900' : 'text-white'}`}>Immersive Simulation</h4>
                           <p className={`text-xs leading-relaxed lowercase ${isLight ? 'text-slate-500' : 'text-white/40'}`}>Rigorous mock environments that mirror actual exam conditions, training both speed and stamina.</p>
                        </div>
                    </div>
                  </div>
                </FadeIn>

                {subjectsList.length > 0 && (
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.4em] mb-12 block ${isLight ? 'text-slate-400' : 'text-white/20'}`}>Curriculum_Architecture</span>
                    <StaggerContainer className="grid md:grid-cols-2 gap-8">
                      {subjectsList.map((item, i) => (
                        <StaggerItem key={i}>
                          <div className={`border backdrop-blur-3xl group transition-all duration-700 rounded-[3rem] overflow-hidden relative shadow-sm hover:shadow-xl p-10 ${isLight ? 'bg-white/40 border-slate-200 hover:bg-white' : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03]'}`}>
                             <div className={`absolute top-0 right-0 p-8 text-[8px] font-bold uppercase tracking-[0.5em] ${isLight ? 'text-slate-200' : 'text-white/5'}`}>Module_0{i+1}</div>
                             <div className="flex flex-col">
                                <span className={`text-2xl font-black uppercase tracking-tighter mb-4 transition-transform duration-500 group-hover:translate-x-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>{item}</span>
                                <p className={`text-[10px] lowercase tracking-widest ${isLight ? 'text-slate-400' : 'text-white/30'}`}>Scientific approach to precision mastery.</p>
                             </div>
                             <div className={`h-px w-0 transition-all duration-1000 ease-in-out mt-10 group-hover:w-full ${isLight ? 'bg-slate-900/10' : 'bg-white/20'}`} />
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                )}

                {/* Success Metrics */}
                <div className={`pt-24 border-t ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
                   <SlideUp>
                      <div className="grid md:grid-cols-3 gap-12">
                         <div className="text-center">
                            <span className={`text-7xl font-black block mb-4 uppercase tracking-tighter ${isLight ? 'text-slate-100' : 'text-white/10'}`}>98.2%</span>
                            <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${isLight ? 'text-slate-400' : 'text-white/40'}`}>Success_Rate</span>
                         </div>
                         <div className="text-center">
                            <span className={`text-7xl font-black block mb-4 uppercase tracking-tighter ${isLight ? 'text-slate-100' : 'text-white/10'}`}>12:1</span>
                            <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${isLight ? 'text-slate-400' : 'text-white/40'}`}>Mentor_Ratio</span>
                         </div>
                         <div className="text-center">
                            <span className={`text-7xl font-black block mb-4 uppercase tracking-tighter ${isLight ? 'text-slate-100' : 'text-white/10'}`}>5K+</span>
                            <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${isLight ? 'text-slate-400' : 'text-white/40'}`}>Archived_Alumni</span>
                         </div>
                      </div>
                   </SlideUp>
                </div>
              </div>

              {/* Sidebar — Schedule & Enrollment */}
              <div className="lg:col-span-4">
                <div className="sticky top-48 space-y-12">
                  <FadeIn>
                     <div className={`border backdrop-blur-3xl rounded-[4rem] relative overflow-hidden group/side shadow-2xl p-12 ${isLight ? 'bg-white/60 border-slate-200' : 'bg-white/[0.02] border-white/5'}`}>
                        <div className={`absolute -bottom-24 -right-24 w-64 h-64 blur-[100px] rounded-full transition-colors duration-1000 ${isLight ? 'bg-slate-100 group-hover/side:bg-slate-200' : 'bg-white/5 group-hover/side:bg-white/10'}`} />
                        
                        <span className={`text-[10px] font-bold uppercase tracking-[0.4em] mb-8 block ${isLight ? 'text-slate-400' : 'text-white/20'}`}>Operational_Windows</span>
                        
                        <div className={`divide-y ${isLight ? 'divide-slate-100' : 'divide-white/5'}`}>
                          {Object.entries(timingsObj).map(([batch, time], i) => (
                            <div key={i} className="py-8 flex justify-between items-center group/item hover:pl-2 transition-all duration-500">
                               <div className="flex flex-col">
                                  <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${isLight ? 'text-slate-400 group-hover/item:text-slate-900' : 'text-white/40 group-hover/item:text-white'}`}>{batch}</span>
                                  <span className={`text-[8px] uppercase tracking-tighter mt-1 ${isLight ? 'text-slate-300' : 'text-white/10'}`}>active_session</span>
                               </div>
                               <span className={`text-sm font-black text-right ${isLight ? 'text-slate-900' : 'text-white'}`}>{time as string}</span>
                            </div>
                          ))}
                        </div>

                        <div className={`pt-12 mt-12 border-t space-y-6 relative z-10 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
                          <Link href="/contact" className="block w-full">
                            <button className={`w-full py-8 font-black uppercase tracking-[0.5em] text-[10px] hover:scale-105 transition-all duration-500 rounded-full shadow-lg ${isLight ? 'bg-slate-900 text-white shadow-slate-900/20' : 'bg-white text-black shadow-white/5'}`}>
                              Initiate Admission
                            </button>
                          </Link>
                          <button className={`w-full py-6 text-[10px] font-bold uppercase tracking-[0.5em] transition-all border rounded-full ${isLight ? 'text-slate-400 hover:text-slate-900 border-slate-200 hover:bg-slate-50' : 'text-white/30 hover:text-white border-white/5 hover:bg-white/5'}`}>
                             Download Brochure
                          </button>
                        </div>

                        <div className={`absolute bottom-4 right-12 opacity-5 text-4xl font-black italic tracking-tighter ${isLight ? 'text-slate-900' : 'text-white'}`}>YP_G</div>
                     </div>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                     <div className={`p-12 border rounded-[3rem] ${isLight ? 'border-slate-200 bg-slate-50/40' : 'border-white/5 bg-white/[0.01]'}`}>
                        <p className={`text-[9px] font-bold uppercase tracking-[0.3em] leading-relaxed italic ${isLight ? 'text-slate-400' : 'text-white/20'}`}>
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
