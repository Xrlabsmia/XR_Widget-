import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface CameraFeedProps {
  active: boolean;
  onError: (error: string) => void;
}

export interface CameraHandle {
  captureFrame: () => string | null;
}

const CameraFeed = forwardRef<CameraHandle, CameraFeedProps>(({ active, onError }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useImperativeHandle(ref, () => ({
    captureFrame: () => {
      if (!videoRef.current) return null;
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        return canvas.toDataURL('image/jpeg', 0.8);
      }
      return null;
    }
  }));

  useEffect(() => {
    const startCamera = async () => {
      if (!active) {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        });
        
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        onError("Camera access denied. Please enable permissions.");
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [active, onError]);

  return (
    <div className="absolute inset-0 w-full h-full bg-black">
      {/* Background placeholder noise/grid if camera is off */}
      {!active && (
        <div className="w-full h-full flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
          <p className="text-xr-cyan font-display tracking-widest text-sm animate-pulse">SYSTEM STANDBY</p>
        </div>
      )}
      
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover transform scale-x-[-1] transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Sci-fi Overlay Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)]" />
      <div className="absolute inset-0 pointer-events-none border-[1px] border-xr-cyan/20 rounded-full" />
    </div>
  );
});

CameraFeed.displayName = 'CameraFeed';

export default CameraFeed;