"use client";

import React, { useState } from 'react';

export interface Admission {
  id: string;
  idNo?: string;
  session?: string;
  studentName: string;
  gender?: string;
  dob?: string;
  standard: string;
  curriculum?: string;
  fatherName?: string;
  motherName?: string;
  parentMobile?: string;
  alternateMobile?: string;
  address?: string;
  admissionDate?: string;
  totalFees?: string;
  amountPaid?: string;
  documents?: string[];
  note?: string;
}

interface Props {
  onAdd: (a: Admission) => void;
}

export const AdminAdmissionForm: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState<Partial<Admission>>({
    standard: '',
    studentName: '',
    curriculum: 'Current Curriculum',
    session: new Date().getFullYear().toString(),
    admissionDate: new Date().toISOString().slice(0, 10),
  });

  const toggleDocument = (doc: string) => {
    const docs = form.documents ? [...form.documents] : [];
    const idx = docs.indexOf(doc);
    if (idx === -1) docs.push(doc); else docs.splice(idx, 1);
    setForm({ ...form, documents: docs });
  };

  const handleChange = (k: keyof Admission, v: any) => setForm({ ...form, [k]: v });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentName || !form.standard) return alert('Please fill student name and standard');
    const admission: Admission = {
      id: String(Date.now()),
      idNo: form.idNo || `ID-${Date.now().toString().slice(-6)}`,
      session: form.session,
      studentName: form.studentName as string,
      gender: form.gender,
      dob: form.dob,
      standard: form.standard as string,
      curriculum: form.curriculum,
      fatherName: form.fatherName,
      motherName: form.motherName,
      parentMobile: form.parentMobile,
      alternateMobile: form.alternateMobile,
      address: form.address,
      admissionDate: form.admissionDate,
      totalFees: form.totalFees,
      amountPaid: form.amountPaid,
      documents: form.documents,
      note: form.note,
    };
    onAdd(admission);
    setForm({
      standard: '',
      studentName: '',
      curriculum: 'Current Curriculum',
      session: new Date().getFullYear().toString(),
      admissionDate: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input value={form.idNo || ''} onChange={(e)=>handleChange('idNo', e.target.value)} placeholder="ID No (optional)" className="input" />
        <input value={form.session || ''} onChange={(e)=>handleChange('session', e.target.value)} placeholder="Session" className="input" />
        <input value={form.studentName || ''} onChange={(e)=>handleChange('studentName', e.target.value)} placeholder="Student Name*" className="input" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select value={form.gender || ''} onChange={(e)=>handleChange('gender', e.target.value)} className="input">
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input type="date" value={form.dob || ''} onChange={(e)=>handleChange('dob', e.target.value)} className="input" />
        <input value={form.standard || ''} onChange={(e)=>handleChange('standard', e.target.value)} placeholder="Class / Standard*" className="input" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input value={form.fatherName || ''} onChange={(e)=>handleChange('fatherName', e.target.value)} placeholder="Father's Name" className="input" />
        <input value={form.motherName || ''} onChange={(e)=>handleChange('motherName', e.target.value)} placeholder="Mother's Name" className="input" />
        <input value={form.parentMobile || ''} onChange={(e)=>handleChange('parentMobile', e.target.value)} placeholder="Parent Mobile" className="input" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input value={form.previousClass || '' as any} onChange={(e)=>handleChange('previousClass' as any, e.target.value)} placeholder="Previous Class Passed" className="input" />
        <input value={form.curriculum || ''} onChange={(e)=>handleChange('curriculum', e.target.value)} placeholder="Curriculum" className="input" />
        <input value={form.admissionDate || ''} onChange={(e)=>handleChange('admissionDate', e.target.value)} type="date" className="input" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input value={form.totalFees || ''} onChange={(e)=>handleChange('totalFees', e.target.value)} placeholder="Total Fees" className="input" />
        <input value={form.amountPaid || ''} onChange={(e)=>handleChange('amountPaid', e.target.value)} placeholder="Amount Paid" className="input" />
        <input value={form.alternateMobile || ''} onChange={(e)=>handleChange('alternateMobile', e.target.value)} placeholder="Alternate Mobile" className="input" />
      </div>

      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2"><input type="checkbox" checked={(form.documents||[]).includes('Passport Size Photo')} onChange={()=>toggleDocument('Passport Size Photo')} /> Passport Photo</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={(form.documents||[]).includes('Aadhar Card Copy')} onChange={()=>toggleDocument('Aadhar Card Copy')} /> Aadhar Copy</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={(form.documents||[]).includes('Previous Marksheet')} onChange={()=>toggleDocument('Previous Marksheet')} /> Previous Marksheet</label>
      </div>

      <div>
        <textarea value={form.note || ''} onChange={(e)=>handleChange('note', e.target.value)} placeholder="Notes" className="input h-24" />
      </div>

      <div className="flex gap-3 justify-end">
        <button type="submit" className="btn-primary">Add Admission</button>
      </div>
    </form>
  );
};

export default AdminAdmissionForm;
