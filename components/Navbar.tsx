
import React from 'react';
import { Page, User } from '../types';

interface NavbarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
  user: User;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, navigate, user }) => {
  const navItems: { label: string; value: Page }[] = [
    { label: 'SANCTUARY', value: 'dashboard' },
    { label: 'LANDSCAPE', value: 'history' },
    { label: 'SERENAI', value: 'chat' },
    { label: 'TOOLKIT', value: 'toolkit' },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl">
      <div className="glass px-10 py-4 rounded-full flex justify-between items-center nav-pill">
        {/* Brand */}
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => navigate('landing')}
        >
          <div className="w-10 h-10 bg-[var(--text-primary)] rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb,127,175,155),0.4)]">
            <i className="fa-solid fa-leaf text-[var(--primary)] text-sm"></i>
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[var(--text-primary)]">MindEase</span>
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => navigate(item.value)}
              className={`text-[11px] font-bold tracking-[0.2em] transition-all duration-500 relative py-2 ${
                currentPage === item.value 
                  ? 'text-[var(--text-primary)]' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {item.label}
              {currentPage === item.value && (
                <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--primary)] rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <button 
              onClick={() => navigate('profile')}
              className={`w-12 h-12 rounded-2xl bg-[var(--text-primary)]/5 flex items-center justify-center hover:bg-[var(--text-primary)]/10 transition-all overflow-hidden border border-[var(--text-primary)]/10 ${currentPage === 'profile' ? 'shadow-inner' : ''}`}
          >
            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <i className="fa-solid fa-user-circle text-[var(--text-primary)]/20 text-2xl"></i>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
