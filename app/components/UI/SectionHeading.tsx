'use client';

import { motion } from 'framer-motion';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="mx-auto mb-16 max-w-2xl text-center"
    >
      <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[4px] text-cyan-400">
        {eyebrow}
      </span>
      <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="text-base leading-relaxed text-gray-400 sm:text-lg">{description}</p>
    </motion.div>
  );
}
