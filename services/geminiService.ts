
import { GoogleGenAI } from "@google/genai";

// Always initialize GoogleGenAI with the apiKey from process.env.API_KEY directly.
export const generateGovernancePetition = async (topic: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a formal civic petition for the TEOS Sovereign Governance system on the following topic: ${topic}. 
    Include a clear title, a preamble about public benefit, three specific policy points, and a concluding call to action. 
    Maintain an institutional, professional, and respectful tone suitable for government level civic infrastructure.`,
    config: {
      temperature: 0.7,
      topK: 40,
      topP: 0.9
    }
  });
  return response.text;
};

// Always initialize GoogleGenAI with the apiKey from process.env.API_KEY directly.
export const auditCompliance = async (transactionJson: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `You are the Elmahrosa Compliance Auditor. Review the following transaction for alignment with institutional sovereignty and public safety:
    ${transactionJson}
    Identify potential risks or policy violations (simulated for demonstration). Provide a clear 'Allow' or 'Review Required' verdict.`,
    config: {
      temperature: 0.2
    }
  });
  return response.text;
};

// Always initialize GoogleGenAI with the apiKey from process.env.API_KEY directly.
export const translateCivicText = async (text: string, sourceLang: string, targetLang: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Translate the following civic/institutional text from ${sourceLang} to ${targetLang}. 
    Ensure terminology is precise for legal, government, and sovereign contexts. 
    Maintain the formal, official, and authoritative tone of Elmahrosa institutional communications.
    
    Source Text: "${text}"`,
  });
  return response.text;
};
