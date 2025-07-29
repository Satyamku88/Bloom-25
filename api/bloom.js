// This file uses the modern 'import'/'export' syntax to match your project's configuration.

import { GoogleGenerativeAI } from "@google/generative-ai";

// This is the main function Vercel will run.
export default async function handler(req, res) {
  
  // First, check if the API key is available.
  // This is the most common point of failure.
  if (!process.env.GEMINI_API_KEY) {
    console.error("FATAL: GEMINI_API_KEY is not set in Vercel environment variables.");
    return res.status(500).json({ 
      error: "The server is not configured correctly. API key is missing." 
    });
  }

  // Initialize the AI with the API key from environment variables.
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  // We only want to handle POST requests.
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'A "message" is required in the request body.' });
    }

    // Get the generative model with your specific instructions.
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: "You are Bloom, a compassionate pregnancy support assistant. Provide empathetic, medically accurate information about prenatal care, nutrition, and pregnancy-related concerns. Always maintain a supportive and reassuring tone. Speak responses naturally and conversationally."
    });

    const chat = model.startChat();
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // Send the successful response back to the frontend.
    return res.status(200).json({ text });

  } catch (error) {
    // This will catch any errors from the Google AI API call itself.
    console.error("Error calling Google Generative AI:", error);
    return res.status(500).json({ error: "An error occurred while communicating with the AI service." });
  }
}
