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
  slug: string;
  category: string;
  duration: string;
  createdAt: string;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '', slug: '', category: 'Foundation', description: '', duration: '', feeStructure: '',
    subjects: '', batchTimings: ''
  });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get<Course[]>('/admin/courses');
      setCourses(data);
    } catch(err) {
      console.error('Error fetching courses', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete course: ${title}?`)) return;
    try {
      await apiClient.del(`/admin/courses/${id}`);
      setCourses(courses.filter(c => c.id !== id));
    } catch(err) {
      alert('Failed to delete course');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };
    // Auto-generate slug from title
    if (name === 'title' && !formData.slug) {
      newFormData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    setFormData(newFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    try {
      await apiClient.post('/admin/courses', formData);
      setIsAdding(false);
      setFormData({ title: '', slug: '', category: 'Foundation', description: '', duration: '', feeStructure: '', subjects: '', batchTimings: '' });
      fetchCourses();
    } catch(err: any) {
      setErrorMsg(err.message || 'Failed to create course');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase">Manage Courses</h1>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">CATALOG_SYSTEM: ACADEMIC_MODULES_v3</p>
        </div>
        <Button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] px-8 py-6 rounded-full"
        >
          {isAdding ? 'CANCEL_OPERATION' : '+ ADD_NEW_COURSE'}
        </Button>
      </div>

      {isAdding && (
        <SlideUp>
          <Card className="border border-border bg-secondary/5 shadow-2xl mb-12 rounded-3xl overflow-hidden">
            <CardContent className="p-10">
              <h2 className="text-xl font-black uppercase tracking-tight mb-8">Add Course Details</h2>
              {errorMsg && (
                <div className="text-[10px] font-black uppercase tracking-widest text-foreground bg-secondary/20 p-6 rounded-xl mb-8 border border-border">
                  [ error ] {errorMsg}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="w-full">
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-3 italic">01. Course_Title</label>
                    <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. 11TH_SCIENCE_BASE" required className="h-14 rounded-2xl border-border bg-background px-4 font-bold" />
                  </div>
                  <div className="w-full">
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-3 italic">02. URL_Slug</label>
                    <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="e.g. class-11-science" required className="h-14 rounded-2xl border-border bg-background px-4 font-bold" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="w-full">
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-3 italic">03. Category_Tag</label>
                    <select 
                      name="category" 
                      value={formData.category} 
                      onChange={handleChange} 
                      className="flex h-14 w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm font-bold focus:outline-none focus:border-foreground transition-all appearance-none"
                    >
                      <option value="Foundation">Foundation (Class 8-10)</option>
                      <option value="Target">Target (Class 11-12 Board)</option>
                      <option value="Entrance">Entrance (JEE / NEET)</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-3 italic">04. Temporal_Duration</label>
                    <Input name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 1 YEAR, 6 MONTHS" required className="h-14 rounded-2xl" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="w-full">
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-3 italic">05. Subjects_Payload</label>
                    <Input name="subjects" value={formData.subjects} onChange={handleChange} placeholder="PHYSICS, CHEMISTRY, MATHS" className="h-14 rounded-2xl" />
                  </div>
                  <div className="w-full">
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-3 italic">06. Fee_Structure</label>
                    <Input name="feeStructure" value={formData.feeStructure} onChange={handleChange} placeholder="e.g. ₹50,000 / YEAR" required className="h-14 rounded-2xl" />
                  </div>
                </div>

                <div className="w-full">
                  <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-3 italic">07. Batch_Rhythm</label>
                  <Input name="batchTimings" value={formData.batchTimings} onChange={handleChange} placeholder="e.g. MORNING: 8-10AM, EVENING: 6-8PM" className="h-14 rounded-2xl" />
                </div>

                <div className="w-full">
                  <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-3 italic">08. Operational_Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} className="flex w-full rounded-2xl border border-border bg-background px-4 py-4 text-sm font-bold focus:outline-none focus:border-foreground transition-all resize-none"></textarea>
                </div>

                <div className="pt-4 flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsAdding(false)} className="px-8 py-6 rounded-full font-black uppercase tracking-widest text-[10px]">DISCARD</Button>
                  <Button type="submit" isLoading={submitting} className="px-12 py-6 rounded-full font-black uppercase tracking-widest text-[10px] bg-foreground text-background">CREATE_MODULE</Button>
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
                  <th className="py-6 px-8 font-black text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">Module_Identity</th>
                  <th className="py-6 px-8 font-black text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">Classification</th>
                  <th className="py-6 px-8 font-black text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">Cycle_Length</th>
                  <th className="py-6 px-8 font-black text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 text-right">System_Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center font-black text-[10px] uppercase tracking-widest text-muted-foreground/40">SYNCHRONIZING_MODULES...</td>
                  </tr>
                ) : courses.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center font-black text-[10px] uppercase tracking-widest text-muted-foreground/40">NO_RECORDS_FOUND.</td>
                  </tr>
                ) : (
                  courses.map((course) => (
                    <tr key={course.id} className="border-b border-border hover:bg-secondary/5 transition-all group">
                      <td className="py-6 px-8">
                        <p className="font-black text-foreground uppercase tracking-tight text-sm">{course.title}</p>
                        <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mt-1">/{course.slug}</p>
                      </td>
                      <td className="py-6 px-8">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-secondary text-foreground border border-border">
                          {course.category}
                        </span>
                      </td>
                      <td className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        {course.duration}
                      </td>
                      <td className="py-6 px-8 text-right flex items-center justify-end gap-6 h-full">
                        <button 
                          onClick={() => window.open(`/courses/${course.slug}`, '_blank')}
                          className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                        >
                          [ View ]
                        </button>
                        <button 
                          onClick={() => handleDelete(course.id, course.title)}
                          className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 hover:text-foreground transition-colors"
                        >
                          [ Delete ]
                        </button>
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
