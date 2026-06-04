'use client';

import { motion, Variants } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { portfolioData } from '../data/portfolio';
import SectionHeading from '../components/UI/SectionHeading';
import NeonCard from '../components/UI/NeonCard';

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const scaleIn: any = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function ProjectsPage() {
  const { projects } = portfolioData;

  return (
    <div className="relative min-h-screen pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Featured Work"
          description="A selection of projects that showcase my expertise and passion."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-3"
        >
          {projects.map(
            ({ title, subtitle, description, tags, color, borderColor, accentColor, github, live }) => (
              <motion.div 
                key={title} 
                variants={scaleIn}
                onClick={() => window.open(github, '_blank')}
                className="cursor-pointer group h-full"
              >
                <NeonCard className={`flex h-full flex-col p-7 transition-all ${borderColor} group-hover:-translate-y-1 group-hover:shadow-xl`}>
                  {/* Gradient header */}
                  <div className={`-mx-7 -mt-7 mb-6 rounded-t-2xl bg-gradient-to-br ${color} px-7 py-8`}>
                    <p className={`text-xs font-semibold uppercase tracking-widest ${accentColor}`}>
                      {subtitle}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-white">{title}</h3>
                  </div>

                  <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-400">
                    {description}
                  </p>

                  {/* Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 border-t border-white/5 pt-5">
                    <a
                      href={github}
                      className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
                      aria-label={`${title} GitHub`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub size={14} /> Code
                    </a>
                    {live !== '#' && (
                      <a
                        href={live}
                        className={`flex items-center gap-1.5 text-sm transition-colors ${accentColor}`}
                        aria-label={`${title} Live Demo`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt size={12} /> Live Demo
                      </a>
                    )}
                  </div>
                </NeonCard>
              </motion.div>
            ),
          )}
        </motion.div>
      </div>
    </div>
  );
}
