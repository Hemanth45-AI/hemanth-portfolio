import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
// The user needs to add GEMINI_API_KEY to their .env.local file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `You are Hemanth's AI Recruiter Guide, built to help recruiters and visitors learn about Mamidala Hemanth.
Hemanth is an IT Engineering student at MLR Institute of Technology and Management (CGPA: 9.02).
His skills include Python, Java, JavaScript, Next.js, React, Three.js, Tailwind, SQL, and Flask.
His projects include:
1. MarketAI Suite: An AI-powered sales & marketing platform built with Flask and Groq API.
2. Multi-Language Web App: A PHP-based multilingual site.
3. AI Paper Summarizer: An NLP tool for text summarization.
About this website:
This is a modern, 3D interactive Next.js portfolio built by Hemanth. Features include:
- A custom Neural Constellation interactive 3D background using Three.js and Framer Motion.
- A Command Center Dashboard with clickable PDF certificates.
- An embedded AI Assistant powered by the Gemini API.
Contact info: mamidalahemanth45@gmail.com, +91 9391021207.
Keep responses very concise, professional, friendly, and in 1-2 short paragraphs. Do not use markdown headers.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not set. Please add it to your environment variables.' },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // Extract the latest user message
    const latestMessage = messages[messages.length - 1].content;
    
    // Construct the prompt with system context
    const prompt = `${SYSTEM_PROMPT}\n\nUser Question: ${latestMessage}\n\nProvide a concise and helpful response as Hemanth's AI Assistant:`;
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    return NextResponse.json({ reply: responseText });
    
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response.' },
      { status: 500 }
    );
  }
}
