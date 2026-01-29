
import React from 'react';
import { Page, User } from '../types';

interface NavbarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
  user: User;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, navigate, user }) => {
  const navItems: { label: string; value: Page; icon: string }[] = [
    { label: 'Home', value: 'dashboard', icon: 'fa-house' },
    { label: 'Mood History', value: 'history', icon: 'fa-chart-line' },
    { label: 'AI Support', value: 'chat', icon: 'fa-comment-dots' },
    { label: 'Toolkit', value: 'toolkit', icon: 'fa-toolbox' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center glass border-b border-white/20 backdrop-blur-md">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => navigate('landing')}
      >
        <div className="w-8 h-8 bg-[#8FB9A8] rounded-full flex items-center justify-center animate-pulse">
          <i className="fa-solid fa-leaf text-white text-sm"></i>
        </div>
        <span className="font-serif text-xl font-bold tracking-tight text-[#2F4F4F]">MindEase</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => navigate(item.value)}
            className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
              currentPage === item.value 
                ? 'text-[#4DA6A6] scale-105' 
                : 'text-[#2F4F4F]/70 hover:text-[#2F4F4F]'
            }`}
          >
            <i className={`fa-solid ${item.icon}`}></i>
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden sm:inline text-xs font-semibold text-[#2F4F4F]/60 bg-white/40 px-3 py-1 rounded-full border border-white/30">
          Hello, {user.name}
        </span>
        <button 
            onClick={() => navigate('profile')}
            className={`w-10 h-10 rounded-full bg-white/50 border flex items-center justify-center hover:bg-white transition-all overflow-hidden ${currentPage === 'profile' ? 'border-[#8FB9A8] ring-2 ring-[#8FB9A8]/20' : 'border-white/50'}`}
        >
          {user.avatar ? (
            <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <i className="fa-solid fa-user text-[#2F4F4F]"></i>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
