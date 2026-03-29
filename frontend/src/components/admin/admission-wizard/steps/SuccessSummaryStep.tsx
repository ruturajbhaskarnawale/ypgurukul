"use client";

import React from 'react';
import { AdmissionWizardData } from '../types';

interface StepProps {
  data: AdmissionWizardData;
  update: (d: Partial<AdmissionWizardData>) => void;
  onBack: () => void;
}

export const SuccessSummaryStep: React.FC<StepProps> = ({ data, onBack }) => {
  
  const submitAdmission = () => {
    console.log("FINAL_ADMISSION_DATA:", data);
    alert("ADMISSION_PORTAL: NEW ENROLLMENT RECORDED IN HISTORICAL REPOSITORY.");
  };

  return (
    <div className="space-y-8 md:space-y-12">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Profile Summary */}
        <div className="p-8 bg-muted/10 border border-border rounded-3xl space-y-6">
           <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">STUDENT_PROFILE</span>
           <div className="space-y-4">
              <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase text-muted-foreground opacity-60">NAME</span>
                 <span className="text-sm font-black tracking-tight">{data.studentName}</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase text-muted-foreground opacity-60">GENDER_DOB</span>
                 <span className="text-sm font-black tracking-tight">{data.gender} / {data.dob}</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase text-muted-foreground opacity-60">STANDARD_STREAM</span>
                 <span className="text-sm font-black tracking-tight">
                    {data.standard} {data.stream && `/ ${data.stream}`}
                 </span>
              </div>
           </div>
        </div>

        {/* Guardian Summary */}
        <div className="p-8 bg-muted/10 border border-border rounded-3xl space-y-6">
           <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">GUARDIAN_NETWORK</span>
           <div className="space-y-4">
              <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase text-muted-foreground opacity-60">FATHER_MOTHER</span>
                 <span className="text-sm font-black tracking-tight leading-tight">{data.fatherName} & {data.motherName}</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase text-muted-foreground opacity-60">CONTACT</span>
                 <span className="text-sm font-black tracking-tight">{data.parentMobile}</span>
              </div>
           </div>
        </div>

        {/* Financial Summary */}
        <div className="p-8 bg-foreground text-background rounded-3xl space-y-6 shadow-2xl">
           <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">FINANCIAL_LEDGER</span>
           <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-background/10 pb-2">
                 <span className="text-[9px] font-black uppercase">TOTAL_FEE</span>
                 <span className="text-sm font-black">₹{data.totalFees}</span>
              </div>
              <div className="flex items-center justify-between border-b border-background/10 pb-2">
                 <span className="text-[9px] font-black uppercase text-primary">PAID</span>
                 <span className="text-sm font-black">₹{data.amountPaid}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                 <span className="text-[9px] font-black uppercase text-primary">BALANCE_DUE</span>
                 <span className="text-xl font-black italic underline">₹{data.balanceDue}</span>
              </div>
           </div>
        </div>

      </div>

      <div className="p-6 md:p-10 border-2 border-primary/20 bg-primary/5 rounded-3xl md:rounded-[4rem] text-center space-y-4 md:space-y-6">
         <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
         </div>
         <h2 className="text-2xl font-black uppercase tracking-tighter">Ready_For_Deployment</h2>
         <p className="max-w-xl mx-auto text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
            SYSTEM_CONFIRMS_VALID_SCHEMA. UPON SUBMISSION, AN OFFICIAL STUDENT ID WILL BE GENERATED AND THE ENROLLMENT STATUS WILL BE SET TO [ACTIVE].
         </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-col-reverse xs:flex-row justify-between items-center pt-8 md:pt-12 border-t border-border mt-8 md:mt-12 gap-6">
        <button onClick={onBack} className="text-[10px] font-black uppercase tracking-[0.1em] xs:tracking-[0.4em] text-muted-foreground hover:text-foreground transition-all px-0 xs:px-6">
          Back_Access
        </button>
        <button 
          onClick={submitAdmission}
          className="w-full xs:w-auto bg-foreground text-background px-6 xs:px-10 py-4 xs:py-6 rounded-full font-black uppercase text-[10px] md:text-[12px] tracking-[0.1em] xs:tracking-[0.4em] hover:bg-muted-foreground transition-all duration-300 shadow-2xl active:scale-95 flex items-center justify-center gap-4"
        >
          [ Confirm_And_Submit_Final_Admission ]
        </button>
      </div>

    </div>
  );
};
