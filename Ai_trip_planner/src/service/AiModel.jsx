import { GoogleGenerativeAI } from "@google/generative-ai";
  
 export const apiKey = 'AIzaSyBH4KOXJ7BaHORauWmUHcmZFRB1UofjImQ';

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 export const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
