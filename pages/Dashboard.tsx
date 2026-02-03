
import React, { useState } from 'react';
import { Page, MoodEntry, MoodColorMap } from '../types';

interface DashboardProps {
  userName: string;
  addMood: (entry: Omit<MoodEntry, 'id'>) => void;
  navigate: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userName, addMood, navigate }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Lifestyle State
  const [sleep, setSleep] = useState(7);
  const [water, setWater] = useState(64);
  const [steps, setSteps] = useState(5000);

  const presets = [
    { label: 'Vibrant', icon: 'fa-sun', color: MoodColorMap.Vibrant },
    { label: 'Calm', icon: 'fa-wind', color: MoodColorMap.Calm },
    { label: 'Heavy', icon: 'fa-cloud-rain', color: MoodColorMap.Heavy },
    { label: 'Frayed', icon: 'fa-bolt-lightning', color: MoodColorMap.Frayed },
    { label: 'Steady', icon: 'fa-mountain', color: MoodColorMap.Steady },
  ];

  const tags = ['#Work', '#Rest', '#Social', '#Growth', '#Body'];

  const handleLogMood = () => {
    if (!selectedMood) return;
    addMood({
      date: new Date().toISOString(),
      mood: selectedMood,
      note: note,
      icon: presets.find(p => p.label === selectedMood)?.icon,
      tags: selectedTags,
      lifestyle: {
        sleepHours: sleep,
        waterOunces: water,
        mindfulMinutes: 15, // Default for now
        steps: steps
      }
    });
    setSelectedMood(null);
    setNote('');
    setSelectedTags([]);
  };

  return (
    <div className="pt-40 pb-20 px-6 min-h-screen bg-[var(--bg-main)] transition-colors duration-500 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header with Greeting and Streak */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 animate-fade">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-serif font-bold text-[var(--text-primary)] leading-tight">
              Welcome back, <br />
              <span className="text-[var(--primary)] italic">{userName}</span>
            </h1>
            <p className="text-2xl text-[var(--text-secondary)] font-light max-w-xl leading-relaxed">
              Quiet your mind and listen to what your body is saying today.
            </p>
          </div>
          <div className="glass px-10 py-6 rounded-[2.5rem] border border-[var(--divider)] shadow-sm flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--text-secondary)]">Persistence</p>
              <p className="text-xl font-bold text-[var(--text-primary)]">7 Day Streak</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[var(--text-primary)] flex items-center justify-center shadow-lg">
              <i className="fa-solid fa-lotus text-[var(--primary)] text-2xl"></i>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10 animate-fade [animation-delay:200ms]">
            {/* Main Interaction Card */}
            <section className="bg-[var(--bg-card)] rounded-[3.5rem] p-12 md:p-16 card-shadow border border-[var(--divider)] space-y-14 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
               
              <div className="relative z-10 text-center space-y-3">
                <h2 className="text-4xl font-serif font-bold text-[var(--text-primary)]">Check-in with yourself</h2>
                <p className="text-[var(--text-secondary)] text-sm tracking-widest uppercase font-bold">How are you feeling?</p>
              </div>

              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-5 gap-6">
                {presets.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => setSelectedMood(m.label)}
                    className={`flex flex-col items-center gap-6 p-8 rounded-[3rem] transition-all duration-700 group border-2 ${
                      selectedMood === m.label
                        ? 'border-[var(--primary)] bg-[var(--bg-main)] shadow-xl shadow-[var(--primary)]/10 scale-110 -translate-y-2' 
                        : 'border-transparent bg-[var(--text-primary)]/5 hover:bg-[var(--bg-surface)] hover:border-[var(--primary)]/20'
                    }`}
                  >
                    <div className={`transition-all duration-700 ${selectedMood === m.label ? 'animate-selected-icon' : ''}`}>
                      <i 
                        className={`fa-solid ${m.icon} text-4xl transition-transform duration-500 group-hover:scale-110`} 
                        style={{ color: m.color }}
                      ></i>
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${selectedMood === m.label ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                      {m.label}
                    </span>
                  </button>
                ))}
              </div>

              {selectedMood && (
                <div className="relative z-10 space-y-12 pt-4 animate-fade">
                  {/* Lifestyle Trackers Integration */}
                  <div className="grid md:grid-cols-3 gap-6 bg-[var(--bg-main)]/30 p-8 rounded-[2.5rem] border border-[var(--divider)]">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2">
                        <i className="fa-solid fa-moon text-[var(--primary)]"></i> Sleep (hrs)
                      </label>
                      <input 
                        type="number" 
                        value={sleep} 
                        onChange={(e) => setSleep(Number(e.target.value))}
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm border-none shadow-sm focus:ring-2 focus:ring-[var(--primary)]/20"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2">
                        <i className="fa-solid fa-droplet text-blue-400"></i> Hydration (oz)
                      </label>
                      <input 
                        type="number" 
                        value={water} 
                        onChange={(e) => setWater(Number(e.target.value))}
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm border-none shadow-sm focus:ring-2 focus:ring-[var(--primary)]/20"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2">
                        <i className="fa-solid fa-shoe-prints text-amber-500"></i> Movement (steps)
                      </label>
                      <input 
                        type="number" 
                        value={steps} 
                        onChange={(e) => setSteps(Number(e.target.value))}
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm border-none shadow-sm focus:ring-2 focus:ring-[var(--primary)]/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] ml-4">Influences</p>
                    <div className="flex flex-wrap gap-3">
                      {tags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                          className={`px-8 py-3 rounded-full text-[11px] font-bold tracking-widest transition-all border-2 ${
                            selectedTags.includes(tag)
                              ? 'bg-[var(--text-primary)] text-[var(--bg-main)] border-[var(--text-primary)]'
                              : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--divider)] hover:border-[var(--primary)]'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] ml-4">Notes</p>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Write it down, let it go..."
                      className="w-full bg-[var(--text-primary)]/5 border-2 border-transparent rounded-[2.5rem] p-10 h-40 focus:bg-[var(--bg-surface)] focus:border-[var(--primary)]/20 outline-none transition-all resize-none text-xl font-light text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                    ></textarea>
                  </div>
                  
                  <button
                    onClick={handleLogMood}
                    className="w-full py-8 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold rounded-[2.5rem] shadow-2xl hover:bg-[var(--primary)] hover:-translate-y-1 transition-all active:scale-95 text-xl tracking-wide"
                  >
                    Save to Landscape
                  </button>
                </div>
              )}
            </section>

            {/* Quick Actions Buttons */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { title: 'Talk to SerenAI', page: 'chat', icon: 'fa-comment-sparkles', color: 'bg-[var(--primary)] text-white' },
                { title: 'View Toolkit', page: 'toolkit', icon: 'fa-toolbox', color: 'bg-[var(--bg-card)] text-[var(--text-primary)]' },
                { title: 'Mood Map', page: 'history', icon: 'fa-chart-area', color: 'bg-[var(--bg-card)] text-[var(--text-primary)]' },
              ].map((act, i) => (
                <button
                  key={i}
                  onClick={() => navigate(act.page as Page)}
                  className={`${act.color} p-10 rounded-[3rem] shadow-sm border border-[var(--divider)] hover:scale-[1.02] hover:shadow-xl transition-all flex flex-col items-center gap-4 group`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12 ${act.page === 'chat' ? 'bg-white/20' : 'bg-[var(--text-primary)]/5'}`}>
                    <i className={`fa-solid ${act.icon} text-xl`}></i>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-center">{act.title}</span>
                </button>
              ))}
            </div>
          </div>

          <aside className="space-y-10 animate-fade [animation-delay:400ms]">
            {/* Lifestyle Summary Card */}
            <div className="bg-[#1F322F] rounded-[3.5rem] p-10 text-white space-y-6 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] opacity-10 blur-[60px]"></div>
               <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Stability Radar</p>
               <h3 className="text-3xl font-serif font-bold italic">Healthy Habits</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-white/60">Current Goal</span>
                     <span className="font-bold text-[var(--primary)]">8h Sleep</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className="w-4/5 h-full bg-[var(--primary)]"></div>
                  </div>
               </div>
               <p className="text-xs text-white/40 leading-relaxed italic">
                 "Consistent habits are the bedrock of mental resilience."
               </p>
            </div>

            {/* Privacy Reassurance */}
            <div className="bg-[var(--bg-surface)]/50 rounded-[3rem] p-10 shadow-sm border border-[var(--divider)] space-y-6">
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-shield-halved text-[var(--primary)] text-xl"></i>
                <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">Safe Sanctuary</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                Every habit and emotion recorded here is protected by enterprise-grade encryption.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;