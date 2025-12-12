import React, { useState } from 'react';
import { HUD } from './components/HUD';
import { PitchDeck } from './components/PitchDeck';
import { UserTier } from './types';

const App = () => {
  const [hudOpen, setHudOpen] = useState(false);
  const [showDeck, setShowDeck] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  
  // Simulated Backend State (User & Subscription)
  const [userTier, setUserTier] = useState<UserTier>(UserTier.FREE);

  const toggleHud = () => setHudOpen(!hudOpen);
  
  const handleUpgrade = () => {
    // In a real app, this would call Stripe Checkout
    setUserTier(UserTier.PRO);
    setShowPricing(false);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-xr-cyan selection:text-black font-sans relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-xr-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-xr-pink/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-30 border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded border border-xr-cyan flex items-center justify-center bg-xr-cyan/10">
              <span className="font-display font-bold text-xr-cyan">XR</span>
            </div>
            <span className="font-display font-bold text-xl tracking-wide">BUTTON</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setShowDeck(true)}
              className="text-sm text-neutral-400 hover:text-white transition-colors hidden md:block"
            >
              Investors
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 border border-neutral-800 px-3 py-1 rounded-full">
               <div className={`w-2 h-2 rounded-full ${userTier === UserTier.PRO ? 'bg-xr-cyan' : 'bg-neutral-600'}`}></div>
               {userTier === UserTier.PRO ? 'PRO ACTIVE' : 'FREE TIER'}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-xr-pink/30 bg-xr-pink/5 text-xr-pink text-xs font-bold tracking-wider mb-8 animate-pulse">
           ⚠️ DETECT DEEPFAKES INSTANTLY
        </div>
        
        <h1 className="text-5xl md:text-8xl font-display font-black mb-6 leading-tight">
          TRUST YOUR <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-xr-cyan to-blue-600">DIGITAL REALITY</span>
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-12 leading-relaxed">
          The ultimate social HUD for the Metaverse. Verify digital likenesses and detect AI-generated anomalies in real-time with enterprise-grade precision.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <button 
            onClick={toggleHud}
            className="group relative px-8 py-4 bg-white text-black font-display font-bold text-lg rounded hover:bg-neutral-200 transition-all flex items-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-xr-cyan opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <span>LAUNCH HUD</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          
          <button 
            onClick={() => setShowPricing(true)}
            className="px-8 py-4 border border-neutral-700 text-white font-display font-bold text-lg rounded hover:border-xr-cyan hover:text-xr-cyan transition-all"
          >
            UPGRADE TO PRO
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full text-left">
          <div className="p-6 border border-white/5 rounded-xl bg-white/5 hover:border-xr-cyan/30 transition-colors">
            <div className="w-10 h-10 bg-xr-cyan/10 text-xr-cyan rounded flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
            <h3 className="font-display text-lg font-bold mb-2">Visual Analysis</h3>
            <p className="text-sm text-neutral-400">Advanced computer vision detects synthetic media artifacts in real-time video feeds.</p>
          </div>
          <div className="p-6 border border-white/5 rounded-xl bg-white/5 hover:border-xr-pink/30 transition-colors">
             <div className="w-10 h-10 bg-xr-pink/10 text-xr-pink rounded flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="font-display text-lg font-bold mb-2">Secure HUD</h3>
            <p className="text-sm text-neutral-400">Encrypted, local-first processing layer that overlays seamlessly on your desktop environment.</p>
          </div>
          <div className="p-6 border border-white/5 rounded-xl bg-white/5 hover:border-purple-500/30 transition-colors">
             <div className="w-10 h-10 bg-purple-500/10 text-purple-500 rounded flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="font-display text-lg font-bold mb-2">Gemini Powered</h3>
            <p className="text-sm text-neutral-400">Leveraging Google's Gemini 2.5 Flash for millisecond-latency multimodal reasoning.</p>
          </div>
        </div>
      </main>

      {/* Components Layer */}
      <HUD 
        isOpen={hudOpen} 
        onClose={() => setHudOpen(false)} 
        userTier={userTier}
        onUpgrade={() => {
          setHudOpen(false);
          setShowPricing(true);
        }}
      />

      {showDeck && <PitchDeck onClose={() => setShowDeck(false)} />}

      {/* Pricing Modal (Simulated Stripe) */}
      {showPricing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-xr-cyan via-purple-500 to-xr-pink"></div>
            
            <h2 className="text-2xl font-display font-bold mb-2">Upgrade to Pro</h2>
            <p className="text-neutral-400 mb-8">Unlock real-time AI detection and advanced biometrics.</p>
            
            <div className="flex items-end mb-8">
              <span className="text-4xl font-bold text-white">$5</span>
              <span className="text-neutral-500 mb-1 ml-1">/ month</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-neutral-300">
                <span className="text-xr-cyan">✓</span> Unlimited AI Scans
              </li>
              <li className="flex items-center gap-3 text-sm text-neutral-300">
                <span className="text-xr-cyan">✓</span> Deepfake Detection
              </li>
              <li className="flex items-center gap-3 text-sm text-neutral-300">
                <span className="text-xr-cyan">✓</span> Priority Support
              </li>
            </ul>
            
            <button 
              onClick={handleUpgrade}
              className="w-full py-3 bg-xr-cyan hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors mb-4"
            >
              Pay with Card (Stripe Demo)
            </button>
            <button 
              onClick={() => setShowPricing(false)}
              className="w-full py-3 text-neutral-500 hover:text-white text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;