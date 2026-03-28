"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const YEARS = ['2026', '2025', '2024', '2023'];
const STANDARDS = ['12th', '11th', '10th', '9th', '8th', '7th', '6th', '5th', '4th', '3rd', '2nd', '1st'];
const STREAMS = ['Science', 'Arts', 'Commerce'];

export const ExplorerSidebar = () => {
  const params = useParams();
  const pathname = usePathname();
  const [expandedYear, setExpandedYear] = useState<string | null>(params.year as string || null);
  const [expandedStd, setExpandedStd] = useState<string | null>(params.standard as string || null);

  useEffect(() => {
    if (params.year) setExpandedYear(params.year as string);
    if (params.standard) setExpandedStd(params.standard as string);
  }, [params.year, params.standard]);

  const toggleYear = (year: string) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  const toggleStd = (std: string) => {
    setExpandedStd(expandedStd === std ? null : std);
  };

  return (
    <div className="w-64 flex flex-col h-full bg-muted/5 border-r border-border overflow-y-auto">
      <div className="p-6 border-b border-border bg-muted/10">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-1">Navigation_Index</h2>
        <Link 
          href="/admin/admission-records"
          className={`text-xs font-black uppercase tracking-tight hover:text-primary transition-colors ${pathname === '/admin/admission-records' ? 'text-primary' : 'text-foreground'}`}
        >
          📂 All Admissions
        </Link>
      </div>

      <div className="flex-1 py-8 px-4 space-y-4">
        {YEARS.map((year) => {
          const isYearExpanded = expandedYear === year;
          const isActiveYear = params.year === year && !params.standard;

          return (
            <div key={year} className="space-y-2">
              <button 
                onClick={() => toggleYear(year)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${isActiveYear ? 'bg-foreground text-background shadow-lg' : 'hover:bg-muted/40 text-muted-foreground hover:text-foreground'}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-black transition-transform duration-300 ${isYearExpanded ? 'rotate-90' : ''}`}>
                    ▶
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {year}_Session
                  </span>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isYearExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-6 space-y-1 border-l border-border/40 ml-2"
                  >
                    <Link 
                      href={`/admin/admission-records/${year}`}
                      className={`block p-2 text-[8px] font-black uppercase tracking-widest rounded-lg ${isActiveYear ? 'text-primary' : 'text-muted-foreground/60 hover:text-foreground'}`}
                    >
                      Dashboard Summary
                    </Link>
                    {STANDARDS.map((std) => {
                      const lowerStd = std.toLowerCase();
                      const isStdExpanded = expandedStd === lowerStd;
                      const isActiveStd = params.year === year && params.standard === lowerStd && !params.stream;
                      const hasStreams = std === '12th' || std === '11th';

                      return (
                        <div key={std} className="space-y-1">
                          <div className="flex items-center justify-between group">
                            <Link 
                              href={`/admin/admission-records/${year}/${lowerStd}`}
                              className={`
                                flex-1 p-2 rounded-lg transition-all text-[9px] font-black uppercase tracking-widest
                                ${isActiveStd ? 'bg-primary/10 text-primary' : 'text-muted-foreground/40 hover:text-foreground hover:bg-muted/20'}
                              `}
                            >
                              {std} Standard
                            </Link>
                            {hasStreams && (
                              <button 
                                onClick={(e) => { e.preventDefault(); toggleStd(lowerStd); }}
                                className={`p-2 text-[8px] transition-transform duration-300 ${isStdExpanded ? 'rotate-90' : ''} text-muted-foreground/20 hover:text-foreground`}
                              >
                                ▶
                              </button>
                            )}
                          </div>

                          <AnimatePresence>
                            {hasStreams && isStdExpanded && (
                               <motion.div 
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: 'auto', opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="overflow-hidden pl-6 space-y-1 border-l border-border/20 ml-2"
                               >
                                 {STREAMS.map(stream => {
                                   const lowerStream = stream.toLowerCase();
                                   const isActiveStream = params.year === year && params.standard === lowerStd && params.stream === lowerStream;
                                   return (
                                     <Link 
                                       key={stream}
                                       href={`/admin/admission-records/${year}/${lowerStd}/${lowerStream}`}
                                       className={`
                                         block p-2 text-[8px] font-black uppercase tracking-widest rounded-md transition-all
                                         ${isActiveStream ? 'text-primary bg-primary/5' : 'text-muted-foreground/30 hover:text-foreground hover:bg-muted/10'}
                                       `}
                                     >
                                       {stream}
                                     </Link>
                                   );
                                 })}
                               </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="p-6 border-t border-border bg-muted/5 opacity-40 italic">
        <span className="text-[8px] font-black uppercase tracking-[0.2em] leading-tight">
          Explorer_v2.2<br/>
          Secure_Kernel_Connection
        </span>
      </div>
    </div>
  );
};
