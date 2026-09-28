'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { updateUserProfile, logout } from '@/redux/slices/authSlice';
import {
  Building2,
  Shield,
  ShieldCheck,
  KeyRound,
  Globe,
  MapPin,
  Mail,
  Save,
  LogOut,
  Share2,
} from 'lucide-react';
import { ShareProfileModal } from '@/components/shared/ShareProfileModal';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { Input, message } from 'antd';

export default function BrandSettingsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState<'company' | 'security'>('company');

  // Company Profile Form States
  const [companyName, setCompanyName] = useState(currentUser?.companyName || 'Aura Skincare Paris');
  const [contactName, setContactName] = useState(currentUser?.name || 'Elena Rostova');
  const [email, setEmail] = useState(currentUser?.email || 'elena@aura-cosmetics.com');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [website, setWebsite] = useState('https://aura-skincare.com');
  const [location, setLocation] = useState(currentUser?.location || 'Berlin & Paris');
  const [bio, setBio] = useState(currentUser?.bio || 'Brand Lead at Aura Skincare developing organic beauty and wellness product launches.');
  const [industry, setIndustry] = useState('Beauty, Cosmetics & Wellness');

  // Security Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactName.trim()) {
      message.error('Company name and contact person are required.');
      return;
    }

    dispatch(
      updateUserProfile({
        name: contactName,
        companyName,
        email,
        avatar,
        location,
        bio,
      })
    );

    message.success('Brand organization details updated successfully!');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      message.error('Please enter current password.');
      return;
    }
    if (newPassword.length < 8) {
      message.error('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      message.error('New password and confirmation do not match.');
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    message.success('Password updated successfully!');
  };

  const handleLogout = () => {
    dispatch(logout());
    message.success('Signed out successfully');
    router.push('/login');
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Organization Settings"
        subtitle="Manage brand profile, contact information, and account security."
        action={
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="h-10 px-4 rounded-full font-bold text-sm bg-white border border-[#D2D2CA] text-[#0A0A0A] hover:border-[#0A0A0A] flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <Share2 className="w-4 h-4 text-[#0A0A0A]" />
              <span>Share Brand</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="h-10 px-4 rounded-full font-bold text-sm bg-[#FAFAF8] border border-[#E7E7E2] hover:border-rose-300 hover:bg-rose-50 text-[#73736A] hover:text-rose-600 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        }
      />

      <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-1.5 border border-[#E7E7E2] inline-flex items-center gap-1 shadow-2xs w-fit max-w-full overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('company')}
            className={`py-2.5 px-4 sm:px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'company'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Building2 className={`w-4 h-4 shrink-0 ${activeTab === 'company' ? 'text-white' : 'text-[#73736A]'}`} />
            <span className="whitespace-nowrap">Company Profile</span>
          </button>


          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`py-2.5 px-4 sm:px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Shield className={`w-4 h-4 shrink-0 ${activeTab === 'security' ? 'text-white' : 'text-[#73736A]'}`} />
            <span className="whitespace-nowrap">Security</span>
          </button>
        </div>

        {/* TAB 1: COMPANY PROFILE */}
        {activeTab === 'company' && (
          <form onSubmit={handleSaveCompany} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="pb-4 border-b border-[#E7E7E2]">
                <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">Brand Identity</h2>
              </div>

              {/* Brand Logo Image Upload */}
              <div className="p-5 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2]">
                <ImageUpload
                  variant="avatar"
                  label="Brand Logo"
                  description="PNG, JPG, or SVG up to 5MB"
                  value={avatar}
                  onChange={(img) => setAvatar(img)}
                />
              </div>

              {/* Company Name & Contact Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Company / Brand Name</label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="rounded-xl h-10 text-sm font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Contact Person</label>
                  <Input
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="rounded-xl h-10 text-sm font-semibold"
                    required
                  />
                </div>
              </div>

              {/* Email, Website & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Work Email</label>
                  <Input
                    prefix={<Mail className="w-3.5 h-3.5 text-[#73736A]" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl h-10 text-sm font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Website</label>
                  <Input
                    prefix={<Globe className="w-3.5 h-3.5 text-[#73736A]" />}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="rounded-xl h-10 text-sm font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Location</label>
                  <Input
                    prefix={<MapPin className="w-3.5 h-3.5 text-[#73736A]" />}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="rounded-xl h-10 text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Industry & Bio */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Industry</label>
                <Input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="rounded-xl h-10 text-sm font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Brand Story & Guidelines</label>
                <Input.TextArea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="rounded-xl text-sm font-medium"
                  placeholder="Share brand aesthetic, target audience, and campaign guidelines..."
                />
              </div>

              <div className="pt-4 border-t border-[#E7E7E2] flex items-center justify-end">
                <button
                  type="submit"
                  className="h-11 px-7 rounded-full font-bold text-sm bg-[#0A0A0A] hover:bg-zinc-800 text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </form>
        )}


        {/* TAB 2: SECURITY & PASSWORD */}
        {activeTab === 'security' && (
          <div className="space-y-8">
            {/* Password Update Card */}
            <form onSubmit={handleUpdatePassword} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E7E7E2]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center shrink-0">
                    <KeyRound className="w-5 h-5 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                      Password & Authentication
                    </h2>
                    <p className="text-sm text-[#73736A] mt-0.5">
                      Ensure your account is protected with a secure password and credential hygiene.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Content - 2-Column Responsive Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left side: Inputs */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-[#0A0A0A]">Current Password</label>
                      <Link
                        href="/forgot-password"
                        className="text-xs font-bold text-[#73736A] hover:text-[#FF2D78] transition-colors"
                      >
                        Forgot current password?
                      </Link>
                    </div>
                    <Input.Password
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="rounded-xl h-11 text-sm font-medium"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-[#0A0A0A]">New Password</label>
                      <Input.Password
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min. 8 characters"
                        className="rounded-xl h-11 text-sm font-medium"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-[#0A0A0A]">Confirm New Password</label>
                      <Input.Password
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat new password"
                        className="rounded-xl h-11 text-sm font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="h-11 px-7 rounded-full font-bold text-sm bg-[#0A0A0A] hover:bg-zinc-800 text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <KeyRound className="w-4 h-4" />
                      <span>Update Password</span>
                    </button>
                  </div>
                </div>

                {/* Right side: Security Requirements Guide Card */}
                <div className="lg:col-span-5 bg-[#FAFAF8] rounded-2xl p-5 border border-[#E7E7E2] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0A0A0A]">
                    <ShieldCheck className="w-4 h-4 text-[#FF2D78]" />
                    <span>Password Security Guidelines</span>
                  </div>
                  <ul className="space-y-2 text-xs font-medium text-[#73736A]">
                    <li className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${newPassword.length >= 8 ? 'bg-[#0A0A0A]' : 'bg-[#D2D2CA]'}`} />
                      <span>Minimum 8 characters in length</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(newPassword) ? 'bg-[#0A0A0A]' : 'bg-[#D2D2CA]'}`} />
                      <span>Include at least one number (0–9)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${newPassword && newPassword === confirmPassword ? 'bg-[#0A0A0A]' : 'bg-[#D2D2CA]'}`} />
                      <span>New passwords must match</span>
                    </li>
                  </ul>
                  <div className="pt-2 border-t border-[#E7E7E2] text-[11px] text-[#73736A] leading-relaxed">
                    Strong passwords protect your brand campaign agreements, escrow funds, and team communications.
                  </div>
                </div>
              </div>
            </form>

            {/* Session Management & Devices Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E2]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                      Active Brand Session
                    </h2>
                    <p className="text-sm text-[#73736A] mt-0.5">
                      Review devices authenticated in your brand workspace.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] gap-4">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-[#0A0A0A]">
                    Windows PC • Chrome Browser
                  </div>
                  <div className="text-sm text-[#73736A]">
                    Current active session • Paris, France
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2]">
                    This Device
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="h-9 px-4 rounded-full font-bold text-xs bg-white border border-[#E7E7E2] hover:border-rose-300 hover:bg-rose-50 text-rose-600 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Share Brand Profile Modal */}
      <ShareProfileModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={companyName}
        subtitle={`${industry} • Verified Brand on Influverse`}
        shareUrl="/brand/settings"
        avatar={avatar}
        role="brand"
      />
    </div>
  );
}
