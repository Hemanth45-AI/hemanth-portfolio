# Mamidala Hemanth - 3D Interactive Portfolio 🌌

Welcome to the source code of **Hemanth's Next-Gen Developer Portfolio**. This project is a highly immersive, interactive, and AI-powered personal website built with modern web technologies. It is designed to stand out to recruiters and demonstrate deep expertise in Full-Stack Development, Generative AI, and 3D web rendering.

---

## 🌟 Key Features

1. **Interactive 3D Environments (Three.js & React Three Fiber)**
   - **Neural Constellation:** A dynamic, physics-based particle system in the background that reacts to mouse movements, simulating neural networks.
   - **3D Interactive Avatar:** A floating 3D avatar element that tracks the user's cursor with custom physics using Framer Motion.
2. **Embedded AI Assistant (Gemini API)**
   - A fully functional, custom-trained AI chatbot built into the website.
   - Connects securely to the Google Generative AI (Gemini 1.5 Flash) API to answer questions about Hemanth's resume, projects, and skills.
   - Includes a robust offline fallback local-database if the API is unreachable.
3. **Professional Experience Command Center**
   - A highly visual "Bento Box" style dashboard for tracking career timelines.
   - Supports direct click-to-open PDF viewer for certifications and credentials.
4. **Custom Content Management (Data Layer)**
   - 100% data-driven UI. All data (skills, projects, about text) is extracted into a single configuration file (`app/data/portfolio.ts`), meaning you never have to touch React code to update your resume.

---

## 🛠️ Technology Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 & Custom CSS Modules
- **Animations:** Framer Motion
- **3D Rendering:** Three.js & React Three Fiber (R3F)
- **AI Integration:** `@google/generative-ai` (Gemini API)
- **Icons:** `react-icons`

---

## 📝 How to Update Your Content

You do not need to write UI code to update your website. The entire site reads from one central file.

👉 **Edit this file:** `app/data/portfolio.ts`

### 1. Adding a new Project
Scroll to the `projects` array and add a new object:
```typescript
{
  title: 'My New AI Project',
  subtitle: 'An awesome new tool',
  description: 'Built a cool AI app using Python and React.',
  tags: ['Python', 'React', 'OpenAI'],
  color: 'from-purple-500/20 to-pink-500/20',
  borderColor: 'hover:border-purple-500/30',
  accentColor: 'text-purple-400',
  github: 'https://github.com/Hemanth45-AI/new-project',
  live: 'https://my-live-project-url.com',
}
```

### 2. Updating Certificates
To add a new certificate PDF:
1. Place the PDF file inside the `public/certificates/` folder.
2. Update the `certifications` array in `portfolio.ts` to link to it:
```typescript
{
  name: 'New Certification Name',
  issuer: 'Organization Name',
  date: 'Jan 2026',
  link: '/certificates/my-new-cert.pdf', // Path relative to public folder
}
```

### 3. Updating your Resume
Replace the file named `Hemanth_Resume.pdf` inside the `public/` directory with your newest PDF. The site will automatically serve the updated version.

---

## 🤖 Configuring the AI Assistant

The AI Assistant is powered by the **Google Gemini API**. 

### 1. API Setup
For the AI to work dynamically, you must create a `.env.local` file in the root of the project and add your API key:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 2. Modifying the AI's Brain
To change how the AI responds or what it knows about you:
1. **API Prompt**: Open `app/api/chat/route.ts` and modify the `SYSTEM_PROMPT` string. This tells Gemini how to act.
2. **Local Fallback**: Open `app/components/Sections/AIAssistant.tsx` and modify the `KNOWLEDGE` object. This is what the bot uses if the API key is missing or rate-limited.

---

## 💻 Local Development Setup

To run this project on your local machine:

1. **Clone the repository** (if not already local)
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Environment Variables:**
   Create a `.env.local` file and add your `GEMINI_API_KEY`.
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **View the site:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment Guide (Vercel)

This Next.js application is optimized for deployment on Vercel.

1. Commit your changes and push them to your GitHub repository.
2. Go to [Vercel.com](https://vercel.com/) and import your GitHub repository.
3. In the Vercel project settings, go to **Environment Variables** and add your `GEMINI_API_KEY`.
4. Click **Deploy**.
5. *Future Updates:* Every time you `git push` to your main branch, Vercel will automatically rebuild and update the live website!
