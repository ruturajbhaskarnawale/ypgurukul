"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/global/Card';
import { Input } from '@/components/global/Input';
import { Button } from '@/components/global/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '@/lib/apiClient';
import { 
  FaBookOpen, FaClock, FaTag, FaPlus, 
  FaTrashCan, FaArrowUpRightFromSquare, FaChevronDown,
  FaLayersGroup
} from 'react-icons/fa6';

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
      setCourses(data || []);
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
    <div className="space-y-10 md:space-y-12 pb-24 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-border/50 pb-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Academic Programs
          </h1>
          <p className="text-sm text-muted-foreground/60 font-medium">
            Manage your curriculum, enrollment categories, and program durations.
          </p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`px-10 py-4 rounded-[1.5rem] font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-lg ${
            isAdding ? 'bg-muted/40 text-foreground' : 'bg-primary text-primary-foreground shadow-primary/20 active:scale-95'
          }`}
        >
          {isAdding ? 'Cancel' : <><FaPlus size={14} /> New Program</>}
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
                   <h2 className="text-2xl font-bold text-foreground tracking-tight">Create New Program</h2>
                </div>
                
                {errorMsg && (
                  <div className="bg-destructive/10 text-destructive p-5 rounded-2xl text-sm font-bold border border-destructive/20">
                    {errorMsg}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">Program Title</label>
                      <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Class 11 Science (Foundation)" required className="h-14 rounded-2xl bg-muted/10 border-border/40 focus:ring-primary/5 focus:border-primary/20 text-sm font-bold" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">URL Identifier</label>
                      <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="e.g. class-11-science" required className="h-14 rounded-2xl bg-muted/10 border-border/40 focus:ring-primary/5 focus:border-primary/20 text-sm font-bold" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">Category</label>
                      <div className="relative">
                         <select 
                           name="category" 
                           value={formData.category} 
                           onChange={handleChange} 
                           className="flex h-14 w-full rounded-2xl border border-border/40 bg-muted/10 px-6 py-2 text-sm font-bold focus:outline-none focus:ring-primary/5 focus:border-primary/20 transition-all appearance-none cursor-pointer"
                         >
                           <option value="Foundation">Foundation (Class 8-10)</option>
                           <option value="Target">Target (Class 11-12 Boards)</option>
                           <option value="Entrance">Entrance (JEE / NEET)</option>
                         </select>
                         <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground/40 pointer-events-none" size={10} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">Total Duration</label>
                      <Input name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 1 Year, 6 Months" required className="h-14 rounded-2xl bg-muted/10 border-border/40" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">Specific Subjects</label>
                      <Input name="subjects" value={formData.subjects} onChange={handleChange} placeholder="e.g. Physics, Chemistry, Maths" className="h-14 rounded-2xl bg-muted/10 border-border/40" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">Fee Structure</label>
                      <Input name="feeStructure" value={formData.feeStructure} onChange={handleChange} placeholder="e.g. ₹50,000 / Year" required className="h-14 rounded-2xl bg-muted/10 border-border/40" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">Batch Timings</label>
                    <Input name="batchTimings" value={formData.batchTimings} onChange={handleChange} placeholder="e.g. Morning 8-10 AM, Evening 6-8 PM" className="h-14 rounded-2xl bg-muted/10 border-border/40" />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">Program Overview</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="flex min-h-[140px] w-full rounded-2xl border border-border/40 bg-muted/10 px-6 py-5 text-sm font-medium focus:outline-none focus:ring-primary/5 focus:border-primary/20 transition-all resize-none shadow-inner"></textarea>
                  </div>

                  <div className="pt-8 flex justify-end gap-5 border-t border-border/40">
                    <button type="button" onClick={() => setIsAdding(false)} className="px-10 py-4 rounded-2xl font-bold text-sm text-muted-foreground/60 hover:bg-muted/40 hover:text-foreground transition-all">Discard</button>
                    <button type="submit" disabled={submitting} className="px-12 py-4 rounded-2xl font-bold text-sm bg-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-50 active:scale-95">
                      {submitting ? 'Creating...' : 'Launch Program'}
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
                  <th className="py-6 px-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/30">Program Details</th>
                  <th className="py-6 px-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/30">Category</th>
                  <th className="py-6 px-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/30">Duration</th>
                  <th className="py-6 px-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/30 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-32 text-center text-muted-foreground/40 italic text-sm">
                       <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                          Synchronizing academic data...
                       </div>
                    </td>
                  </tr>
                ) : courses.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-32 text-center text-muted-foreground/40 italic text-sm">
                       <div className="flex flex-col items-center gap-5">
                          <FaLayersGroup className="opacity-10" size={48} />
                          <p className="font-medium">No academic programs registered yet.</p>
                       </div>
                    </td>
                  </tr>
                ) : (
                  courses.map((course) => (
                    <tr key={course.id} className="hover:bg-muted/5 transition-all group">
                      <td className="py-8 px-10">
                        <div className="flex flex-col gap-1.5">
                           <p className="font-bold text-foreground text-sm tracking-tight">{course.title}</p>
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-muted-foreground/20 uppercase tracking-widest group-hover:text-primary/40 transition-colors">/{course.slug}</span>
                           </div>
                        </div>
                      </td>
                      <td className="py-8 px-10">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold bg-muted/20 text-muted-foreground/60 border border-border/40 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all">
                          {course.category}
                        </span>
                      </td>
                      <td className="py-8 px-10 text-[11px] font-bold tracking-tight text-muted-foreground/60">
                        <div className="flex items-center gap-3">
                           <FaClock className="text-muted-foreground/20" size={14} />
                           {course.duration}
                        </div>
                      </td>
                      <td className="py-8 px-10 text-right">
                        <div className="flex items-center justify-end gap-8">
                          <button 
                            onClick={() => window.open(`/courses/${course.slug}`, '_blank')}
                            className="text-[11px] font-bold text-muted-foreground/40 hover:text-primary transition-all flex items-center gap-2.5"
                          >
                            <FaArrowUpRightFromSquare size={12} />
                            View
                          </button>
                          <button 
                            onClick={() => handleDelete(course.id, course.title)}
                            className="text-[11px] font-bold text-muted-foreground/20 hover:text-destructive transition-all flex items-center gap-2.5"
                          >
                            <FaTrashCan size={12} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
