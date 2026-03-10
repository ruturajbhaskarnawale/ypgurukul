"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import { DashboardCard, DashboardChart } from '@/components/dashboard/OrbitComponents';
import { apiClient, ApiError } from '@/lib/apiClient';
import { useAuth } from '@/lib/authContext';

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
         setError('Failed to load administrative metrics.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [authUser, router]);

  // Mocking Application Rhythm
  const chartData = [
    { label: 'MON', value: 45 },
    { label: 'TUE', value: 82 },
    { label: 'WED', value: 68 },
    { label: 'THU', value: 95 },
    { label: 'FRI', value: 55 },
    { label: 'SAT', value: 25 },
    { label: 'SUN', value: 12 },
  ];

  if (authLoading || (!stats && loading)) {
    return (
      <div className="space-y-12 animate-pulse">
        <div className="h-12 w-64 bg-muted/40 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-muted/40 rounded-2xl" />)}
        </div>
        <div className="h-96 bg-muted/40 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-24">
      
      <FadeIn>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-none">
            Governance
          </h1>
          <p className="text-[10px] text-muted-foreground tracking-widest uppercase font-black">
            SYSTEM_STATUS: OPERATIONAL_LEVEL_01
          </p>
        </div>
      </FadeIn>

      {/* KPI Stats */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StaggerItem>
          <DashboardCard
            title="Active Requisitions"
            value={stats?.totalApplications || 0}
            subtitle="CANDIDATE_POOL_SIZE"
            variant="orange"
            trend={{ value: '8%', isUp: true }}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
        </StaggerItem>
        <StaggerItem>
          <DashboardCard
            title="Academic Modules"
            value={stats?.totalCourses || 0}
            subtitle="DEPLOYED_PROGRAMS"
            variant="blue"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
        </StaggerItem>
        <StaggerItem>
          <DashboardCard
            title="Assessment Logs"
            value={stats?.totalResults || 0}
            subtitle="EVALUATION_SESSIONS"
            variant="teal"
            trend={{ value: '142', isUp: true }}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
        </StaggerItem>
        <StaggerItem>
          <DashboardCard
            title="Archival Assets"
            value={stats?.totalMaterials || 0}
            subtitle="TOTAL_RESOURCES"
            variant="purple"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
              </svg>
            }
          />
        </StaggerItem>
      </StaggerContainer>

      <div className="grid lg:grid-cols-1 gap-8">
        <FadeIn>
          <DashboardChart 
            title="Application Inflow"
            subtitle="Visualizing candidate interest over the current archival cycle"
            data={chartData}
            color="#000000"
          />
        </FadeIn>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
         <FadeIn>
            <div className="rounded-3xl border border-border bg-secondary/10 p-10">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-black text-foreground tracking-tight uppercase">Quick Actions</h3>
                  <span className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.4em]">Administrative_Access</span>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <button className="p-8 rounded-2xl border border-border bg-background hover:bg-foreground hover:text-background transition-all text-left group shadow-sm">
                     <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest block mb-2 group-hover:text-background/40 transition-colors">01. DEPLOY</span>
                     <p className="text-xs font-black uppercase tracking-widest">NEW_COURSE</p>
                  </button>
                  <button className="p-8 rounded-2xl border border-border bg-background hover:bg-foreground hover:text-background transition-all text-left group shadow-sm">
                     <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest block mb-2 group-hover:text-background/40 transition-colors">02. APPEND</span>
                     <p className="text-xs font-black uppercase tracking-widest">STUDY_MATERIAL</p>
                  </button>
                  <button className="p-8 rounded-2xl border border-border bg-background hover:bg-foreground hover:text-background transition-all text-left group shadow-sm">
                     <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest block mb-2 group-hover:text-background/40 transition-colors">03. OVERSEE</span>
                     <p className="text-xs font-black uppercase tracking-widest">ALL_APPLICATIONS</p>
                  </button>
                  <button className="p-8 rounded-2xl border border-border bg-background hover:bg-foreground hover:text-background transition-all text-left group shadow-sm">
                     <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest block mb-2 group-hover:text-background/40 transition-colors">04. ANALYZE</span>
                     <p className="text-xs font-black uppercase tracking-widest">RESULT_MATRICS</p>
                  </button>
               </div>
            </div>
         </FadeIn>

         <FadeIn>
            <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-10 h-full">
               <h3 className="text-xl font-black text-foreground tracking-tight uppercase mb-10">System Health</h3>
               <div className="space-y-8">
                  <div className="flex items-center justify-between p-6 rounded-2xl bg-background border border-border shadow-sm">
                     <div className="flex items-center gap-6">
                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                        <span className="text-[10px] font-black text-foreground uppercase tracking-widest">Database_Sync</span>
                     </div>
                     <span className="text-[9px] font-black text-primary uppercase tracking-widest">ACTIVE</span>
                  </div>
                  <div className="flex items-center justify-between p-6 rounded-2xl bg-background border border-border shadow-sm">
                     <div className="flex items-center gap-6">
                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                        <span className="text-[10px] font-black text-foreground uppercase tracking-widest">Auth_Protocol</span>
                     </div>
                     <span className="text-[9px] font-black text-primary uppercase tracking-widest">SECURE</span>
                  </div>
                  <div className="flex items-center justify-between p-6 rounded-2xl bg-background border border-border shadow-sm">
                     <div className="flex items-center gap-6">
                        <div className="w-2 h-2 rounded-full bg-primary/40" />
                        <span className="text-[10px] font-black text-foreground uppercase tracking-widest">Resource_Load</span>
                     </div>
                     <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">NOMINAL</span>
                  </div>
               </div>
            </div>
         </FadeIn>
      </div>

    </div>
  );
}
