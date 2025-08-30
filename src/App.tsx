import React, { useState } from 'react';
import { Database, ExternalLink } from 'lucide-react';
import HomePage from './components/HomePage';
import ConsultationForm from './components/ConsultationForm';

type AppView = 'home' | 'consultation';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');

  const handleBookCall = () => {
    setCurrentView('consultation');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  // Check if Supabase environment variables are configured
  const isSupabaseConfigured = !!(
    import.meta.env.VITE_SUPABASE_URL && 
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  // If Supabase is not configured, show setup message
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-6 tracking-tight">
              {'>'}SUPABASE_CONFIGURATION_REQUIRED
            </h1>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed font-medium">
              To enable the consultation form functionality, please configure your Supabase environment variables.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg mb-8 text-left">
            <h3 className="text-lg font-bold mb-4 text-white tracking-wider">
              {'>'}REQUIRED_ENVIRONMENT_VARIABLES:
            </h3>
            <div className="space-y-2 text-sm text-gray-300 font-mono">
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">{'>'}VITE_SUPABASE_URL=</span>
                <span className="text-yellow-400">your-supabase-project-url</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">{'>'}VITE_SUPABASE_ANON_KEY=</span>
                <span className="text-yellow-400">your-supabase-anon-key</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <a
              href="https://supabase.com/docs/guides/getting-started/quickstarts/reactjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-600 text-white hover:bg-white hover:text-black transition-all duration-300 font-bold tracking-wider"
            >
              [ SUPABASE_SETUP_GUIDE ]
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
            
            <div className="text-sm text-gray-500 font-medium">
              {'>'}For development: Add variables to .env.local file
              <br />
              {'>'}For production: Configure in your deployment platform
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentView === 'home' && (
        <HomePage onBookCall={handleBookCall} />
      )}
      {currentView === 'consultation' && (
        <ConsultationForm onBack={handleBackToHome} />
      )}
    </>
  );
}

export default App;