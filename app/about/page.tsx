'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import SectionHeading from '../components/UI/SectionHeading';
import NeonCard from '../components/UI/NeonCard';
import AnimatedCounter from '../components/UI/AnimatedCounter';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function AboutPage() {
  const { about } = portfolioData;

  return (
    <div className="relative min-h-screen pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="About Me"
          title={about.headline}
          description={about.description}
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <NeonCard className="mx-auto max-w-3xl p-8 sm:p-12">
            <div className="space-y-5 text-base leading-relaxed text-gray-300 sm:text-lg">
              {about.paragraphs.map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-cyan-400">$1</span>') }} />
              ))}
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
              {[
                { value: about.cgpa, label: 'B.Tech CGPA' },
                { value: about.coreProjects, label: 'Core Projects' },
                { value: about.certificationsCount, label: 'Certifications' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <AnimatedCounter value={value} className="gradient-text text-2xl font-bold sm:text-3xl inline-block" />
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">{label}</p>
                </div>
              ))}
            </div>

            {/* Gen-AI Control Panel */}
            <div className="mt-8 rounded-xl border border-cyan-500/10 bg-black/40 p-6 font-mono text-xs text-gray-400 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 flex-wrap gap-2">
                <span className="text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Mamidala AI Model Parameters
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400 border border-emerald-500/20">AGENT_ACTIVE</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Model Version:</span>
                    <span className="text-white">hemanth-it-v{about.cgpa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Primary Core:</span>
                    <span className="text-white">Python / Java / Flask</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Knowledge base:</span>
                    <span className="text-cyan-300">MarketAI / PHP / NLP</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>System temperature:</span>
                    <span className="text-purple-400">0.7 (Balanced)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Inference Speed:</span>
                    <span className="text-purple-400">12ms (Groq Turbo)</span>
                  </div>
                </div>
              </div>
            </div>
          </NeonCard>
        </motion.div>
      </div>
    </div>
  );
}
