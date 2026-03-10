"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import { Card, CardContent } from '@/components/global/Card';
import { Button } from '@/components/global/Button';
import { apiClient, ApiError } from '@/lib/apiClient';
import { useAuth } from '@/lib/authContext';

interface StudyMaterial {
  id: string;
  title: string;
  fileUrl: string;
  uploadedAt: string;
  course: { title: string };
}

const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-muted/40 rounded ${className}`} />
);

export default function MaterialsPage() {
  const router = useRouter();
  const { user: authUser, isLoading: authLoading } = useAuth();

  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSubject, setActiveSubject] = useState('All');

  useEffect(() => {
    if (!authLoading && !authUser) router.push('/login');
  }, [authUser, authLoading, router]);

  useEffect(() => {
    if (!authUser) return;
    const fetchMaterials = async () => {
      try {
        const data = await apiClient.get<StudyMaterial[]>('/portal/materials');
        setMaterials(data);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) router.push('/login');
        else setError('Failed to load materials. Check if the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, [authUser, router]);

  // Derive unique subjects from course titles
  const subjects = ['All', ...Array.from(new Set(materials.map((m) => m.course.title)))];
  const filtered = activeSubject === 'All'
    ? materials
    : materials.filter((m) => m.course.title === activeSubject);

  if (authLoading || loading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto w-full">
        <Skeleton className="h-10 w-48" />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-9 w-24 rounded-full" />)}
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24" />)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto w-full p-8 text-center bg-secondary/20 rounded-2xl border border-border">
        <p className="text-foreground font-black uppercase tracking-widest text-xs">[ error ] {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      <FadeIn>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-foreground mb-2">
          Study Materials
        </h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
          Access and download resources uploaded by your faculty.
        </p>
      </FadeIn>

      {/* Filter Bar */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-3 mb-6">
          {subjects.map((sub, i) => (
            <button
              key={i}
              onClick={() => setActiveSubject(sub)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeSubject === sub
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-background border border-border hover:bg-secondary text-muted-foreground'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <FadeIn>
          <div className="p-12 border border-border rounded-2xl bg-secondary/10 text-center">
            <p className="text-muted-foreground text-xs font-black uppercase tracking-widest">No materials available for this course yet.</p>
          </div>
        </FadeIn>
      ) : (
        <StaggerContainer className="grid lg:grid-cols-2 gap-4">
          {filtered.map((mat) => (
            <StaggerItem key={mat.id}>
              <Card className="hover:border-foreground/30 transition-all group overflow-hidden">
                <CardContent className="p-6 flex justify-between items-center sm:flex-row flex-col gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-secondary text-foreground rounded-xl flex justify-center items-center flex-shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-black text-foreground uppercase tracking-tight line-clamp-1">{mat.title}</h3>
                      <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-2 flex flex-wrap gap-x-4">
                        <span className="text-primary">{mat.course.title}</span>
                        <span className="opacity-40">Uploaded: {new Date(mat.uploadedAt).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                  <a href={mat.fileUrl} target="_blank" rel="noopener noreferrer" className="sm:w-auto w-full">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 w-full sm:w-auto font-black uppercase tracking-widest text-[9px] py-6 px-8 rounded-full">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      <FadeIn delay={0.4} className="mt-8 text-center text-sm text-muted-foreground/60">
        Showing {filtered.length} of {materials.length} resources for your enrolled courses.
      </FadeIn>
    </div>
  );
}
