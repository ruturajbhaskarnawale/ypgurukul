"use client";

import React from 'react';
import { AdmissionWizardData } from '../types';
import { FaCloudUploadAlt, FaFilePdf, FaCheckCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface StepProps {
  data: AdmissionWizardData;
  update: (d: Partial<AdmissionWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DocumentVaultStep: React.FC<StepProps> = ({ data, update, onNext, onBack }) => {
  return (
    <div className="space-y-10 md:space-y-12">
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-black text-foreground tracking-tight">Required Documentation</h3>
        <p className="text-sm text-muted-foreground/60 font-medium leading-relaxed max-w-2xl">
          Please upload clear, legible copies of the following documents. Formats supported: PDF, JPG, PNG (Max 5MB per file).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10">
        {[
          { label: 'Passport Size Photo', key: 'photo' },
          { label: 'Birth Certificate', key: 'birthCert' },
          { label: 'Previous Results', key: 'marksheet' },
          { label: 'Transfer Certificate', key: 'tc' },
          { label: 'Aadhar Card', key: 'aadhar' },
          { label: 'Parent ID Proof', key: 'parentId' }
        ].map((doc) => (
          <div key={doc.key} className="flex flex-col gap-3">
            <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">{doc.label} *</label>
            <div className="group relative">
               <div className="border-2 border-dashed border-border/40 rounded-2xl p-6 flex items-center justify-between bg-muted/10 hover:border-primary/30 hover:bg-muted/20 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                        <FaCloudUploadAlt size={18} />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-xs font-bold text-foreground">Click to upload</span>
                        <span className="text-[10px] font-medium text-muted-foreground/40 italic">PDF or Image</span>
                     </div>
                  </div>
                  {/* Mock Upload Success Indicator */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/5 text-emerald-600 border border-emerald-500/10">
                     <FaCheckCircle size={10} />
                     <span className="text-[10px] font-black uppercase tracking-widest">System Sync</span>
                  </div>
               </div>
               <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-amber-500/5 border border-dashed border-amber-500/10">
         <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-background border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0 shadow-sm shadow-amber-500/5">
                <FaFilePdf size={16} />
            </div>
            <div>
               <p className="text-xs font-bold text-amber-700 mb-1">Privacy & Compliance</p>
               <p className="text-[11px] font-medium text-amber-700/60 leading-relaxed italic">
                 All uploaded documents are stored in a secure cloud environment and are only accessible for verifying candidate details. Ensure your files are not password protected.
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
          className="bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group"
        >
          Proceed to Declaration
          <FaArrowRight className="text-primary-foreground/60 transition-transform group-hover:translate-x-1" size={12} />
        </button>
      </div>

    </div>
  );
};
