"use client";

import React from 'react';
import { AdmissionWizardData } from '../admission-wizard/types';

interface TableProps {
  admissions: Partial<AdmissionWizardData>[];
}

export const AdmissionLedgerTable: React.FC<TableProps> = ({ admissions }) => {
  return (
    <div className="w-full bg-muted/5 border border-border rounded-2xl md:rounded-[2.5rem] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px] md:min-w-full">
          <thead>
            <tr className="bg-muted/10 border-b border-border">
              <th className="px-4 py-4 md:px-8 md:py-6 text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60">ID_No</th>
              <th className="px-4 py-4 md:px-8 md:py-6 text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Student_Name</th>
              <th className="px-4 py-4 md:px-8 md:py-6 text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Parent_Contact</th>
              <th className="px-4 py-4 md:px-8 md:py-6 text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Fees_Paid</th>
              <th className="px-4 py-4 md:px-8 md:py-6 text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Balance</th>
              <th className="px-4 py-4 md:px-8 md:py-6 text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Status</th>
              <th className="px-4 py-4 md:px-8 md:py-6 text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {admissions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-8 py-20 text-center text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground italic">
                  No_Records_Found_In_Segment
                </td>
              </tr>
            ) : (
              admissions.map((record, idx) => {
                const isPaid = record.balanceDue === 0;
                return (
                  <tr key={idx} className="group hover:bg-muted/10 transition-colors">
                    <td className="px-4 py-4 md:px-8 md:py-6 text-[10px] font-black font-mono tracking-tighter opacity-40">
                      ID_{Math.floor(Math.random() * 9000) + 1000}
                    </td>
                    <td className="px-4 py-4 md:px-8 md:py-6">
                      <div className="flex flex-col">
                         <span className="text-xs font-black uppercase tracking-tight">{record.studentName}</span>
                         <span className="text-[7px] font-bold text-muted-foreground uppercase opacity-60 italic">{record.standard} / {record.gender}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 md:px-8 md:py-6">
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black uppercase tracking-widest">{record.fatherName}</span>
                         <span className="text-[8px] font-bold text-muted-foreground opacity-40">{record.parentMobile}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 md:px-8 md:py-6 text-[10px] font-black">₹{record.amountPaid?.toLocaleString()}</td>
                    <td className="px-4 py-4 md:px-8 md:py-6 text-[10px] font-black text-primary">₹{record.balanceDue?.toLocaleString()}</td>
                    <td className="px-4 py-4 md:px-8 md:py-6">
                       <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${isPaid ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary animate-pulse'}`}>
                          {isPaid ? 'PAID' : 'PENDING'}
                       </span>
                    </td>
                    <td className="px-4 py-4 md:px-8 md:py-6 text-right">
                       <div className="flex items-center justify-end gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          <button className="p-2 rounded-lg bg-muted/40 hover:bg-foreground hover:text-background transition-all">
                             <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                             </svg>
                          </button>
                          <button className="p-2 rounded-lg bg-muted/40 hover:bg-foreground hover:text-background transition-all">
                             <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                             </svg>
                          </button>
                       </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
