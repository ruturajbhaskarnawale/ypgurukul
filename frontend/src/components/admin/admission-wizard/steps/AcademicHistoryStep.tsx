"use client";

import React from 'react';
import { AdmissionWizardData } from '../types';
import { FaArrowLeft, FaArrowRight, FaChevronDown } from 'react-icons/fa';

interface StepProps {
  data: AdmissionWizardData;
  update: (d: Partial<AdmissionWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const AcademicHistoryStep: React.FC<StepProps> = ({ data, update, onNext, onBack }) => {
  return (
    <div className="space-y-10 md:space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10">
        
        {/* Previous Class */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">Previous Class Completed *</label>
          <div className="relative">
             <select
               value={data.previousClass}
               onChange={(e) => update({ previousClass: e.target.value })}
               className="w-full bg-muted/20 border border-border/50 p-4 rounded-xl text-sm font-semibold text-foreground focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 outline-none transition-all appearance-none cursor-pointer"
             >
                <option value="">Select Grade</option>
                {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th'].map(s => <option key={s} value={s}>{s} Standard</option>)}
             </select>
             <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 pointer-events-none" size={10} />
          </div>
        </div>

        {/* Board Selection */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">Academic Board *</label>
          <div className="grid grid-cols-3 gap-3">
            {['CBSE', 'ICSE', 'State'].map((b) => (
              <button 
                key={b}
                type="button"
                onClick={() => update({ board: b as any })}
                className={`p-4 rounded-xl border transition-all text-xs font-bold ${data.board === b ? 'bg-primary text-primary-foreground border-transparent shadow-lg shadow-primary/20 scale-105' : 'bg-muted/10 border-border/40 text-muted-foreground/60 hover:border-primary/20 hover:text-foreground'}`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Note about further details */}
        <div className="md:col-span-2">
           <div className="p-6 rounded-2xl bg-muted/5 border border-dashed border-border/60">
              <p className="text-[11px] font-medium text-muted-foreground/60 leading-relaxed">
                Provide the most recent academic records accessible. These details help us in standard evaluation and assigning the most compatible academic batch for the session.
              </p>
           </div>
        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-10 border-t border-border mt-12">
        <button 
          onClick={onBack}
          className="px-10 py-5 rounded-2xl font-bold text-sm bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <FaArrowLeft size={10} className="opacity-40" />
          Back
        </button>
        <button 
          onClick={onNext}
          disabled={!data.previousClass || !data.board}
          className="bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group"
        >
          Continue to Fee Details
          <FaArrowRight className="text-primary-foreground/60 transition-transform group-hover:translate-x-1" size={12} />
        </button>
      </div>

    </div>
  );
};
