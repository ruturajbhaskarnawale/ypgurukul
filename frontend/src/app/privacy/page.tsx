"use client";

import React from 'react';
import { FadeIn } from '@/components/animations/MotionUtils';

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen pt-48 pb-32">
      <div className="max-w-4xl mx-auto px-12">
        <FadeIn>
          <h1 className="text-6xl font-black uppercase tracking-tighter-editorial text-foreground mb-12">
            Privacy <span className="text-muted-foreground/20 italic">Policy</span>
          </h1>
          <div className="prose max-w-none text-muted-foreground lowercase leading-relaxed">
            <p className="text-xl mb-8">your privacy is paramount at yp gurukul. we ensure that your academic and personal data is protected with precision and integrity.</p>
            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-widest">Data Collection</h2>
            <p className="mb-8">we collect only the necessary information required for academic enrollment and performance tracking.</p>
            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-widest">Usage</h2>
            <p className="mb-8">your data is used exclusively to enhance your learning experience and provide personalized feedback.</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
