"use client";

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/apiClient';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaClock, FaRupeeSign, FaSearch, FaTimes } from 'react-icons/fa';

interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  duration: string;
  feeStructure: string | null;
  previewImage?: string;
}

const FALLBACK_COURSES: Course[] = [
  { id: '1', title: 'MHT-CET Complete Guide',      slug: 'mht-cet-guide',       category: 'State Board',  description: 'Comprehensive preparation for MHT-CET covering Physics, Chemistry, and Mathematics with proven strategies.', duration: '6 Months', feeStructure: '₹15,000',    previewImage: '/images/courses/mht_cet_guide_cinematic_1773085224064.png' },
  { id: '2', title: 'NDA Mathematics Intensive',    slug: 'nda-math',            category: 'Defense',      description: 'Intensive coaching for NDA entrance with a focus on higher mathematics and analytical reasoning.', duration: '1 Year',   feeStructure: '₹25,000/yr', previewImage: '/images/courses/nda_math_intensive_cinematic_1773085240254.png' },
  { id: '3', title: 'Boards Prep Elite',            slug: 'boards-elite',        category: 'Board Prep',   description: 'Specialized batch for Class 10 and 12 board exams ensuring high percentage results.', duration: '1 Year',   feeStructure: '₹20,000/yr', previewImage: '/images/courses/boards_prep_elite_cinematic_1773085257290.png' },
  { id: '4', title: 'Scholarship Masterclass',      slug: 'scholarship-master',  category: 'Scholarship',  description: 'Preparation for NTSE, Olympiads, and various competitive scholarship exams.', duration: '4 Months', feeStructure: '₹8,000',     previewImage: '/images/courses/scholarship_masterclass_cinematic_1773085273898.png' },
  { id: '5', title: 'NEET Super 30',               slug: 'neet-super-30',       category: 'Premium',      description: 'Targeted medical entrance preparation with daily doubt sessions, DPPs, and performance analytics.', duration: '1 Year',   feeStructure: '₹60,000/yr', previewImage: '/images/courses/neet_super_30_cinematic_1773085290079.png' },
];

const categoryColors: Record<string, string> = {
  'State Board':  'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Defense':      'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'Board Prep':   'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  'Scholarship':  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'Premium':      'bg-primary/10 text-primary',
};
const defaultCategoryColor = 'bg-muted text-muted-foreground';

export default function CoursesPage() {
  const [courses, setCourses]           = useState<Course[]>([]);
  const [loading, setLoading]           = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch]             = useState('');

  useEffect(() => {
    apiClient.get<Course[]>('/public/courses')
      .then(setCourses)
      .catch(() => setCourses(FALLBACK_COURSES))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))];

  const filtered = courses.filter((c) => {
    const matchCat  = activeCategory === 'All' || c.category === activeCategory;
    const matchSearch = search.trim() === '' ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Page header ────────────────────────────────────────── */}
      <section className="border-b border-border bg-secondary py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Programs & Courses
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight mb-4">
            Find the Right Program for You
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            Explore our courses designed for JEE, NEET, MHT-CET, Board Exams, and more.
            Each program comes with expert faculty, study material, and personal mentorship.
          </p>
        </div>
      </section>

      {/* ── Filter + Search bar ────────────────────────────────── */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">

          {/* Category pills */}
          <div className="overflow-x-scroll-touch flex items-center gap-2 flex-nowrap flex-1 pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative shrink-0 w-full sm:w-56">
            <FaSearch size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses…"
              className="w-full pl-8 pr-8 py-2 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <FaTimes size={11} />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* ── Course grid ────────────────────────────────────────── */}
      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-12">

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card animate-pulse h-80" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-lg font-semibold text-foreground mb-2">No courses found</p>
              <p className="text-sm text-muted-foreground">Try changing or clearing your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:shadow-md hover:border-primary/30 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 w-full bg-muted overflow-hidden shrink-0">
                    {course.previewImage ? (
                      <Image
                        src={course.previewImage}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground/20 text-4xl font-black">
                        YP
                      </div>
                    )}
                    {/* Category badge */}
                    <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${categoryColors[course.category] ?? defaultCategoryColor}`}>
                      {course.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col p-5 flex-1 gap-3">
                    <h2 className="text-base font-bold text-foreground leading-snug">
                      {course.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                      {course.description}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center gap-4 pt-3 border-t border-border text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <FaClock size={11} className="text-primary" />
                        {course.duration}
                      </span>
                      {course.feeStructure && (
                        <span className="flex items-center gap-1">
                          <FaRupeeSign size={10} className="text-primary" />
                          {course.feeStructure.replace('₹', '')}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300 mt-1">
                      View Details <FaArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────── */}
      <section className="border-t border-border bg-accent/30 py-14 md:py-20">
        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-5">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
            Not sure which program suits you?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our counsellors will help you pick the right batch based on your target exam,
            current level, and available time.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Book a Free Counselling <FaArrowRight size={13} />
          </Link>
        </div>
      </section>

    </div>
  );
}
