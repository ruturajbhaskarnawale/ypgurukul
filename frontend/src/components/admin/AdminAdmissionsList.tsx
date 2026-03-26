"use client";

import React from 'react';
import { Admission } from './AdminAdmissionForm';

interface Props { admissions: Admission[] }

export const AdminAdmissionsList: React.FC<Props> = ({ admissions }) => {
  // Group by standard then by session
  const grouped = admissions.reduce((acc: Record<string, Record<string, Admission[]>>, a) => {
    const std = a.standard || 'Unknown';
    const sess = a.session || (a.admissionDate ? a.admissionDate.slice(0,4) : 'Unknown');
    acc[std] = acc[std] || {};
    acc[std][sess] = acc[std][sess] || [];
    acc[std][sess].push(a);
    return acc;
  }, {} as Record<string, Record<string, Admission[]>>);

  return (
    <div className="space-y-6">
      {Object.keys(grouped).length === 0 && (
        <div className="p-4 bg-muted/10 rounded">No admissions yet</div>
      )}

      {Object.entries(grouped).map(([std, sessions]) => (
        <section key={std} className="bg-card p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">Standard: {std}</h3>
            <span className="text-sm text-muted-foreground">Total: {Object.values(sessions).flat().length}</span>
          </div>

          {Object.entries(sessions).map(([sess, list]) => (
            <div key={sess} className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <strong>{sess}</strong>
                <span className="text-sm text-muted-foreground">{list.length} admissions</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm table-auto">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-2">ID</th>
                      <th>Name</th>
                      <th>Curriculum</th>
                      <th>Admission Date</th>
                      <th>Parent Mobile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((a) => (
                      <tr key={a.id} className="border-t">
                        <td className="py-2">{a.idNo}</td>
                        <td>{a.studentName}</td>
                        <td>{a.curriculum}</td>
                        <td>{a.admissionDate}</td>
                        <td>{a.parentMobile}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

export default AdminAdmissionsList;
