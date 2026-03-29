"use client";

import React from 'react';
import Image from 'next/image';
import { HeroSection } from '@/components/home/HeroSection';
import { QuickInquiry } from '@/components/home/QuickInquiry';

import { FoundationScene } from '@/components/home/FoundationScene';
import { LearningJourney3D } from '@/components/home/LearningJourney3D';
import { TestSeriesPreview } from '@/components/home/TestSeriesPreview';
import { SuccessStories } from '@/components/home/SuccessStories';
import { FacultyPreview } from '@/components/home/FacultyPreview';
import { Testimonials } from '@/components/home/Testimonials';
import { Gallery } from '@/components/home/Gallery';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const programs = [
  {
    title: 'Class 11 Science Batches',
    tag: 'Foundation',
    desc: 'Comprehensive 2-year classroom program building a strong conceptual foundation.',
    img: '/images/programs/foundation.png',
    href: '/courses',
  },
  {
    title: 'Target Batch',
    tag: 'Premium',
    desc: 'Intensive 1-year droppers batch focused on speed, accuracy, and problem-solving.',
    img: '/images/programs/target.png',
    href: '/courses',
  },
  {
    title: 'Weekend Test Series',
    tag: 'Specialized',
    desc: 'All-India mock tests with detailed analytics to track your real exam readiness.',
    img: '/images/programs/test_series.png',
    href: '/courses',
  },
];

export default function Home() {
  return (
    <main className="flex flex-col">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── STATS + WHY CHOOSE US (FoundationScene) ───────────── */}
      <FoundationScene />

      {/* ── LEARNING JOURNEY ──────────────────────────────────── */}
      <LearningJourney3D />

      {/* ── POPULAR PROGRAMS ──────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12">

          {/* Section heading */}
          <div className="mb-12 md:mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Our Programs
            </p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground max-w-md leading-tight">
                Popular Programs
              </h2>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-4 transition-all duration-300 shrink-0"
              >
                View All Courses <FaArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Program cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {programs.map((program, i) => (
              <Link
                key={i}
                href={program.href}
                className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:shadow-md hover:border-primary/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 md:h-60 w-full bg-muted overflow-hidden">
                  <Image
                    src={program.img}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-accent px-2.5 py-1 rounded-full inline-block mb-4 w-fit">
                    {program.tag}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-2 leading-snug">
                    {program.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {program.desc}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary mt-5 group-hover:gap-4 transition-all duration-300">
                    Learn More <FaArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── TEST SERIES PREVIEW ───────────────────────────────── */}
      <TestSeriesPreview />

      {/* ── FACULTY + TESTIMONIALS ────────────────────────────── */}
      <FacultyPreview />
      <Testimonials />

      {/* ── SUCCESS STORIES ───────────────────────────────────── */}
      <SuccessStories />

      {/* ── GALLERY ───────────────────────────────────────────── */}
      <Gallery />

      {/* ── QUICK INQUIRY ─────────────────────────────────────── */}
      <QuickInquiry />

    </main>
  );
}
