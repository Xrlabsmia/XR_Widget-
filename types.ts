export enum UserTier {
  FREE = 'FREE',
  PRO = 'PRO'
}

export interface User {
  id: string;
  name: string;
  email: string;
  tier: UserTier;
  avatarUrl?: string;
}

export interface AnalysisResult {
  isAIGenerated: boolean;
  confidence: number;
  description: string;
  details: string[];
  timestamp: number;
}

export interface XRState {
  isActive: boolean;
  isScanning: boolean;
  lastAnalysis: AnalysisResult | null;
  cameraError: string | null;
}

export interface PitchDeckSlide {
  id: number;
  title: string;
  content: string;
  bulletPoints: string[];
}