"use client";

import React, { useState } from 'react';
import { apiClient, ApiError } from '@/lib/apiClient';
import { FaPhoneAlt, FaEnvelope, FaCheckCircle } from 'react-icons/fa';

const courseOptions = [
  'Class 11 Science (Foundation)',
  'Class 12 Science (Target)',
  'JEE Main / Advanced',
  'NEET UG',
  'MHT-CET',
  'NDA Mathematics',
  'Board Exam Prep',
  'Weekend Test Series',
];

export const QuickInquiry = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [phone,     setPhone]     = useState('');
  const [course,    setCourse]    = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg,   setErrorMsg]   = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setSubmitting(true);
    try {
      await apiClient.post('/public/inquiries', {
        name: `${firstName} ${lastName}`.trim(),
        mobile: phone,
        message: `Interested in: ${course}`,
      });
      setSuccessMsg("Thanks! We'll call you back shortly.");
      setFirstName(''); setLastName(''); setPhone(''); setCourse('');
    } catch (err) {
      if (err instanceof ApiError) setErrorMsg(err.message);
      else setErrorMsg('Submission failed. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-accent/30 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* ── Left: info ───────────────────────────────── */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                Get in Touch
              </p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
                Start Your Journey With Us
              </h2>
              <p className="text-base text-muted-foreground mt-4 leading-relaxed max-w-md">
                Fill in your details and our academic counsellor will call you back within 24 hours to help you choose the right program.
              </p>
            </div>

            {/* Contact chips */}
            <div className="flex flex-col gap-4">
              <a
                href="tel:+911234567890"
                className="inline-flex items-center gap-3 text-sm font-semibold text-foreground hover:text-primary transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <FaPhoneAlt size={14} />
                </div>
                +91 123 456 7890
              </a>
              <a
                href="mailto:contact@ypgurukul.com"
                className="inline-flex items-center gap-3 text-sm font-semibold text-foreground hover:text-primary transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <FaEnvelope size={14} />
                </div>
                contact@ypgurukul.com
              </a>
            </div>
          </div>

          {/* ── Right: form ──────────────────────────────── */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-10 shadow-sm">
            {successMsg ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <FaCheckCircle size={40} className="text-primary" />
                <h3 className="text-xl font-bold text-foreground">Enquiry Submitted!</h3>
                <p className="text-sm text-muted-foreground max-w-xs">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      First Name
                    </label>
                    <input
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Rahul"
                      className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Last Name
                    </label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Sharma"
                      className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition"
                  />
                </div>

                {/* Course dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    I'm Interested In
                  </label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                  >
                    <option value="">Select a program…</option>
                    {courseOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Error */}
                {errorMsg && (
                  <p className="text-sm text-destructive font-medium">{errorMsg}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {submitting ? 'Sending…' : 'Request a Callback'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
