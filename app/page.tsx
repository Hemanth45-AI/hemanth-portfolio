'use client';

import Hero3D from './components/Sections/Hero3D';

export default function Home() {
  return (
    <>
      {/* ─── HERO ─── */}
      <Hero3D />

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5 py-8 mt-auto">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}{' '}
            <span className="text-gray-400">Hemanth M</span>. Built with
            Next.js, Three.js &amp; Framer Motion.
          </p>
        </div>
      </footer>
    </>
  );
}