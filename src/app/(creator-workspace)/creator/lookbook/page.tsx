'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { addCreatorPhoto, deleteCreatorPhoto } from '@/redux/slices/creatorSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { CreatorPhotoLightbox } from '@/components/shared/CreatorPhotoLightbox';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { CreatorPhoto } from '@/types';
import {
  Camera,
  PlusCircle,
  Trash2,
  ExternalLink,
  Sparkles,
  MapPin,
  Aperture,
  Tag,
  ZoomIn,
  Check,
  Palette,
  Image as ImageIcon,
} from 'lucide-react';
import { Button, Modal, Input, Select, message } from 'antd';

export default function CreatorLookbookPage() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { creators } = useAppSelector((state) => state.creator);
  const currentCreator = creators.find((c) => c.id === currentUser?.id) || creators[0];

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<CreatorPhoto | null>(null);

  // Form states for uploading/adding a new lookbook photo
  const [photoUrl, setPhotoUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<'headshot' | 'lifestyle' | 'modeling' | 'bts' | 'outdoors' | 'studio'>('headshot');
  const [location, setLocation] = useState('Los Angeles, CA');
  const [cameraGear, setCameraGear] = useState('Sony A7R V • 85mm f/1.4 GM');
  const [tagsInput, setTagsInput] = useState('Clean Beauty, Commercial Headshot, Studio Stills');

  // Preset demo photo options for quick upload testing
  const presetPhotos = [
    {
      label: 'Studio Editorial Headshot',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      caption: 'Studio Editorial Headshot • Natural Daylight & High Tone',
      category: 'headshot' as const,
      cameraGear: 'Sony A7R V • 85mm f/1.4 GM',
    },
    {
      label: 'Golden Hour Beach Portrait',
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85',
      caption: 'Golden Hour Beach Glow & Linen Apparel Shoot',
      category: 'lifestyle' as const,
      cameraGear: 'Canon EOS R5 • 50mm f/1.2L',
    },
    {
      label: 'High-Fashion Paris Streetstyle',
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85',
      caption: 'Paris Fashion Week Streetstyle Stills',
      category: 'modeling' as const,
      cameraGear: 'Leica Q3 • 28mm Summilux',
    },
    {
      label: 'BTS 4K Video Production Setup',
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85',
      caption: 'Behind The Scenes • 4K Sony FX3 Cinema Setup',
      category: 'bts' as const,
      cameraGear: 'Sony FX3 Cinema Rig',
    },
  ];

  const photos = currentCreator.photos || [];

  const handleUploadPhoto = () => {
    if (!photoUrl.trim() || !caption.trim()) {
      message.error('Please enter a photo image URL and caption');
      return;
    }

    const newPhoto: CreatorPhoto = {
      id: `photo-${Date.now()}`,
      url: photoUrl,
      caption,
      category,
      aspectRatio: 'portrait',
      date: 'March 2026',
      location: location || 'Studio',
      cameraGear: cameraGear || 'High-Resolution Camera',
      tags: tagsInput.split(',').map((t) => t.trim()).filter((t) => t.length > 0),
    };

    dispatch(addCreatorPhoto({ creatorId: currentCreator.id, photo: newPhoto }));
    setIsUploadModalOpen(false);
    setPhotoUrl('');
    setCaption('');
    message.success('New lookbook photo added to your public talent card!');
  };

  const handleDeletePhoto = (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteCreatorPhoto({ creatorId: currentCreator.id, photoId }));
    message.info('Photo removed from lookbook');
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Photos & Lookbook Manager"
        subtitle="Manage your personal portrait stills, headshots, and aesthetic lookbook visible to hiring brands."
        action={
          <Button
            type="primary"
            onClick={() => setIsUploadModalOpen(true)}
            className="h-10 px-5 rounded-full font-semibold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white hover:!text-white border-none flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload Lookbook Photo</span>
          </Button>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
        {/* Aesthetic Signature & Appearance Overview */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#0A0A0A] tracking-tight">
                  Public Lookbook Stills ({photos.length})
                </h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] border border-[#23744D]/20">
                  Visible to Brands
                </span>
              </div>
              <p className="text-sm text-[#73736A] mt-1">
                Brands examine these photos to assess your on-camera appearance, skin tone, hairstyle, and aesthetic style for campaign casting and photoshoot bookings.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center">
                <Palette className="w-4.5 h-4.5 text-zinc-300" />
              </div>
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                  Aesthetic Signature
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#0A0A0A]">
                  {currentCreator.aestheticVibe || 'Clean Minimalist • Warm Natural Glow'}
                </div>
              </div>
            </div>
          </div>

          {/* Photo Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="rounded-3xl overflow-hidden border border-[#E7E7E2] bg-[#FAFAF8] hover:border-[#0A0A0A] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
              >
                {/* Photo Image Container */}
                <div className="h-72 overflow-hidden relative bg-[#0A0A0A]">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Category Badge Top Left */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-xs font-extrabold uppercase tracking-wider bg-black/75 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/15 capitalize">
                      {photo.category}
                    </span>
                  </div>

                  {/* Delete Button Top Right */}
                  <div className="absolute top-3 right-3 z-20">
                    <button
                      onClick={(e) => handleDeletePhoto(photo.id, e)}
                      className="w-8 h-8 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md cursor-pointer"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-white/95 text-[#0A0A0A] font-extrabold text-xs shadow-lg flex items-center gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5 text-zinc-700" />
                      <span>Preview in Lightbox</span>
                    </span>
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-[#0A0A0A] group-hover:text-zinc-600 transition-colors leading-snug">
                      {photo.caption}
                    </h3>

                    {photo.cameraGear && (
                      <div className="flex items-center gap-1.5 text-xs text-[#73736A] font-medium">
                        <Aperture className="w-3.5 h-3.5 text-[#A3A39C]" />
                        <span>{photo.cameraGear}</span>
                      </div>
                    )}

                    {photo.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {photo.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#EEF7F2] text-[#23744D]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-3 border-t border-[#E7E7E2] flex items-center justify-between text-xs font-bold text-[#73736A]">
                    <span className="flex items-center gap-1 text-[#0A0A0A]">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{photo.location}</span>
                    </span>
                    <span>{photo.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Lookbook Photo Modal */}
      <Modal
        title={<span className="text-base font-bold text-[#0A0A0A]">Upload New Lookbook Photo</span>}
        open={isUploadModalOpen}
        onCancel={() => setIsUploadModalOpen(false)}
        onOk={handleUploadPhoto}
        okText="Add to Lookbook"
        okButtonProps={{ className: 'bg-[#0A0A0A] rounded-full text-sm font-semibold h-10 px-5' }}
      >
        <div className="space-y-4 py-3 font-sans">
          {/* Direct File Image Upload Dropzone */}
          <div className="space-y-1.5">
            <ImageUpload
              label="Select Lookbook Photo"
              description="PNG, JPG, WEBP up to 10MB. Drag & drop or browse from device."
              value={photoUrl}
              onChange={(img) => setPhotoUrl(img)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
              Photo Caption & Shoot Description
            </label>
            <Input
              placeholder="e.g. Commercial Beauty Headshot • Studio Lighting"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="rounded-xl h-10"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Photo Category
              </label>
              <Select
                value={category}
                onChange={(val) => setCategory(val)}
                className="w-full h-10"
                options={[
                  { label: 'Headshot & Face', value: 'headshot' },
                  { label: 'Lifestyle & Fits', value: 'lifestyle' },
                  { label: 'Modeling & Editorial', value: 'modeling' },
                  { label: 'Behind The Scenes', value: 'bts' },
                  { label: 'Outdoors & Travel', value: 'outdoors' },
                  { label: 'Studio & Gear', value: 'studio' },
                ]}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Shoot Location
              </label>
              <Input
                placeholder="e.g. Los Angeles, CA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-xl h-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
              Camera Gear & Lens
            </label>
            <Input
              placeholder="e.g. Sony A7R V • 85mm f/1.4 GM"
              value={cameraGear}
              onChange={(e) => setCameraGear(e.target.value)}
              className="rounded-xl h-10"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
              Tags (comma separated)
            </label>
            <Input
              placeholder="Clean Beauty, Commercial Headshot, Studio Stills"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="rounded-xl h-10"
            />
          </div>

          {/* Live Image Preview */}
          {photoUrl && (
            <div className="pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A] block mb-1.5">
                Image Preview
              </label>
              <div className="h-44 rounded-2xl overflow-hidden border border-[#E7E7E2] bg-[#0A0A0A]">
                <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Lightbox Modal */}
      <CreatorPhotoLightbox
        photo={selectedPhoto}
        photos={photos}
        creator={currentCreator}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={(p) => setSelectedPhoto(p)}
        onBookCampaign={() => {
          setSelectedPhoto(null);
          message.info('Direct shoot booking channel opened.');
        }}
      />
    </div>
  );
}
