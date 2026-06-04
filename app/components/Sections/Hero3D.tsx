'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaArrowRight,
  FaFileDownload,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

/* ─── Animation Variants ─── */
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

interface SocialLink {
  Icon: IconType;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  { Icon: FaGithub, href: 'https://github.com/hemanthm', label: 'GitHub' },
  { Icon: FaLinkedin, href: 'https://linkedin.com/in/hemanth-mamidala-094191295', label: 'LinkedIn' },
  { Icon: FaTwitter, href: 'https://x.com/MamidalHemanth', label: 'Twitter' },
];

export default function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // 3D Tilt for Photo
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 25, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    setMounted(true);

    const logPool = [
      '⚡ Mamidala OS v1.0.0 initializing...',
      '📡 Querying MLR-IT databases (MySQL)...',
      '🧠 Loading MarketAI parameters...',
      '🧬 Groq LLM API connected successfully.',
      '🎯 Model accuracy calibrated at 9.05 CGPA.',
      '🔗 Routing multi-language web modules...',
      '⚙️ Binding react-three-fiber WebGL meshes...',
      '🤖 NLP Paper Summarizer engine initialized.',
      '🌟 Portfolio status: 100% stable & active.',
      '🛡️ Security protocols loaded (TypeScript).',
    ];

    let i = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextLogs = [...prev, logPool[i]];
        if (nextLogs.length > 3) {
          nextLogs.shift();
        }
        return nextLogs;
      });
      i = (i + 1) % logPool.length;
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Content Overlay */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        {/* Tag line */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-5 py-2 text-xs font-medium uppercase tracking-widest text-cyan-400 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Software Engineer &amp; AI Enthusiast
          </span>
        </motion.div>

        {/* Profile Photo */}
        <motion.div variants={itemVariants} className="mb-8 flex justify-center" style={{ perspective: 1000 }}>
          <motion.div 
            style={{ rotateX, rotateY }}
            className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-gray-950 ring-4 ring-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.4)] bg-gradient-to-br from-cyan-600 to-blue-700"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpeg"
              alt="Hemanth Mamidala"
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            {/* Fallback initials if image fails to load */}
            <span className="text-3xl font-bold text-white select-none">HM</span>
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-8xl"
        >
          <span className="neon-glow gradient-text">Mamidala Hemanth</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl"
        >
          Building{' '}
          <span className="text-cyan-400">intelligent systems</span> &amp;{' '}
          <span className="text-purple-400">immersive experiences</span>{' '}
          that push the boundaries of what&apos;s possible on the web.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mb-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#dashboard"
            id="hero-explore-btn"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40 hover:brightness-110"
          >
            Explore More
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            id="hero-resume-btn"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
          >
            <FaFileDownload className="text-xs" />
            Resume
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-5"
        >
          {socialLinks.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              id={`hero-social-${label.toLowerCase()}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>

        {/* Rolling Logs Console */}
        <motion.div
          variants={itemVariants}
          className="mx-auto mt-10 max-w-sm rounded-xl border border-cyan-500/10 bg-black/60 p-4 text-left font-mono text-[10px] leading-relaxed text-cyan-400 shadow-inner backdrop-blur-md"
        >
          <div className="flex items-center gap-1.5 border-b border-white/5 pb-1.5 mb-2 text-gray-500">
            <span className="h-2 w-2 rounded-full bg-red-500/60" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
            <span className="h-2 w-2 rounded-full bg-green-500/60" />
            <span className="ml-1 text-[8px] uppercase tracking-wider text-gray-400">Mamidala-OS Client Diagnostics</span>
          </div>
          <div className="space-y-1 h-[60px] overflow-hidden">
            {logs.map((log, index) => (
              <motion.div
                key={index + '-' + log}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="whitespace-nowrap overflow-hidden text-ellipsis"
              >
                <span className="text-gray-600 mr-1.5">&gt;</span>
                {log}
              </motion.div>
            ))}
            {logs.length === 0 && (
              <div className="text-gray-600 animate-pulse">&gt; Initializing diagnostics...</div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
