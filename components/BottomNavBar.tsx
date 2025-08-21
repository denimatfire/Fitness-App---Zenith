
import React from 'react';
import { AppScreen } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { DumbbellIcon } from './icons/DumbbellIcon';
import { AppleIcon } from './icons/AppleIcon';
import { ChartIcon } from './icons/ChartIcon';
import { UsersIcon } from './icons/UsersIcon';

interface BottomNavBarProps {
  activeScreen: AppScreen;
  setActiveScreen: (screen: AppScreen) => void;
}

const NavItem: React.FC<{
  screen: AppScreen;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ screen, label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-1/5 transition-colors duration-200 ${
      isActive ? 'text-primary-500' : 'text-gray-400 hover:text-primary-400'
    }`}
    aria-label={`Go to ${label} screen`}
    aria-current={isActive ? 'page' : undefined}
  >
    {icon}
    <span className="text-xs mt-1 font-medium">{label}</span>
  </button>
);

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeScreen, setActiveScreen }) => {
  const navItems = [
    { screen: AppScreen.Home, label: 'Home', icon: <HomeIcon className="w-6 h-6" /> },
    { screen: AppScreen.Workouts, label: 'Workouts', icon: <DumbbellIcon className="w-6 h-6" /> },
    { screen: AppScreen.Nutrition, label: 'Nutrition', icon: <AppleIcon className="w-6 h-6" /> },
    { screen: AppScreen.Progress, label: 'Progress', icon: <ChartIcon className="w-6 h-6" /> },
    { screen: AppScreen.Community, label: 'Community', icon: <UsersIcon className="w-6 h-6" /> },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-20 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 flex justify-around items-start pt-2 z-20">
      {navItems.map((item) => (
        <NavItem
          key={item.screen}
          screen={item.screen}
          label={item.label}
          icon={item.icon}
          isActive={activeScreen === item.screen}
          onClick={() => setActiveScreen(item.screen)}
        />
      ))}
    </nav>
  );
};

export default BottomNavBar;
