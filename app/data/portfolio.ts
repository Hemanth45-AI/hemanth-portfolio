import { IconType } from 'react-icons';
import {
  FaReact,
  FaPython,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaJava,
  FaDatabase,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiThreedotjs,
  SiFlask,
  SiMysql,
} from 'react-icons/si';

export const portfolioData = {
  // ─── GENERAL INFO ───
  name: 'Mamidala Hemanth',
  role: 'Software Engineer & AI Enthusiast',
  resumeLink: '/Hemanth_Resume.pdf', // Ensure the PDF is placed in the public folder as Hemanth_Resume.pdf
  contactEmail: 'mamidalahemanth45@gmail.com',
  contactPhone: '9391021207',
  githubUrl: 'https://github.com/Hemanth45-AI',
  linkedinUrl: 'https://www.linkedin.com/in/hemanth-mamidala-47643a352',
  twitterUrl: 'https://x.com/MamidalHemanth', // Kept from previous config

  // ─── ABOUT SECTION ───
  about: {
    headline: 'Crafting Digital Excellence',
    description: "Passionate about building scalable systems, cloud-native architectures, and solving real customer problems through innovative technology.",
    paragraphs: [
      "I'm **Mamidala Hemanth**, an Information Technology Engineering student at **MLR Institute of Technology and Management** (CGPA: 9.02), with strong foundations in data structures, algorithms, and object-oriented programming.",
      "I have built AI-powered web applications using **Python, Flask, and REST APIs** with real-time lead scoring and async processing. I've demonstrated ownership by designing end-to-end solutions from requirements to deployment.",
      "I am experienced with GenAI tools like the **Groq API** to accelerate development, and I am actively learning cloud architectures like **AWS** to build scalable, robust systems."
    ],
    cgpa: '9.02',
    coreProjects: '3',
    certificationsCount: '4'
  },

  // ─── SKILLS ───
  skills: [
    { name: 'Python', icon: FaPython, color: '#3776AB' },
    { name: 'Java', icon: FaJava, color: '#F89820' },
    { name: 'SQL / MySQL', icon: FaDatabase, color: '#4479A1' },
    { name: 'Flask', icon: SiFlask, color: '#000000' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
    { name: 'HTML/CSS/JS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'AWS Cloud', icon: FaAws, color: '#FF9900' },
    { name: 'Git & GitHub', icon: FaGitAlt, color: '#F05032' },
  ],

  // ─── PROJECTS ───
  projects: [
    {
      title: 'MarketAI Suite',
      subtitle: 'AI-Powered Sales & Marketing Platform',
      description: 'Collaborated with cross-functional teams to build an AI-powered platform using Flask and Groq API for generating marketing campaigns. Built RESTful APIs for real-time AI responses and implemented a lead scoring system (0-100 scale) based on business parameters.',
      tags: ['Python', 'Flask', 'Groq API', 'REST API'],
      color: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'hover:border-cyan-500/30',
      accentColor: 'text-cyan-400',
      github: 'https://github.com/Hemanth45-AI',
      live: '#',
    },
    {
      title: 'Multi-Language Web App',
      subtitle: 'Multilingual Content Engine',
      description: 'Developed a dynamic web application supporting multiple languages using PHP sessions and server-side rendering. Implemented seamless language switching and designed responsive UI handling multilingual data efficiently.',
      tags: ['PHP', 'HTML', 'CSS', 'JavaScript'],
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'hover:border-purple-500/30',
      accentColor: 'text-purple-400',
      github: 'https://github.com/Hemanth45-AI',
      live: '#',
    },
    {
      title: 'AI Paper Summarizer',
      subtitle: 'NLP Document Synopsis Tool',
      description: 'Built an NLP-based system to generate concise summaries from long research documents. Applied keyword extraction and frequency-based techniques for accurate summarization, and developed a simple interface for document input.',
      tags: ['Python', 'NLP', 'HTML/CSS'],
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'hover:border-emerald-500/30',
      accentColor: 'text-emerald-400',
      github: 'https://github.com/Hemanth45-AI',
      live: '#',
    },
  ],

  // ─── CERTIFICATIONS ───
  certifications: [
    {
      name: 'Learning Python',
      issuer: 'Infosys Springboard',
      date: 'Present',
      link: '/certificates/python certificates.pdf',
    },
    {
      name: 'Core Java',
      issuer: 'Internshala',
      date: 'Present',
      link: '/certificates/Java certificate(1216).pdf',
    },
    {
      name: 'Python Full Stack Virtual Internship',
      issuer: 'Eduskills',
      date: 'Dec 2025',
      link: '/certificates/Pyhton full stack intern.pdf',
    },
    {
      name: 'AWS Cloud Practitioner Essentials',
      issuer: 'AWS Skill Builder',
      date: 'Present',
      link: '/certificates/aws cloud.pdf',
    },
    {
      name: 'Google Cloud Generative - AI Virtual Internship',
      issuer: 'EduSkills',
      date: 'Present',
      link: '#',
    },
    {
      name: 'Programming in C++',
      issuer: 'Infosys Springboard',
      date: 'Previous',
      link: '/certificates/C++ certifiacte(1216).pdf',
    },
    {
      name: 'Node.js Complete Guide',
      issuer: 'Simplilearn',
      date: 'Previous',
      link: '/certificates/NODEJS CERTIFICATE.pdf',
    }
  ],

  // ─── EXPERIENCE / INTERNSHIPS ───
  experience: [
    {
      role: 'Google Cloud Generative - AI Virtual Internship',
      company: 'EduSkills',
      date: 'Present',
      description: 'Engaged in a virtual internship focused on Google Cloud and Generative AI technologies. Gained practical experience with large language models and cloud-native AI solutions.',
    },
    {
      role: 'Python Full Stack Developer Virtual Internship',
      company: 'AICTE in collaboration with EduSkills',
      date: 'Oct 2025 - Dec 2025',
      description: 'Completed a 10-week intensive virtual internship focused on full-stack development using Python. Gained hands-on experience building end-to-end web applications integrating frontend, backend, and database layers.',
    }
  ]
};
