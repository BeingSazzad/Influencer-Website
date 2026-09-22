'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, Check, Camera, RefreshCw } from 'lucide-react';
import { message } from 'antd';

interface ImageUploadProps {
  value?: string;
  onChange: (dataUrl: string) => void;
  label?: string;
  description?: string;
  variant?: 'standard' | 'avatar' | 'banner';
  className?: string;
  aspectRatio?: string;
  maxSizeMb?: number;
}

export function ImageUpload({
  value,
  onChange,
  label,
  description = 'PNG, JPG, WEBP up to 10MB',
  variant = 'standard',
  className = '',
  aspectRatio,
  maxSizeMb = 10,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      message.error('Please upload an image file (PNG, JPG, WEBP, SVG).');
      return;
    }

    if (file.size > maxSizeMb * 1024 * 1024) {
      message.error(`File size exceeds ${maxSizeMb}MB limit.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onChange(result);
        message.success('Image uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 1. AVATAR / PROFILE VARIANT
  if (variant === 'avatar') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        <div
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-20 h-20 rounded-full border-2 cursor-pointer transition-all overflow-hidden flex items-center justify-center shrink-0 shadow-md ${
            isDragging
              ? 'border-[#0A0A0A] bg-zinc-100 scale-105 ring-4 ring-black/10'
              : 'border-[#E7E7E2] hover:border-[#0A0A0A] bg-[#FAFAF8]'
          }`}
        >
          {value ? (
            <>
              <img src={value} alt="Avatar" className="w-full h-full object-cover" />
              <div
                className={`absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center gap-1 transition-opacity ${
                  isHovered || isDragging ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Camera className="w-5 h-5" />
                <span className="text-[10px] font-bold">Change</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-[#73736A] p-2 text-center">
              <Camera className="w-6 h-6 mb-1 text-[#0A0A0A]" />
              <span className="text-[9px] font-bold uppercase">Upload</span>
            </div>
          )}
        </div>

        <div className="space-y-1.5 flex-1">
          {label && <div className="text-sm font-bold text-[#0A0A0A]">{label}</div>}
          <div className="text-xs text-[#73736A]">{description}</div>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleClick}
              className="px-3.5 py-1.5 rounded-full bg-[#0A0A0A] hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>{value ? 'Upload New' : 'Choose Image'}</span>
            </button>
            {value && (
              <button
                type="button"
                onClick={handleRemove}
                className="px-3 py-1.5 rounded-full bg-[#F4F4F0] hover:bg-rose-100 text-[#73736A] hover:text-rose-600 text-xs font-semibold transition-all cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. BANNER / WIDE COVER VARIANT
  if (variant === 'banner') {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label className="text-xs font-bold uppercase tracking-wider text-[#73736A] block">
            {label}
          </label>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-full h-44 sm:h-52 rounded-2xl border-2 border-dashed cursor-pointer transition-all overflow-hidden flex flex-col items-center justify-center text-center p-6 ${
            isDragging
              ? 'border-[#0A0A0A] bg-zinc-100 scale-[1.01]'
              : value
              ? 'border-[#E7E7E2] hover:border-[#0A0A0A] bg-black'
              : 'border-[#D2D2CA] hover:border-[#0A0A0A] bg-[#FAFAF8] hover:bg-[#F4F4F0]'
          }`}
        >
          {value ? (
            <>
              <img src={value} alt="Cover Banner" className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-between p-4 text-white">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold">Cover Banner Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick();
                    }}
                    className="px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#0A0A0A] text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Change</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-rose-600 text-white transition-all cursor-pointer"
                    title="Remove Cover"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2 pointer-events-none">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E7E7E2] text-[#0A0A0A] flex items-center justify-center mx-auto shadow-2xs">
                <UploadCloud className="w-6 h-6 text-[#0A0A0A]" />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-[#0A0A0A]">
                  Click to upload cover image or drag & drop
                </div>
                <div className="text-xs text-[#73736A] font-medium">{description}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. STANDARD / GALLERY DROPZONE VARIANT
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-xs font-bold uppercase tracking-wider text-[#73736A] block">
          {label}
        </label>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full rounded-2xl border-2 border-dashed cursor-pointer transition-all overflow-hidden flex flex-col items-center justify-center text-center p-6 ${
          aspectRatio ? aspectRatio : 'min-h-[180px]'
        } ${
          isDragging
            ? 'border-[#0A0A0A] bg-zinc-100 scale-[1.01]'
            : value
            ? 'border-[#E7E7E2] bg-white'
            : 'border-[#D2D2CA] hover:border-[#0A0A0A] bg-[#FAFAF8] hover:bg-[#F4F4F0]'
        }`}
      >
        {value ? (
          <div className="relative w-full h-full min-h-[180px] flex items-center justify-center group">
            <img
              src={value}
              alt="Uploaded Media"
              className="max-h-56 w-auto max-w-full rounded-xl object-contain shadow-sm"
            />
            <div className="absolute top-2 right-2 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                className="px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#0A0A0A] text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer border border-[#E7E7E2]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replace</span>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white transition-all cursor-pointer shadow-md"
                title="Remove Image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 pointer-events-none">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E7E7E2] text-[#0A0A0A] flex items-center justify-center mx-auto shadow-2xs">
              <UploadCloud className="w-6 h-6 text-[#0A0A0A]" />
            </div>
            <div className="space-y-0.5">
              <div className="text-sm font-bold text-[#0A0A0A]">
                Click to browse or drag & drop image
              </div>
              <div className="text-xs text-[#73736A] font-medium">{description}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
