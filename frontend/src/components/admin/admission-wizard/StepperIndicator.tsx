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
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center px-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-60">Entry_Phase</span>
          <span className="text-xl font-black uppercase tracking-tight">Step {currentStep + 1} of {totalSteps}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">
            {steps[currentStep]}
          </span>
        </div>
      </div>

      <div className="relative h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
        <motion.div 
          className="absolute h-full bg-foreground" 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <div className="hidden md:flex justify-between px-1">
        {steps.map((label, idx) => (
          <div 
            key={label} 
            className={`flex flex-col items-center gap-2 transition-all duration-300 ${idx <= currentStep ? 'opacity-100' : 'opacity-20'}`}
          >
            <div className={`w-2 h-2 rounded-full ${idx <= currentStep ? 'bg-foreground' : 'bg-muted-foreground'}`} />
            <span className="text-[7px] font-black uppercase tracking-widest text-center max-w-[60px] leading-tight">
              {label.replace(' ', '_')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
