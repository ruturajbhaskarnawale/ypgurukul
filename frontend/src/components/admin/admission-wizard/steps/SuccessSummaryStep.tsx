"use client";

import React from 'react';
import { AdmissionWizardData } from '../types';
import { FaUserEdit, FaFileInvoice, FaCheckCircle, FaPrint, FaArrowLeft, FaDatabase } from 'react-icons/fa';

interface StepProps {
  data: AdmissionWizardData;
  update: (d: Partial<AdmissionWizardData>) => void;
  onBack: () => void;
}

export const SuccessSummaryStep: React.FC<StepProps> = ({ data, onBack }) => {
  return (
    <div className="space-y-10 md:space-y-12">
      
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-20 h-20 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-500/10 animate-in zoom-in-50 duration-700">
           <FaCheckCircle size={32} />
        </div>
        <div className="space-y-2">
            <h3 className="text-2xl font-black text-foreground tracking-tight">Review & Finalize</h3>
            <p className="text-sm text-muted-foreground/60 font-medium leading-relaxed max-w-lg mx-auto">
              Please verify the application overview below. Once submitted, the record will be officially registered in the academic session.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Candidate Snapshot */}
         <div className="p-8 rounded-[2rem] bg-muted/10 border border-border/40 space-y-6 group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-3 text-primary opacity-40 group-hover:opacity-100 transition-opacity">
               <FaUserEdit size={14} />
               <span className="text-[10px] font-bold uppercase tracking-widest">Candidate Details</span>
            </div>
            <div className="space-y-4">
               <div className="flex justify-between items-center border-b border-border/30 pb-3">
                  <span className="text-xs font-semibold text-muted-foreground/60">Full Name</span>
                  <span className="text-xs font-black text-foreground">{data.studentName || '- -'}</span>
               </div>
               <div className="flex justify-between items-center border-b border-border/30 pb-3">
                  <span className="text-xs font-semibold text-muted-foreground/60">Target Class</span>
                  <span className="text-xs font-black text-foreground">{data.standard} Standard {data.stream ? `/ ${data.stream}` : ''}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-muted-foreground/60">Primary Guardian</span>
                  <span className="text-xs font-black text-foreground">{data.fatherName || data.motherName || '- -'}</span>
               </div>
            </div>
         </div>

         {/* Financial Snapshot */}
         <div className="p-8 rounded-[2rem] bg-muted/10 border border-border/40 space-y-6 group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-3 text-primary opacity-40 group-hover:opacity-100 transition-opacity">
               <FaFileInvoice size={14} />
               <span className="text-[10px] font-bold uppercase tracking-widest">Financial Summary</span>
            </div>
            <div className="space-y-4">
               <div className="flex justify-between items-center border-b border-border/30 pb-3">
                  <span className="text-xs font-semibold text-muted-foreground/60">Enrollment Fee</span>
                  <span className="text-xs font-black text-foreground">₹{Number(data.totalFees).toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center border-b border-border/30 pb-3">
                  <span className="text-xs font-semibold text-muted-foreground/60">Advance Payment</span>
                  <span className="text-xs font-black text-emerald-500">₹{Number(data.amountPaid).toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-muted-foreground/60">Balance Outstanding</span>
                  <span className="text-xs font-black text-primary">₹{Number(data.balanceDue).toLocaleString()}</span>
               </div>
            </div>
         </div>
      </div>

      <div className="p-8 rounded-[2.5rem] bg-muted/20 border border-dashed border-border/60 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center text-muted-foreground opacity-30">
               <FaDatabase size={18} />
            </div>
            <div className="text-center md:text-left">
               <p className="text-xs font-bold text-foreground">Cloud Registration Ready</p>
               <p className="text-[10px] font-medium text-muted-foreground/60 tracking-tight italic">Document encryption and session sync complete.</p>
            </div>
         </div>
         <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-background border border-border text-[10px] font-bold uppercase tracking-widest hover:bg-muted/40 transition-all shadow-sm">
            <FaPrint size={12} className="opacity-40" />
            Print Summary
         </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-10 border-t border-border mt-12">
        <button 
          onClick={onBack}
          className="px-10 py-5 rounded-2xl font-bold text-sm bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <FaArrowLeft size={10} className="opacity-40" />
          Back to Verification
        </button>
        <button 
          onClick={() => {
            alert("Enrollment Processed Successfully! The record is now registered in our active ledger.");
            window.location.reload();
          }}
          className="bg-primary text-primary-foreground px-12 py-5 rounded-2xl font-black text-sm hover:opacity-90 transition-all active:scale-95 shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 group"
        >
          Submit Application
          <FaCheckCircle className="text-primary-foreground/40 transition-transform group-hover:scale-110" size={14} />
        </button>
      </div>

    </div>
  );
};
