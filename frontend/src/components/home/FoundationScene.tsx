"use client";

import React, { useRef, useEffect, useState } from 'react';
import { FaChalkboardTeacher, FaBookOpen, FaTrophy, FaGraduationCap } from 'react-icons/fa';
import { useCountUp } from '@/lib/hooks/useCountUp';

// ─── Stat Counter Card ───────────────────────────────────────────────────────
const StatCard = ({
  label,
  value,
  trigger,
}: {
  label: string;
  value: string;
  trigger: boolean;
}) => {
  const numericValue = parseInt(value, 10);
  const suffix = value.replace(numericValue.toString(), '');
  const count = useCountUp(numericValue, 2, suffix, trigger);

  return (
    <div className="flex flex-col items-center text-center p-6 md:p-8 rounded-2xl bg-card border border-border">
      <span className="text-4xl md:text-6xl font-black tracking-tight text-primary leading-none mb-3">
        {count}
      </span>
      <span className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
};

// ─── Why Choose Us Feature Card ───────────────────────────────────────────────
const features = [
  {
    icon: <FaChalkboardTeacher size={22} />,
    title: 'Expert Faculty',
    desc: 'Learn from IITians and doctors with proven teaching records and years of mentoring experience.',
  },
  {
    icon: <FaBookOpen size={22} />,
    title: 'Rich Study Material',
    desc: 'Comprehensive modules, DPPs, and updated question banks crafted for board and competitive exams.',
  },
  {
    icon: <FaTrophy size={22} />,
    title: 'Proven Results',
    desc: 'Highest selection ratio in the region with consistent top AIR holders every academic year.',
  },
  {
    icon: <FaGraduationCap size={22} />,
    title: 'Personal Mentorship',
    desc: 'One-on-one doubt sessions and regular parent-teacher reviews to keep every student on track.',
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export const FoundationScene = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  // Trigger count-up when stats section scrolls into view
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── SECTION 1: Stats ─────────────────────────────────────── */}
      <section
        ref={statsRef}
        className="py-20 md:py-32 bg-background border-b border-border"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Heading */}
          <div className="text-center mb-14 md:mb-20">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Our Impact
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              Numbers That Speak
            </h2>
          </div>

          {/* Stat grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Students Taught', value: '10000+' },
              { label: 'Selection Rate', value: '95%' },
              { label: 'Expert Faculty', value: '50+' },
              { label: 'Resource Access', value: '24/7' },
            ].map((stat, i) => (
              <StatCard key={i} label={stat.label} value={stat.value} trigger={statsActive} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Why Choose Us ──────────────────────────────── */}
      <section className="py-20 md:py-32 bg-secondary border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Heading */}
          <div className="mb-14 md:mb-20">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Why YP Gurukul
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground max-w-xl leading-tight">
              The Advantage That Makes the Difference
            </h2>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group flex flex-col p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
