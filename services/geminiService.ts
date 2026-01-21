
import { GoogleGenAI, Type } from "@google/genai";
import { SymptomAnalysis } from "../types";

// Always use process.env.API_KEY directly for initialization as per @google/genai guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeSymptoms = async (symptoms: string): Promise<SymptomAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following symptoms and provide a summary. 
      Symptoms: "${symptoms}"
      
      Requirements:
      1. Provide a professional assessment.
      2. List practical recommendations.
      3. List urgent cautions or "red flags" when to seek immediate medical attention.
      4. Include a standard medical disclaimer.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            assessment: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            cautions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            disclaimer: { type: Type.STRING }
          },
          required: ["assessment", "recommendations", "cautions", "disclaimer"]
        }
      }
    });

    // Access the text content directly using the .text property
    const result = JSON.parse(response.text || '{}');
    return result as SymptomAnalysis;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze symptoms. Please try again later.");
  }
};