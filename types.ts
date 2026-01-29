
export type Page = 'landing' | 'auth' | 'dashboard' | 'history' | 'chat' | 'toolkit' | 'profile';

export interface User {
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface MoodEntry {
  _id?: string; // MongoDB ID
  id?: string;  // Legacy/Frontend ID
  date: string; // Full ISO string
  mood: string;
  note: string;
  icon?: string;
  tags: string[]; // Context tags like #Work, #Social
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export const MoodColorMap: Record<string, string> = {
  Happy: '#7BC8A4',
  Sad: '#8FB9A8',
  Stressed: '#FDBA74',
  Tired: '#93C5FD',
  Neutral: '#CBD5E1',
  default: '#8FB9A8'
};

export const TagIconMap: Record<string, string> = {
  '#Work': 'fa-briefcase',
  '#Sleep': 'fa-moon',
  '#Social': 'fa-users',
  '#Health': 'fa-heart-pulse',
  '#Family': 'fa-house-chimney-user'
};
