import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import fs from 'fs';
import path from 'path';
import './globals.css';
import GlobalNavBar from './components/Layout/GlobalNavBar';
import LayoutShell from './components/Layout/LayoutShell';
import CustomCursor from './components/UI/CustomCursor';

// Auto-copy the user photo from Downloads to public folder if it exists
try {
  const src = 'C:\\Users\\heman\\Downloads\\Hemanth.jpeg';
  const dest = path.join(process.cwd(), 'public', 'profile.jpeg');
  if (!fs.existsSync(dest) || fs.statSync(src).mtimeMs > fs.statSync(dest).mtimeMs) {
    fs.copyFileSync(src, dest);
    console.log('Successfully copied profile photo to public folder!');
  }
} catch (e) {
  console.error('Failed to copy photo:', e);
}

// Auto-copy Resume PDF
try {
  const downloadsDir = 'C:\\Users\\heman\\Downloads';
  const files = fs.readdirSync(downloadsDir);
  
  // Specifically look for exactly "resume.pdf"
  let resumeFile = files.find(f => f.toLowerCase() === 'resume.pdf');
  
  // Fallback to containing 'resume' or 'hemanth' if exact match isn't found
  if (!resumeFile) {
    resumeFile = files.find(f => f.toLowerCase().includes('resume') && f.toLowerCase().endsWith('.pdf')) 
              || files.find(f => f.toLowerCase().includes('hemanth') && f.toLowerCase().endsWith('.pdf'));
  }
  
  if (resumeFile) {
    const srcPdf = path.join(downloadsDir, resumeFile);
    const destPdf = path.join(process.cwd(), 'public', 'Hemanth_Resume.pdf');
    if (!fs.existsSync(destPdf) || fs.statSync(srcPdf).mtimeMs > fs.statSync(destPdf).mtimeMs) {
      fs.copyFileSync(srcPdf, destPdf);
      console.log('Successfully copied exact resume PDF to public folder from:', srcPdf);
    }
  }
} catch (e) {
  console.error('Failed to copy resume:', e);
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Hemanth M | Software Engineer & AI Enthusiast',
  description:
    'Portfolio of Hemanth M — a software engineer specializing in AI, full-stack development, and immersive web experiences. Explore projects, skills, and more.',
  keywords: [
    'Hemanth M',
    'Software Engineer',
    'AI',
    'Full Stack Developer',
    'Portfolio',
    'React',
    'Next.js',
    'Three.js',
  ],
  authors: [{ name: 'Hemanth M' }],
  openGraph: {
    title: 'Hemanth M | Software Engineer & AI Enthusiast',
    description:
      'Explore the portfolio of Hemanth M — software engineer, AI enthusiast, and creative technologist.',
    type: 'website',
  },
  verification: {
    google: 'n-jIW1JwH8AQfcSV9UdbVchF94AT1YY7OUi2IaL233A',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} md:cursor-none`}>
        <CustomCursor />
        <LayoutShell>
          <GlobalNavBar />
          <main className="relative z-10 min-h-screen">{children}</main>
        </LayoutShell>
      </body>
    </html>
  );
}