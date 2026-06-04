'use client';

import { motion, Variants } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { portfolioData } from '../data/portfolio';
import SectionHeading from '../components/UI/SectionHeading';
import NeonCard from '../components/UI/NeonCard';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export default function ContactPage() {
  const { contactEmail, contactPhone, linkedinUrl, githubUrl } = portfolioData;

  const contactMethods = [
    {
      title: 'Email',
      value: contactEmail,
      icon: FaEnvelope,
      href: `mailto:${contactEmail}`,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20',
      glowColor: 'rgba(34, 211, 238, 0.15)',
    },

    {
      title: 'LinkedIn',
      value: 'Connect on LinkedIn',
      icon: FaLinkedin,
      href: linkedinUrl,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      glowColor: 'rgba(59, 130, 246, 0.15)',
    },
    {
      title: 'GitHub',
      value: 'View my Repositories',
      icon: FaGithub,
      href: githubUrl,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      glowColor: 'rgba(168, 85, 247, 0.15)',
    },
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Connect"
          description="Have a project in mind, an opportunity, or just want to chat? Reach out to me directly."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          {contactMethods.map((method, idx) => (
            <motion.div key={idx} variants={fadeInUp}>
              <a
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="block h-full outline-none"
              >
                <NeonCard
                  className="flex h-full flex-col items-center justify-center p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl group"
                  glowColor={method.glowColor}
                >
                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${method.bgColor} border border-white/5 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <method.icon className={`text-2xl ${method.color}`} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">{method.title}</h3>
                  <p className="text-sm font-medium text-gray-400 transition-colors group-hover:text-gray-300 break-all">
                    {method.value}
                  </p>
                </NeonCard>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
