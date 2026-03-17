"use client";

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import dynamic from 'next/dynamic';

// Register GSAP plugins (handled globally in SmoothScrollProvider)

// --- GLOBAL SCROLL STATE (via module-level ref to avoid React re-renders) ---
// This is THE critical optimization: scroll progress is shared via plain JS ref,
// not React state. This means NO React re-render happens on scroll.
const _scrollProgress = { value: 0 };
export const getScrollProgress = () => _scrollProgress.value;

// DYNAMIC IMPORTS FOR PERFORMANCE
const Scene3D = dynamic(() => import('./Scene3DWrapper'), { 
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-background" />
});

// --- MAIN COMPONENTS ---

interface SceneContainerProps {
    children: React.ReactNode;
}

export const SceneContainer: React.FC<SceneContainerProps> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    // isMobile and ready still use state as they change rarely
    const [isMobile, setIsMobile] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // Debounced mobile check - rare, so state is fine here
        let timeoutId: NodeJS.Timeout;
        const checkMobile = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsMobile(window.innerWidth < 768);
            }, 100);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        const st = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                // KEY FIX: Write to the module-level ref — NO React setState.
                // This is a zero-cost operation that does not trigger any re-renders.
                _scrollProgress.value = self.progress;
            }
        });

        // Progressive ready state: only runs once after 1 second
        const timer = setTimeout(() => setReady(true), 1000);

        return () => {
            st.kill();
            window.removeEventListener('resize', checkMobile);
            clearTimeout(timeoutId);
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (ready) {
            // Defer refresh to the next frame so layout is fully settled
            requestAnimationFrame(() => ScrollTrigger.refresh());
        }
    }, [ready]);

    return (
        <div ref={containerRef} className="relative w-full">
            {/* CINEMATIC OVERLAY (Noise Grain) - rendered once, never updates */}
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.02] mix-blend-overlay">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            </div>

            {/* GLOBAL 3D BACKGROUND - scrollProgress is read via getter inside useFrame */}
            <div className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
                {ready && (
                    // No more scrollProgress prop! The Scene3D reads from the global ref.
                    <Scene3D isMobile={isMobile} />
                )}
            </div>
            
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
};

interface SceneProps {
    children: React.ReactNode;
    id: string;
    sticky?: boolean;
}

export const Scene: React.FC<SceneProps> = ({ children, id, sticky = false }) => {
    const sceneRef = useRef<HTMLElement>(null);

    return (
        <section 
            id={id} 
            ref={sceneRef} 
            className={`relative w-full ${sticky ? 'sticky top-0 h-screen overflow-hidden' : 'min-h-screen'}`}
            style={{ contain: 'layout paint' }} // Performance Optimization
        >
            {children}
        </section>
    );
};
