
import React, { useEffect, useState } from 'react';

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogin }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-[#E6F2EE] via-[#F4FAF8] to-[#FFFFFF]">
        {/* Parallax elements */}
        <div 
          className="absolute top-20 left-10 w-64 h-64 bg-[#C9DAD6]/30 rounded-full blur-3xl animate-breathe"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#8FB9A8]/20 rounded-full blur-3xl animate-breathe"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />

        <div className="z-10 max-w-4xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#2F4F4F] leading-tight opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
              Find Your Calm.<br /><span className="text-[#8FB9A8]">One Day at a Time.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#2F4F4F]/70 max-w-2xl mx-auto opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
              A safe digital space for peace, reflection, and emotional balance. Your journey to mental wellness starts with a single breath.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
            <button 
              onClick={onStart}
              className="px-8 py-4 bg-[#8FB9A8] text-white rounded-full font-semibold shadow-lg shadow-[#8FB9A8]/30 hover:bg-[#7BA696] hover:-translate-y-1 transition-all duration-300"
            >
              Get Started
            </button>
            <button 
              onClick={onLogin}
              className="px-8 py-4 bg-white text-[#2F4F4F] border border-[#2F4F4F]/10 rounded-full font-semibold hover:bg-white/80 hover:-translate-y-1 transition-all duration-300"
            >
              Sign In
            </button>
          </div>

          <div className="pt-12 animate-bounce opacity-40">
            <i className="fa-solid fa-chevron-down text-2xl"></i>
          </div>
        </div>

        {/* Cinematic Illustration Overlay Simulation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="absolute top-1/4 left-1/4 w-full h-full bg-[url('https://picsum.photos/1200/800?grayscale')] bg-cover mix-blend-overlay"></div>
        </div>
      </section>

      {/* Why Mental Peace Matters */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold text-[#2F4F4F]">Why Mental Peace Matters</h2>
            <p className="text-lg text-[#2F4F4F]/80 leading-relaxed">
              In a world that never stops, taking a moment to breathe isn't just a luxury—it's a necessity. 
              Mental peace improves focus, relationships, sleep, and overall health.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#E6F2EE] rounded-full flex items-center justify-center flex-shrink-0 text-[#8FB9A8]">
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <h4 className="font-bold text-[#2F4F4F]">Emotional Resilience</h4>
                  <p className="text-[#2F4F4F]/60">Build the strength to navigate life's ups and downs with grace.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#E6F2EE] rounded-full flex items-center justify-center flex-shrink-0 text-[#8FB9A8]">
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <h4 className="font-bold text-[#2F4F4F]">Clarity of Mind</h4>
                  <p className="text-[#2F4F4F]/60">Reduce the mental clutter and find focus in your daily tasks.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/nature/800/600" 
              alt="Peaceful nature" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2F4F4F]/40 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-24 px-6 bg-[#E6F2EE]/50">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-serif font-bold">Everything You Need to Bloom</h2>
            <p className="text-[#2F4F4F]/60 max-w-xl mx-auto">Thoughtfully designed tools to support your emotional well-being every single day.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Mood Tracking', desc: 'Log your emotions with notes and context.', icon: 'fa-face-smile' },
              { title: 'SerenAI Companion', desc: 'Empathetic, non-judgmental support 24/7.', icon: 'fa-heart' },
              { title: 'Wellness Exercises', desc: 'Breathing tools and mindfulness guides.', icon: 'fa-wind' },
              { title: 'Privacy First', desc: 'End-to-end encryption for your personal space.', icon: 'fa-shield-halved' },
              { title: 'Progress Insights', desc: 'Visualize your emotional journey over time.', icon: 'fa-chart-pie' },
              { title: 'Safe Haven', desc: 'A community of hope and mutual understanding.', icon: 'fa-house-chimney' },
            ].map((f, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl shadow-sm border border-transparent hover:border-[#8FB9A8]/20 hover:shadow-xl transition-all duration-500 group">
                <div className="w-12 h-12 bg-[#E6F2EE] rounded-2xl flex items-center justify-center text-[#8FB9A8] mb-6 group-hover:bg-[#8FB9A8] group-hover:text-white transition-colors duration-500">
                  <i className={`fa-solid ${f.icon} text-xl`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-[#2F4F4F]/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-[#2F4F4F] rounded-[3rem] py-16 px-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8FB9A8]/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">You are not alone.</h2>
            <p className="text-white/70 max-w-lg mx-auto">Take the first step towards a calmer, more mindful version of yourself today.</p>
            <button 
              onClick={onStart}
              className="px-10 py-4 bg-white text-[#2F4F4F] rounded-full font-bold hover:bg-[#8FB9A8] hover:text-white transition-all duration-300"
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 text-center text-sm text-[#2F4F4F]/40 border-t border-[#2F4F4F]/5">
        &copy; 2024 MindEase. Built with love for your peace of mind.
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
