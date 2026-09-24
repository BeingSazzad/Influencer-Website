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
  KeyRound,
  Globe,
  MapPin,
  Mail,
  Save,
  Receipt,
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

  const [activeTab, setActiveTab] = useState<'company' | 'billing' | 'security'>('company');

  // Company Profile Form States
  const [companyName, setCompanyName] = useState(currentUser?.companyName || 'Aura Skincare Paris');
  const [contactName, setContactName] = useState(currentUser?.name || 'Elena Rostova');
  const [email, setEmail] = useState(currentUser?.email || 'elena@aura-cosmetics.com');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [website, setWebsite] = useState('https://aura-skincare.com');
  const [location, setLocation] = useState(currentUser?.location || 'Berlin & Paris');
  const [bio, setBio] = useState(currentUser?.bio || 'Brand Lead at Aura Skincare developing organic beauty and wellness product launches.');
  const [industry, setIndustry] = useState('Beauty, Cosmetics & Wellness');

  // Billing & VAT Form States
  const [legalEntity, setLegalEntity] = useState('Aura Cosmetics SAS');
  const [vatNumber, setVatNumber] = useState('FR84920194832');
  const [billingAddress, setBillingAddress] = useState('24 Rue du Faubourg Saint-Honoré, 75008 Paris, France');

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

  const handleSaveBilling = (e: React.FormEvent) => {
    e.preventDefault();
    message.success('Billing & EU VAT details saved for automated invoice generation!');
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
        subtitle="Manage brand profile, billing details, and account security."
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
            onClick={() => setActiveTab('billing')}
            className={`py-2.5 px-4 sm:px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'billing'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Receipt className={`w-4 h-4 shrink-0 ${activeTab === 'billing' ? 'text-white' : 'text-[#73736A]'}`} />
            <span className="whitespace-nowrap">Billing & VAT</span>
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

        {/* TAB 2: BILLING & EU VAT */}
        {activeTab === 'billing' && (
          <form onSubmit={handleSaveBilling} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="pb-4 border-b border-[#E7E7E2]">
                <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">Billing & VAT</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Legal Entity Name</label>
                  <Input
                    value={legalEntity}
                    onChange={(e) => setLegalEntity(e.target.value)}
                    className="rounded-xl h-10 text-sm font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">VAT ID Number</label>
                  <Input
                    value={vatNumber}
                    onChange={(e) => setVatNumber(e.target.value)}
                    placeholder="e.g. FR84920194832"
                    className="rounded-xl h-10 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Billing Address</label>
                <Input.TextArea
                  rows={2}
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  className="rounded-xl text-sm font-medium"
                />
              </div>

              <div className="pt-4 border-t border-[#E7E7E2] flex items-center justify-end">
                <button
                  type="submit"
                  className="h-11 px-7 rounded-full font-bold text-sm bg-[#0A0A0A] hover:bg-zinc-800 text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Billing Details</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 3: SECURITY & PASSWORD */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <form onSubmit={handleUpdatePassword} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="pb-4 border-b border-[#E7E7E2]">
                <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">Password & Authentication</h2>
              </div>

              <div className="space-y-4 max-w-md">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Current Password</label>
                  <Input.Password
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="rounded-xl h-10 text-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">New Password</label>
                  <Input.Password
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="rounded-xl h-10 text-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Confirm New Password</label>
                  <Input.Password
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="rounded-xl h-10 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E7E2] flex items-center justify-between flex-wrap gap-3">
                <Link href="/forgot-password" className="text-sm font-bold text-[#73736A] hover:text-[#0A0A0A] transition-colors">
                  Forgot current password? Reset via email
                </Link>

                <button
                  type="submit"
                  className="h-11 px-7 rounded-full font-bold text-sm bg-[#0A0A0A] hover:bg-zinc-800 text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Update Password</span>
                </button>
              </div>
            </form>

            {/* Session Management & Explicit Logout */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-2xl font-extrabold text-[#0A0A0A]">Active Brand Session</div>
                  <p className="text-sm text-[#73736A]">
                    You are currently authenticated in Brand Workspace from this browser.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="h-10 px-5 rounded-full font-bold text-sm bg-[#FAFAF8] border border-[#E7E7E2] hover:border-rose-300 hover:bg-rose-50 text-rose-600 flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Session</span>
                </button>
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
