"use client";

import React from 'react';
import { AdmissionWizardData } from '../types';

interface StepProps {
  data: AdmissionWizardData;
  update: (d: Partial<AdmissionWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const FinancialsStep: React.FC<StepProps> = ({ data, update, onNext, onBack }) => {
  return (
    <div className="space-y-8 md:space-y-12">
      
      {/* Financial Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="p-6 bg-muted/20 border border-border rounded-2xl flex flex-col justify-between">
           <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-4">Total_Fees_Required</span>
           <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tighter">₹{data.totalFees || '0'}</span>
           </div>
        </div>
        <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl flex flex-col justify-between">
           <span className="text-[9px] font-black uppercase tracking-widest text-primary mb-4 opacity-100">Paid_Amount</span>
           <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tighter text-primary">₹{data.amountPaid || '0'}</span>
           </div>
        </div>
        <div className="p-6 bg-foreground text-background rounded-2xl flex flex-col justify-between shadow-xl md:scale-105">
           <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-4">Balance_Due_Output</span>
           <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tighter">₹{data.balanceDue}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Course Joining */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Enrolled_Course_Subject*</label>
          <input 
            value={data.courseJoining} 
            onChange={(e) => update({ courseJoining: e.target.value })} 
            placeholder="ENTER PRIMARY COURSEID"
            className="w-full bg-background border-2 border-border p-4 rounded-xl text-xs font-bold focus:border-foreground outline-none transition-all uppercase tracking-widest" 
          />
        </div>

        {/* Batch Time Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Assigned_Batch_Slot*</label>
          <select
            value={data.batchTime}
            onChange={(e) => update({ batchTime: e.target.value })}
            className="w-full bg-background border-2 border-border p-4 rounded-xl text-xs font-black focus:border-foreground outline-none transition-all uppercase tracking-widest appearance-none"
          >
             <option value="">SELECT_TIME_SLOT</option>
             {['07:00 AM - 09:00 AM', '09:00 AM - 11:00 AM', '11:00 AM - 01:00 PM', '02:00 PM - 04:00 PM', '04:00 PM - 06:00 PM', '06:00 PM - 08:00 PM'].map(slot => <option key={slot} value={slot}>{slot}</option>)}
          </select>
        </div>

        {/* Total Fees Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Total_Fees_Configuration*</label>
          <div className="relative">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-black opacity-40 px-1 border-r border-border h-4 flex items-center">₹</span>
             <input 
               type="number"
               value={data.totalFees || ''} 
               onChange={(e) => update({ totalFees: Number(e.target.value) })} 
               placeholder="0.00"
               className="w-full bg-background border-2 border-border p-4 pl-12 rounded-xl text-xs font-black focus:border-foreground outline-none transition-all" 
             />
          </div>
        </div>

        {/* Paid Amount Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Initial_Payment_Deposit*</label>
          <div className="relative">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-black opacity-40 px-1 border-r border-border h-4 flex items-center">₹</span>
             <input 
               type="number"
               value={data.amountPaid || ''} 
               onChange={(e) => update({ amountPaid: Number(e.target.value) })} 
               placeholder="0.00"
               className="w-full bg-background border-2 border-primary/20 p-4 pl-12 rounded-xl text-xs font-black focus:border-primary outline-none transition-all" 
             />
          </div>
        </div>

      </div>

      {/* Navigation */}
      <div className="flex flex-col-reverse xs:flex-row justify-between items-center pt-8 md:pt-12 border-t border-border mt-8 md:mt-12 gap-6">
        <button onClick={onBack} className="text-[10px] font-black uppercase tracking-[0.1em] xs:tracking-[0.4em] text-muted-foreground hover:text-foreground transition-all px-0 xs:px-6">
          Back_Access
        </button>
        <button 
          onClick={onNext}
          disabled={!data.courseJoining || !data.totalFees}
          className="w-full xs:w-auto bg-foreground text-background px-6 xs:px-10 py-4 xs:py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.1em] xs:tracking-[0.4em] hover:bg-muted-foreground transition-all duration-300 disabled:opacity-20 shadow-2xl active:scale-95"
        >
          Proceed_To_Document_Vault
        </button>
      </div>

    </div>
  );
};
