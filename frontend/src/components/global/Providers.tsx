"use client";

import React, { useEffect, useState } from 'react';
import { ThemeProvider } from "@/components/global/ThemeProvider";
import { SmoothScrollProvider } from "@/components/global/SmoothScrollProvider";
import { PageTransition } from "@/components/animations/PageTransition";
import { AuthProvider } from "@/lib/authContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [CanvasComp, setCanvasComp] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let mounted = true;
    // Avoid loading heavy 3D modules in development (Turbopack dev-time can
    // pre-evaluate modules and cause React internals errors). Only enable in
    // production or when explicitly allowed via an env flag.
    if (process.env.NODE_ENV === 'production') {
      const id = requestAnimationFrame(() => {
        import("@/components/global/GlobalCanvasWrapper").then((mod) => {
          if (mounted && mod?.GlobalCanvasWrapper) setCanvasComp(() => mod.GlobalCanvasWrapper);
        }).catch(() => {});
      });
      return () => { mounted = false; cancelAnimationFrame(id); };
    }
    return () => { mounted = false; };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <SmoothScrollProvider>
        <PageTransition>
          <AuthProvider>
            {CanvasComp ? <CanvasComp /> : null}
            {children}
          </AuthProvider>
        </PageTransition>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
