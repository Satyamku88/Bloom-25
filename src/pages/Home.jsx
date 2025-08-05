import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Stethoscope, Video, AlarmClock, BookOpen, Siren, BrainCircuit, ArrowRight } from 'lucide-react';

// FeatureCard Component: A reusable card for each feature on the home page.
const FeatureCard = ({ icon, title, description, link, color }) => (
    <Link to={link} className="block group">
      {/* The card uses relative and absolute positioning for a subtle background color effect on hover */}
      <div className="relative h-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 border border-white/10">
        {/* Gradient overlay that appears on hover */}
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
        <div className="relative z-10">
          {/* Icon container */}
          <div className="bg-gray-900/70 rounded-lg w-16 h-16 flex items-center justify-center mb-6 border border-white/10 shadow-lg">
            {icon}
          </div>
          {/* Card content */}
          <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-400 text-base mb-4 h-20">{description}</p>
          <div className="flex items-center text-teal-400 font-semibold">
            Learn More
            <ArrowRight size={16} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );

// Redesigned Home Component
const Home = () => {
  // Array of features to be displayed on the home page.
  const features = [
    {
      icon: <Stethoscope size={32} className="text-teal-400" />,
      title: 'Symptom Checker',
      description: 'Analyze your symptoms with our AI-powered tool to understand potential health issues.',
      link: '/symptom-checker',
      color: 'from-blue-500 to-blue-700',
    },
    {
      icon: <Video size={32} className="text-teal-400" />,
      title: 'Teleconsultation',
      description: 'Connect with certified doctors and specialists from the comfort of your home.',
      link: '/teleconsultation',
      color: 'from-green-500 to-green-700',
    },
    {
      icon: <AlarmClock size={32} className="text-teal-400" />,
      title: 'Medicine Reminder',
      description: 'Never miss a dose again. Set up personalized reminders for your medications.',
      link: '/medicine-reminder',
      color: 'from-yellow-500 to-yellow-700',
    },
    {
      icon: <BookOpen size={32} className="text-teal-400" />,
      title: 'Educational Hub',
      description: 'Access a rich library of articles and resources to learn more about your health.',
      link: '/educational-hub',
      color: 'from-purple-500 to-purple-700',
    },
    {
      icon: <Siren size={32} className="text-teal-400" />,
      title: 'Emergency SOS',
      description: 'Instantly alert your emergency contacts and share your location in critical situations.',
      link: '/emergency-sos',
      color: 'from-red-500 to-red-700',
    },
    {
      icon: <BrainCircuit size={32} className="text-teal-400" />,
      title: 'Bloom AI',
      description: 'Engage with our advanced AI for personalized health insights and support.',
      link: '/bloom',
      color: 'from-pink-500 to-pink-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
       {/* A style tag is used here to define a subtle background grid pattern. */}
      <style>{`
        body {
            background-color: #111827; /* bg-gray-900 */
        }
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 2rem 2rem;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative text-center py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/30 via-gray-900 to-gray-900 z-0"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-300">
            Your Health, Reimagined.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Bloom is your all-in-one intelligent health assistant. We empower you to take control of your well-being with cutting-edge tools and personalized support.
          </p>
          <a href="#features" className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/40 transform hover:scale-105">
            Explore Features
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">A Complete Health Ecosystem</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              From proactive monitoring to expert consultations, everything you need is right here.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Bloom. All rights reserved.</p>
          <p className="mt-2 text-sm">Your trusted partner in digital healthcare.</p>
        </div>
      </footer>
    </div>
  );
};

// Mock Page Component for demonstration purposes in the preview.
const MockPage = ({ title }) => (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
        <h1 className="text-4xl font-bold text-center mb-4">This is the {title} page.</h1>
        <p className="text-gray-400 text-center mb-8">In your application, the actual component for this page would be rendered here.</p>
        <Link to="/" className="bg-teal-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/40 transform hover:scale-105">
            Back to Home
        </Link>
    </div>
);

// Main App component to wrap the Home component with a Router.
// This makes the artifact self-contained and runnable.
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* Adding mock routes for the links to work in the preview */}
                <Route path="/symptom-checker" element={<MockPage title="Symptom Checker" />} />
                <Route path="/teleconsultation" element={<MockPage title="Teleconsultation" />} />
                <Route path="/medicine-reminder" element={<MockPage title="Medicine Reminder" />} />
                <Route path="/educational-hub" element={<MockPage title="Educational Hub" />} />
                <Route path="/emergency-sos" element={<MockPage title="Emergency SOS" />} />
                <Route path="/bloom" element={<MockPage title="Bloom AI" />} />
            </Routes>
        </Router>
    );
}

export default App;
