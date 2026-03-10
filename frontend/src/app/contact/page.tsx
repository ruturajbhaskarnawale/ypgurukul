"use client";

import React, { useState } from 'react';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import { apiClient, ApiError } from '@/lib/apiClient';
import { SectionBackground } from '@/components/home/SectionBackground';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setSubmitting(true);
    try {
      await apiClient.post('/public/inquiries', formData);
      setSuccessMsg('INQUIRY LOGGED. OUR ARCHIVES WILL REVIEW YOUR REQUEST.');
      setFormData({ name: '', email: '', mobile: '', message: '' });
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('TRANSMISSION FAILURE. TRY AGAIN.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const locations = [
    {
      id: "HUB_01",
      name: "MAIN CAMPUS",
      address: "123 EDUCATION LANE, KNOWLEDGE CITY, IN 400001",
      type: "HEADQUARTERS"
    },
    {
      id: "HUB_02",
      name: "WEST WING",
      address: "456 SCHOLAR SQUARE, BANDRA KURLA COMPLEX, IN 400051",
      type: "LEARNING CENTER"
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen pb-32 relative overflow-hidden">
      {/* Cinematic Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SectionBackground 
          src="/images/backgrounds/Rectangle_240657548.jpg" 
          alt="Inquiry Background" 
          className="opacity-40 grayscale-[0.2]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10">
        {/* Terminal Header */}
        <section className="pt-48 pb-32 border-b border-white/5">
        <div className="max-w-[1800px] mx-auto px-12">
          <div className="flex flex-col items-start leading-[0.85]">
            <FadeIn>
              <span className="font-script text-4xl text-muted-foreground lowercase mb-8 block">the</span>
              <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter-editorial text-foreground">
                Inquiry <br /> <span className="text-foreground/20">Terminal</span>
              </h1>
              <p className="text-xl text-muted-foreground lowercase mt-12 max-w-xl leading-relaxed">
                open a direct channel with the YP Gurukul mission. we prioritize precision in institutional communication.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-[1800px] mx-auto px-12">
          <div className="grid lg:grid-cols-12 gap-24">
            
            {/* The Terminal Form */}
            <div className="lg:col-span-8">
              <FadeIn>
                <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-12 md:p-16 overflow-hidden relative group/form">
                  {/* Subtle Glow Accent */}
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none group-hover/form:bg-white/10 transition-colors duration-1000" />
                  
                  <div className="mb-24 relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-8 block">Transmission Form</span>
                    {successMsg && (
                      <div className="p-8 border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-[0.5em] text-white animate-pulse mb-8 rounded-xl backdrop-blur-sm">
                        {successMsg}
                      </div>
                    )}
                    {errorMsg && (
                      <div className="p-8 border border-red-500/20 bg-red-500/5 text-xs font-bold uppercase tracking-[0.5em] text-red-400 mb-8 rounded-xl backdrop-blur-sm">
                        {errorMsg}
                      </div>
                    )}
                  </div>
  
                  <form onSubmit={handleSubmit} className="space-y-16 relative z-10">
                     <div className="grid md:grid-cols-2 gap-16">
                        <div className="flex flex-col group">
                           <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30 group-focus-within:text-white transition-colors mb-4 italic">01. Identity_Name</label>
                           <input 
                             name="name"
                             value={formData.name}
                             onChange={handleChange}
                             required
                             className="bg-transparent border-b border-white/10 py-4 text-white font-black uppercase tracking-tighter focus:outline-none focus:border-white transition-all text-2xl placeholder:text-white/5"
                             placeholder="..."
                           />
                        </div>
                        <div className="flex flex-col group">
                           <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30 group-focus-within:text-white transition-colors mb-4 italic">02. Electronic_Channel</label>
                           <input 
                             type="email"
                             name="email"
                             value={formData.email}
                             onChange={handleChange}
                             required
                             className="bg-transparent border-b border-white/10 py-4 text-white font-black uppercase tracking-tighter focus:outline-none focus:border-white transition-all text-2xl placeholder:text-white/5"
                             placeholder="COMM@MAIL.TER"
                           />
                        </div>
                     </div>
  
                     <div className="flex flex-col group">
                        <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30 group-focus-within:text-white transition-colors mb-4 italic">03. Neural_Mobile</label>
                        <input 
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          className="bg-transparent border-b border-white/10 py-4 text-white font-black uppercase tracking-tighter focus:outline-none focus:border-white transition-all text-2xl placeholder:text-white/5"
                          placeholder="+00 (0) 000 000"
                        />
                     </div>
  
                     <div className="flex flex-col group">
                        <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30 group-focus-within:text-white transition-colors mb-4 italic">04. Inquiry_Payload</label>
                        <textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="bg-transparent border-b border-white/10 py-4 text-white font-black uppercase tracking-tighter focus:outline-none focus:border-white transition-all text-2xl resize-none placeholder:text-white/5"
                          placeholder="DESCRIBE_REQUISITION..."
                        />
                     </div>
  
                      <div className="pt-8 text-center md:text-left">
                         <button 
                           type="submit"
                           disabled={submitting}
                           className="w-full md:w-auto px-24 py-8 bg-white text-black font-black uppercase tracking-[0.8em] text-[10px] hover:bg-white/90 transition-all hover:scale-105 active:scale-95 rounded-full"
                         >
                           {submitting ? 'TRANSMITTING...' : 'LOG INQUIRY'}
                         </button>
                      </div>
                   </form>
                </div>
              </FadeIn>
            </div>
 
            {/* Sidebar Locations */}
            <div className="lg:col-span-4 lg:pl-12">
               <div className="sticky top-48 space-y-24">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/30 mb-12 block">Physical Hubs</span>
                    <StaggerContainer className="space-y-8">
                      {locations.map((loc) => (
                        <StaggerItem key={loc.id}>
                          <div className="p-8 border border-white/5 bg-white/[0.02] backdrop-blur-3xl group hover:bg-white/[0.05] transition-all duration-700 rounded-2xl">
                             <div className="flex justify-between items-start mb-6">
                                <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-[0.3em] italic">{loc.id}</span>
                                <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-[0.2em]">{loc.type}</span>
                             </div>
                             <h3 className="text-xl font-black text-foreground uppercase tracking-tighter mb-4">{loc.name}</h3>
                             <p className="text-xs font-medium text-muted-foreground lowercase leading-relaxed tracking-wide group-hover:text-foreground/60 transition-colors">
                               {loc.address}
                             </p>
                             <div className="h-px w-0 bg-foreground group-hover:w-full transition-all duration-700 ease-in-out mt-8" />
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
 
                  <div className="pt-12 border-t border-border">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/30 mb-8 block">Rapid Channels</span>
                    <div className="space-y-4">
                       <a href="mailto:contact@ypgurukul.com" className="block text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors">
                         [ contact@ypgurukul.com ]
                       </a>
                       <a href="tel:+911234567890" className="block text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors">
                         [ +91 123 456 7890 ]
                       </a>
                    </div>
                  </div>
               </div>
            </div>
 
          </div>
        </div>
      </section>

       {/* Map Embed Section */}
      <section className="py-24 border-t border-border">
         <div className="max-w-[1800px] mx-auto px-12">
            <FadeIn>
               <div className="aspect-[21/9] w-full bg-muted border border-border opacity-50 hover:opacity-100 transition-all duration-1000 overflow-hidden dark:grayscale dark:invert dark:opacity-30 dark:hover:opacity-50 dark:hover:invert-0 dark:hover:grayscale-0">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8329615599024!2d72.88094977457787!3d19.07062228148902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c897f223fbad%3A0xe5db976d8dfced9d!2sBandra%20Kurla%20Complex!5e0!3m2!1sen!2sin!4v1709405400000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                  ></iframe>
               </div>
               <p className="text-[8px] font-bold text-foreground/10 uppercase tracking-[0.5em] text-center mt-8">
                 geospatial_node: 19.0706N, 72.8809E
               </p>
            </FadeIn>
         </div>
      </section>

    </div>
    </div>
  );
}
