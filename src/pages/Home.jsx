import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// A simple component for the feature icons
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
      icon: "�",
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
          <h1 className="main-title">Welcome to Bloom-Ai</h1>
          <p className="subtitle">Smart, Safe, and Supportive Healthcare for Everyone</p>
          <p className="description">
            Welcome to our all-in-one healthcare platform, designed to support your well-being anytime, anywhere. Whether you're checking symptoms, seeking pregnancy or period-related help, chatting with our AI for quick guidance, consulting certified doctors, or exploring trusted medical books — we’re here for you. Your health, your support system — in one place.
          </p>
          {/* The main CTA button has been removed from here */}
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
              <span className="card-link">Explore Feature &rarr;</span>
            </Link>
          ))}
        </div>
      </main>

      {/* New "Get in Touch" section */}
      <section className="get-in-touch-section">
        <div className="touch-content">
          <h2>Have Questions?</h2>
          <p>Our team is here to help. Reach out to us for any inquiries or support, and we'll get back to you as soon as possible.</p>
          <a href="mailto:satyamku88@gmail.com" className="touch-button">Contact Us</a>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 Bloom Healthcare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
�