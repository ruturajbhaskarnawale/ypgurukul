"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

import Image from 'next/image';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: 'COURSES', href: '/courses' },
    { label: 'ABOUT', href: '/about' },
    { label: 'CAREER', href: '/career' },
    { label: 'CONTACT', href: '/contact' },
  ];

  const isDashboard = pathname?.startsWith('/portal') || pathname?.startsWith('/admin');

  // Track whether the user has scrolled so we can apply a subtle bg
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isDashboard) return null;

  return (
    <>
      {/* Corner Navigation - Logo (Top Left) */}
      <div
        className={`fixed top-6 left-6 md:top-12 md:left-12 z-[100] transition-all duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-90'
        }`}
      >
        <Link href="/" className="group flex items-center gap-3 md:gap-4 leading-none">
          <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full border border-border shadow-2xl group-hover:scale-110 transition-transform duration-500">
            <Image 
              src="/logo-icon.png" 
              alt="YP Gurukul Logo" 
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col items-start translate-y-1">
            <span className="text-xl md:text-2xl font-black uppercase tracking-tighter-editorial text-foreground">
              YP Gurukul
            </span>
            <span className="font-script text-muted-foreground text-[10px] md:text-xs">
              institute
            </span>
          </div>
        </Link>
      </div>

      {/* Corner Navigation - Portal/Access/Admin (Top Right) */}
      <div className="fixed top-6 right-6 md:top-12 md:right-12 z-[100] flex items-center gap-4 md:gap-6">
        <ThemeToggle />
        <div className="hidden md:flex items-center gap-6">
          {user?.role === 'ADMIN' && (
          <Link
            href="/admin"
            className="nav-btn text-[10px] font-bold uppercase tracking-[0.4em] text-foreground border border-border px-8 py-3 hover:bg-foreground hover:text-background transition-all"
          >
            ADMIN VIEW
          </Link>
        )}
        <Link
          href={user ? '/portal/dashboard' : '/login'}
          className="nav-btn text-[10px] font-bold uppercase tracking-[0.4em] text-foreground border border-border px-8 py-3 hover:bg-foreground hover:text-background transition-all"
        >
          {user ? 'PORTAL' : 'ACCESS'}
        </Link>
        </div>
      </div>

      {/* Corner Navigation - Menu Trigger (Bottom Right) */}
      <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[100]">
        <motion.button
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 rounded-full border border-border flex items-center justify-center text-foreground bg-background/50 backdrop-blur-md shadow-lg transition-colors duration-300"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaTimes size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaBars size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[90] bg-background/97 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group block overflow-hidden"
                  >
                    <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter-editorial text-foreground/20 group-hover:text-foreground transition-colors duration-500">
                      {link.label}
                    </h2>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Portal links for mobile (visible when standard top navigation is hidden) */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.35 }}
               className="flex md:hidden flex-col items-center gap-4 mb-12"
            >
                <Link
                  href={user ? '/portal/dashboard' : '/login'}
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold uppercase tracking-[0.4em] text-foreground border border-border px-12 py-4 hover:bg-foreground hover:text-background transition-all"
                >
                  {user ? 'PORTAL' : 'LOGIN ACCESS'}
                </Link>
                {user?.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-bold uppercase tracking-[0.4em] text-foreground border border-border px-12 py-4 hover:bg-foreground hover:text-background transition-all"
                  >
                    ADMIN VIEW
                  </Link>
                )}
            </motion.div>

            {/* Contact info at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="absolute bottom-10 md:bottom-20 flex flex-col items-center gap-2 md:gap-4"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground">
                Contact Us
              </span>
              <p className="text-xl md:text-2xl font-black text-foreground">+91 123 456 7890</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
