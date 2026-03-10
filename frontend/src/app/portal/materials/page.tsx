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
      <div className="max-w-7xl mx-auto w-full p-8 text-center">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      <FadeIn>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Study Materials
        </h1>
        <p className="text-muted-foreground">
          Access and download resources uploaded by your faculty.
        </p>
      </FadeIn>

      {/* Filter Bar */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-6">
          {subjects.map((sub, i) => (
            <button
              key={i}
              onClick={() => setActiveSubject(sub)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSubject === sub
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted border border-border hover:bg-muted/40 text-muted-foreground'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <FadeIn>
          <p className="text-muted-foreground/60 text-sm">No materials available for this course yet.</p>
        </FadeIn>
      ) : (
        <StaggerContainer className="grid lg:grid-cols-2 gap-4">
          {filtered.map((mat) => (
            <StaggerItem key={mat.id}>
              <Card className="hover:border-foreground/30 transition-colors">
                <CardContent className="p-5 flex justify-between items-center sm:flex-row flex-col gap-4 text-center sm:text-left">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-lg flex justify-center items-center flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground line-clamp-1">{mat.title}</h3>
                      <div className="text-sm text-muted-foreground/60 mt-1 flex flex-wrap gap-x-3">
                        <span className="text-primary font-medium">{mat.course.title}</span>
                        <span>Uploaded: {new Date(mat.uploadedAt).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                  <a href={mat.fileUrl} target="_blank" rel="noopener noreferrer" className="sm:w-auto w-full">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 w-full sm:w-auto">
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
