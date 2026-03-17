"use client";

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';

const SECTIONS = [
  { id: 'nexus',       label: 'The Nexus',   numeral: 'I'   },
  { id: 'foundation',  label: 'Foundation',  numeral: 'II'  },
  { id: 'path',        label: 'Programs',    numeral: 'III' },
  { id: 'mentorship',  label: 'Mentorship',  numeral: 'IV'  },
  { id: 'legacy',      label: 'Legacy',      numeral: 'V'   },
  { id: 'gallery',     label: 'Gallery',     numeral: 'VI'  },
];

export const SidebarNav = () => {
  const [activeSection, setActiveSection] = useState<string>('nexus');
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  // Hide on all routes except the home page
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;

    // Show sidebar only after initial hero has been scrolled past a bit
    const onScroll = () => {
      setVisible(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomePage]);

  useEffect(() => {
    if (!isHomePage) return;

    const sectionEls = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!sectionEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sectionEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isHomePage]);

  const scrollToSection = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  if (!isHomePage) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Section navigation"
          className="fixed left-8 top-1/2 -translate-y-1/2 z-[80] hidden lg:flex flex-col gap-1 pointer-events-auto"
        >
          {/* Vertical spine line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-foreground/10" aria-hidden="true" />

          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group flex items-center gap-3 py-2 text-left relative pl-8"
                aria-label={`Go to ${section.label} section`}
              >
                {/* Active dot */}
                <span
                  className={`absolute left-[9px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-foreground scale-150' : 'bg-foreground/25 group-hover:bg-foreground/60'
                  }`}
                />

                {/* Roman numeral */}
                <span
                  className={`text-[9px] font-bold tracking-[0.2em] transition-all duration-300 font-mono tabular-nums ${
                    isActive ? 'text-foreground/40' : 'text-foreground/15 group-hover:text-foreground/30'
                  }`}
                >
                  {section.numeral}
                </span>

                {/* Section label */}
                <motion.span
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : -4,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`text-[10px] font-bold uppercase tracking-[0.25em] leading-none whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    isActive ? 'max-w-[100px] text-foreground' : 'max-w-0 text-transparent'
                  }`}
                >
                  {section.label}
                </motion.span>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
