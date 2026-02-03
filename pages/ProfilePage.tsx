
import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';

interface ProfilePageProps {
  user: User;
  onUpdate: (user: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio || '');
  const [avatar, setAvatar] = useState(user.avatar || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state if user prop changes externally
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setBio(user.bio || '');
    setAvatar(user.avatar || '');
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("To maintain serenity, please choose an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatar('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API delay for "Harmonizing" effect
    setTimeout(() => {
      onUpdate({
        ...user,
        name,
        email,
        bio,
        avatar
      });
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="pt-40 pb-20 px-6 min-h-screen bg-[var(--bg-main)] transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section with Advanced Avatar Control */}
        <header className="flex flex-col md:flex-row items-center gap-10 animate-fade">
          <div className="relative group">
            <div className="w-48 h-48 rounded-[3.5rem] overflow-hidden border-4 border-white bg-white shadow-2xl flex items-center justify-center transition-all duration-700 group-hover:scale-[1.02] group-hover:rotate-1 relative">
              {avatar ? (
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[var(--primary)]/5 flex items-center justify-center">
                  <i className="fa-solid fa-user-circle text-6xl text-[var(--primary)]/20"></i>
                </div>
              )}
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-10 h-10 bg-white text-[var(--primary)] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                  title="Change Image"
                >
                  <i className="fa-solid fa-pen text-sm"></i>
                </button>
                {avatar && (
                  <button 
                    onClick={removeAvatar}
                    className="w-10 h-10 bg-white text-rose-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                    title="Remove Image"
                  >
                    <i className="fa-solid fa-trash-can text-sm"></i>
                  </button>
                )}
              </div>
            </div>
            
            {/* Direct Camera Button for Mobile/Quick Access */}
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 w-14 h-14 bg-[var(--primary)] text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-[var(--text-primary)] transition-all duration-300 border-4 border-[var(--bg-main)]"
              title="Upload New Perspective"
            >
              <i className="fa-solid fa-camera-retro text-xl"></i>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>

          <div className="text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--primary)]/10 rounded-full text-[var(--primary)] text-[10px] font-bold uppercase tracking-[0.3em]">
              <i className="fa-solid fa-sparkles text-[8px]"></i>
              Verified Presence
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[var(--text-primary)] tracking-tight">{name || 'Seeker of Peace'}</h1>
            <p className="text-xl text-[var(--text-secondary)] font-light max-w-sm italic leading-relaxed">"The version of you today is enough."</p>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Identity Form */}
          <div className="lg:col-span-2 space-y-8 animate-fade [animation-delay:200ms]">
            <form onSubmit={handleSave} className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-sm border border-[var(--divider)] space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              
              <div className="grid md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] ml-2">Display Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-6 py-5 rounded-[2rem] bg-[var(--bg-main)]/30 border-2 border-transparent focus:border-[var(--primary)]/30 focus:bg-white text-[var(--text-primary)] font-medium outline-none transition-all placeholder:text-[var(--text-muted)]"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] ml-2">Email Connection</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-6 py-5 rounded-[2rem] bg-[var(--bg-main)]/30 border-2 border-transparent focus:border-[var(--primary)]/30 focus:bg-white text-[var(--text-primary)] font-medium outline-none transition-all placeholder:text-[var(--text-muted)]"
                  />
                </div>
              </div>

              <div className="space-y-3 relative z-10">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] ml-2">Personal Mantra</label>
                <textarea 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="What grounds you today?"
                  className="w-full px-8 py-6 rounded-[2.5rem] bg-[var(--bg-main)]/30 border-2 border-transparent focus:border-[var(--primary)]/30 focus:bg-white text-[var(--text-primary)] font-light outline-none h-40 resize-none transition-all leading-relaxed placeholder:text-[var(--text-muted)]"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[var(--divider)] relative z-10">
                <div className="min-h-[24px]">
                  {showSuccess && (
                    <div className="flex items-center gap-3 text-[var(--primary)] animate-fade">
                      <div className="w-5 h-5 bg-[var(--primary)]/10 rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-check text-[10px]"></i>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest">Sanctuary Synced</span>
                    </div>
                  )}
                </div>
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="px-14 py-6 bg-[var(--primary)] text-white rounded-[2rem] font-bold text-lg shadow-2xl shadow-[var(--primary)]/20 hover:bg-[var(--text-primary)] hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 disabled:translate-y-0"
                >
                  {isSaving ? (
                    <span className="flex items-center gap-4">
                      <i className="fa-solid fa-circle-notch animate-spin"></i> Harmonizing...
                    </span>
                  ) : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>

          {/* Secondary Info/Settings Sidebar */}
          <aside className="space-y-8 animate-fade [animation-delay:400ms]">
            <div className="bg-white rounded-[3rem] p-10 text-[var(--text-primary)] border border-[var(--divider)] space-y-8 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none"></div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[var(--primary)]">Status</p>
                <h3 className="text-3xl font-serif font-bold italic">Sanctuary Plus</h3>
              </div>
              <div className="pt-6 border-t border-[var(--divider)] space-y-5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[var(--text-muted)] font-medium">Joined</span>
                  <span className="font-bold text-[var(--text-primary)]">October 2023</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[var(--text-muted)] font-medium">Logged Moments</span>
                  <span className="font-bold text-[var(--text-primary)]">142 Entries</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[var(--text-muted)] font-medium">Data Sovereignty</span>
                  <span className="text-[var(--primary)] font-bold">Encrypted</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Privacy Control', icon: 'fa-shield-halved', color: 'bg-[var(--primary)]/10 text-[var(--primary)]' },
                { label: 'Security Access', icon: 'fa-fingerprint', color: 'bg-[var(--text-primary)]/5 text-[var(--text-primary)]' },
              ].map((link, i) => (
                <button key={i} className="w-full flex items-center justify-between p-7 bg-white rounded-[2.5rem] border border-[var(--divider)] shadow-sm hover:scale-[1.02] hover:shadow-md transition-all group">
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 ${link.color} rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12`}>
                      <i className={`fa-solid ${link.icon}`}></i>
                    </div>
                    <span className="text-sm font-bold text-[var(--text-primary)] tracking-wide">{link.label}</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-[10px] text-[var(--text-muted)] group-hover:translate-x-1 transition-transform"></i>
                </button>
              ))}
            </div>

            <button className="w-full py-6 text-xs font-bold uppercase tracking-[0.4em] text-[var(--sos-bg)] hover:text-white hover:bg-[var(--sos-bg)] transition-all border-2 border-dashed border-[var(--sos-bg)]/20 rounded-[2rem] mt-4">
              Logout of Sanctuary
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
