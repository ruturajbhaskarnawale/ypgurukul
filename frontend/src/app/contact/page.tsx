"use client";

import React, { useState } from 'react';
import { apiClient, ApiError } from '@/lib/apiClient';
import {
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
  FaClock, FaCheckCircle, FaWhatsapp,
} from 'react-icons/fa';

// ─── Data ─────────────────────────────────────────────────────────────────────

const contactInfo = [
  {
    icon: <FaPhoneAlt size={16} />,
    label: 'Call Us',
    value: '+91 123 456 7890',
    href: 'tel:+911234567890',
    sub: 'Mon – Sat, 9 AM – 7 PM',
  },
  {
    icon: <FaWhatsapp size={16} />,
    label: 'WhatsApp',
    value: '+91 123 456 7890',
    href: 'https://wa.me/911234567890',
    sub: 'Quick replies during office hours',
  },
  {
    icon: <FaEnvelope size={16} />,
    label: 'Email Us',
    value: 'contact@ypgurukul.com',
    href: 'mailto:contact@ypgurukul.com',
    sub: 'We reply within 24 hours',
  },
  {
    icon: <FaClock size={16} />,
    label: 'Office Hours',
    value: 'Mon – Sat: 9 AM – 7 PM',
    href: null,
    sub: 'Sunday: Closed',
  },
];

const locations = [
  {
    name: 'Main Campus',
    type: 'Headquarters',
    address: '123 Education Lane, Knowledge City, Mumbai – 400001',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8329615599024!2d72.88094977457787!3d19.07062228148902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c897f223fbad%3A0xe5db976d8dfced9d!2sBandra%20Kurla%20Complex!5e0!3m2!1sen!2sin!4v1709405400000!5m2!1sen!2sin',
  },
  {
    name: 'West Wing Campus',
    type: 'Learning Centre',
    address: '456 Scholar Square, Bandra Kurla Complex, Mumbai – 400051',
    mapSrc: null,
  },
];

const courses = [
  'JEE Main & Advanced',
  'NEET',
  'MHT-CET',
  'Board Exam Prep (10th)',
  'Board Exam Prep (12th)',
  'NDA Mathematics',
  'Scholarship / Olympiad',
  'Other / Not Sure',
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', mobile: '', course: '', message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    try {
      await apiClient.post('/public/inquiries', {
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        message: `[${form.course}] ${form.message}`,
      });
      setSuccess(true);
      setForm({ name: '', email: '', mobile: '', course: '', message: '' });
    } catch (err) {
      setErrorMsg(
        err instanceof ApiError
          ? err.message
          : 'Something went wrong. Please try again or call us directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Page header ────────────────────────────────────────── */}
      <section className="border-b border-border bg-secondary py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Get in Touch
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight max-w-2xl mb-4">
            We'd Love to Hear From You
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            Whether you have a question about our courses, want to book a free counselling
            session, or need help choosing the right program — our team is here to help.
          </p>
        </div>
      </section>

      {/* ── Contact info cards ──────────────────────────────────── */}
      <section className="border-b border-border py-12 md:py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {contactInfo.map((c, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-primary shrink-0">
                  {c.icon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {c.label}
                  </span>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="text-sm font-bold text-foreground hover:text-primary transition-colors"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span className="text-sm font-bold text-foreground">{c.value}</span>
                  )}
                  <span className="text-xs text-muted-foreground">{c.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Locations ───────────────────────────────────── */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">

            {/* ── Contact form (3 cols) ── */}
            <div className="lg:col-span-3">
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground mb-6">
                Send Us a Message
              </h2>

              {success ? (
                <div className="rounded-2xl border border-primary/20 bg-accent/30 p-8 flex flex-col items-center gap-4 text-center">
                  <FaCheckCircle size={36} className="text-primary" />
                  <h3 className="text-lg font-bold text-foreground">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                    Thank you for reaching out. Our team will get back to you within
                    24 hours. You can also call us directly on{' '}
                    <a href="tel:+911234567890" className="text-primary font-semibold">
                      +91 123 456 7890
                    </a>
                    .
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-2 text-sm font-semibold text-primary hover:underline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col gap-5"
                >
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'name',  label: 'Full Name',     type: 'text',  placeholder: 'Rahul Sharma' },
                      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'rahul@example.com' },
                    ].map((f) => (
                      <div key={f.name} className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {f.label}
                        </label>
                        <input
                          required
                          type={f.type}
                          name={f.name}
                          value={form[f.name as keyof typeof form]}
                          onChange={handleChange}
                          placeholder={f.placeholder}
                          className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring transition"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring transition"
                    />
                  </div>

                  {/* Course Interest */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      I'm Interested In
                    </label>
                    <select
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                    >
                      <option value="">Select a program…</option>
                      {courses.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Your Message
                    </label>
                    <textarea
                      required
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your goals, which exam you're preparing for, or any questions you have…"
                      className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-sm text-destructive font-medium">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {submitting ? 'Sending…' : 'Send Message'}
                  </button>

                  <p className="text-xs text-center text-muted-foreground">
                    We typically respond within 24 hours. For urgent queries, please call us directly.
                  </p>
                </form>
              )}
            </div>

            {/* ── Locations sidebar (2 cols) ── */}
            <div className="lg:col-span-2 lg:sticky lg:top-24 flex flex-col gap-5">
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground">
                Our Locations
              </h2>
              {locations.map((loc, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3"
                >
                  <div className="flex items-start gap-2 justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        {loc.type}
                      </span>
                      <h3 className="text-base font-bold text-foreground mt-0.5">{loc.name}</h3>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary shrink-0">
                      <FaMapMarkerAlt size={13} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{loc.address}</p>
                  {loc.mapSrc && (
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Open in Google Maps →
                    </a>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Map embed ──────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-12">
          <h2 className="text-base font-bold text-foreground mb-4">Find Us on the Map</h2>
          <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8329615599024!2d72.88094977457787!3d19.07062228148902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c897f223fbad%3A0xe5db976d8dfced9d!2sBandra%20Kurla%20Complex!5e0!3m2!1sen!2sin!4v1709405400000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="YP Gurukul Location Map"
            />
          </div>
        </div>
      </section>

      {/* ── Bottom reassurance ─────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-accent/30">
        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-4">
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground">
            Prefer to Speak to Someone?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our counsellors are available Monday to Saturday, 9 AM – 7 PM.
            Call or WhatsApp us and we'll help you find the right program in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+911234567890"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
            >
              <FaPhoneAlt size={13} /> Call Now
            </a>
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
            >
              <FaWhatsapp size={14} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
