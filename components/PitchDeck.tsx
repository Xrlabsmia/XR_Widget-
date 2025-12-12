import React, { useState } from 'react';
import { PitchDeckSlide } from '../types';

const slides: PitchDeckSlide[] = [
  {
    id: 1,
    title: "The Problem",
    content: "The Metaverse is suffering from an identity crisis. Deepfakes and AI-generated avatars are indistinguishable from real users, destroying trust in digital interactions.",
    bulletPoints: [
      "90% increase in deepfake fraud in 2024",
      "No real-time verification tool for XR",
      "Users feel unsafe in immersive environments"
    ]
  },
  {
    id: 2,
    title: "The Solution: XR Button",
    content: "A portable, HUD-based layer of truth for the spatial web. We provide real-time biometric verification and generative content detection at the click of a button.",
    bulletPoints: [
      "Instant AI Detection via Gemini 2.5 Flash",
      "Seamless Circular HUD UI",
      "Freemium SaaS Model ($5/mo Pro)"
    ]
  },
  {
    id: 3,
    title: "Market & Traction",
    content: "Targeting the $800B Metaverse market and the $20B Identity Verification sector. Launching on Vercel/Render for enterprise scalability.",
    bulletPoints: [
      "B2C: Personal Protection",
      "B2B: Enterprise Meeting Verification",
      "Asking: $2M Seed for Mobile XR integration"
    ]
  }
];

export const PitchDeck: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="bg-neutral-900 border border-xr-cyan/30 w-full max-w-4xl h-[600px] rounded-xl flex flex-col overflow-hidden relative shadow-[0_0_50px_rgba(0,243,255,0.1)]">
        
        {/* Header */}
        <div className="h-16 border-b border-neutral-800 flex items-center justify-between px-8 bg-neutral-950">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-xr-cyan rounded-full animate-pulse"></div>
            <h2 className="font-display text-xl text-white tracking-wider">XR BUTTON <span className="text-neutral-500 text-sm ml-2">INVESTOR DECK</span></h2>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-12 flex flex-col justify-center relative">
          <div className="absolute top-4 right-4 text-neutral-700 font-display text-6xl opacity-20 select-none">
            0{slides[currentSlide].id}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl text-neutral-300 mb-12 max-w-2xl leading-relaxed">
            {slides[currentSlide].content}
          </p>
          
          <ul className="space-y-4">
            {slides[currentSlide].bulletPoints.map((point, idx) => (
              <li key={idx} className="flex items-center gap-4 text-lg text-xr-cyan">
                <span className="w-2 h-2 bg-xr-pink rounded-full"></span>
                <span className="text-neutral-200">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer / Controls */}
        <div className="h-20 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between px-8">
          <div className="flex gap-2">
             {slides.map((_, idx) => (
               <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-xr-cyan' : 'w-2 bg-neutral-700'}`}></div>
             ))}
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={prevSlide} 
              disabled={currentSlide === 0}
              className="px-6 py-2 rounded border border-neutral-700 text-neutral-300 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <button 
              onClick={nextSlide} 
              disabled={currentSlide === slides.length - 1}
              className="px-6 py-2 rounded bg-xr-cyan text-black font-bold hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};