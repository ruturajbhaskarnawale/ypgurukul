"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { RecordStatsGrid } from '@/components/admin/records-explorer/RecordStatsGrid';
import { getYearlyStats } from '@/components/admin/records-explorer/mockData';
import { FadeIn } from '@/components/animations/MotionUtils';

export default function YearlyRecordsPage() {
  const params = useParams();
  const year = params.year as string;
  const stats = getYearlyStats(year);

  return (
    <div className="space-y-12">
      <FadeIn delay={0.1}>
        <RecordStatsGrid stats={stats} />
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-10 border border-border rounded-[3rem] bg-muted/5 flex flex-col justify-between group hover:bg-muted/10 transition-colors">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">SESSION_CONTEXT</span>
              <div className="mt-8 space-y-2">
                 <h3 className="text-3xl font-black uppercase tracking-tighter">Academic_{year}</h3>
                 <p className="text-xs text-muted-foreground uppercase tracking-widest leading-relaxed">
                    FULL DATASET ACCESSIBLE. PLEASE SELECT A STANDARD FROM THE SIDEBAR TO VIEW DETAILED STUDENT TABLES.
                 </p>
              </div>
           </div>
           
           <div className="p-10 bg-foreground text-background rounded-[3rem] shadow-2xl flex flex-col justify-between">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">REVENUE_TARGET</span>
              <div className="mt-8">
                 <div className="flex items-baseline justify-between border-b border-background/10 pb-4">
                    <span className="text-[10px] font-black uppercase">Goal_Met</span>
                    <span className="text-xl font-black uppercase tracking-tighter text-primary animate-pulse">88%</span>
                 </div>
                 <div className="flex items-center justify-between pt-4">
                    <span className="text-[10px] font-black uppercase opacity-40 italic">System_Snapshot</span>
                    <span className="text-[8px] font-black uppercase tracking-widest bg-background/10 px-2 py-1 rounded">ON_TRACK</span>
                 </div>
              </div>
           </div>
        </div>
      </FadeIn>
    </div>
  );
}
