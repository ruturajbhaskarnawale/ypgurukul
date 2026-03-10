"use client";

import { useEffect } from 'react';

interface SectionThemeDef {
  id: string;
  theme: 'dark' | 'light';
}

// Map section IDs to their visual theme. This drives global nav/sidebar color adaptation.
const SECTION_THEMES: SectionThemeDef[] = [
  { id: 'nexus',      theme: 'dark'  },
  { id: 'foundation', theme: 'light' }, // Foundation section uses light parchment bg
  { id: 'path',       theme: 'dark'  },
  { id: 'mentorship', theme: 'light'  },
  { id: 'legacy',     theme: 'dark'  },
];

/**
 * SectionThemeController — Renderless component that observes section visibility
 * and writes `data-section-theme="dark|light"` to <html>, allowing global elements
 * (Navbar, SidebarNav) to adapt their colors purely via CSS attribute selectors.
 *
 * Mount once inside layout or page. No DOM output.
 */
export const SectionThemeController: React.FC = () => {
  useEffect(() => {
    const sectionEls = SECTION_THEMES.map(s => ({
      el: document.getElementById(s.id),
      theme: s.theme,
    })).filter(s => s.el !== null) as { el: HTMLElement; theme: 'dark' | 'light' }[];

    if (!sectionEls.length) return;

    // Default to dark (hero section is dark)
    document.documentElement.setAttribute('data-section-theme', 'dark');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const match = sectionEls.find(s => s.el === entry.target);
            if (match) {
              document.documentElement.setAttribute('data-section-theme', match.theme);
            }
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    sectionEls.forEach(s => observer.observe(s.el));

    return () => observer.disconnect();
  }, []);

  // Renderless component — returns null
  return null;
};
