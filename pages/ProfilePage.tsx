
import React, { useState, useRef } from 'react';
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API delay
    setTimeout(() => {
      onUpdate({
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
    <div className="pt-24 pb-12 px-6 min-h-screen bg-[#F4FAF8]">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-serif font-bold text-[#2F4F4F]">Your Haven</h1>
          <p className="text-[#2F4F4F]/60">Customize your space and personal identity.</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white p-8 md:p-12 shadow-sm space-y-10">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#8FB9A8]/20 bg-gray-50 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                {avatar ? (
                  <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <i className="fa-solid fa-user text-5xl text-[#2F4F4F]/20"></i>
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-10 h-10 bg-[#8FB9A8] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#7BA696] transition-colors border-2 border-white"
                title="Change Photo"
              >
                <i className="fa-solid fa-camera text-sm"></i>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-[#2F4F4F]">{name}</p>
              <p className="text-xs text-[#2F4F4F]/40 uppercase tracking-widest">{email}</p>
            </div>
          </div>

          {/* Settings Form */}
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2F4F4F]/40 ml-1">Display Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-100 focus:border-[#8FB9A8] focus:ring-4 focus:ring-[#8FB9A8]/10 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2F4F4F]/40 ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-100 focus:border-[#8FB9A8] focus:ring-4 focus:ring-[#8FB9A8]/10 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2F4F4F]/40 ml-1">Personal Mantra / Bio</label>
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share a thought that keeps you grounded..."
                className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-100 focus:border-[#8FB9A8] focus:ring-4 focus:ring-[#8FB9A8]/10 transition-all outline-none h-24 resize-none"
              ></textarea>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {showSuccess && (
                  <span className="text-green-500 text-sm font-bold animate-bounce flex items-center gap-1">
                    <i className="fa-solid fa-circle-check"></i> Changes saved!
                  </span>
                )}
              </div>
              <button 
                type="submit"
                disabled={isSaving}
                className="px-8 py-4 bg-[#2F4F4F] text-white rounded-2xl font-bold shadow-lg shadow-[#2F4F4F]/10 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50"
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-circle-notch animate-spin"></i> Saving...
                  </span>
                ) : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Security & Support Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/60 p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4 group hover:bg-white transition-all cursor-pointer">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-lock"></i>
            </div>
            <div>
              <h4 className="font-bold text-[#2F4F4F]">Security Settings</h4>
              <p className="text-xs text-[#2F4F4F]/60">Manage password and 2FA.</p>
            </div>
          </div>
          <div className="bg-white/60 p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4 group hover:bg-white transition-all cursor-pointer">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-circle-info"></i>
            </div>
            <div>
              <h4 className="font-bold text-[#2F4F4F]">Privacy Policy</h4>
              <p className="text-xs text-[#2F4F4F]/60">How we protect your peace.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
