'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticlesBackground from '../Sections/ParticlesBackground';

export default function GlobalBackground3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* 3D Canvas Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.3} />
          <Suspense fallback={null}>
            <ParticlesBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* Radial overlay for depth - fixed over the entire screen */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(3,7,18,0.4) 60%, rgba(3,7,18,0.85) 100%)',
        }}
      />
    </>
  );
}
