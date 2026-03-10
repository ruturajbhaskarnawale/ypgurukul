"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Lightformer, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 3D Abstract Learning Objects
function FloatingObjects() {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[-2, 1, -5]}>
        <mesh>
          <torusKnotGeometry args={[0.8, 0.2, 100, 16]} />
          <meshStandardMaterial color="#111111" roughness={0} metalness={1} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1} position={[3, -1, -8]}>
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#888888" roughness={0} metalness={0.5} wireframe />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={3} position={[-1, -2, -12]}>
        <mesh>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#222222" roughness={0} metalness={1} />
        </mesh>
      </Float>
    </group>
  );
}

// Camera Animation Controller
function CameraController() {
  const { camera } = useThree();

  useLayoutEffect(() => {
    // We animate the camera's Z position based on the scroll of the container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".learning-journey-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Smoother scrubbing
      }
    });

    tl.to(camera.position, {
      z: -20,
      ease: "power2.inOut"
    }, 0);
    
    tl.to(camera.rotation, {
      z: Math.PI / 2,
      ease: "power2.inOut"
    }, 0);

    return () => {
      tl.kill();
    };
  }, [camera]);

  return null;
}

export function LearningJourney3D() {
  const [isInView, setIsInView] = React.useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="learning-journey-container relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Text Overlay synced with scroll */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
            <span className="font-script text-4xl text-muted-foreground lowercase mb-8">the</span>
            <h2 className="text-7xl md:text-[12rem] font-black text-foreground uppercase tracking-tighter-editorial leading-[0.8]">
              Academic <br /> <span className="text-foreground/20">Genesis</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl mt-16 lowercase leading-relaxed font-medium">
              travel through the multidimensional layers of academic excellence. unlocking every facet of your potential.
            </p>
        </div>
 
        {/* 3D Scene */}
        <div className="absolute inset-0 z-0">
          {isInView && (
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
              <Environment preset="city">
                 <Lightformer intensity={10} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[20, 20, 1]} />
              </Environment>
              <ambientLight intensity={0.2} />
              <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
              <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
              
              <FloatingObjects />
              <CameraController />
            </Canvas>
          )}
        </div>
      </div>
    </section>
  );
}
