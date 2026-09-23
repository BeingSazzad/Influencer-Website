'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { Input, Button, message } from 'antd';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password strength calculation
  const hasMinLength = newPassword.length >= 8;
  const hasNumber = /\d/.test(newPassword);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const hasUpperLower = /(?=.*[a-z])(?=.*[A-Z])/.test(newPassword);

  const strengthScore = [hasMinLength, hasNumber, hasSpecial, hasUpperLower].filter(Boolean).length;
  
  const getStrengthLabel = () => {
    if (newPassword.length === 0) return '';
    if (strengthScore <= 1) return 'Weak';
    if (strengthScore <= 3) return 'Moderate';
    return 'Strong';
  };

  const getStrengthColor = () => {
    if (strengthScore <= 1) return 'bg-red-500';
    if (strengthScore <= 3) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasMinLength) {
      message.error('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      message.success('Your password has been reset successfully!');
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center justify-center mb-5">
          <Logo size="lg" />
        </Link>
        <h2 className="text-3xl font-black text-[#0A0A0A] tracking-tight">
          Create New Password
        </h2>
        <p className="text-sm text-[#73736A] font-medium leading-relaxed mt-2">
          Your new password must be different from previous used passwords.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#E7E7E2] shadow-sm space-y-6">
          {isSubmitted ? (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-full bg-[#EEF7F2] text-[#23744D] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#0A0A0A]">Password Reset Done</h3>
                <p className="text-sm text-[#73736A] leading-relaxed">
                  Your password has been successfully updated. You can now use your new password to sign in.
                </p>
              </div>

              <div className="pt-2">
                <Link href="/login">
                  <Button
                    type="primary"
                    size="large"
                    className="w-full bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white rounded-full font-bold text-sm h-12 flex items-center justify-center gap-2"
                  >
                    <span>Continue to Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div>
                <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    size="large"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    prefix={<KeyRound className="w-4 h-4 text-[#A3A39C] mr-1.5" />}
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-[#A3A39C] hover:text-[#0A0A0A] transition-colors p-1"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                    className="rounded-xl h-12"
                    required
                  />
                </div>

                {/* Password strength meter */}
                {newPassword.length > 0 && (
                  <div className="mt-2.5 space-y-1.5">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span className="text-[#73736A]">Strength:</span>
                      <span className={strengthScore >= 3 ? 'text-emerald-600' : strengthScore >= 2 ? 'text-amber-600' : 'text-red-500'}>
                        {getStrengthLabel()}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full bg-[#F0F0EB] rounded-full overflow-hidden">
                      <div className={`h-full transition-all ${strengthScore >= 1 ? getStrengthColor() : 'bg-transparent'}`} />
                      <div className={`h-full transition-all ${strengthScore >= 2 ? getStrengthColor() : 'bg-transparent'}`} />
                      <div className={`h-full transition-all ${strengthScore >= 3 ? getStrengthColor() : 'bg-transparent'}`} />
                      <div className={`h-full transition-all ${strengthScore >= 4 ? getStrengthColor() : 'bg-transparent'}`} />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    size="large"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    prefix={<Lock className="w-4 h-4 text-[#A3A39C] mr-1.5" />}
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-[#A3A39C] hover:text-[#0A0A0A] transition-colors p-1"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                    className="rounded-xl h-12"
                    required
                  />
                </div>
              </div>

              {/* Rules Checklist */}
              <div className="p-3.5 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] space-y-1.5 text-sm text-[#73736A]">
                <div className="font-bold text-[#0A0A0A] mb-1">Password must include:</div>
                <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-700 font-semibold' : ''}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${hasMinLength ? 'bg-emerald-600' : 'bg-[#D2D2CA]'}`} />
                  At least 8 characters
                </div>
                <div className={`flex items-center gap-1.5 ${hasUpperLower ? 'text-emerald-700 font-semibold' : ''}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${hasUpperLower ? 'bg-emerald-600' : 'bg-[#D2D2CA]'}`} />
                  Both uppercase and lowercase letters
                </div>
                <div className={`flex items-center gap-1.5 ${hasNumber || hasSpecial ? 'text-emerald-700 font-semibold' : ''}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${hasNumber || hasSpecial ? 'bg-emerald-600' : 'bg-[#D2D2CA]'}`} />
                  At least one number or symbol
                </div>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white rounded-full font-bold text-sm h-12 shadow-sm transition-all"
              >
                Reset Password
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="text-sm text-[#73736A] hover:text-[#0A0A0A] font-semibold transition-colors"
                >
                  Back to sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
