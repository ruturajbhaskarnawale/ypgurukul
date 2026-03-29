"use client";

import React, { useEffect, useState, use } from 'react';
import { apiClient } from '@/lib/apiClient';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaArrowLeft, FaArrowRight, FaClock, FaRupeeSign,
  FaCheckCircle, FaCalendarAlt, FaDownload, FaPhoneAlt,
} from 'react-icons/fa';

interface CourseDetail {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  duration: string;
  feeStructure: string | null;
  subjects: string | null;
  batchTimings: string | null;
  previewImage?: string;
}

const MOCK_IMAGES: Record<string, string> = {
  'mht-cet-guide':      '/images/backgrounds/mht_cet_guide_cinematic_1773085224064.png',
  'nda-math':           '/images/backgrounds/nda_math_intensive_cinematic_1773085240254.png',
  'boards-elite':       '/images/backgrounds/boards_prep_elite_cinematic_1773085257290.png',
  'scholarship-master': '/images/backgrounds/scholarship_masterclass_cinematic_1773085273898.png',
  'neet-super-30':      '/images/backgrounds/neet_super_30_cinematic_1773085290079.png',
};

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [course, setCourse]   = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get<CourseDetail[]>('/public/courses')
      .then((courses) => {
        const found = courses.find((c) => c.slug === slug);
        if (found) setCourse(found);
        else throw new Error('not found');
      })
      .catch(() => {
        setCourse({
          id: 'mock',
          title: slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          slug,
          category: slug === 'neet-super-30' ? 'Premium' : slug === 'nda-math' ? 'Defense' : 'Academic',
          description: 'This program is carefully designed to give students a structured, thorough preparation plan for their target exam. Combining rigorous practice, expert mentorship, and regular mock tests, it ensures every student is exam-ready well before the D-day.',
          duration: slug === 'mht-cet-guide' ? '6 Months' : '1 Year',
          feeStructure: slug === 'neet-super-30' ? '₹85,000 p.a.' : '₹45,000 p.a.',
          subjects: JSON.stringify(['Physics — Mechanics & Waves', 'Chemistry — Organic & Inorganic', 'Mathematics — Calculus & Algebra', 'Biology — Genetics & Ecology']),
          batchTimings: JSON.stringify({ 'Morning Batch': '8:00 AM – 12:00 PM', 'Evening Batch': '4:00 PM – 8:00 PM', 'Weekend Batch': '9:00 AM – 3:00 PM' }),
          previewImage: MOCK_IMAGES[slug] || '/images/backgrounds/BG-3.png',
        });
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-sm">Loading course details…</span>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find the course you're looking for.</p>
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <FaArrowLeft size={12} /> Back to All Courses
          </Link>
        </div>
      </div>
    );
  }

  // Parse JSON fields safely
  let subjectsList: string[] = [];
  try { if (course.subjects) subjectsList = JSON.parse(course.subjects); } catch {}
  let timingsObj: Record<string, string> = {};
  try { if (course.batchTimings) timingsObj = JSON.parse(course.batchTimings); } catch {}

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Breadcrumb / back nav ───────────────────────────────── */}
      <div className="border-b border-border bg-secondary py-3">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/courses" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <FaArrowLeft size={10} /> All Courses
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold truncate">{course.title}</span>
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">

            {/* Left: info */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {course.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
                {course.title}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                {course.description}
              </p>

              {/* Key details */}
              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-border">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <FaClock size={11} className="text-primary" /> Duration
                  </span>
                  <span className="text-lg font-bold text-foreground">{course.duration}</span>
                </div>
                {course.feeStructure && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <FaRupeeSign size={10} className="text-primary" /> Fee
                    </span>
                    <span className="text-lg font-bold text-foreground">{course.feeStructure}</span>
                  </div>
                )}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  Enrol Now <FaArrowRight size={12} />
                </Link>
                <a
                  href="tel:+911234567890"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
                >
                  <FaPhoneAlt size={12} /> Call to Inquire
                </a>
              </div>
            </div>

            {/* Right: image */}
            {course.previewImage && (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-muted w-full">
                <Image
                  src={course.previewImage}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ── Main content + sidebar ──────────────────────────────── */}
      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14 items-start">

            {/* ── Main (8-col) ─── */}
            <div className="lg:col-span-2 flex flex-col gap-10">

              {/* Subjects / Syllabus */}
              {subjectsList.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground mb-6">
                    What You'll Study
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {subjectsList.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                      >
                        <FaCheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                        <span className="text-sm font-semibold text-foreground leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Success metrics */}
              <div className="grid grid-cols-3 gap-4 p-6 md:p-8 rounded-2xl bg-secondary border border-border">
                {[
                  { value: '98.2%', label: 'Success Rate' },
                  { value: '12:1',  label: 'Student–Mentor Ratio' },
                  { value: '5,000+', label: 'Alumni Network' },
                ].map((m) => (
                  <div key={m.label} className="flex flex-col items-center text-center gap-1">
                    <span className="text-2xl md:text-3xl font-black text-primary">{m.value}</span>
                    <span className="text-xs text-muted-foreground font-semibold leading-tight">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Program highlights */}
              <div>
                <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground mb-6">
                  Program Highlights
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    'Daily practice papers (DPPs) aligned to latest exam pattern',
                    'Weekly full-length mock tests with detailed performance reports',
                    'One-on-one doubt clearing sessions with faculty',
                    'Regular parent–teacher academic reviews',
                    'Comprehensive printed and digital study material included',
                  ].map((h, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                      <FaCheckCircle size={14} className="text-primary mt-0.5 shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── Sidebar (4-col sticky) ─── */}
            <div className="lg:sticky lg:top-24 flex flex-col gap-6">

              {/* Batch timings card */}
              {Object.keys(timingsObj).length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                    <FaCalendarAlt size={13} className="text-primary" /> Batch Timings
                  </h3>
                  <div className="flex flex-col gap-3">
                    {Object.entries(timingsObj).map(([batch, time]) => (
                      <div key={batch} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                        <span className="text-sm font-semibold text-foreground">{batch}</span>
                        <span className="text-xs text-muted-foreground">{time as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enrol CTA card */}
              <div className="rounded-2xl border border-primary/20 bg-accent/30 p-6 flex flex-col gap-4">
                <div>
                  <p className="text-sm font-bold text-foreground mb-1">Ready to get started?</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Speak to our counsellors for a free academic assessment and course recommendation.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  Enrol Now <FaArrowRight size={12} />
                </Link>
                <button className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
                  <FaDownload size={12} /> Download Brochure
                </button>
                <a
                  href="tel:+911234567890"
                  className="text-xs text-center text-muted-foreground hover:text-primary transition-colors"
                >
                  Or call us: +91 123 456 7890
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
