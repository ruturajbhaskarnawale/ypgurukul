"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/global/Card';
import { Input } from '@/components/global/Input';
import { Button } from '@/components/global/Button';
import { FadeIn, SlideUp } from '@/components/animations/MotionUtils';
import { apiClient } from '@/lib/apiClient';

interface Course {
  id: string;
  title: string;
}

interface Material {
  id: string;
  title: string;
  fileUrl: string;
  createdAt: string;
  course: {
    title: string;
  };
}

export default function AdminMaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    courseId: '',
    fileUrl: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [matsRes, coursesRes] = await Promise.all([
        apiClient.get<Material[]>('/admin/materials'),
        apiClient.get<Course[]>('/admin/courses')
      ]);
      setMaterials(matsRes);
      setCourses(coursesRes);
      if (coursesRes.length > 0 && !formData.courseId) {
        setFormData(prev => ({ ...prev, courseId: coursesRes[0].id }));
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
      // For demo, we are pretending the file is at a static URL if they didn't provide one
      // In reality, you'd upload the file to S3 and get the URL back here
      const finalData = {
        ...formData,
        fileUrl: formData.fileUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      };
      
      await apiClient.post('/admin/materials', finalData);
      setIsAdding(false);
      setFormData({ title: '', courseId: courses.length > 0 ? courses[0].id : '', fileUrl: '' });
      fetchData();
    } catch(err: any) {
      setErrorMsg(err.message || 'Failed to upload material');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Study Materials</h1>
          <p className="text-sm text-muted-foreground">Upload notes, sheets, and resources for students.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : '+ Upload Material'}
        </Button>
      </div>

      {isAdding && (
        <SlideUp>
          <Card className="border-l-4 border-primary border-t-0 border-r-0 border-b-0 shadow-lg mb-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Upload New Material</h2>
              {errorMsg && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded mb-4 border border-destructive/20">{errorMsg}</div>}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input 
                    label="Material Title" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="e.g. Current Electricity Notes Part 1" 
                    required 
                  />
                  
                  <div className="w-full">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Associated Course</label>
                    <select 
                      name="courseId" 
                      value={formData.courseId} 
                      onChange={handleChange} 
                      required
                      className="flex h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {courses.length === 0 && <option disabled value="">No courses available. Create one first.</option>}
                      {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-foreground mb-1.5">File Upload (PDF)</label>
                  <input 
                    type="file" 
                    accept=".pdf"
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer border border-border rounded-md p-1.5" 
                  />
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    Note: File upload logic is simulated for this demo.
                  </p>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                  <Button type="submit" isLoading={submitting} disabled={courses.length === 0}>Upload File</Button>
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
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Material Title</th>
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Course</th>
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Date Added</th>
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted-foreground">Loading materials...</td>
                  </tr>
                ) : materials.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted-foreground">
                      No materials found. {courses.length === 0 ? 'Add a course first to upload materials.' : 'Click upload to add some.'}
                    </td>
                  </tr>
                ) : (
                  materials.map((mat) => (
                    <tr key={mat.id} className="border-b border-border hover:bg-muted/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium text-foreground">{mat.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-muted-foreground">
                        {mat.course?.title || 'Unknown Course'}
                      </td>
                      <td className="py-4 px-6 text-sm text-muted-foreground/60">
                        {new Date(mat.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <a 
                          href={mat.fileUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-primary hover:underline text-sm font-medium"
                        >
                          View / Download
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
