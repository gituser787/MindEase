
import React, { useState, useEffect, useRef } from 'react';

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
    "Rest is productive and necessary.",
    "I am capable of handling whatever today brings.",
    "My peace is a priority.",
    "I am growing through what I am going through.",
    "I deserve to feel calm and at ease."
  ];

  const exerciseList = [
    { title: '4-7-8 Breathing' as ExerciseType, time: '5 mins', difficulty: 'Beginner', icon: 'fa-wind', color: 'text-blue-500', desc: 'Slows respiration and reduces cortisol.' },
    { title: 'Box Breathing' as ExerciseType, time: '4 mins', difficulty: 'Standard', icon: 'fa-square', color: 'text-purple-500', desc: 'Stimulates vagus nerve for focus.' },
    { title: 'Progressive Muscle Relaxation' as ExerciseType, time: '10 mins', difficulty: 'Intermediate', icon: 'fa-user-check', color: 'text-green-500', desc: 'Releases stored physical tension.' },
    { title: '5-Minute Energy Boost' as ExerciseType, time: '5 mins', difficulty: 'Active', icon: 'fa-bolt', color: 'text-yellow-500', desc: 'Combats brain fog and lethargy.' },
  ];

  return (
    <div className="pt-24 pb-12 px-6 min-h-screen bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2F4F4F]">Wellness Toolkit</h1>
          <p className="text-[#2F4F4F]/60 max-w-xl mx-auto">Interactive tools designed for immediate nervous system regulation.</p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl flex gap-1 border border-[#2F4F4F]/5 shadow-sm">
            {(['Exercises', 'Affirmations', 'Resources'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab 
                    ? 'bg-[#2F4F4F] text-white shadow-lg' 
                    : 'text-[#2F4F4F]/40 hover:text-[#2F4F4F]/70 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="animate-[fadeIn_0.5s_ease-out]">
          {activeTab === 'Exercises' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {exerciseList.map((ex, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-[#2F4F4F]/5 shadow-sm hover:shadow-xl transition-all duration-500 group flex items-start gap-6">
                  <div className={`w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${ex.color}`}>
                    <i className={`fa-solid ${ex.icon} text-2xl`}></i>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-bold">{ex.title}</h3>
                    <p className="text-[#2F4F4F]/50 text-xs leading-relaxed">{ex.desc}</p>
                    <div className="flex gap-4 pt-2">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-[#2F4F4F]/40 px-3 py-1 bg-gray-100 rounded-full">
                        {ex.time}
                      </span>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-[#2F4F4F]/40 px-3 py-1 bg-gray-100 rounded-full">
                        {ex.difficulty}
                      </span>
                    </div>
                    <button 
                      onClick={() => setActiveExercise(ex.title)}
                      className="mt-4 px-6 py-3 bg-[#8FB9A8] text-white font-bold rounded-xl group-hover:bg-[#2F4F4F] transition-colors text-sm"
                    >
                      Start Session
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Affirmations' && (
            <div className="max-w-3xl mx-auto space-y-12">
              <div className="bg-white p-16 rounded-[3rem] border border-[#2F4F4F]/5 shadow-2xl text-center space-y-12 relative overflow-hidden">
                <i className="fa-solid fa-quote-left text-5xl text-[#8FB9A8]/20"></i>
                <h2 className="text-3xl md:text-4xl font-serif font-bold italic text-[#2F4F4F] leading-relaxed">
                  {affirmations[currentAffirmation]}
                </h2>
                <div className="flex justify-center gap-4">
                  <button onClick={() => setCurrentAffirmation(p => p === 0 ? affirmations.length -1 : p - 1)} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#8FB9A8] hover:text-white shadow-sm"><i className="fa-solid fa-chevron-left"></i></button>
                  <button onClick={() => setCurrentAffirmation(p => p === affirmations.length -1 ? 0 : p + 1)} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#8FB9A8] hover:text-white shadow-sm"><i className="fa-solid fa-chevron-right"></i></button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Resources' && (
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'The Science of Sleep', type: 'Article', icon: 'fa-book-open', color: 'bg-indigo-50 text-indigo-500' },
                { title: 'Guided Morning Flow', type: 'Audio Guide', icon: 'fa-headphones', color: 'bg-orange-50 text-orange-500' },
              ].map((res, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-[#2F4F4F]/5 shadow-sm flex items-center gap-6 group hover:shadow-lg transition-all">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl ${res.color}`}><i className={`fa-solid ${res.icon}`}></i></div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-30 mb-1">{res.type}</p>
                    <h4 className="text-lg font-bold text-[#2F4F4F] group-hover:text-[#8FB9A8] transition-colors">{res.title}</h4>
                  </div>
                  <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-[#2F4F4F] hover:text-white transition-all"><i className="fa-solid fa-arrow-right"></i></button>
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
    <div className="fixed inset-0 z-[100] bg-[#FAF9F6] flex flex-col items-center justify-center animate-[fadeIn_0.3s_ease-out]">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all"
      >
        <i className="fa-solid fa-xmark text-xl"></i>
      </button>

      <div className="max-w-2xl w-full px-6 flex flex-col items-center text-center space-y-12">
        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-bold text-[#2F4F4F]">{type}</h2>
          <p className="text-[#2F4F4F]/40 text-sm uppercase tracking-widest font-bold">Follow the visual pacer</p>
        </div>

        {type === '4-7-8 Breathing' && <BreathingSession pattern={[4, 7, 8]} labels={['Inhale', 'Hold', 'Exhale']} />}
        {type === 'Box Breathing' && <BreathingSession pattern={[4, 4, 4, 4]} labels={['Inhale', 'Hold', 'Exhale', 'Hold']} />}
        {type === 'Progressive Muscle Relaxation' && <PMRSession />}
        {type === '5-Minute Energy Boost' && <EnergyBoostSession />}
        {type === 'Grounding' && <GroundingSession onClose={onClose} />}
      </div>
    </div>
  );
};

const BreathingSession: React.FC<{ pattern: number[]; labels: string[] }> = ({ pattern, labels }) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(pattern[0]);
  const [totalSeconds, setTotalSeconds] = useState(0);

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
      setTotalSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [phaseIndex, pattern]);

  const scaleClass = labels[phaseIndex] === 'Inhale' ? 'scale-150' : labels[phaseIndex] === 'Exhale' ? 'scale-100' : '';

  return (
    <div className="flex flex-col items-center space-y-16">
      <div className="relative flex items-center justify-center">
        {/* Breathing Circle */}
        <div 
          className={`w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#8FB9A8]/20 flex items-center justify-center transition-all duration-[1000ms] ease-in-out ${scaleClass}`}
        >
          <div className="w-16 h-16 bg-[#8FB9A8] rounded-full shadow-2xl flex items-center justify-center text-white font-bold text-2xl">
            {timeLeft}
          </div>
        </div>
        {/* Glow ring */}
        <div className="absolute inset-0 border-4 border-[#8FB9A8]/10 rounded-full animate-ping"></div>
      </div>

      <div className="space-y-4">
        <h3 className="text-4xl font-serif italic text-[#2F4F4F]">{labels[phaseIndex]}</h3>
        <p className="text-xs text-[#2F4F4F]/40 uppercase tracking-widest font-bold">Session Time: {Math.floor(totalSeconds / 60)}:{String(totalSeconds % 60).padStart(2, '0')}</p>
      </div>
    </div>
  );
};

const PMRSession: React.FC = () => {
  const bodyParts = ['Hands & Fists', 'Forearms', 'Shoulders', 'Jaw & Face', 'Chest & Stomach', 'Thighs & Feet'];
  const [partIndex, setPartIndex] = useState(0);
  const [isTense, setIsTense] = useState(true);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (isTense) {
            setIsTense(false);
            return 7; // Relax for 7s
          } else {
            const nextPart = (partIndex + 1);
            if (nextPart < bodyParts.length) {
              setPartIndex(nextPart);
              setIsTense(true);
              return 5; // Tense next for 5s
            }
            return 0; // Finished
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [partIndex, isTense, bodyParts.length]);

  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="relative w-48 h-64 bg-gray-50 rounded-[3rem] p-8 flex items-center justify-center border-4 border-gray-100 overflow-hidden">
        <i className={`fa-solid fa-person text-8xl ${isTense ? 'text-orange-400 animate-pulse' : 'text-[#8FB8A8]'} transition-colors duration-1000`}></i>
        {isTense && <div className="absolute inset-0 bg-orange-400/5 animate-pulse"></div>}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-[#2F4F4F]">{bodyParts[partIndex]}</h3>
        <p className={`text-4xl font-serif italic ${isTense ? 'text-orange-500' : 'text-[#8FB9A8]'}`}>
          {isTense ? 'Tense Tight...' : 'Now... Release'}
        </p>
        <p className="text-xs text-[#2F4F4F]/40 font-bold uppercase tracking-widest">{timeLeft} seconds remaining</p>
      </div>
    </div>
  );
};

const EnergyBoostSession: React.FC = () => {
  const activities = [
    { name: 'Overhead Stretch', icon: 'fa-child-reaching' },
    { name: 'Rapid Nasal Breathing', icon: 'fa-wind' },
    { name: 'Seated Twists', icon: 'fa-rotate' },
    { name: 'Desk Stand-ups', icon: 'fa-arrow-up' },
    { name: 'Shoulder Rolls', icon: 'fa-circle-notch' }
  ];
  const [step, setStep] = useState(0);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          if (step < activities.length - 1) {
            setStep(s => s + 1);
            return 60;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [step]);

  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="w-32 h-32 bg-[#FAF9F6] border-8 border-yellow-400 rounded-full flex items-center justify-center text-4xl text-yellow-500 shadow-xl">
        <i className={`fa-solid ${activities[step].icon} animate-bounce`}></i>
      </div>
      <div className="space-y-4">
        <h3 className="text-3xl font-serif italic text-[#2F4F4F]">{activities[step].name}</h3>
        <div className="text-5xl font-bold text-[#2F4F4F] font-mono">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</div>
        <p className="text-xs text-[#2F4F4F]/40 font-bold uppercase tracking-widest">Next: {activities[step+1]?.name || 'Reset Breathing'}</p>
      </div>
    </div>
  );
};

const GroundingSession: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const steps = [
    "5 things you can SEE",
    "4 things you can TOUCH",
    "3 things you can HEAR",
    "2 things you can SMELL",
    "1 thing you can TASTE"
  ];
  const [idx, setIdx] = useState(0);

  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="w-16 h-16 bg-red-500 text-white rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
        <i className="fa-solid fa-anchor text-2xl"></i>
      </div>
      <div className="space-y-8 max-w-sm">
        <h3 className="text-3xl font-serif italic text-red-500">{steps[idx]}</h3>
        <p className="text-sm text-[#2F4F4F]/60 leading-relaxed">Focus your senses on the world around you. Ground yourself in the present moment.</p>
        
        <div className="flex gap-4 justify-center">
          {idx < steps.length - 1 ? (
            <button 
              onClick={() => setIdx(i => i + 1)}
              className="px-8 py-4 bg-red-500 text-white font-bold rounded-2xl shadow-xl hover:bg-red-600 transition-all"
            >
              Next Step
            </button>
          ) : (
            <button 
              onClick={onClose}
              className="px-8 py-4 bg-[#8FB9A8] text-white font-bold rounded-2xl shadow-xl hover:bg-[#2F4F4F] transition-all"
            >
              I Feel Better
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toolkit;
