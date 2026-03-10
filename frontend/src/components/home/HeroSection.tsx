"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../global/Button';
import Link from 'next/link';
import { HeroBackground } from './HeroBackground';
import { DaVinciLines } from './DaVinciLines';

export const HeroSection = () => {
  // useScroll + useSpring removed: they were creating a second scroll listener
  // alongside Lenis, causing jitter and blink during section transitions.

  const title = "YP Gurukul";
  const subtitle = "experience";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.3 }
    }
  };

  const letterVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-background/0"
    >
      {/* IMMERSIVE BACKGROUND LAYERS */}
      <HeroBackground />
      <DaVinciLines />

      <div className="relative z-20 max-w-[1800px] mx-auto px-12 text-center flex flex-col items-center pt-20">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="font-script text-4xl text-foreground/60 lowercase tracking-wide">the</span>
        </motion.div>
        
        {/* Kinetic Typography Heading */}
        <div className="flex flex-col items-center">
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-fluid-hero font-black text-foreground tracking-tighter-editorial leading-[0.8] uppercase flex flex-wrap justify-center gap-x-4 md:gap-x-8"
          >
            {title.split(" ").map((word, wIndex) => (
              <span key={wIndex} className="flex overflow-hidden py-4">
                {word.split("").map((char, cIndex) => (
                  <motion.span key={cIndex} variants={letterVariants} className="inline-block">
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <div className="overflow-hidden mt-8">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block font-script text-fluid-hero-sub text-foreground/40 lowercase"
            >
              {subtitle}
            </motion.span>
          </div>
        </div>
        
        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
          className="mt-8 md:mt-12 text-lg md:text-3xl text-muted-foreground/80 max-w-3xl mx-auto mb-16 md:mb-20 font-medium tracking-tight lowercase px-4"
        >
          premium coaching and foundational excellence reinvented <br className="hidden md:block" /> for the modern scholar.
        </motion.p>
        
        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row justify-center gap-6 md:gap-12 w-full max-w-md md:max-w-none"
        >
          <Link href="/courses" className="w-full sm:w-auto">
            <Button size="lg" className="h-16 md:h-20 w-full sm:px-16 rounded-none bg-foreground text-background hover:bg-foreground/90 transition-all text-[10px] md:text-xs tracking-[0.4em] font-black uppercase border-none group relative overflow-hidden">
              <span className="relative z-10">Explore Programs</span>
              <motion.div 
                className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700"
              />
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="h-16 md:h-20 w-full sm:px-16 rounded-none text-foreground border-border/50 hover:bg-accent transition-all text-[10px] md:text-xs tracking-[0.4em] font-black uppercase overflow-hidden group">
              <span className="relative z-10">Schedule Visit</span>
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-6"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-foreground/20 font-black">Scroll to Dive</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-foreground/20 to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full bg-foreground/40"
          />
        </div>
      </motion.div> */}
    </section>
  );
};
