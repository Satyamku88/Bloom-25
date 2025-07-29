import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// Import icons (using simple text placeholders for now, can be replaced with SVGs)
const FeatureIcon = ({ children }) => <div className="feature-icon">{children}</div>;

const Home = () => {
  const features = [
    {
      icon: "🌸",
      title: "Bloom AI Assistant",
      description: "Get instant, compassionate answers to your pregnancy questions.",
      link: "/bloom",
      color: "pink"
    },
    {
      icon: "🩺",
      title: "Symptom Checker",
      description: "Understand your symptoms with our intelligent checker.",
      link: "/symptom-checker",
      color: "blue"
    },
    {
      icon: "📅",
      title: "Medicine Reminder",
      description: "Never miss a dose with personalized reminders.",
      link: "/medicine-reminder",
      color: "green"
    },
    {
      icon: "📚",
      title: "Health Education Hub",
      description: "Access articles, guides, and videos on maternal health.",
      link: "/educational-hub",
      color: "purple"
    },
    {
      icon: "🆘",
      title: "Emergency SOS",
      description: "Quick access to emergency contacts and location sharing.",
      link: "/emergency-sos",
      color: "red"
    },
    {
      icon: "💬",
      title: "Teleconsultation",
      description: "Connect with healthcare professionals from your home.",
      link: "/teleconsultation",
      color: "yellow"
    },
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1 className="main-title">Welcome to Bloom</h1>
          <p className="subtitle">Your Trusted Partner in Maternal Healthcare.</p>
          <p className="description">
            Empowering rural women with accessible, reliable, and compassionate
            health support throughout their pregnancy journey.
          </p>
          <Link to="/bloom" className="cta-button">
            Chat with Bloom AI
          </Link>
        </div>
      </header>

      <main className="features-section">
        <h2 className="section-title">Our Features</h2>
        <div className="features-grid">
          {features.map((feature) => (
            <Link to={feature.link} key={feature.title} className={`feature-card ${feature.color}`}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <span className="card-link">Learn More &rarr;</span>
            </Link>
          ))}
        </div>
      </main>

      <footer className="home-footer">
        <p>&copy; 2025 Bloom Healthcare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
