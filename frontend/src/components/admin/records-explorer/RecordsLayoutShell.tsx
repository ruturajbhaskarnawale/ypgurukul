"use client";

import React, { useState } from 'react';
import { ExplorerSidebar } from './ExplorerSidebar';
import { FadeIn } from '@/components/animations/MotionUtils';
import { useParams } from 'next/navigation';

const RecordsLayoutShell = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:h-[calc(100vh-6rem)] h-auto overflow-visible md:overflow-hidden bg-background relative">
      
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-24 right-6 z-[60] bg-foreground text-background p-3 rounded-full shadow-2xl active:scale-90 transition-transform"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Inner Explorer Sidebar */}
      <ExplorerSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 py-8 md:px-10 md:py-12 space-y-8 md:space-y-12 pb-24 relative">
        
        {/* Breadcrumb / Title Bar */}
        <FadeIn>
          <div className="flex flex-col gap-4 border-b border-border pb-10">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-40">
              <span className="hover:text-foreground cursor-pointer transition-colors">Admissions</span>
              <span>/</span>
              {params.standard && (
                <>
                  <span className={`transition-colors ${params.stream ? 'hover:text-foreground cursor-pointer' : 'text-foreground'}`}>
                    {params.standard as string}
                  </span>
                  {params.stream && <span>/</span>}
                </>
              )}
              {params.stream && (
                <span className="text-foreground italic">{params.stream as string}</span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-none">
              {params.stream 
                ? `${params.standard} / ${params.stream}` 
                : params.standard 
                  ? `${params.standard as string} Standard` 
                  : params.year 
                    ? `Session ${params.year as string} Records` 
                    : 'Global Admissions Index'
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
