"use client";

import React from 'react';
import Link from 'next/link';
import { FaArrowRight, FaCalendarAlt, FaTag } from 'react-icons/fa';

const tests = [
  {
    tag: 'NEET',
    title: 'Minor Test 04 — Physics',
    date: 'This Sunday',
    topics: 'Kinematics & Laws of Motion',
    color: 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800',
    tagColor: 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/40',
  },
  {
    tag: 'JEE Main',
    title: 'Major Revision Test',
    date: 'Next Month',
    topics: 'Complete Class 11 Syllabus',
    color: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-800',
    tagColor: 'text-indigo-700 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/40',
  },
  {
    tag: 'Board Exam',
    title: 'Term 1 Mock Exam',
    date: 'Next Friday',
    topics: 'Chemistry & Biology',
    color: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800',
    tagColor: 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/40',
  },
];

export const TestSeriesPreview = ({ isNested = false }: { isNested?: boolean }) => {
  return (
    <section className={isNested ? '' : 'py-20 md:py-32 bg-secondary border-b border-border'}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Test Series
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground max-w-md leading-tight">
              Upcoming Tests & Mock Exams
            </h2>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-4 transition-all duration-300 shrink-0"
            >
              View All Tests <FaArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Test cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {tests.map((test, i) => (
            <div
              key={i}
              className={`group flex flex-col p-6 md:p-8 rounded-2xl border transition-all duration-300 hover:shadow-md cursor-pointer ${test.color}`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${test.tagColor}`}>
                  <FaTag size={8} />
                  {test.tag}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
                  <FaCalendarAlt size={10} />
                  {test.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-snug">
                {test.title}
              </h3>

              {/* Topics */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Topics: <span className="font-semibold text-foreground/80">{test.topics}</span>
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-4 transition-all duration-300">
                View Details <FaArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
