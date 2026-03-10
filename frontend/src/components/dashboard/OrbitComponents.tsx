"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isUp?: boolean;
  };
  className?: string;
  variant?: 'blue' | 'teal' | 'purple' | 'orange';
}

export const DashboardCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  className,
  variant = 'blue' 
}: DashboardCardProps) => {
  const glowColors = {
    blue: 'from-blue-500/20 to-transparent',
    teal: 'from-teal-500/20 to-transparent',
    purple: 'from-purple-500/20 to-transparent',
    orange: 'from-orange-500/20 to-transparent',
  };

  const iconColors = {
    blue: 'text-blue-400 bg-blue-400/10',
    teal: 'text-teal-400 bg-teal-400/10',
    purple: 'text-purple-400 bg-purple-400/10',
    orange: 'text-orange-400 bg-orange-400/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-muted p-6 transition-all hover:border-foreground/10",
        className
      )}
    >
      {/* Luminous Glow */}
      <div className={cn("absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br blur-3xl opacity-50", glowColors[variant])} />
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-black text-foreground tracking-tighter">{value}</h3>
          {subtitle && (
            <p className="text-[10px] font-medium text-muted-foreground/60 mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className={cn("p-2.5 rounded-xl border border-border", iconColors[variant])}>
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
          <span className={cn(
            "text-[9px] font-bold uppercase tracking-widest",
            trend.isUp ? "text-teal-400" : "text-orange-400"
          )}>
            {trend.isUp ? '↑' : '↓'} {trend.value}
          </span>
          <span className="text-[9px] text-muted-foreground/40 uppercase tracking-widest">vs last session</span>
        </div>
      )}
    </motion.div>
  );
};

interface BarData {
  label: string;
  value: number; // 0 to 100
}

interface DashboardChartProps {
  title: string;
  subtitle?: string;
  data: BarData[];
  className?: string;
  color?: string;
}

export const DashboardChart = ({ title, subtitle, data, className, color = "#3B82F6" }: DashboardChartProps) => {
  return (
    <div className={cn("rounded-2xl border border-border bg-muted p-8", className)}>
      <div className="flex justify-between items-start mb-12">
        <div>
          <h4 className="text-xl font-black text-foreground tracking-tight uppercase">{title}</h4>
          {subtitle && <p className="text-xs text-muted-foreground lowercase mt-1 tracking-wide">{subtitle}</p>}
        </div>
        <div className="p-2 border border-border rounded-lg bg-muted/20">
           <svg className="w-5 h-5 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16" />
           </svg>
        </div>
      </div>

      <div className="flex items-end justify-between h-64 gap-4 px-2">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center group">
            <div className="relative w-full flex-1 flex items-end justify-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${item.value}%` }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="w-full max-w-[40px] rounded-t-xl relative overflow-hidden group-hover:brightness-125 transition-all"
                style={{ 
                  background: `linear-gradient(to top, ${color}20, ${color}dd)`,
                  boxShadow: `0 0 20px ${color}10`
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-4 bg-white/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              {/* Tooltip on hover */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background text-foreground text-[9px] font-black px-2 py-1 rounded border border-border">
                {item.value}%
              </div>
            </div>
            <span className="mt-6 text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest group-hover:text-foreground transition-colors">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-12 p-4 rounded-xl border border-border bg-muted/10 flex items-center justify-center gap-4">
         <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse" />
         <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Optimal performance detected between <span className="text-foreground">9—11 AM</span>
         </p>
      </div>
    </div>
  );
};
