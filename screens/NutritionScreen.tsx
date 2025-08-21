
import React from 'react';
import { Meal } from '../types';
import { BarcodeIcon } from '../components/icons/BarcodeIcon';

const mockMeals: Meal[] = [
  { id: 'm1', name: 'Oatmeal with Berries', type: 'Breakfast', calories: 350, imageUrl: 'https://picsum.photos/seed/oatmeal/200/200', recipe: [] },
  { id: 'm2', name: 'Grilled Chicken Salad', type: 'Lunch', calories: 450, imageUrl: 'https://picsum.photos/seed/salad/200/200', recipe: [] },
  { id: 'm3', name: 'Salmon with Asparagus', type: 'Dinner', calories: 550, imageUrl: 'https://picsum.photos/seed/salmon/200/200', recipe: [] },
  { id: 'm4', name: 'Protein Shake', type: 'Snack', calories: 250, imageUrl: 'https://picsum.photos/seed/shake/200/200', recipe: [] },
];

const MealCard: React.FC<{ meal: Meal }> = ({ meal }) => (
  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-3 flex items-center space-x-4">
    <img src={meal.imageUrl} alt={meal.name} className="w-16 h-16 rounded-lg object-cover" />
    <div>
      <h4 className="font-semibold text-gray-900 dark:text-white">{meal.name}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{meal.calories} kcal</p>
    </div>
  </div>
);

const NutritionScreen: React.FC = () => {
  const totalCalories = mockMeals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nutrition</h1>
        <p className="text-gray-500 dark:text-gray-400">Track your daily intake.</p>
      </header>
      
      <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="flex justify-between items-baseline">
          <p>Calories Eaten</p>
          <p>Goal: 2,200</p>
        </div>
        <p className="text-4xl font-bold my-2">{totalCalories}</p>
        <div className="w-full bg-primary-400/50 rounded-full h-2.5">
          <div className="bg-white rounded-full h-2.5" style={{ width: `${(totalCalories / 2200) * 100}%` }}></div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button className="flex-1 text-center py-3 bg-primary-600 text-white font-semibold rounded-xl">Log Meal</button>
        <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 dark:bg-gray-800 font-semibold rounded-xl">
          <BarcodeIcon className="w-5 h-5" />
          Scan
        </button>
      </div>

      <div>
        {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map(mealType => (
          <div key={mealType} className="mb-4">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{mealType}</h3>
            <div className="space-y-2">
              {mockMeals.filter(m => m.type === mealType).map(meal => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionScreen;
