'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function NeonCard({
  children,
  className = '',
  glowColor = 'rgba(56, 189, 248, 0.15)',
}: NeonCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // For 3D rotation
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);

    // For gradient spotlight
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        perspective: '1000px',
      } as any}
      animate={{
        scale: isHovered ? 1.03 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`glass-card relative overflow-hidden ${className}`}
    >
      {/* Gradient spotlight that follows the mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(
            450px circle at ${isHovered ? 'var(--mouse-x, 50%) var(--mouse-y, 50%)' : '50% 50%'},
            ${glowColor},
            transparent 60%
          )`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      <div style={{ transform: 'translateZ(30px)' }}>{children}</div>
    </motion.div>
  );
}
