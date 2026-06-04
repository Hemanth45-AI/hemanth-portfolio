'use client';

import { motion } from 'framer-motion';
import { 
  FaBriefcase, 
  FaCertificate, 
  FaFilePdf, 
  FaDownload, 
  FaBrain,
  FaServer,
  FaNetworkWired
} from 'react-icons/fa';
import NeonCard from '../UI/NeonCard';
import { portfolioData } from '../../data/portfolio';

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

const scaleIn: any = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function DashboardSection() {
  return (
    <section id="dashboard" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Heading */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[4px] text-cyan-400">
            Professional Experience
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Credentials & Experience
          </h2>
          <p className="text-base leading-relaxed text-gray-400 sm:text-lg">
            A centralized hub containing my professional timeline, credentials, and real-time AI processing metrics.
          </p>
        </motion.div>

        {/* Dashboard Grid / Bento Box */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid gap-6 md:grid-cols-12 md:grid-rows-2"
        >
          
          {/* Experience / Internship (Spans 8 columns, 2 rows) */}
          <motion.div variants={scaleIn} className="md:col-span-7 md:row-span-2">
            <NeonCard className="h-full p-8">
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <FaBriefcase size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">Experience & Internships</h3>
              </div>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                
                {/* Item 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-cyan-500 bg-gray-900 shadow shadow-cyan-500/50 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                  </div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all hover:border-cyan-500/20 hover:bg-white/10">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white text-sm sm:text-base">Software Engineer Intern</h4>
                      <span className="text-[10px] text-cyan-400 font-mono">Present</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">Tech Innovators Inc.</p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Developing AI-driven web applications and optimizing database architectures. Integrated the Groq LLM API into a full-stack platform.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white/20 bg-gray-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/10">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white text-sm sm:text-base">Web Development Intern</h4>
                      <span className="text-[10px] text-gray-500 font-mono">2023</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">Creative Solutions LLC</p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Built a multi-language content engine using PHP, HTML, CSS, and JS. Designed the responsive UI and handled session management.
                    </p>
                  </div>
                </div>

              </div>
            </NeonCard>
          </motion.div>

          {/* Certifications (Spans 5 columns, 1 row) */}
          <motion.div variants={scaleIn} className="md:col-span-5 md:row-span-1">
            <NeonCard className="h-full p-6" glowColor="rgba(168, 85, 247, 0.15)">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
                  <FaCertificate size={18} />
                </div>
                <h3 className="text-lg font-bold text-white">Certifications</h3>
              </div>
              
              <div className="grid gap-3">
                {portfolioData.certifications.slice(0, 3).map((cert, idx) => {
                  const content = (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 transition-colors hover:border-purple-500/30 hover:bg-purple-500/5 group cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center shrink-0">
                        <FaCertificate className="text-purple-400 text-xs transition-transform group-hover:scale-125" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">{cert.name}</h4>
                        <p className="text-xs text-gray-500">{cert.issuer} ({cert.date})</p>
                      </div>
                    </div>
                  );

                  return cert.link && cert.link !== '#' ? (
                    <a key={idx} href={cert.link} target="_blank" rel="noopener noreferrer" className="block outline-none">
                      {content}
                    </a>
                  ) : (
                    <div key={idx}>{content}</div>
                  );
                })}
              </div>
            </NeonCard>
          </motion.div>

          {/* Resume & AI Analytics Grid (Spans 5 cols, 1 row - splits into two blocks on desktop if needed, or stacking) */}
          <motion.div variants={scaleIn} className="md:col-span-5 md:row-span-1 flex flex-col sm:flex-row md:flex-col gap-6">
            
            {/* Resume */}
            <NeonCard className="flex-1 p-6 flex flex-col justify-between group" glowColor="rgba(239, 68, 68, 0.15)">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-red-500/10 text-red-400">
                    <FaFilePdf size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-white">Resume</h3>
                </div>
                <div className="px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-[10px] text-green-400 font-mono uppercase">
                  Updated
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                Download my full curriculum vitae to see a detailed breakdown of my academic history, skills, and projects.
              </p>
              <a
                href="/resume.pdf"
                download
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-sm font-semibold text-white border border-white/10 transition-all hover:bg-white/10 hover:border-white/25"
              >
                <FaDownload size={12} className="text-gray-400 group-hover:text-white" />
                Download PDF
              </a>
            </NeonCard>

            {/* AI Widget */}
            <NeonCard className="flex-1 p-6 relative overflow-hidden" glowColor="rgba(16, 185, 129, 0.15)">
              <div className="absolute -right-4 -top-4 text-emerald-500/10 rotate-12">
                <FaBrain size={120} />
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Neural Sync
                  </h3>
                  <p className="text-xs text-gray-400">AI Task Processing Node</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-black/40 rounded p-2 border border-white/5 flex flex-col gap-1">
                    <span className="text-gray-500 flex items-center gap-1"><FaServer size={10}/> Latency</span>
                    <span className="text-emerald-400">12.4ms</span>
                  </div>
                  <div className="bg-black/40 rounded p-2 border border-white/5 flex flex-col gap-1">
                    <span className="text-gray-500 flex items-center gap-1"><FaNetworkWired size={10}/> Nodes</span>
                    <span className="text-emerald-400">8,492 active</span>
                  </div>
                </div>
              </div>
            </NeonCard>

          </motion.div>

        </motion.div>
      </div>
      <div className="section-divider mx-auto mt-28 max-w-4xl" />
    </section>
  );
}
