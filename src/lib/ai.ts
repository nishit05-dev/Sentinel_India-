import { GoogleGenerativeAI } from "@google/generative-ai";
import { Groq } from "groq-sdk";

// Initialize Gemini
export const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
export const geminiFlashModel = gemini.getGenerativeModel({ model: "gemini-1.5-flash-latest" }, { apiVersion: "v1" });

// Debug function
if (process.env.NODE_ENV === 'development') {
  (async () => {
    try {
      // Test the model immediately
      await geminiFlashModel.generateContent("test");
      console.log("Gemini Connection: SUCCESS");
    } catch (e) {
      console.error("Gemini Connection: FAILED", e);
    }
  })();
}

// Initialize Groq
export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'mock_key_for_build',
});

// Primary AI Model (Prefer Groq for reliability)
export const aiChat = async (prompt: string) => {
  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your_groq_api_key') {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
    });
    return chatCompletion.choices[0].message.content;
  }
  
  // Fallback to Gemini
  const result = await geminiFlashModel.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
