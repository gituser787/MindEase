
import React, { useEffect, useState } from 'react';

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogin }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-[#14211E] selection:bg-[#7FAF9B]/20 overflow-x-hidden">
      {/* Cinematic Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-8 md:px-16 md:py-12 flex items-center justify-between pointer-events-none">
        <div 
          className="flex items-center gap-3 pointer-events-auto cursor-pointer group" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <div className="w-12 h-12 bg-[#14211E] rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:rotate-[15deg] group-hover:shadow-[0_0_30px_rgba(127,175,155,0.3)]">
            <i className="fa-solid fa-leaf text-[#7FAF9B] text-xl"></i>
          </div>
          <span className="font-serif text-3xl font-bold tracking-tighter text-[#14211E] drop-shadow-sm">MindEase</span>
        </div>
        
        <div className="pointer-events-auto hidden md:flex items-center gap-8">
          <button 
            onClick={onLogin}
            className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#4A5E59] hover:text-[#14211E] transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={onStart}
            className="bg-[#14211E] text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-xl"
          >
            Begin Journey
          </button>
        </div>
      </nav>

      {/* Hero: The Deep Breath */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=2400')`,
              transform: `scale(1.1) translateY(${scrollY * 0.15}px)`,
              filter: 'brightness(0.95)'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-[#F8FAF9]"></div>
          {/* Grainy Film Texture */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-6xl space-y-10 animate-cinematic">
          <div className="space-y-4">
            <p className="text-[#7FAF9B] text-[12px] uppercase tracking-[0.8em] font-bold opacity-0 animate-[fadeIn_1s_ease_forwards_0.5s]">Your Professional Sanctuary</p>
            <h1 className="font-serif text-7xl md:text-[11rem] font-bold leading-[0.85] tracking-tighter text-[#14211E]">
              Find your <br />
              <span className="italic font-light text-[#7FAF9B]">center</span> again.
            </h1>
          </div>
          
          <p className="text-xl md:text-3xl text-[#4A5E59] max-w-3xl mx-auto leading-relaxed font-light opacity-90 px-4">
            An AI-driven space for emotional resilience, quiet reflection, and transformative growth. Built for the modern mind.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10">
            <button 
              onClick={onStart}
              className="group bg-[#14211E] text-white px-16 py-8 rounded-[2.5rem] font-bold text-2xl shadow-[0_40px_80px_-15px_rgba(20,33,30,0.4)] hover:scale-105 active:scale-95 transition-all duration-700 flex items-center gap-8"
            >
              Start Free Journey
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#7FAF9B] transition-colors">
                <i className="fa-solid fa-arrow-right text-sm"></i>
              </div>
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-30 animate-bounce">
           <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-[#14211E]"></div>
           <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Discover More</span>
        </div>
      </section>

      {/* Value Prop: The Modern Struggle */}
      <section className="py-40 md:py-64 bg-white px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-24">
          <div className="space-y-6 max-w-4xl">
            <h2 className="text-5xl md:text-8xl font-serif font-bold tracking-tighter leading-tight">
              The noise of the world <br /> 
              <span className="italic font-light text-[#7FAF9B]">ends here.</span>
            </h2>
            <p className="text-2xl text-[#8B9D98] font-light leading-relaxed">
              In an era of constant notifications, we provide the silence necessary to hear your own thoughts. MindEase isn't just an app; it's a practice.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 w-full">
            {[
              { title: "Empathetic AI", desc: "Conversations with SerenAI designed to validate, reframe, and support your daily emotions.", icon: "fa-comment-sparkles" },
              { title: "Visual Landscape", desc: "Track your moods through a cinematic timeline that reveals the patterns of your peace.", icon: "fa-chart-area" },
              { title: "Interactive Relief", desc: "Immediate grounding exercises and breathing patterns for moments of acute stress.", icon: "fa-wind" }
            ].map((feature, i) => (
              <div key={i} className="space-y-8 group">
                <div className="w-24 h-24 bg-[#F8FAF9] rounded-[2.5rem] flex items-center justify-center text-[#7FAF9B] mx-auto shadow-sm group-hover:scale-110 group-hover:bg-[#14211E] group-hover:text-white transition-all duration-700">
                  <i className={`fa-solid ${feature.icon} text-3xl`}></i>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-serif font-bold">{feature.title}</h3>
                  <p className="text-lg text-[#4A5E59] font-light leading-relaxed opacity-80">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section: Deep Focus */}
      <section className="py-40 px-8 bg-[#EEF4F1]/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-[20px] border-white relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200" 
                alt="Mindfulness" 
                className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-110" 
              />
            </div>
            {/* Soft Shadow Glow */}
            <div className="absolute -bottom-16 -right-16 bg-white p-12 rounded-[3.5rem] shadow-2xl z-20 max-w-xs border border-gray-50">
               <div className="w-12 h-12 bg-[#7FAF9B] rounded-2xl flex items-center justify-center text-white mb-6">
                 <i className="fa-solid fa-quote-left"></i>
               </div>
               <p className="font-serif italic text-3xl leading-snug">"Healing isn't linear, but it starts with being present."</p>
            </div>
          </div>

          <div className="space-y-12 order-1 lg:order-2 text-center lg:text-left">
            <div className="space-y-6">
               <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-[#7FAF9B]">Built on Science</span>
               <h2 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter leading-tight">
                 Evidence-based <br />
                 <span className="italic font-light text-[#7FAF9B]">compassion.</span>
               </h2>
               <p className="text-2xl text-[#4A5E59] font-light leading-relaxed">
                 We've integrated clinical principles of Cognitive Behavioral Therapy (CBT) and Mindfulness-Based Stress Reduction (MBSR) into a seamless, beautiful digital experience.
               </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
               <div className="flex items-center gap-4 bg-white px-8 py-6 rounded-3xl shadow-sm border border-gray-100">
                  <i className="fa-solid fa-shield-check text-[#7FAF9B] text-xl"></i>
                  <span className="text-sm font-bold uppercase tracking-widest opacity-60">100% Private</span>
               </div>
               <div className="flex items-center gap-4 bg-white px-8 py-6 rounded-3xl shadow-sm border border-gray-100">
                  <i className="fa-solid fa-brain-circuit text-[#7FAF9B] text-xl"></i>
                  <span className="text-sm font-bold uppercase tracking-widest opacity-60">AI Optimized</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Trust */}
      <section className="py-40 bg-white px-8">
        <div className="max-w-5xl mx-auto text-center space-y-24">
          <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter">Trusted by thousands <br /> seeking stillness.</h2>
          <div className="grid md:grid-cols-2 gap-12 text-left">
            {[
              { text: "The interface alone makes me feel calmer. SerenAI has become a part of my morning routine, helping me set intentions with clarity.", author: "Elena R.", role: "Design Director" },
              { text: "I've tried many mood trackers, but MindEase is the first one that feels like a sanctuary rather than a chore.", author: "Marcus T.", role: "Health Professional" }
            ].map((t, i) => (
              <div key={i} className="bg-[#F8FAF9] p-12 rounded-[3.5rem] space-y-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                <p className="text-2xl font-light text-[#4A5E59] leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200/50">
                  <div className="w-12 h-12 bg-[#7FAF9B]/20 rounded-full flex items-center justify-center text-[#7FAF9B] font-bold">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-[#14211E]">{t.author}</p>
                    <p className="text-[10px] uppercase tracking-widest opacity-40">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA: The Call to Peace */}
      <section className="py-60 bg-[#14211E] text-white text-center relative overflow-hidden px-8">
        {/* Abstract Background Detail */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#7FAF9B]/5 rounded-full blur-[180px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto space-y-20 relative z-10">
          <div className="space-y-8">
            <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/10 mb-12 animate-breathing shadow-2xl shadow-[#7FAF9B]/10">
               <i className="fa-solid fa-lotus text-5xl text-[#7FAF9B]"></i>
            </div>
            <h2 className="text-6xl md:text-[9rem] font-serif font-bold tracking-tighter leading-[0.85]">
              Begin your <br />
              <span className="italic font-light opacity-40 text-[#7FAF9B]">evolution.</span>
            </h2>
            <p className="text-white/40 text-xs uppercase tracking-[0.8em] font-bold">No credit card required. Purely peace.</p>
          </div>
          
          <button 
            onClick={onStart}
            className="group px-24 py-12 bg-[#7FAF9B] text-white rounded-[3.5rem] font-bold text-3xl shadow-[0_40px_100px_rgba(127,175,155,0.4)] hover:bg-white hover:text-[#14211E] hover:-translate-y-4 transition-all duration-700 flex items-center justify-center gap-12 mx-auto"
          >
            Start Journey
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-[#14211E] group-hover:text-white transition-all duration-500">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </button>

          <div className="pt-24 flex flex-wrap justify-center gap-12 text-[10px] font-bold uppercase tracking-[0.5em] opacity-20">
            <span>© 2024 MindEase</span>
            <span className="hidden sm:inline">•</span>
            <span>Privacy Policy</span>
            <span className="hidden sm:inline">•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cinematic {
          from { opacity: 0; transform: translateY(60px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-cinematic {
          animation: cinematic 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes breathing {
          0%, 100% { transform: scale(1) opacity(0.8); }
          50% { transform: scale(1.1) opacity(1); }
        }
        .animate-breathing {
          animation: breathing 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
