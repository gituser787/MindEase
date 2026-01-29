
import React, { useState } from 'react';

interface AuthPageProps {
  onLogin: (name: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(name || (isLogin ? 'Sarah' : 'User'));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6F2EE] px-4 py-12 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-white rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#8FB9A8] rounded-full blur-[120px] opacity-20"></div>
      </div>

      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/40 overflow-hidden relative z-10">
        {/* Left Visuals */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-[#8FB9A8] to-[#C9DAD6] p-12 text-white relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 text-center space-y-6">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-md">
                <i className="fa-solid fa-leaf text-4xl"></i>
            </div>
            <h2 className="text-4xl font-serif font-bold">You Are Safe Here</h2>
            <p className="text-white/80 leading-relaxed max-w-xs mx-auto italic">
              "Healing is not linear, but every step forward is a victory."
            </p>
            <div className="pt-8">
                <div className="w-32 h-32 border-4 border-white/20 rounded-full flex items-center justify-center animate-breathe mx-auto">
                    <div className="w-20 h-20 bg-white/40 rounded-full"></div>
                </div>
                <p className="text-xs mt-4 uppercase tracking-widest opacity-60">Just Breathe</p>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-serif font-bold text-[#2F4F4F]">
              {isLogin ? 'Welcome Back' : 'Join Our Haven'}
            </h1>
            <p className="text-[#2F4F4F]/60 text-sm">
              {isLogin ? 'We missed you. Ready to find some calm?' : 'Take the first step towards a more peaceful you.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2F4F4F]/50 ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe" 
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-[#2F4F4F]/10 focus:border-[#8FB9A8] focus:ring-4 focus:ring-[#8FB9A8]/10 transition-all outline-none" 
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2F4F4F]/50 ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="hello@mindease.com" 
                className="w-full px-5 py-4 rounded-2xl bg-white border border-[#2F4F4F]/10 focus:border-[#8FB9A8] focus:ring-4 focus:ring-[#8FB9A8]/10 transition-all outline-none" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2F4F4F]/50">Password</label>
                {isLogin && <button type="button" className="text-xs text-[#8FB9A8] hover:underline">Forgot?</button>}
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-5 py-4 rounded-2xl bg-white border border-[#2F4F4F]/10 focus:border-[#8FB9A8] focus:ring-4 focus:ring-[#8FB9A8]/10 transition-all outline-none" 
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-[#2F4F4F] text-white rounded-2xl font-bold shadow-lg shadow-[#2F4F4F]/20 hover:-translate-y-1 transition-all active:scale-95"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2F4F4F]/10"></div>
              </div>
              <span className="relative px-4 bg-white text-xs text-[#2F4F4F]/40 uppercase tracking-widest font-bold">Or continue with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 border border-[#2F4F4F]/10 rounded-2xl hover:bg-gray-50 transition-colors">
                <i className="fa-brands fa-google text-red-500"></i>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 py-3 border border-[#2F4F4F]/10 rounded-2xl hover:bg-gray-50 transition-colors">
                <i className="fa-brands fa-facebook text-blue-600"></i>
                <span className="text-sm font-medium">Facebook</span>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-[#2F4F4F]/60">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#8FB9A8] font-bold hover:underline"
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
