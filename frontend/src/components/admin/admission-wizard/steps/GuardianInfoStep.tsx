"use client";

import React from 'react';
import { AdmissionWizardData } from '../types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface StepProps {
  data: AdmissionWizardData;
  update: (d: Partial<AdmissionWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const GuardianInfoStep: React.FC<StepProps> = ({ data, update, onNext, onBack }) => {
  return (
    <div className="space-y-10 md:space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10">
        
        {/* Father's Name */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">Father's Name *</label>
          <input 
            value={data.fatherName} 
            onChange={(e) => update({ fatherName: e.target.value })} 
            placeholder="e.g. Anand Sharma"
            className="w-full bg-muted/20 border border-border/50 p-4 rounded-xl text-sm font-semibold text-foreground focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 outline-none transition-all placeholder:text-muted-foreground/20 placeholder:font-medium" 
          />
        </div>

        {/* Mother's Name */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">Mother's Name *</label>
          <input 
            value={data.motherName} 
            onChange={(e) => update({ motherName: e.target.value })} 
            placeholder="e.g. Geeta Sharma"
            className="w-full bg-muted/20 border border-border/50 p-4 rounded-xl text-sm font-semibold text-foreground focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 outline-none transition-all placeholder:text-muted-foreground/20 placeholder:font-medium" 
          />
        </div>

        {/* Mobile Number */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">Primary Mobile *</label>
          <input 
            value={data.parentMobile} 
            onChange={(e) => update({ parentMobile: e.target.value })} 
            placeholder="e.g. +91 98765 43210"
            className="w-full bg-muted/20 border border-border/50 p-4 rounded-xl text-sm font-semibold text-foreground focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 outline-none transition-all placeholder:text-muted-foreground/20 placeholder:font-medium" 
          />
        </div>

        {/* Alternate Mobile */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">Alternate Mobile</label>
          <input 
            value={data.alternateMobile} 
            onChange={(e) => update({ alternateMobile: e.target.value })} 
            placeholder="e.g. +91 98765 00000"
            className="w-full bg-muted/20 border border-border/50 p-4 rounded-xl text-sm font-semibold text-foreground focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 outline-none transition-all placeholder:text-muted-foreground/20 placeholder:font-medium" 
          />
        </div>

      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">Residential Address *</label>
        <textarea 
          value={data.address} 
          onChange={(e) => update({ address: e.target.value })} 
          placeholder="Enter complete residential address..."
          rows={3}
          className="w-full bg-muted/20 border border-border/50 p-4 rounded-xl text-sm font-semibold text-foreground focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 outline-none transition-all placeholder:text-muted-foreground/20 placeholder:font-medium resize-none" 
        />
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
          disabled={!data.fatherName || !data.motherName || !data.parentMobile || !data.address}
          className="bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group"
        >
          Continue to Academic History
          <FaArrowRight className="text-primary-foreground/60 transition-transform group-hover:translate-x-1" size={12} />
        </button>
      </div>

    </div>
  );
};
