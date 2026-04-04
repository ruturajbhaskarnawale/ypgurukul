"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import { DashboardCard, DashboardChart } from '@/components/dashboard/OrbitComponents';
import { apiClient, ApiError } from '@/lib/apiClient';
import { useAuth } from '@/lib/authContext';
import { motion } from 'framer-motion';
import { FaBolt, FaShield, FaClipboardList, FaFire } from 'react-icons/fa6';

// ── Types ──────────────────────────────────────────────────────────────────
interface Course { id: string; title: string; }
interface Enrollment { course: Course; }
interface StudentProfile { enrollments: Enrollment[]; }
interface UserProfile {
  id: string;
  name: string;
  email: string;
  studentProfile: StudentProfile | null;
}
interface TestResult {
  id: string;
  testName: string;
  marksObtained: number;
  totalMarks: number;
  testDate: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user: authUser, isLoading: authLoading } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push('/login');
    }
  }, [authUser, authLoading, router]);

  useEffect(() => {
    if (!authUser) return;
    const fetchData = async () => {
      try {
        const [profileData, testsData] = await Promise.all([
          apiClient.get<UserProfile>('/portal/me'),
          apiClient.get<TestResult[]>('/portal/tests'),
        ]);
        setProfile(profileData);
        setTestResults(testsData);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          router.push('/login');
        } else {
          setError('Failed to load dashboard data.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [authUser, router]);

  const firstName = profile?.name?.split(' ')[0] ?? authUser?.name?.split(' ')[0] ?? 'Student';
  const enrolledCourse = profile?.studentProfile?.enrollments?.[0]?.course?.title ?? 'Not yet enrolled';
  
  // Calculate Avg Score
  const avgScore = testResults.length > 0
    ? Math.round(testResults.reduce((sum, t) => sum + (t.marksObtained / t.totalMarks) * 100, 0) / testResults.length)
    : 0;

  // Chart Data: Academic Rhythm
  const chartData = [
    { label: '6 AM', value: 45 },
    { label: '9 AM', value: 92 },
    { label: '12 PM', value: 78 },
    { label: '3 PM', value: 62 },
    { label: '6 PM', value: 35 },
    { label: '9 PM', value: 15 },
  ];

  if (authLoading || (!profile && loading)) {
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
    <div className="space-y-10 md:space-y-16 pb-24">

      <FadeIn>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Learning Overview
          </h1>
          <p className="text-[11px] text-muted-foreground/40 font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary/40" />
            Session Portfolio: {authUser?.name}
          </p>
        </div>
      </FadeIn>

      {/* KPI Stats */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StaggerItem>
          <DashboardCard
            title="Average Score"
            value={`${avgScore}`}
            subtitle="Overall academic rank"
            variant="blue"
            trend={{ value: '12%', isUp: true }}
            icon={<FaBolt size={14} />}
          />
        </StaggerItem>
        <StaggerItem>
          <DashboardCard
            title="Course Status"
            value={enrolledCourse === 'Not yet enrolled' ? 'Pending' : 'Active'}
            subtitle={enrolledCourse}
            variant="teal"
            icon={<FaShield size={14} />}
          />
        </StaggerItem>
        <StaggerItem>
          <DashboardCard
            title="Tests Completed"
            value={testResults.length}
            subtitle="Assessments logged"
            variant="purple"
            icon={<FaClipboardList size={14} />}
          />
        </StaggerItem>
        <StaggerItem>
          <DashboardCard
            title="Study Streak"
            value="14 Days"
            subtitle="Engagement consistency"
            variant="orange"
            trend={{ value: '2d', isUp: true }}
            icon={<FaFire size={14} />}
          />
        </StaggerItem>
      </StaggerContainer>

      <div className="grid lg:grid-cols-1 gap-8">
        <FadeIn>
          <DashboardChart 
            title="Academic Rhythm"
            subtitle="Weekly study and conceptual engagement trends"
            data={chartData}
            color="var(--primary)"
          />
        </FadeIn>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
         <FadeIn>
            <div className="rounded-[2.5rem] border border-border bg-card p-10 group transition-all hover:border-primary/20">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-bold text-foreground tracking-tight">Recent Results</h3>
                  <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">View All</button>
               </div>
               <div className="space-y-8">
                 {testResults.slice(0, 4).map((test) => (
                   <div key={test.id} className="flex justify-between items-center group/item cursor-pointer border-b border-border/40 pb-6 last:border-0 last:pb-0">
                      <div className="flex flex-col gap-1">
                         <span className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-widest">{new Date(test.testDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
                         <span className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors tracking-tight">{test.testName}</span>
                      </div>
                      <div className="flex flex-col items-end gap-2.5">
                         <span className="text-lg font-bold text-foreground tabular-nums tracking-tighter">{test.marksObtained}/{test.totalMarks}</span>
                         <div className="w-24 h-1.5 bg-muted/30 rounded-full overflow-hidden shadow-inner">
                            <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${(test.marksObtained / test.totalMarks) * 100}%` }}
                               transition={{ duration: 1, delay: 0.2 }}
                               className="h-full bg-primary shadow-sm shadow-primary/20"
                            />
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
         </FadeIn>

         <FadeIn>
            <div className="rounded-[2.5rem] border border-border bg-muted/10 p-10 h-full group hover:border-primary/20 transition-all">
               <h3 className="text-xl font-bold text-foreground tracking-tight mb-10">Important Updates</h3>
               <div className="space-y-6">
                  <div className="p-6 rounded-[1.5rem] bg-card border border-border/50 shadow-sm relative overflow-hidden group/notice">
                     <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 flex items-center justify-center text-primary group-hover/notice:bg-primary/10 transition-colors">
                        <span className="text-[10px] font-black italic">!</span>
                     </div>
                     <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3 block">Essential Notice</span>
                     <p className="text-xs text-muted-foreground/60 leading-relaxed font-medium">New study materials for Thermodynamics and Advanced Mechanics have been added to your portal. Please review them before the next evaluation session.</p>
                  </div>
                  <div className="p-6 rounded-[1.5rem] bg-muted/20 border border-border/30">
                     <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mb-3 block">General Update</span>
                     <p className="text-xs text-muted-foreground/40 leading-relaxed font-normal italic">Weekly live doubt-clearing sessions will resume this Thursday at 5 PM. Link will be available on the sidebar portal.</p>
                  </div>
               </div>
            </div>
         </FadeIn>
      </div>

    </div>
  );
}
