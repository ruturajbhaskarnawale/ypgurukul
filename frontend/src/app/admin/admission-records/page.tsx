"use client";

import React from 'react';
import { RecordStatsGrid } from '@/components/admin/records-explorer/RecordStatsGrid';
import { getGlobalStats } from '@/components/admin/records-explorer/mockData';
import { motion } from 'framer-motion';
import { FaDatabase, FaLayerGroup, FaSearch } from 'react-icons/fa';

export default function GlobalRecordsPage() {
  const stats = getGlobalStats();

  return (
    <div className="space-y-10 md:space-y-12 pb-20">
      
      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <RecordStatsGrid stats={stats} />
      </motion.div>

      {/* Search & Insight Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="p-8 md:p-12 border border-border rounded-[2.5rem] bg-card space-y-10 shadow-sm"
      >
         <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-primary">
               <FaSearch size={14} />
               <h2 className="text-xl font-black tracking-tight">Records Search & Insights</h2>
            </div>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-2xl">
              This overview aggregates student data from all previous academic sessions. To view detailed student lists, please select a specific academic year from the navigation sidebar.
            </p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-muted/20 border border-border rounded-2xl flex items-center justify-between group hover:bg-muted/30 transition-all">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                     <FaLayerGroup size={16} />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Active Sessions</span>
               </div>
               <span className="text-sm font-black text-foreground">4 Active Years</span>
            </div>
            <div className="p-6 bg-muted/20 border border-border rounded-2xl flex items-center justify-between group hover:bg-muted/30 transition-all">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground group-hover:text-emerald-500 transition-colors">
                     <FaDatabase size={16} />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">System Integrity</span>
               </div>
               <span className="text-sm font-black text-emerald-500">100% Synced</span>
            </div>
         </div>
      </motion.div>

    </div>
  );
}
