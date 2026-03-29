"use client";

import React from 'react';
import Link from 'next/link';
import {
  FaArrowRight, FaCheckCircle, FaMedal,
  FaChalkboardTeacher, FaGraduationCap, FaFlask,
} from 'react-icons/fa';

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: '500+',  label: 'JEE Selections' },
  { value: '850+',  label: 'NEET Qualifiers' },
  { value: '15+',   label: 'Years of Excellence' },
  { value: '5,000+', label: 'Alumni Network' },
];

const values = [
  {
    icon: <FaCheckCircle size={18} />,
    title: 'Conceptual Clarity',
    desc: 'We build knowledge from first principles. Every student leaves with a structurally sound understanding — not just memorised facts.',
  },
  {
    icon: <FaChalkboardTeacher size={18} />,
    title: 'Expert Mentorship',
    desc: 'Our faculty are IITians, doctors, and subject matter authors committed to personalised guidance beyond the classroom.',
  },
  {
    icon: <FaFlask size={18} />,
    title: 'Practice-First Approach',
    desc: 'Daily DPPs, weekly mocks, and detailed performance analytics help students identify gaps and improve consistently.',
  },
  {
    icon: <FaGraduationCap size={18} />,
    title: 'Student-Centric Culture',
    desc: 'Regular parent–teacher reviews and one-on-one doubt sessions keep every student supported and on track.',
  },
];

const milestones = [
  { year: '2010', event: 'YP Gurukul founded with a first cohort of 12 students and a single mission: excellence.' },
  { year: '2015', event: 'Expanded to the Main Campus. Recorded first Top 100 AIR in JEE Advanced.' },
  { year: '2019', event: 'Launched the new Knowledge City campus with state-of-the-art smart classrooms and labs.' },
  { year: '2024', event: 'Achieved 5,000+ alumni placed in premier institutions across India and abroad.' },
];

const leadership = [
  {
    name: 'Yash Prakash',
    role: 'Founder & Managing Director',
    bio: 'Visionary educator with over a decade of experience building successful academic careers. Committed to making quality coaching accessible and results-driven.',
  },
  {
    name: 'Dr. A. Verma',
    role: 'Academic Director — Physics',
    bio: 'Pioneer in physics pedagogy with 15+ years of teaching experience. Focuses on deep conceptual understanding and competitive exam mastery.',
  },
  {
    name: 'R. Sharma',
    role: 'Head of Strategy & Curriculum',
    bio: 'Ex-IIT Delhi scholar who ensures our curriculum is always aligned with the latest exam patterns and competitive benchmarks.',
  },
];

const faculty = [
  { name: 'Dr. A. Verma',  subject: 'Physics',     exp: '15+ Years Exp' },
  { name: 'Mr. R. Sharma', subject: 'Mathematics',  exp: 'Ex-IIT Delhi' },
  { name: 'Dr. S. Patil',  subject: 'Chemistry',    exp: 'Published Author' },
  { name: 'Ms. K. Iyer',   subject: 'Biology',      exp: '10+ Years Exp' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="border-b border-border bg-secondary py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            About Us
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight max-w-2xl mb-5">
            Shaping Futures Through Education Since 2010
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            YP Gurukul is a premier coaching institute dedicated to preparing students for JEE,
            NEET, MHT-CET, Board Exams, and Scholarships. Our mission is simple: every student
            who walks through our doors should leave with the confidence, skills, and rank they deserve.
          </p>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────── */}
      <section className="border-b border-border bg-background">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center p-5 rounded-2xl bg-card border border-border">
                <span className="text-3xl md:text-5xl font-black text-primary mb-2 leading-none">
                  {s.value}
                </span>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our philosophy ───────────────────────────────────── */}
      <section className="border-b border-border py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Text */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                Our Philosophy
              </p>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight text-foreground leading-tight mb-5">
                Education That Goes Beyond the Textbook
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                At YP Gurukul, we believe that real learning happens when students understand
                <em> why</em> something works — not just <em>how</em> to solve a problem.
                Our teaching philosophy is built on conceptual clarity, analytical thinking,
                and consistent practice.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We strip away rote learning and replace it with structured problem-solving,
                giving students a competitive edge that lasts well beyond the exam hall.
              </p>
            </div>

            {/* Values grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-primary">
                    {v.icon}
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{v.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Founder's message ────────────────────────────────── */}
      <section className="border-b border-border bg-secondary py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">
            From the Founder
          </p>
          <blockquote className="text-lg md:text-2xl font-semibold text-foreground leading-relaxed mb-8 italic">
            "Education is not the learning of facts, but the training of the mind to think.
            At YP Gurukul, we create the environment where determined students are shaped
            into confident, capable professionals."
          </blockquote>
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-bold text-foreground">Yash Prakash</span>
            <span className="text-xs text-muted-foreground">Founder & Managing Director, YP Gurukul</span>
          </div>
        </div>
      </section>

      {/* ── Milestones ───────────────────────────────────────── */}
      <section className="border-b border-border py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Our Journey
          </p>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-foreground mb-10 md:mb-14">
            Key Milestones
          </h2>

          <div className="relative border-l-2 border-border pl-8 flex flex-col gap-10">
            {milestones.map((m, i) => (
              <div key={i} className="relative">
                {/* Dot */}
                <div className="absolute -left-[2.85rem] top-1.5 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-1 block">
                  {m.year}
                </span>
                <p className="text-base font-semibold text-foreground leading-snug">
                  {m.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ───────────────────────────────────────── */}
      <section className="border-b border-border py-14 md:py-20 bg-secondary">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Leadership Team
          </p>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-foreground mb-10 md:mb-14">
            The People Behind YP Gurukul
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {leadership.map((p, i) => (
              <div
                key={i}
                className="flex flex-col p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                {/* Avatar placeholder */}
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-primary font-black text-xl mb-5 shrink-0">
                  {p.name.charAt(0)}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                  {p.role}
                </span>
                <h3 className="text-lg font-bold text-foreground mb-3 leading-snug">
                  {p.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {p.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Faculty overview ─────────────────────────────────── */}
      <section className="border-b border-border py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Our Faculty
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-foreground">
              Subject Experts & Mentors
            </h2>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-4 transition-all duration-300 shrink-0"
            >
              View Courses <FaArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {faculty.map((f, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-primary font-black text-xl mb-3">
                  {f.name.split(' ').pop()?.charAt(0)}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                  {f.subject}
                </span>
                <p className="text-sm font-bold text-foreground leading-snug">{f.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{f.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-accent/30">
        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-5">
          <FaMedal size={32} className="text-primary" />
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Join thousands of students who've achieved their target ranks with YP Gurukul's
            expert guidance and structured programs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Explore Programs <FaArrowRight size={13} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
            >
              Book a Counselling
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
