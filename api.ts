
import { MoodEntry, User } from './types';

const API_BASE = '/api';

export const api = {
  async fetchMoods(): Promise<MoodEntry[]> {
    const res = await fetch(`${API_BASE}/moods`);
    if (!res.ok) throw new Error('Failed to fetch moods');
    return res.json();
  },

  async createMood(entry: Omit<MoodEntry, '_id' | 'id'>): Promise<MoodEntry> {
    const res = await fetch(`${API_BASE}/moods`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    if (!res.ok) throw new Error('Failed to create mood');
    return res.json();
  },

  async login(name: string, email: string): Promise<User> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  async updateUser(user: User): Promise<User> {
    const res = await fetch(`${API_BASE}/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  }
};
