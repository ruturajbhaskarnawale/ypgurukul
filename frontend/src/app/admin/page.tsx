"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DashboardCard, DashboardChart } from '@/components/dashboard/OrbitComponents';
import { apiClient } from '@/lib/apiClient';
import { useAuth } from '@/lib/authContext';
import { 
  FaPlus, FaCloudArrowUp, FaUsersGear, FaArrowTrendUp, 
  FaRegCircleCheck, FaTriangleExclamation, FaInfo
} from 'react-icons/fa6';

interface AdminStats {
  totalCourses: number;
  totalMaterials: number;
  totalApplications: number;
  totalResults: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user: authUser, isLoading: authLoading } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && (!authUser || authUser.role !== 'ADMIN')) {
      router.push('/login');
    }
  }, [authUser, authLoading, router]);

  useEffect(() => {
    if (!authUser || authUser.role !== 'ADMIN') return;
    const fetchData = async () => {
      try {
        const data = await apiClient.get<AdminStats>('/admin/stats');
        setStats(data);
      } catch (err) {
         setError('Unable to load current administrative data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [authUser, router]);

  // Chart: Application Inflow (Weekly Trends)
  const chartData = [
    { label: 'Mon', value: 45 },
    { label: 'Tue', value: 82 },
    { label: 'Wed', value: 68 },
    { label: 'Thu', value: 95 },
    { label: 'Fri', value: 55 },
    { label: 'Sat', value: 25 },
    { label: 'Sun', value: 12 },
  ];

  if (authLoading || (!stats && loading)) {
    return (
      <div className="space-y-12 animate-pulse">
        <div className="h-10 w-64 bg-muted/40 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-muted/40 rounded-2xl" />)}
        </div>
        <div className="h-[400px] bg-muted/40 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-10 md:space-y-12 pb-24">
      
      {/* Header Section */}
      <div className="flex flex-col gap-3">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-5xl font-black text-foreground tracking-tight"
        >
          Management Overview
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-muted-foreground/60 flex items-center gap-2.5 font-medium"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20" />
          System Operational • Welcome back, {authUser?.name}.
        </motion.p>
      </div>

      {/* Main KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Candidate Applications"
          value={stats?.totalApplications || 0}
          subtitle="Pending reviews"
          variant="orange"
          trend={{ value: '12%', isUp: true }}
          icon={<FaUsersGear size={16} />}
        />
        <DashboardCard
          title="Active Courses"
          value={stats?.totalCourses || 0}
          subtitle="Academic curriculum"
          variant="blue"
          icon={<FaArrowTrendUp size={16} />}
        />
        <DashboardCard
          title="Exam Records"
          value={stats?.totalResults || 0}
          subtitle="Evaluations completed"
          variant="teal"
          trend={{ value: '55', isUp: true }}
          icon={<FaRegCircleCheck size={16} />}
        />
        <DashboardCard
          title="Digital Resources"
          value={stats?.totalMaterials || 0}
          subtitle="Study materials"
          variant="purple"
          icon={<FaCloudArrowUp size={16} />}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2">
          <DashboardChart 
            title="Application Inflow"
            subtitle="Candidate interest trends over the current week"
            data={chartData}
            color="var(--primary)"
          />
        </div>

        {/* Quick Actions Card */}
        <div className="rounded-[2.5rem] border border-border bg-card p-10 flex flex-col h-full group hover:border-primary/20 transition-all">
           <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-bold text-foreground tracking-tight">Quick Actions</h3>
              <FaInfo className="text-muted-foreground/30" size={12} />
           </div>
           <div className="flex flex-col gap-4">
              <button className="flex items-center gap-5 p-5 rounded-2xl border border-border/50 bg-muted/10 hover:bg-primary/5 hover:border-primary/30 transition-all text-left group/btn">
                 <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center border border-border group-hover/btn:text-primary transition-colors shadow-sm">
                    <FaPlus size={14} />
                 </div>
                 <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-bold text-foreground tracking-tight">Add New Course</p>
                    <p className="text-[10px] text-muted-foreground/60 font-medium">Deploy a new module</p>
                 </div>
              </button>
              <button className="flex items-center gap-5 p-5 rounded-2xl border border-border/50 bg-muted/10 hover:bg-primary/5 hover:border-primary/30 transition-all text-left group/btn">
                 <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center border border-border group-hover/btn:text-primary transition-colors shadow-sm">
                    <FaCloudArrowUp size={14} />
                 </div>
                 <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-bold text-foreground tracking-tight">Upload Resources</p>
                    <p className="text-[10px] text-muted-foreground/60 font-medium">Add new study PDFs</p>
                 </div>
              </button>
              <button className="flex items-center gap-5 p-5 rounded-2xl border border-border/50 bg-muted/10 hover:bg-primary/5 hover:border-primary/30 transition-all text-left group/btn">
                 <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center border border-border group-hover/btn:text-primary transition-colors shadow-sm">
                    <FaUsersGear size={14} />
                 </div>
                 <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-bold text-foreground tracking-tight">Review Records</p>
                    <p className="text-[10px] text-muted-foreground/60 font-medium">Check pending inbox</p>
                 </div>
              </button>
           </div>
        </div>
      </div>

      {/* System Status / Health (Professional Layout) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
         <div className="rounded-[2rem] border border-border bg-card p-6 flex items-center justify-between group hover:border-emerald-500/20 transition-all">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shadow-sm shadow-emerald-500/10">
                  <FaRegCircleCheck size={18} />
               </div>
               <div>
                  <p className="text-sm font-bold text-foreground tracking-tight">Database Connectivity</p>
                  <p className="text-[10px] text-muted-foreground/60 font-medium tracking-tight">Synched and operational</p>
               </div>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full uppercase">Healthy</span>
         </div>
         <div className="rounded-[2rem] border border-border bg-card p-6 flex items-center justify-between group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm shadow-primary/10">
                  <FaRegCircleCheck size={18} />
               </div>
               <div>
                  <p className="text-sm font-bold text-foreground tracking-tight">Security Protocol</p>
                  <p className="text-[10px] text-muted-foreground/60 font-medium tracking-tight">Auth modules verified</p>
               </div>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">Secure</span>
         </div>
         <div className="rounded-[2rem] border border-border bg-card p-6 flex items-center justify-between group hover:border-orange-500/20 transition-all">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 shadow-sm shadow-orange-500/10">
                  <FaTriangleExclamation size={18} />
               </div>
               <div>
                  <p className="text-sm font-bold text-foreground tracking-tight">Network Activity</p>
                  <p className="text-[10px] text-muted-foreground/60 font-medium tracking-tight">Moderate traffic detected</p>
               </div>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-orange-600 bg-orange-500/10 px-3 py-1 rounded-full uppercase">Normal</span>
         </div>
      </div>

    </div>
  );
}
