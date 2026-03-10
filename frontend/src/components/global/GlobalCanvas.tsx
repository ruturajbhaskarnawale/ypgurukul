"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, Environment, Lightformer, Float } from "@react-three/drei";

export function GlobalCanvas() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#000000"]} />
        <Environment preset="night">
          <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 10, -10]} scale={[20, 20, 1]} />
          <Lightformer intensity={0.5} rotation-y={Math.PI / 2} position={[-10, 0, -5]} scale={[10, 10, 1]} />
        </Environment>

        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[10, 5, -15]} rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[5, 0.02, 16, 100]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.1} />
          </mesh>
        </Float>

        <Preload all />
      </Canvas>
    </div>
  );
}
