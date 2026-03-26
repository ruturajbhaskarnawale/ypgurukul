"use client";

import React, { useState } from 'react';
import AdminAdmissionForm, { Admission } from '@/components/admin/AdminAdmissionForm';
import AdminAdmissionsList from '@/components/admin/AdminAdmissionsList';

const initialAdmissions: Admission[] = [
  {
    id: '1', idNo: 'ADM001', session: '2026', studentName: 'Aarav Sharma', gender: 'Male', dob: '2014-05-10', standard: '6', curriculum: 'Current Curriculum', fatherName: 'Rohit Sharma', parentMobile: '9876543210', admissionDate: '2026-03-01', totalFees: '20000', amountPaid: '5000', documents: ['Passport Size Photo']
  },
  {
    id: '2', idNo: 'ADM002', session: '2026', studentName: 'Diya Patel', gender: 'Female', dob: '2013-09-21', standard: '7', curriculum: 'Current Curriculum', fatherName: 'Anil Patel', parentMobile: '9123456780', admissionDate: '2026-02-15', totalFees: '22000', amountPaid: '22000', documents: ['Passport Size Photo','Aadhar Card Copy']
  },
  {
    id: '3', idNo: 'ADM003', session: '2025', studentName: 'Karan Verma', gender: 'Male', dob: '2015-01-10', standard: '6', curriculum: 'Previous Curriculum', fatherName: 'Suresh Verma', parentMobile: '9012345678', admissionDate: '2025-06-10', totalFees: '18000', amountPaid: '18000'
  }
];

export default function AdminAdmissionsPage() {
  const [admissions, setAdmissions] = useState<Admission[]>(initialAdmissions);

  const handleAdd = (a: Admission) => setAdmissions(prev => [a, ...prev]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admissions</h1>
        <div className="text-sm text-muted-foreground">Staff-only admission form. Records grouped by Standard / Session.</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h2 className="font-semibold mb-3">New Admission (staff)</h2>
          <AdminAdmissionForm onAdd={handleAdd} />
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-semibold mb-3">Admissions Records</h2>
          <AdminAdmissionsList admissions={admissions} />
        </div>
      </div>
    </div>
  );
}
