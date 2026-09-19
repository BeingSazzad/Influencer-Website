'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Input, Button, message } from 'antd';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    message.success('Password reset instructions sent to your email.');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
            <Building2 className="w-6 h-6 text-slate-950" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white font-serif">LUXE PRIME</span>
        </Link>
        <h2 className="text-2xl font-bold text-white tracking-tight font-serif">
          Reset Your Password
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Enter your registered email to receive secure recovery access.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-slate-900 py-8 px-6 shadow-2xl rounded-3xl sm:px-10 border border-slate-800 space-y-6">
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Check Your Inbox</h3>
              <p className="text-xs text-slate-400">
                We've dispatched a confidential reset link to <strong>{email}</strong>.
              </p>
              <Link href="/login">
                <Button type="primary" block className="mt-4">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  size="large"
                  prefix={<Mail className="w-4 h-4 text-slate-500 mr-2" />}
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white rounded-xl"
                  required
                />
              </div>

              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                className="h-12 rounded-xl font-bold text-sm bg-emerald-600"
              >
                Send Recovery Link
              </Button>

              <div className="text-center pt-2">
                <Link href="/login" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
