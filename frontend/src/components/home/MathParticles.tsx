"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SYMBOLS = ['∑', 'π', '∫', '∂', 'Δ', '√', '∞', 'Ω', 'μ', 'φ'];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  symbol: string;
  opacity: number;
  size: number;
  rotation: number;
  vRotation: number;
}

export const MathParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const triggeredRef = useRef(false);

  const initParticles = () => {
    const particles: Particle[] = [];
    const count = 40;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        opacity: 1,
        size: 15 + Math.random() * 25,
        rotation: Math.random() * Math.PI * 2,
        vRotation: (Math.random() - 0.5) * 0.1,
      });
    }
    particlesRef.current = particles;
  };

  const update = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.opacity *= 0.98;
      p.rotation += p.vRotation;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = '#3b82f6';
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.symbol, -p.size/2, p.size/2);
      ctx.restore();
    });

    if (particlesRef.current.some(p => p.opacity > 0.01)) {
      animationFrameRef.current = requestAnimationFrame(update);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = ScrollTrigger.create({
        trigger: "body",
        start: "10% top",
        onEnter: () => {
          if (!triggeredRef.current) {
            triggeredRef.current = true;
            initParticles();
            update();
          }
        },
        onLeaveBack: () => {
          triggeredRef.current = false;
        }
      });
      
      return () => st.kill();
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      mm.revert();
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 z-[15] pointer-events-none"
    />
  );
};
