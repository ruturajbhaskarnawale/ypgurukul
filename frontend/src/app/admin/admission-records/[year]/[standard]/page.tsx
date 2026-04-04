"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { AdmissionLedgerTable } from '@/components/admin/records-explorer/AdmissionLedgerTable';
import { getMockAdmissions } from '@/components/admin/records-explorer/mockData';
import { FadeIn } from '@/components/animations/MotionUtils';
import { FaSearch, FaFilter, FaFileExport, FaUserFriends } from 'react-icons/fa';

export default function StandardRecordsPage() {
  const params = useParams();
  const year = params.year as string;
  const standard = params.standard as string;
  const admissions = getMockAdmissions(year, standard);

  // Capitalize standardized text
  const formatText = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <div className="space-y-10 md:space-y-12">
      
      {/* Filtering Actions Bar */}
      <FadeIn delay={0.1}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-card border border-border p-6 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center gap-4 bg-muted/20 border border-border/50 px-6 py-4 rounded-2xl w-full md:w-96 focus-within:border-primary/40 focus-within:bg-background transition-all group">
               <FaSearch size={14} className="text-muted-foreground opacity-30 group-focus-within:opacity-100 transition-opacity" />
               <input 
                 placeholder={`Search ${formatText(standard)} students...`} 
                 className="bg-transparent border-none outline-none text-xs font-bold w-full placeholder:text-muted-foreground/30 placeholder:font-medium"
               />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
               <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-muted/20 hover:bg-muted/40 text-foreground px-6 py-4 rounded-xl transition-all border border-border/40 font-bold text-xs">
                  <FaFilter size={12} className="opacity-40" />
                  Advanced Filters
               </button>
                <button 
                  className="flex-none flex items-center justify-center bg-primary text-primary-foreground w-12 h-12 rounded-xl transition-all hover:opacity-90 shadow-lg shadow-primary/20 active:scale-[0.98]"
                  title="Export CSV"
                >
                  <FaFileExport size={16} />
                </button>
            </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                     <FaUserFriends size={16} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-black text-foreground tracking-tight">{formatText(standard)} Standard Records</h3>
                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Academic Session {year}</p>
                  </div>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                     Showing {admissions.length} Students
                  </span>
               </div>
            </div>
            
            <AdmissionLedgerTable admissions={admissions} />
        </div>
      </FadeIn>

    </div>
  );
}
