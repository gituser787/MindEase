
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: "Welcome back to your quiet space. I'm SerenAI. Whatever is on your mind today, we can hold it together. How are you feeling right now?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: trimmedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiMessageId = Date.now().toString() + '-ai';
    setMessages(prev => [...prev, { id: aiMessageId, role: 'model', text: '' }]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const streamResponse = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: trimmedInput,
        config: {
          systemInstruction: "You are SerenAI, an empathetic, professional wellness companion. Your tone is warm, calm, and insightful. Use clear paragraph breaks. Your color palette is mist and sage. Focus on emotional validation first, then gentle reframing. Use markdown spacing. Keep responses concise and supportive.",
          temperature: 0.7,
        },
      });

      let fullResponseText = '';
      for await (const chunk of streamResponse) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullResponseText += c.text;
          setMessages(prev => 
            prev.map(m => m.id === aiMessageId ? { ...m, text: fullResponseText } : m)
          );
        }
      }
    } catch (error) {
      setMessages(prev => prev.map(m => m.id === aiMessageId ? { ...m, text: "I've momentarily lost my connection to the forest. Let's take a deep breath together and try again." } : m));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-6 px-6 h-screen flex flex-col bg-[var(--bg-main)] relative overflow-hidden transition-colors duration-700">
      {/* Soft Background Ambiance */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      <div className="max-w-4xl mx-auto w-full h-full flex flex-col space-y-4 relative z-10">
        {/* SerenAI Header */}
        <div className="flex items-center justify-between px-8 py-4 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/40 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[var(--primary)] shadow-sm border border-[var(--divider)]">
              <i className="fa-solid fa-leaf text-2xl"></i>
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-[var(--text-primary)] tracking-tight">SerenAI</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--text-muted)]">Attuned Presence</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/5 rounded-full">
               <i className="fa-solid fa-shield-halved text-[var(--primary)] text-[10px]"></i>
               <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[var(--text-primary)]/40">Private Sanctuary</span>
            </div>
          </div>
        </div>

        {/* Chat Conversation Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-10 px-4 py-8 scrollbar-hide"
        >
          {messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade`}
            >
              <div 
                className={`max-w-[85%] sm:max-w-[75%] p-7 rounded-[2.5rem] text-base leading-relaxed whitespace-pre-wrap transition-all duration-700 shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-[var(--primary)]/10 text-[var(--text-primary)] rounded-br-none border border-[var(--primary)]/20' 
                    : 'bg-white text-[var(--text-primary)] rounded-bl-none border border-[var(--divider)]'
                }`}
              >
                {m.text}
                {m.role === 'model' && m.text === '' && (
                  <div className="flex gap-2 py-3 items-center">
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* User Input Area */}
        <div className="bg-white p-5 rounded-[3rem] shadow-2xl border border-[var(--divider)] relative group transition-all focus-within:ring-4 focus-within:ring-[var(--primary)]/5">
          <div className="flex items-center gap-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="What is heavy on your heart?"
              className="flex-1 bg-transparent border-none text-[var(--text-primary)] outline-none resize-none h-12 py-3 placeholder:text-[var(--text-muted)] text-lg font-light px-4"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-14 h-14 bg-[var(--primary)] text-white rounded-[1.5rem] flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-20 shadow-xl"
            >
              <i className="fa-solid fa-paper-plane text-xl"></i>
            </button>
          </div>
          
          {/* Quick Guidance Chips */}
          <div className="flex flex-wrap gap-3 mt-4 px-4">
            {[
              { label: "Help me reflect", icon: "fa-feather" },
              { label: "Feeling anxious", icon: "fa-wind" },
              { label: "Need to reframe", icon: "fa-arrows-rotate" }
            ].map(chip => (
              <button 
                key={chip.label}
                onClick={() => setInput(chip.label)}
                className="flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] font-bold text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5 px-5 py-2.5 rounded-full border border-[var(--divider)] transition-all"
              >
                <i className={`fa-solid ${chip.icon} text-[8px]`}></i>
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
