'use client';

import React, { useEffect } from 'react';
import { CreatorPhoto, Creator } from '@/types';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  MapPin,
  Calendar,
  Sparkles,
  Tag,
  ArrowRight,
  Download,
} from 'lucide-react';
import { Button } from 'antd';

interface CreatorPhotoLightboxProps {
  photo: CreatorPhoto | null;
  photos: CreatorPhoto[];
  creator: Creator;
  onClose: () => void;
  onSelectPhoto: (photo: CreatorPhoto) => void;
  onBookCampaign: () => void;
}

export function CreatorPhotoLightbox({
  photo,
  photos,
  creator,
  onClose,
  onSelectPhoto,
  onBookCampaign,
}: CreatorPhotoLightboxProps) {
  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, photos]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIdx = (currentIndex + 1) % photos.length;
    onSelectPhoto(photos[nextIdx]);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const prevIdx = (currentIndex - 1 + photos.length) % photos.length;
    onSelectPhoto(photos[prevIdx]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md transition-all font-sans animate-fade-in"
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

        {/* LEFT: Full Image Viewport with Previous/Next Arrows */}
        <div className="relative bg-[#0A0A0A] flex-1 min-h-[360px] lg:min-h-[580px] flex items-center justify-center overflow-hidden group">
          <img
            src={photo.url}
            alt={photo.caption}
            className="w-full h-full object-contain max-h-[75vh] p-2"
          />

          {/* Navigation Previous Button */}
          {photos.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#FF2D78] text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md cursor-pointer hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Navigation Next Button */}
          {photos.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#FF2D78] text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md cursor-pointer hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Counter Top Left */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-wider border border-white/15">
              {currentIndex + 1} of {photos.length}
            </span>
          </div>
        </div>

        {/* RIGHT: Photo Details & Creator Info */}
        <div className="w-full lg:w-96 p-6 sm:p-8 bg-white flex flex-col justify-between overflow-y-auto max-h-[85vh] lg:max-h-[580px] space-y-6">
          <div className="space-y-6">
            {/* Header: Creator Identification */}
            <div className="flex items-center gap-3 pb-4 border-b border-[#E7E7E2]">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-12 h-12 rounded-full object-cover border border-[#E7E7E2]"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-base text-[#0A0A0A]">{creator.name}</h3>
                  <VerifiedBadge size="xs" />
                </div>
                <div className="text-xs text-[#73736A] font-medium">{creator.location}</div>
              </div>
            </div>

            {/* Photo Caption & Context */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-black text-[#0A0A0A] tracking-tight leading-snug">
                {photo.caption}
              </h2>

              {/* Shoot Details (Standard Clean Inline Meta) */}
              {(photo.location || photo.date || photo.cameraGear) && (
                <div className="flex items-center flex-wrap gap-y-1.5 gap-x-3 text-xs text-[#73736A] font-medium pt-0.5">
                  {photo.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#A3A39C] shrink-0" />
                      <span className="text-[#0A0A0A] font-semibold">{photo.location}</span>
                    </div>
                  )}

                  {photo.location && photo.date && <span className="text-[#D2D2CA]">•</span>}

                  {photo.date && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#A3A39C] shrink-0" />
                      <span>{photo.date}</span>
                    </div>
                  )}

                  {(photo.location || photo.date) && photo.cameraGear && <span className="text-[#D2D2CA]">•</span>}

                  {photo.cameraGear && (
                    <div className="flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-[#A3A39C] shrink-0" />
                      <span>{photo.cameraGear}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {photos.length > 1 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#73736A] block">
                  More Photos ({photos.length})
                </span>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {photos.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onSelectPhoto(p)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        p.id === photo.id
                          ? 'border-[#0A0A0A] scale-105 shadow-sm'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-[#E7E7E2]">
            <button
              onClick={() => {
                onClose();
                onBookCampaign();
              }}
              className="w-full h-11 rounded-full font-bold text-sm bg-[#0A0A0A] hover:bg-[#FF2D78] text-white shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
            >
              <span>Work with {creator.name.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
