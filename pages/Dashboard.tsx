
import React, { useState } from 'react';
import { Page, MoodEntry } from '../types';

interface DashboardProps {
  userName: string;
  addMood: (entry: Omit<MoodEntry, 'id'>) => void;
  navigate: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userName, addMood, navigate }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [customEmoji, setCustomEmoji] = useState('');
  const [customLabel, setCustomLabel] = useState('');
  const [note, setNote] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const presets: { label: string; icon: string; color: string }[] = [
    { label: 'Happy', icon: 'fa-face-smile-beam', color: 'text-[#7BC8A4]' },
    { label: 'Sad', icon: 'fa-face-frown-open', color: 'text-[#8FB9A8]' },
    { label: 'Stressed', icon: 'fa-face-grimace', color: 'text-orange-400' },
    { label: 'Tired', icon: 'fa-face-tired', color: 'text-blue-400' },
  ];

  const tags = ['#Work', '#Sleep', '#Social', '#Health', '#Family'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleLogMood = () => {
    const finalMood = isCustomMode ? (customLabel || 'Custom') : (selectedMood || 'Neutral');
    const finalIcon = isCustomMode ? customEmoji : presets.find(p => p.label === selectedMood)?.icon;

    addMood({
      date: new Date().toISOString(),
      mood: finalMood,
      note: note,
      icon: finalIcon,
      tags: selectedTags
    });

    // Reset
    setSelectedMood(null);
    setNote('');
    setCustomEmoji('');
    setCustomLabel('');
    setIsCustomMode(false);
    setSelectedTags([]);
    alert('Moment recorded. Your insights are updating.');
  };

  const selectPreset = (label: string) => {
    setIsCustomMode(false);
    setSelectedMood(label);
  };

  return (
    <div className="pt-24 pb-12 px-6 min-h-screen bg-[#F4FAF8] text-[#2F4F4F]">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-serif font-bold">Welcome Back, {userName}</h1>
            <p className="text-[#4DA6A6] font-medium flex items-center gap-2">
              <i className="fa-solid fa-leaf text-xs"></i>
              Emotional tracking helps you recognize your inner strength.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/60 border border-white p-4 rounded-3xl shadow-sm">
            <div className="w-12 h-12 rounded-full border-2 border-[#8FB9A8] flex items-center justify-center">
              <span className="font-bold text-[#8FB9A8]">7</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#2F4F4F]/40">Mindful Streak</p>
              <p className="text-sm font-bold">7 Beautiful Days</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white p-8 md:p-12 space-y-10 shadow-sm relative overflow-hidden">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-serif">How is your heart today?</h2>
                <p className="text-[#2F4F4F]/40 text-sm">Select a feeling that resonates with you right now</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {presets.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => selectPreset(m.label)}
                    className={`flex flex-col items-center gap-4 p-6 rounded-[2rem] transition-all duration-500 border group ${
                      selectedMood === m.label && !isCustomMode
                        ? 'bg-[#8FB9A8]/10 border-[#8FB9A8] shadow-md scale-105' 
                        : 'bg-white border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <i className={`fa-solid ${m.icon} text-3xl md:text-4xl ${m.color} transition-transform group-hover:scale-110`}></i>
                    <span className={`font-bold text-xs uppercase tracking-wider ${selectedMood === m.label && !isCustomMode ? 'text-[#8FB9A8]' : 'text-[#2F4F4F]/40'}`}>{m.label}</span>
                  </button>
                ))}
                
                <button
                  onClick={() => { setIsCustomMode(true); setSelectedMood('Custom'); }}
                  className={`flex flex-col items-center gap-4 p-6 rounded-[2rem] transition-all duration-500 border group ${
                    isCustomMode ? 'bg-[#8FB9A8]/10 border-[#8FB9A8] shadow-md scale-105' : 'bg-white border-dashed border-gray-200 hover:border-[#8FB9A8]/40'
                  }`}
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 border-dashed ${isCustomMode ? 'border-[#8FB9A8] bg-white' : 'border-gray-200'}`}>
                    <i className={`fa-solid fa-plus text-xl ${isCustomMode ? 'text-[#8FB9A8]' : 'text-gray-300'}`}></i>
                  </div>
                  <span className={`font-bold text-xs uppercase tracking-wider ${isCustomMode ? 'text-[#8FB9A8]' : 'text-[#2F4F4F]/40'}`}>Custom</span>
                </button>
              </div>

              {selectedMood && (
                <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#2F4F4F]/40 ml-1">What triggered this feeling?</label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                            selectedTags.includes(tag)
                              ? 'bg-[#2F4F4F] text-white border-[#2F4F4F]'
                              : 'bg-white text-[#2F4F4F]/40 border-gray-100 hover:border-[#8FB9A8]'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#2F4F4F]/40 ml-1">Add a note</label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value.slice(0, 500))}
                      placeholder="Context adds depth to your analytics..."
                      className="w-full bg-white border border-gray-100 rounded-2xl p-6 h-24 focus:border-[#8FB9A8] focus:ring-4 focus:ring-[#8FB9A8]/10 outline-none transition-all resize-none shadow-inner"
                    ></textarea>
                  </div>
                  <button
                    onClick={handleLogMood}
                    className="w-full py-5 bg-[#2F4F4F] text-white font-bold rounded-2xl shadow-xl shadow-[#2F4F4F]/20 hover:-translate-y-1 transition-all active:scale-95"
                  >
                    Save Entry
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'AI Support', icon: 'fa-comment-dots', page: 'chat' as Page, color: 'text-indigo-400' },
                { title: 'Breathing', icon: 'fa-wind', page: 'toolkit' as Page, color: 'text-teal-400' },
                { title: 'Insights', icon: 'fa-chart-line', page: 'history' as Page, color: 'text-rose-400' },
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => navigate(action.page)}
                  className="flex flex-col items-center justify-center p-8 bg-white/80 border border-white rounded-[2rem] hover:bg-white hover:shadow-lg transition-all group shadow-sm"
                >
                  <i className={`fa-solid ${action.icon} text-3xl mb-4 ${action.color} group-hover:scale-110 transition-transform`}></i>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#2F4F4F]/60 group-hover:text-[#2F4F4F] transition-colors">{action.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                <i className="fa-solid fa-sparkles text-[#8FB9A8]"></i>
                <h3 className="font-serif text-xl font-bold">Personal Insight</h3>
              </div>
              <p className="text-sm text-[#2F4F4F]/70 leading-relaxed italic">"Mood patterns reveal themselves over time. Keep logging to unlock your emotional map."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
