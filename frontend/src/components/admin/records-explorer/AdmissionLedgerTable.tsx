"use client";

import React from 'react';
import { AdmissionWizardData } from '../admission-wizard/types';
import { FaEye, FaEdit, FaCheckCircle, FaClock, FaUser } from 'react-icons/fa';

interface TableProps {
  admissions: Partial<AdmissionWizardData>[];
}

export const AdmissionLedgerTable: React.FC<TableProps> = ({ admissions }) => {
  return (
    <div className="w-full bg-card border border-border rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px] md:min-w-full">
          <thead>
            <tr className="bg-muted/5 border-b border-border">
              <th className="px-4 py-4 md:px-8 md:py-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">System ID</th>
              <th className="px-4 py-4 md:px-8 md:py-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Student Name</th>
              <th className="px-4 py-4 md:px-8 md:py-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Guardian Info</th>
              <th className="px-4 py-4 md:px-8 md:py-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Paid Amount</th>
              <th className="px-4 py-4 md:px-8 md:py-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Balance Due</th>
              <th className="px-4 py-4 md:px-8 md:py-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Status</th>
              <th className="px-4 py-4 md:px-8 md:py-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {admissions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-8 py-24 text-center text-sm font-medium text-muted-foreground italic">
                  <div className="flex flex-col items-center gap-3">
                     <FaUser className="opacity-10" size={32} />
                     No student records found in this category.
                  </div>
                </td>
              </tr>
            ) : (
              admissions.map((record, idx) => {
                const isPaid = record.balanceDue === 0;
                return (
                  <tr key={idx} className="group hover:bg-muted/10 transition-all">
                    <td className="px-4 py-4 md:px-8 md:py-6 text-[10px] font-bold font-mono tracking-tight text-muted-foreground/40">
                      ID-{Math.floor(Math.random() * 9000) + 1000}
                    </td>
                    <td className="px-4 py-4 md:px-8 md:py-6">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary text-[10px] font-black group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            {record.studentName?.charAt(0).toUpperCase()}
                         </div>
                         <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground tracking-tight">{record.studentName}</span>
                            <span className="text-[10px] font-bold text-muted-foreground/40 tracking-widest uppercase">{record.standard} • {record.gender}</span>
                         </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 md:px-8 md:py-6">
                      <div className="flex flex-col">
                         <span className="text-[11px] font-bold text-foreground/80">{record.fatherName}</span>
                         <span className="text-[10px] font-medium text-muted-foreground/60">{record.parentMobile}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 md:px-8 md:py-6 text-sm font-black text-foreground">₹{record.amountPaid?.toLocaleString()}</td>
                    <td className="px-4 py-4 md:px-8 md:py-6 text-sm font-black text-primary">₹{record.balanceDue?.toLocaleString()}</td>
                    <td className="px-4 py-4 md:px-8 md:py-6">
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-tight border ${isPaid ? 'bg-emerald-500/5 text-emerald-600 border-emerald-500/20' : 'bg-primary/5 text-primary border-primary/20'}`}>
                          {isPaid ? <FaCheckCircle size={10} /> : <FaClock size={10} />}
                          {isPaid ? 'Cleared' : 'Pending'}
                       </span>
                    </td>
                    <td className="px-4 py-4 md:px-8 md:py-6 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-muted/20 hover:bg-foreground hover:text-background transition-all shadow-sm border border-border/40" title="View Profile">
                             <FaEye size={12} />
                          </button>
                          <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-muted/20 hover:bg-foreground hover:text-background transition-all shadow-sm border border-border/40" title="Edit Record">
                             <FaEdit size={12} />
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
