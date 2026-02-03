
import React, { useState, useEffect } from 'react';

type ExerciseType = '4-7-8 Breathing' | 'Box Breathing' | 'Progressive Muscle Relaxation' | '5-Minute Energy Boost' | 'Grounding';

const Toolkit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Exercises' | 'Affirmations' | 'Resources'>('Exercises');
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const [activeExercise, setActiveExercise] = useState<ExerciseType | null>(null);

  useEffect(() => {
    const handleSOS = () => setActiveExercise('Grounding');
    window.addEventListener('launchGrounding', handleSOS);
    return () => window.removeEventListener('launchGrounding', handleSOS);
  }, []);

  const affirmations = [
    "I am not my thoughts; I am the observer of my thoughts.",
    "Rest is a courageous act of self-care.",
    "My worth is intrinsic, not based on my productivity.",
    "I have the strength to navigate this moment.",
    "I choose peace over the pursuit of perfection."
  ];

  const exerciseList = [
    { title: '4-7-8 Breathing' as ExerciseType, time: '5 mins', bg: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=40&w=400', icon: 'fa-wind', color: 'text-blue-500', desc: 'The natural tranquilizer for the nervous system.' },
    { title: 'Box Breathing' as ExerciseType, time: '4 mins', bg: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=40&w=400', icon: 'fa-square', color: 'text-emerald-500', desc: 'Tactical focus tool used by elite performers.' },
    { title: 'Progressive Relaxation' as ExerciseType, time: '10 mins', bg: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=40&w=400', icon: 'fa-user-check', color: 'text-amber-500', desc: 'Identify and release stored physical tension.' },
    { title: 'Grounding' as ExerciseType, time: '3 mins', bg: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=40&w=400', icon: 'fa-anchor', color: 'text-rose-500', desc: 'Re-center your senses in the present moment.' },
  ];

  return (
    <div className="pt-40 pb-20 px-6 min-h-screen bg-[var(--bg-main)] transition-colors duration-500">
      <div className="max-w-6xl mx-auto space-y-16">
        <header className="text-center space-y-6 animate-fade">
          <div className="inline-block px-4 py-1.5 bg-[var(--primary)]/10 rounded-full text-[var(--primary)] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Interactive Sanctuary</div>
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-[var(--text-primary)]">Wellness Toolkit</h1>
          <p className="text-2xl text-[var(--text-secondary)] font-light max-w-2xl mx-auto leading-relaxed">
            Immediate resources to help you regulate your nervous system and find your center.
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center animate-fade [animation-delay:200ms]">
          <div className="bg-[var(--bg-surface)] backdrop-blur-xl p-2 rounded-[2rem] flex gap-2 border border-[var(--divider)] shadow-sm">
            {(['Exercises', 'Affirmations', 'Resources'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 py-3.5 rounded-[1.5rem] text-sm font-bold transition-all duration-500 ${
                  activeTab === tab 
                    ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-xl' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="animate-fade [animation-delay:400ms]">
          {activeTab === 'Exercises' && (
            <div className="grid md:grid-cols-2 gap-10">
              {exerciseList.map((ex, i) => (
                <div key={i} className="group relative bg-[var(--bg-card)] rounded-[3rem] p-10 shadow-sm border border-[var(--divider)] overflow-hidden hover:shadow-2xl hover:bg-[var(--bg-card-hover)] hover:-translate-y-2 transition-all duration-700">
                  {/* Background Accents */}
                  <div className="absolute top-0 right-0 w-48 h-48 -mr-10 -mt-10 overflow-hidden rounded-full opacity-10 blur-xl">
                      <img src={ex.bg} alt="Acc" className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full space-y-6">
                    <div className={`w-16 h-16 rounded-2xl bg-[var(--bg-main)] flex items-center justify-center ${ex.color} transition-transform group-hover:rotate-6`}>
                      <i className={`fa-solid ${ex.icon} text-3xl`}></i>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-3xl font-serif font-bold text-[var(--text-primary)]">{ex.title}</h3>
                      <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{ex.desc}</p>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-[var(--divider)] mt-auto">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)]">{ex.time} session</span>
                      <button 
                        onClick={() => setActiveExercise(ex.title)}
                        className="px-8 py-4 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-2xl font-bold text-sm hover:opacity-90 transition-all"
                      >
                        Start Journey
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Affirmations' && (
            <div className="max-w-4xl mx-auto py-12">
              <div className="bg-[var(--bg-surface)] p-24 rounded-[4rem] text-[var(--text-primary)] text-center space-y-12 relative overflow-hidden shadow-2xl border border-[var(--divider)]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--primary),_transparent)] opacity-5 pointer-events-none"></div>
                <i className="fa-solid fa-quote-left text-7xl text-[var(--primary)]/20 relative z-10"></i>
                <h2 className="text-4xl md:text-5xl font-serif font-bold italic leading-snug relative z-10 px-8">
                  {affirmations[currentAffirmation]}
                </h2>
                <div className="flex justify-center gap-8 relative z-10">
                  <button onClick={() => setCurrentAffirmation(p => p === 0 ? affirmations.length -1 : p - 1)} className="w-16 h-16 rounded-full bg-[var(--bg-main)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all border border-[var(--divider)]"><i className="fa-solid fa-chevron-left"></i></button>
                  <button onClick={() => setCurrentAffirmation(p => p === affirmations.length -1 ? 0 : p + 1)} className="w-16 h-16 rounded-full bg-[var(--bg-main)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all border border-[var(--divider)]"><i className="fa-solid fa-chevron-right"></i></button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Resources' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Neuroscience of Flow', type: 'Journal', icon: 'fa-brain', color: 'text-blue-500' },
                { title: 'Soundscapes: Forest Rain', type: 'Audio', icon: 'fa-headphones-simple', color: 'text-emerald-500' },
                { title: 'The Sleep Ritual', type: 'Guide', icon: 'fa-moon', color: 'text-indigo-500' },
              ].map((res, i) => (
                <div key={i} className="bg-[var(--bg-card)] p-10 rounded-[2.5rem] border border-[var(--divider)] shadow-sm hover:shadow-xl hover:bg-[var(--bg-card-hover)] transition-all group flex flex-col justify-between h-64">
                  <div className={`w-14 h-14 rounded-2xl bg-[var(--bg-main)] flex items-center justify-center ${res.color} group-hover:scale-110 transition-transform`}>
                    <i className={`fa-solid ${res.icon} text-2xl`}></i>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] mb-1">{res.type}</p>
                    <h4 className="text-2xl font-serif font-bold text-[var(--text-primary)]">{res.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {activeExercise && (
          <ExerciseModal type={activeExercise} onClose={() => setActiveExercise(null)} />
        )}
      </div>
    </div>
  );
};

const ExerciseModal: React.FC<{ type: ExerciseType; onClose: () => void }> = ({ type, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-[var(--bg-main)]/95 backdrop-blur-2xl flex flex-col items-center justify-center animate-fade">
      <button 
        onClick={onClose}
        className="absolute top-10 right-10 w-16 h-16 bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-full flex items-center justify-center shadow-xl hover:rotate-90 border border-[var(--divider)] transition-all duration-500"
      >
        <i className="fa-solid fa-xmark text-2xl"></i>
      </button>

      <div className="max-w-3xl w-full px-8 flex flex-col items-center text-center space-y-16">
        <div className="space-y-4">
          <h2 className="text-5xl font-serif font-bold text-[var(--text-primary)]">{type}</h2>
          <div className="h-1 w-12 bg-[var(--primary)] mx-auto rounded-full"></div>
        </div>

        {type === '4-7-8 Breathing' && <BreathingSession pattern={[4, 7, 8]} labels={['Inhale', 'Hold', 'Exhale']} />}
        {type === 'Box Breathing' && <BreathingSession pattern={[4, 4, 4, 4]} labels={['Inhale', 'Hold', 'Exhale', 'Hold']} />}
        {type === 'Progressive Muscle Relaxation' && <PMRSession />}
        {type === 'Grounding' && <GroundingSession onClose={onClose} />}
      </div>
    </div>
  );
};

const BreathingSession: React.FC<{ pattern: number[]; labels: string[] }> = ({ pattern, labels }) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(pattern[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          const nextIndex = (phaseIndex + 1) % pattern.length;
          setPhaseIndex(nextIndex);
          return pattern[nextIndex];
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phaseIndex, pattern]);

  const scaleFactor = labels[phaseIndex] === 'Inhale' ? 1.4 : labels[phaseIndex] === 'Exhale' ? 1 : 1.2;

  return (
    <div className="flex flex-col items-center space-y-20">
      <div className="relative flex items-center justify-center">
        {/* Animated Fluid Circle */}
        <div 
          className="w-64 h-64 md:w-80 md:h-80 rounded-full border-[16px] border-[var(--primary)]/10 flex items-center justify-center transition-all duration-[1000ms] ease-in-out relative"
          style={{ transform: `scale(${scaleFactor})` }}
        >
          <div className="absolute inset-4 border-2 border-[var(--primary)]/20 rounded-full animate-ping opacity-50"></div>
          <div className="w-24 h-24 bg-[var(--text-primary)] rounded-full shadow-2xl flex items-center justify-center text-[var(--bg-main)] font-serif text-4xl">
            {timeLeft}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-6xl font-serif italic text-[var(--text-primary)]">{labels[phaseIndex]}</h3>
        <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[var(--text-muted)]">Follow the rhythm</p>
      </div>
    </div>
  );
};

const PMRSession: React.FC = () => {
  const parts = ['Hands', 'Shoulders', 'Face', 'Legs', 'Feet'];
  const [idx, setIdx] = useState(0);
  const [tense, setTense] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTense(prev => {
        if (!prev) setIdx(i => (i + 1) % parts.length);
        return !prev;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [parts.length]);

  return (
    <div className="space-y-12">
      <div className="w-64 h-64 bg-[var(--bg-card)] rounded-[4rem] border border-[var(--divider)] shadow-inner flex items-center justify-center overflow-hidden relative">
        <div className={`absolute inset-0 transition-colors duration-1000 ${tense ? 'bg-orange-500/10' : 'bg-emerald-500/10'}`}></div>
        <i className={`fa-solid fa-person text-9xl relative z-10 transition-all duration-1000 ${tense ? 'text-orange-400 scale-110' : 'text-emerald-400 scale-100'}`}></i>
      </div>
      <div className="space-y-4">
        <h4 className="text-3xl font-bold text-[var(--text-primary)]">{parts[idx]}</h4>
        <p className={`text-5xl font-serif italic ${tense ? 'text-orange-500' : 'text-emerald-500'}`}>
          {tense ? 'Tense tight...' : 'Let it go...'}
        </p>
      </div>
    </div>
  );
};

const GroundingSession: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const steps = ["See 5 things", "Touch 4 things", "Hear 3 things", "Smell 2 things", "Taste 1 thing"];
  const [idx, setIdx] = useState(0);

  return (
    <div className="space-y-12">
      <div className="w-32 h-32 bg-[var(--text-primary)] rounded-[2.5rem] flex items-center justify-center text-[var(--bg-main)] shadow-2xl mx-auto">
        <i className="fa-solid fa-anchor text-4xl"></i>
      </div>
      <div className="space-y-10">
        <h3 className="text-5xl font-serif italic text-[var(--text-primary)]">{steps[idx]}</h3>
        <button 
          onClick={() => idx < 4 ? setIdx(idx + 1) : onClose()}
          className="px-12 py-5 bg-[var(--primary)] text-white rounded-full font-bold text-xl hover:opacity-90 transition-all shadow-xl"
        >
          {idx < 4 ? 'Next Focus' : 'I am grounded'}
        </button>
      </div>
    </div>
  );
};

export default Toolkit;
