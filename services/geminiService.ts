import { GoogleGenAI, SchemaType, Type } from "@google/genai";
import { AnalysisResult } from "../types";

// Initialize Gemini Client
// We use Gemini 2.5 Flash for high-speed, low-latency visual analysis needed for an "XR HUD" feel.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeFrame = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    // Remove data URL prefix if present
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: `Analyze this image frame from an XR HUD. 
            1. Determine if the visual content looks like it contains AI-generated anomalies or deepfake artifacts.
            2. Provide a short description of the person or scene.
            3. List key visual details.
            
            Return JSON.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isAIGenerated: { type: Type.BOOLEAN, description: "Whether the image appears AI generated or manipulated" },
            confidence: { type: Type.NUMBER, description: "Confidence score 0-100" },
            description: { type: Type.STRING, description: "Short visual description" },
            details: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of 3 key visual attributes detected"
            }
          },
          required: ["isAIGenerated", "confidence", "description", "details"]
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return {
        ...data,
        timestamp: Date.now()
      };
    }
    
    throw new Error("No data returned from AI");

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    // Fallback mock response if API fails or key is missing
    return {
      isAIGenerated: false,
      confidence: 0,
      description: "Analysis unavailable (API Error)",
      details: ["Connection failed", "Check API Key", "Retry scan"],
      timestamp: Date.now()
    };
  }
};