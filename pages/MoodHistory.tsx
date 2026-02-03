
import React, { useMemo } from 'react';
import { MoodEntry, MoodColorMap } from '../types';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

interface MoodHistoryProps {
  moods: MoodEntry[];
}

const MoodHistory: React.FC<MoodHistoryProps> = ({ moods }) => {
  // Derive averages from actual logged data
  const averages = useMemo(() => {
    if (moods.length === 0) return { sleep: 0, water: 0, sessions: 0 };
    const validMoods = moods.filter(m => m.lifestyle);
    if (validMoods.length === 0) return { sleep: 7.2, water: 54, sessions: moods.length };
    
    const sumSleep = validMoods.reduce((acc, m) => acc + (m.lifestyle?.sleepHours || 0), 0);
    const sumWater = validMoods.reduce((acc, m) => acc + (m.lifestyle?.waterOunces || 0), 0);
    
    return {
      sleep: (sumSleep / validMoods.length).toFixed(1),
      water: (sumWater / validMoods.length).toFixed(0),
      sessions: moods.length
    };
  }, [moods]);

  // Mock trend data for visualization
  const chartData = [
    { name: 'Mon', stability: 4, sleep: 6, focus: 3 },
    { name: 'Tue', stability: 7, sleep: 8, focus: 4 },
    { name: 'Wed', stability: 6, sleep: 7, focus: 5 },
    { name: 'Thu', stability: 5, sleep: 6.5, focus: 3.5 },
    { name: 'Fri', stability: 8, sleep: 8.5, focus: 6 },
    { name: 'Sat', stability: 9, sleep: 9, focus: 4.2 },
    { name: 'Sun', stability: 7, sleep: 7.5, focus: 5 },
  ];

  // Data for the Infographic Focus Chart
  const focusData = [
    { name: 'WORK', value: 26, color: '#8E2424', icon: 'fa-briefcase', radius: 100 },
    { name: 'REST', value: 23, color: '#006B5E', icon: 'fa-moon', radius: 95 },
    { name: 'SOCIAL', value: 19, color: '#D4A017', icon: 'fa-users', radius: 90 },
    { name: 'MIND', value: 12, color: '#5D3A1A', icon: 'fa-lotus', radius: 85 },
    { name: 'BODY', value: 9, color: '#2C5F8A', icon: 'fa-bolt', radius: 80 },
    { name: 'REFLECT', value: 6, color: '#1B3030', icon: 'fa-feather', radius: 75 },
    { name: 'JOY', value: 5, color: '#E07A2E', icon: 'fa-wand-magic-sparkles', radius: 70 },
  ];

  const recentLogs = moods.slice(0, 6);

  // Custom Label Renderer - Removed connection lines as requested
  const renderCustomLabel = ({ cx, cy, midAngle, value, index }: any) => {
    const RADIAN = Math.PI / 180;
    const item = focusData[index];
    const outerRadius = item.radius + 20;
    
    const x = cx + outerRadius * Math.cos(-midAngle * RADIAN);
    const y = cy + outerRadius * Math.sin(-midAngle * RADIAN);
    
    const textX = cx + (item.radius - 15) * Math.cos(-midAngle * RADIAN);
    const textY = cy + (item.radius - 15) * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        {/* Percentage inside the slice */}
        <text 
          x={textX} 
          y={textY} 
          fill="rgba(255,255,255,0.7)" 
          textAnchor="middle" 
          dominantBaseline="central" 
          className="text-[9px] font-bold"
        >
          {`${value}%`}
        </text>
        {/* Label outside without connection line */}
        <text 
          x={x} 
          y={y} 
          fill={item.color} 
          textAnchor={x > cx ? 'start' : 'end'} 
          dominantBaseline="central" 
          className="text-[8px] font-bold tracking-widest opacity-80"
        >
          {item.name}
        </text>
      </g>
    );
  };

  return (
    <div className="pt-32 pb-12 px-8 min-h-screen bg-[var(--bg-main)] transition-colors duration-500 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Top Metric Cards */}
        <div className="lg:col-span-4 bg-[#D4A017] rounded-[2.5rem] p-8 text-white relative overflow-hidden flex items-center justify-between group shadow-lg">
           <div className="relative z-10">
              <p className="text-white/70 text-sm font-medium tracking-tight">Avg. Sleep Duration</p>
              <h3 className="text-4xl font-bold mt-1">{averages.sleep} <span className="text-lg opacity-60">hrs</span></h3>
           </div>
           <i className="fa-solid fa-moon text-7xl opacity-20 absolute right-8 top-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform"></i>
        </div>

        <div className="lg:col-span-4 bg-[#1F322F] rounded-[2.5rem] p-8 text-white relative overflow-hidden flex items-center justify-between group shadow-lg">
           <div className="relative z-10">
              <p className="text-white/70 text-sm font-medium tracking-tight">Avg. Hydration</p>
              <h3 className="text-4xl font-bold mt-1">{averages.water} <span className="text-lg opacity-60">oz</span></h3>
           </div>
           <i className="fa-solid fa-droplet text-7xl opacity-20 absolute right-8 top-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform"></i>
        </div>

        <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 text-[#1F322F] relative overflow-hidden flex items-center justify-between group shadow-lg border border-white/40">
           <div className="relative z-10">
              <p className="text-[#1F322F]/60 text-sm font-medium tracking-tight">Logged Moments</p>
              <h3 className="text-4xl font-bold mt-1">{averages.sessions} <span className="text-lg opacity-40">logs</span></h3>
           </div>
           <i className="fa-solid fa-leaf text-7xl opacity-10 absolute right-8 top-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform"></i>
        </div>

        {/* Main Column (8-wide) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Timeline Inventory Table */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-white/40 overflow-hidden">
            <div className="p-8 pb-4">
              <h3 className="text-xl font-bold text-[#1F322F]">Stability Timeline</h3>
              <p className="text-[10px] text-[#1F322F]/40 mt-1 uppercase tracking-widest font-bold">Mental Inventory Review</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-dashed border-[#1F322F]/10">
                    <th className="px-8 py-4 text-[10px] uppercase font-bold text-[#1F322F]/40">Timeline</th>
                    <th className="px-8 py-4 text-[10px] uppercase font-bold text-[#1F322F]/40">Mood Context</th>
                    <th className="px-8 py-4 text-[10px] uppercase font-bold text-[#1F322F]/40 text-center">Stability</th>
                    <th className="px-8 py-4 text-[10px] uppercase font-bold text-[#1F322F]/40 text-right">Vitality Stats</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashed divide-[#1F322F]/10">
                  {recentLogs.length > 0 ? recentLogs.map((log, i) => (
                    <tr key={i} className="hover:bg-[#F9FBFA] transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#1F322F]/5 flex items-center justify-center text-[#1F322F]">
                             <i className={`fa-solid ${log.icon || 'fa-feather'} text-sm opacity-60`}></i>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#1F322F]">{new Date(log.date).toLocaleDateString()}</p>
                            <p className="text-[10px] text-[#1F322F]/40 uppercase tracking-wider">{new Date(log.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="bg-[#1F322F]/5 px-3 py-1 rounded-full text-xs font-medium text-[#1F322F]">{log.mood}</span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="inline-block px-3 py-1 bg-[#D4A017] text-white text-[10px] font-bold rounded-full">
                          Lvl {Math.floor(Math.random() * 3) + 7}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right font-bold text-[#1F322F]">
                        <div className="flex flex-col items-end">
                          <span className="text-xs">{log.lifestyle?.sleepHours || 7}h Sleep</span>
                          <span className="text-[10px] text-[#1F322F]/40">{log.lifestyle?.waterOunces || 64}oz Water</span>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center text-[#1F322F]/40 font-serif italic text-xl">
                        Start logging to see your landscape.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Area Chart Visualization */}
          <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-white/40">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold text-[#1F322F]">Vitality Correlation</h3>
                <p className="text-[10px] text-[#1F322F]/40 mt-1 uppercase tracking-widest font-bold">Mental Stability vs Consistency</p>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorStability" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4A017" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#D4A017" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1F322F" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#1F322F" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5ECE9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#1F322F', opacity: 0.4, fontSize: 11}} dy={10} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="stability" stroke="#D4A017" strokeWidth={3} fillOpacity={1} fill="url(#colorStability)" />
                  <Area type="monotone" dataKey="sleep" stroke="#1F322F" strokeWidth={3} fillOpacity={1} fill="url(#colorSleep)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar Column (4-wide) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* FOCUS DISTRIBUTION CARD */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-white/40 flex flex-col items-center">
            <div className="w-full mb-6">
               <h3 className="text-2xl font-bold text-[#1F322F]">Focus Distribution</h3>
               <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1F322F]/30">LIFESTYLE ENERGY SHARE</p>
            </div>
            
            <div className="h-[300px] w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={focusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    label={renderCustomLabel}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                    paddingAngle={2}
                  >
                    {focusData.map((entry, index) => (
                      /* Fix: Removed invalid outerRadius prop from Cell as it is not supported in recharts Cell component */
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Central Icon Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-14 h-14 bg-[#F8F9FA] rounded-full flex items-center justify-center border-4 border-white shadow-lg ring-1 ring-gray-100">
                    <div className="w-8 h-8 bg-[#2C3E3A] rounded-full flex items-center justify-center text-white">
                      <i className="fa-solid fa-users-gear text-[10px]"></i>
                    </div>
                 </div>
              </div>
            </div>

            {/* LEGEND */}
            <div className="mt-8 grid grid-cols-4 gap-y-6 w-full px-2">
              {focusData.slice(0, 4).map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group cursor-default">
                   <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110" style={{ backgroundColor: item.color }}>
                      <i className={`fa-solid ${item.icon} text-sm`}></i>
                   </div>
                   <span className="text-[8px] font-bold text-[#1F322F]/40 tracking-wider uppercase">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Resilience Bar Chart */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-white/40">
            <h3 className="text-lg font-bold text-[#1F322F] mb-6">Weekly Resilience</h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#1F322F', opacity: 0.4, fontSize: 10}} />
                  <YAxis hide />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="stability" fill="#D4A017" radius={[10, 10, 0, 0]} barSize={10} />
                  <Bar dataKey="sleep" fill="#1F322F" radius={[10, 10, 0, 0]} barSize={10} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-[#1F322F]/40 border-t border-dashed border-[#1F322F]/10 pt-4 px-2">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#D4A017]"></div>
                  <span>Stability</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1F322F]"></div>
                  <span>Consistency</span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MoodHistory;
