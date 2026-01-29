
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
  const [user, setUser] = useState<User | null>(null);
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(false);

  // Synchronize data on mount
  useEffect(() => {
    if (user) {
      loadMoods();
    }
  }, [user]);

  const loadMoods = async () => {
    try {
      setLoading(true);
      const data = await api.fetchMoods();
      setMoods(data);
    } catch (err) {
      console.error("Failed to load moods:", err);
    } finally {
      setLoading(false);
    }
  };

  const navigate = (page: Page) => setCurrentPage(page);

  const handleLogin = async (name: string) => {
    try {
      setLoading(true);
      const email = `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
      const userData = await api.login(name, email);
      setUser(userData);
      setCurrentPage('dashboard');
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong with the connection.");
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
      const newEntry = await api.createMood({
        ...entry,
        userEmail: user?.email // Backend uses this to associate
      } as any);
      setMoods(prev => [newEntry, ...prev]);
    } catch (err) {
      console.error("Add mood error:", err);
      alert("Couldn't save your mood to the cloud.");
    }
  };

  const launchSOS = () => {
    setCurrentPage('toolkit');
    window.dispatchEvent(new CustomEvent('launchGrounding'));
  };

  return (
    <div className="min-h-screen transition-colors duration-500">
      {currentPage !== 'landing' && currentPage !== 'auth' && (
        <>
          <Navbar 
              currentPage={currentPage} 
              navigate={navigate} 
              user={user || { name: 'Sarah', email: 'sarah@example.com' }} 
          />
          <button 
            onClick={launchSOS}
            className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-red-500 text-white rounded-full shadow-2xl flex items-center justify-center font-bold text-sm hover:bg-red-600 hover:scale-110 active:scale-95 transition-all group"
          >
            <span className="group-hover:hidden">SOS</span>
            <i className="fa-solid fa-hand-holding-heart hidden group-hover:block text-xl"></i>
          </button>
        </>
      )}
      
      <main>
        {loading && currentPage !== 'landing' && (
           <div className="fixed inset-0 bg-[#E6F2EE]/50 backdrop-blur-sm z-[100] flex items-center justify-center">
             <div className="flex flex-col items-center gap-4">
               <div className="w-12 h-12 border-4 border-[#8FB9A8] border-t-transparent rounded-full animate-spin"></div>
               <p className="font-serif italic text-[#2F4F4F]">Syncing with your haven...</p>
             </div>
           </div>
        )}

        {currentPage === 'landing' && <LandingPage onStart={() => navigate('auth')} onLogin={() => navigate('auth')} />}
        {currentPage === 'auth' && <AuthPage onLogin={handleLogin} />}
        {currentPage === 'dashboard' && <Dashboard userName={user?.name || 'Sarah'} addMood={addMood} navigate={navigate} />}
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
