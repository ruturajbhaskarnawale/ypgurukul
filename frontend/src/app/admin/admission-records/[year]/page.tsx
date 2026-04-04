"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { RecordStatsGrid } from '@/components/admin/records-explorer/RecordStatsGrid';
import { getYearlyStats } from '@/components/admin/records-explorer/mockData';
import { FadeIn } from '@/components/animations/MotionUtils';
import { FaCalendarAlt, FaChartLine, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

export default function YearlyRecordsPage() {
  const params = useParams();
  const year = params.year as string;
  const stats = getYearlyStats(year);

  return (
    <div className="space-y-10 md:space-y-12">
      <FadeIn delay={0.1}>
        <RecordStatsGrid stats={stats} />
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Session Context Card */}
            <div className="p-10 border border-border rounded-[2.5rem] bg-card flex flex-col justify-between group hover:bg-muted/10 transition-all shadow-sm">
               <div className="flex items-center gap-2 text-primary opacity-40 group-hover:opacity-100 transition-opacity">
                  <FaInfoCircle size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Session Overview</span>
               </div>
               <div className="mt-8 space-y-3">
                  <h3 className="text-3xl font-black text-foreground tracking-tight">Academic Year {year}</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-sm">
                    Detailed student records for this academic session are fully synchronized. Use the sidebar to browse by standard and stream.
                  </p>
               </div>
               <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/5 px-4 py-2 rounded-lg self-start border border-emerald-500/10">
                  <FaCheckCircle size={10} />
                  Fully Synchronized
               </div>
            </div>
            
            {/* Revenue / Goal Card */}
            <div className="p-10 bg-foreground text-background rounded-[2.5rem] shadow-xl flex flex-col justify-between group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full translate-x-16 -translate-y-16" />
               <div className="flex items-center justify-between opacity-40">
                  <div className="flex items-center gap-2">
                     <FaChartLine size={14} />
                     <span className="text-[10px] font-bold uppercase tracking-widest">Enrollment Progress</span>
                  </div>
                  <FaCalendarAlt size={14} />
               </div>
               <div className="mt-8">
                  <div className="flex items-baseline justify-between border-b border-background/10 pb-6 mb-6">
                     <span className="text-xs font-bold text-background/60">Annual Target Met</span>
                     <span className="text-4xl font-black text-primary tracking-tighter">88%</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">System Snapshot</span>
                     <span className="text-[10px] font-black uppercase tracking-widest bg-background/10 px-4 py-1.5 rounded-full border border-background/20 text-primary">
                        On Track
                     </span>
                  </div>
               </div>
            </div>
        </div>
      </FadeIn>
    </div>
  );
}
