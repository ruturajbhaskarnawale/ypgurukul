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
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded ${className}`} />
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

  // Chart bars: last 4 tests in chronological order
  const chartTests = [...testResults].reverse().slice(0, 4);
  const barColors = ['bg-primary/40', 'bg-accent/40', 'bg-green-500/40', 'bg-primary/60'];

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
      <div className="max-w-7xl mx-auto w-full p-8 text-center">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      <FadeIn>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Performance Analytics
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Track your test scores, batch rankings, and subject-wise progress.
        </p>
      </FadeIn>

      {testResults.length === 0 ? (
        <FadeIn>
          <Card>
            <CardContent className="p-12 text-center text-slate-500">
              No test results recorded yet. Check back after your next test.
            </CardContent>
          </Card>
        </FadeIn>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Chart */}
            <SlideUp className="lg:col-span-2">
              <Card className="h-full">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">Score Progression</h3>
                  <div className="w-full h-64 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-end justify-around px-8 pb-8 pt-4 relative">
                    <div className="absolute left-2 top-4 bottom-8 flex flex-col justify-between text-xs text-slate-400">
                      <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
                    </div>
                    {chartTests.map((t, i) => {
                      const pct = Math.round((t.marksObtained / t.totalMarks) * 100);
                      return (
                        <div key={t.id} className="flex flex-col items-center gap-2 relative group">
                          <div
                            className={`w-14 ${barColors[i] ?? 'bg-slate-400/40'} hover:opacity-80 rounded-t-lg transition-all duration-700 relative`}
                            style={{ height: `${pct * 1.8}px` }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                              {pct}%
                            </div>
                          </div>
                          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                            {t.testName.split(' ').slice(0, 2).join(' ')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-center text-sm text-slate-500 mt-4">Score progression over last {chartTests.length} tests.</p>
                </CardContent>
              </Card>
            </SlideUp>

            {/* Subject Highlights */}
            <SlideUp delay={0.2}>
              <Card className="h-full bg-slate-900 border-0 text-white">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-8 text-white">Subject Highlights</h3>
                  <div className="space-y-5">
                    {subjectAvg.length === 0 ? (
                      <p className="text-slate-400 text-sm">No subject data available.</p>
                    ) : subjectAvg.map(({ name, avg }) => (
                      <div key={name}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-slate-300">{name}</span>
                          <span className={`font-bold ${avg >= 80 ? 'text-green-400' : avg >= 60 ? 'text-accent' : 'text-red-400'}`}>
                            {avg >= 80 ? 'Strong' : avg >= 60 ? 'Average' : 'Needs Work'} ({avg}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${avg >= 80 ? 'bg-green-400' : avg >= 60 ? 'bg-accent' : 'bg-red-400'}`}
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
            <h3 className="text-xl font-bold mt-8 mb-4">Detailed Test History</h3>
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 uppercase font-semibold text-xs border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Test Name</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Score</th>
                      <th className="px-6 py-4">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {testResults.map((result) => {
                      const pct = Math.round((result.marksObtained / result.totalMarks) * 100);
                      return (
                        <tr key={result.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{result.testName}</td>
                          <td className="px-6 py-4 text-slate-500 text-xs">
                            {new Date(result.testDate).toLocaleDateString('en-IN')}
                          </td>
                          <td className="px-6 py-4 font-bold">{result.marksObtained}/{result.totalMarks}</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${pct >= 85 ? 'bg-green-100 text-green-700' : 'bg-accent/20 text-accent-dark'}`}>
                              {pct}%
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
