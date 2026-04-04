"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { motion } from 'framer-motion';
import { 
  FaChartPie, FaUserPlus, FaFileAlt, FaBookOpen, 
  FaFolderOpen, FaCheckDouble, FaSignOutAlt, FaArrowLeft
} from 'react-icons/fa';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard overview', href: '/admin', icon: <FaChartPie size={16} /> },
    { name: 'Admission Form', href: '/admin/admission-form', icon: <FaUserPlus size={16} /> },
    { name: 'Admission Records', href: '/admin/admission-records', icon: <FaFileAlt size={16} /> },
    { name: 'Applications', href: '/admin/applications', icon: <FaFolderOpen size={16} /> },
    { name: 'Course Modules', href: '/admin/courses', icon: <FaBookOpen size={16} /> },
    { name: 'Study Materials', href: '/admin/materials', icon: <FaFolderOpen size={16} /> },
    { name: 'Test Results', href: '/admin/tests', icon: <FaCheckDouble size={16} /> },
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
    w-72 bg-card border-r border-border flex flex-col h-[100dvh]
    fixed md:sticky top-0 z-50 transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
  `;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={sidebarClasses}>
        
        {/* Branding Area */}
        <div className="h-20 flex items-center justify-between px-8 border-b border-border">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-xs font-black text-primary-foreground">YP</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-black text-foreground tracking-tight">Admin Portal</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Control Center</span>
            </div>
          </Link>
          
          <button className="md:hidden text-muted-foreground hover:text-foreground p-2" onClick={onClose}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-8 px-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] mb-4">Main Menu</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`
                  relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}
                `}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeAdminNav"
                    className="absolute left-0 w-1 h-5 bg-primary rounded-r-full"
                  />
                )}
                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'opacity-70 group-hover:scale-110 group-hover:opacity-100'}`}>
                  {item.icon}
                </span>
                <span className={`text-xs font-bold ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-border bg-muted/20 space-y-3">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-background hover:text-foreground transition-all group"
          >
            <FaArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold">Back to Website</span>
          </Link>

          <button 
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all font-bold"
          >
            <FaSignOutAlt size={14} />
            <span className="text-xs">Log Out</span>
          </button>
        </div>

      </aside>
    </>
  );
};
