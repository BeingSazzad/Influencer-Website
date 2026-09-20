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
  CreditCard,
  KeyRound,
  Globe,
  MapPin,
  Mail,
  Camera,
  Save,
  CheckCircle2,
  Receipt,
  FileText,
  LogOut,
  Check,
  Sparkles,
  Share2,
} from 'lucide-react';
import { ShareProfileModal } from '@/components/shared/ShareProfileModal';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { Input, Button, message, Switch } from 'antd';

const BRAND_LOGO_PRESETS = [
  {
    label: 'Aura Skincare Paris',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Maison Luxe Paris',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Glow Botanical Labs',
    url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Nord Minimal Studios',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Vogue & Velour',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Apex Creative Co',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
];

export default function BrandSettingsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState<'company' | 'billing' | 'security'>('company');

  // Company Profile Form States
  const [companyName, setCompanyName] = useState(currentUser?.companyName || 'Aura Skincare Paris');
  const [contactName, setContactName] = useState(currentUser?.name || 'Elena Rostova');
  const [email, setEmail] = useState(currentUser?.email || 'elena@aura-cosmetics.com');
  const [avatar, setAvatar] = useState(currentUser?.avatar || BRAND_LOGO_PRESETS[0].url);
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
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
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
        title="Brand Organization & Account Settings"
        subtitle="Manage your brand company profile, EU VAT billing credentials, and security."
        action={
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="h-10 px-4 rounded-full font-bold text-sm bg-white border border-[#D2D2CA] text-[#0A0A0A] hover:border-[#FF2D78] flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <Share2 className="w-4 h-4 text-[#FF2D78]" />
              <span>Share Brand Hub</span>
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
        <div className="bg-white rounded-2xl p-1.5 border border-[#E7E7E2] flex flex-wrap gap-1 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab('company')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'company'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Building2 className={`w-4 h-4 ${activeTab === 'company' ? 'text-[#FF2D78]' : 'text-[#73736A]'}`} />
            <span>Company Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('billing')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'billing'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Receipt className={`w-4 h-4 ${activeTab === 'billing' ? 'text-[#FF2D78]' : 'text-[#73736A]'}`} />
            <span>Billing & EU VAT</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Shield className={`w-4 h-4 ${activeTab === 'security' ? 'text-[#FF2D78]' : 'text-[#73736A]'}`} />
            <span>Security & Password</span>
          </button>
        </div>

        {/* TAB 1: COMPANY PROFILE */}
        {activeTab === 'company' && (
          <form onSubmit={handleSaveCompany} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="pb-4 border-b border-[#E7E7E2]">
                <h2 className="text-lg font-black text-[#0A0A0A] tracking-tight">Brand Identity & Contact</h2>
                <p className="text-xs text-[#73736A] mt-0.5">This company branding appears on campaign offers sent to creators.</p>
              </div>

              {/* Brand Logo Image Upload (Direct Drag-and-Drop / File Picker) */}
              <div className="p-5 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2]">
                <ImageUpload
                  variant="avatar"
                  label="Brand Logo / Profile Picture"
                  description="Upload company logo (PNG, JPG, SVG, WEBP up to 10MB). Drag & drop or browse from device."
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
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Contact Person Name</label>
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
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Website URL</label>
                  <Input
                    prefix={<Globe className="w-3.5 h-3.5 text-[#73736A]" />}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="rounded-xl h-10 text-sm font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Headquarters / Location</label>
                  <Input
                    prefix={<MapPin className="w-3.5 h-3.5 text-[#FF2D78]" />}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="rounded-xl h-10 text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Industry & Bio */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Industry / Category</label>
                <Input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="rounded-xl h-10 text-sm font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Brand Story & Campaign Philosophy</label>
                <Input.TextArea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="rounded-xl text-sm font-medium"
                  placeholder="Tell creators about your brand values, target demographic, and preferred content aesthetic..."
                />
              </div>

              <div className="pt-4 border-t border-[#E7E7E2] flex items-center justify-end">
                <button
                  type="submit"
                  className="h-11 px-7 rounded-full font-bold text-sm bg-[#0A0A0A] hover:bg-[#FF2D78] text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Brand Settings</span>
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
                <h2 className="text-lg font-black text-[#0A0A0A] tracking-tight">EU VAT & Invoicing Details</h2>
                <p className="text-xs text-[#73736A] mt-0.5">Automated B2B invoices with reverse charge VAT calculation for European companies.</p>
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
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">EU VAT ID Number</label>
                  <Input
                    value={vatNumber}
                    onChange={(e) => setVatNumber(e.target.value)}
                    placeholder="e.g. FR84920194832"
                    className="rounded-xl h-10 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Official Billing Address</label>
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
                  className="h-11 px-7 rounded-full font-bold text-sm bg-[#0A0A0A] hover:bg-[#FF2D78] text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Billing Credentials</span>
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
                <h2 className="text-lg font-black text-[#0A0A0A] tracking-tight">Account Password & Authentication</h2>
                <p className="text-xs text-[#73736A] mt-0.5">Secure your brand escrow authorizations and hiring budget.</p>
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
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">New Password (min 8 characters)</label>
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
                <Link href="/forgot-password" className="text-xs font-bold text-[#73736A] hover:text-[#FF2D78] transition-colors">
                  Forgot current password? Reset via email
                </Link>

                <button
                  type="submit"
                  className="h-11 px-7 rounded-full font-bold text-sm bg-[#0A0A0A] hover:bg-[#FF2D78] text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Update Password</span>
                </button>
              </div>
            </form>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-base font-bold text-[#0A0A0A]">
                    <Shield className="w-5 h-5 text-[#23744D]" />
                    <span>Two-Factor Authentication (2FA)</span>
                  </div>
                  <p className="text-xs text-[#73736A]">
                    Require SMS or Authenticator verification for campaign payments exceeding €2,000.
                  </p>
                </div>

                <Switch
                  checked={twoFactorEnabled}
                  onChange={(checked) => {
                    setTwoFactorEnabled(checked);
                    message.success(checked ? '2FA Protection Enabled' : '2FA Protection Disabled');
                  }}
                />
              </div>
            </div>

            {/* Session Management & Explicit Logout */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-base font-bold text-[#0A0A0A]">Active Brand Session</div>
                  <p className="text-xs text-[#73736A]">
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
