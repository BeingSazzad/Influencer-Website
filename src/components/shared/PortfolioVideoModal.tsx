'use client';

import React, { useState, useEffect } from 'react';
import { PortfolioItem, Creator } from '@/types';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  Instagram,
  Youtube,
  Film,
  Music2,
  CheckCircle2,
} from 'lucide-react';
import { Button } from 'antd';

interface PortfolioVideoModalProps {
  item: PortfolioItem | null;
  creator: Creator;
  onClose: () => void;
  onBookCampaign: (item: PortfolioItem) => void;
}

export function PortfolioVideoModal({
  item,
  creator,
  onClose,
  onBookCampaign,
}: PortfolioVideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    if (!item) return;
    setIsPlaying(true);
    setProgress(20);

    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 400);

    return () => clearInterval(interval);
  }, [item]);

  if (!item) return null;

  const platformIcons = {
    instagram: (
      <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shrink-0 shadow-2xs">
        <Instagram className="w-3 h-3" />
      </span>
    ),
    tiktok: (
      <span className="w-5 h-5 rounded-full bg-[#000000] flex items-center justify-center text-white shrink-0 shadow-2xs">
        <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 24 24">
          <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.887 2.896 2.896 0 0 1-2.891-2.887 2.896 2.896 0 0 1 2.891-2.887c.28 0 .546.04.8.113V9.37a6.31 6.31 0 0 0-.8-.052 6.333 6.333 0 0 0-6.333 6.333 6.333 0 0 0 6.333 6.333 6.333 0 0 0 6.333-6.333V9.01a8.172 8.172 0 0 0 4.968 1.666V7.231a4.8 4.8 0 0 1-1.19-.545z" />
        </svg>
      </span>
    ),
    youtube: (
      <span className="w-5 h-5 rounded-full bg-[#FF0000] flex items-center justify-center text-white shrink-0 shadow-2xs">
        <Youtube className="w-3 h-3" />
      </span>
    ),
    ugc: (
      <span className="w-5 h-5 rounded-full bg-[#6444A6] flex items-center justify-center text-white shrink-0 shadow-2xs">
        <Sparkles className="w-3 h-3" />
      </span>
    ),
  };

  const isVertical = item.aspectRatio === '9:16' || item.platform === 'tiktok' || item.platform === 'ugc';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md transition-all font-sans animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT / TOP: Interactive Video Player Viewport */}
        <div
          className={`relative bg-[#0A0A0A] flex items-center justify-center overflow-hidden ${
            isVertical ? 'lg:w-[420px] min-h-[380px] lg:min-h-[580px]' : 'lg:w-[58%] min-h-[340px] lg:min-h-[580px]'
          }`}
        >
          {/* Main Media Poster / Mock Player */}
          <div className="relative w-full h-full flex items-center justify-center group/video">
            <img
              src={item.mediaUrl}
              alt={item.campaignTitle}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* Video Tint Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

            {/* Platform & HD Badges Top Left */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/15">
                {platformIcons[item.platform]}
                <span>{item.platform}</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-widest border border-white/15">
                4K HDR
              </span>
            </div>

            {/* Centered Big Play/Pause Toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute z-20 w-16 h-16 rounded-full bg-black/60 hover:bg-[#FF2D78] text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
              aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-white" />
              ) : (
                <Play className="w-6 h-6 fill-white translate-x-0.5" />
              )}
            </button>

            {/* Sound Track Pill */}
            {item.soundTrack && (
              <div className="absolute bottom-16 left-4 right-4 z-20 flex items-center gap-2 text-white/90 text-xs font-medium bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 truncate">
                <Music2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="truncate">{item.soundTrack}</span>
              </div>
            )}

            {/* Bottom Playback Scrubber & Controls */}
            <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-black/95 to-transparent space-y-2">
              {/* Progress Timeline Scrubber */}
              <div className="relative w-full h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-[#FF2D78] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-between text-white text-xs font-bold pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-[#FF2D78] transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-[#FF2D78] transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="text-white/80 font-mono text-xs">
                    00:{Math.floor((progress * 0.45)).toString().padStart(2, '0')} / {item.duration || '0:45'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/70 uppercase tracking-wider font-semibold">
                    {item.aspectRatio || '9:16'} HD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT / BOTTOM: Campaign Case Study Details */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto max-h-[85vh] lg:max-h-[580px] space-y-6 flex flex-col justify-between bg-white font-sans">
          <div className="space-y-6">
            {/* Header: Brand + Verified Campaign */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-[#EEF7F2] border border-[#23744D]/20 px-3 py-1 rounded-full w-fit mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Brand Campaign • 100% Escrow Cleared</span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
                    {item.brandName}
                  </h2>
                  <p className="text-sm font-bold text-[#73736A] mt-0.5">
                    {item.campaignTitle}
                  </p>
                </div>

                {item.packagePriceEur && (
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#73736A] block">
                      PACKAGE VALUE
                    </span>
                    <strong className="text-xl font-black text-[#0A0A0A] font-editorial">
                      €{item.packagePriceEur.toLocaleString()}
                    </strong>
                  </div>
                )}
              </div>
            </div>

            {/* Performance Analytics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Views */}
              <div className="p-3 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex flex-col justify-between space-y-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#EEF7F2] text-[#23744D] flex items-center justify-center shrink-0">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-[#73736A] truncate">Views</span>
                </div>
                <div className="text-base sm:text-lg font-black text-[#0A0A0A] tracking-tight">
                  {item.views || '350K+'}
                </div>
              </div>

              {/* Likes */}
              <div className="p-3 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex flex-col justify-between space-y-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#FFF0F5] text-[#FF2D78] flex items-center justify-center shrink-0">
                    <Heart className="w-3.5 h-3.5 fill-[#FF2D78]/20 text-[#FF2D78]" />
                  </div>
                  <span className="text-xs font-bold text-[#73736A] truncate">Likes</span>
                </div>
                <div className="text-base sm:text-lg font-black text-[#0A0A0A] tracking-tight">
                  {item.likes || '28K'}
                </div>
              </div>

              {/* Comments */}
              <div className="p-3 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex flex-col justify-between space-y-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#F1EEF9] text-[#6444A6] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-[#73736A] truncate">Comments</span>
                </div>
                <div className="text-base sm:text-lg font-black text-[#0A0A0A] tracking-tight">
                  {item.comments || '1,200'}
                </div>
              </div>

              {/* Engagement */}
              <div className="p-3 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex flex-col justify-between space-y-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#FAF6E8] text-[#8C6819] flex items-center justify-center shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-[#73736A] truncate">Engagement</span>
                </div>
                <div className="text-base sm:text-lg font-black text-[#0A0A0A] tracking-tight">
                  {item.engagementRate || '8.5%'}
                </div>
              </div>
            </div>

            {/* Deliverable Details List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Deliverable Specifications
              </h3>
              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-2 text-sm text-[#555550]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#73736A]">Format & Type:</span>
                  <span className="font-bold text-[#0A0A0A]">{item.deliverableType || '4K Video Creative'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#73736A]">Aspect Ratio:</span>
                  <span className="font-bold text-[#0A0A0A]">{item.aspectRatio === '16:9' ? '16:9 Widescreen' : '9:16 Vertical Video'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#73736A]">Commercial Rights:</span>
                  <span className="font-bold text-[#23744D]">Full Commercial Ad Whitelisting</span>
                </div>
              </div>
            </div>

            {/* Campaign Brief Summary */}
            {item.description && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                  Creative Strategy & Execution
                </h3>
                <p className="text-sm text-[#555550] leading-relaxed font-medium bg-[#FAFAF8] p-4 rounded-2xl border border-[#E7E7E2]">
                  &ldquo;{item.description}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Creator Attribution & Book CTA */}
          <div className="pt-4 border-t border-[#E7E7E2] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-10 h-10 rounded-full object-cover border border-[#E7E7E2]"
              />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-sm text-[#0A0A0A]">{creator.name}</span>
                  <VerifiedBadge size="xs" />
                </div>
                <span className="text-xs text-[#73736A] font-medium">{creator.handle}</span>
              </div>
            </div>

            <button
              onClick={() => onBookCampaign(item)}
              className="w-full sm:w-auto h-11 px-6 rounded-full font-bold text-sm bg-[#0A0A0A] hover:bg-[#FF2D78] text-white shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
            >
              <span>Book Similar Campaign</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
