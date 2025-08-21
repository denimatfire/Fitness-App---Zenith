
import React, { useState, useEffect, useCallback } from 'react';
import { AppScreen } from './types';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import WorkoutsScreen from './screens/WorkoutsScreen';
import NutritionScreen from './screens/NutritionScreen';
import ProgressScreen from './screens/ProgressScreen';
import CommunityScreen from './screens/CommunityScreen';
import BottomNavBar from './components/BottomNavBar';
import Chatbot from './components/Chatbot';
import { ChatIcon } from './components/icons/ChatIcon';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeScreen, setActiveScreen] = useState<AppScreen>(AppScreen.Home);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
    setActiveScreen(AppScreen.Home);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const renderScreen = () => {
    switch (activeScreen) {
      case AppScreen.Home:
        return <HomeScreen toggleTheme={toggleTheme} currentTheme={theme} handleLogout={handleLogout} />;
      case AppScreen.Workouts:
        return <WorkoutsScreen />;
      case AppScreen.Nutrition:
        return <NutritionScreen />;
      case AppScreen.Progress:
        return <ProgressScreen />;
      case AppScreen.Community:
        return <CommunityScreen />;
      default:
        return <HomeScreen toggleTheme={toggleTheme} currentTheme={theme} handleLogout={handleLogout} />;
    }
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 h-screen w-screen flex items-center justify-center">
      <div className="relative w-full h-full sm:w-[390px] sm:h-[844px] sm:rounded-3xl sm:shadow-2xl sm:overflow-hidden bg-white dark:bg-black flex flex-col">
        <main className="flex-1 overflow-y-auto pb-20">
          {renderScreen()}
        </main>
        
        {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
        
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="absolute bottom-24 right-4 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg z-30 transition-transform transform hover:scale-110"
          aria-label="Open AI Wellness Coach"
        >
          <ChatIcon className="w-6 h-6" />
        </button>

        <BottomNavBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      </div>
    </div>
  );
};

export default App;
