"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { AdmissionLedgerTable } from '@/components/admin/records-explorer/AdmissionLedgerTable';
import { getMockAdmissions } from '@/components/admin/records-explorer/mockData';
import { FadeIn } from '@/components/animations/MotionUtils';

export default function StreamRecordsPage() {
  const params = useParams();
  const year = params.year as string;
  const standard = params.standard as string;
  const stream = params.stream as string;
  const admissions = getMockAdmissions(year, standard, stream);

  return (
    <div className="space-y-12">
      
      {/* Filtering Actions Bar */}
      <FadeIn delay={0.1}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-muted/5 border border-border p-6 rounded-[2.5rem] shadow-sm">
           <div className="flex items-center gap-4 bg-background border border-border px-6 py-4 rounded-2xl w-full md:w-96 focus-within:border-primary transition-all">
              <svg className="w-4 h-4 text-muted-foreground opacity-40 italic" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                placeholder={`SEARCH_${stream.toUpperCase()}_LEDGER...`} 
                className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest w-full placeholder:text-muted-foreground/40"
              />
           </div>

           <div className="flex items-center gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center gap-3 bg-muted/40 hover:bg-foreground hover:text-background px-6 py-4 rounded-2xl transition-all">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                 </svg>
                 <span className="text-[10px] font-black uppercase tracking-widest">Filters</span>
              </button>
              <button className="flex-2 md:flex-none flex items-center gap-4 bg-foreground text-background px-10 py-4 rounded-2xl transition-all hover:bg-muted-foreground font-black uppercase text-[10px] tracking-widest shadow-2xl active:scale-95">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                 </svg>
                 Export_{stream.toUpperCase()}_DATA
              </button>
           </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="space-y-4">
           <div className="flex items-center justify-between px-4">
              <h3 className="text-xl font-black uppercase tracking-tight">{standard} / {stream} Ledger</h3>
              <span className="text-[10px] font-black text-muted-foreground uppercase opacity-40 italic tracking-widest">
                 Segmented_Audit: {admissions.length} Students
              </span>
           </div>
           <AdmissionLedgerTable admissions={admissions} />
        </div>
      </FadeIn>

    </div>
  );
}
