
import React, { useState, useEffect } from 'react';

interface AuthPageProps {
  onLogin: (name: string) => void;
  initialIsSignUp?: boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, initialIsSignUp = true }) => {
  // defaulting to signup as 'Begin Journey' implies creating a new path
  const [isLogin, setIsLogin] = useState(!initialIsSignUp);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(name || (isLogin ? 'Sarah' : 'User'));
  };

  const handleGoogleLogin = () => {
    onLogin('Sarah');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)] px-4 py-12 relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[var(--bg-surface)] rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[var(--primary)] rounded-full blur-[120px] opacity-10"></div>
      </div>

      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-[var(--bg-surface)]/60 backdrop-blur-xl rounded-[4rem] shadow-2xl border border-[var(--divider)] overflow-hidden relative z-10 transition-colors duration-500">
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-[#1F2E2B] to-[#0F1B18] p-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
          <div className="relative z-10 text-center space-y-10">
            <div className="w-28 h-28 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 backdrop-blur-md border border-white/10 shadow-2xl">
                <i className="fa-solid fa-leaf text-6xl text-[var(--primary)]"></i>
            </div>
            <div className="space-y-6">
              <h2 className="text-6xl font-serif font-bold leading-tight tracking-tight">You Are <br/> Safe Here</h2>
              <p className="text-white/40 leading-relaxed max-w-xs mx-auto italic font-light text-lg">
                "Every great journey begins with a single moment of stillness."
              </p>
            </div>
            <div className="pt-16">
                <div className="w-48 h-48 border-4 border-white/5 rounded-full flex items-center justify-center animate-breathing mx-auto">
                    <div className="w-32 h-32 bg-[var(--primary)]/10 rounded-full blur-xl"></div>
                </div>
                <p className="text-[10px] mt-8 uppercase tracking-[0.8em] text-white/20 font-bold">Deep Breath</p>
            </div>
          </div>
        </div>

        <div className="p-12 md:p-20 flex flex-col justify-center bg-[var(--bg-card)] transition-colors duration-500">
          <div className="mb-12 space-y-4">
            <h1 className="text-5xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
              {isLogin ? 'Welcome Back' : 'Join Our Haven'}
            </h1>
            <p className="text-[var(--text-secondary)] text-lg font-light opacity-60">
              {isLogin ? 'Continue your journey to stillness.' : 'Start your path to a more peaceful you.'}
            </p>
          </div>

          <div className="space-y-6">
            <button 
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-5 py-5 rounded-[2rem] bg-[var(--bg-surface)] border border-[var(--divider)] text-[var(--text-primary)] font-bold text-sm hover:bg-[var(--bg-card-hover)] hover:scale-[1.02] active:scale-95 transition-all shadow-sm"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-6 px-4">
              <div className="flex-1 h-px bg-[var(--divider)] opacity-50"></div>
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[var(--text-muted)]">or</span>
              <div className="flex-1 h-px bg-[var(--divider)] opacity-50"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 mt-10">
            {!isLogin && (
              <div className="space-y-3">
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] ml-4">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe" 
                  className="w-full px-8 py-5 rounded-[2rem] bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:ring-8 focus:ring-[var(--primary)]/5 transition-all outline-none placeholder:text-[var(--text-muted)] text-lg" 
                />
              </div>
            )}
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] ml-4">Email Address</label>
              <input 
                type="email" 
                placeholder="hello@mindease.com" 
                className="w-full px-8 py-5 rounded-[2rem] bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:ring-8 focus:ring-[var(--primary)]/5 transition-all outline-none placeholder:text-[var(--text-muted)] text-lg" 
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center px-4">
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Password</label>
                {isLogin && <button type="button" className="text-[10px] text-[var(--primary)] hover:underline font-bold uppercase tracking-widest">Forgot?</button>}
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-8 py-5 rounded-[2rem] bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:ring-8 focus:ring-[var(--primary)]/5 transition-all outline-none placeholder:text-[var(--text-muted)] text-lg" 
              />
            </div>

            <button 
              type="submit"
              className="w-full py-6 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-[2rem] font-bold shadow-2xl shadow-[var(--primary)]/20 hover:bg-[var(--primary)] hover:scale-[1.02] hover:-translate-y-1 transition-all active:scale-95 text-xl mt-6"
            >
              {isLogin ? 'Sign In' : 'Begin My Journey'}
            </button>
          </form>

          <div className="mt-12 text-center text-base text-[var(--text-secondary)] opacity-80">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[var(--primary)] font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
