"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/global/Card';
import { Input } from '@/components/global/Input';
import { Button } from '@/components/global/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '@/lib/apiClient';
import { 
  FaUserGraduate, FaFileLines, FaRegCircleCheck, FaAward, 
  FaPlus, FaCalendarCheck, FaChevronDown, FaPercent 
} from 'react-icons/fa6';

interface Student {
  id: string;
  name: string;
  email: string;
}

interface TestResult {
  id: string;
  testName: string;
  marksObtained: number;
  totalMarks: number;
  testDate: string;
  user: {
    name: string;
    email: string;
  };
}

export default function AdminTestsPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    userId: '',
    testName: '',
    marksObtained: '',
    totalMarks: '',
    testDate: new Date().toISOString().split('T')[0]
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [testsRes, studentsRes] = await Promise.all([
        apiClient.get<TestResult[]>('/admin/tests'),
        apiClient.get<Student[]>('/admin/students')
      ]);
      setResults(testsRes || []);
      setStudents(studentsRes || []);
      if (studentsRes && studentsRes.length > 0 && !formData.userId) {
        setFormData(prev => ({ ...prev, userId: studentsRes[0].id }));
      }
    } catch(err) {
      console.error('Error fetching data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    try {
      await apiClient.post('/admin/tests', {
        ...formData,
        marksObtained: parseFloat(formData.marksObtained),
        totalMarks: parseFloat(formData.totalMarks)
      });
      setIsAdding(false);
      setFormData(prev => ({ ...prev, testName: '', marksObtained: '', totalMarks: '' }));
      fetchData();
    } catch(err: any) {
      setErrorMsg(err.message || 'Failed to add test result');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 md:space-y-12 pb-24 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-border/50 pb-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Examination Records
          </h1>
          <p className="text-sm text-muted-foreground/60 font-medium">
            Record and monitor individual student performance across all evaluation cycles.
          </p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`px-10 py-4 rounded-[1.5rem] font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-lg ${
            isAdding ? 'bg-muted/40 text-foreground' : 'bg-primary text-primary-foreground shadow-primary/20 active:scale-95'
          }`}
        >
          {isAdding ? 'Cancel' : <><FaPlus size={14} /> Record Score</>}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="overflow-hidden"
          >
            <div className="border border-border/50 bg-card shadow-2xl rounded-[2.5rem] overflow-hidden mb-12">
              <div className="p-8 md:p-12 space-y-10">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <FaPlus size={16} />
                   </div>
                   <h2 className="text-2xl font-bold text-foreground tracking-tight">Record Performance</h2>
                </div>
                
                {errorMsg && (
                  <div className="bg-destructive/10 text-destructive p-5 rounded-2xl text-sm font-bold border border-destructive/20">
                    {errorMsg}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">Select Student</label>
                      <div className="relative">
                         <select 
                           name="userId" 
                           value={formData.userId} 
                           onChange={handleChange} 
                           required
                           className="flex h-14 w-full rounded-2xl border border-border/40 bg-muted/10 px-6 py-2 text-sm font-bold focus:outline-none focus:ring-primary/5 focus:border-primary/20 transition-all appearance-none cursor-pointer"
                         >
                           {students.length === 0 && <option disabled value="">No registered students found.</option>}
                           {students.map(s => (
                             <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
                           ))}
                         </select>
                         <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground/40 pointer-events-none" size={10} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">Examination Title</label>
                      <Input 
                        name="testName" 
                        value={formData.testName} 
                        onChange={handleChange} 
                        placeholder="e.g. Unit Test 1 - Physics" 
                        required 
                        className="h-14 rounded-2xl bg-muted/10 border-border/40 focus:ring-primary/5 focus:border-primary/20 text-sm font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">Marks Obtained</label>
                      <Input type="number" name="marksObtained" value={formData.marksObtained} onChange={handleChange} placeholder="0" required className="h-14 rounded-2xl bg-muted/10 border-border/40" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">Total Marks</label>
                      <Input type="number" name="totalMarks" value={formData.totalMarks} onChange={handleChange} placeholder="100" required className="h-14 rounded-2xl bg-muted/10 border-border/40" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">Examination Date</label>
                      <Input type="date" name="testDate" value={formData.testDate} onChange={handleChange} required className="h-14 rounded-2xl bg-muted/10 border-border/40 px-6" />
                    </div>
                  </div>

                  <div className="pt-8 flex justify-end gap-5 border-t border-border/40 mt-10">
                    <button type="button" onClick={() => setIsAdding(false)} className="px-10 py-4 rounded-2xl font-bold text-sm text-muted-foreground/60 hover:bg-muted/40 hover:text-foreground transition-all">Discard</button>
                    <button type="submit" disabled={submitting || students.length === 0} className="px-12 py-4 rounded-2xl font-bold text-sm bg-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-50 active:scale-95">
                      {submitting ? 'Recording...' : 'Save Result'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-card border border-border/50 rounded-[2.5rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/40 bg-muted/5">
                  <th className="py-6 px-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/30">Student Profile</th>
                  <th className="py-6 px-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/30">Evaluation</th>
                  <th className="py-6 px-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/30 text-center">Score Portfolio</th>
                  <th className="py-6 px-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/30">Date</th>
                  <th className="py-6 px-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/30 text-right">Performance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-32 text-center text-muted-foreground/40 italic text-sm">
                       <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                          Loading examination data...
                       </div>
                    </td>
                  </tr>
                ) : results.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-32 text-center text-muted-foreground/40 italic text-sm">
                       <div className="flex flex-col items-center gap-5">
                          <FaAward className="opacity-10" size={48} />
                          <p className="font-medium">No examination records logged in the system.</p>
                       </div>
                    </td>
                  </tr>
                ) : (
                  results.map((res) => {
                    const percentage = (res.marksObtained / res.totalMarks) * 100;
                    return (
                      <tr key={res.id} className="hover:bg-muted/5 transition-all group">
                        <td className="py-8 px-10">
                          <div className="flex items-center gap-5">
                             <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                               {res.user.name.charAt(0).toUpperCase()}
                             </div>
                             <div className="flex flex-col gap-1">
                                <p className="font-bold text-foreground text-sm tracking-tight">{res.user.name}</p>
                                <p className="text-[10px] font-medium text-muted-foreground/40 italic">{res.user.email}</p>
                             </div>
                          </div>
                        </td>
                        <td className="py-8 px-10">
                           <div className="flex items-center gap-3 text-xs font-bold text-foreground tracking-tight">
                              <FaFileLines className="text-primary/20" size={14} />
                              {res.testName}
                           </div>
                        </td>
                        <td className="py-8 px-10 text-center">
                           <div className="flex flex-col items-center gap-1.5">
                              <span className="text-lg font-black text-foreground tracking-tighter tabular-nums">{res.marksObtained}<span className="text-muted-foreground/20 font-bold mx-1">/</span>{res.totalMarks}</span>
                              <div className="w-16 h-1 bg-muted/20 rounded-full overflow-hidden shadow-inner">
                                 <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    className="h-full bg-primary"
                                 />
                              </div>
                           </div>
                        </td>
                        <td className="py-8 px-10">
                           <div className="flex items-center gap-3 text-[11px] font-bold text-muted-foreground/40 tracking-tight">
                              <FaCalendarCheck size={14} className="opacity-20" />
                              {new Date(res.testDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                           </div>
                        </td>
                        <td className="py-8 px-10 text-right">
                           <div className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[10px] font-bold border transition-all ${
                               percentage >= 85 ? 'bg-primary text-primary-foreground border-transparent shadow-lg shadow-primary/20' : 
                               percentage >= 70 ? 'bg-muted/20 text-foreground border-border/40' : 
                               'bg-muted/10 text-muted-foreground border-border/20'
                           }`}>
                             <FaPercent size={10} className={percentage >= 85 ? 'opacity-100' : 'opacity-20'} />
                             {percentage.toFixed(0)}% Score
                           </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
