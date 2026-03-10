"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import { Card, CardContent } from '@/components/global/Card';
import { apiClient, ApiError } from '@/lib/apiClient';
import { useAuth } from '@/lib/authContext';

interface TestResult {
  id: string;
  testName: string;
  marksObtained: number;
  totalMarks: number;
  testDate: string;
}

const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-muted rounded ${className}`} />
);

// Derive subject from test name heuristic (e.g., "Physics Mock Test" → "Physics")
function getSubject(testName: string): string {
  const lower = testName.toLowerCase();
  if (lower.includes('physics')) return 'Physics';
  if (lower.includes('chem')) return 'Chemistry';
  if (lower.includes('math') || lower.includes('maths')) return 'Mathematics';
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
        else setError('Failed to load test results. Check if the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [authUser, router]);

  // Subject-wise averages
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

  // Chart bars grayscale palette
  const chartTests = [...testResults].reverse().slice(0, 4);
  const barColors = ['bg-primary/20', 'bg-primary/40', 'bg-primary/60', 'bg-primary/80'];

  if (authLoading || loading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto w-full">
        <Skeleton className="h-10 w-64" />
        <div className="grid lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-80" />
          <Skeleton className="h-80" />
        </div>
        <Skeleton className="h-64 mt-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto w-full p-8 text-center border border-border rounded-xl">
        <p className="text-foreground font-black uppercase tracking-widest">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      <FadeIn>
        <h1 className="text-3xl font-black uppercase tracking-tighter-editorial text-foreground mb-2">
          Performance Analytics
        </h1>
        <p className="text-muted-foreground">
          Track your test scores, batch rankings, and subject-wise progress.
        </p>
      </FadeIn>

      {testResults.length === 0 ? (
        <FadeIn>
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground italic">
              No test results recorded yet. Check back after your next test.
            </CardContent>
          </Card>
        </FadeIn>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Chart */}
            <SlideUp className="lg:col-span-2">
              <Card className="h-full border-border shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Score Progression</h3>
                  <div className="w-full h-64 bg-secondary/50 rounded-xl border border-border flex items-end justify-around px-8 pb-8 pt-4 relative">
                    <div className="absolute left-2 top-4 bottom-8 flex flex-col justify-between text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                      <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
                    </div>
                    {chartTests.map((t, i) => {
                      const pct = Math.round((t.marksObtained / t.totalMarks) * 100);
                      return (
                        <div key={t.id} className="flex flex-col items-center gap-2 relative group">
                          <div
                            className={`w-14 ${barColors[i] ?? 'bg-muted'} hover:bg-primary transition-all duration-700 relative rounded-sm shadow-inner`}
                            style={{ height: `${pct * 1.8}px` }}
                          >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground text-[10px] font-black py-1 px-2 rounded-sm whitespace-nowrap z-10">
                              {pct}%
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px]">
                            {t.testName.split(' ')[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-center text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground/40 mt-4">Score progression over last {chartTests.length} tests.</p>
                </CardContent>
              </Card>
            </SlideUp>

            {/* Subject Highlights */}
            <SlideUp delay={0.2}>
              <Card className="h-full bg-primary border-0 text-primary-foreground shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-black uppercase tracking-tighter mb-8 text-primary-foreground">Subject Highlights</h3>
                  <div className="space-y-6">
                    {subjectAvg.length === 0 ? (
                      <p className="text-primary-foreground/60 text-sm italic">No subject data available.</p>
                    ) : subjectAvg.map(({ name, avg }) => (
                      <div key={name}>
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                          <span className="text-primary-foreground">{name}</span>
                          <span className={`${avg >= 80 ? 'text-primary-foreground' : 'text-primary-foreground/60'}`}>
                            {avg >= 80 ? '[ strong ]' : avg >= 60 ? '[ average ]' : '[ improvement requested ]'} ({avg}%)
                          </span>
                        </div>
                        <div className="w-full bg-primary-foreground/20 rounded-full h-[2px]">
                          <div
                            className="h-full bg-primary-foreground transition-all duration-1000"
                            style={{ width: `${avg}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SlideUp>
          </div>

          {/* Detailed Table */}
          <SlideUp delay={0.3}>
            <h3 className="text-xl font-black uppercase tracking-tighter mt-8 mb-4">Detailed Test History</h3>
            <Card className="border-border shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary text-muted-foreground uppercase font-black text-[10px] tracking-[0.2em] border-b border-border">
                    <tr>
                      <th className="px-8 py-5">Test Identification</th>
                      <th className="px-8 py-5">Assessment Date</th>
                      <th className="px-8 py-5 text-center">Score Metric</th>
                      <th className="px-8 py-5 text-right">Performance Rank</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {testResults.map((result) => {
                      const pct = Math.round((result.marksObtained / result.totalMarks) * 100);
                      return (
                        <tr key={result.id} className="hover:bg-secondary/50 transition-colors group">
                          <td className="px-8 py-6 font-black text-foreground uppercase tracking-tight">{result.testName}</td>
                          <td className="px-8 py-6 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                            {new Date(result.testDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="px-8 py-6 font-black text-center text-foreground">{result.marksObtained}/{result.totalMarks}</td>
                          <td className="px-8 py-6 text-right">
                            <span className={`text-[10px] font-black px-3 py-1 border ${pct >= 85 ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground'} uppercase tracking-[0.2em]`}>
                              {pct >= 85 ? 'Excellence' : pct >= 70 ? 'Merit' : 'Standard'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </SlideUp>
        </>
      )}
    </div>
  );
}
