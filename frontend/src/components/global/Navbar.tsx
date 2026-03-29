"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { ThemeToggle } from './ThemeToggle';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { label: 'Courses',  href: '/courses' },
  { label: 'About',    href: '/about' },
  { label: 'Career',   href: '/career' },
  { label: 'Contact',  href: '/contact' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const isDashboard =
    pathname?.startsWith('/portal') || pathname?.startsWith('/admin');

  // Scroll-triggered solid background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (isDashboard) return null;

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="YP Gurukul — home"
          >
            <div className="relative w-8 h-8 md:w-9 md:h-9 overflow-hidden rounded-full border border-border shrink-0">
              <Image
                src="/logo-icon.png"
                alt="YP Gurukul Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-base md:text-lg font-black tracking-tight text-foreground leading-none">
              YP Gurukul
            </span>
          </Link>

          {/* Desktop nav links — centered */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-primary bg-accent'
                      : 'text-foreground/70 hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <ThemeToggle />

            {/* Admin link (desktop) */}
            {user?.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="hidden md:inline-flex items-center px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider border border-border text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors"
              >
                Admin
              </Link>
            )}

            {/* Portal / Login (desktop) */}
            <Link
              href={user ? '/portal/dashboard' : '/login'}
              className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
            >
              {user ? 'My Portal' : 'Login'}
            </Link>

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-md border border-border text-foreground hover:bg-secondary transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <FaTimes size={15} /> : <FaBars size={15} />}
            </button>
          </div>

        </div>
      </header>

      {/* Spacer so content doesn't hide under the fixed bar */}
      <div className="h-16" aria-hidden="true" />

      {/* ── Mobile drawer ───────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-0 z-[99] bg-background border-b border-border shadow-lg md:hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-md text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-primary bg-accent'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="border-t border-border mt-2 pt-3 flex flex-col gap-2">
                <Link
                  href={user ? '/portal/dashboard' : '/login'}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-bold text-center hover:opacity-90 transition-opacity"
                >
                  {user ? 'My Portal' : 'Login / Sign Up'}
                </Link>
                {user?.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-md border border-border text-sm font-semibold text-center text-foreground hover:bg-secondary transition-colors"
                  >
                    Admin View
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
