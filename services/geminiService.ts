import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const improveDescription = async (currentText: string): Promise<string> => {
  if (!currentText || currentText.trim().length === 0) {
    return "";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an assistant for a professional illustrator. 
      Rewrite the following short project description into a more professional and artistic project title suitable for an invoice or payment reference. 
      Keep it concise (under 15 words) but descriptive. 
      Language: Russian.
      
      Input: "${currentText}"`,
    });

    return response.text?.trim() || currentText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return currentText; // Fallback to original text on error
  }
};