export interface AdmissionDocument {
  name: string;
  type: string;
  url?: string;
  file?: File;
}

export interface AdmissionWizardData {
  // Step 1: Student
  studentName: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  dob: string;
  standard: string;
  stream: 'Art' | 'Commerce' | 'Science' | '';
  schoolName: string;
  studentPhoto?: string;

  // Step 2: Parent
  fatherName: string;
  motherName: string;
  parentMobile: string;
  alternateMobile: string;
  address: string;

  // Step 3: Academic
  previousClass: string;
  board: 'CBSE' | 'ICSE' | 'State' | 'Other' | '';
  subjectsTaken: string;
  curriculum: string;

  // Step 4: Fees
  courseJoining: string;
  batchTime: string;
  admissionDate: string;
  totalFees: number;
  amountPaid: number;
  balanceDue: number; // Auto-calc

  // Step 5: Documents
  documents: {
    photo: boolean;
    aadhar: boolean;
    marksheet: boolean;
  };
  uploadedFiles: AdmissionDocument[];

  // Step 6: Declaration
  parentSignature: string;
  studentSignature: string;
  declarationDate: string;

  // Step 7: Notes
  notes: string;
}

export const initialWizardData: AdmissionWizardData = {
  studentName: '',
  gender: '',
  dob: '',
  standard: '',
  stream: '',
  schoolName: '',
  fatherName: '',
  motherName: '',
  parentMobile: '',
  alternateMobile: '',
  address: '',
  previousClass: '',
  board: '',
  subjectsTaken: '',
  curriculum: 'Current Curriculum',
  courseJoining: '',
  batchTime: '',
  admissionDate: new Date().toISOString().slice(0, 10),
  totalFees: 0,
  amountPaid: 0,
  balanceDue: 0,
  documents: {
    photo: false,
    aadhar: false,
    marksheet: false,
  },
  uploadedFiles: [],
  parentSignature: '',
  studentSignature: '',
  declarationDate: new Date().toISOString().slice(0, 10),
  notes: '',
};
