"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [dashboardMode, setDashboardMode] = React.useState<'governance' | 'admin'>('governance');

  useEffect(() => {
    const saved = localStorage.getItem('ypg_admin_mode') as 'governance' | 'admin';
    if (saved) setDashboardMode(saved);

    const handleModeChange = (e: any) => {
      setDashboardMode(e.detail);
    };

    window.addEventListener('ypg_admin_mode_change', handleModeChange);
    return () => window.removeEventListener('ypg_admin_mode_change', handleModeChange);
  }, []);

  const toggleMode = () => {
    const next = dashboardMode === 'governance' ? 'admin' : 'governance';
    setDashboardMode(next);
    localStorage.setItem('ypg_admin_mode', next);
    window.dispatchEvent(new CustomEvent('ypg_admin_mode_change', { detail: next }));
  };

  const governanceItems = [
    { name: 'Dashboard', href: '/admin', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Admission Form', href: '/admin/admission-form', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
    { name: 'Admission Records', href: '/admin/admission-records', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 01-2-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { name: 'Applications', href: '/admin/applications', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  const adminItems = [
    { name: 'Dashboard', href: '/admin', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Admission Form', href: '/admin/admission-form', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
    { name: 'Admission Records', href: '/admin/admission-records', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 01-2-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { name: 'Courses', href: '/admin/courses', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { name: 'Study Materials', href: '/admin/materials', icon: 'M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 0 00-2 2v5a2 0 01-2 2z' },
    { name: 'Test Results', href: '/admin/tests', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  ];

  const currentNavItems = dashboardMode === 'governance' ? governanceItems : adminItems;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const sidebarClasses = `
    w-64 bg-background border-r border-border flex flex-col h-[100dvh]
    fixed md:sticky top-0 z-50 transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
  `;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={sidebarClasses}>
        
        <div className="h-24 flex items-center justify-between px-8 border-b border-border bg-muted/20">
          <Link href="/" className="group flex items-center gap-3" onClick={onClose}>
            <div className={`w-10 h-10 ${dashboardMode === 'governance' ? 'bg-foreground' : 'bg-primary'} rounded-xl flex items-center justify-center transition-colors duration-500`}>
              <span className={`text-xs font-black transition-colors duration-500 ${dashboardMode === 'governance' ? 'text-background' : 'text-primary-foreground'}`}>YP</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-black text-foreground tracking-[0.2em] uppercase transition-all">
                {dashboardMode === 'governance' ? 'Governance' : 'Administrative'}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5 italic opacity-60">
                {dashboardMode === 'governance' ? 'Terminal' : 'Repository'}
              </span>
            </div>
          </Link>
          
          <button className="md:hidden text-muted-foreground/60 p-2" onClick={onClose}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 py-10 px-6 space-y-2 overflow-y-auto">
          {currentNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`
                  relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${isActive ? 'bg-muted/60 text-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'}
                `}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeAdminNav"
                    className={`absolute left-0 w-1 h-6 rounded-r-full ${dashboardMode === 'governance' ? 'bg-foreground' : 'bg-primary'}`}
                  />
                )}
                <svg className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 text-foreground' : 'opacity-40 group-hover:scale-110 group-hover:opacity-100 group-hover:text-foreground'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-border bg-muted/5 space-y-4">
          
          <button 
            onClick={toggleMode}
            className="w-full group flex items-center justify-between px-6 py-5 rounded-2xl bg-foreground text-background hover:bg-muted-foreground transition-all duration-300 shadow-lg active:scale-95"
          >
            <div className="flex flex-col items-start">
              <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40 mb-1 group-hover:opacity-60 transition-opacity">Toggle_Module</span>
              <span className="text-[10px] font-black uppercase tracking-widest">
                To {dashboardMode === 'governance' ? 'Admin' : 'Governance'}
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-background/10 flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
               <svg className="w-4 h-4 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
               </svg>
            </div>
          </button>

          <Link href="/" className="flex items-center gap-4 px-2 hover:bg-muted/30 py-3 rounded-xl transition-all group">
            <div className="w-10 h-10 rounded-xl bg-muted/40 flex items-center justify-center border border-border group-hover:bg-foreground group-hover:text-background transition-colors">
              <svg className="w-4 h-4 text-muted-foreground/60 transition-colors group-hover:text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] group-hover:text-foreground transition-colors italic">Exit_Terminal</span>
          </Link>
        </div>

      </aside>
    </>
  );
};
