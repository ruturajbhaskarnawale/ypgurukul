"use client";

import React from 'react';
import { useAuth } from '@/lib/authContext';

export const DashboardHeader = ({ title }: { title: string }) => {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-20 items-center justify-between px-8 bg-background/50 backdrop-blur-xl border-b border-border sticky top-0 z-30">
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
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

      <div className="flex items-center gap-6 ml-8">
        {/* Luminous Action Buttons */}
        <div className="flex items-center gap-3">
           <button className="p-2.5 rounded-xl border border-border bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
             </svg>
           </button>
           <button className="p-2.5 rounded-xl border border-border bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
             </svg>
           </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4 pl-6 border-l border-border">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-foreground">{user?.name}</span>
              <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{user?.role}</span>
           </div>
           <div className="w-10 h-10 rounded-xl bg-primary p-px">
              <div className="w-full h-full rounded-xl bg-primary flex items-center justify-center">
                 <span className="text-xs font-black text-primary-foreground">{user?.name?.charAt(0)}</span>
              </div>
           </div>
        </div>
      </div>
    </header>
  );
};
