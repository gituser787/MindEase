
import React, { useMemo } from 'react';
import { MoodEntry, MoodColorMap, TagIconMap } from '../types';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend
} from 'recharts';

interface MoodHistoryProps {
  moods: MoodEntry[];
}

const MoodHistory: React.FC<MoodHistoryProps> = ({ moods }) => {
  // 1. Logic for Time-of-Day Granularity
  const getTimeSegment = (isoString: string) => {
    if (!isoString) return 'Unknown';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return 'Unknown';
    const hour = date.getHours();
    if (hour >= 5 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Afternoon';
    if (hour >= 17 && hour < 21) return 'Evening';
    return 'Night';
  };

  const getEmotionalLevel = (mood: string) => {
    switch(mood) {
      case 'Happy': return 4;
      case 'Tired': return 2;
      case 'Stressed': return 1.5;
      case 'Sad': return 1;
      case 'Neutral': return 2.5;
      default: return 2.5;
    }
  };

  // 2. Prepare Data for Timeline (Line Chart)
  const timelineData = useMemo(() => {
    if (!moods) return [];
    return moods.slice(0, 15).reverse().map(m => {
      const dateObj = new Date(m.date);
      const tags = m.tags ?? [];
      return {
        timestamp: m.date,
        display: `${isNaN(dateObj.getTime()) ? 'Unknown' : dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${getTimeSegment(m.date)}`,
        level: getEmotionalLevel(m.mood),
        mood: m.mood,
        note: m.note,
        trigger: tags.length > 0 ? tags[0] : 'Uncategorized'
      };
    });
  }, [moods]);

  // 3. Prepare Data for Triggers (Stacked Bar)
  const triggerData = useMemo(() => {
    const contextTags = ['#Work', '#Sleep', '#Social', '#Health', '#Family'];
    const moodTypes = ['Happy', 'Stressed', 'Tired', 'Sad', 'Neutral'];
    
    if (!moods) return [];
    return contextTags.map(tag => {
      const entriesWithTag = moods.filter(m => m.tags && m.tags.includes(tag));
      const moodCounts: any = { tag };
      moodTypes.forEach(mood => {
        moodCounts[mood] = entriesWithTag.filter(m => m.mood === mood).length;
      });
      return moodCounts;
    });
  }, [moods]);

  // 4. Generate Insights
  const insights = useMemo(() => {
    const results: string[] = [];
    if (!moods || moods.length < 3) return ["Log a few more days to unlock patterns."];

    // Insight A: Mood by Time of Day
    const timeCounts: Record<string, Record<string, number>> = {};
    moods.forEach(m => {
      const seg = getTimeSegment(m.date);
      if (!timeCounts[seg]) timeCounts[seg] = {};
      timeCounts[seg][m.mood] = (timeCounts[seg][m.mood] || 0) + 1;
    });

    Object.entries(timeCounts).forEach(([seg, counts]) => {
      const entries = Object.entries(counts);
      if (entries.length === 0) return;
      
      const maxMood = entries.reduce((a, b) => a[1] > b[1] ? a : b);
      if (maxMood[1] > 2 && maxMood[0] === 'Stressed') {
        results.push(`You tend to feel Stressed most often in the ${seg}.`);
      }
    });

    // Insight B: Trigger Correlation
    const tagMoodMap: Record<string, Record<string, number>> = {};
    moods.forEach(m => {
      if (m.tags) {
        m.tags.forEach(tag => {
          if (!tagMoodMap[tag]) tagMoodMap[tag] = {};
          tagMoodMap[tag][m.mood] = (tagMoodMap[tag][m.mood] || 0) + 1;
        });
      }
    });

    Object.entries(tagMoodMap).forEach(([tag, counts]) => {
      if (counts['Tired'] && counts['Tired'] > 1 && tag === '#Work') {
        results.push("Work is your most frequent trigger for feeling Tired.");
      }
      if (counts['Happy'] && counts['Happy'] > 1 && tag === '#Social') {
        results.push("Socializing consistently boosts your emotional energy.");
      }
    });

    if (results.length === 0) results.push("Your mood distribution is currently balanced across all triggers.");
    return results.slice(0, 3);
  }, [moods]);

  const getMoodIcon = (m: MoodEntry) => {
    if (m.icon && typeof m.icon === 'string' && m.icon.startsWith('fa-')) return <i className={`fa-solid ${m.icon}`}></i>;
    if (m.icon) return <span>{m.icon}</span>;
    switch(m.mood) {
      case 'Happy': return <i className="fa-solid fa-face-smile-beam"></i>;
      case 'Sad': return <i className="fa-solid fa-face-frown-open"></i>;
      case 'Stressed': return <i className="fa-solid fa-face-grimace"></i>;
      case 'Tired': return <i className="fa-solid fa-face-tired"></i>;
      default: return <i className="fa-solid fa-leaf"></i>;
    }
  };

  return (
    <div className="pt-24 pb-12 px-6 min-h-screen bg-[#F4FAF8]">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-serif font-bold text-[#2F4F4F]">Emotional Landscape</h1>
          <p className="text-[#2F4F4F]/60">Decipher the patterns of your mind. See how time and life events shape your peace.</p>
        </div>

        {/* Insights Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-sm flex flex-col justify-center space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#2F4F4F]/40 flex items-center gap-2">
              <i className="fa-solid fa-wand-magic-sparkles text-[#8FB9A8]"></i>
              Auto-Generated Insights
            </h3>
            <div className="space-y-3">
              {insights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-[#8FB9A8]/5 rounded-2xl border border-[#8FB9A8]/10 group hover:bg-white transition-all">
                  <div className="w-2 h-2 rounded-full bg-[#8FB9A8] mt-2 group-hover:scale-150 transition-transform"></div>
                  <p className="text-sm font-medium text-[#2F4F4F]/80 leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#2F4F4F] rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-end min-h-[200px]">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <i className="fa-solid fa-lightbulb text-6xl"></i>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-[#8FB9A8] font-bold mb-2">Did you know?</p>
            <p className="text-sm leading-relaxed opacity-80">Consistent late-night entries are often linked to lower morning energy. Try winding down 30 minutes earlier.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mood Timeline Chart */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#2F4F4F]/5 space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-serif text-xl font-bold">Mood Timeline</h3>
                <p className="text-xs text-[#2F4F4F]/40 font-bold uppercase tracking-widest">Day + Time of Day Analysis</p>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="display" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#A0AEC0', fontWeight: 'bold'}} hide />
                  <YAxis hide domain={[0, 5]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '16px 20px' }}
                    itemStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                    labelStyle={{ marginBottom: '8px', color: '#2F4F4F', opacity: 0.4, fontWeight: 'bold', fontSize: '10px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="level" 
                    stroke="#8FB9A8" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: '#8FB9A8', strokeWidth: 3, stroke: '#fff' }} 
                    activeDot={{ r: 10, fill: '#2F4F4F' }} 
                    name="Energy Level"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[9px] text-center uppercase tracking-widest text-[#2F4F4F]/30 font-bold">Higher peaks represent positive emotional energy</p>
          </div>

          {/* Mood Triggers Chart */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#2F4F4F]/5 space-y-8">
            <div>
              <h3 className="font-serif text-xl font-bold">Mood Triggers</h3>
              <p className="text-xs text-[#2F4F4F]/40 font-bold uppercase tracking-widest">Context Frequency & Emotional Impact</p>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={triggerData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="tag" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#2F4F4F', fontWeight: 'bold'}} width={60} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', paddingTop: '20px' }} />
                  <Bar dataKey="Happy" stackId="a" fill={MoodColorMap.Happy} radius={[0, 0, 0, 0]} barSize={24} />
                  <Bar dataKey="Neutral" stackId="a" fill={MoodColorMap.Neutral} barSize={24} />
                  <Bar dataKey="Tired" stackId="a" fill={MoodColorMap.Tired} barSize={24} />
                  <Bar dataKey="Stressed" stackId="a" fill={MoodColorMap.Stressed} radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[9px] text-center uppercase tracking-widest text-[#2F4F4F]/30 font-bold">Stacked view of emotions associated with life triggers</p>
          </div>
        </div>

        {/* Entries List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-serif text-2xl font-bold text-[#2F4F4F]">Recent Reflections</h3>
            <span className="text-xs text-[#2F4F4F]/40 uppercase tracking-widest font-bold">Chronological Logs</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moods && moods.map((m) => {
              const d = new Date(m.date);
              const color = MoodColorMap[m.mood] || MoodColorMap.default;
              const tags = m.tags ?? [];
              return (
                <div key={m.id} className="bg-white p-6 rounded-[2rem] border border-[#2F4F4F]/5 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                  {/* Left-edge color coded indicator */}
                  <div className="absolute top-0 left-0 bottom-0 w-1.5" style={{ backgroundColor: color }}></div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[#2F4F4F]/30">
                        {isNaN(d.getTime()) ? 'Unknown' : `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}
                      </p>
                      <h4 className="font-bold text-[#2F4F4F] flex flex-wrap items-center gap-2">
                        {m.mood}
                        {tags.map(t => (
                          <span key={t} className="text-[8px] bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100 text-[#2F4F4F]/40">
                            {t}
                          </span>
                        ))}
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0" style={{ backgroundColor: color }}>
                      {getMoodIcon(m)}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50/50 p-4 rounded-2xl italic text-sm text-[#2F4F4F]/70 leading-relaxed border border-gray-100">
                    "{m.note || 'A quiet, unvoiced moment.'}"
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <div key={tag} className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-[#2F4F4F]/20" title={tag}>
                        <i className={`fa-solid ${TagIconMap[tag] || 'fa-tag'} text-xs`}></i>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodHistory;
