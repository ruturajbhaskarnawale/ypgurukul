"use client";

import React, { useState } from 'react';
import { PortalSidebar } from '@/components/portal/PortalSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ReactLenis } from '@studio-freight/react-lenis';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* Desktop & Mobile Sidebar */}
      <PortalSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="md:hidden h-16 bg-muted border-b border-border flex items-center justify-between px-6 z-40">
          <div className="text-sm font-black text-foreground uppercase tracking-tighter flex items-center gap-2">
            <span className="w-6 h-6 bg-gradient-to-br from-blue-500 to-teal-400 rounded-lg flex justify-center items-center text-[10px] text-white">YP</span>
            YP Gurukul
          </div>
          <button 
            className="text-muted-foreground p-2 hover:text-foreground transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        {/* Global Dashboard Header */}
        <DashboardHeader title="Student portal" />

        {/* Scrollable Content View with Local Smooth Scroll */}
        <ReactLenis className="flex-1 overflow-y-auto custom-scrollbar bg-background relative z-0">
          <main className="p-6 lg:p-12">
            <div className="max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </ReactLenis>
        
      </div>
    </div>
  );
}
