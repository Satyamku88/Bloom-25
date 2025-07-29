

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction:"You are Bloom, a compassionate pregnancy support assistant. Provide empathetic, medically accurate information about prenatal care, nutrition, and pregnancy-related concerns. Always maintain a supportive and reassuring tone. Speak responses naturally and conversationally."
     });
    const chat = model.startChat();
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ text });
  } catch (error) {
    console.error("Error in serverless function:", error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
}