'use client';

import { motion } from 'framer-motion';
import { FaLaptopCode, FaCertificate, FaFileDownload } from 'react-icons/fa';
import { portfolioData } from '../data/portfolio';
import SectionHeading from '../components/UI/SectionHeading';
import NeonCard from '../components/UI/NeonCard';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export default function DashboardPage() {
  const { experience, certifications, resumeLink } = portfolioData;

  return (
    <div className="relative min-h-screen pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Credentials"
          title="Professional Experience"
          description="A central hub for my career timeline and professional credentials."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column: Experience Timeline */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 flex flex-col gap-6"
          >
            <NeonCard className="h-full p-8" glowColor="rgba(168, 85, 247, 0.15)">
              <div className="mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                  <FaLaptopCode size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">Experience & Internships</h3>
              </div>

              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-purple-500/30 before:to-transparent">
                {experience.map((exp, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-950 bg-gray-900 text-purple-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-purple-500/20">
                      <div className="w-2 h-2 rounded-full bg-purple-400 group-hover:bg-cyan-400 transition-colors" />
                    </div>
                    {/* Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all group-hover:border-purple-500/30 group-hover:bg-white/10">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                        <h4 className="font-bold text-white">{exp.role}</h4>
                        <time className="text-xs font-medium text-cyan-400">{exp.date}</time>
                      </div>
                      <div className="text-sm font-medium text-gray-400 mb-3">{exp.company}</div>
                      <p className="text-sm text-gray-500">{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </NeonCard>
          </motion.div>

          {/* Right Column: Certs & Resume */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 lg:col-span-4"
          >
            {/* Certifications */}
            <NeonCard className="flex-1 p-8" glowColor="rgba(56, 189, 248, 0.15)">
              <div className="mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                  <FaCertificate size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">Certifications</h3>
              </div>
              <div className="space-y-4">
                {certifications.map((cert, idx) => {
                  const content = (
                    <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10 hover:border-cyan-500/30">
                      <h4 className="font-semibold text-gray-200 group-hover:text-white transition-colors">{cert.name}</h4>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-gray-400">{cert.issuer}</span>
                        <span className="text-cyan-500">{cert.date}</span>
                      </div>
                    </div>
                  );
                  return (
                    <motion.div key={idx} variants={fadeInUp}>
                      {cert.link && cert.link !== '#' ? (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="block">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </NeonCard>

            {/* Resume Download Action */}
            <motion.div variants={fadeInUp}>
              <NeonCard className="p-8 text-center" glowColor="rgba(16, 185, 129, 0.15)">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <FaFileDownload size={24} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">Download Resume</h3>
                <p className="mb-6 text-sm text-gray-400">Get a copy of my latest CV</p>
                <a
                  href={resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-400 border border-emerald-500/20 transition-all hover:bg-emerald-500 hover:text-white"
                >
                  <FaFileDownload /> Get PDF
                </a>
              </NeonCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
