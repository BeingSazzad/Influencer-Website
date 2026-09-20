'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { Mail, ArrowLeft, CheckCircle2, ArrowRight, KeyRound } from 'lucide-react';
import { Input, Button, message } from 'antd';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      message.success('Password reset link sent to your email.');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center justify-center mb-5">
          <Logo size="lg" />
        </Link>
        <h2 className="text-3xl font-black text-[#0A0A0A] tracking-tight">
          Reset password
        </h2>
        <p className="text-sm sm:text-base text-[#73736A] font-medium leading-[24px] mt-2 sm:mt-3">
          Enter your registered email address and we&apos;ll send you instructions to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#E7E7E2] shadow-sm space-y-6">
          {sent ? (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-full bg-[#EEF7F2] text-[#23744D] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-xl text-[#0A0A0A]">Check your inbox</h3>
                <p className="text-sm text-[#73736A] leading-relaxed">
                  We sent instructions to <strong className="text-[#0A0A0A]">{email || 'your email'}</strong>. Please check your spam folder if it doesn&apos;t arrive within a few minutes.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <Link href="/reset-password">
                  <Button
                    type="primary"
                    size="large"
                    className="w-full bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white rounded-full font-bold text-sm h-12 flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Set New Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="w-full rounded-full text-sm font-bold h-11 border border-[#E7E7E2] text-[#73736A] hover:text-[#0A0A0A]">
                    Back to login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
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
                className="w-full bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white rounded-full font-bold text-sm h-12 transition-all shadow-sm"
              >
                Send Reset Link
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-[#73736A] hover:text-[#0A0A0A] font-bold transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
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
