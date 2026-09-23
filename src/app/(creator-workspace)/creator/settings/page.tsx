'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import {
  updateUserProfile,
  scheduleDeactivation,
  cancelDeactivation,
} from '@/redux/slices/authSlice';
import {
  Shield,
  KeyRound,
  Bell,
  AlertTriangle,
  User,
  ArrowRight,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Calendar,
  RotateCcw,
  Lock,
} from 'lucide-react';
import { Input, Button, message, Switch, Modal } from 'antd';

function CreatorSettingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  // Tab State: account | security | notifications
  const initialTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'account' | 'security' | 'notifications'>(
    initialTab === 'security'
      ? 'security'
      : initialTab === 'notifications'
      ? 'notifications'
      : 'account'
  );

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'profile' || tab === 'socials') {
      router.replace('/creator/profile');
    } else if (tab === 'portfolio' || tab === 'gallery') {
      router.replace('/creator/portfolio');
    } else if (tab === 'security' || tab === 'notifications' || tab === 'account') {
      setActiveTab(tab);
    }
  }, [searchParams, router]);

  // Account Form State (Private Authentication Credentials)
  const [accountEmail, setAccountEmail] = useState(currentUser?.email || 'sophie@sophiekim.com');
  const [accountPhone, setAccountPhone] = useState(currentUser?.phone || '+1 (555) 234-5678');

  // Security Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification Preferences States
  const [notifyOffers, setNotifyOffers] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyDeliverables, setNotifyDeliverables] = useState(true);
  const [notifyPayouts, setNotifyPayouts] = useState(true);

  // 15-Day Deactivation & Security Password Verification States
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [deactivatePassword, setDeactivatePassword] = useState('');
  const [deactivateError, setDeactivateError] = useState('');

  const formatDeactivationDate = (dateStr?: string | null) => {
    if (!dateStr) return '15 days from now';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const getRemainingDays = (dateStr?: string | null) => {
    if (!dateStr) return 15;
    try {
      const target = new Date(dateStr).getTime();
      const now = Date.now();
      const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
      return Math.max(1, Math.min(15, diffDays));
    } catch {
      return 15;
    }
  };

  const handleConfirmDeactivate = () => {
    if (!deactivatePassword.trim()) {
      setDeactivateError('Please enter your account password to authorize deactivation.');
      return;
    }
    if (deactivatePassword.length < 6) {
      setDeactivateError('Password must be at least 6 characters.');
      return;
    }

    dispatch(scheduleDeactivation());
    setIsDeactivateModalOpen(false);
    setDeactivatePassword('');
    setDeactivateError('');
    message.warning('Account scheduled for deactivation. You have 15 days to undo.');
  };

  const handleCancelDeactivation = () => {
    dispatch(cancelDeactivation());
    message.success('Account deactivation canceled! Your creator profile and packages are live again.');
  };

  const handleSaveAccountInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountEmail.trim() || !accountEmail.includes('@')) {
      message.error('Please enter a valid email address.');
      return;
    }
    dispatch(updateUserProfile({ email: accountEmail.trim(), phone: accountPhone.trim() }));
    message.success('Account credentials updated successfully.');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      message.error('Please enter your current password.');
      return;
    }
    if (newPassword.length < 8) {
      message.error('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      message.error('New passwords do not match.');
      return;
    }

    message.success('Password updated successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSaveNotifications = () => {
    message.success('Notification preferences saved.');
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Account & Security Settings"
        subtitle="Manage private login credentials, security recovery phone, notifications, and active devices."
        action={
          <Link href="/creator/profile">
            <Button
              type="default"
              className="h-10 px-4 rounded-full font-bold text-sm border-[#D2D2CA] text-[#0A0A0A] flex items-center gap-2 hover:border-[#0A0A0A]"
            >
              <User className="w-4 h-4 text-[#73736A]" />
              <span>Go to Public Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-8">
        {/* Navigation Tabs - Order and Typography Matching System Standards */}
        <div className="bg-white rounded-2xl p-1.5 border border-[#E7E7E2] inline-flex items-center gap-1 shadow-2xs w-fit max-w-full overflow-x-auto">
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
            <span>Security &amp; Login</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('notifications')}
            className={`py-2.5 px-4 sm:px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Bell className={`w-4 h-4 shrink-0 ${activeTab === 'notifications' ? 'text-white' : 'text-[#73736A]'}`} />
            <span>Notifications</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('account')}
            className={`py-2.5 px-4 sm:px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'account'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Lock className={`w-4 h-4 shrink-0 ${activeTab === 'account' ? 'text-white' : 'text-[#73736A]'}`} />
            <span>Account</span>
          </button>
        </div>

        {/* Tab 1: Account Information (Private Credentials & Deactivation) */}
        {activeTab === 'account' && (
          <div className="space-y-6">
            {/* If Deactivation Scheduled: 15-day Grace Period Active Banner */}
            {currentUser?.isDeactivated && (
              <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/90 border border-amber-300 shadow-2xs space-y-3.5">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-black text-amber-950">
                        Account Deactivation in Progress
                      </h3>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300/80">
                        {getRemainingDays(currentUser?.deactivationScheduledFor)} Days Left to Undo
                      </span>
                    </div>
                    <p className="text-xs text-amber-900/85 leading-relaxed">
                      Your profile and listings are currently hidden from search. You have a <strong>15-day grace period</strong> ending on <strong>{formatDeactivationDate(currentUser?.deactivationScheduledFor)}</strong>. You can undo this deactivation anytime before this deadline to restore your full profile.
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-amber-200 flex items-center justify-between flex-wrap gap-3">
                  <span className="text-xs text-amber-800 font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Scheduled permanent deletion on: {formatDeactivationDate(currentUser?.deactivationScheduledFor)}
                  </span>
                  <button
                    type="button"
                    onClick={handleCancelDeactivation}
                    className="h-10 px-5 rounded-full font-bold text-xs bg-[#0A0A0A] hover:bg-zinc-800 text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Undo Deactivation &amp; Keep Account</span>
                  </button>
                </div>
              </div>
            )}

            {/* Account Information Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="pb-4 border-b border-[#E7E7E2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-[#0A0A0A] tracking-tight">
                    Account Information
                  </h2>
                  <p className="text-xs text-[#73736A] mt-0.5 font-medium">
                    Update your primary login email and contact details.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] text-xs font-bold border border-[#23744D]/20 shrink-0 w-fit">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Creator</span>
                </div>
              </div>

              <form onSubmit={handleSaveAccountInfo} className="space-y-5 max-w-xl">
                <div>
                  <label className="text-xs font-bold text-[#0A0A0A] block mb-1.5">
                    Primary Login Email
                  </label>
                  <Input
                    prefix={<Mail className="w-4 h-4 text-[#73736A] mr-0.5" />}
                    type="email"
                    value={accountEmail}
                    onChange={(e) => setAccountEmail(e.target.value)}
                    placeholder="sophie@sophiekim.com"
                    className="h-11 rounded-xl font-medium text-sm border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                  />
                  <span className="text-xs text-[#73736A] mt-1.5 block">
                    Used for platform authentication, order alerts, and payout notifications.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0A0A0A] block mb-1.5">
                    Emergency Contact / Phone
                  </label>
                  <Input
                    prefix={<Phone className="w-4 h-4 text-[#73736A] mr-0.5" />}
                    type="tel"
                    value={accountPhone}
                    onChange={(e) => setAccountPhone(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    className="h-11 rounded-xl font-medium text-sm border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                  />
                  <span className="text-xs text-[#73736A] mt-1.5 block">
                    Private phone number for critical security alerts and account recovery.
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] text-xs text-[#52524E] space-y-1.5">
                  <div className="flex items-center justify-between font-semibold">
                    <span>Member ID:</span>
                    <span className="font-sans font-bold text-[#0A0A0A]">{currentUser?.id || 'creator-01'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Account Role:</span>
                    <span className="capitalize font-sans font-bold text-[#0A0A0A]">{currentUser?.role || 'creator'}</span>
                  </div>
                </div>

                <div className="pt-1">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="h-10 px-6 rounded-full font-bold text-xs bg-[#0A0A0A] hover:!bg-zinc-800 text-white border-none shadow-sm cursor-pointer"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>

            {/* Cross-Link Card to Public Creator Profile Studio */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E7E7E2] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#0A0A0A]">
                  Looking to update your public media kit, editorial bio, or rate card?
                </h4>
                <p className="text-xs text-[#73736A]">
                  Brands see your bio, aesthetic lookbook gallery, and rates in your Public Profile Studio.
                </p>
              </div>
              <Link href="/creator/profile">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-[#D2D2CA] hover:border-[#0A0A0A] bg-white hover:bg-[#FAFAF8] text-[#0A0A0A] text-xs font-bold transition-all shadow-2xs whitespace-nowrap cursor-pointer"
                >
                  <span>Edit Public Profile Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>

            {/* Danger Zone Card */}
            <div className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-2xs space-y-4 ${currentUser?.isDeactivated ? 'border-amber-300' : 'border-rose-200'}`}>
              <div className={`flex items-center gap-2 pb-3 border-b ${currentUser?.isDeactivated ? 'border-amber-200 text-amber-800' : 'border-rose-100 text-rose-600'}`}>
                <AlertTriangle className="w-5 h-5" />
                <h2 className="text-base font-black">
                  {currentUser?.isDeactivated ? 'Account Status: Deactivation Scheduled' : 'Danger Zone'}
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-[#0A0A0A]">
                    {currentUser?.isDeactivated ? '15-Day Grace Period is Active' : 'Deactivate Creator Account'}
                  </div>
                  <div className="text-xs text-[#73736A]">
                    {currentUser?.isDeactivated
                      ? `Your account will be permanently deactivated on ${formatDeactivationDate(currentUser?.deactivationScheduledFor)}. You can undo this anytime before this date.`
                      : 'Temporarily hide your profile from search results and pause incoming offers. Includes a 15-day grace period to undo.'}
                  </div>
                </div>

                {currentUser?.isDeactivated ? (
                  <Button
                    type="primary"
                    onClick={handleCancelDeactivation}
                    className="h-10 px-5 rounded-full font-bold text-xs bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Undo Deactivation</span>
                  </Button>
                ) : (
                  <Button
                    danger
                    type="primary"
                    onClick={() => {
                      setDeactivatePassword('');
                      setDeactivateError('');
                      setIsDeactivateModalOpen(true);
                    }}
                    className="h-10 px-5 rounded-full font-bold text-xs bg-rose-600 hover:!bg-rose-700 text-white border-none shadow-xs cursor-pointer shrink-0"
                  >
                    Deactivate Account
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Password & Security */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Password Update Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E7E7E2]">
                <div className="w-10 h-10 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center">
                  <KeyRound className="w-5 h-5 text-[#0A0A0A]" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-[#0A0A0A]">Change Password</h2>
                  <p className="text-xs text-[#73736A] mt-0.5">Ensure your account is protected with a secure password.</p>
                </div>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-xl">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0A0A0A] block mb-1">Current Password</label>
                  <Input.Password
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="rounded-xl h-11 text-sm border-[#E7E7E2]"
                    placeholder="Enter current password"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0A0A0A] block mb-1">New Password</label>
                    <Input.Password
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="rounded-xl h-11 text-sm border-[#E7E7E2]"
                      placeholder="Min. 8 characters"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0A0A0A] block mb-1">Confirm Password</label>
                    <Input.Password
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="rounded-xl h-11 text-sm border-[#E7E7E2]"
                      placeholder="Repeat new password"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="h-10 px-6 rounded-full font-bold text-xs bg-[#0A0A0A] hover:!bg-zinc-800 text-white border-none shadow-sm cursor-pointer"
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </div>

            {/* Active Sessions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
              <div className="pb-3 border-b border-[#E7E7E2]">
                <h2 className="text-base sm:text-lg font-black text-[#0A0A0A]">Active Devices &amp; Sessions</h2>
                <p className="text-xs text-[#73736A] mt-0.5">Review devices currently logged into your creator account.</p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[#0A0A0A]">Windows PC • Chrome Browser</div>
                  <div className="text-xs text-[#73736A]">Current active session • Milan, Italy</div>
                </div>
                <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D]">
                  This Device
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Notification Preferences */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
            <div className="pb-4 border-b border-[#E7E7E2]">
              <h2 className="text-base sm:text-lg font-black text-[#0A0A0A]">Notification Preferences</h2>
              <p className="text-xs text-[#73736A] mt-0.5">Choose what alerts you receive in your inbox and dashboard.</p>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-[#0A0A0A]">New Campaign Offers</div>
                  <div className="text-xs text-[#73736A]">Receive instant emails when brands send direct bookings.</div>
                </div>
                <Switch checked={notifyOffers} onChange={setNotifyOffers} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-[#0A0A0A]">Direct Messages</div>
                  <div className="text-xs text-[#73736A]">Get notified when brand representatives message you.</div>
                </div>
                <Switch checked={notifyMessages} onChange={setNotifyMessages} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-[#0A0A0A]">Deliverable Reviews &amp; Approvals</div>
                  <div className="text-xs text-[#73736A]">Alerts when brands review or request changes on video drafts.</div>
                </div>
                <Switch checked={notifyDeliverables} onChange={setNotifyDeliverables} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-[#0A0A0A]">Payouts &amp; Escrow Releases</div>
                  <div className="text-xs text-[#73736A]">Confirmations when escrow funds are transferred to your bank.</div>
                </div>
                <Switch checked={notifyPayouts} onChange={setNotifyPayouts} />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="primary"
                onClick={handleSaveNotifications}
                className="h-10 px-6 rounded-full font-bold text-xs bg-[#0A0A0A] hover:!bg-zinc-800 text-white border-none shadow-sm cursor-pointer"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Deactivate Creator Account Modal with 15-Day Policy & Password Protection */}
      <Modal
        title={
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#E7E7E2]">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-black text-[#0A0A0A] tracking-tight">
                Deactivate Creator Account
              </div>
              <div className="text-xs text-[#73736A] font-medium">
                15-day reversible grace period with password verification
              </div>
            </div>
          </div>
        }
        open={isDeactivateModalOpen}
        onCancel={() => {
          setIsDeactivateModalOpen(false);
          setDeactivatePassword('');
          setDeactivateError('');
        }}
        footer={null}
        width={540}
        centered
        destroyOnClose
        className="rounded-3xl"
      >
        <div className="py-3 space-y-4 font-sans">
          {/* 15-day policy notice */}
          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-2.5 text-xs text-[#52524E]">
            <div className="font-bold text-[#0A0A0A] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
              <span>How the 15-Day Grace Period Works:</span>
            </div>
            <ul className="space-y-1.5 pl-5 list-disc text-[#73736A]">
              <li>
                <strong className="text-[#0A0A0A]">Immediate Privacy:</strong> Your public profile, lookbook, and packages will be hidden from brand discovery immediately.
              </li>
              <li>
                <strong className="text-[#0A0A0A]">Escrow &amp; Balances Safe:</strong> Ongoing orders and escrow balances remain 100% protected and accessible.
              </li>
              <li>
                <strong className="text-[#0A0A0A]">15 Days to Undo:</strong> If you change your mind, simply log in or visit your settings anytime within 15 days to undo deactivation with 1 click.
              </li>
              <li>
                <strong className="text-[#0A0A0A]">Permanent Deletion:</strong> After 15 days, account closure becomes permanent.
              </li>
            </ul>
          </div>

          {/* Password Confirmation */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0A0A0A] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#73736A]" />
              <span>Enter Your Password to Authorize</span>
              <span className="text-rose-500">*</span>
            </label>
            <Input.Password
              value={deactivatePassword}
              onChange={(e) => {
                setDeactivatePassword(e.target.value);
                if (deactivateError) setDeactivateError('');
              }}
              placeholder="Enter your account password"
              className="h-11 rounded-xl text-sm border-[#E7E7E2]"
              status={deactivateError ? 'error' : undefined}
            />
            {deactivateError ? (
              <span className="text-xs text-rose-600 font-semibold block">{deactivateError}</span>
            ) : (
              <span className="text-xs text-[#73736A] block">
                Required for security verification before initiating the 15-day grace period.
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-[#E7E7E2] flex items-center justify-end gap-2.5">
            <Button
              onClick={() => {
                setIsDeactivateModalOpen(false);
                setDeactivatePassword('');
                setDeactivateError('');
              }}
              className="rounded-full h-10 px-5 font-bold text-xs"
            >
              Keep Account Active
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleConfirmDeactivate}
              className="h-10 px-6 rounded-full font-bold text-xs bg-rose-600 hover:!bg-rose-700 text-white border-none shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Authorize &amp; Deactivate (15 Days)</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function CreatorSettingsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-[#73736A]">Loading settings...</div>}>
      <CreatorSettingsContent />
    </Suspense>
  );
}
