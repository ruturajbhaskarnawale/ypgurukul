"use client";

import React from 'react';
import { FaFlask, FaCalculator, FaDna, FaAtom, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

const steps = [
  {
    number: '01',
    icon: <FaAtom size={20} />,
    subject: 'Physics',
    title: 'Build Strong Foundations',
    desc: 'Understand core concepts through structured lessons, real-world examples, and concept maps designed for lasting clarity.',
  },
  {
    number: '02',
    icon: <FaCalculator size={20} />,
    subject: 'Mathematics',
    title: 'Sharpen Problem-Solving',
    desc: 'Practice with graded problem sets, timed DPPs, and previous year questions to build speed and accuracy.',
  },
  {
    number: '03',
    icon: <FaDna size={20} />,
    subject: 'Biology',
    title: 'Revise & Retain',
    desc: 'Structured revision cycles, mind maps, and flashcard-style notes to lock in high-yield topics before exams.',
  },
  {
    number: '04',
    icon: <FaFlask size={20} />,
    subject: 'Chemistry',
    title: 'Test & Grow',
    desc: 'Weekly mock tests with detailed performance analytics help identify gaps and track progress over time.',
  },
];

export function LearningJourney3D() {
  return (
    <section className="py-20 md:py-32 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="mb-14 md:mb-20">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            How We Teach
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground max-w-lg leading-tight">
              Your Learning Journey, Step by Step
            </h2>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-4 transition-all duration-300"
            >
              Explore All Programs <FaArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative flex flex-col p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300"
            >
              {/* Step number — decorative */}
              <span className="absolute top-5 right-6 text-5xl font-black text-border/60 leading-none select-none pointer-events-none group-hover:text-primary/10 transition-colors duration-300">
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                {step.icon}
              </div>

              {/* Subject tag */}
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 mb-2">
                {step.subject}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold text-foreground mb-3 leading-snug">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
