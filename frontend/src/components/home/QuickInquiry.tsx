"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FadeIn } from '../animations/MotionUtils';
import { apiClient, ApiError } from '@/lib/apiClient';
import gsap from 'gsap';
import { SectionBackground } from './SectionBackground';

const Starfield = () => {
  const [stars, setStars] = useState<{width: string, height: string, top: string, left: string, opacity: number, animation: string}[]>([]);

  useEffect(() => {
    setStars([...Array(50)].map(() => ({
      width: Math.random() * 2 + 'px',
      height: Math.random() * 2 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      opacity: Math.random() * 0.7,
      animation: `twinkle ${2 + Math.random() * 5}s infinite ease-in-out`
    })));
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-background">
      {/* Requested Background Image */}
      <div className="absolute inset-0 opacity-60 grayscale mix-blend-multiply transition-opacity duration-1000">
        <Image 
          src="/images/backgrounds/BG-G.png" 
          alt="" 
          fill 
          className="object-cover"
          priority
        />
      </div>
      
      {/* Twinkling Stars Layer (Dark) */}
      <div className="absolute inset-0">
         {stars.map((style, i) => (
           <div 
             key={i} 
             className="absolute rounded-full bg-foreground transition-opacity duration-1000"
             style={style}
           />
         ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export const QuickInquiry = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      const magnetStrength = 40;
      const range = 150;

      if (Math.abs(distanceX) < range && Math.abs(distanceY) < range) {
        gsap.to(btn, {
          x: distanceX / 2,
          y: distanceY / 2,
          duration: 0.5,
          ease: "power2.out"
        });
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setSubmitting(true);
    try {
      await apiClient.post('/public/inquiries', {
        name: `${firstName} ${lastName}`.trim(),
        mobile: phone,
        message: `Interested in: ${course}`,
      });
      setSuccessMsg('Thanks! We\'ll call you back shortly. 🎉');
      setFirstName(''); setLastName(''); setPhone(''); setCourse('');
    } catch (err) {
      if (err instanceof ApiError) setErrorMsg(err.message);
      else setErrorMsg('Submission failed. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative py-28 overflow-hidden border-b border-white/5">
      <Starfield />

      <div className="relative z-10 max-w-[1800px] mx-auto px-12">
        <div className="grid lg:grid-cols-2 gap-32 items-center">

          <FadeIn>
            <div className="flex flex-col items-start leading-tight">
              <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter-editorial mb-12 text-foreground">
                The <br /> <span className="text-muted/40">Journey</span>
              </h2>
              <p className="text-xl text-muted-foreground lowercase mb-12 max-w-md leading-relaxed">
                request a consultation with our academic architects to design your path to excellence.
              </p>
              <div className="flex gap-8 items-center pt-8 border-t border-border w-full">
                <div className="text-[12px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30">Support Line</div>
                <p className="text-2xl font-black uppercase tracking-tighter text-foreground">+91 123 456 7890</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-secondary/40 backdrop-blur-3xl border border-border rounded-3xl p-12 md:p-16">
              {successMsg ? (
                <div className="text-center py-16">
                  <h3 className="text-4xl font-black uppercase tracking-tighter text-foreground mb-4">Confirmed</h3>
                  <p className="text-muted-foreground lowercase italic">{successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="flex flex-col gap-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40">First Name</label>
                      <input 
                        className="bg-transparent border-b border-border py-4 focus:border-foreground focus:outline-none transition-colors text-xl font-bold uppercase tracking-tight text-foreground placeholder:text-foreground/10"
                        placeholder="NAME"
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} required 
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40">Last Name</label>
                      <input 
                        className="bg-transparent border-b border-border py-4 focus:border-foreground focus:outline-none transition-colors text-xl font-bold uppercase tracking-tight text-foreground placeholder:text-foreground/10"
                        placeholder="SURNAME"
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40">Phone Number</label>
                    <input 
                      type="tel"
                      className="bg-transparent border-b border-border py-4 focus:border-foreground focus:outline-none transition-colors text-xl font-bold uppercase tracking-tight text-foreground placeholder:text-foreground/10"
                      placeholder="+91 000 000 0000"
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} required 
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40">Selected Course</label>
                    <input 
                      className="bg-transparent border-b border-border py-4 focus:border-foreground focus:outline-none transition-colors text-xl font-bold uppercase tracking-tight text-foreground placeholder:text-foreground/10"
                      placeholder="e.g. 11TH SCIENCE"
                      value={course} 
                      onChange={(e) => setCourse(e.target.value)} 
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-foreground text-[10px] font-black uppercase tracking-widest">[ error ] {errorMsg}</p>
                  )}

                  <button 
                    ref={buttonRef}
                    className="w-full py-6 bg-primary text-primary-foreground font-black uppercase tracking-[0.4em] text-[12px] hover:scale-105 transition-transform disabled:opacity-50 relative z-20 rounded-full shadow-xl shadow-primary/10"
                    type="submit" 
                    disabled={submitting}
                  >
                    {submitting ? 'SENDING...' : 'INITIATE CONSULTATION'}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

