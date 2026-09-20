'use client';

import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import {
  Share2,
  Copy,
  Check,
  Send,
  MessageCircle,
  Twitter,
  Linkedin,
  Mail,
  QrCode,
  Sparkles,
} from 'lucide-react';

interface ShareProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  shareUrl: string;
  avatar?: string;
  role?: 'creator' | 'brand';
}

export function ShareProfileModal({
  isOpen,
  onClose,
  title,
  subtitle,
  shareUrl,
  avatar,
  role = 'creator',
}: ShareProfileModalProps) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  // Fallback to origin url if relative
  const fullUrl =
    typeof window !== 'undefined'
      ? shareUrl.startsWith('http')
        ? shareUrl
        : `${window.location.origin}${shareUrl}`
      : shareUrl;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(fullUrl);
      }
      setCopied(true);
      message.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      message.success('Link copied!');
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: subtitle || `Check out ${title} on Influverse!`,
          url: fullUrl,
        });
      } catch (e) {
        // user cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] text-white hover:bg-[#20ba5a]',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${title} - View verified rate card and portfolio on Influverse: ${fullUrl}`
      )}`,
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'bg-[#000000] text-white hover:bg-[#1a1a1a]',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `Check out ${title} on @InfluverseApp!`
      )}&url=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0A66C2] text-white hover:bg-[#084e96]',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        fullUrl
      )}`,
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-[#EA4335] text-white hover:bg-[#d3382b]',
      href: `mailto:?subject=${encodeURIComponent(
        `${title} • Influverse Profile`
      )}&body=${encodeURIComponent(
        `Hi,\n\nTake a look at ${title}'s verified profile and portfolio on Influverse:\n${fullUrl}\n\nBest regards.`
      )}`,
    },
  ];

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={480}
      className="rounded-3xl overflow-hidden font-sans"
    >
      <div className="p-2 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-[#E7E7E2]">
          {avatar && (
            <img
              src={avatar}
              alt={title}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md shrink-0"
            />
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-extrabold text-[#0A0A0A] truncate">
              {title}
            </h3>
            <p className="text-xs text-[#73736A] truncate">
              {subtitle || `Share verified ${role} profile & booking rate card`}
            </p>
          </div>
        </div>

        {/* Copy Link Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#73736A] block">
            Direct Shareable URL
          </label>
          <div className="flex items-center gap-2">
            <Input
              value={fullUrl}
              readOnly
              className="rounded-xl h-11 text-xs font-medium bg-[#FAFAF8] border-[#E7E7E2]"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className={`h-11 px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-2xs ${
                copied
                  ? 'bg-[#23744D] text-white'
                  : 'bg-[#0A0A0A] text-white hover:bg-[#FF2D78]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Social Channels */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#73736A] block">
            Share To Social Channels
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {shareOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <a
                  key={opt.name}
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all ${opt.color} shadow-2xs group cursor-pointer`}
                >
                  <Icon className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">{opt.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Actions row: QR Code & Native Share */}
        <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => setShowQr(!showQr)}
            className="text-xs font-bold text-[#73736A] hover:text-[#0A0A0A] flex items-center gap-1.5 cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-[#FF2D78]" />
            <span>{showQr ? 'Hide QR Code' : 'Show Mobile QR Code'}</span>
          </button>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="h-9 px-4 rounded-full font-bold text-xs bg-[#FAFAF8] border border-[#E7E7E2] hover:border-[#0A0A0A] text-[#0A0A0A] flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-[#FF2D78]" />
              <span>More Options</span>
            </button>
          )}
        </div>

        {/* Optional QR Code View */}
        {showQr && (
          <div className="p-4 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] text-center space-y-2 animate-fadeIn">
            <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl border border-[#E7E7E2] shadow-2xs flex items-center justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                  fullUrl
                )}`}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-[11px] text-[#73736A] font-medium">
              Scan with mobile phone camera to open rate card instantly.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
