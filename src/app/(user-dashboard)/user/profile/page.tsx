'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateProfile } from '@/redux/slices/authSlice';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { User, Mail, Phone, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Input, Button, message } from 'antd';

export default function UserProfilePage() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  const [name, setName] = useState(currentUser?.name || 'Alexander Sterling');
  const [email, setEmail] = useState(currentUser?.email || 'alexander@luxuryliving.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+1 (310) 892-4411');
  const [location, setLocation] = useState(currentUser?.location || 'Beverly Hills, California');
  const [bio, setBio] = useState(currentUser?.bio || 'Private investor acquiring prime architectural properties.');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, phone, location, bio }));
    message.success('Profile preferences successfully updated!');
  };

  return (
    <div>
      <DashboardHeader
        title="Buyer Account Settings"
        subtitle="Manage personal confidentiality settings and acquisition preferences"
      />

      <div className="p-6 sm:p-8 max-w-4xl space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt="Avatar"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200"
              />
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">{name}</h3>
                <p className="text-xs text-slate-500">Accredited VIP Investor</p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Identity Verified & Escrow Cleared</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Legal Name</label>
                <Input
                  prefix={<User className="w-4 h-4 text-slate-400 mr-1" />}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Confidential Email</label>
                <Input
                  prefix={<Mail className="w-4 h-4 text-slate-400 mr-1" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp</label>
                <Input
                  prefix={<Phone className="w-4 h-4 text-slate-400 mr-1" />}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primary Residence City</label>
                <Input
                  prefix={<MapPin className="w-4 h-4 text-slate-400 mr-1" />}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Investment & Architecture Criteria</label>
              <Input.TextArea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Button type="primary" htmlType="submit" className="font-bold h-11 px-8 rounded-xl">
                Save Preferences
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
