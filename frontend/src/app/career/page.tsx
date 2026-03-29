"use client";

import React, { useState } from 'react';
import { apiClient } from '@/lib/apiClient';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaArrowRight, FaCheckCircle, FaMapMarkerAlt, FaClock,
  FaTimes, FaBriefcase, FaUsers, FaLightbulb, FaHeart,
} from 'react-icons/fa';

// ─── Data ─────────────────────────────────────────────────────────────────────

const openings = [
  {
    id: '01',
    title: 'Senior Physics Faculty',
    type: 'Full-time',
    location: 'Main Campus',
    tags: ['Teaching', 'JEE', 'Mentorship'],
    description:
      'We are looking for an experienced Physics teacher with a strong track record of helping students secure top ranks in JEE Advanced. The ideal candidate brings deep subject knowledge, excellent communication skills, and genuine care for student success.',
    requirements: [
      'M.Sc./B.Tech in Physics or related field',
      '3+ years of coaching experience for JEE/NEET',
      'Proven results with top 500 AIR achievers',
      'Ability to design DPPs and mock test papers',
    ],
  },
  {
    id: '02',
    title: 'Academic Counsellor',
    type: 'Full-time',
    location: 'Knowledge City Campus',
    tags: ['Counselling', 'Student Support', 'Parents'],
    description:
      'Join our student support team to guide students and parents through program selection, exam strategy, and academic planning. You\'ll be the first point of contact for families and a trusted mentor throughout their journey.',
    requirements: [
      'Background in education, psychology, or counselling',
      'Excellent interpersonal and communication skills',
      'Empathy and patience in student-facing interactions',
      'Experience with CRM tools is a plus',
    ],
  },
  {
    id: '03',
    title: 'Digital Marketing Lead',
    type: 'Hybrid',
    location: 'Remote / Hybrid',
    tags: ['Marketing', 'Social Media', 'Growth'],
    description:
      'Drive the digital presence of YP Gurukul across platforms. This role requires expertise in performance marketing, content strategy, and education-sector storytelling to reach students and parents effectively.',
    requirements: [
      '3+ years in digital marketing or growth roles',
      'Hands-on experience with Meta Ads, Google Ads, SEO',
      'Strong copywriting and content creation skills',
      'Education or coaching sector experience is preferred',
    ],
  },
];

const perks = [
  { icon: <FaBriefcase size={16} />, title: 'Curriculum Freedom',    desc: 'Design your own teaching approach with full autonomy over how you deliver content.' },
  { icon: <FaUsers size={16} />,     title: 'Collaborative Culture',  desc: 'Work alongside passionate educators, counsellors, and content creators every day.' },
  { icon: <FaLightbulb size={16} />, title: 'Growth Opportunities',   desc: 'Regular training, conferences, and pathways to senior and leadership roles.' },
  { icon: <FaHeart size={16} />,     title: 'Wellness & Benefits',    desc: 'Competitive salary, health coverage, flexible hours, and a supportive work environment.' },
];

const faq = [
  {
    q: 'How does the hiring process work?',
    a: 'We review every application, followed by a phone screening, a subject/skill assessment, and a final interview with the team lead. The process typically takes 2–3 weeks.',
  },
  {
    q: 'Is relocation support available?',
    a: 'Yes. For residential roles at our Knowledge City campus we provide relocation assistance including temporary accommodation and moving support.',
  },
  {
    q: 'Can I apply for more than one role?',
    a: "Absolutely. Apply for each role separately with a note explaining your interest in both so the hiring team can consider you appropriately.",
  },
  {
    q: "What if I don't see a matching role?",
    a: 'Send us a general application below — we keep strong profiles on file and reach out when a new need arises that fits your background.',
  },
];

// ─── Apply Modal ──────────────────────────────────────────────────────────────

function ApplyModal({ position, onClose }: { position: string; onClose: () => void }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', mobile: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrMsg('');
    try {
      await apiClient.post('/career/apply', {
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        mobile: form.mobile,
        position,
      });
      setStatus('success');
    } catch {
      setStatus('error');
      setErrMsg('Submission failed. Please try again or email us directly.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-start justify-center p-4 overflow-y-auto"
    >
      <div className="max-w-xl w-full my-8 md:my-16">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Applying for</p>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground">{position}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0 mt-1"
            aria-label="Close"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {status === 'success' ? (
          <div className="rounded-2xl border border-primary/20 bg-accent/30 p-10 text-center flex flex-col items-center gap-4">
            <FaCheckCircle size={36} className="text-primary" />
            <h3 className="text-lg font-bold text-foreground">Application Submitted!</h3>
            <p className="text-sm text-muted-foreground">
              Thank you for applying. We'll review your profile and get back to you within 5–7 working days.
            </p>
            <button
              onClick={onClose}
              className="mt-2 text-sm font-semibold text-primary hover:underline"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col gap-5"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'firstName', label: 'First Name', placeholder: 'Rahul' },
                { name: 'lastName',  label: 'Last Name',  placeholder: 'Sharma' },
              ].map((f) => (
                <div key={f.name} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {f.label}
                  </label>
                  <input
                    required
                    name={f.name}
                    value={form[f.name as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="rahul@example.com"
                className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</label>
              <input
                required
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>

            {errMsg && <p className="text-sm text-destructive font-medium">{errMsg}</p>}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {status === 'loading' ? 'Submitting…' : 'Submit Application'}
            </button>

            <p className="text-xs text-center text-muted-foreground">
              We respect your privacy. Your details are only used for this application.
            </p>
          </form>
        )}
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CareerPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [applyPosition, setApplyPosition] = useState<string | null>(null);

  const openApply = (position: string) => setApplyPosition(position);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="border-b border-border bg-secondary py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Careers at YP Gurukul
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight max-w-2xl mb-5">
            Teach, Guide &amp; Grow with Us
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            Join a team of passionate educators, counsellors, and professionals dedicated to
            transforming students' lives. We're always looking for people who share our
            commitment to academic excellence and student success.
          </p>
        </div>
      </section>

      {/* ── Perks ────────────────────────────────────────────── */}
      <section className="border-b border-border py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Why Join Us
          </p>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-foreground mb-10">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {perks.map((p, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 p-5 md:p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-primary">
                  {p.icon}
                </div>
                <h3 className="text-sm font-bold text-foreground">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Job listings ─────────────────────────────────────── */}
      <section className="border-b border-border py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Open Positions
          </p>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-foreground mb-10">
            Current Openings
          </h2>

          <div className="flex flex-col gap-4">
            {openings.map((job) => {
              const isOpen = expandedJob === job.id;
              return (
                <div
                  key={job.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? 'border-primary/40 shadow-md' : 'border-border hover:border-primary/20'
                  } bg-card`}
                >
                  {/* Card header — always visible */}
                  <button
                    onClick={() => setExpandedJob(isOpen ? null : job.id)}
                    className="w-full text-left p-5 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg md:text-xl font-bold text-foreground leading-snug">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <FaClock size={11} className="text-primary" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaMapMarkerAlt size={11} className="text-primary" /> {job.location}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'rotate-45 bg-primary border-primary text-primary-foreground' : 'border-border text-muted-foreground'
                    }`}>
                      <FaArrowRight size={12} className={isOpen ? '-rotate-90' : ''} />
                    </div>
                  </button>

                  {/* Expandable detail */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        key="detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-6 border-t border-border pt-5 flex flex-col gap-6">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {job.description}
                          </p>

                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-3">
                              Requirements
                            </p>
                            <ul className="flex flex-col gap-2">
                              {job.requirements.map((r, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                                  <FaCheckCircle size={13} className="text-primary mt-0.5 shrink-0" />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-wrap gap-3 pt-2">
                            <button
                              onClick={() => openApply(job.title)}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
                            >
                              Apply Now <FaArrowRight size={12} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* General application CTA */}
          <div className="mt-10 p-6 md:p-8 rounded-2xl border border-dashed border-border bg-secondary text-center flex flex-col items-center gap-4">
            <p className="text-sm font-semibold text-foreground">
              Don't see the right role?
            </p>
            <p className="text-xs text-muted-foreground max-w-md">
              We keep strong profiles on file. Send us a general application and we'll reach out
              when a fitting opportunity opens up.
            </p>
            <button
              onClick={() => openApply('General Application')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-card transition-colors"
            >
              Send General Application <FaArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-secondary border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            FAQ
          </p>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-foreground mb-10">
            Common Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {faq.map((item, i) => (
              <div key={i} className="p-5 md:p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-sm font-bold text-foreground mb-3">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Apply modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {applyPosition && (
          <ApplyModal position={applyPosition} onClose={() => setApplyPosition(null)} />
        )}
      </AnimatePresence>

    </div>
  );
}
