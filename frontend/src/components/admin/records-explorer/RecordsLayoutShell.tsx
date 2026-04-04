"use client";

import React, { useState } from 'react';
import { ExplorerSidebar } from './ExplorerSidebar';
import { FadeIn } from '@/components/animations/MotionUtils';
import { useParams } from 'next/navigation';
import { FaChevronRight, FaBars, FaTimes } from 'react-icons/fa';

const RecordsLayoutShell = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Capitalize standardized params
  const formatParam = (text: string | string[] | undefined) => {
    if (!text) return '';
    const str = Array.isArray(text) ? text[0] : text;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="flex flex-col md:flex-row md:h-[calc(100vh-6rem)] h-auto overflow-visible md:overflow-hidden bg-background relative">
      
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-24 right-6 z-[60] bg-primary text-primary-foreground p-3 rounded-full shadow-xl active:scale-95 transition-all"
        aria-label="Toggle Navigation"
      >
        {isSidebarOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>

      {/* Inner Explorer Sidebar */}
      <ExplorerSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 py-8 md:px-10 md:py-12 space-y-8 md:space-y-10 pb-24 relative">
        
        {/* Breadcrumb / Title Bar */}
        <FadeIn>
          <div className="flex flex-col gap-3 border-b border-border pb-8">
            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
              <span className="hover:text-primary cursor-pointer transition-colors">Records</span>
              <FaChevronRight size={8} className="opacity-40" />
              {params.year && (
                <>
                  <span className="hover:text-primary cursor-pointer transition-colors">{params.year as string}</span>
                  {(params.standard || params.stream) && <FaChevronRight size={8} className="opacity-40" />}
                </>
              )}
              {params.standard && (
                <>
                  <span className={`transition-colors ${params.stream ? 'hover:text-primary cursor-pointer' : 'text-primary'}`}>
                    {params.standard as string} Standard
                  </span>
                  {params.stream && <FaChevronRight size={8} className="opacity-40" />}
                </>
              )}
              {params.stream && (
                <span className="text-primary font-bold">{formatParam(params.stream)}</span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight leading-tight">
              {params.stream 
                ? `${formatParam(params.standard)} ${formatParam(params.stream)}` 
                : params.standard 
                  ? `${params.standard as string} Standard Records` 
                  : params.year 
                    ? `Academic Year ${params.year as string}` 
                    : 'Admissions Overview'
              }
            </h1>
          </div>
        </FadeIn>

        {/* Dynamic Content */}
        <div className="relative">
          {children}
        </div>

      </main>

    </div>
  );
};
export { RecordsLayoutShell };
