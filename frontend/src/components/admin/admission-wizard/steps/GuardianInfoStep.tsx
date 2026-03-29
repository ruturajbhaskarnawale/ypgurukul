"use client";

import React from 'react';
import { AdmissionWizardData } from '../types';

interface StepProps {
  data: AdmissionWizardData;
  update: (d: Partial<AdmissionWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const GuardianInfoStep: React.FC<StepProps> = ({ data, update, onNext, onBack }) => {
  return (
    <div className="space-y-8 md:space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Father Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Father_Full_Name*</label>
          <input 
            value={data.fatherName} 
            onChange={(e) => update({ fatherName: e.target.value })} 
            placeholder="ENTER LEGAL NAME"
            className="w-full bg-background border-2 border-border p-4 rounded-xl text-xs font-bold focus:border-foreground outline-none transition-all uppercase tracking-widest" 
          />
        </div>

        {/* Mother Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Mother_Full_Name*</label>
          <input 
            value={data.motherName} 
            onChange={(e) => update({ motherName: e.target.value })} 
            placeholder="ENTER LEGAL NAME"
            className="w-full bg-background border-2 border-border p-4 rounded-xl text-xs font-bold focus:border-foreground outline-none transition-all uppercase tracking-widest" 
          />
        </div>

        {/* Parent Mobile */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Primary_Contact_Number*</label>
          <input 
            value={data.parentMobile} 
            onChange={(e) => update({ parentMobile: e.target.value })} 
            placeholder="+91-0000000000"
            className="w-full bg-background border-2 border-border p-4 rounded-xl text-xs font-bold focus:border-foreground outline-none transition-all uppercase tracking-widest" 
          />
        </div>

        {/* Alternate Mobile */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Emergency_Support_Contact</label>
          <input 
            value={data.alternateMobile} 
            onChange={(e) => update({ alternateMobile: e.target.value })} 
            placeholder="ENTER ALTERNATE_ID"
            className="w-full bg-background border-2 border-border p-4 rounded-xl text-xs font-bold focus:border-foreground outline-none transition-all uppercase tracking-widest" 
          />
        </div>

        {/* Full Address */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Permanent_Residential_Address*</label>
          <textarea 
            rows={3}
            value={data.address} 
            onChange={(e) => update({ address: e.target.value })} 
            placeholder="STREET_LOCALITY_POSTAL_CODE"
            className="w-full bg-background border-2 border-border p-4 rounded-xl text-xs font-bold focus:border-foreground outline-none transition-all uppercase tracking-widest resize-none" 
          />
        </div>

      </div>

      {/* Navigation */}
      <div className="flex flex-col-reverse xs:flex-row justify-between items-center pt-8 md:pt-12 border-t border-border mt-8 md:mt-12 gap-6">
        <button onClick={onBack} className="text-[10px] font-black uppercase tracking-[0.1em] xs:tracking-[0.4em] text-muted-foreground hover:text-foreground transition-all px-0 xs:px-6">
          Back_Access
        </button>
        <button 
          onClick={onNext}
          disabled={!data.fatherName || !data.motherName || !data.parentMobile || !data.address}
          className="w-full xs:w-auto bg-foreground text-background px-6 xs:px-10 py-4 xs:py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.1em] xs:tracking-[0.4em] hover:bg-muted-foreground transition-all duration-300 disabled:opacity-20 shadow-2xl active:scale-95"
        >
          Proceed_To_Academic_Records
        </button>
      </div>

    </div>
  );
};
