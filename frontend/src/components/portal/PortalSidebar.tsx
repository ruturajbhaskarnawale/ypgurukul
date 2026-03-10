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

export const PortalSidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', href: '/portal/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Study Materials', href: '/portal/materials', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { name: 'Test Results', href: '/portal/test-results', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Profile', href: '/portal/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

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
        
        <div className="h-20 flex items-center justify-between px-8 border-b border-border">
          <Link href="/" className="group flex items-center gap-3" onClick={onClose}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <span className="text-white text-xs font-black">YP</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-black text-foreground tracking-[0.2em] uppercase">Student</span>
              <span className="text-[10px] font-bold text-blue-400/60 uppercase tracking-widest mt-0.5 italic">Repository</span>
            </div>
          </Link>
          
          <button className="md:hidden text-muted-foreground/60 p-2" onClick={onClose}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 py-8 px-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`
                  relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${isActive ? 'bg-muted/60 text-foreground shadow-md' : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'}
                `}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  />
                )}
                <svg className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 text-blue-400' : 'opacity-40 group-hover:scale-110 group-hover:opacity-100 group-hover:text-foreground'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-border space-y-6">
          <div className="flex items-center gap-4 px-2">
            <div className="w-8 h-8 rounded-lg bg-muted/40 flex items-center justify-center border border-border">
              <span className="text-[10px] font-black text-foreground">{user?.name?.charAt(0)}</span>
            </div>
            <div className="flex flex-col min-w-0">
               <span className="text-[9px] font-black text-foreground uppercase tracking-widest truncate">{user?.name}</span>
               <button onClick={logout} className="text-[8px] font-bold text-red-500/60 hover:text-red-500 uppercase tracking-widest mt-0.5 text-left transition-colors font-sans">
                  [ sign_out ]
               </button>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
};
