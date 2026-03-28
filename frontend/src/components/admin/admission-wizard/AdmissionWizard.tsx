"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepperIndicator } from './StepperIndicator';
import { AdmissionWizardData, initialWizardData } from './types';
import { FadeIn } from '@/components/animations/MotionUtils';

import { StudentInfoStep } from './steps/StudentInfoStep';
import { GuardianInfoStep } from './steps/GuardianInfoStep';
import { AcademicHistoryStep } from './steps/AcademicHistoryStep';
import { FinancialsStep } from './steps/FinancialsStep';
import { DocumentVaultStep } from './steps/DocumentVaultStep';
import { LegalDeclarationStep } from './steps/LegalDeclarationStep';
import { SuccessSummaryStep } from './steps/SuccessSummaryStep';

const STEPS = [
  'Student Info',
  'Guardian Details',
  'Academic History',
  'Fees & Logic',
  'Document Vault',
  'Final Declaration',
  'Review & Submission'
];

export const AdmissionWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<AdmissionWizardData>(initialWizardData);

  // Sync Balance Due
  useEffect(() => {
    const total = Number(formData.totalFees) || 0;
    const paid = Number(formData.amountPaid) || 0;
    setFormData(prev => ({
      ...prev,
      balanceDue: Math.max(0, total - paid)
    }));
  }, [formData.totalFees, formData.amountPaid]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateFormData = (data: Partial<AdmissionWizardData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StudentInfoStep data={formData} update={updateFormData} onNext={handleNext} />;
      case 1: return <GuardianInfoStep data={formData} update={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 2: return <AcademicHistoryStep data={formData} update={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 3: return <FinancialsStep data={formData} update={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 4: return <DocumentVaultStep data={formData} update={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 5: return <LegalDeclarationStep data={formData} update={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 6: return <SuccessSummaryStep data={formData} update={updateFormData} onBack={handleBack} />;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-24 relative">
      
      <div className="bg-muted/5 border border-border rounded-[3rem] p-6 lg:p-12 shadow-sm relative overflow-hidden">
        
        {/* Progress Tracker */}
        <div className="mb-16">
          <StepperIndicator currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS} />
        </div>

        {/* Step Container */}
        <div className="min-h-[500px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Persistence Note */}
      <div className="flex justify-center mt-12 opacity-40">
        <span className="text-[8px] font-black uppercase tracking-[0.3em] bg-muted px-3 py-1 rounded-full">
          Auto_Save: Enabled_Session_Context
        </span>
      </div>

    </div>
  );
};
