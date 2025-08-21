
export enum AppScreen {
  Home = 'Home',
  Workouts = 'Workouts',
  Nutrition = 'Nutrition',
  Progress = 'Progress',
  Community = 'Community',
}

export interface Workout {
  id: string;
  title: string;
  category: 'Home' | 'Gym' | 'Yoga' | 'HIIT';
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  imageUrl: string;
  exercises: { name: string; reps: string; videoUrl: string }[];
}

export interface Meal {
  id: string;
  name: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  calories: number;
  imageUrl: string;
  recipe: string[];
}
