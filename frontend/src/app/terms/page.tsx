"use client";

import React from 'react';
import { FadeIn } from '@/components/animations/MotionUtils';

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen pt-48 pb-32">
      <div className="max-w-4xl mx-auto px-12">
        <FadeIn>
          <h1 className="text-6xl font-black uppercase tracking-tighter-editorial text-foreground mb-12">
            Terms of <span className="text-muted-foreground/20 italic">Service</span>
          </h1>
          <div className="prose max-w-none text-muted-foreground lowercase leading-relaxed">
            <p className="text-xl mb-8">by enrolling in yp gurukul, you agree to uphold the highest standards of academic integrity and personal conduct.</p>
            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-widest">Enrollment</h2>
            <p className="mb-8">enrollment is subject to verification of academic credentials and adherence to our code of conduct.</p>
            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-widest">Curriculum</h2>
            <p className="mb-8">our curriculum is designed for peak performance and requires consistent dedication from the scholar.</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
