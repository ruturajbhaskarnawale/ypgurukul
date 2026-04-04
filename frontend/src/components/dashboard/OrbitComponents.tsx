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
  const accentColors = {
    blue: 'border-primary/20 bg-primary/5 text-primary',
    teal: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-600',
    purple: 'border-purple-500/20 bg-purple-500/5 text-purple-600',
    orange: 'border-orange-500/20 bg-orange-500/5 text-orange-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 md:p-8 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5",
        className
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] font-bold text-muted-foreground/60 tracking-tight">{title}</p>
          <h3 className="text-3xl font-bold text-foreground tracking-tight">{value}</h3>
          {subtitle && (
            <p className="text-[10px] font-medium text-muted-foreground/40 italic">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className={cn("p-3 rounded-2xl border flex items-center justify-center shadow-sm", accentColors[variant])}>
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/40">
          <div className={cn(
            "flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold tracking-tight",
            trend.isUp ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"
          )}>
            {trend.isUp ? '↑' : '↓'} {trend.value}
          </div>
          <span className="text-[10px] text-muted-foreground/30 font-medium">vs last month</span>
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

export const DashboardChart = ({ title, subtitle, data, className, color = "var(--primary)" }: DashboardChartProps) => {
  return (
    <div className={cn("rounded-[2.5rem] border border-border bg-card p-8 md:p-10", className)}>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-12">
        <div className="flex flex-col gap-1">
          <h4 className="text-2xl font-bold text-foreground tracking-tight leading-none">{title}</h4>
          {subtitle && <p className="text-sm text-muted-foreground/60 mt-1.5 font-medium">{subtitle}</p>}
        </div>
        <div className="p-3 border border-border/50 rounded-2xl bg-muted/20 text-muted-foreground/40">
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16" />
           </svg>
        </div>
      </div>

      <div className="overflow-x-auto -mx-2 px-2">
        <div className="flex items-end justify-between h-48 sm:h-56 md:h-64 gap-3 sm:gap-6 px-2 min-w-[320px]">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center group">
            <div className="relative w-full flex-1 flex items-end justify-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${item.value}%` }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: "circOut" }}
                className="w-full max-w-[40px] rounded-t-xl relative overflow-hidden group-hover:opacity-80 transition-all shadow-sm"
                style={{ 
                  background: `linear-gradient(to top, var(--primary), ${color})`,
                  opacity: 0.85
                }}
              />
              {/* Tooltip on hover */}
              <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-2 bg-foreground text-background text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-10 pointer-events-none mb-1">
                {item.value} Points
              </div>
            </div>
            <span className="mt-8 text-[11px] font-bold text-muted-foreground/40 group-hover:text-primary transition-colors tracking-tight">
              {item.label}
            </span>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};
