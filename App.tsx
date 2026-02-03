
import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import MoodHistory from './pages/MoodHistory';
import AIChat from './pages/AIChat';
import Toolkit from './pages/Toolkit';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import { Page, MoodEntry, User } from './types';
import { api } from './api';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('mindease_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    const checkSession = async () => {
      const savedUser = localStorage.getItem('mindease_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setLoading(true);
        const data = await api.fetchMoods();
        setMoods(data);
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('mindease_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const navigate = (page: Page, mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setCurrentPage(page);
  };

  const handleLogin = async (name: string) => {
    try {
      setLoading(true);
      const email = `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
      const userData = await api.login(name, email);
      setUser(userData);
      const userMoods = await api.fetchMoods();
      setMoods(userMoods);
      setCurrentPage('dashboard');
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const data = await api.updateUser(updatedUser);
      setUser(data);
    } catch (err) {
      console.error("Update user error:", err);
    }
  };

  const addMood = async (entry: Omit<MoodEntry, '_id' | 'id'>) => {
    try {
      const newEntry = await api.createMood(entry);
      setMoods(prev => [newEntry, ...prev]);
    } catch (err) {
      console.error("Add mood error:", err);
    }
  };

  const launchSOS = () => {
    setCurrentPage('toolkit');
    window.dispatchEvent(new CustomEvent('launchGrounding'));
  };

  return (
    <div className="min-h-screen transition-colors duration-500 bg-[var(--bg-main)] text-[var(--text-primary)]">
      {currentPage !== 'landing' && currentPage !== 'auth' && (
        <>
          <Navbar 
              currentPage={currentPage} 
              navigate={navigate} 
              user={user || { name: 'Guest', email: 'guest@mindease.com' }} 
          />
          
          {/* Theme Toggle - Unique Position (Bottom Left) */}
          <button 
            onClick={toggleTheme}
            className="fixed bottom-6 left-6 z-[60] w-14 h-14 glass text-[var(--text-primary)] rounded-full shadow-2xl flex items-center justify-center border border-[var(--divider)] hover:scale-110 active:scale-95 transition-all group"
            title={theme === 'light' ? 'Enter Nightfall' : 'Awaken the Dawn'}
          >
            <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun text-yellow-400'} text-xl transition-transform duration-500 group-hover:rotate-[30deg]`}></i>
          </button>

          {/* SOS Button */}
          <button 
            onClick={launchSOS}
            className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-[var(--sos-bg)] text-white rounded-full shadow-2xl flex items-center justify-center font-bold text-sm hover:bg-[var(--sos-hover)] hover:scale-110 active:scale-95 transition-all group"
          >
            <span className="group-hover:hidden">SOS</span>
            <i className="fa-solid fa-hand-holding-heart hidden group-hover:block text-xl"></i>
          </button>
        </>
      )}
      
      <main>
        {loading && currentPage !== 'landing' && (
           <div className="fixed inset-0 bg-[var(--bg-main)]/60 backdrop-blur-sm z-[100] flex items-center justify-center">
             <div className="flex flex-col items-center gap-4">
               <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
               <p className="font-serif italic text-[var(--text-primary)]">Updating your sanctuary...</p>
             </div>
           </div>
        )}

        {currentPage === 'landing' && (
          <LandingPage 
            onStart={() => navigate('auth', 'signup')} 
            onLogin={() => navigate('auth', 'login')} 
          />
        )}
        {currentPage === 'auth' && (
          <AuthPage onLogin={handleLogin} initialIsSignUp={authMode === 'signup'} />
        )}
        {currentPage === 'dashboard' && <Dashboard userName={user?.name || 'Friend'} addMood={addMood} navigate={navigate} />}
        {currentPage === 'history' && <MoodHistory moods={moods} />}
        {currentPage === 'chat' && <AIChat />}
        {currentPage === 'toolkit' && <Toolkit />}
        {currentPage === 'profile' && user && (
          <ProfilePage user={user} onUpdate={handleUpdateUser} />
        )}
      </main>
    </div>
  );
};

export default App;
