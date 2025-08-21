
import React, { useState } from 'react';
import { Workout } from '../types';

const mockWorkouts: Workout[] = [
  { id: 'w1', title: 'Morning Yoga Flow', category: 'Yoga', duration: 20, difficulty: 'Beginner', imageUrl: 'https://picsum.photos/seed/yoga/400/300', exercises: [] },
  { id: 'w2', title: 'Full Body HIIT', category: 'HIIT', duration: 30, difficulty: 'Intermediate', imageUrl: 'https://picsum.photos/seed/hiit/400/300', exercises: [] },
  { id: 'w3', title: 'Apartment Friendly', category: 'Home', duration: 25, difficulty: 'Beginner', imageUrl: 'https://picsum.photos/seed/home/400/300', exercises: [] },
  { id: 'w4', title: 'Strength Training', category: 'Gym', duration: 60, difficulty: 'Advanced', imageUrl: 'https://picsum.photos/seed/gym/400/300', exercises: [] },
  { id: 'w5', title: 'Evening Stretch', category: 'Yoga', duration: 15, difficulty: 'Beginner', imageUrl: 'https://picsum.photos/seed/stretch/400/300', exercises: [] },
  { id: 'w6', title: 'Abs & Core Blast', category: 'Home', duration: 15, difficulty: 'Intermediate', imageUrl: 'https://picsum.photos/seed/abs/400/300', exercises: [] },
];

type Category = 'All' | 'Home' | 'Gym' | 'Yoga' | 'HIIT';
const categories: Category[] = ['All', 'Home', 'Gym', 'Yoga', 'HIIT'];

const WorkoutsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const filteredWorkouts = selectedCategory === 'All'
    ? mockWorkouts
    : mockWorkouts.filter(w => w.category === selectedCategory);

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Workouts</h1>
        <p className="text-gray-500 dark:text-gray-400">Find a plan that's right for you.</p>
      </header>

      <div className="flex space-x-2 overflow-x-auto pb-2 -mx-6 px-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredWorkouts.map(workout => (
          <div key={workout.id} className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl">
            <img src={workout.imageUrl} alt={workout.title} className="w-24 h-24 rounded-lg object-cover" />
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{workout.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{workout.duration} Mins | {workout.difficulty}</p>
            </div>
            <button className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-full text-primary-600 dark:text-primary-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutsScreen;
