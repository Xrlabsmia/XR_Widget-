import React, { useState, useRef } from 'react';
import CameraFeed, { CameraHandle } from './CameraFeed';
import { UserTier, AnalysisResult } from '../types';
import { analyzeFrame } from '../services/geminiService';

interface HUDProps {
  isOpen: boolean;
  onClose: () => void;
  userTier: UserTier;
  onUpgrade: () => void;
}

export const HUD: React.FC<HUDProps> = ({ isOpen, onClose, userTier, onUpgrade }) => {
  const cameraRef = useRef<CameraHandle>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (userTier === UserTier.FREE) {
      onUpgrade();
      return;
    }

    if (!cameraRef.current) return;
    
    setIsScanning(true);
    setResult(null);
    setError(null);

    // Simulate scanning delay for UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    const frame = cameraRef.current.captureFrame();
    if (frame) {
      try {
        const analysis = await analyzeFrame(frame);
        setResult(analysis);
      } catch (e) {
        setError("Analysis failed. Try again.");
      }
    } else {
      setError("Could not capture video frame.");
    }
    setIsScanning(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px]">
        
        {/* Outer Rings */}
        <div className="absolute inset-[-20px] rounded-full border border-xr-cyan/20 animate-spin-slow"></div>
        <div className="absolute inset-[-10px] rounded-full border border-dashed border-xr-cyan/30 animate-[spin_20s_linear_infinite_reverse]"></div>
        
        {/* Main Circular Container */}
        <div className="w-full h-full rounded-full border-4 border-xr-cyan bg-black overflow-hidden relative shadow-[0_0_50px_rgba(0,243,255,0.3)]">
          
          <CameraFeed 
            ref={cameraRef} 
            active={isOpen} 
            onError={(msg) => setError(msg)} 
          />

          {/* Scanner Overlay */}
          {isScanning && (
            <div className="absolute inset-0 bg-xr-cyan/10 animate-pulse z-10 flex flex-col items-center justify-center">
              <div className="w-full h-1 bg-xr-cyan shadow-[0_0_10px_#00f3ff] animate-scan absolute top-0"></div>
              <p className="font-display text-xr-cyan text-xl tracking-widest bg-black/50 px-4 py-1">ANALYZING...</p>
            </div>
          )}

          {/* Result Overlay */}
          {result && !isScanning && (
             <div className="absolute bottom-12 left-0 right-0 p-4 flex flex-col items-center bg-gradient-to-t from-black/90 to-transparent">
                <div className={`px-4 py-1 rounded-full text-xs font-bold mb-2 border ${result.isAIGenerated ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}`}>
                  {result.isAIGenerated ? '⚠️ AI GENERATED' : '✓ AUTHENTIC'} ({result.confidence}%)
                </div>
                <p className="text-white text-center text-sm mb-2">{result.description}</p>
                <div className="flex gap-2 justify-center">
                  {result.details.map((d, i) => (
                    <span key={i} className="text-[10px] text-xr-cyan bg-xr-cyan/10 px-2 py-0.5 rounded border border-xr-cyan/20">
                      {d}
                    </span>
                  ))}
                </div>
             </div>
          )}

          {/* Locked Overlay for Free Tier */}
          {userTier === UserTier.FREE && (
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center z-20 pointer-events-none">
                <div className="inline-block bg-black/80 border border-xr-pink p-4 backdrop-blur-md rounded-lg">
                  <p className="text-xr-pink font-bold font-display mb-1">PRO FEATURE LOCKED</p>
                  <p className="text-xs text-gray-300">Upgrade to unlock AI Detection</p>
                </div>
             </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="absolute top-20 left-0 right-0 text-center">
              <span className="bg-red-500/90 text-white text-xs px-3 py-1 rounded">{error}</span>
            </div>
          )}
        </div>

        {/* HUD Controls (Outside Circle) */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button 
            onClick={handleScan}
            className={`
              font-display text-sm tracking-widest px-8 py-3 rounded-full border-2 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]
              ${userTier === UserTier.FREE 
                ? 'border-xr-pink text-xr-pink hover:bg-xr-pink hover:text-black' 
                : 'border-xr-cyan text-xr-cyan hover:bg-xr-cyan hover:text-black'
              }
            `}
          >
            {userTier === UserTier.FREE ? 'UNLOCK AI SCAN' : isScanning ? 'SCANNING...' : 'SCAN TARGET'}
          </button>
          
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full border border-neutral-600 text-neutral-400 flex items-center justify-center hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};