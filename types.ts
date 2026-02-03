
export type Page = 'landing' | 'auth' | 'dashboard' | 'history' | 'chat' | 'toolkit' | 'profile';

export interface User {
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface LifestyleStats {
  sleepHours: number;
  waterOunces: number;
  mindfulMinutes: number;
  steps: number;
}

export interface MoodEntry {
  _id?: string;
  id?: string;
  date: string;
  mood: string;
  note: string;
  icon?: string;
  tags: string[];
  lifestyle?: LifestyleStats;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export const MoodColorMap: Record<string, string> = {
  Vibrant: '#D4A017', // Solstice Gold
  Calm: '#6A9382',    // Deep Sage
  Heavy: '#14211E',    // Evergreen Charcoal
  Frayed: '#C97272',   // Muted Rose
  Steady: '#8B9D98',   // Mist Gray
  default: '#6A9382'
};

export const TagIconMap: Record<string, string> = {
  '#Work': 'fa-briefcase',
  '#Sleep': 'fa-moon',
  '#Social': 'fa-users',
  '#Health': 'fa-heart-pulse',
  '#Family': 'fa-house-chimney-user'
};
