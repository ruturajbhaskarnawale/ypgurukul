"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';

const quickLinks = [
  { label: 'Home',    href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'About',   href: '/about' },
  { label: 'Career',  href: '/career' },
  { label: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use',   href: '/terms' },
];

const socialLinks = [
  { icon: <FaInstagram size={16} />, href: '#', label: 'Instagram' },
  { icon: <FaYoutube size={16} />,   href: '#', label: 'YouTube'   },
  { icon: <FaFacebook size={16} />,  href: '#', label: 'Facebook'  },
];

export const Footer = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const isDashboard =
    pathname?.startsWith('/portal') || pathname?.startsWith('/admin');
  if (isDashboard) return null;

  return (
    <footer className="bg-secondary border-t border-border text-foreground">

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">

          {/* Brand column */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="relative w-10 h-10 rounded-full border border-border overflow-hidden shrink-0">
                <Image
                  src="/logo-icon.png"
                  alt="YP Gurukul Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-black tracking-tight text-foreground">
                YP Gurukul
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Premium foundational coaching for JEE, NEET, MHT-CET and Board Exams.
              Helping students and families unlock their best academic result.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="tel:+911234567890"
                  className="flex items-start gap-3 text-sm text-foreground/80 hover:text-primary transition-colors group"
                >
                  <FaPhoneAlt size={14} className="mt-0.5 shrink-0 text-primary" />
                  +91 123 456 7890
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@ypgurukul.com"
                  className="flex items-start gap-3 text-sm text-foreground/80 hover:text-primary transition-colors group"
                >
                  <FaEnvelope size={14} className="mt-0.5 shrink-0 text-primary" />
                  contact@ypgurukul.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <FaMapMarkerAlt size={14} className="mt-0.5 shrink-0 text-primary" />
                Academic Street, Knowledge Park, City — 400001
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {currentYear} YP Gurukul Institute. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
};
