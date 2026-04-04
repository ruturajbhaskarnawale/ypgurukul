"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/global/Card';
import { Input } from '@/components/global/Input';
import { Button } from '@/components/global/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '@/lib/apiClient';
import { 
  FaFileLines, FaBookOpen, FaCalendarCheck, FaPlus, 
  FaCloudArrowUp, FaArrowUpRightFromSquare, FaChevronDown 
} from 'react-icons/fa6';

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
      setMaterials(matsRes || []);
      setCourses(coursesRes || []);
      if (coursesRes && coursesRes.length > 0 && !formData.courseId) {
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
    <div className="space-y-10 md:space-y-12 pb-24 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-border/50 pb-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Study Resources
          </h1>
          <p className="text-sm text-muted-foreground/60 font-medium">
            Upload and manage study guides, notes, and session PDFs.
          </p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`px-10 py-4 rounded-[1.5rem] font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-lg ${
            isAdding ? 'bg-muted/40 text-foreground' : 'bg-primary text-primary-foreground shadow-primary/20 active:scale-95'
          }`}
        >
          {isAdding ? 'Cancel' : <><FaPlus size={14} /> New Resource</>}
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
                   <h2 className="text-2xl font-bold text-foreground tracking-tight">Upload New Resource</h2>
                </div>
                
                {errorMsg && (
                   <div className="bg-destructive/10 text-destructive p-5 rounded-2xl text-sm font-bold border border-destructive/20">
                    {errorMsg}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">Resource Title</label>
                      <Input 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        placeholder="e.g. Thermodynamics Chapter 1 Notes" 
                        required 
                        className="h-14 rounded-2xl bg-muted/10 border-border/40 focus:ring-primary/5 focus:border-primary/20 text-sm font-bold"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">Associated Program</label>
                      <div className="relative">
                         <select 
                           name="courseId" 
                           value={formData.courseId} 
                           onChange={handleChange} 
                           required
                           className="flex h-14 w-full rounded-2xl border border-border/40 bg-muted/10 px-6 py-2 text-sm font-bold focus:outline-none focus:ring-primary/5 focus:border-primary/20 transition-all appearance-none cursor-pointer"
                         >
                           {courses.length === 0 && <option disabled value="">No programs available.</option>}
                           {courses.map(c => (
                             <option key={c.id} value={c.id}>{c.title}</option>
                           ))}
                         </select>
                         <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground/40 pointer-events-none" size={10} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">Document Upload</label>
                    <div className="border-2 border-dashed border-border/50 rounded-[2rem] p-12 flex flex-col items-center justify-center gap-5 bg-muted/5 group hover:border-primary/30 transition-all cursor-pointer shadow-inner">
                       <div className="w-16 h-16 rounded-2xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground/40 group-hover:text-primary group-hover:border-primary/20 transition-all shadow-sm">
                          <FaCloudUploadAlt size={28} />
                       </div>
                       <div className="text-center">
                          <p className="text-sm font-bold text-foreground">Click to select or drag and drop</p>
                          <p className="text-[10px] font-medium text-muted-foreground/40 mt-1.5 uppercase tracking-widest">PDF Documents (Max 10MB)</p>
                       </div>
                       <input type="file" className="hidden" accept=".pdf" />
                    </div>
                    <p className="text-[10px] font-medium text-primary/40 italic flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse" />
                      File upload is simulated for this demonstration.
                    </p>
                  </div>

                  <div className="pt-8 flex justify-end gap-5 border-t border-border/40">
                    <button type="button" onClick={() => setIsAdding(false)} className="px-10 py-4 rounded-2xl font-bold text-sm text-muted-foreground/60 hover:bg-muted/40 hover:text-foreground transition-all">Discard</button>
                    <button type="submit" disabled={submitting || courses.length === 0} className="px-12 py-4 rounded-2xl font-bold text-sm bg-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-50 active:scale-95">
                      {submitting ? 'Uploading...' : 'Save Resource'}
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
                  <th className="py-6 px-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/30">Resource History</th>
                  <th className="py-6 px-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/30">Program</th>
                  <th className="py-6 px-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/30">Added On</th>
                  <th className="py-6 px-10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/30 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-32 text-center text-muted-foreground/40 italic text-sm">
                       <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                          Loading resources...
                       </div>
                    </td>
                  </tr>
                ) : materials.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-32 text-center text-muted-foreground/40 italic text-sm">
                       <div className="flex flex-col items-center gap-5">
                          <FaFileLines className="opacity-10" size={48} />
                          <p className="font-medium">No study materials found in the repository.</p>
                       </div>
                    </td>
                  </tr>
                ) : (
                  materials.map((mat) => (
                    <tr key={mat.id} className="hover:bg-muted/5 transition-all group">
                      <td className="py-8 px-10">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-inner border border-primary/10">
                            <FaFileLines size={16} />
                          </div>
                          <span className="font-bold text-foreground text-sm tracking-tight">{mat.title}</span>
                        </div>
                      </td>
                      <td className="py-8 px-10">
                        <div className="flex items-center gap-3 text-[11px] font-bold tracking-tight text-muted-foreground/60">
                           <FaBookOpen size={12} className="text-primary/20" />
                           {mat.course?.title || 'General'}
                        </div>
                      </td>
                      <td className="py-8 px-10 text-[11px] font-bold text-muted-foreground/20 tracking-tight">
                        <div className="flex items-center gap-3">
                           <FaCalendarCheck size={14} />
                           {new Date(mat.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </td>
                      <td className="py-8 px-10 text-right">
                        <a 
                          href={mat.fileUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-muted/10 hover:bg-primary text-muted-foreground/60 hover:text-primary-foreground border border-border/50 hover:border-transparent transition-all text-[11px] font-bold shadow-sm"
                        >
                          <FaArrowUpRightFromSquare size={12} />
                          Open
                        </a>
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
