"use client";

import React from 'react';
import { ExplorerSidebar } from './ExplorerSidebar';
import { FadeIn } from '@/components/animations/MotionUtils';
import { useParams } from 'next/navigation';

export const RecordsLayoutShell = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();

  return (
    <div className="flex h-[calc(100vh-6rem)] overflow-hidden bg-background">
      
      {/* Inner Explorer Sidebar */}
      <ExplorerSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-10 py-12 space-y-12 pb-24 relative">
        
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
            
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-none">
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
