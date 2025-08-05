import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Stethoscope, Video, AlarmClock, BookOpen, Siren, BrainCircuit, ArrowRight, UserCheck, MessageSquare, ClipboardCheck } from 'lucide-react';

// New FeatureCard Component with an enhanced glassmorphism design
const FeatureCard = ({ icon, title, description, link }) => (
    <Link to={link} className="block group">
      <div className="h-full bg-slate-800/40 backdrop-blur-lg rounded-2xl p-8 transition-all duration-300 border border-slate-700/60 hover:border-purple-500/80 hover:bg-slate-800/60 hover:shadow-2xl hover:shadow-purple-500/10">
        <div className="mb-6 bg-gradient-to-br from-slate-700 to-slate-800 w-16 h-16 rounded-xl flex items-center justify-center border border-slate-600 shadow-lg">
          {icon}
        </div>
        <h3 className="text-white text-2xl font-bold mb-3">{title}</h3>
        <p className="text-slate-400 text-base leading-relaxed mb-6 h-24">{description}</p>
        <div className="flex items-center text-purple-400 font-semibold">
          Get Started
          <ArrowRight size={18} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>
      </div>
    </Link>
  );

// New StepCard for the "How It Works" section
const StepCard = ({ icon, title, description }) => (
    <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60">
        <div className="flex items-center space-x-4">
            <div className="bg-slate-900 w-12 h-12 rounded-lg flex items-center justify-center border border-slate-700">
                {icon}
            </div>
            <div>
                <h3 className="text-white font-bold text-lg">{title}</h3>
                <p className="text-slate-400 text-sm">{description}</p>
            </div>
        </div>
    </div>
);


// Redesigned Home Component with a new look and feel
const Home = () => {
  const features = [
    {
      icon: <Stethoscope size={28} className="text-purple-400" />,
      title: 'Symptom Checker',
      description: 'Analyze your symptoms with our AI-powered tool to understand potential health issues.',
      link: '/symptom-checker',
    },
    {
      icon: <Video size={28} className="text-purple-400" />,
      title: 'Teleconsultation',
      description: 'Connect with certified doctors and specialists from the comfort of your home.',
      link: '/teleconsultation',
    },
    {
      icon: <AlarmClock size={28} className="text-purple-400" />,
      title: 'Medicine Reminder',
      description: 'Never miss a dose again. Set up personalized reminders for your medications.',
      link: '/medicine-reminder',
    },
    {
      icon: <BookOpen size={28} className="text-purple-400" />,
      title: 'Educational Hub',
      description: 'Access a rich library of articles and resources to learn more about your health.',
      link: '/educational-hub',
    },
    {
      icon: <Siren size={28} className="text-purple-400" />,
      title: 'Emergency SOS',
      description: 'Instantly alert your emergency contacts and share your location in critical situations.',
      link: '/emergency-sos',
    },
    {
      icon: <BrainCircuit size={28} className="text-purple-400" />,
      title: 'Bloom AI',
      description: 'Engage with our advanced AI for personalized health insights and support.',
      link: '/bloom',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans overflow-x-hidden">
      {/* Animated background using pseudo-elements */}
      <style>{`
        body {
            background-color: #0f172a; /* bg-slate-900 */
        }
        .animated-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
        }
        .animated-background::before, .animated-background::after {
            content: '';
            position: absolute;
            width: 800px;
            height: 800px;
            border-radius: 50%;
            filter: blur(150px);
            opacity: 0.2;
            pointer-events: none;
        }
        .animated-background::before {
            background: radial-gradient(circle, rgba(139,92,246,1) 0%, rgba(139,92,246,0) 70%);
            top: -20%;
            left: -20%;
            animation: move-glow1 15s infinite alternate;
        }
        .animated-background::after {
            background: radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(59,130,246,0) 70%);
            bottom: -20%;
            right: -20%;
            animation: move-glow2 18s infinite alternate;
        }
        @keyframes move-glow1 {
            from { transform: translate(0, 0) scale(1); }
            to { transform: translate(100px, 50px) scale(1.2); }
        }
        @keyframes move-glow2 {
            from { transform: translate(0, 0) scale(1); }
            to { transform: translate(-100px, -50px) scale(0.8); }
        }
      `}</style>
      <div className="animated-background"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="text-center pt-24 pb-20 md:pt-40 md:pb-28 px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
            Your Health, Reimagined.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10">
            Bloom is your all-in-one intelligent health assistant. We empower you to take control of your well-being with cutting-edge tools and personalized support.
          </p>
          <a href="#features" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 transform hover:scale-105">
            Explore Features
          </a>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">A Complete Health Ecosystem</h2>
              <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
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
        
        {/* How It Works Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Simple Steps to Better Health</h2>
                    <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                        Getting started with Bloom is quick and easy.
                    </p>
                </div>
                <div className="space-y-6">
                    <StepCard icon={<UserCheck className="text-indigo-400" />} title="1. Create Your Profile" description="Tell us a bit about yourself and your health goals for a personalized experience." />
                    <StepCard icon={<MessageSquare className="text-indigo-400" />} title="2. Interact with AI" description="Use our tools like the Symptom Checker or chat with Bloom AI for insights." />
                    <StepCard icon={<ClipboardCheck className="text-indigo-400" />} title="3. Get Professional Advice" description="Connect with doctors for teleconsultation and manage your health effectively." />
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900/50 border-t border-slate-800 mt-20">
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-center text-slate-500">
            <p>&copy; {new Date().getFullYear()} Bloom. All rights reserved.</p>
            <p className="mt-2 text-sm">Your trusted partner in digital healthcare.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Mock Page Component for demonstration purposes in the preview.
const MockPage = ({ title }) => (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-4">
        <h1 className="text-4xl font-bold text-center mb-4">This is the {title} page.</h1>
        <p className="text-slate-400 text-center mb-8">In your application, the actual component for this page would be rendered here.</p>
        <Link to="/" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/40 transform hover:scale-105">
            Back to Home
        </Link>
    </div>
);

// Main App component to wrap the Home component with a Router.
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
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
