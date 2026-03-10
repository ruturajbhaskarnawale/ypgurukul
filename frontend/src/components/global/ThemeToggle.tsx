"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = [
    { name: 'light', icon: <FaSun size={14} />, label: 'Light' },
    { name: 'dark', icon: <FaMoon size={14} />, label: 'Dark' },
    { name: 'system', icon: <FaDesktop size={14} />, label: 'System' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-muted/50 backdrop-blur-md border border-border rounded-full overflow-hidden">
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => setTheme(t.name)}
          className={`
            relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
            ${theme === t.name ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}
          `}
          title={t.label}
        >
          {theme === t.name && (
            <motion.div
              layoutId="activeTheme"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{t.icon}</span>
        </button>
      ))}
    </div>
  );
};
