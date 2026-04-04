"use client";

import React from 'react';
import { AdmissionWizardData } from '../types';
import { FaArrowLeft, FaArrowRight, FaCreditCard, FaMoneyBillWave, FaBalanceScale } from 'react-icons/fa';

interface StepProps {
  data: AdmissionWizardData;
  update: (d: Partial<AdmissionWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const FinancialsStep: React.FC<StepProps> = ({ data, update, onNext, onBack }) => {
  return (
    <div className="space-y-10 md:space-y-12">
      
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-muted/10 border border-border/40 flex flex-col gap-3 group hover:border-primary/20 transition-all">
          <div className="flex items-center gap-2 text-primary opacity-40 group-hover:opacity-100 transition-opacity">
            <FaMoneyBillWave size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Calculated Fee</span>
          </div>
          <span className="text-3xl font-black text-foreground tracking-tighter">₹{Number(data.totalFees).toLocaleString()}</span>
          <p className="text-[10px] font-medium text-muted-foreground/40 italic">Including basic enrollment & session charges.</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col gap-3 group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center gap-2 text-emerald-500 opacity-60">
            <FaCreditCard size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Amount Paid</span>
          </div>
          <span className="text-3xl font-black text-emerald-600 tracking-tighter">₹{Number(data.amountPaid).toLocaleString()}</span>
          <p className="text-[10px] font-medium text-emerald-600/40 italic">Total advance payment received.</p>
        </div>

        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col gap-3 group hover:border-primary/30 transition-all">
          <div className="flex items-center gap-2 text-primary opacity-60">
            <FaBalanceScale size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Balance Due</span>
          </div>
          <span className="text-3xl font-black text-primary tracking-tighter">₹{Number(data.balanceDue).toLocaleString()}</span>
          <p className="text-[10px] font-medium text-primary/40 italic">Outstanding balance to be cleared.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10 border-t border-muted/10 pt-10">
        {/* Total Fees Input */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">Session Enrollment Fee *</label>
          <div className="relative">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 font-bold text-sm">₹</span>
             <input 
               type="number"
               value={data.totalFees} 
               onChange={(e) => update({ totalFees: Number(e.target.value) })} 
               placeholder="0.00"
               className="w-full bg-muted/20 border border-border/50 p-4 pl-10 rounded-xl text-sm font-black text-foreground focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 outline-none transition-all" 
             />
          </div>
        </div>

        {/* Amount Paid Input */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest ml-1">Advance Received *</label>
          <div className="relative">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 font-bold text-sm">₹</span>
             <input 
               type="number"
               value={data.amountPaid} 
               onChange={(e) => update({ amountPaid: Number(e.target.value) })} 
               placeholder="0.00"
               className="w-full bg-muted/20 border border-border/50 p-4 pl-10 rounded-xl text-sm font-black text-foreground focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 outline-none transition-all" 
             />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-muted/5 border border-dashed border-border/60">
         <p className="text-[11px] font-medium text-muted-foreground/60 leading-relaxed">
           Financial entries are processed through the centralized ledger. Ensure all currency values are verified against physical or digital receipts. Any balance due will be flagged in the student's active profile.
         </p>
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
          disabled={!data.totalFees}
          className="bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group"
        >
          Continue to Documents
          <FaArrowRight className="text-primary-foreground/60 transition-transform group-hover:translate-x-1" size={12} />
        </button>
      </div>

    </div>
  );
};
