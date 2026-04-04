"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AdmissionWizard } from '@/components/admin/admission-wizard/AdmissionWizard';

export default function AdmissionFormPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 md:space-y-12 pb-24">
      
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2 border-b border-border pb-8"
      >
        <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
          New Admission Form
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Complete the multi-step form below to register a new student.
        </p>
      </motion.div>

      <div className="grid grid-cols-1">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <AdmissionWizard />
        </motion.div>
      </div>

    </div>
  );
}
