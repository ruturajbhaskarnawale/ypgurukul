"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/global/Card';
import { Input } from '@/components/global/Input';
import { Button } from '@/components/global/Button';
import { FadeIn, SlideUp } from '@/components/animations/MotionUtils';
import { apiClient } from '@/lib/apiClient';

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
      setResults(testsRes);
      setStudents(studentsRes);
      if (studentsRes.length > 0 && !formData.userId) {
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
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase">Test Results</h1>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">RECORD_SYSTEM: PERFORMANCE_LOG_v2</p>
        </div>
        <Button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] px-8 py-6 rounded-full"
        >
          {isAdding ? 'CANCEL_OPERATION' : '+ ADD_TEST_RESULT'}
        </Button>
      </div>

      {isAdding && (
        <SlideUp>
          <Card className="border border-border bg-secondary/5 shadow-2xl mb-12 rounded-3xl overflow-hidden">
            <CardContent className="p-10">
              <h2 className="text-xl font-black uppercase tracking-tight mb-8">Enter Test Marks</h2>
              {errorMsg && (
                <div className="text-[10px] font-black uppercase tracking-widest text-foreground bg-secondary/20 p-6 rounded-xl mb-8 border border-border">
                  [ error ] {errorMsg}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="w-full">
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-3 italic">01. Select_Student</label>
                    <select 
                      name="userId" 
                      value={formData.userId} 
                      onChange={handleChange} 
                      required
                      className="flex h-14 w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm font-bold focus:outline-none focus:border-foreground transition-all appearance-none"
                    >
                      {students.length === 0 && <option disabled value="">No students available.</option>}
                      {students.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-3 italic">02. Test_Identity</label>
                    <Input 
                      name="testName" 
                      value={formData.testName} 
                      onChange={handleChange} 
                      placeholder="e.g. WEEKLY_MOCK_TEST_4" 
                      required 
                      className="h-14 rounded-2xl border-border bg-background px-4 font-bold"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-3 italic">03. Marks_Obtained</label>
                    <Input type="number" name="marksObtained" value={formData.marksObtained} onChange={handleChange} placeholder="85" required className="h-14 rounded-2xl" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-3 italic">04. Total_Marks</label>
                    <Input type="number" name="totalMarks" value={formData.totalMarks} onChange={handleChange} placeholder="100" required className="h-14 rounded-2xl" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-3 italic">05. Test_Date</label>
                    <Input type="date" name="testDate" value={formData.testDate} onChange={handleChange} required className="h-14 rounded-2xl" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsAdding(false)} className="px-8 py-6 rounded-full font-black uppercase tracking-widest text-[10px]">DISCARD</Button>
                  <Button type="submit" isLoading={submitting} disabled={students.length === 0} className="px-12 py-6 rounded-full font-black uppercase tracking-widest text-[10px] bg-foreground text-background">SAVE_RESULT</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </SlideUp>
      )}

      <FadeIn>
        <div className="border border-border rounded-3xl bg-background overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary/10">
                  <th className="py-6 px-8 font-black text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">Student_Entity</th>
                  <th className="py-6 px-8 font-black text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">Test_Module</th>
                  <th className="py-6 px-8 font-black text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">Payload_Score</th>
                  <th className="py-6 px-8 font-black text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">Temporal_Stamp</th>
                  <th className="py-6 px-8 font-black text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 text-right">Performance_Metric</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center font-black text-[10px] uppercase tracking-widest text-muted-foreground/40">SYNCHRONIZING_DATA...</td>
                  </tr>
                ) : results.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center font-black text-[10px] uppercase tracking-widest text-muted-foreground/40">
                      NO_RECORDS_AVAILABLE.
                    </td>
                  </tr>
                ) : (
                  results.map((res) => {
                    const percentage = (res.marksObtained / res.totalMarks) * 100;
                    return (
                      <tr key={res.id} className="border-b border-border hover:bg-secondary/5 transition-all group">
                        <td className="py-6 px-8">
                          <p className="font-black text-foreground uppercase tracking-tight text-sm">{res.user.name}</p>
                          <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mt-1 lowercase">{res.user.email}</p>
                        </td>
                        <td className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                          {res.testName}
                        </td>
                        <td className="py-6 px-8 font-black text-foreground tracking-tighter">
                          {res.marksObtained} <span className="text-muted-foreground/20 text-[10px] font-bold tracking-widest">/ {res.totalMarks}</span>
                        </td>
                        <td className="py-6 px-8 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                          {new Date(res.testDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="py-6 px-8 text-right">
                          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-secondary text-foreground border border-border">
                            [ {percentage.toFixed(1)}% ]
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
