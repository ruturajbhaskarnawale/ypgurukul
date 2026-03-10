"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from 'three';
import { getScrollProgress } from './SceneContainer';

// --- 3D SUB-COMPONENTS ---
// All components read scroll progress via getScrollProgress() inside useFrame.
// This is zero-cost: no React re-renders are triggered by scroll events.

export function Nexus({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  // Geometry Detail Budget (computed once on mount)
  const torusSegments = isMobile ? 32 : 64; 
  const knotSegmentsX = isMobile ? 64 : 96;
  const knotSegmentsY = isMobile ? 12 : 24;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Read scroll progress directly — no prop drilling, no re-render
    const sp = getScrollProgress() * (isMobile ? 0.3 : 1);

    const zoom = 1 + sp * 15;
    groupRef.current.scale.set(zoom, zoom, zoom);
    groupRef.current.position.z = sp * 12;
    groupRef.current.position.y = -sp * 6;
    groupRef.current.visible = sp < 0.5;

    groupRef.current.rotation.y += delta * 0.2;
    groupRef.current.rotation.x += delta * 0.1;

    if (outerRef.current && innerRef.current) {
      outerRef.current.rotation.z -= delta * 0.5;
      innerRef.current.rotation.y += delta * 1.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={outerRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 12, torusSegments]} />
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.5}
          roughness={0}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>
      <mesh ref={innerRef}>
        <torusKnotGeometry args={[0.6, 0.2, knotSegmentsX, knotSegmentsY]} />
        <meshStandardMaterial
          color="#60a5fa"
          transparent
          opacity={0.6}
          roughness={0}
          metalness={1}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, isMobile ? 8 : 16, isMobile ? 8 : 16]} />
        <meshStandardMaterial 
          color="#60a5fa" 
          emissive="#3b82f6" 
          emissiveIntensity={5} 
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export function GlobalNeuralGrid() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        temp[i * 3] = (Math.random() - 0.5) * 60;
        temp[i * 3 + 1] = (Math.random() - 0.5) * 60;
        temp[i * 3 + 2] = (Math.random() - 0.5) * 30 - 15;
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const sp = getScrollProgress();
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    pointsRef.current.position.y = sp * 10;
  });

  return (
    <Points positions={particles} ref={pointsRef}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.15}
      />
    </Points>
  );
}

export function KnowledgeShards() {
    const count = 30;
    const meshRef = useRef<THREE.InstancedMesh>(null);
    
    const shards = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * 40,
                    (Math.random() - 0.5) * 40,
                    (Math.random() - 0.5) * 20 + 5
                ),
                scale: Math.random() * 0.4 + 0.1,
                rotationX: Math.random() * Math.PI,
                rotationY: Math.random() * Math.PI,
                speed: Math.random() * 0.4 + 0.1
            });
        }
        return temp;
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const sp = getScrollProgress();
        const time = state.clock.getElapsedTime();

        shards.forEach((shard, i) => {
            dummy.position.copy(shard.position);
            dummy.position.y += Math.sin(time * shard.speed) * 0.5;
            dummy.position.z -= sp * 0.05;
            
            dummy.rotation.set(
                shard.rotationX + time * 0.2,
                shard.rotationY + time * 0.2,
                0
            );
            dummy.scale.setScalar(shard.scale);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });
        
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null as any, null as any, count]}>
            <icosahedronGeometry args={[1, 0]} />
            {/* Cheap standard material — MeshTransmissionMaterial on 30+ instances causes GPU crashes */}
            <meshStandardMaterial
                color="#3b82f6"
                transparent
                opacity={0.12}
                roughness={1}
                metalness={0}
                side={THREE.FrontSide}
            />
        </instancedMesh>
    );
}
