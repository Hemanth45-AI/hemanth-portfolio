'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import Avatar3D from '../UI/Avatar3D';

/* ─── Knowledge base for simulated AI responses (Fallback) ─── */
const KNOWLEDGE: Record<string, string> = {
  hello:
    "Hello! 👋 I'm Hemanth's AI Recruiter Guide. I can walk you through his skills, B.Tech education, certifications, and projects (like MarketAI). What would you like to know?",
  hi:
    "Welcome! 👋 I'm Hemanth's recruitment agent. Ask me about his software projects, coding skills, CGPA, or how to contact him directly!",
  skills:
    "Hemanth's technical skills include:\n• **Programming**: Python, Java, JavaScript, SQL\n• **Web Technologies**: HTML, Flask, CSS, JavaScript (and React, Next.js, Three.js, Tailwind v4 used to build this portfolio!)\n• **Databases**: SQL, MySQL\nHe also has strong knowledge of Data Structures, Algorithms, and Software Development Life Cycle (SDLC) models.",
  education:
    "Hemanth is pursuing a **Bachelor of Technology (B.Tech) in IT (Information Technology)** at **MLR Institute of Technology and Management**, Hyderabad. He has an outstanding CGPA of **9.02**!\nHe completed Intermediate (MPC) in 2023 with **94%** and High School in 2021 with **10 GPA**.",
  projects:
    "Hemanth has built several impressive projects:\n1. **MarketAI Suite** (Dec 2025) – An AI-powered sales & marketing platform built with Flask and Groq API. Features marketing campaign generation, sales pitches, and 0-100 lead scoring.\n2. **Multi-Language Web Application** (Jan 2026) – Built with PHP sessions to support seamless language switching and dynamic content.\n3. **AI Research Paper Summarizer** (March 2026) – An NLP tool for summarization, keyword extraction, and frequency analysis.",
  experience:
    "Hemanth is an Information Technology Engineering student with strong hands-on development experience in web technologies and AI/NLP integrations. He excels in analytical problem solving, data structures, and database systems.",
  certifications:
    "Hemanth has earned certifications in:\n• **Learning Python** (Infosys Springboard) – Python syntax, control structures, functions, and OOP.\n• **Core Java** (Internshala) – OOP concepts, exception handling, and application design.",
  contact:
    "You can get in touch with Hemanth directly:\n• 📧 **Email**: mamidalahemanth45@gmail.com\n• 📱 **Phone**: +91 9391021207\n• 🔗 **LinkedIn**: linkedin.com/in/hemanth-mamidala-094191295\nHe is currently based in Hyderabad, India.",
  resume:
    "Hemanth is ready for new software development roles! Reach out at mamidalahemanth45@gmail.com to request his complete PDF resume.",
  react:
    "React is used alongside Next.js and Tailwind CSS v4 to create this stunning portfolio's interactive front-end structure.",
  python:
    "Python is one of Hemanth's primary languages. He used it to build his AI-powered MarketAI Suite (Flask + Groq API) and AI Summarizer (NLP).",
  ai:
    "Hemanth is passionate about AI. He built the MarketAI Suite using the Groq API and an AI Summarizer using NLP keyword extraction & text processing.",
  typescript:
    "TypeScript is the language used to build this entire portfolio, providing type safety and robust software structures.",
  hobbies:
    "When not coding, Hemanth enjoys learning about AI research, studying data structures, contributing to software projects, and learning new technical stacks.",
  website:
    "This stunning 3D portfolio was built by Hemanth using Next.js, React, Three.js, and Tailwind CSS! It features an interactive Neural Constellation background, a Command Center Dashboard with clickable PDF certificates, and this very AI Assistant powered by the Gemini API.",
  features:
    "This portfolio showcases a Custom 3D Avatar, an interactive Neural Constellation background, dynamic particle effects, and an AI-powered Chat Assistant that connects to the Gemini API.",
  default:
    "Hemanth has solid programming skills and an impressive academic track record. I can guide you through his Projects, Technical Skills, Education, Certifications, or Contact info. What are you looking for?",
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase().trim();

  for (const [key, value] of Object.entries(KNOWLEDGE)) {
    if (key !== 'default' && lower.includes(key)) {
      return value;
    }
  }

  // Greeting patterns
  if (/^(hey|hello|hi|sup|yo|howdy)/i.test(lower)) return KNOWLEDGE.hello;
  if (/website|portfolio|features/i.test(lower)) return KNOWLEDGE.website;
  if (/who\s*(are|is)\s*(you|hemanth)/i.test(lower))
    return "I'm Hemanth's AI Recruiter Guide! Hemanth is an IT Engineering student passionate about AI, web development, and coding. I can answer questions about his skills, education, projects, or certifications.";
  if (/what\s*(can|do)\s*you/i.test(lower))
    return "I can detail Hemanth's technical skills, Projects (MarketAI Suite, Multilingual Web App, AI Summarizer), B.Tech education at MLR Institute of Technology, certifications, and contact details. Ask me anything! 🚀";

  return KNOWLEDGE.default;
}

/* ─── Types ─── */
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

/* ─── Component ─── */
export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "👋 Welcome, Recruiter! I'm Hemanth's AI Recruiter Guide. Ask me about his technical skills, B.Tech education (9.02 CGPA), Projects, or the features of this website!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.reply) {
        setMessages((prev) => [
          ...prev, 
          { id: (Date.now() + 1).toString(), role: 'assistant', content: data.reply }
        ]);
        setIsTyping(false);
        return;
      }
    } catch (err) {
      console.error("API error, falling back to local DB");
    }

    // Fallback to local DB if API fails or no key
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const response = getAIResponse(trimmed);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleSuggestionClick = async (prompt: string) => {
    if (isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.reply) {
        setMessages((prev) => [
          ...prev, 
          { id: (Date.now() + 1).toString(), role: 'assistant', content: data.reply }
        ]);
        setIsTyping(false);
        return;
      }
    } catch (err) {
      console.error("API error, falling back to local DB");
    }

    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const response = getAIResponse(prompt);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* 3D Floating Avatar Button */}
      {!isOpen && (
        <div className="fixed bottom-0 right-0 z-50">
          <Avatar3D onClick={() => setIsOpen(true)} />
        </div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-assistant-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-cyan-500/20 bg-gray-950/95 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl"
            style={{ height: 480 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-sm text-white">
                    <FaRobot />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-gray-950 bg-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">AI Assistant</p>
                  <p className="text-xs text-emerald-400">Online • Powered by Gemini</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'rounded-br-md bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                        : 'rounded-bl-md border border-white/5 bg-white/5 text-gray-200'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/5 bg-white/5 px-4 py-3">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            <div className="flex flex-wrap gap-2 px-4 py-2.5 border-t border-white/5 bg-gray-950/40">
              {[
                { text: 'Skills', icon: '⚡' },
                { text: 'Projects', icon: '🚀' },
                { text: 'Experience', icon: '💼' },
                { text: 'Website', icon: '🌐' },
                { text: 'Contact', icon: '📬' },
              ].map((chip) => (
                <button
                  key={chip.text}
                  onClick={() => handleSuggestionClick(chip.text)}
                  disabled={isTyping}
                  className="inline-flex items-center gap-1 rounded-full border border-cyan-500/10 bg-cyan-500/5 px-2.5 py-1 text-xs text-cyan-300 transition-colors hover:border-cyan-500/30 hover:bg-cyan-500/10 disabled:opacity-50 cursor-pointer"
                >
                  <span>{chip.icon}</span>
                  <span>{chip.text}</span>
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-white/5 bg-gray-950/80 px-4 py-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition-colors focus-within:border-cyan-500/50">
                <input
                  ref={inputRef}
                  id="ai-assistant-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Hemanth..."
                  className="flex-1 border-none bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                />
                <button
                  id="ai-assistant-send"
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white transition-opacity hover:opacity-90 disabled:opacity-30"
                  aria-label="Send message"
                >
                  <FaPaperPlane size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
