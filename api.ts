
import { MoodEntry, User } from './types';

const STORAGE_KEYS = {
  MOODS: 'mindease_moods',
  USER: 'mindease_user'
};

// Helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async fetchMoods(): Promise<MoodEntry[]> {
    await delay(500);
    const data = localStorage.getItem(STORAGE_KEYS.MOODS);
    return data ? JSON.parse(data) : [];
  },

  async createMood(entry: Omit<MoodEntry, '_id' | 'id'>): Promise<MoodEntry> {
    await delay(300);
    const moods = await this.fetchMoods();
    const newEntry: MoodEntry = {
      ...entry,
      _id: Math.random().toString(36).substr(2, 9),
      id: Math.random().toString(36).substr(2, 9)
    };
    const updatedMoods = [newEntry, ...moods];
    localStorage.setItem(STORAGE_KEYS.MOODS, JSON.stringify(updatedMoods));
    return newEntry;
  },

  async login(name: string, email: string): Promise<User> {
    await delay(800);
    const existingUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (existingUser) {
      const user = JSON.parse(existingUser);
      if (user.email === email) return user;
    }
    
    const newUser: User = {
      name,
      email,
      bio: "Finding peace one day at a time.",
      avatar: ""
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    return newUser;
  },

  async updateUser(user: User): Promise<User> {
    await delay(600);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  }
};
