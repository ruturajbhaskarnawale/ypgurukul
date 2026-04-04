"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/global/Card';
import { motion } from 'framer-motion';
import { apiClient } from '@/lib/apiClient';
import { FaUserTie, FaEnvelope, FaPhone, FaBriefcase, FaCalendarAlt, FaFilePdf } from 'react-icons/fa';

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
      setApplications(data || []);
    } catch(err) {
      console.error('Error fetching applications', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  return (
    <div className="p-4 md:p-8 space-y-8 md:space-y-12 pb-24 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2 border-b border-border pb-8"
      >
        <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
          Job Applications
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Review and manage applications submitted via the Career portal.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-card border border-border rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/5">
                  <th className="py-5 px-6 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60">Applicant</th>
                  <th className="py-5 px-6 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60">Contact</th>
                  <th className="py-5 px-6 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60">Position</th>
                  <th className="py-5 px-6 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60">Date Applied</th>
                  <th className="py-5 px-6 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 text-right">Resume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-muted-foreground italic text-sm">
                      Retrieving applications...
                    </td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-muted-foreground italic text-sm">
                      <div className="flex flex-col items-center gap-3">
                         <FaBriefcase className="opacity-10" size={32} />
                         No applications found.
                      </div>
                    </td>
                  </tr>
                ) : (
                   applications.map((app) => (
                    <tr key={app.id} className="hover:bg-muted/10 transition-colors group">
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                             {app.name.charAt(0).toUpperCase()}
                           </div>
                           <span className="font-bold text-foreground text-sm">{app.name}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="space-y-1">
                           <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <FaEnvelope size={10} className="shrink-0" />
                              {app.email}
                           </div>
                           <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60">
                              <FaPhone size={9} className="shrink-0" />
                              {app.mobile}
                           </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-bold bg-primary/5 text-primary border border-primary/10">
                          {app.position}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-medium">
                           <FaCalendarAlt size={11} className="shrink-0" />
                           {new Date(app.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <a 
                          href={app.resumeUrl !== 'local_upload' ? app.resumeUrl : '#'} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-muted/20 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all text-xs font-bold border border-border/40 hover:border-primary/20 shadow-sm"
                          onClick={(e) => {
                             if(app.resumeUrl === 'local_upload') {
                               e.preventDefault();
                               alert("This is a demo application. Real files would be stored in S3/Cloud Storage.");
                             }
                          }}
                        >
                          <FaFilePdf />
                          View Resume
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
