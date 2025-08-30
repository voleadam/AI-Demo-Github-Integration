import React, { useState } from 'react';
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