'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 5500;
const SHOOTING_STAR_COUNT = 25;

export default function ParticlesBackground() {
  const pointsRef = useRef<THREE.Points>(null);
  const starsRef = useRef<THREE.Points>(null);
  const coreRef1 = useRef<THREE.Mesh>(null);
  const coreRef2 = useRef<THREE.Mesh>(null);

  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const cyanColor = new THREE.Color('hsl(185, 90%, 60%)');
    const blueColor = new THREE.Color('hsl(210, 95%, 60%)');
    const purpleColor = new THREE.Color('hsl(270, 80%, 70%)');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute in a sphere-like volume with more density in center
      const radius = Math.random() * 18 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Random color blend between cyan, blue, and purple
      const t = Math.random();
      const color = t < 0.4
        ? cyanColor.clone().lerp(blueColor, t / 0.4)
        : blueColor.clone().lerp(purpleColor, (t - 0.4) / 0.6);

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  const { starPositions, starColors } = useMemo(() => {
    const starPositions = new Float32Array(SHOOTING_STAR_COUNT * 3);
    const starColors = new Float32Array(SHOOTING_STAR_COUNT * 3);

    for (let i = 0; i < SHOOTING_STAR_COUNT; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 40;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      // Pure white/cyan for shooting stars
      starColors[i * 3] = 0.5 + Math.random() * 0.5;
      starColors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
      starColors[i * 3 + 2] = 1;
    }
    return { starPositions, starColors };
  }, []);

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();

    // Rotate particles with smooth mouse parallax
    if (pointsRef.current) {
      // Base rotation + mouse push
      const targetRotationX = Math.sin(t * 0.01) * 0.05 + mousePosition.current.y * 0.2;
      const targetRotationY = t * 0.02 + mousePosition.current.x * 0.2;
      
      pointsRef.current.rotation.x += (targetRotationX - pointsRef.current.rotation.x) * 0.05;
      pointsRef.current.rotation.y += (targetRotationY - pointsRef.current.rotation.y) * 0.05;
    }

    // Animate shooting stars
    if (starsRef.current) {
      const positions = starsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < SHOOTING_STAR_COUNT; i++) {
        positions[i * 3] += 0.3; // x
        positions[i * 3 + 1] += 0.1; // y
        positions[i * 3 + 2] += 0.3; // z
        
        // Reset star if it goes too far
        if (positions[i * 3] > 20 || positions[i * 3 + 2] > 20) {
          positions[i * 3] = -20 - Math.random() * 20;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
          positions[i * 3 + 2] = -20 - Math.random() * 20;
        }
      }
      starsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Rotate inner core (reacts to mouse)
    if (coreRef1.current) {
      coreRef1.current.rotation.x = t * 0.15 + mouse.y * 0.4;
      coreRef1.current.rotation.y = t * 0.2 + mouse.x * 0.4;
    }

    // Rotate outer cage (reacts to mouse, opposite direction)
    if (coreRef2.current) {
      coreRef2.current.rotation.x = -t * 0.1 - mouse.y * 0.2;
      coreRef2.current.rotation.y = -t * 0.08 - mouse.x * 0.2;
    }
  });

  return (
    <group>
      {/* 3D Quantum Core */}
      <mesh ref={coreRef1} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1.5, 0.4, 120, 16]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <mesh ref={coreRef2} position={[0, 0, 0]}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Floating Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Shooting Stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[starColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}