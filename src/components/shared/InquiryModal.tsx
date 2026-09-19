'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeInquiryModal } from '@/redux/slices/uiSlice';
import { addLead } from '@/redux/slices/leadSlice';
import { Modal, Input, Button, DatePicker, Select, message } from 'antd';
import { Calendar, User, Mail, Phone, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Lead } from '@/types';

export function InquiryModal() {
  const dispatch = useAppDispatch();
  const { isInquiryModalOpen, activePropertyForInquiry } = useAppSelector((state) => state.ui);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+1 (310) 555-0188');
  const [preferredDate, setPreferredDate] = useState('2026-03-25');
  const [tourType, setTourType] = useState('Private In-Person Viewing');
  const [messageText, setMessageText] = useState('Requesting confidential architectural walk-through.');
  const [budgetRange, setBudgetRange] = useState('$15M - $25M');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!name || !email) {
      message.error('Please enter your full name and confidential email.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        propertyId: activePropertyForInquiry?.id || 'prop-custom',
        propertyTitle: activePropertyForInquiry?.title || 'Luxury Estate',
        propertyPrice: activePropertyForInquiry?.price || '$20,000,000',
        propertyImage: activePropertyForInquiry?.image || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80',
        message: `${tourType}: ${messageText}`,
        preferredDate: preferredDate,
        status: 'new',
        createdAt: 'Just now',
        budgetRange: budgetRange,
        notes: 'Requested via website inquiry drawer.',
      };

      dispatch(addLead(newLead));
      setIsSubmitting(false);
      dispatch(closeInquiryModal());
      message.success('Private tour inquiry dispatched directly to the broker!');
    }, 600);
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span className="font-serif font-bold text-slate-900 text-lg">Schedule Confidential Tour</span>
        </div>
      }
      open={isInquiryModalOpen}
      onCancel={() => dispatch(closeInquiryModal())}
      footer={null}
      width={560}
      centered
    >
      <div className="pt-2 space-y-4">
        {/* Selected Property Preview */}
        {activePropertyForInquiry && (
          <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
            <img
              src={activePropertyForInquiry.image}
              alt={activePropertyForInquiry.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-900 truncate">
                {activePropertyForInquiry.title}
              </div>
              <div className="text-sm font-extrabold text-emerald-700 font-serif">
                {activePropertyForInquiry.price}
              </div>
              <div className="text-[11px] text-slate-500">Private Escrow Verified</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Legal Name</label>
            <Input
              prefix={<User className="w-4 h-4 text-slate-400 mr-1" />}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Lord Harrison Sterling"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Confidential Email</label>
            <Input
              prefix={<Mail className="w-4 h-4 text-slate-400 mr-1" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. harrison@familyoffice.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp</label>
            <Input
              prefix={<Phone className="w-4 h-4 text-slate-400 mr-1" />}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (310) 555-0100"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tour Preference</label>
            <Select
              value={tourType}
              onChange={setTourType}
              className="w-full"
              options={[
                { value: 'Private In-Person Viewing', label: 'Private In-Person Viewing' },
                { value: 'Live 4K Virtual Video Walkthrough', label: 'Live 4K Virtual Walkthrough' },
                { value: 'Investor Dossier & Floorplans', label: 'Investor Dossier & Specs Only' },
              ]}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Personalized Message</label>
          <Input.TextArea
            rows={3}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Share any special requirements or timing preferences..."
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
          <Button onClick={() => dispatch(closeInquiryModal())}>Cancel</Button>
          <Button
            type="primary"
            loading={isSubmitting}
            onClick={handleSubmit}
            className="font-bold h-10 px-6"
          >
            Submit VIP Request
          </Button>
        </div>
      </div>
    </Modal>
  );
}
