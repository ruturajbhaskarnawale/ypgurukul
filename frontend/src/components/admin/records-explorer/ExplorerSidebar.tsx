"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaFolderOpen, FaArrowRight, FaChartPie } from 'react-icons/fa';

const YEARS = ['2026', '2025', '2024', '2023'];
const STANDARDS = ['12th', '11th', '10th', '9th', '8th', '7th', '6th', '5th', '4th', '3rd', '2nd', '1st'];
const STREAMS = ['Science', 'Arts', 'Commerce'];

export const ExplorerSidebar = ({ isOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) => {
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

  const handleMobileClick = () => {
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-[45] md:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`
        fixed md:relative top-0 left-0 h-full w-[280px] md:w-72 bg-card border-r border-border z-50 flex flex-col 
        transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) shadow-[0_0_100px_rgba(0,0,0,0.1)] md:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 border-b border-border bg-muted/5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 mb-3 ml-1">Admission Explorer</p>
          <Link 
            href="/admin/admission-records"
            className={`flex items-center gap-3 p-4 rounded-xl font-bold text-sm transition-all shadow-sm border border-border/50 group ${pathname === '/admin/admission-records' ? 'bg-primary text-primary-foreground border-transparent' : 'bg-background hover:bg-muted/30 text-foreground'}`}
            onClick={handleMobileClick}
          >
            <FaFolderOpen size={14} className={pathname === '/admin/admission-records' ? '' : 'text-primary opacity-40 group-hover:opacity-100 transition-opacity'} />
            Global Overivew
          </Link>
        </div>

        <div className="flex-1 py-8 px-6 space-y-4 overflow-y-auto custom-scrollbar">
          {YEARS.map((year) => {
            const isYearExpanded = expandedYear === year;
            const isActiveYear = params.year === year && !params.standard;

            return (
              <div key={year} className="space-y-2">
                <button 
                  onClick={() => toggleYear(year)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group border border-transparent ${isActiveYear ? 'bg-foreground text-background shadow-lg' : 'hover:bg-muted/40 text-muted-foreground hover:text-foreground'}`}
                >
                  <div className="flex items-center gap-3">
                    <FaChevronRight size={8} className={`transition-transform duration-300 ${isYearExpanded ? 'rotate-90 text-primary' : 'opacity-20'}`} />
                    <span className="text-xs font-bold tracking-tight">Academic Year {year}</span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isYearExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-6 space-y-1 border-l border-border/40 ml-4 pb-2"
                    >
                      <Link 
                        href={`/admin/admission-records/${year}`}
                        className={`flex items-center gap-2 p-3 text-[11px] font-bold tracking-tight rounded-lg transition-all ${isActiveYear ? 'text-primary bg-primary/5' : 'text-muted-foreground/60 hover:text-foreground hover:bg-muted/20'}`}
                        onClick={handleMobileClick}
                      >
                        <FaChartPie size={12} className="opacity-20" />
                        Session Dashboard
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
                                  flex-1 p-3 rounded-lg transition-all text-[11px] font-bold tracking-tight
                                  ${isActiveStd ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground/40 hover:text-foreground hover:bg-muted/20'}
                                `}
                                onClick={handleMobileClick}
                              >
                                {std} Standard
                              </Link>
                              {hasStreams && (
                                <button 
                                  onClick={(e) => { e.preventDefault(); toggleStd(lowerStd); }}
                                  className={`p-3 transition-transform duration-300 ${isStdExpanded ? 'rotate-90 text-primary' : 'opacity-20'}`}
                                >
                                  <FaChevronRight size={8} />
                                </button>
                              )}
                            </div>

                            <AnimatePresence>
                              {hasStreams && isStdExpanded && (
                                 <motion.div 
                                   initial={{ height: 0, opacity: 0 }}
                                   animate={{ height: 'auto', opacity: 1 }}
                                   exit={{ height: 0, opacity: 0 }}
                                   className="overflow-hidden pl-10 space-y-1 relative"
                                 >
                                   <div className="absolute left-4 top-0 bottom-6 w-px bg-border/20" />
                                   {STREAMS.map(stream => {
                                     const lowerStream = stream.toLowerCase();
                                     const isActiveStream = params.year === year && params.standard === lowerStd && params.stream === lowerStream;
                                     return (
                                       <Link 
                                         key={stream}
                                         href={`/admin/admission-records/${year}/${lowerStd}/${lowerStream}`}
                                         className={`
                                           flex items-center gap-2 p-3 text-[10px] font-bold tracking-tight rounded-md transition-all relative
                                           ${isActiveStream ? 'text-primary bg-primary/5 before:absolute before:left-[-1.5rem] before:top-1/2 before:w-2 before:h-2 before:bg-primary before:rounded-full before:-translate-y-1/2' : 'text-muted-foreground/30 hover:text-foreground hover:bg-muted/10'}
                                         `}
                                         onClick={handleMobileClick}
                                       >
                                         <FaArrowRight size={8} className="opacity-20" />
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

        <div className="p-8 border-t border-border bg-muted/5">
          <div className="flex flex-col gap-2 opacity-40">
             <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">Secure Records Access</span>
             <span className="text-[8px] font-medium opacity-60">Verified Cloud Environment</span>
          </div>
        </div>
      </div>
    </>
  );
};
