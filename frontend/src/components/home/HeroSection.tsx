"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaPhoneAlt, FaChevronDown } from 'react-icons/fa';

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS: StatItem[] = [
  { target: 10000, suffix: '+', label: 'Students Taught' },
  { target: 95,    suffix: '%', label: 'Selection Rate'  },
  { target: 15,    suffix: '+', label: 'Years of Excellence' },
];

const EXAM_TAGS = [
  { label: 'JEE Main',    delay: 0,    pos: 'top-[22%] left-[7%]',   rotate: '-rotate-6'  },
  { label: 'NEET',         delay: 0.6,  pos: 'top-[15%] right-[10%]', rotate: 'rotate-3'   },
  { label: 'MHT-CET',     delay: 1.2,  pos: 'bottom-[30%] left-[5%]',rotate: 'rotate-6'   },
  { label: 'Board Exams', delay: 0.3,  pos: 'top-[38%] right-[6%]',  rotate: '-rotate-3'  },
  { label: 'NDA',          delay: 0.9,  pos: 'bottom-[22%] right-[9%]', rotate: 'rotate-2' },
  { label: 'Scholarship',  delay: 1.5,  pos: 'top-[58%] left-[8%]',  rotate: '-rotate-4'  },
];

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ stat, active, index }: { stat: StatItem; active: boolean; index: number }) {
  const count = useCountUp(stat.target, 1600, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="flex flex-col items-center gap-1.5 px-6 py-5 rounded-2xl bg-card border border-border shadow-sm"
    >
      <span className="text-3xl md:text-4xl font-black leading-none animate-shimmer">
        {count.toLocaleString()}{stat.suffix}
      </span>
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center">
        {stat.label}
      </span>
    </motion.div>
  );
}

// ─── Animation variants ──────────────────────────────────────────────────────

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.13, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const scaleFade = {
  hidden: { opacity: 0, scale: 0.94 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Component ───────────────────────────────────────────────────────────────

export const HeroSection = () => {
  const statsRef  = useRef<HTMLDivElement>(null);
  const heroRef   = useRef<HTMLElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  const scrollToNext = () => {
    const hero = heroRef.current;
    if (!hero) return;
    const next = hero.nextElementSibling as HTMLElement | null;
    next?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-background border-b border-border overflow-hidden"
    >

      {/* ── Animated blob backgrounds ─────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Primary blob — top-left */}
        <div
          className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full
                     bg-primary/10 blur-[80px] animate-blob"
        />
        {/* Accent blob — bottom-right */}
        <div
          className="absolute -bottom-40 -right-20 w-[420px] h-[420px] rounded-full
                     bg-accent/60 blur-[80px] animate-blob-slow animation-delay-2000"
        />
        {/* Tertiary soft blob — center-right */}
        <div
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full
                     bg-primary/5 blur-[60px] animate-blob animation-delay-4000"
        />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--foreground) / 1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* ── Floating exam pill tags ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {EXAM_TAGS.map((tag, i) => (
          <motion.div
            key={tag.label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 + tag.delay }}
            className={`absolute hidden lg:block ${tag.pos}`}
          >
            <div
              className={`
                inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold
                bg-card/80 backdrop-blur-sm border border-border text-muted-foreground
                shadow-sm ${tag.rotate}
                ${i % 2 === 0 ? 'animate-float' : 'animate-float-slow'}
              `}
              style={{ animationDelay: `${tag.delay}s` }}
            >
              {tag.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Main content ─────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-7 pt-24 pb-16 md:pt-28 md:pb-20"
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs font-bold uppercase tracking-widest text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Premium Coaching Institute · Est. 2010
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.05]"
        >
          Unlock Your{' '}
          <span
            className="inline-block"
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, #60a5fa 50%, var(--primary) 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Academic Potential
          </span>
          <br className="hidden sm:block" />
          {' '}with YP Gurukul
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          className="text-base md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          Expert coaching for <strong className="text-foreground font-semibold">JEE</strong>,{' '}
          <strong className="text-foreground font-semibold">NEET</strong>,{' '}
          <strong className="text-foreground font-semibold">MHT-CET</strong>, and Board Exams.
          Personalised mentorship, proven study material, and a track record of top results.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={scaleFade}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/courses"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/25"
          >
            Explore Programs
            <FaArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-border bg-background/80 backdrop-blur-sm text-foreground text-sm font-bold hover:bg-secondary transition-colors"
          >
            Book Free Counselling
          </Link>
        </motion.div>

        {/* Phone link */}
        <motion.a
          variants={fadeUp}
          href="tel:+911234567890"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
        >
          <FaPhoneAlt size={12} /> Call us: +91 123 456 7890
        </motion.a>

        {/* Stats grid */}
        <motion.div
          variants={fadeUp}
          ref={statsRef}
          className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-2xl pt-4"
        >
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} active={statsInView} index={i} />
          ))}
        </motion.div>

        {/* Trust badges row */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground font-semibold"
        >
          {['IIT-Trained Faculty', 'Structured Study Material', 'Weekly Mock Tests', 'Parent Review Sessions'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="text-primary font-bold">✓</span> {t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll chevron ────────────────────────────────────── */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors group"
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest opacity-60">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaChevronDown size={14} />
        </motion.div>
      </motion.button>

    </section>
  );
};
