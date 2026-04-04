"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FadeIn, SlideUp } from '@/components/animations/MotionUtils';
import { Card, CardContent } from '@/components/global/Card';
import { apiClient, ApiError } from '@/lib/apiClient';
import { useAuth } from '@/lib/authContext';
import { FaChartBar, FaGraduationCap, FaCalendarCheck, FaAward } from 'react-icons/fa6';
import { motion } from 'framer-motion';

interface TestResult {
  id: string;
  testName: string;
  marksObtained: number;
  totalMarks: number;
  testDate: string;
}

const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-muted/40 rounded-xl ${className}`} />
);

function getSubject(testName: string): string {
  const lower = testName.toLowerCase();
  if (lower.includes('physics')) return 'Physics';
  if (lower.includes('chem')) return 'Chemistry';
  if (lower.includes('math')) return 'Mathematics';
  if (lower.includes('bio')) return 'Biology';
  return 'General';
}

export default function TestResultsPage() {
  const router = useRouter();
  const { user: authUser, isLoading: authLoading } = useAuth();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !authUser) router.push('/login');
  }, [authUser, authLoading, router]);

  useEffect(() => {
    if (!authUser) return;
    const fetchResults = async () => {
      try {
        const data = await apiClient.get<TestResult[]>('/portal/tests');
        setTestResults(data);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) router.push('/login');
        else setError('Unable to load test results at the moment.');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [authUser, router]);

  const subjectMap: Record<string, { total: number; count: number }> = {};
  testResults.forEach((t) => {
    const sub = getSubject(t.testName);
    if (!subjectMap[sub]) subjectMap[sub] = { total: 0, count: 0 };
    subjectMap[sub].total += (t.marksObtained / t.totalMarks) * 100;
    subjectMap[sub].count += 1;
  });
  
  const subjectAvg = Object.entries(subjectMap).map(([name, { total, count }]) => ({
    name,
    avg: Math.round(total / count),
  }));

  const chartTests = [...testResults].reverse().slice(0, 5);

  if (authLoading || loading) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto w-full pb-20">
        <Skeleton className="h-12 w-80" />
        <div className="grid lg:grid-cols-3 gap-8">
          <Skeleton className="lg:col-span-2 h-96" />
          <Skeleton className="h-96" />
        </div>
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto w-full pb-24">
      <FadeIn>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Academic Performance
          </h1>
          <p className="text-sm text-muted-foreground/60 font-medium">
            Monitor your progress, subject mastery, and session rankings in one place.
          </p>
        </div>
      </FadeIn>

      {testResults.length === 0 ? (
        <FadeIn>
          <div className="p-20 text-center bg-muted/10 border border-dashed border-border rounded-[2.5rem]">
            <p className="text-sm text-muted-foreground font-medium italic">
              No recent test data found. Your scores will appear here after the next evaluation.
            </p>
          </div>
        </FadeIn>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Learning Trends Chart */}
            <SlideUp className="lg:col-span-2">
              <Card className="h-full border-border/50 shadow-sm rounded-[2.5rem] overflow-hidden bg-card">
                <CardContent className="p-8 md:p-10">
                  <div className="flex justify-between items-center mb-10">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                           <FaChartBar size={16} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground tracking-tight">Learning Trends</h3>
                     </div>
                  </div>
                  
                  <div className="w-full h-72 flex items-end justify-around px-4 sm:px-10 pb-10 relative">
                    <div className="absolute left-0 top-0 bottom-10 flex flex-col justify-between text-[10px] font-bold text-muted-foreground/30 font-mono">
                      <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
                    </div>
                    {chartTests.map((t, i) => {
                      const pct = Math.round((t.marksObtained / t.totalMarks) * 100);
                      return (
                        <div key={t.id} className="flex-1 flex flex-col items-center gap-4 group relative max-w-[60px]">
                          <div className="relative w-full h-full flex items-end justify-center">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${pct * 2}px` }}
                              transition={{ duration: 1, type: "spring", bounce: 0.1 }}
                              className="w-10 sm:w-12 bg-primary/20 group-hover:bg-primary transition-all duration-300 rounded-t-xl group-hover:shadow-lg group-hover:shadow-primary/20"
                            />
                            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all bg-foreground text-background text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-xl z-20">
                              {pct}%
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-muted-foreground/40 group-hover:text-foreground transition-colors overflow-hidden text-ellipsis whitespace-nowrap p-1">
                            {t.testName.split(' ')[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-center text-[10px] uppercase font-bold tracking-widest text-muted-foreground/20 italic">Score history overview across current cycle</p>
                </CardContent>
              </Card>
            </SlideUp>

            {/* Subject Mastery */}
            <SlideUp delay={0.2}>
              <Card className="h-full bg-primary text-primary-foreground border-0 shadow-2xl rounded-[2.5rem] overflow-hidden">
                <CardContent className="p-8 md:p-10 space-y-10">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                        <FaGraduationCap size={18} />
                     </div>
                     <h3 className="text-xl font-bold tracking-tight">Subject Mastery</h3>
                  </div>
                  <div className="space-y-8">
                    {subjectAvg.map(({ name, avg }) => (
                      <div key={name} className="space-y-3">
                        <div className="flex justify-between items-end">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-primary-foreground/90">{name}</span>
                          <span className="text-lg font-black tracking-tighter tabular-nums">{avg}%</span>
                        </div>
                        <div className="w-full bg-primary-foreground/15 rounded-full h-2 shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${avg}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-primary-foreground shadow-sm"
                          />
                        </div>
                        <p className="text-[9px] font-bold text-primary-foreground/40 uppercase tracking-widest text-right">
                           {avg >= 85 ? 'Outstanding' : avg >= 70 ? 'Proficient' : 'Improving'}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SlideUp>
          </div>

          {/* Detailed History */}
          <SlideUp delay={0.3}>
            <div className="flex items-center justify-between px-2 mb-6 mt-12">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-muted/20 flex items-center justify-center text-muted-foreground">
                     <FaCalendarCheck size={16} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground tracking-tight">Examination History</h3>
               </div>
            </div>
            
            <div className="bg-card border border-border/50 rounded-[2.5rem] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-muted/10 text-muted-foreground/40 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-border/40">
                    <tr>
                      <th className="px-10 py-6">Test Name</th>
                      <th className="px-10 py-6">Conducted Date</th>
                      <th className="px-10 py-6 text-center">Score Portfolio</th>
                      <th className="px-10 py-6 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {testResults.map((result) => {
                      const pct = Math.round((result.marksObtained / result.totalMarks) * 100);
                      return (
                        <tr key={result.id} className="hover:bg-muted/5 transition-colors group">
                          <td className="px-10 py-8 font-bold text-foreground text-sm tracking-tight">{result.testName}</td>
                          <td className="px-10 py-8 text-muted-foreground/60 text-xs font-semibold">
                            {new Date(result.testDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="px-10 py-8 font-black text-center text-foreground tabular-nums text-lg tracking-tighter">
                            {result.marksObtained}<span className="text-muted-foreground/30 font-bold mx-1">/</span>{result.totalMarks}
                          </td>
                          <td className="px-10 py-8 text-right">
                            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold border transition-all ${
                               pct >= 85 ? 'bg-primary text-primary-foreground border-transparent shadow-[0_4px_12px_rgba(var(--primary-rgb),0.2)]' : 
                               pct >= 70 ? 'bg-muted/20 text-foreground border-border/50' : 
                               'bg-muted/10 text-muted-foreground border-border/20'
                            }`}>
                               <FaAward size={10} className={pct >= 85 ? 'opacity-100' : 'opacity-20'} />
                               {pct >= 85 ? 'Honours' : pct >= 70 ? 'Merit' : 'General'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </SlideUp>
        </>
      )}
    </div>
  );
}
