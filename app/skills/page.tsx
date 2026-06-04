'use client';

import { motion, Variants } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import SectionHeading from '../components/UI/SectionHeading';
import NeuralConstellation from '../components/Sections/NeuralConstellation';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function SkillsPage() {
  const { skills } = portfolioData;

  return (
    <div className="relative min-h-screen pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="Tech Arsenal"
          description="The tools and technologies I use to bring ideas to life."
        />

        <NeuralConstellation />

        <div className="mt-20">
          <SectionHeading
            eyebrow="Core Technologies"
            title="Individual Skills"
            description="A detailed breakdown of the languages and frameworks I use."
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
        >
          {skills.map(({ name, icon: Icon, color }) => (
            <motion.div
              key={name}
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group glass-card flex flex-col items-center gap-3 p-6 text-center transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-white/10">
                <Icon size={24} style={{ color }} />
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
