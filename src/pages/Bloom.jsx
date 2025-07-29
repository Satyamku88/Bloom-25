import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Bloom.css";

// New component to parse and render Markdown-style text
const ParsedMessage = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g); // Split by **bolded** text

  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </span>
  );
};


const Bloom = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesRef = useRef(null);
  const recognition = useRef(null);
  const synthesis = useRef(null);

  // Scroll to the latest message
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const speakMessage = (text) => {
    // Strip markdown for speech synthesis
    const plainText = text.replace(/\*\*/g, '');
    if (synthesis.current && "speechSynthesis" in window) {
      synthesis.current.cancel();
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.rate = 1;
      utterance.pitch = 1;
      synthesis.current.speak(utterance);
    }
  };

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        handleSendMessage(transcript);
      };
      recognition.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
       recognition.current.onend = () => {
        setIsListening(false);
      };
    }
    if ("speechSynthesis" in window) {
      synthesis.current = window.speechSynthesis;
    }
  }, []);

  const handleSendMessage = async (message = userInput) => {
    const cleanMessage = message.trim();
    if (!cleanMessage) return;

    setMessages((prev) => [
      ...prev,
      { text: cleanMessage, sender: "user", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
    setUserInput("");
    setIsTyping(true);

    try {
      const apiResponse = await fetch('/api/bloom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: cleanMessage }),
      });

      if (!apiResponse.ok) throw new Error(`Network response was not ok, status: ${apiResponse.status}`);
      
      const data = await apiResponse.json();
      const responseText = data.text;

      setMessages((prev) => [
        ...prev,
        { text: responseText, sender: "bot", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
      speakMessage(responseText);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm having trouble connecting right now. Please try again later.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleVoiceInput = () => {
    if (!recognition.current) return;
    if (isListening) {
      recognition.current.stop();
    } else {
      recognition.current.start();
    }
    setIsListening(!isListening);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };
  
  const starterPrompts = [
    "What are common first-trimester symptoms?",
    "Can you suggest a healthy diet plan?",
    "What exercises are safe during pregnancy?",
    "Tell me about postnatal care."
  ];

  return (
    <div className="bloom-page-container">
      <div className="chat-window">
        <div className="chat-header">
           <Link to="/" className="back-button">← Home</Link>
           <div className="header-info">
              <h2>Bloom AI Assistant</h2>
              <p>Your compassionate pregnancy companion</p>
           </div>
           <div className="header-icon">🌸</div>
        </div>
        
        <div className="chat-messages" ref={chatMessagesRef}>
          {messages.length === 0 && !isTyping && (
            <div className="welcome-container">
              <div className="welcome-icon">🌸</div>
              <h1>How can I help you today?</h1>
              <p>Ask me anything about your pregnancy journey.</p>
              <div className="starter-prompts">
                {starterPrompts.map((prompt, index) => (
                    <button key={index} onClick={() => handleSendMessage(prompt)} className="prompt-button">
                        {prompt}
                    </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index} className={`message-wrapper ${message.sender}`}>
              <div className="message-bubble">
                {/* Use the ParsedMessage component for bot messages */}
                {message.sender === 'bot' ? <ParsedMessage text={message.text} /> : message.text}
                <div className="message-timestamp">{message.timestamp}</div>
              </div>
            </div>
          ))}

          {isTyping && (
             <div className="message-wrapper bot">
                <div className="message-bubble typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
          )}
        </div>
        
        <div className="input-area">
          <input
            type="text"
            className="chat-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Bloom a question..."
          />
          <button className={`mic-button ${isListening ? "listening" : ""}`} onClick={toggleVoiceInput}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
          </button>
          <button className="send-button" onClick={() => handleSendMessage()}>
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bloom;
