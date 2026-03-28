"use client";

import React from 'react';
import { AdmissionWizardData } from '../types';

interface StepProps {
  data: AdmissionWizardData;
  update: (d: Partial<AdmissionWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const AcademicHistoryStep: React.FC<StepProps> = ({ data, update, onNext, onBack }) => {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Previous Class */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Previous_Class_Level*</label>
          <input 
            value={data.previousClass} 
            onChange={(e) => update({ previousClass: e.target.value })} 
            placeholder="ENTER LAST COMPLETED CLASS"
            className="w-full bg-background border-2 border-border p-4 rounded-xl text-xs font-bold focus:border-foreground outline-none transition-all uppercase tracking-widest" 
          />
        </div>

        {/* Board Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Educational_Board_Affiliation*</label>
          <div className="flex gap-4">
            {['CBSE', 'ICSE', 'State', 'Other'].map((b) => (
              <button 
                key={b}
                onClick={() => update({ board: b as any })}
                className={`flex-1 p-4 rounded-xl border-2 transition-all text-[10px] font-black uppercase tracking-[0.2em] ${data.board === b ? 'bg-foreground text-background border-foreground' : 'bg-background border-border text-muted-foreground hover:border-muted-foreground'}`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects Taken */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Primary_Subjects_Specialization*</label>
          <input 
            value={data.subjectsTaken} 
            onChange={(e) => update({ subjectsTaken: e.target.value })} 
            placeholder="ENG, MATH, SCI, ETC"
            className="w-full bg-background border-2 border-border p-4 rounded-xl text-xs font-bold focus:border-foreground outline-none transition-all uppercase tracking-widest" 
          />
        </div>

        {/* Curriculum Preference */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Enrolled_Curriculum_Track</label>
          <input 
            value={data.curriculum} 
            onChange={(e) => update({ curriculum: e.target.value })} 
            placeholder="CURRENT_CURRICULUM_PLAN"
            className="w-full bg-background border-2 border-border p-4 rounded-xl text-xs font-bold focus:border-foreground outline-none transition-all uppercase tracking-widest" 
          />
        </div>

      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-12 border-t border-border mt-12">
        <button onClick={onBack} className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition-all px-6">
          Back_Access
        </button>
        <button 
          onClick={onNext}
          disabled={!data.previousClass || !data.board || !data.subjectsTaken}
          className="bg-foreground text-background px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-muted-foreground transition-all duration-300 disabled:opacity-20 shadow-2xl active:scale-95"
        >
          Proceed_To_Financial_Metrics
        </button>
      </div>

    </div>
  );
};
