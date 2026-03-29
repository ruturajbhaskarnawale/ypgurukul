"use client";

import React from 'react';
import { AdmissionWizardData } from '../types';

interface StepProps {
  data: AdmissionWizardData;
  update: (d: Partial<AdmissionWizardData>) => void;
  onNext: () => void;
}

export const StudentInfoStep: React.FC<StepProps> = ({ data, update, onNext }) => {
  return (
    <div className="space-y-8 md:space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Student Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Student_Full_Name*</label>
          <input 
            value={data.studentName} 
            onChange={(e) => update({ studentName: e.target.value })} 
            placeholder="ENTER LEGAL NAME"
            className="w-full bg-background border-2 border-border p-4 rounded-xl text-xs font-bold focus:border-foreground outline-none transition-all uppercase tracking-widest" 
          />
        </div>

        {/* School Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Current_School_Institution</label>
          <input 
            value={data.schoolName} 
            onChange={(e) => update({ schoolName: e.target.value })} 
            placeholder="ENTER PREVIOUS SCHOOL"
            className="w-full bg-background border-2 border-border p-4 rounded-xl text-xs font-bold focus:border-foreground outline-none transition-all uppercase tracking-widest" 
          />
        </div>

        {/* Gender Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Gender_Identity*</label>
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-4">
            {['Male', 'Female', 'Other'].map((g) => (
              <button 
                key={g}
                onClick={() => update({ gender: g as any })}
                className={`flex-1 p-4 rounded-xl border-2 transition-all text-[10px] font-black uppercase tracking-[0.2em] ${data.gender === g ? 'bg-foreground text-background border-foreground' : 'bg-background border-border text-muted-foreground hover:border-muted-foreground'}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Date_Of_Birth*</label>
          <input 
            type="date"
            value={data.dob} 
            onChange={(e) => update({ dob: e.target.value })} 
            className="w-full bg-background border-2 border-border p-4 rounded-xl text-[10px] font-black focus:border-foreground outline-none transition-all uppercase" 
          />
        </div>

        {/* Class/Standard */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Applied_Standard_Level*</label>
          <select
            value={data.standard}
            onChange={(e) => update({ standard: e.target.value, stream: '' })}
            className="w-full bg-background border-2 border-border p-4 rounded-xl text-xs font-black focus:border-foreground outline-none transition-all uppercase tracking-widest appearance-none"
          >
             <option value="">SELECT_LEVEL</option>
             {['Primary', 'Secondary', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map(s => <option key={s} value={s}>{s}_STANDARD</option>)}
          </select>
        </div>

        {/* Conditional Stream Selection (11th & 12th Only) */}
        {(data.standard === '11th' || data.standard === '12th') && (
          <div className="flex flex-col gap-2 animate-in slide-in-from-left duration-500">
            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Academic_Stream_Specialization*</label>
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-4">
              {['Art', 'Commerce', 'Science'].map((stream) => (
                <button 
                  key={stream}
                  onClick={() => update({ stream: stream as any })}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all text-[10px] font-black uppercase tracking-[0.2em] ${data.stream === stream ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border text-muted-foreground hover:border-primary'}`}
                >
                  {stream}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-8 md:pt-12 border-t border-border mt-8 md:mt-12">
        <button 
          onClick={onNext}
          disabled={!data.studentName || !data.gender || !data.dob || !data.standard || ((data.standard === '11th' || data.standard === '12th') && !data.stream)}
          className="w-full xs:w-auto bg-foreground text-background px-6 xs:px-10 py-4 xs:py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.1em] xs:tracking-[0.4em] hover:bg-muted-foreground transition-all duration-300 disabled:opacity-20 disabled:scale-95 active:scale-95 shadow-2xl"
        >
          Proceed_To_Guardian_Info
        </button>
      </div>

    </div>
  );
};
