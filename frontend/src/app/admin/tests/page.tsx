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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Test Results</h1>
          <p className="text-sm text-muted-foreground">Record and monitor student performance.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : '+ Add Test Result'}
        </Button>
      </div>

      {isAdding && (
        <SlideUp>
          <Card className="border-l-4 border-primary border-t-0 border-r-0 border-b-0 shadow-lg mb-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Enter Test Marks</h2>
              {errorMsg && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded mb-4 border border-destructive/20">{errorMsg}</div>}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Select Student</label>
                    <select 
                      name="userId" 
                      value={formData.userId} 
                      onChange={handleChange} 
                      required
                      className="flex h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {students.length === 0 && <option disabled value="">No students available.</option>}
                      {students.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
                      ))}
                    </select>
                  </div>
                  <Input label="Test Name" name="testName" value={formData.testName} onChange={handleChange} placeholder="e.g. Weekly Mock Test 4" required />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <Input label="Marks Obtained" type="number" name="marksObtained" value={formData.marksObtained} onChange={handleChange} placeholder="e.g. 85" required />
                  <Input label="Total Marks" type="number" name="totalMarks" value={formData.totalMarks} onChange={handleChange} placeholder="e.g. 100" required />
                  <Input label="Date of Test" type="date" name="testDate" value={formData.testDate} onChange={handleChange} required />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                  <Button type="submit" isLoading={submitting} disabled={students.length === 0}>Save Result</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </SlideUp>
      )}

      <FadeIn>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Student</th>
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Test Name</th>
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Score</th>
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Date</th>
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground text-right">Performance</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">Loading tests...</td>
                  </tr>
                ) : results.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      No test results found. {students.length === 0 ? 'Wait for students to register.' : 'Click add test result.'}
                    </td>
                  </tr>
                ) : (
                  results.map((res) => {
                    const percentage = (res.marksObtained / res.totalMarks) * 100;
                    return (
                      <tr key={res.id} className="border-b border-border hover:bg-muted/40 transition-colors">
                        <td className="py-4 px-6">
                          <p className="font-medium text-foreground">{res.user.name}</p>
                          <p className="text-xs text-muted-foreground">{res.user.email}</p>
                        </td>
                        <td className="py-4 px-6 text-sm text-muted-foreground">
                          {res.testName}
                        </td>
                        <td className="py-4 px-6 font-medium">
                          {res.marksObtained} <span className="text-muted-foreground/40 text-sm font-normal">/ {res.totalMarks}</span>
                        </td>
                        <td className="py-4 px-6 text-sm text-muted-foreground/60">
                          {new Date(res.testDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            percentage >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            percentage >= 50 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {percentage.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
}
