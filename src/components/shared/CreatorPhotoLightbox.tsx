'use client';

import React, { useEffect } from 'react';
import { CreatorPhoto, Creator } from '@/types';
import {
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

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
  onClose,
  onSelectPhoto,
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
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#0A0A0A] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col items-center justify-center p-3 sm:p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls: Counter & Close Button */}
        <div className="w-full flex items-center justify-between pb-3 px-2 z-30">
          <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold tracking-wide border border-white/10">
            {currentIndex + 1} / {photos.length}
          </span>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Full Image Viewport with Previous/Next Arrows */}
        <div className="relative w-full flex-1 min-h-[400px] sm:min-h-[500px] max-h-[78vh] flex items-center justify-center overflow-hidden group">
          <img
            src={photo.url}
            alt={photo.caption || 'Gallery photo'}
            className="w-full h-full object-contain max-h-[75vh] select-none transition-all duration-300 rounded-2xl"
          />

          {/* Navigation Previous Button */}
          {photos.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all shadow-lg cursor-pointer hover:scale-110 border border-white/15"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Navigation Next Button */}
          {photos.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all shadow-lg cursor-pointer hover:scale-110 border border-white/15"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Clean Thumbnail Strip at Bottom for Fast Gallery Picture Switch */}
        {photos.length > 1 && (
          <div className="w-full pt-3 pb-1 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
            {photos.map((p, idx) => (
              <button
                key={p.id || idx}
                onClick={() => onSelectPhoto(p)}
                className={`relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  p.id === photo.id
                    ? 'border-white scale-105 shadow-md opacity-100'
                    : 'border-transparent opacity-50 hover:opacity-90'
                }`}
              >
                <img src={p.url} alt={p.caption || ''} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
