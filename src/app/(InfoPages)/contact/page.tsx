'use client';

import React, { useState } from 'react';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Input, Button, message } from 'antd';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Off-Market Acquisition Inquiry');
  const [messageText, setMessageText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      message.success('Your message has been securely submitted to our Executive Advisory Desk.');
      setName('');
      setEmail('');
      setMessageText('');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5 text-emerald-600" />
            <span>Confidential Inquiries</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
            Global Advisory Desk
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Reach our private acquisitions team or inquire about representing your architectural estate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-950 font-serif">Executive Headquarters</h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>9600 Wilshire Boulevard, Suite 800, Beverly Hills, CA 90212</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>+1 (310) 555-0199</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>advisory@luxeprimeestates.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Mon - Fri: 8:00 AM - 7:00 PM PST (24/7 VIP On-Call)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>NDA & Privacy Assurance</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All client communications are strictly confidential and encrypted under attorney-broker privilege protocols.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Legal Name</label>
                  <Input
                    size="large"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lord Harrison Sterling"
                    className="rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Confidential Email</label>
                  <Input
                    size="large"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. harrison@sterlingcap.com"
                    className="rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp</label>
                  <Input
                    size="large"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (310) 555-0188"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Inquiry Purpose</label>
                  <Input
                    size="large"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Detailed Message</label>
                <Input.TextArea
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Share details regarding your acquisition target, timeline, or property representation request..."
                  className="rounded-xl"
                  required
                />
              </div>

              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                size="large"
                className="w-full sm:w-auto px-8 font-bold h-12 rounded-xl mt-2 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Confidential Message</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
