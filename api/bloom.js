// In the file /api/bloom.js

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Use the NEW environment variable name (without VITE_)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async (req, res) => {
  // Check if the API key was loaded. If not, the function will fail.
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set in environment variables.");
    return res.status(500).json({ error: "Server configuration error: API key not found." });
  }

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
      systemInstruction: "You are Bloom, a compassionate pregnancy support assistant. Provide empathetic, medically accurate information about prenatal care, nutrition, and pregnancy-related concerns. Always maintain a supportive and reassuring tone. Speak responses naturally and conversationally."
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
};