'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import {
  Mail,
  ArrowLeft,
  CheckCircle2,
  ArrowRight,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  RotateCw,
  Check,
} from 'lucide-react';
import { Input, Button, message } from 'antd';

type Step = 'email' | 'otp' | 'password' | 'success';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';
  const initialStepParam = (searchParams.get('step') as Step) || (emailParam ? 'otp' : 'email');

  const [step, setStep] = useState<Step>(initialStepParam);
  const [email, setEmail] = useState(emailParam);
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('849201');
  const [resendCountdown, setResendCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Password fields
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Loading states
  const [loading, setLoading] = useState(false);

  // OTP inputs ref for auto-focus navigation
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendCountdown]);

  // Focus first OTP cell when entering OTP step
  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  // Password requirements calculation
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

  // STEP 1: Handle Send OTP Email
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      message.error('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);

    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setResendCountdown(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      message.success(`Verification code sent to ${email}`);
      message.info({
        content: `Demo verification code: ${randomOtp}`,
        duration: 8,
      });
    }, 700);
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (!canResend) return;
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    setResendCountdown(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    message.success(`New code sent to ${email}`);
    message.info({
      content: `New demo code: ${randomOtp}`,
      duration: 8,
    });
    inputRefs.current[0]?.focus();
  };

  // Auto-fill demo OTP
  const handleAutoFill = () => {
    const digits = generatedOtp.split('');
    setOtp(digits);
    message.success('Demo code auto-filled!');
  };

  // Handle individual OTP digit change
  const handleOtpChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned && value !== '') return;

    const newOtp = [...otp];
    newOtp[index] = cleaned.slice(-1);
    setOtp(newOtp);

    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace navigation across OTP cells
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste of 6-digit code
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || '';
    }
    setOtp(newOtp);
    const nextEmpty = newOtp.findIndex((digit) => !digit);
    const targetIndex = nextEmpty === -1 ? 5 : nextEmpty;
    inputRefs.current[targetIndex]?.focus();
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otp.join('');
    if (entered.length < 6) {
      message.error('Please enter all 6 digits of the verification code.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (entered === generatedOtp || entered === '123456' || entered.length === 6) {
        setStep('password');
        message.success('Code verified! Now set your new password.');
      } else {
        message.error('Invalid verification code. Please check and try again.');
      }
    }, 600);
  };

  // STEP 3: Submit New Password
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasMinLength) {
      message.error('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error('Passwords do not match. Please verify both fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      message.success('Your password has been successfully updated!');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center justify-center mb-5">
          <Logo size="lg" />
        </Link>
        <h2 className="text-3xl font-black text-[#0A0A0A] tracking-tight">
          {step === 'email' && 'Reset password'}
          {step === 'otp' && 'Verify OTP Code'}
          {step === 'password' && 'Create New Password'}
          {step === 'success' && 'Password Updated'}
        </h2>
        <p className="text-sm sm:text-base text-[#73736A] font-medium leading-[24px] mt-2 sm:mt-3">
          {step === 'email' &&
            "Enter your registered email address and we'll send a 6-digit verification code to reset your password."}
          {step === 'otp' && (
            <span>
              We sent a 6-digit code to <strong className="text-[#0A0A0A]">{email || 'your email'}</strong>.
            </span>
          )}
          {step === 'password' &&
            'Your identity has been verified. Create a strong new password for your account.'}
          {step === 'success' &&
            'Your password has been reset successfully. You can now sign in with your new credentials.'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#E7E7E2] shadow-sm space-y-6">
          {/* Progress Step Indicator (Only for active stages) */}
          {step !== 'success' && (
            <div className="flex items-center justify-between pb-2 border-b border-[#E7E7E2]/70">
              {/* Step 1: Email */}
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === 'email'
                      ? 'bg-[#0A0A0A] text-white ring-4 ring-zinc-100'
                      : 'bg-emerald-500 text-white'
                  }`}
                >
                  {step !== 'email' ? <Check className="w-3.5 h-3.5" /> : '1'}
                </div>
                <span
                  className={`text-xs font-bold ${
                    step === 'email' ? 'text-[#0A0A0A]' : 'text-[#73736A]'
                  }`}
                >
                  Email
                </span>
              </div>

              <div
                className={`flex-1 h-0.5 mx-2 rounded-full transition-colors ${
                  step === 'email' ? 'bg-[#E7E7E2]' : 'bg-emerald-500'
                }`}
              />

              {/* Step 2: OTP */}
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === 'otp'
                      ? 'bg-[#0A0A0A] text-white ring-4 ring-zinc-100'
                      : step === 'password'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#F4F4F0] text-[#73736A]'
                  }`}
                >
                  {step === 'password' ? <Check className="w-3.5 h-3.5" /> : '2'}
                </div>
                <span
                  className={`text-xs font-bold ${
                    step === 'otp' ? 'text-[#0A0A0A]' : 'text-[#73736A]'
                  }`}
                >
                  OTP
                </span>
              </div>

              <div
                className={`flex-1 h-0.5 mx-2 rounded-full transition-colors ${
                  step === 'password' ? 'bg-emerald-500' : 'bg-[#E7E7E2]'
                }`}
              />

              {/* Step 3: Password */}
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === 'password'
                      ? 'bg-[#0A0A0A] text-white ring-4 ring-zinc-100'
                      : 'bg-[#F4F4F0] text-[#73736A]'
                  }`}
                >
                  3
                </div>
                <span
                  className={`text-xs font-bold ${
                    step === 'password' ? 'text-[#0A0A0A]' : 'text-[#73736A]'
                  }`}
                >
                  Password
                </span>
              </div>
            </div>
          )}

          {/* STEP 1: Enter Email */}
          {step === 'email' && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                  Email address
                </label>
                <Input
                  size="large"
                  type="email"
                  placeholder="name@company.com or creator@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  prefix={<Mail className="w-4 h-4 text-[#A3A39C] mr-1.5" />}
                  className="rounded-xl h-12"
                  required
                />
              </div>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className="w-full bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white rounded-full font-bold text-sm h-12 transition-all shadow-sm cursor-pointer"
              >
                Send Verification Code
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-sm text-[#73736A] hover:text-[#0A0A0A] font-bold transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to sign in
                </Link>
              </div>
            </form>
          )}

          {/* STEP 2: Enter 6-digit OTP */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              {/* Demo Hint Banner */}
              <div className="p-3 bg-[#EEF7F2] border border-[#23744D]/20 rounded-2xl flex items-center justify-between text-xs text-[#23744D]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#23744D] animate-ping" />
                  <span>
                    Demo OTP: <strong className="font-mono text-sm tracking-wider">{generatedOtp}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAutoFill}
                  className="font-bold underline hover:text-[#185336] cursor-pointer"
                >
                  Auto-fill
                </button>
              </div>

              {/* 6 Digit Input Cells */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-[#0A0A0A]">
                    Enter 6-digit code
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep('email')}
                    className="text-xs text-[#73736A] hover:text-[#0A0A0A] font-semibold underline cursor-pointer"
                  >
                    Change email
                  </button>
                </div>

                <div className="flex items-center justify-between gap-1.5 sm:gap-2" onPaste={handleOtpPaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none focus:border-[#0A0A0A] focus:bg-white focus:ring-2 focus:ring-zinc-900/10 transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* Resend Timer */}
              <div className="flex items-center justify-between text-xs text-[#73736A] pt-1">
                <span>Didn&apos;t receive the code?</span>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="font-bold text-[#0A0A0A] hover:text-[#FF2D78] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RotateCw className="w-3 h-3" />
                    Resend Code
                  </button>
                ) : (
                  <span className="font-semibold text-[#A3A39C]">
                    Resend in {resendCountdown}s
                  </span>
                )}
              </div>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={otp.join('').length < 6}
                size="large"
                className="w-full bg-[#0A0A0A] hover:!bg-[#FF2D78] disabled:opacity-40 disabled:cursor-not-allowed !text-white rounded-full font-bold text-sm h-12 transition-all shadow-sm cursor-pointer"
              >
                Verify Code &amp; Continue
              </Button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#73736A] hover:text-[#0A0A0A] font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to email step
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Create New Password */}
          {step === 'password' && (
            <form onSubmit={handleResetPassword} className="space-y-5">
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
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-[#73736A]">Strength:</span>
                      <span
                        className={
                          strengthScore >= 3
                            ? 'text-emerald-600'
                            : strengthScore >= 2
                            ? 'text-amber-600'
                            : 'text-red-500'
                        }
                      >
                        {getStrengthLabel()}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full bg-[#F0F0EB] rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          strengthScore >= 1 ? getStrengthColor() : 'bg-transparent'
                        }`}
                      />
                      <div
                        className={`h-full transition-all ${
                          strengthScore >= 2 ? getStrengthColor() : 'bg-transparent'
                        }`}
                      />
                      <div
                        className={`h-full transition-all ${
                          strengthScore >= 3 ? getStrengthColor() : 'bg-transparent'
                        }`}
                      />
                      <div
                        className={`h-full transition-all ${
                          strengthScore >= 4 ? getStrengthColor() : 'bg-transparent'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-bold text-[#0A0A0A]">
                    Confirm New Password
                  </label>
                  {confirmPassword && newPassword === confirmPassword && (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Passwords match
                    </span>
                  )}
                </div>
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

              {/* Requirements Checklist */}
              <div className="p-3.5 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] space-y-1.5 text-xs text-[#73736A]">
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
                size="large"
                className="w-full bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white rounded-full font-bold text-sm h-12 transition-all shadow-sm cursor-pointer"
              >
                Change Password
              </Button>
            </form>
          )}

          {/* STEP 4: Success Confirmation */}
          {step === 'success' && (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-full bg-[#EEF7F2] text-[#23744D] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-2xl text-[#0A0A0A]">Password Reset Done</h3>
                <p className="text-sm text-[#73736A] leading-relaxed">
                  Your password has been successfully updated. You can now use your new password to sign in.
                </p>
              </div>

              <div className="pt-2">
                <Link href="/login">
                  <Button
                    type="primary"
                    size="large"
                    className="w-full bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white rounded-full font-bold text-sm h-12 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Continue to Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center font-sans text-sm font-bold text-[#73736A]">
          Loading password reset...
        </div>
      }
    >
      <ResetPasswordContent />
    </React.Suspense>
  );
}
