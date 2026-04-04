"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { useTheme } from 'next-themes';
import { FaSearch, FaBell, FaSun, FaMoon, FaUserCircle } from 'react-icons/fa';

interface DashboardHeaderProps {
  title: string;
  onMenuOpen?: () => void;
}

export const DashboardHeader = ({ onMenuOpen }: DashboardHeaderProps) => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="flex h-16 md:h-20 items-center justify-between px-4 md:px-8 bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-30 gap-4 md:gap-8">
      
      {/* Mobile hamburger */}
      {onMenuOpen && (
        <button
          onClick={onMenuOpen}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted/50 transition-all shrink-0"
          aria-label="Open menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Modern Search bar */}
      <div className="hidden md:flex flex-1 max-w-xl">
        <div className="relative group w-full">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <FaSearch className="w-3.5 h-3.5 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search for courses, records, or students..."
            className="w-full bg-muted/40 border border-border rounded-xl py-2.5 pl-11 pr-4 text-xs font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/30 focus:bg-background focus:ring-4 focus:ring-primary/5 transition-all"
          />
        </div>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <div className="hidden sm:flex items-center gap-2">
          <button 
            className="flex items-center justify-center h-10 w-10 rounded-xl border border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all"
            aria-label="Notifications"
          >
            <FaBell size={14} />
          </button>
          
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center h-10 w-10 rounded-xl border border-border text-muted-foreground hover:bg-muted/50 hover:text-primary transition-all relative group"
            aria-label="Toggle Theme"
          >
            {mounted && (
              theme === 'dark' ? (
                <FaSun size={14} className="animate-in spin-in-90 duration-500" />
              ) : (
                <FaMoon size={14} className="animate-in slide-in-from-top-2 duration-500" />
              )
            )}
            {!mounted && <div className="w-3.5 h-3.5 rounded-full bg-muted animate-pulse" />}
            
            {mounted && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </div>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 pl-2 md:pl-6 md:border-l md:border-border">
          <div className="hidden xs:flex flex-col items-end">
            <span className="text-xs font-black text-foreground tracking-tight">{user?.name}</span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none mt-1">{user?.role}</span>
          </div>
          {/* User Icon or Initial */}
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
            {user?.name ? (
              <span className="text-xs font-black text-primary-foreground">{user?.name.charAt(0)}</span>
            ) : (
              <FaUserCircle className="text-primary-foreground" size={18} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
