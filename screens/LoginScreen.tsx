
import React, { useState } from 'react';
import { DumbbellIcon } from '../components/icons/DumbbellIcon';
import { GoogleIcon } from '../components/icons/GoogleIcon';
import { AppleIcon as AppleAuthIcon } from '../components/icons/AppleIcon';


interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = () => {
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 font-sans">
        <div className="relative w-full h-full sm:w-[390px] sm:h-[844px] sm:rounded-3xl sm:shadow-2xl sm:overflow-hidden bg-white dark:bg-black flex flex-col justify-between p-8 text-center">
            <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center bg-primary-600 p-4 rounded-full mb-4">
                    <DumbbellIcon className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">ZenithFit</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Reach your peak performance.</p>
            </div>
            
            <div className="flex-grow flex items-center justify-center">
                <img src="https://picsum.photos/seed/fitness/400/400" alt="Fitness illustration" className="rounded-2xl" />
            </div>
            
            <div className="flex-shrink-0 space-y-4">
                <button
                    onClick={handleLoginClick}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-gray-800 dark:bg-gray-200 text-white dark:text-black py-3 px-4 rounded-xl font-semibold transition hover:opacity-90 disabled:opacity-50"
                >
                    <AppleAuthIcon className="w-6 h-6" />
                    Continue with Apple
                </button>
                <button
                    onClick={handleLoginClick}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-xl font-semibold border border-gray-300 dark:border-gray-600 transition hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                    <GoogleIcon className="w-5 h-5" />
                    Continue with Google
                </button>
                <button
                    onClick={handleLoginClick}
                    disabled={isLoading}
                    className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl font-semibold transition hover:bg-primary-700 disabled:opacity-50"
                >
                    {isLoading ? 'Signing In...' : 'Continue with Email'}
                </button>
            </div>
        </div>
    </div>
  );
};

export default LoginScreen;
