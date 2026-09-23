'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { updateUserProfile } from '@/redux/slices/authSlice';
import {
  Shield,
  Lock,
  KeyRound,
  Bell,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  User,
  ArrowRight,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { Input, Button, message, Switch, Modal } from 'antd';

function CreatorSettingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  // Tab State: security | notifications | account
  const initialTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'security' | 'notifications' | 'account'>('security');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'profile' || tab === 'socials') {
      router.replace('/creator/profile');
    } else if (tab === 'portfolio' || tab === 'gallery') {
      router.replace('/creator/portfolio');
    } else if (tab === 'notifications' || tab === 'account') {
      setActiveTab(tab);
    }
  }, [searchParams, router]);

  // Security Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Notification Preferences States
  const [notifyOffers, setNotifyOffers] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyDeliverables, setNotifyDeliverables] = useState(true);
  const [notifyPayouts, setNotifyPayouts] = useState(true);

  // Account Form State
  const [accountEmail, setAccountEmail] = useState(currentUser?.email || 'sophie@sophiekim.com');
  const [accountPhone, setAccountPhone] = useState('+1 (555) 234-5678');

  // Modal State
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

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

  const handleSaveAccountInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountEmail.trim() || !accountEmail.includes('@')) {
      message.error('Please enter a valid email address.');
      return;
    }
    dispatch(updateUserProfile({ email: accountEmail.trim() }));
    message.success('Account information updated.');
  };

  const handleSaveNotifications = () => {
    message.success('Notification preferences saved.');
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Account & Security Settings"
        subtitle="Manage login security, authentication protocols, notifications, and session controls."
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
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-1.5 border border-[#E7E7E2] flex gap-1 shadow-2xs max-w-lg">
          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Shield className={`w-4 h-4 ${activeTab === 'security' ? 'text-white' : 'text-[#73736A]'}`} />
            <span>Security & Login</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Bell className={`w-4 h-4 ${activeTab === 'notifications' ? 'text-white' : 'text-[#73736A]'}`} />
            <span>Notifications</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('account')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'account'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Lock className={`w-4 h-4 ${activeTab === 'account' ? 'text-white' : 'text-[#73736A]'}`} />
            <span>Account</span>
          </button>
        </div>

        {/* Tab 1: Security & Login */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Password Update Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E7E7E2]">
                <div className="w-10 h-10 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center">
                  <KeyRound className="w-5 h-5 text-[#0A0A0A]" />
                </div>
                <div>
                  <h2 className="text-base font-black text-[#0A0A0A]">Change Password</h2>
                  <p className="text-xs text-[#73736A]">Ensure your account is protected with a secure password.</p>
                </div>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-xl">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Current Password</label>
                  <Input.Password
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="rounded-xl h-10 font-medium"
                    placeholder="Enter current password"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">New Password</label>
                    <Input.Password
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="rounded-xl h-10 font-medium"
                      placeholder="Min. 8 characters"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Confirm Password</label>
                    <Input.Password
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="rounded-xl h-10 font-medium"
                      placeholder="Repeat new password"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none shadow-sm"
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </div>

            {/* 2-Factor Authentication */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E2]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#EEF7F2] border border-[#23744D]/20 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-[#23744D]" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-[#0A0A0A]">Two-Factor Authentication (2FA)</h2>
                    <p className="text-xs text-[#73736A]">Require an authenticator app code when signing in.</p>
                  </div>
                </div>

                <Switch
                  checked={twoFactorEnabled}
                  onChange={(checked) => {
                    setTwoFactorEnabled(checked);
                    message.info(checked ? '2FA Enabled' : '2FA Disabled');
                  }}
                  className={twoFactorEnabled ? 'bg-[#23744D]' : 'bg-[#D2D2CA]'}
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#23744D]" />
                  <span className="font-semibold text-[#0A0A0A]">Authenticator App (Google Authenticator / 1Password)</span>
                </div>
                <span className="text-[11px] font-bold text-[#23744D] bg-[#EEF7F2] px-2 py-0.5 rounded-full">
                  Configured
                </span>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
              <div className="pb-3 border-b border-[#E7E7E2]">
                <h2 className="text-base font-black text-[#0A0A0A]">Active Devices & Sessions</h2>
                <p className="text-xs text-[#73736A]">Review devices currently logged into your creator account.</p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[#0A0A0A]">Windows PC • Chrome Browser</div>
                  <div className="text-[11px] text-[#73736A]">Current active session • Milan, Italy</div>
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D]">
                  This Device
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Notification Preferences */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
            <div className="pb-4 border-b border-[#E7E7E2]">
              <h2 className="text-base font-black text-[#0A0A0A]">Email Notifications</h2>
              <p className="text-xs text-[#73736A]">Choose what alerts you receive in your inbox.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[#0A0A0A]">New Campaign Offers</div>
                  <div className="text-[11px] text-[#73736A]">Receive instant emails when brands send direct bookings.</div>
                </div>
                <Switch checked={notifyOffers} onChange={setNotifyOffers} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[#0A0A0A]">Direct Messages</div>
                  <div className="text-[11px] text-[#73736A]">Get notified when brand representatives message you.</div>
                </div>
                <Switch checked={notifyMessages} onChange={setNotifyMessages} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[#0A0A0A]">Deliverable Reviews & Approvals</div>
                  <div className="text-[11px] text-[#73736A]">Alerts when brands review or request changes on video drafts.</div>
                </div>
                <Switch checked={notifyDeliverables} onChange={setNotifyDeliverables} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[#0A0A0A]">Payouts & Escrow Releases</div>
                  <div className="text-[11px] text-[#73736A]">Confirmations when escrow funds are transferred to your bank.</div>
                </div>
                <Switch checked={notifyPayouts} onChange={setNotifyPayouts} />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="primary"
                onClick={handleSaveNotifications}
                className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none shadow-sm"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        )}

        {/* Tab 3: Account & Danger Zone */}
        {activeTab === 'account' && (
          <div className="space-y-6">
            {/* Editable Account Information */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="pb-4 border-b border-[#E7E7E2] flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-black text-[#0A0A0A]">Account Information</h2>
                  <p className="text-xs text-[#73736A]">Update your primary login email and contact details.</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] text-xs font-bold border border-[#23744D]/20 shrink-0">
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
                    type="email"
                    value={accountEmail}
                    onChange={(e) => setAccountEmail(e.target.value)}
                    placeholder="creator@example.com"
                    className="h-11 rounded-xl font-medium text-sm border-[#E7E7E2]"
                  />
                  <span className="text-[11px] text-[#73736A] mt-1 block">
                    Used for platform authentication, order alerts, and payout notifications.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0A0A0A] block mb-1.5">
                    Emergency Contact / Phone
                  </label>
                  <Input
                    value={accountPhone}
                    onChange={(e) => setAccountPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="h-11 rounded-xl font-medium text-sm border-[#E7E7E2]"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="h-10 px-6 rounded-full font-bold text-xs bg-[#0A0A0A] hover:!bg-zinc-800 text-white border-none cursor-pointer"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-red-100 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                <h2 className="text-base font-black">Danger Zone</h2>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[#0A0A0A]">Deactivate Creator Account</div>
                  <div className="text-[11px] text-[#73736A]">Temporarily hide your profile from search results and pause incoming offers.</div>
                </div>
                <Button
                  danger
                  type="primary"
                  onClick={() => setIsDeactivateModalOpen(true)}
                  className="rounded-full text-xs font-bold shrink-0"
                >
                  Deactivate Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        title="Deactivate Creator Account"
        open={isDeactivateModalOpen}
        onCancel={() => setIsDeactivateModalOpen(false)}
        onOk={() => {
          setIsDeactivateModalOpen(false);
          message.info('Account deactivation requested. Profile is now hidden from search.');
        }}
        okText="Confirm Deactivation"
        okButtonProps={{ danger: true }}
        cancelText="Keep Active"
      >
        <p className="text-xs text-[#73736A] pt-2">
          Are you sure you want to deactivate your profile? Your active orders and escrow balances will remain protected, but you will not appear in brand searches until reactivated.
        </p>
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
