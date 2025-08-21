import React from 'react';
import { SunIcon } from '../components/icons/SunIcon';
import { MoonIcon } from '../components/icons/MoonIcon';
import { LogoutIcon } from '../components/icons/LogoutIcon';
import { FireIcon } from '../components/icons/FireIcon';
import { StepsIcon } from '../components/icons/StepsIcon';
import { HeartIcon } from '../components/icons/HeartIcon';
import { BedIcon } from '../components/icons/BedIcon';

interface HomeScreenProps {
  toggleTheme: () => void;
  currentTheme: 'light' | 'dark';
  handleLogout: () => void;
}

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string; color: string; }> = ({ icon, value, label, color }) => (
  <div className="flex flex-col items-center text-center">
    <div className={`p-3 rounded-full mb-2 ${color}`}>
      {icon}
    </div>
    <p className="font-bold text-lg text-gray-900 dark:text-white">{value}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
  </div>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ toggleTheme, currentTheme, handleLogout }) => {
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Welcome Back,</p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dhruba</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
            {currentTheme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </button>
          <button onClick={handleLogout} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
            <LogoutIcon className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-4">Synced from Apple Health / Samsung Health</p>
        <div className="grid grid-cols-4 gap-4">
          <StatCard icon={<FireIcon className="w-5 h-5 text-red-500"/>} value="320" label="Calories" color="bg-red-100 dark:bg-red-900/50" />
          <StatCard icon={<StepsIcon className="w-5 h-5 text-green-500"/>} value="5,820" label="Steps" color="bg-green-100 dark:bg-green-900/50" />
          <StatCard icon={<HeartIcon className="w-5 h-5 text-pink-500"/>} value="72" label="BPM" color="bg-pink-100 dark:bg-pink-900/50" />
          <StatCard icon={<BedIcon className="w-5 h-5 text-indigo-500"/>} value="7h 15m" label="Sleep" color="bg-indigo-100 dark:bg-indigo-900/50" />
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-3">Featured Workout</h2>
        <div className="relative rounded-2xl overflow-hidden group">
          <img src="https://picsum.photos/seed/workout1/600/400" alt="Full Body HIIT" className="w-full h-48 object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
            <h3 className="text-white text-lg font-bold">Full Body HIIT</h3>
            <p className="text-white text-sm">30 Mins | Intermediate</p>
          </div>
          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm text-white px-6 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            Start Workout
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Today's Nutrition</h2>
        <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-between">
            <div>
                <p className="text-gray-500 dark:text-gray-400">Calories Consumed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,250 <span className="text-base font-normal text-gray-500 dark:text-gray-400">/ 2,200 kcal</span></p>
            </div>
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 grid place-items-center">
                {/* A simple circular progress would go here. For now, a placeholder */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-gray-200 dark:text-gray-700" strokeWidth="8" stroke="currentColor" fill="transparent" r="32" cx="40" cy="40" />
                    <circle className="text-primary-500" strokeWidth="8" strokeDasharray={2 * Math.PI * 32} strokeDashoffset={(2 * Math.PI * 32) * (1 - 1250 / 2200)} strokeLinecap="round" stroke="currentColor" fill="transparent" r="32" cx="40" cy="40" />
                </svg>
                <span className="absolute text-sm font-semibold">{Math.round((1250/2200)*100)}%</span>
            </div>
        </div>
      </div>

    </div>
  );
};

export default HomeScreen;