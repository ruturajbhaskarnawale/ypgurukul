"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/global/Card';
import { FadeIn } from '@/components/animations/MotionUtils';
import { apiClient } from '@/lib/apiClient';

interface Application {
  id: string;
  name: string;
  email: string;
  mobile: string;
  position: string;
  resumeUrl: string;
  appliedAt: string;
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get<Application[]>('/admin/applications');
      setApplications(data);
    } catch(err) {
      console.error('Error fetching applications', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Career Applications</h1>
        <p className="text-sm text-muted-foreground">Review job applications submitted via the public career page.</p>
      </div>

      <FadeIn>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Applicant</th>
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Contact</th>
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Position Applied</th>
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Date</th>
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground text-right">Resume</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">Loading applications...</td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      No applications found. Once submitted via the careers form, they will appear here.
                    </td>
                  </tr>
                ) : (
                   applications.map((app) => (
                    <tr key={app.id} className="border-b border-border hover:bg-muted/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-foreground font-bold text-xs">
                             {app.name.charAt(0).toUpperCase()}
                           </div>
                           <span className="font-medium text-foreground">{app.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-muted-foreground">{app.email}</p>
                        <p className="text-xs text-muted-foreground/60">{app.mobile}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {app.position}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-muted-foreground/60">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <a 
                          href={app.resumeUrl !== 'local_upload' ? app.resumeUrl : '#'} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-primary hover:underline text-sm font-medium"
                          onClick={(e) => {
                             if(app.resumeUrl === 'local_upload') {
                               e.preventDefault();
                               alert("This is a demo application. Real files would be stored in S3/Cloud Storage.");
                             }
                          }}
                        >
                          View Resume
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
}
