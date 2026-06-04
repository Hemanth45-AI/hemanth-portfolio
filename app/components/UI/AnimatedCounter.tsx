'use client';
import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: string | number;
  className?: string;
}

export default function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const isFloat = !Number.isInteger(numericValue);
  
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => 
    isFloat ? latest.toFixed(2) : Math.floor(latest).toString()
  );

  useEffect(() => {
    if (inView) {
      const controls = animate(count, numericValue, { 
        duration: 2.5, 
        ease: [0.16, 1, 0.3, 1] // Custom ease out for smooth deceleration
      });
      return controls.stop;
    }
  }, [inView, numericValue, count]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
}
