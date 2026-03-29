"use client";

import React, { useState } from 'react';
import { PortalSidebar } from '@/components/portal/PortalSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';


export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans selection:bg-primary/20">
      
      {/* Desktop & Mobile Sidebar */}
      <PortalSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative min-w-0">
        
        {/* Unified header — hamburger integrated, no redundant mobile header */}
        <DashboardHeader title="Student portal" onMenuOpen={() => setSidebarOpen(true)} />

        {/* Scrollable Content View */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-background relative z-0">
          <main className="p-4 sm:p-6 lg:p-12">
            <div className="max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </div>
        
      </div>
    </div>
  );
}
