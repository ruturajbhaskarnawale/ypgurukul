"use client";

import React from 'react';
import { ThemeProvider } from "@/components/global/ThemeProvider";
import { SmoothScrollProvider } from "@/components/global/SmoothScrollProvider";
import { PageTransition } from "@/components/animations/PageTransition";
import { AuthProvider } from "@/lib/authContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <SmoothScrollProvider>
        <PageTransition>
          <AuthProvider>
            {children}
          </AuthProvider>
        </PageTransition>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
