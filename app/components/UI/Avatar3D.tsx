'use client';

import { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function RobotAvatar({ onClick, isHovered }: { onClick: () => void, isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} onClick={onClick}>
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5}>
        {/* Head Core */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial 
            color="#06b6d4" 
            metalness={0.8} 
            roughness={0.2} 
            envMapIntensity={1}
            emissive={isHovered ? "#38bdf8" : "#000000"}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Eyes/Visor */}
        <mesh position={[0, 0.2, 0.85]}>
          <capsuleGeometry args={[0.2, 0.6, 4, 16]} />
          <meshStandardMaterial 
            color="#0f172a" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>

        {/* Glowing Eyes inside Visor */}
        <mesh position={[-0.2, 0.2, 0.95]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0.2, 0.2, 0.95]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Floating Ring / Halo */}
        <mesh position={[0, -1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, 100]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
        </mesh>

        {/* Speech Bubble */}
        <Html position={[1.2, 1, 0]} center>
          <div className="pointer-events-none w-32 animate-bounce-slow">
            <div className="relative rounded-2xl border border-cyan-500/30 bg-gray-950/80 px-3 py-2 text-center text-xs font-medium text-cyan-300 shadow-xl shadow-cyan-500/20 backdrop-blur-md">
              Hi! Talk to me!
              <div className="absolute -bottom-1.5 left-4 h-3 w-3 rotate-45 border-b border-r border-cyan-500/30 bg-gray-950/80" />
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

interface Avatar3DProps {
  onClick: () => void;
}

export default function Avatar3D({ onClick }: Avatar3DProps) {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Set cursor style manually (safe for SSR)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.cursor = 'auto';
      }
    };
  }, [hovered]);

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="h-32 w-32 md:h-40 md:w-40"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#38bdf8" />
        
        <Suspense fallback={null}>
          <RobotAvatar onClick={onClick} isHovered={hovered} />
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={5} 
            blur={2} 
            far={4} 
          />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}
