"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import { DashboardCard, DashboardChart } from '@/components/dashboard/OrbitComponents';
import { apiClient, ApiError } from '@/lib/apiClient';
import { useAuth } from '@/lib/authContext';
import { motion } from 'framer-motion';

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
  const enrolledCourse = profile?.studentProfile?.enrollments?.[0]?.course?.title ?? 'NO_ACTIVE_ENROLLMENT';
  
  // Calculate Avg Score
  const avgScore = testResults.length > 0
    ? Math.round(testResults.reduce((sum, t) => sum + (t.marksObtained / t.totalMarks) * 100, 0) / testResults.length)
    : 0;

  // Chart Data (Mocking rhythm based on scores)
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
    <div className="space-y-6 md:space-y-12 pb-12 md:pb-24">

      <FadeIn>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-none">
            Insights
          </h1>
          <p className="text-xs text-muted-foreground tracking-widest uppercase font-bold">
            ARCHIVAL_NODE: ST_DB_{authUser?.id?.slice(0, 8)}
          </p>
        </div>
      </FadeIn>

      {/* KPI Stats */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StaggerItem>
          <DashboardCard
            title="Avg. Academic Rank"
            value={`${avgScore}/100`}
            subtitle="PEAK PERFORMANCE_INDEX"
            variant="blue"
            trend={{ value: '12%', isUp: true }}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
        </StaggerItem>
        <StaggerItem>
          <DashboardCard
            title="Program Integrity"
            value={enrolledCourse === 'NO_ACTIVE_ENROLLMENT' ? 'OFFLINE' : 'STABLE'}
            subtitle={enrolledCourse}
            variant="teal"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
          />
        </StaggerItem>
        <StaggerItem>
          <DashboardCard
            title="Assessments Logged"
            value={testResults.length}
            subtitle="TOTAL_UNIT_SESSIONS"
            variant="purple"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2" />
              </svg>
            }
          />
        </StaggerItem>
        <StaggerItem>
          <DashboardCard
            title="Consistently Streak"
            value="14"
            subtitle="DAYS_ACTIVE"
            variant="orange"
            trend={{ value: '2d', isUp: true }}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.99 7.99 0 0120 13a7.99 7.99 0 01-2.343 5.657z" />
              </svg>
            }
          />
        </StaggerItem>
      </StaggerContainer>

      <div className="grid lg:grid-cols-1 gap-8">
        <FadeIn>
          <DashboardChart 
            title="Academic Rhythm"
            subtitle="Visualizing peak conceptual engagement across cycle"
            data={chartData}
            color="#000000"
          />
        </FadeIn>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
         <FadeIn>
            <div className="rounded-2xl border border-border bg-muted p-8">
               <h3 className="text-xl font-black text-foreground tracking-tight uppercase mb-8">Recent Results</h3>
               <div className="space-y-6">
                 {testResults.slice(0, 4).map((test) => (
                   <div key={test.id} className="flex justify-between items-center group cursor-pointer border-b border-border/40 pb-4 last:border-0 last:pb-0">
                      <div className="flex flex-col">
                         <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mb-1">{test.testDate.split('T')[0]}</span>
                         <span className="text-sm font-black text-foreground group-hover:text-muted-foreground transition-colors uppercase tracking-tight">{test.testName}</span>
                      </div>
                      <div className="text-right">
                         <span className="text-lg font-black text-foreground tracking-tighter">{test.marksObtained}/{test.totalMarks}</span>
                         <div className="w-24 h-1 bg-muted rounded-full mt-2 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(test.marksObtained / test.totalMarks) * 100}%` }}
                              className="h-full bg-primary"
                            />
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
         </FadeIn>

         <FadeIn>
            <div className="rounded-2xl border border-border bg-secondary/10 p-8 h-full">
               <h3 className="text-xl font-black text-foreground tracking-tight uppercase mb-8">Announcements</h3>
               <div className="space-y-6">
                  <div className="p-4 rounded-sm bg-background border border-foreground shadow-sm relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-8 h-8 bg-foreground text-background flex items-center justify-center">
                        <span className="text-[8px] font-black italic">!</span>
                     </div>
                     <span className="text-[9px] font-black text-foreground uppercase tracking-[0.3em] mb-2 block">CRITICAL_NOTICE</span>
                     <p className="text-xs text-muted-foreground leading-relaxed">JEE Advanced practice modules for Thermodynamics have been pushed to the Study Materials repository. Verify checksum before download.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/10 border border-border">
                     <span className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-[0.3em] mb-2 block">ROUTINE_PATCH</span>
                     <p className="text-xs text-muted-foreground/40 leading-relaxed">Weekly doubt clearing cycle begins Monday. Ensure your conceptual queries are logged in the student terminal.</p>
                  </div>
               </div>
            </div>
         </FadeIn>
      </div>

    </div>
  );
}
