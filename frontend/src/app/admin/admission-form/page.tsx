"use client";

import React from 'react';
import { FadeIn } from '@/components/animations/MotionUtils';
import { AdmissionWizard } from '@/components/admin/admission-wizard/AdmissionWizard';

export default function AdmissionFormPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      
      {/* Dynamic Header */}
      <FadeIn>
        <div className="flex flex-col gap-2 border-b border-border pb-8">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-none">
            Enrollment Portal
          </h1>
          <p className="text-[10px] text-muted-foreground tracking-[0.4em] uppercase font-black italic">
            Entry_Protocol: Multi_Step_Admission_System_v2.0
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 gap-12">
        <FadeIn delay={0.2}>
          <AdmissionWizard />
        </FadeIn>
      </div>

    </div>
  );
}
