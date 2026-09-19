'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Input, Button, message } from 'antd';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    message.success('Password reset link sent to your email.');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-flex items-center justify-center mb-2">
          <Logo size="lg" />
        </Link>
        <h2 className="text-3xl font-black text-[#151515] tracking-tight">
          Reset password
        </h2>
        <p className="text-xs text-[#73736A]">
          Enter your email to receive a password reset link.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-sm rounded-3xl sm:px-10 border border-[#E7E7E2] space-y-6">
          {sent ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-[#EEF7F2] text-[#23744D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-sm text-[#151515]">Check your inbox</h3>
              <p className="text-xs text-[#73736A]">
                We sent instructions to <strong className="text-[#151515]">{email}</strong>.
              </p>
              <Link href="/login">
                <Button className="rounded-full text-xs font-bold mt-2">
                  Return to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#151515] mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  size="large"
                  prefix={<Mail className="w-4 h-4 text-[#73736A] mr-2" />}
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-xs"
                  required
                />
              </div>

              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                className="h-11 rounded-full font-bold text-xs bg-[#151515] hover:!bg-[#2B7FFF] text-white mt-2 border-none"
              >
                Send Reset Link
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-[#73736A] hover:text-[#151515] font-semibold"
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
