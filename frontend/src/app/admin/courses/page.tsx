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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Manage Courses</h1>
          <p className="text-sm text-muted-foreground">Create, view, and delete classroom programs.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : '+ Add New Course'}
        </Button>
      </div>

      {isAdding && (
        <SlideUp>
          <Card className="border-l-4 border-primary border-t-0 border-r-0 border-b-0 shadow-lg mb-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Add Course Details</h2>
              {errorMsg && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded mb-4 border border-destructive/20">{errorMsg}</div>}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Course Title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. 11th Science Base" required />
                  <Input label="URL Slug" name="slug" value={formData.slug} onChange={handleChange} placeholder="e.g. class-11-science" required />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="flex h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option value="Foundation">Foundation (Class 8-10)</option>
                      <option value="Target">Target (Class 11-12 Board)</option>
                      <option value="Entrance">Entrance (JEE / NEET)</option>
                    </select>
                  </div>
                  <Input label="Duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 1 Year, 6 Months" required />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Subjects (comma-separated)" name="subjects" value={formData.subjects} onChange={handleChange} placeholder="Physics, Chemistry, Maths" />
                  <Input label="Fee Structure" name="feeStructure" value={formData.feeStructure} onChange={handleChange} placeholder="e.g. ₹50,000 / Year" required />
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-foreground mb-1.5">Batch Timings (JSON text or notes)</label>
                  <Input name="batchTimings" value={formData.batchTimings} onChange={handleChange} placeholder="e.g. Morning: 8-10am, Evening: 6-8pm" />
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-foreground mb-1.5">Course Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"></textarea>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                  <Button type="submit" isLoading={submitting}>Create Course</Button>
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
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Course Title</th>
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Category</th>
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Duration</th>
                  <th className="py-4 px-6 font-semibold text-sm text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted-foreground">Loading courses...</td>
                  </tr>
                ) : courses.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted-foreground">No courses found. Click add new.</td>
                  </tr>
                ) : (
                  courses.map((course) => (
                    <tr key={course.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-medium text-slate-900 dark:text-white">{course.title}</p>
                        <p className="text-xs text-slate-500">/{course.slug}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          {course.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{course.duration}</td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button 
                          onClick={() => window.open(`/courses/${course.slug}`, '_blank')}
                          className="text-primary hover:underline text-sm font-medium"
                        >
                          View
                        </button>
                        <span className="text-border">|</span>
                        <button 
                          onClick={() => handleDelete(course.id, course.title)}
                          className="text-red-600 hover:text-red-700 hover:underline text-sm font-medium"
                        >
                          Delete
                        </button>
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
