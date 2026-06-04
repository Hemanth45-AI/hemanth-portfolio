'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, Line, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

interface NodeData {
  id: string;
  label: string;
  position: [number, number, number];
  color: string;
  description: string;
  prompt: string;
}

const NODES: NodeData[] = [
  { 
    id: 'fullstack', 
    label: 'Full Stack', 
    position: [-2.5, 1, 0], 
    color: '#3b82f6', 
    description: 'React, Next.js, Flask, Tailwind',
    prompt: 'Tell me about Hemanth\'s full stack development skills and projects.'
  },
  { 
    id: 'genai', 
    label: 'Generative AI', 
    position: [2.5, 1.5, 1], 
    color: '#10b981', 
    description: 'Gemini, Groq API, LLM Integration',
    prompt: 'How does Hemanth use Generative AI like Gemini and Groq in his projects?'
  },
  { 
    id: 'aiml', 
    label: 'AI/ML', 
    position: [1.5, -1.5, -1], 
    color: '#8b5cf6', 
    description: 'NLP, Data Analysis, Python',
    prompt: 'What AI and Machine Learning techniques does Hemanth use? Tell me about his NLP paper summarizer.'
  },
  { 
    id: 'prompteng', 
    label: 'Prompt Engineering', 
    position: [-1.5, -1, 1.5], 
    color: '#f59e0b', 
    description: 'Context Optimization, System Prompts',
    prompt: 'Explain Hemanth\'s expertise in prompt engineering and how he optimizes context windows.'
  },
];

const CONNECTIONS = [
  [NODES[0].position, NODES[1].position],
  [NODES[0].position, NODES[3].position],
  [NODES[1].position, NODES[2].position],
  [NODES[2].position, NODES[3].position],
  [NODES[0].position, NODES[2].position], // cross connection
];

// 3D Node Component
function SkillNode({ data, selectedId, onClick }: { data: NodeData; selectedId: string | null; onClick: (id: string) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isSelected = selectedId === data.id;
  const isFaded = selectedId !== null && !isSelected;

  useFrame((state) => {
    if (meshRef.current) {
      // Pulse animation if selected
      const scale = isSelected ? 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={data.position} onClick={(e) => { e.stopPropagation(); onClick(data.id); }}>
        <Sphere ref={meshRef} args={[0.3, 32, 32]}>
          <meshStandardMaterial 
            color={data.color} 
            emissive={data.color} 
            emissiveIntensity={isSelected ? 2 : 0.5}
            transparent
            opacity={isFaded ? 0.2 : 1}
          />
        </Sphere>
        
        {/* Glow effect */}
        {isSelected && (
          <Sphere args={[0.5, 32, 32]}>
             <meshBasicMaterial color={data.color} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
          </Sphere>
        )}

        <Text
          position={[0, -0.6, 0]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          fillOpacity={isFaded ? 0.2 : 1}
        >
          {data.label}
        </Text>
      </group>
    </Float>
  );
}

// Camera Controller
function CameraRig({ selectedNode }: { selectedNode: NodeData | null }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 8));
  const lookAtPos = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (selectedNode) {
      // Move camera slightly in front of the selected node
      targetPos.current.set(
        selectedNode.position[0] * 1.5,
        selectedNode.position[1] * 1.5,
        selectedNode.position[2] + 4
      );
      lookAtPos.current.set(...selectedNode.position);
    } else {
      // Reset to default
      targetPos.current.set(0, 0, 8);
      lookAtPos.current.set(0, 0, 0);
    }

    camera.position.lerp(targetPos.current, 0.05);
    
    // Smooth lookAt
    const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    const newLookAt = currentLookAt.lerp(lookAtPos.current, 0.05);
    camera.lookAt(newLookAt);
  });

  return null;
}

export default function NeuralConstellation() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{role: string, content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const selectedNode = NODES.find(n => n.id === selectedId) || null;

  // Ask Gemini about the selected node
  useEffect(() => {
    if (selectedNode) {
      askGemini(selectedNode.prompt);
    } else {
      setChatMessages([]);
    }
  }, [selectedNode]);

  const askGemini = async (prompt: string) => {
    setIsLoading(true);
    setChatMessages([{ role: 'user', content: prompt }]);
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
      });
      
      const data = await res.json();
      if (res.ok) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am currently disconnected from the neural net (API Error).' }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Connection failed.' }]);
    }
    setIsLoading(false);
  };

  const handleContainerClick = () => {
    if (selectedId) setSelectedId(null);
  };

  return (
    <section className="relative w-full h-[600px] lg:h-[700px] overflow-hidden rounded-3xl border border-white/10 bg-black/50 backdrop-blur-md mb-20 shadow-2xl">
      {/* 3D Canvas */}
      <div className="absolute inset-0 cursor-pointer" onClick={handleContainerClick}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          
          <CameraRig selectedNode={selectedNode} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate={!selectedId} 
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />

          {/* Connections */}
          {CONNECTIONS.map((positions, i) => (
            <Line 
              key={`line-${i}`} 
              points={positions as [number, number, number][]} 
              color="rgba(255, 255, 255, 0.15)" 
              lineWidth={1} 
              transparent 
            />
          ))}

          {/* Nodes */}
          {NODES.map(node => (
            <SkillNode 
              key={node.id} 
              data={node} 
              selectedId={selectedId} 
              onClick={setSelectedId} 
            />
          ))}
        </Canvas>
      </div>

      {/* UI Overlay / Glassmorphism Sidebar */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="absolute top-6 right-6 bottom-6 w-full max-w-sm rounded-2xl glass-card flex flex-col overflow-hidden pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: selectedNode.color }} />
                <h3 className="text-lg font-bold text-white">{selectedNode.label}</h3>
              </div>
              <button 
                onClick={() => setSelectedId(null)}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <FaTimes />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600/30 text-blue-100 rounded-tr-sm border border-blue-500/20' 
                      : 'bg-white/5 text-gray-200 rounded-tl-sm border border-white/10'
                  }`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-gray-400">
                        <FaRobot className="text-cyan-400" />
                        AI Assistant
                      </div>
                    )}
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-sm flex gap-2">
                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                   </div>
                </div>
              )}
            </div>
            
            {/* Context Info */}
            <div className="p-4 bg-black/40 border-t border-white/10 text-xs text-gray-400">
              <p>Technologies: <span className="text-white">{selectedNode.description}</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </section>
  );
}
