import React, { useState, useEffect } from 'react';
import { Bot, Zap, Users, ArrowRight, X, Terminal, Code, Database } from 'lucide-react';

// Minimal dot pattern component
const DotPattern = () => (
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
      backgroundSize: '30px 30px',
    }} />
  </div>
);

// Typewriter effect component
const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, 100 + delay);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <span className="relative">
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  );
};

interface HomePageProps {
  onBookCall: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onBookCall }) => {
  const [showQuickForm, setShowQuickForm] = useState(false);
  const [quickFormData, setQuickFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleQuickFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quick form submitted:', quickFormData);
    alert('Thank you! We\'ll be in touch soon.');
    setShowQuickForm(false);
    setQuickFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleQuickInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuickFormData({
      ...quickFormData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono overflow-hidden">
      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 lg:p-8 border-b border-gray-800">
        <div className="flex items-center">
          <img 
            src="/pablo.png" 
            alt="Pablo AI" 
            className="w-10 h-10 mr-3 rounded-full"
          />
          <div className="text-xl font-bold tracking-wider">
            <span className="text-white">PABLO.AI</span>
            <span className="text-gray-500 ml-2">[SYSTEMS]</span>
          </div>
        </div>
        <button 
          onClick={onBookCall}
          className="text-sm tracking-wider border border-gray-600 px-6 py-2 hover:bg-white hover:text-black transition-all duration-300 font-medium"
        >
          [ BOOK_CALL ]
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <DotPattern />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="mb-8 animate-fade-in">
              <span className="text-gray-400 text-sm tracking-wider uppercase font-medium">
                {'>'}INITIALIZING AI_AUTOMATION_SUITE...
              </span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold leading-none mb-8 tracking-tight animate-slide-up">
              AUTOMATE
              <br />
              <span className="text-gray-400">
                EVERYTHING
              </span>
              <br />
              <TypewriterText text="AT_SCALE" delay={2000} />
            </h1>

            <div className="mb-12 animate-fade-in" style={{ animationDelay: '1s' }}>
              <p className="text-lg text-gray-300 mb-4 max-w-2xl leading-relaxed font-medium">
                {'>'}Deploy intelligent AI agents for customer interaction
              </p>
              <p className="text-lg text-gray-300 mb-4 max-w-2xl leading-relaxed font-medium">
                {'>'}Automate lead generation and qualification processes  
              </p>
              <p className="text-lg text-gray-300 mb-4 max-w-2xl leading-relaxed font-medium">
                {'>'}Integrate seamlessly with existing CRM systems
              </p>
            </div>

            <button
              onClick={onBookCall}
              className="group relative px-8 py-4 border-2 border-white text-white font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-300 animate-fade-in"
              style={{ animationDelay: '1.5s' }}
            >
              <span className="flex items-center">
                [ INITIALIZE_CONSULTATION ]
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* ASCII Art Style Decoration */}
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-800 text-xs font-mono hidden lg:block">
          <pre className="leading-tight">
{`    ┌─────────────────┐
    │  AI_CORE_v2.1   │
    │  ┌───┐ ┌───┐    │
    │  │ █ │ │ █ │    │
    │  └───┘ └───┘    │
    │  ┌─────────┐    │
    │  │ ███████ │    │
    │  └─────────┘    │
    │  STATUS: ACTIVE │
    └─────────────────┘`}
          </pre>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative border-t border-gray-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
              {'>'}CORE_MODULES
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl font-medium">
              Advanced AI systems designed for enterprise-level automation and optimization.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 border border-gray-800 hover:border-white hover:scale-105 transition-all duration-500 bg-black cursor-pointer transform hover:shadow-2xl">
              <div className="flex items-center mb-6">
                <Terminal className="w-8 h-8 text-white mr-4 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover:-translate-y-1" />
                <span className="text-gray-500 text-sm font-medium">MODULE_01</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">
                AI_CHAT_AGENTS
              </h3>
              <div className="space-y-2 text-gray-300 font-medium">
                <p>{'>'}Natural language processing</p>
                <p>{'>'}Context-aware responses</p>
                <p>{'>'}24/7 availability</p>
                <p>{'>'}Multi-platform deployment</p>
              </div>
              <div className="mt-6 text-white font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                [ DEPLOY_MODULE ] {'→'}
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 border border-gray-800 hover:border-white hover:scale-105 transition-all duration-500 bg-black cursor-pointer transform hover:shadow-2xl">
              <div className="flex items-center mb-6">
                <Code className="w-8 h-8 text-white mr-4 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover:-translate-y-1" />
                <span className="text-gray-500 text-sm font-medium">MODULE_02</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">
                LEAD_GENERATION
              </h3>
              <div className="space-y-2 text-gray-300 font-medium">
                <p>{'>'}Automated prospect identification</p>
                <p>{'>'}Intelligent qualification scoring</p>
                <p>{'>'}Behavioral pattern analysis</p>
                <p>{'>'}Conversion optimization</p>
              </div>
              <div className="mt-6 text-white font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                [ DEPLOY_MODULE ] {'→'}
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 border border-gray-800 hover:border-white hover:scale-105 transition-all duration-500 bg-black cursor-pointer transform hover:shadow-2xl">
              <div className="flex items-center mb-6">
                <Database className="w-8 h-8 text-white mr-4 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover:-translate-y-1" />
                <span className="text-gray-500 text-sm font-medium">MODULE_03</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">
                CRM_INTEGRATION
              </h3>
              <div className="space-y-2 text-gray-300 font-medium">
                <p>{'>'}Seamless data synchronization</p>
                <p>{'>'}Real-time pipeline updates</p>
                <p>{'>'}Custom workflow automation</p>
                <p>{'>'}Advanced analytics dashboard</p>
              </div>
              <div className="mt-6 text-white font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                [ DEPLOY_MODULE ] {'→'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative border-t border-gray-800">
        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
            {'>'}READY_TO_DEPLOY?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium">
            Schedule a system consultation to analyze your automation requirements and deployment strategy.
          </p>
          <button
            onClick={onBookCall}
            className="group relative px-12 py-6 bg-white text-black font-bold text-lg tracking-wider hover:bg-gray-200 transition-all duration-300"
          >
            <span className="flex items-center">
              [ SCHEDULE_CONSULTATION ]
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-medium">
            <div className="mb-4 md:mb-0">
              PABLO.AI [C] 2025. ALL_RIGHTS_RESERVED. AI_AUTOMATION_SPECIALISTS.
            </div>
            <div>
              POWERED_BY_NEXT_GEN_AI_TECHNOLOGY
            </div>
          </div>
        </div>
      </footer>

      {/* Quick Booking Form Modal (Legacy) */}
      {showQuickForm && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-black border-2 border-white p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold tracking-tight">
                {'>'}CONSULTATION_REQUEST
              </h3>
              <button
                onClick={() => setShowQuickForm(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleQuickFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 tracking-wider">
                  {'>'}FULL_NAME *
                </label>
                <input
                  type="text"
                  name="name"
                  value={quickFormData.name}
                  onChange={handleQuickInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-600 text-white focus:border-white outline-none transition-colors font-mono"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 tracking-wider">
                  {'>'}EMAIL_ADDRESS *
                </label>
                <input
                  type="email"
                  name="email"
                  value={quickFormData.email}
                  onChange={handleQuickInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-600 text-white focus:border-white outline-none transition-colors font-mono"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 tracking-wider">
                  {'>'}COMPANY_NAME
                </label>
                <input
                  type="text"
                  name="company"
                  value={quickFormData.company}
                  onChange={handleQuickInputChange}
                  className="w-full px-4 py-3 bg-black border border-gray-600 text-white focus:border-white outline-none transition-colors font-mono"
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 tracking-wider">
                  {'>'}AUTOMATION_REQUIREMENTS
                </label>
                <textarea
                  name="message"
                  value={quickFormData.message}
                  onChange={handleQuickInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-black border border-gray-600 text-white focus:border-white outline-none transition-colors resize-none font-mono"
                  placeholder="Describe your automation needs..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white text-black font-bold tracking-wider hover:bg-gray-200 transition-all duration-300"
              >
                [ SUBMIT_REQUEST ]
              </button>

              <div className="text-xs text-gray-500 text-center font-medium">
                {'>'}Response within 24 hours. Consultation scheduling will follow.
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;