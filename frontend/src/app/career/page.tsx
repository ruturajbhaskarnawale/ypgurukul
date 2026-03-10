"use client";

import React, { useState, useEffect } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, SlideUp } from '@/components/animations/MotionUtils';
import { apiClient } from '@/lib/apiClient';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { SectionBackground } from '@/components/home/SectionBackground';
import Link from 'next/link';

export default function CareerPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && resolvedTheme === 'light';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    position: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [activeJob, setActiveJob] = useState<string | null>(null);

  const openings = [
    { 
      id: "01",
      title: "Senior Physics Faculty", 
      type: "FULL-TIME", 
      location: "MAIN CAMPUS",
      description: "we require a subject matter expert with a proven track record of securing top 100 ranks in jee advanced. focus on conceptual depth and student mentorship."
    },
    { 
      id: "02",
      title: "Academic Counselor", 
      type: "FULL-TIME", 
      location: "YP GURUKUL KNOWLEDGE CITY",
      description: "seeking individuals with professional empathy and deep understanding of student psychology to guide candidates through their academic journey."
    },
    { 
      id: "03",
      title: "Digital Strategy Lead", 
      type: "HYBRID", 
      location: "REMOTE/HYBRID",
      description: "driving the digital narrative of YP Gurukul. expertise in high-intent performance marketing and educational storytelling required."
    },
  ];

  const values = [
    { id: "01", title: "Precision", desc: "Absolute clarity in conceptual dissemination and institutional architecture." },
    { id: "02", title: "Mentorship", desc: "Beyond teaching—shaping the neural maps of future excellence." },
    { id: "03", title: "Innovation", desc: "Synthesizing traditional Gurukul values with bleeding-edge educational tech." }
  ];

  const perks = [
    { title: "Academic Autonomy", desc: "Freedom to design curriculum flows that prioritize depth over speed." },
    { title: "Research Grants", desc: "Funding for pedagogical research and scientific travel." },
    { title: "Wellness Integration", desc: "Focus on mental and physical homeostasis for all educators." },
    { title: "Global Network", desc: "Collaborate with high-impact minds in the international education sector." }
  ];

  const faq = [
    { q: "What is the selection philosophy?", a: "We seek architects of character, not just deliverers of content. Our process multi-stage, involving conceptual deep dives and cultural alignment." },
    { q: "Is relocation support available?", a: "Yes, for our residential roles at YP Gurukul Knowledge City, we provide comprehensive logistical transitions." },
    { q: "Can I apply for multiple roles?", a: "We recommend focusing on the requisition that matches your primary neural core (expertise)." }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openApply = (position: string) => {
    setFormData(prev => ({ ...prev, position }));
    setShowApplyModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      await apiClient.post('/career/apply', {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        mobile: formData.mobile,
        position: formData.position,
        resumeUrl: 'archival_submission'
      });
      setStatus('success');
      setMessage('submission logged. our archives will review your profile.');
      setTimeout(() => setShowApplyModal(false), 2000);
    } catch (err) {
      console.error('Submission failed', err);
      setStatus('error');
      setMessage('submission failure. try again.');
    }
  };

  return (
    <div className="min-h-screen pb-32 transition-colors duration-700 relative overflow-hidden bg-background text-foreground">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {isLight ? (
          <SectionBackground src="/images/backgrounds/light_cinematic_ambient_bg.png" alt="Light Backdrop" className="opacity-40 mix-blend-multiply" />
        ) : (
          <SectionBackground src="/images/backgrounds/BG-3.png" alt="Dark Backdrop" className="opacity-20" />
        )}
      </div>

      <div className="relative z-10">
        {/* Archival Header */}
        <section className="pt-48 pb-32 border-b border-border transition-colors">
          <div className="max-w-[1800px] mx-auto px-12">
            <div className="flex flex-col items-start leading-[0.85]">
              <FadeIn>
                <span className="font-script text-4xl lowercase mb-8 block text-muted-foreground/60">the_career</span>
                <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter-editorial text-foreground">
                  Opportunities <br /> <span className="text-foreground/10">Archive</span>
                </h1>
                <p className="text-xl lowercase mt-12 max-w-xl leading-relaxed text-muted-foreground">
                  a curated index of open roles within the YP Gurukul ecosystem. we are constantly seeking architects of excellence to shape the next era of academic engineering.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Culture & Values — Values Orbit */}
        <section className="py-40 border-b border-border">
           <div className="max-w-[1800px] mx-auto px-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] mb-24 block text-muted-foreground/40">The Archival Standard</span>
              <div className="grid md:grid-cols-3 gap-12">
                 {values.map((v) => (
                   <FadeIn key={v.id}>
                     <div className="p-12 border border-border backdrop-blur-3xl rounded-[3rem] group transition-all duration-700 h-full bg-secondary/20 hover:bg-background">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8 block text-muted-foreground/30">Standard_0{v.id}</span>
                        <h3 className="text-4xl font-black uppercase tracking-tighter mb-6 transition-transform duration-500 group-hover:translate-x-2 text-foreground">{v.title}</h3>
                        <p className="text-sm lowercase tracking-widest leading-relaxed text-muted-foreground">{v.desc}</p>
                     </div>
                   </FadeIn>
                 ))}
              </div>
           </div>
        </section>

        {/* Perks & Benefits Grid */}
        <section className="py-40 border-b border-border">
           <div className="max-w-[1800px] mx-auto px-12">
              <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                 <div className="flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block text-muted-foreground/40">Professional Sovereignty</span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-foreground">Recruitment <br /> Sovereignty</h2>
                 </div>
                 <p className="text-sm lowercase max-w-sm mb-4 italic font-medium lg:text-right text-muted-foreground/60">
                   we provide the environment. you provide the vision. together we curate the future.
                 </p>
              </div>
 
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {perks.map((p, i) => (
                   <SlideUp key={i}>
                      <div className="p-10 border border-border rounded-[2rem] h-full flex flex-col justify-between transition-colors bg-secondary/10 hover:bg-secondary/30">
                         <h4 className="font-black uppercase tracking-tight mb-4 text-foreground">{p.title}</h4>
                         <p className="text-[10px] lowercase tracking-[0.2em] leading-relaxed text-muted-foreground/60">{p.desc}</p>
                      </div>
                   </SlideUp>
                 ))}
              </div>
           </div>
        </section>

        {/* The Job Index */}
        <section className="py-40">
          <div className="max-w-[1800px] mx-auto px-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] mb-12 block text-muted-foreground/40">Active_Requisitions</span>
            <StaggerContainer className="flex flex-col">
              {openings.map((job) => (
                <StaggerItem key={job.id}>
                  <div 
                    className={`
                      group border-b py-16 cursor-pointer transition-all duration-700 border-border
                      ${activeJob === job.id ? 'bg-secondary/50' : 'hover:bg-secondary/20'}
                    `}
                    onClick={() => setActiveJob(activeJob === job.id ? null : job.id)}
                  >
                     <div className="flex justify-between items-center px-4">
                        <div className="flex items-center gap-12">
                           <span className="text-[10px] font-bold font-black uppercase text-foreground/10">{job.id}</span>
                           <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter group-hover:pl-6 transition-all duration-700 text-foreground">
                             {job.title}
                           </h2>
                        </div>
                        <div className="hidden md:flex gap-12 items-center text-[10px] font-bold uppercase tracking-[0.3em] transition-colors text-muted-foreground/60 group-hover:text-foreground">
                           <span>{job.type}</span>
                           <span className="text-foreground/10">|</span>
                           <span>{job.location}</span>
                           <div className="w-12 h-px transition-all duration-700 group-hover:w-24 bg-border group-hover:bg-foreground" />
                        </div>
                     </div>

                     <AnimatePresence>
                       {activeJob === job.id && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                           className="overflow-hidden"
                         >
                           <div className="px-24 py-16 max-w-[900px]">
                              <p className={`text-2xl lowercase leading-relaxed mb-16 font-light ${isLight ? 'text-slate-600' : 'text-white/60'}`}>
                                {job.description}
                              </p>
                              <div className="flex gap-8">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); openApply(job.title); }}
                                  className="px-16 py-8 border text-[10px] font-black uppercase tracking-[0.5em] transition-all duration-700 shadow-xl bg-foreground text-background border-foreground hover:bg-foreground/80"
                                >
                                  Begin Application
                                </button>
                                <button className="px-12 py-8 border text-[10px] font-bold uppercase tracking-[0.5em] transition-all duration-700 border-border text-muted-foreground/60 hover:text-foreground hover:bg-secondary/20">
                                   Full Role Specs
                                </button>
                              </div>
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="mt-32 p-20 text-center border rounded-[4rem] transition-colors border-border bg-secondary/10">
               <FadeIn>
                 <span className="text-[10px] font-bold uppercase tracking-[0.5em] mb-6 block text-foreground/10">General Submission</span>
                 <p className="text-2xl lowercase max-w-xl mx-auto mb-12 font-light text-muted-foreground/60">
                   don't see a fitting requisition? we welcome unsolicited archival submissions from visionary minds who demand impact.
                 </p>
                 <button 
                   onClick={() => openApply('General Submission')}
                   className="text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:underline underline-offset-8 text-foreground"
                 >
                   [ enter the general archive ]
                 </button>
               </FadeIn>
            </div>
          </div>
        </section>

        {/* Archival FAQ */}
        <section className="py-40 bg-transparent">
           <div className="max-w-[1800px] mx-auto px-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] mb-24 block text-muted-foreground/40">Clarification_Engine (FAQ)</span>
              <div className="grid md:grid-cols-2 gap-24">
                 {faq.map((item, i) => (
                   <FadeIn key={i}>
                      <div className="space-y-6 pb-12 border-b border-border">
                         <h4 className="text-lg font-black uppercase tracking-tight text-foreground">{item.q}</h4>
                         <p className="text-sm lowercase tracking-widest leading-relaxed text-muted-foreground">{item.a}</p>
                      </div>
                   </FadeIn>
                 ))}
              </div>
           </div>
        </section>
      </div>

      {/* Focus Mode Application UI — Theme Adapted */}
      <AnimatePresence>
        {showApplyModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] backdrop-blur-xl flex items-center justify-center p-6 md:p-12 overflow-y-auto bg-background/95"
          >
            <div className="max-w-2xl w-full py-12">
              <FadeIn>
                <div className="flex justify-between items-start mb-24">
                   <div className="flex flex-col">
                      <span className="font-script text-4xl lowercase mb-4 text-muted-foreground/40">applying for</span>
                      <h2 className="text-4xl font-black uppercase tracking-tighter text-foreground">{formData.position}</h2>
                   </div>
                   <button 
                     onClick={() => setShowApplyModal(false)}
                     className="text-[10px] font-bold uppercase tracking-[0.4em] p-4 transition-colors text-muted-foreground/40 hover:text-foreground"
                   >
                     [ close ]
                   </button>
                </div>

                {status === 'success' ? (
                  <div className="text-center py-24">
                    <span className={`font-script text-6xl block mb-8 animate-pulse ${isLight ? 'text-slate-900' : 'text-white'}`}>accepted</span>
                    <p className={`text-xs font-bold uppercase tracking-[0.5em] ${isLight ? 'text-slate-400' : 'text-white/40'}`}>{message}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="grid grid-cols-2 gap-12">
                       <div className="flex flex-col group">
                          <label className="text-[9px] font-bold uppercase tracking-[0.4em] transition-colors mb-4 italic text-muted-foreground/30 group-focus-within:text-foreground">01. First_Name</label>
                          <input 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="bg-transparent border-b py-4 font-black uppercase tracking-tighter focus:outline-none transition-all text-xl border-border focus:border-foreground text-foreground"
                            placeholder="..."
                          />
                       </div>
                       <div className="flex flex-col group">
                          <label className="text-[9px] font-bold uppercase tracking-[0.4em] transition-colors mb-4 italic text-muted-foreground/30 group-focus-within:text-foreground">02. Last_Name</label>
                          <input 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="bg-transparent border-b py-4 font-black uppercase tracking-tighter focus:outline-none transition-all text-xl border-border focus:border-foreground text-foreground"
                            placeholder="..."
                          />
                       </div>
                    </div>
 
                    <div className="flex flex-col group">
                       <label className="text-[9px] font-bold uppercase tracking-[0.4em] transition-colors mb-4 italic text-muted-foreground/30 group-focus-within:text-foreground">03. Electronic_Mail</label>
                       <input 
                         type="email"
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                         required
                         className="bg-transparent border-b py-4 font-black uppercase tracking-tighter focus:outline-none transition-all text-xl border-border focus:border-foreground text-foreground"
                         placeholder="ARCHIVAL_ID@MAIL.COM"
                       />
                    </div>
 
                    <div className="flex flex-col group">
                       <label className="text-[9px] font-bold uppercase tracking-[0.4em] transition-colors mb-4 italic text-muted-foreground/30 group-focus-within:text-foreground">04. Neural_Contact (Mobile)</label>
                       <input 
                         type="tel"
                         name="mobile"
                         value={formData.mobile}
                         onChange={handleChange}
                         required
                         className="bg-transparent border-b py-4 font-black uppercase tracking-tighter focus:outline-none transition-all text-xl border-border focus:border-foreground text-foreground"
                         placeholder="+00 (0) 000 000"
                       />
                    </div>
 
                    <div className="pt-12">
                       <button 
                         type="submit"
                         disabled={status === 'loading'}
                         className="w-full py-8 font-black uppercase tracking-[0.8em] text-[10px] transition-all shadow-2xl bg-foreground text-background hover:bg-foreground/80 shadow-foreground/5"
                       >
                         {status === 'loading' ? 'SUBMITTING...' : 'LOG APPLICATION'}
                       </button>
                       <p className="text-center text-[8px] font-bold uppercase tracking-[0.3em] mt-8 text-foreground/10">
                         all submissions are filtered through the archival integrity engine.
                       </p>
                    </div>
                  </form>
                )}
              </FadeIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
