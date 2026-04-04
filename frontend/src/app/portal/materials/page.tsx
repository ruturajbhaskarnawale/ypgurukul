"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import { Card, CardContent } from '@/components/global/Card';
import { apiClient, ApiError } from '@/lib/apiClient';
import { useAuth } from '@/lib/authContext';
import { FaFileLines, FaDownload, FaFilter } from 'react-icons/fa6';
import { motion } from 'framer-motion';

interface StudyMaterial {
  id: string;
  title: string;
  fileUrl: string;
  uploadedAt: string;
  course: { title: string };
}

const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-muted/40 rounded-2xl ${className}`} />
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
        else setError('Unable to load materials at the moment.');
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, [authUser, router]);

  const subjects = ['All', ...Array.from(new Set(materials.map((m) => m.course.title)))];
  const filtered = activeSubject === 'All'
    ? materials
    : materials.filter((m) => m.course.title === activeSubject);

  if (authLoading || loading) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto w-full pb-20">
        <Skeleton className="h-12 w-64" />
        <div className="flex gap-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-28 rounded-full" />)}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto w-full pb-24">
      <FadeIn>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Study Resources
          </h1>
          <p className="text-sm text-muted-foreground/60 font-medium">
            Explore and download academic materials shared by your educators.
          </p>
        </div>
      </FadeIn>

      {/* Filter Bar */}
      <FadeIn delay={0.1}>
        <div className="flex items-center gap-4 flex-wrap pb-2">
          <div className="flex items-center gap-2 text-muted-foreground/30 mr-2">
            <FaFilter size={12} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Filter</span>
          </div>
          {subjects.map((sub, i) => (
            <button
              key={i}
              onClick={() => setActiveSubject(sub)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-bold tracking-tight transition-all duration-300 ${
                activeSubject === sub
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                  : 'bg-muted/10 border border-border/30 hover:bg-muted/20 text-muted-foreground hover:border-border'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <FadeIn>
          <div className="p-20 text-center bg-muted/5 border border-dashed border-border/50 rounded-[2.5rem]">
            <p className="text-sm text-muted-foreground font-medium italic">
              No materials have been uploaded for this specific category yet.
            </p>
          </div>
        </FadeIn>
      ) : (
        <StaggerContainer className="grid lg:grid-cols-2 gap-6">
          {filtered.map((mat) => (
            <StaggerItem key={mat.id}>
              <Card className="rounded-[2rem] border-border/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group overflow-hidden bg-card">
                <CardContent className="p-8 flex justify-between items-center sm:flex-row flex-col gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-muted/10 text-muted-foreground/40 rounded-2xl flex justify-center items-center flex-shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500 shadow-inner">
                      <FaFileLines size={24} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-bold text-foreground text-lg tracking-tight group-hover:text-primary transition-colors line-clamp-1">{mat.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">{mat.course.title}</span>
                        <span className="text-[10px] font-medium text-muted-foreground/30 italic">Added {new Date(mat.uploadedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                  <a 
                    href={mat.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="sm:w-auto w-full group/btn"
                  >
                    <button className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-muted/10 hover:bg-primary text-muted-foreground hover:text-primary-foreground border border-border/50 hover:border-transparent transition-all duration-300 shadow-sm">
                      <FaDownload size={14} className="group-hover/btn:animate-bounce" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Download</span>
                    </button>
                  </a>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      <FadeIn delay={0.4} className="mt-12 text-center">
         <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-muted/10 border border-border/20">
            <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
              Catalog Strength: {filtered.length} resources available
            </span>
         </div>
      </FadeIn>
    </div>
  );
}
