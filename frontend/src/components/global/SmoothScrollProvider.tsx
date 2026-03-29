"use client";

import React from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { useEffect } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Inner component: useLenis() is valid here because this renders INSIDE <ReactLenis>
function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tickerFn);
    };
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Disable root smooth scroll on internal dashboards to prevent conflicts with local layouts
  const isDashboard = pathname?.startsWith("/admin") || pathname?.startsWith("/portal");

  // Global ScrollTrigger cleanup on route change
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Kill all existing ScrollTriggers to prevent "jumping" from old page markers
      ScrollTrigger.getAll().forEach(st => st.kill());
      
      // Force a refresh after layout settles
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12, // Slightly increased for better perceived responsiveness
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      <LenisGsapSync />
      {children as any}
    </ReactLenis>
  );
}
