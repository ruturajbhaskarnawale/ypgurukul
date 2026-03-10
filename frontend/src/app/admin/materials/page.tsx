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
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase">Study Materials</h1>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">ARCHIVE_SYSTEM: RESOURCE_REPOSITORY_v4</p>
        </div>
        <Button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] px-8 py-6 rounded-full"
        >
          {isAdding ? 'CANCEL_OPERATION' : '+ UPLOAD_MATERIAL'}
        </Button>
      </div>

      {isAdding && (
        <SlideUp>
          <Card className="border border-border bg-secondary/5 shadow-2xl mb-12 rounded-3xl overflow-hidden">
            <CardContent className="p-10">
              <h2 className="text-xl font-black uppercase tracking-tight mb-8">Upload New Material</h2>
              {errorMsg && (
                <div className="text-[10px] font-black uppercase tracking-widest text-foreground bg-secondary/20 p-6 rounded-xl mb-8 border border-border">
                  [ error ] {errorMsg}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="w-full">
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-3 italic">01. Material_Title</label>
                    <Input 
                      name="title" 
                      value={formData.title} 
                      onChange={handleChange} 
                      placeholder="e.g. CURRENT_ELECTRICITY_NOTES_PART_1" 
                      required 
                      className="h-14 rounded-2xl border-border bg-background px-4 font-bold"
                    />
                  </div>
                  
                  <div className="w-full">
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-3 italic">02. Associated_Module</label>
                    <select 
                      name="courseId" 
                      value={formData.courseId} 
                      onChange={handleChange} 
                      required
                      className="flex h-14 w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm font-bold focus:outline-none focus:border-foreground transition-all appearance-none"
                    >
                      {courses.length === 0 && <option disabled value="">No courses available. Create one first.</option>}
                      {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="w-full">
                  <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-3 italic">03. Payload_Upload (PDF)</label>
                  <input 
                    type="file" 
                    accept=".pdf"
                    className="block w-full text-[10px] font-black uppercase tracking-widest text-muted-foreground file:mr-6 file:py-3 file:px-8 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-foreground file:text-background hover:file:opacity-90 cursor-pointer border border-border rounded-2xl p-3 bg-background" 
                  />
                  <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mt-4">
                    [ note ] Upload logic is currently simulated for environmental validation.
                  </p>
                </div>

                <div className="pt-4 flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsAdding(false)} className="px-8 py-6 rounded-full font-black uppercase tracking-widest text-[10px]">DISCARD</Button>
                  <Button type="submit" isLoading={submitting} disabled={courses.length === 0} className="px-12 py-6 rounded-full font-black uppercase tracking-widest text-[10px] bg-foreground text-background">SAVE_RESOURCE</Button>
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
                  <th className="py-6 px-8 font-black text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">Resource_Identity</th>
                  <th className="py-6 px-8 font-black text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">Module_Origin</th>
                  <th className="py-6 px-8 font-black text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">Temporal_Stamp</th>
                  <th className="py-6 px-8 font-black text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 text-right">System_Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center font-black text-[10px] uppercase tracking-widest text-muted-foreground/40">SYNCHRONIZING_ARCHIVES...</td>
                  </tr>
                ) : materials.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center font-black text-[10px] uppercase tracking-widest text-muted-foreground/40">
                      NO_RESOURCES_FOUND.
                    </td>
                  </tr>
                ) : (
                  materials.map((mat) => (
                    <tr key={mat.id} className="border-b border-border hover:bg-secondary/5 transition-all group">
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-foreground flex-shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="font-black text-foreground uppercase tracking-tight text-sm">{mat.title}</span>
                        </div>
                      </td>
                      <td className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        {mat.course?.title || 'Unknown Module'}
                      </td>
                      <td className="py-6 px-8 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                        {new Date(mat.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-6 px-8 text-right">
                        <a 
                          href={mat.fileUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                        >
                          [ Access_File ]
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
