"use client";

import React from 'react';
import { useAuth } from '@/lib/authContext';

interface DashboardHeaderProps {
  title: string;
  onMenuOpen?: () => void;
}

export const DashboardHeader = ({ title, onMenuOpen }: DashboardHeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="flex h-14 md:h-20 items-center justify-between px-4 md:px-8 bg-background/50 backdrop-blur-xl border-b border-border sticky top-0 z-30 gap-3">
      
      {/* Mobile hamburger — shown on md and below */}
      {onMenuOpen && (
        <button
          onClick={onMenuOpen}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors shrink-0"
          aria-label="Open menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Search bar — hidden on mobile, visible on md+ */}
      <div className="hidden md:flex flex-1 max-w-2xl">
        <div className="relative group w-full">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-foreground/20 group-focus-within:text-foreground/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search resources, records, results..."
            className="w-full bg-muted/30 border border-border rounded-xl py-2.5 pl-12 pr-4 text-[10px] uppercase font-bold tracking-[0.2em] text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-foreground/20 focus:bg-muted/50 transition-all font-sans"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2 md:gap-6 ml-auto">
        {/* Action buttons — hidden on mobile */}
        <div className="hidden sm:flex items-center gap-3">
          <button className="p-2.5 rounded-xl border border-border bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="p-2.5 rounded-xl border border-border bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 md:gap-4 md:pl-6 md:border-l md:border-border">
          {/* Name + role — hidden on very small screens */}
          <div className="hidden xs:flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-foreground leading-tight">{user?.name}</span>
            <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{user?.role}</span>
          </div>
          {/* Avatar — always visible */}
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <span className="text-xs font-black text-primary-foreground">{user?.name?.charAt(0)}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
