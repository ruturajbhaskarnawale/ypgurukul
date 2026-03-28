"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const RecordStatsGrid = ({ stats }: { stats?: any }) => {
  const displayStats = stats || {
    totalStudents: 125,
    revenue: "₹45,25,000",
    arrears: "₹3,40,000"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div className="p-8 bg-muted/10 border border-border rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
           <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">TOTAL_ENROLLMENT</span>
           <div className="w-2 h-2 rounded-full bg-primary" />
        </div>
        <div className="flex items-baseline gap-2">
           <span className="text-4xl font-black tracking-tighter">{displayStats.totalStudents}</span>
           <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic opacity-40">Students</span>
        </div>
      </div>

      <div className="p-8 bg-muted/10 border border-border rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
           <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">REVENUE_COLLECTED</span>
           <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <div className="flex items-baseline gap-2">
           <span className="text-4xl font-black tracking-tighter">{displayStats.revenue}</span>
        </div>
      </div>

      <div className="p-8 bg-foreground text-background rounded-3xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
           <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">PENDING_ARREARS</span>
           <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
        </div>
        <div className="flex items-baseline gap-2">
           <span className="text-4xl font-black tracking-tighter italic">{displayStats.arrears}</span>
        </div>
      </div>

    </div>
  );
};
