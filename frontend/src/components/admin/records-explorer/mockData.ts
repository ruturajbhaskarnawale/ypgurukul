import { AdmissionWizardData } from '../admission-wizard/types';

export const getMockAdmissions = (year?: string, standard?: string, stream?: string): Partial<AdmissionWizardData>[] => {
  const students: Partial<AdmissionWizardData>[] = [
    { studentName: 'Aarav Sharma', fatherName: 'Rajesh Sharma', parentMobile: '9876543210', totalFees: 50000, amountPaid: 50000, balanceDue: 0, gender: 'Male', standard: '10th', admissionDate: '2026-03-15' },
    { studentName: 'Vivian DSouza', fatherName: 'Mark DSouza', parentMobile: '9822113344', totalFees: 45000, amountPaid: 20000, balanceDue: 25000, gender: 'Male', standard: '12th', admissionDate: '2026-02-10' },
    { studentName: 'Isha Patel', fatherName: 'Vikram Patel', parentMobile: '8877665544', totalFees: 55000, amountPaid: 55000, balanceDue: 0, gender: 'Female', standard: '10th', admissionDate: '2025-12-05' },
    { studentName: 'Rohan Gupta', fatherName: 'Sanjay Gupta', parentMobile: '7788990011', totalFees: 48000, amountPaid: 48000, balanceDue: 0, gender: 'Male', standard: '8th', admissionDate: '2025-11-20' },
    { studentName: 'Ananya Rao', fatherName: 'Krishna Rao', parentMobile: '6655443322', totalFees: 60000, amountPaid: 30000, balanceDue: 30000, gender: 'Female', standard: '12th', admissionDate: '2026-01-25' },
  ];

  if (standard) {
    let filtered = students.filter(s => s.standard?.toLowerCase() === standard.toLowerCase());
    if (year) {
       // Mock year filtering if needed
    }
    if (stream) {
       // Mock stream filtering
       // For demo, we just assign some students to streams if they are 11/12th
       return filtered.slice(0, 2); 
    }
    return filtered;
  }
  
  return students;
};

export const getGlobalStats = () => ({
  totalStudents: 1250,
  revenue: "₹1.42 Cr",
  arrears: "₹12.5L"
});

export const getYearlyStats = (year: string) => ({
  totalStudents: year === '2026' ? 450 : 380,
  revenue: year === '2026' ? "₹45.2L" : "₹38.1L",
  arrears: year === '2026' ? "₹8.2L" : "₹4.5L"
});
