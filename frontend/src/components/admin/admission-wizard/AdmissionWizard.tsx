"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepperIndicator } from './StepperIndicator';
import { AdmissionWizardData, initialWizardData } from './types';
import { 
  FaUser, FaUsers, FaGraduationCap, FaMoneyCheckAlt, 
  FaCloudUploadAlt, FaFileContract, FaCheckDouble 
} from 'react-icons/fa';

import { StudentInfoStep } from './steps/StudentInfoStep';
import { GuardianInfoStep } from './steps/GuardianInfoStep';
import { AcademicHistoryStep } from './steps/AcademicHistoryStep';
import { FinancialsStep } from './steps/FinancialsStep';
import { DocumentVaultStep } from './steps/DocumentVaultStep';
import { LegalDeclarationStep } from './steps/LegalDeclarationStep';
import { SuccessSummaryStep } from './steps/SuccessSummaryStep';

const STEPS = [
  'Student Information',
  'Guardian Details',
  'Academic History',
  'Fee Details',
  'Document Upload',
  'Declaration',
  'Review & Submit'
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
    <div className="w-full max-w-5xl mx-auto pb-16 md:pb-24 relative px-4">
      
      <div className="bg-card border border-border rounded-3xl md:rounded-[2.5rem] p-6 lg:p-14 shadow-sm relative overflow-hidden transition-all duration-500 bg-gradient-to-tr from-background via-card to-background">
        
        {/* Step-specific Gradient Background Accents */}
        <div className="absolute top-0 left-0 w-full h-[6px] bg-muted/10 opacity-50" />
        <div className="absolute top-[-30%] left-[-20%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-30 select-none animate-pulse-slow" />
        
        {/* Progress Tracker */}
        <div className="mb-12 md:mb-20">
          <StepperIndicator currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS} />
        </div>

        {/* Step Container with smooth layout change */}
        <div className="min-h-[400px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Progress Sync Note */}
      <div className="flex justify-center mt-10">
        <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-500/5 text-emerald-600/60 border border-emerald-500/10 shadow-sm shadow-emerald-500/5">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
             Session auto-sync active
           </span>
        </div>
      </div>

    </div>
  );
};
