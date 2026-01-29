
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Message } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: "I'm SerenAI, your mindful companion. I'm here to listen, support, and help you find your way back to calm. How is your heart feeling right now?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: trimmedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Create a new instance right before the call as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: trimmedInput,
        config: {
          systemInstruction: "You are SerenAI, an empathetic, validating, non-clinical AI mental health companion. Your tone is warm, calm, and reassuring. Use gentle language and focus on emotional validation. If the user mentions crisis or self-harm, gently provide hotline resources and emphasize you are an AI, not a therapist.",
          temperature: 0.7,
        },
      });

      const aiText = response.text || "I'm here for you, but I'm having a little trouble connecting. Could you say that again?";
      setMessages(prev => [...prev, { id: Date.now().toString() + '-ai', role: 'model', text: aiText }]);
    } catch (error) {
      console.error('AIChat Error:', error);
      setMessages(prev => [...prev, { id: Date.now().toString() + '-err', role: 'model', text: "I apologize, my connection is a bit fuzzy. Let's try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const chips = [
    "I feel overwhelmed",
    "I need to vent about work",
    "Help me find focus",
    "Tell me something peaceful"
  ];

  return (
    <div className="pt-24 pb-8 px-4 h-screen flex flex-col bg-[#F4FAF8]">
      <div className="max-w-5xl mx-auto w-full h-full flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-md border border-white p-4 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8FBC8F] to-[#7BC8A4] rounded-2xl flex items-center justify-center animate-pulse shadow-sm">
                <i className="fa-solid fa-lotus text-white"></i>
            </div>
            <div>
              <h2 className="text-[#2F4F4F] font-serif font-bold">SerenAI</h2>
              <p className="text-[#2F4F4F]/40 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span>
                Attuned to your peace
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#2F4F4F]/20 text-xs uppercase tracking-widest font-bold">
            <span>Validation</span>
            <span>•</span>
            <span>Support</span>
            <span>•</span>
            <span>Calm</span>
          </div>
        </div>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-6 px-2 py-4 scrollbar-hide"
        >
          {messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] sm:max-w-[70%] p-5 rounded-[2rem] text-sm md:text-base leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-[#8FBC8F] text-white rounded-tr-none shadow-md shadow-[#8FBC8F]/10' 
                    : 'bg-white text-[#2F4F4F]/90 border border-gray-100 rounded-tl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-[2rem] rounded-tl-none border border-gray-100 flex gap-2 shadow-sm">
                <div className="w-2 h-2 bg-[#8FBC8F]/40 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#8FBC8F]/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-[#8FBC8F]/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Chips */}
        {messages.length < 3 && !isLoading && (
          <div className="flex flex-wrap gap-2 justify-center pb-2">
            {chips.map((chip, i) => (
              <button
                key={i}
                onClick={() => { setInput(chip); }}
                className="px-4 py-2 bg-white/60 border border-white text-[#2F4F4F]/60 rounded-full text-xs hover:bg-[#8FBC8F] hover:text-white transition-all active:scale-95 shadow-sm"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="bg-white/90 backdrop-blur-xl border border-white p-4 rounded-3xl space-y-3 shadow-lg">
          <div className="flex items-center gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Share what's on your mind..."
              className="flex-1 bg-transparent border-none text-[#2F4F4F] outline-none resize-none h-12 py-2 placeholder:text-[#2F4F4F]/20"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-12 h-12 bg-[#8FBC8F] text-white rounded-2xl flex items-center justify-center hover:bg-[#7ba87b] transition-all disabled:opacity-30 disabled:hover:bg-[#8FBC8F] shadow-sm"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
          <p className="text-[10px] text-[#2F4F4F]/30 text-center uppercase tracking-widest font-medium">
            SerenAI is an AI support companion, not a replacement for professional therapy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
