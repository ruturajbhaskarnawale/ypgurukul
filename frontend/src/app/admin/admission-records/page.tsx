"use client";

import React from 'react';
import { RecordStatsGrid } from '@/components/admin/records-explorer/RecordStatsGrid';
import { getGlobalStats } from '@/components/admin/records-explorer/mockData';
import { FadeIn } from '@/components/animations/MotionUtils';

export default function GlobalRecordsPage() {
  const stats = getGlobalStats();

  return (
    <div className="space-y-12">
      <FadeIn delay={0.1}>
        <RecordStatsGrid stats={stats} />
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="p-10 border border-border rounded-[3rem] bg-muted/5 space-y-8">
           <div className="flex flex-col gap-2">
              <h2 className="text-xl font-black uppercase tracking-tight">System_Holistic_Scan</h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest leading-relaxed max-w-2xl">
                THIS VIEW AGGREGATES DATA FROM THE FULL ARCHIVE. SELECT A SPECIFIC ACADEMIC YEAR FROM THE NAVIGATION SIDEBAR TO PERFORM A SEGMENTED AUDIT OF ADMISSION RECORDS.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-background border border-border rounded-2xl flex items-center justify-between group hover:bg-muted/10 transition-colors">
                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active_Sessions</span>
                 <span className="text-sm font-black italic">4_RECORDED</span>
              </div>
              <div className="p-6 bg-background border border-border rounded-2xl flex items-center justify-between group hover:bg-muted/10 transition-colors">
                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Data_Integrity</span>
                 <span className="text-sm font-black italic text-green-500">100%_SYNC</span>
              </div>
           </div>
        </div>
      </FadeIn>
    </div>
  );
}
