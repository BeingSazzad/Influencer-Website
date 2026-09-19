'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateProfile } from '@/redux/slices/authSlice';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import {
  User,
  Building2,
  Mail,
  Phone,
  Instagram,
  Youtube,
  Linkedin,
  ShieldCheck,
  Sparkles,
  Camera
} from 'lucide-react';
import { Input, Button, message, Tag } from 'antd';

export default function AgentProfileEditorPage() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  const [name, setName] = useState(currentUser?.name || 'Sophia Vance');
  const [agency, setAgency] = useState(currentUser?.agency || 'Vance Luxury Realty & Media');
  const [email, setEmail] = useState(currentUser?.email || 'sophia@vancerealestate.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+1 (310) 555-0199');
  const [location, setLocation] = useState(currentUser?.location || 'Los Angeles & Miami');
  const [bio, setBio] = useState(
    currentUser?.bio ||
      'Top 1% Global Producer & Real Estate Content Creator with over 1.8M followers across YouTube & Instagram.'
  );
  const [instagram, setInstagram] = useState(currentUser?.socials?.instagram || '@sophiavancerealty');
  const [youtube, setYoutube] = useState(currentUser?.socials?.youtube || 'Sophia Vance Mansions');
  const [tiktok, setTiktok] = useState(currentUser?.socials?.tiktok || '@sophia.vance.estates');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        name,
        agency,
        email,
        phone,
        location,
        bio,
        socials: { instagram, youtube, tiktok },
      })
    );
    message.success('Influencer brand profile successfully updated!');
  };

  return (
    <div>
      <DashboardHeader
        title="Influencer Brand Profile"
        subtitle="Manage your public broker persona, social channel tags, and agency credentials"
      />

      <div className="p-6 sm:p-8 max-w-4xl space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Header Avatar & Tag */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'}
                    alt="Agent"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500/50 shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white">
                    <ShieldCheck className="w-3 h-3" />
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-950 font-serif">{name}</h3>
                  <p className="text-xs text-emerald-700 font-bold">{agency}</p>
                  <Tag color="gold" className="mt-1 font-bold text-[10px] uppercase">
                    Top 1% Global Producer
                  </Tag>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <Input
                  prefix={<User className="w-4 h-4 text-slate-400 mr-1" />}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Brokerage / Agency</label>
                <Input
                  prefix={<Building2 className="w-4 h-4 text-slate-400 mr-1" />}
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Direct Email</label>
                <Input
                  prefix={<Mail className="w-4 h-4 text-slate-400 mr-1" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Direct Phone / WhatsApp</label>
                <Input
                  prefix={<Phone className="w-4 h-4 text-slate-400 mr-1" />}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Social Channels */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Connected Creator Social Channels
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Instagram Handle</label>
                  <Input
                    prefix={<Instagram className="w-4 h-4 text-pink-600 mr-1" />}
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">YouTube Channel</label>
                  <Input
                    prefix={<Youtube className="w-4 h-4 text-rose-600 mr-1" />}
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    className="rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">TikTok Channel</label>
                  <Input
                    value={tiktok}
                    onChange={(e) => setTiktok(e.target.value)}
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Public Influencer Bio</label>
              <Input.TextArea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Button type="primary" htmlType="submit" className="font-bold h-11 px-8 rounded-xl">
                Save Brand Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
