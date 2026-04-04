"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const StepperIndicator: React.FC<StepperProps> = ({ currentStep, totalSteps, steps }) => {
  const progress = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-end px-2">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40">New Admission</span>
          <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">Step {currentStep + 1} <span className="text-muted-foreground/30 font-medium">of {totalSteps}</span></h2>
        </div>
        <div className="text-right hidden sm:block pb-1">
          <span className="text-xs font-bold text-primary tracking-tight">
            {steps[currentStep]}
          </span>
        </div>
      </div>

      <div className="relative h-2 w-full bg-muted/20 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          className="absolute h-full bg-primary" 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>

      <div className="hidden lg:flex justify-between px-1 gap-2">
        {steps.map((label, idx) => (
          <div 
            key={label} 
            className={`flex flex-col items-center gap-3 transition-all duration-500 ${idx <= currentStep ? 'opacity-100 scale-100' : 'opacity-20 scale-95'}`}
          >
            <div className={`w-2.5 h-2.5 rounded-full border-2 ${idx <= currentStep ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'bg-muted-foreground border-transparent'}`} />
            <span className={`text-[10px] font-bold tracking-tight text-center max-w-[80px] leading-tight transition-colors ${idx === currentStep ? 'text-primary' : 'text-muted-foreground'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
