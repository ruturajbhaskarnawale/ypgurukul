"use client";

import React from 'react';
import { AdmissionWizardData } from '../types';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';

interface StepProps {
  data: AdmissionWizardData;
  update: (d: Partial<AdmissionWizardData>) => void;
  onNext: () => void;
}

export const StudentInfoStep: React.FC<StepProps> = ({ data, update, onNext }) => {
  return (
    <div className="space-y-10 md:space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10">
        
        {/* Student Name */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">Full Name *</label>
          <input 
            value={data.studentName} 
            onChange={(e) => update({ studentName: e.target.value })} 
            placeholder="e.g. Rahul Sharma"
            className="w-full bg-muted/20 border border-border/50 p-4 rounded-xl text-sm font-semibold text-foreground focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 outline-none transition-all placeholder:text-muted-foreground/20 placeholder:font-medium" 
          />
        </div>

        {/* School Name */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">Former Institution</label>
          <input 
            value={data.schoolName} 
            onChange={(e) => update({ schoolName: e.target.value })} 
            placeholder="e.g. Modern High School"
            className="w-full bg-muted/20 border border-border/50 p-4 rounded-xl text-sm font-semibold text-foreground focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 outline-none transition-all placeholder:text-muted-foreground/20 placeholder:font-medium" 
          />
        </div>

        {/* Gender Selection */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">Gender *</label>
          <div className="grid grid-cols-3 gap-3">
            {['Male', 'Female', 'Other'].map((g) => (
              <button 
                key={g}
                type="button"
                onClick={() => update({ gender: g as any })}
                className={`p-4 rounded-xl border transition-all text-xs font-bold ${data.gender === g ? 'bg-primary text-primary-foreground border-transparent shadow-lg shadow-primary/20 scale-105' : 'bg-muted/10 border-border/40 text-muted-foreground/60 hover:border-primary/20 hover:text-foreground'}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">Date of Birth *</label>
          <input 
            type="date"
            value={data.dob} 
            onChange={(e) => update({ dob: e.target.value })} 
            className="w-full bg-muted/20 border border-border/50 p-4 rounded-xl text-sm font-semibold text-foreground focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 outline-none transition-all" 
          />
        </div>

        {/* Class/Standard */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">Target Standard *</label>
          <div className="relative">
             <select
               value={data.standard}
               onChange={(e) => update({ standard: e.target.value, stream: '' })}
               className="w-full bg-muted/20 border border-border/50 p-4 rounded-xl text-sm font-semibold text-foreground focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 outline-none transition-all appearance-none cursor-pointer"
             >
                <option value="">Choose Class</option>
                {['Primary', 'Secondary', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map(s => <option key={s} value={s}>{s} Standard</option>)}
             </select>
             <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 pointer-events-none" size={10} />
          </div>
        </div>

        {/* Conditional Stream Selection (11th & 12th Only) */}
        {(data.standard === '11th' || data.standard === '12th') && (
          <div className="flex flex-col gap-2.5 animate-in slide-in-from-top duration-500">
            <label className="text-[11px] font-bold text-primary tracking-widest uppercase ml-1">Academic Stream *</label>
            <div className="grid grid-cols-3 gap-3">
              {['Art', 'Commerce', 'Science'].map((stream) => (
                <button 
                  key={stream}
                  type="button"
                  onClick={() => update({ stream: stream as any })}
                  className={`p-4 rounded-xl border transition-all text-xs font-bold ${data.stream === stream ? 'bg-primary text-primary-foreground border-transparent shadow-lg shadow-primary/20 scale-105' : 'bg-muted/10 border-border/40 text-muted-foreground/60 hover:border-primary/20 hover:text-foreground'}`}
                >
                  {stream}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-10 border-t border-border mt-12">
        <button 
          onClick={onNext}
          disabled={!data.studentName || !data.gender || !data.dob || !data.standard || ((data.standard === '11th' || data.standard === '12th') && !data.stream)}
          className="w-full sm:w-auto bg-primary text-primary-foreground px-10 py-4 rounded-2xl font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group"
        >
          Continue to Guardian Details
          <FaArrowRight className="text-primary-foreground/60 transition-transform group-hover:translate-x-1" size={12} />
        </button>
      </div>

    </div>
  );
};
