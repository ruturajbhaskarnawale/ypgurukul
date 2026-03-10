"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/MotionUtils';
import { Magnetic } from '../animations/Magnetic';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

import Image from 'next/image';

export const Footer = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const isDashboard = pathname?.startsWith('/portal') || pathname?.startsWith('/admin');
  if (isDashboard) return null;

  return (
    <footer className="bg-background text-foreground py-32 border-t border-border">
      <div className="max-w-[1800px] mx-auto px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="group flex items-center gap-6 mb-12">
              <div className="relative w-24 h-24 overflow-hidden rounded-full border border-white/5 shadow-2xl group-hover:scale-105 transition-transform duration-700">
                <Image 
                  src="/logo-icon.png" 
                  alt="YP Gurukul Logo" 
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-5xl font-black uppercase tracking-tighter-editorial leading-none">YP Gurukul</h2>
            </Link>
            <p className="max-w-md text-2xl lowercase text-muted-foreground leading-relaxed font-medium">
              premium foundational coaching and academic excellence for the modern scholar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.3em] mb-12 text-muted-foreground/30">Navigation</h3>
            <ul className="space-y-6">
              {['Home', 'Courses', 'About', 'Career', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item === 'Home' ? '' : item.toLowerCase()}`} className="text-xl font-bold hover:text-muted-foreground transition-colors lowercase">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.3em] mb-12 text-muted-foreground/30">Connect</h3>
            <ul className="space-y-6">
              <li>
                <a href="mailto:contact@ypgurukul.com" className="text-xl font-bold hover:text-muted-foreground transition-colors lowercase italic">
                  contact@ypgurukul.com
                </a>
              </li>
              <li className="text-xl font-bold lowercase">
                +91 123 456 7890
              </li>
              <li className="text-muted-foreground lowercase text-base max-w-[240px] mt-8 leading-relaxed">
                academic street, knowledge park, city
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-32 pt-16 border-t border-border flex flex-col md:flex-row justify-between items-center text-[11px] font-bold uppercase tracking-[0.4em] text-muted-foreground/40">
          <p>© {currentYear} YP Gurukul Institute. all rights reserved.</p>
          <div className="flex gap-12 mt-6 md:mt-0">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
