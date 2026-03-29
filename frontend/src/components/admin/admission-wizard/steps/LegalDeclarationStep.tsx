"use client";

import React from 'react';
import { AdmissionWizardData } from '../types';

interface StepProps {
  data: AdmissionWizardData;
  update: (d: Partial<AdmissionWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const LegalDeclarationStep: React.FC<StepProps> = ({ data, update, onNext, onBack }) => {
  return (
    <div className="space-y-8 md:space-y-12">
      
      <div className="bg-muted/10 p-6 md:p-10 rounded-3xl md:rounded-[3rem] border-2 border-border/40 space-y-6 md:space-y-8">
        <div className="flex flex-col gap-2">
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Affidavit_Statement</span>
           <p className="text-xs font-bold leading-relaxed text-foreground/80 tracking-wide uppercase">
             I HEREBY DECLARE THAT THE INFORMATION PROVIDED IN THIS ENROLLMENT FORM IS ACCURATE TO THE BEST OF MY KNOWLEDGE. I AGREE TO ABIDE BY THE RULES AND REGULATIONS OF THE INSTITUTION AND ACKNOWLEDGE THAT ANY MISREPRESENTATION MAY LEAD TO CANCELLATION OF THE ADMISSION.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pt-8 border-t border-border/40">
           
           {/* Parent Signature */}
           <div className="flex flex-col gap-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Parent_Guardian_Digital_Sign*</label>
              <input 
                value={data.parentSignature} 
                onChange={(e) => update({ parentSignature: e.target.value })} 
                placeholder="ENTER FULL NAME AS SIGNATURE"
                className="w-full bg-background border-2 border-border p-4 md:p-6 rounded-2xl text-xs font-black focus:border-foreground outline-none transition-all uppercase tracking-widest font-mono italic" 
              />
              <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest ml-1">IDENTITY_VALIDATED_VIA_SESSION</span>
           </div>

           {/* Student Signature */}
           <div className="flex flex-col gap-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Student_Digital_Signature*</label>
              <input 
                value={data.studentSignature} 
                onChange={(e) => update({ studentSignature: e.target.value })} 
                placeholder="ENTER FULL NAME AS SIGNATURE"
                className="w-full bg-background border-2 border-border p-4 md:p-6 rounded-2xl text-xs font-black focus:border-foreground outline-none transition-all uppercase tracking-widest font-mono italic" 
              />
              <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest ml-1">ENROLLEE_ID_SYSTEM_CONFIRM</span>
           </div>

        </div>
      </div>

      <div className="flex flex-col-reverse xs:flex-row justify-between items-center pt-8 md:pt-12 border-t border-border mt-8 md:mt-12 gap-6">
        <button onClick={onBack} className="text-[10px] font-black uppercase tracking-[0.1em] xs:tracking-[0.4em] text-muted-foreground hover:text-foreground transition-all px-0 xs:px-6">
          Back_Access
        </button>
        <button 
          onClick={onNext}
          disabled={!data.parentSignature || !data.studentSignature}
          className="w-full xs:w-auto bg-primary text-primary-foreground px-6 xs:px-12 py-4 xs:py-5 rounded-3xl font-black uppercase text-[10px] md:text-[12px] tracking-[0.1em] xs:tracking-[0.4em] hover:bg-muted-foreground transition-all duration-300 disabled:opacity-20 shadow-2xl active:scale-95"
        >
          Finalize_Admission_Process
        </button>
      </div>

    </div>
  );
};
