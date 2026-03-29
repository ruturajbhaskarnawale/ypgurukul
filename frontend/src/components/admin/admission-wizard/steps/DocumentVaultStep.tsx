"use client";

import React from 'react';
import { AdmissionWizardData } from '../types';

interface StepProps {
  data: AdmissionWizardData;
  update: (d: Partial<AdmissionWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DocumentVaultStep: React.FC<StepProps> = ({ data, update, onNext, onBack }) => {
  const docs = [
    { id: 'photo', label: 'Passport Size Photo', key: 'photo' },
    { id: 'aadhar', label: 'Aadhaar Card Copy', key: 'aadhar' },
    { id: 'marksheet', label: 'Previous Marksheet', key: 'marksheet' }
  ];

  const toggleDoc = (key: string) => {
    update({
      documents: {
        ...data.documents,
        [key]: !data.documents[key as keyof typeof data.documents]
      }
    });
  };

  return (
    <div className="space-y-8 md:space-y-12">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {docs.map((doc) => (
          <div 
            key={doc.id}
            onClick={() => toggleDoc(doc.key)}
            className={`cursor-pointer group relative p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col items-center justify-center text-center gap-4 md:gap-6 ${data.documents[doc.key as keyof typeof data.documents] ? 'bg-foreground border-foreground md:scale-105 shadow-2xl' : 'bg-muted/10 border-dashed border-border hover:border-muted-foreground hover:bg-muted/20'}`}
          >
            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-colors ${data.documents[doc.key as keyof typeof data.documents] ? 'bg-background/20' : 'bg-muted border border-border group-hover:bg-background'}`}>
               <svg className={`w-8 h-8 ${data.documents[doc.key as keyof typeof data.documents] ? 'text-background' : 'text-muted-foreground'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
               </svg>
            </div>
            <div className="space-y-1">
               <span className={`text-[10px] font-black uppercase tracking-widest block ${data.documents[doc.key as keyof typeof data.documents] ? 'text-background' : 'text-foreground'}`}>{doc.label}</span>
               <span className={`text-[8px] font-black uppercase tracking-widest opacity-40 block ${data.documents[doc.key as keyof typeof data.documents] ? 'text-background' : 'text-muted-foreground'}`}>SUPPORT_JPG_PNG_PDF</span>
            </div>
            
            {data.documents[doc.key as keyof typeof data.documents] && (
              <div className="absolute top-6 right-6 w-6 h-6 rounded-full bg-background flex items-center justify-center shadow-lg">
                 <svg className="w-3 h-3 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                 </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 sm:p-8 bg-primary/5 border border-primary/20 rounded-3xl flex items-center gap-4 sm:gap-6">
         <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
         </div>
         <p className="text-[10px] font-black uppercase tracking-widest text-primary leading-relaxed max-w-xl">
            SECURITY_NOTICE: ALL UPLOADED ASSETS ARE ENCRYPTED AND STORED IN COMPLIANCE WITH THE INSTITUTIONAL DATA PRIVACY ACT OF 2026.
         </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-col-reverse xs:flex-row justify-between items-center pt-8 md:pt-12 border-t border-border mt-8 md:mt-12 gap-6">
        <button onClick={onBack} className="text-[10px] font-black uppercase tracking-[0.1em] xs:tracking-[0.4em] text-muted-foreground hover:text-foreground transition-all px-0 xs:px-6">
          Back_Access
        </button>
        <button 
          onClick={onNext}
          className="w-full xs:w-auto bg-foreground text-background px-6 xs:px-10 py-4 xs:py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.1em] xs:tracking-[0.4em] hover:bg-muted-foreground transition-all duration-300 shadow-2xl active:scale-95"
        >
          Proceed_To_Legal_Terms
        </button>
      </div>

    </div>
  );
};
