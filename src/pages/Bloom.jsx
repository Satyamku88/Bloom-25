import React, { useState, useEffect, useRef } from "react";
import "./Bloom.css";

const Bloom = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesRef = useRef(null);
  const recognition = useRef(null);
  const synthesis = useRef(null);

  // --- ALL GOOGLE AI INITIALIZATION CODE HAS BEEN REMOVED FROM HERE ---

  const speakMessage = (text) => {
    if (synthesis.current) {
      synthesis.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      synthesis.current.speak(utterance);
    }
  };

  useEffect(() => {
    // Initialize speech recognition if supported
    if ("webkitSpeechRecognition" in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        // Automatically send the message after voice input
        handleSendMessage(transcript);
      };

      recognition.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
    }

    // Initialize speech synthesis if supported
    if ("speechSynthesis" in window) {
      synthesis.current = window.speechSynthesis;
    }

    return () => {
      if (recognition.current) {
        recognition.current.abort();
      }
    };
  }, []);

  // --- THIS IS THE NEW, CORRECTED FUNCTION ---
  const handleSendMessage = async (message = userInput) => {
    const cleanMessage = message.trim();
    if (!cleanMessage) return;

    setMessages((prev) => [
      ...prev,
      { text: cleanMessage, sender: "user", timestamp: new Date().toLocaleTimeString() },
    ]);
    setUserInput("");
    setIsTyping(true);

    try {
      // Call your own backend function at /api/bloom
      const apiResponse = await fetch('/api/bloom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: cleanMessage }),
      });

      if (!apiResponse.ok) {
        // This will catch errors like 404 or 500 from the server
        throw new Error(`Network response was not ok, status: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      const responseText = data.text;

      setMessages((prev) => [
        ...prev,
        { text: responseText, sender: "bot", timestamp: new Date().toLocaleTimeString() },
      ]);
      speakMessage(responseText);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm having trouble connecting right now. Please try again later.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString()
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleVoiceInput = () => {
    if (!recognition.current) {
      // Use a custom modal or a simple message instead of alert
      console.log("Speech recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognition.current.stop();
    } else {
      recognition.current.start();
    }
    setIsListening(!isListening);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="bloom-container">
      <div className="bloom-header">
        <h1>Bloom: AI Pregnancy Assistant</h1>
        <p>Providing pregnancy guidance and support for rural women.</p>
      </div>

      <div className="chat-container">
        <div className="chat-header">
          <h1>Bloom - Your Pregnancy Companion 🌸</h1>
        </div>
        <div className="chat-messages" ref={chatMessagesRef}>
          {messages.length === 0 && (
            <div className="welcome-message">
              <h2>How can I assist you today?</h2>
              <p>Ask me about pregnancy, nutrition, or healthcare.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}-message`}>
              <span>{message.text}</span>
              <div className="message-timestamp">{message.timestamp}</div>
            </div>
          ))}
          {isTyping && <div className="typing-indicator">Typing...</div>}
        </div>
        <div className="input-container">
          <input
            type="text"
            className="chat-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type or use voice input..."
          />
          <button className="send-button" onClick={() => handleSendMessage()}>
            Send
          </button>
        </div>
      </div>

      <button className={`voice-button ${isListening ? "listening" : ""}`} onClick={toggleVoiceInput}>
        {isListening ? "🎙️" : "🔊"}
      </button>
    </div>
  );
};

export default Bloom;
