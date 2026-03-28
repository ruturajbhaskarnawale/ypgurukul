"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdmissionsRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/admin/admission-records');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-pulse text-muted-foreground uppercase tracking-[0.4em] font-black text-[10px]">
        Redirecting_To_Records_Repository...
      </div>
    </div>
  );
}
