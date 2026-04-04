"use client";

import React from 'react';
import { AdmissionWizardData } from '../types';
import { FaCheckCircle, FaPenFancy, FaArrowLeft, FaArrowRight, FaShieldAlt } from 'react-icons/fa';

interface StepProps {
  data: AdmissionWizardData;
  update: (d: Partial<AdmissionWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const LegalDeclarationStep: React.FC<StepProps> = ({ data, update, onNext, onBack }) => {
  return (
    <div className="space-y-10 md:space-y-12">
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
              <FaShieldAlt size={16} />
           </div>
           <h3 className="text-xl font-black text-foreground tracking-tight">Legal Declaration</h3>
        </div>
        <p className="text-sm text-muted-foreground/60 font-medium leading-relaxed max-w-2xl">
          Please review the following declaration carefully. By providing your e-signature, you confirm the accuracy of all submitted data.
        </p>
      </div>

      <div className="p-8 md:p-10 rounded-[2.5rem] bg-muted/20 border border-border/50 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
         <p className="text-sm font-medium text-foreground tracking-tight leading-[1.8] italic text-justify">
           "I hereby declare that all the information provided by me in this application is true and correct to the best of my knowledge and belief. I understand that any false information or misrepresentation will result in the immediate cancellation of the enrollment process. I agree to abide by the rules and regulations of YP Gurukul and will provide physical documentation for verification whenever requested by the administrative authorities."
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10 pt-4 border-t border-muted/10">
        {/* Parent's Digital Signature */}
        <div className="flex flex-col gap-3">
          <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">Parent's Signature *</label>
          <div className="relative">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-30 select-none">
                <FaPenFancy size={14} />
             </div>
             <input 
               value={data.parentSignature} 
               onChange={(e) => update({ parentSignature: e.target.value })} 
               placeholder="Type Full Name to Sign" 
               className="w-full bg-muted/20 border border-border/50 p-4 pl-12 rounded-xl text-lg font-signature text-foreground focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 outline-none transition-all placeholder:text-[10px] placeholder:font-sans placeholder:font-bold placeholder:uppercase placeholder:tracking-widest placeholder:text-muted-foreground/20" 
             />
          </div>
        </div>

        {/* Date of Signature (Auto-filled) */}
        <div className="flex flex-col gap-3">
          <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">Signature Date</label>
          <div className="w-full bg-muted/10 border border-border/20 p-4 rounded-xl text-sm font-black text-muted-foreground/40 font-mono tracking-tighter opacity-50 flex items-center justify-between">
             {data.declarationDate || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
             <FaCheckCircle size={12} className="text-emerald-500 opacity-40" />
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
          disabled={!data.parentSignature}
          className="bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group"
        >
          Ready to Finalize
          <FaArrowRight className="text-primary-foreground/60 transition-transform group-hover:translate-x-1" size={12} />
        </button>
      </div>

    </div>
  );
};
