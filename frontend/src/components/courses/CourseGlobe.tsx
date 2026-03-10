"use client";

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Image, MeshTransmissionMaterial, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from 'three';
import { useTheme } from 'next-themes';

interface Course {
  id: string;
  title: string;
  category: string;
  previewImage?: string;
}

interface CourseCardProps {
  course: Course;
  index: number;
  isDark: boolean;
  scrollRef: React.MutableRefObject<number>;
  spacing: number;
  onSelect: (id: string) => void;
  dragDistanceRef?: React.MutableRefObject<number>;
}

function CourseCard({ course, index, isDark, scrollRef, spacing, onSelect, dragDistanceRef }: CourseCardProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame(() => {
    if (meshRef.current) {
      const xPos = index * spacing + scrollRef.current;
      
      // Linear Position - Adjusted to sit just below the filters
      meshRef.current.position.set(xPos, -1.2, 0);
      
      // Focus Scaling
      const distFromCenter = Math.abs(xPos);
      const focusFactor = Math.max(0, 1 - distFromCenter / 15);
      const targetScale = 0.95 + (focusFactor * 0.45) * 1.1 + (hovered ? 0.05 : 0);
      
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      // Suble Tilt & Elevation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, (xPos / 25), 0.1);
      meshRef.current.position.z = focusFactor * 4;
    }
  });

  return (
    <group 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        if (!dragDistanceRef || dragDistanceRef.current < 10) {
          onSelect(course.id);
        }
      }}
    >
      {/* Glass Card Background */}
      <RoundedPlane args={[3.4, 5.2, 0.4]}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={128}
          transmission={isDark ? 0.6 : 0.4} // Less transparent in light mode
          roughness={0.15}
          thickness={0.2}
          ior={1.2}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          color={hovered ? "#3b82f6" : (isDark ? "#0a0a0a" : "#f8faff")} 
          metalness={isDark ? 0.1 : 0.05}
        />
      </RoundedPlane>

      {/* Course Image */}
      {course.previewImage && (
        <Image 
          url={course.previewImage} 
          transparent 
          opacity={hovered ? 1 : (isDark ? 0.4 : 0.7)}
          scale={[3.1, 4.8, 1]}
          position={[0, 0, 0.05]}
        />
      )}

      {/* Card Border/Accent */}
      <mesh position={[0, 0, -0.01]}>
        <shapeGeometry args={[useMemo(() => {
          const w = 3.5;
          const h = 5.3;
          const r = 0.45;
          const s = new THREE.Shape();
          s.moveTo(-w/2, -h/2+r); s.lineTo(-w/2, h/2-r); s.absarc(-w/2+r, h/2-r, r, Math.PI, Math.PI/2, true);
          s.lineTo(w/2-r, h/2); s.absarc(w/2-r, h/2-r, r, Math.PI/2, 0, true);
          s.lineTo(w/2, -h/2+r); s.absarc(w/2-r, -h/2+r, r, 0, -Math.PI/2, true);
          s.lineTo(-w/2+r, -h/2); s.absarc(-w/2+r, -h/2+r, r, -Math.PI/2, -Math.PI, true);
          return s;
        }, [])]} />
        <meshBasicMaterial color={isDark ? "#ffffff" : "#000000"} opacity={isDark ? 0.05 : 0.15} transparent />
      </mesh>

      {/* Text Overlay - Enhanced Readability */}
      <group position={[0, 1.9, 0.2]}>
        {/* Curved Top Backdrop - Matches Card Width and Radius */}
        <mesh position={[0, 0, -0.05]}>
          <shapeGeometry args={[useMemo(() => {
            const w = 3.4; // Matches card width
            const h = 1.4; 
            const r = 0.4; // Matches card corner radius
            const s = new THREE.Shape();
            // Start bottom-left
            s.moveTo(-w/2, -h/2);
            // Line to bottom-right (straight)
            s.lineTo(w/2, -h/2);
            // Line to top-right below curve
            s.lineTo(w/2, h/2-r);
            // Curve top-right
            s.absarc(w/2-r, h/2-r, r, 0, Math.PI/2, false);
            // Line to top-left below curve
            s.lineTo(-w/2+r, h/2);
            // Curve top-left
            s.absarc(-w/2+r, h/2-r, r, Math.PI/2, Math.PI, false);
            // Line back to start
            s.lineTo(-w/2, -h/2);
            return s;
          }, [])]} />
          <meshBasicMaterial color="black" opacity={0.65} transparent />
        </mesh>

        {/* Main Title */}
        <Text
          position={[0, -0.1, 0.02]}
          fontSize={0.26}
          color="white"
          maxWidth={2.8}
          textAlign="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="#3b82f6"
        >
          {course.title.toUpperCase()}
        </Text>
        
        {/* Glow Layer */}
        <Text
          position={[0, -0.1, 0]}
          fontSize={0.26}
          color="#3b82f6"
          maxWidth={2.8}
          textAlign="center"
          anchorY="middle"
          opacity={0.8}
        >
          {course.title.toUpperCase()}
        </Text>

        <Text
          position={[0, 0.45, 0.02]}
          fontSize={0.14}
          color="#60a5fa"
          letterSpacing={0.2}
          textAlign="center"
        >
          {course.category.toUpperCase()}
        </Text>
      </group>
    </group>
  );
}

// Helper for rounded plane
function RoundedPlane({ args = [1, 1, 0.1], ...props }) {
  const shape = useMemo(() => {
    const [w, h, r] = args;
    const s = new THREE.Shape();
    s.moveTo(-w / 2, -h / 2 + r);
    s.lineTo(-w / 2, h / 2 - r);
    s.absarc(-w / 2 + r, h / 2 - r, r, Math.PI, Math.PI / 2, true);
    s.lineTo(w / 2 - r, h / 2);
    s.absarc(w / 2 - r, h / 2 - r, r, Math.PI / 2, 0, true);
    s.lineTo(w / 2, -h / 2 + r);
    s.absarc(w / 2 - r, -h / 2 + r, r, 0, -Math.PI / 2, true);
    s.lineTo(-w / 2 + r, -h / 2);
    s.absarc(-w / 2 + r, -h / 2 + r, r, -Math.PI / 2, -Math.PI, true);
    return s;
  }, [args]);
  return (
    <mesh {...props}>
      <shapeGeometry args={[shape]} />
      {props.children}
    </mesh>
  );
}

export function CourseGlobe({ courses, onSelect }: { courses: Course[], onSelect: (id: string) => void }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted ? resolvedTheme === 'dark' : true; // Default to dark for SSR to avoid flicker
  
  const targetScrollX = useRef(0);
  const scrollXRef = useRef(0);
  const lastX = useRef(0);
  const dragDistance = useRef(0);
  const isDragging = useRef(false);
  const velocity = useRef(0);
  const spacing = 8; 

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Dragging in DOM
  const handleStart = (clientX: number) => {
    if (typeof clientX !== 'number' || isNaN(clientX)) return;
    isDragging.current = true;
    lastX.current = clientX;
    dragDistance.current = 0;
    velocity.current = 0;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current || typeof clientX !== 'number' || isNaN(clientX)) return;
    const diff = (clientX - lastX.current) * 0.08; 
    targetScrollX.current += diff;
    dragDistance.current += Math.abs(clientX - lastX.current);
    velocity.current = diff;
    lastX.current = clientX;
  };

  const handleEnd = (clientX?: number) => {
    isDragging.current = false;
    if (typeof clientX === 'number' && !isNaN(clientX)) {
      const finalDist = Math.abs(clientX - lastX.current);
      if (dragDistance.current < 10 && finalDist < 5) {
        // Small tap
      }
    }
  };

  useEffect(() => {
    if (!mounted) return;
    
    const onMove = (e: MouseEvent) => handleMove(e.clientX);
    const onUp = (e: MouseEvent) => handleEnd(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX);
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches[0]) handleEnd(e.changedTouches[0].clientX);
      else handleEnd();
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [mounted]);

  // Performance optimized updater
  const FrameUpdater = () => {
    useFrame(() => {
      if (!isDragging.current) {
        velocity.current *= 0.95;
        targetScrollX.current += velocity.current;

        // Correct for center
        const maxScroll = 0;
        const minScroll = courses.length > 0 ? -(courses.length - 1) * spacing : 0;
        
        if (targetScrollX.current > maxScroll) {
          targetScrollX.current = THREE.MathUtils.lerp(targetScrollX.current, maxScroll, 0.1);
        } else if (targetScrollX.current < minScroll) {
          targetScrollX.current = THREE.MathUtils.lerp(targetScrollX.current, minScroll, 0.1);
        }
      }
      
      if (!isNaN(targetScrollX.current)) {
        scrollXRef.current = THREE.MathUtils.lerp(scrollXRef.current, targetScrollX.current, 0.1);
      }
    });
    return null;
  };

  if (!mounted) return <div className="w-full h-full bg-background" />;

  return (
    <div 
      className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden"
      onMouseDown={(e) => handleStart(e.clientX)}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
    >
      <Canvas camera={{ position: [0, 0, 24], fov: 35 }}>
        <Environment preset={isDark ? "night" : "warehouse"} />
        <ambientLight intensity={isDark ? 0.1 : 0.4} />
        <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={isDark ? 2 : 1} castShadow />
        <pointLight position={[20, 20, 20]} intensity={isDark ? 3 : 1.5} color="#ffffff" />
        
        <FrameUpdater />

        {courses.map((course, idx) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            index={idx} 
            isDark={isDark}
            scrollRef={scrollXRef}
            spacing={spacing}
            onSelect={onSelect}
            dragDistanceRef={dragDistance}
          />
        ))}

        <ContactShadows 
           position={[0, -7.5, -5]} 
           opacity={isDark ? 0.1 : 0.05} 
           scale={60} 
           blur={2.5} 
           far={20} 
        />
      </Canvas>
      
      <div className="absolute inset-x-0 bottom-24 flex justify-center pointer-events-none">
        <div className={`px-6 py-2 bg-background/20 backdrop-blur-md border border-border/10 rounded-full shadow-xl`}>
          <span className={`text-[10px] font-bold uppercase tracking-[0.6em] ${isDark ? 'text-white/30' : 'text-black/30'}`}>
            Swipe to explore Program universe
          </span>
        </div>
      </div>
    </div>
  );
}
