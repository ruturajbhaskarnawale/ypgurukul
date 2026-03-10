import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/MotionUtils';
import { Card, CardContent } from '../global/Card';
import { Button } from '../global/Button';
import Link from 'next/link';

export const TestSeriesPreview = ({ isNested = false }: { isNested?: boolean }) => {
  return (
    <section className={isNested ? "h-full flex flex-col w-full relative pt-16 md:pt-20 pb-12 md:pb-16" : "py-16 md:py-32 bg-background border-b border-border"}>
      <div className="max-w-[1800px] w-full mx-auto px-6 md:px-12 flex flex-col h-full relative z-10">
        
        {/* Massive Title Centered Vertically */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <span className="font-script text-3xl md:text-6xl text-foreground/40 lowercase mb-2 md:-mb-6 z-10 relative">the</span>
          <h2 className="text-fluid-title font-black uppercase tracking-tighter-editorial text-center leading-[0.85] text-foreground drop-shadow-xl select-none">
            Assessed <br /> Excellence
          </h2>
        </div>

        {/* Test Cards at the bottom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20 mt-8 md:mt-12 w-full test-series-cards-container" style={{ perspective: '2000px' }}>
          {[
            { tag: "NEET", title: "Minor Test 04 - Physics", date: "Coming Sunday", topics: "Kinematics, Laws of Motion" },
            { tag: "JEE Main", title: "Major Revision Test", date: "Next Month", topics: "Full 11th Syllabus" },
            { tag: "Board", title: "Term 1 Mock Exam", date: "Next Friday", topics: "Chemistry, Biology" },
          ].map((test, index) => (
            <div key={index} className="test-series-card border border-foreground/10 bg-background/5 backdrop-blur-md p-6 md:p-8 group hover:bg-foreground/5 transition-all cursor-pointer flex flex-col items-start origin-bottom">
              <div className="flex justify-between w-full mb-6 md:mb-8">
                <span className="text-[10px] font-bold text-foreground uppercase tracking-[0.2em]">{test.tag}</span>
                <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-[0.2em]">{test.date}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 uppercase tracking-tighter leading-tight text-foreground">{test.title}</h3>
              <p className="text-sm font-medium text-foreground/50 mb-8 lowercase tracking-wide max-w-[80%]">focusing on {test.topics}</p>
              
              <div className="mt-auto flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-foreground">
                <span className="group-hover:translate-x-2 transition-transform duration-500">View Details</span>
                <div className="w-8 h-[2px] bg-foreground group-hover:w-16 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
