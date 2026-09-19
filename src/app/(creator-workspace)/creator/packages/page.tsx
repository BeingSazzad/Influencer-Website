'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { PackageCard } from '@/components/shared/PackageCard';
import { CreatorPackage, PlatformType } from '@/types';
import { PlusCircle, Package, Instagram, Youtube, Check, DollarSign } from 'lucide-react';
import { Button, Modal, Input, Select, message } from 'antd';

export default function CreatorPackagesPage() {
  const { creators } = useAppSelector((state) => state.creator);
  const currentCreator = creators[0]; // Sophie Kim

  const [packages, setPackages] = useState<CreatorPackage[]>(currentCreator.packages);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priceEur, setPriceEur] = useState<number>(650);
  const [deliveryDays, setDeliveryDays] = useState<number>(4);
  const [inclusions, setInclusions] = useState('1x 9:16 Video\nBrand Tag & Link\n1 Revision');

  const handleAddPackage = () => {
    if (!title.trim() || !description.trim()) {
      message.error('Please enter a title and description');
      return;
    }

    const newPkg: CreatorPackage = {
      id: `pkg-${Date.now()}`,
      platform,
      title,
      type: platform === 'ugc' ? 'ugc_video' : 'reel',
      description,
      priceEur,
      deliveryDays,
      revisions: 1,
      inclusions: inclusions.split('\n').filter((i) => i.trim().length > 0),
    };

    setPackages([...packages, newPkg]);
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    message.success('New package added to your public rate card!');
  };

  return (
    <div className="min-h-screen pb-16">
      <WorkspaceHeader
        title="Package & Rate Card Manager"
        subtitle="Manage preset services, EUR pricing, and turnarounds displayed to hiring brands."
        action={
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            className="h-9 px-4 rounded-full font-bold text-xs bg-[#151515] hover:!bg-[#2B7FFF] text-white border-none flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add New Package</span>
          </Button>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-[#151515]">
                Active Public Packages ({packages.length})
              </h2>
              <p className="text-xs text-[#73736A]">
                Brands can instantly book these packages directly from your profile.
              </p>
            </div>
            <span className="text-xs font-bold text-[#23744D] bg-[#EEF7F2] px-3 py-1 rounded-full">
              EUR (€) Standardized
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} packageItem={pkg} />
            ))}
          </div>
        </div>
      </div>

      {/* Add Package Modal */}
      <Modal
        title="Create New Package"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddPackage}
        okText="Add to Rate Card"
        okButtonProps={{ className: 'bg-[#151515] rounded-full text-xs font-bold' }}
      >
        <div className="space-y-3 pt-3">
          <div>
            <label className="block text-xs font-bold text-[#151515] mb-1">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as PlatformType)}
              className="w-full px-3 py-2 text-xs font-bold bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none"
            >
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="ugc">UGC Creative</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#151515] mb-1">Package Title</label>
            <Input
              placeholder="e.g. 60s Dedicated Reel + Story Bundle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#151515] mb-1">Description</label>
            <Input.TextArea
              rows={2}
              placeholder="Brief summary of what the brand receives..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#151515] mb-1">Your Price (EUR)</label>
              <Input
                type="number"
                value={priceEur}
                onChange={(e) => setPriceEur(Number(e.target.value))}
                className="rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#151515] mb-1">Turnaround (Days)</label>
              <Input
                type="number"
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(Number(e.target.value))}
                className="rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#151515] mb-1">Inclusions (one per line)</label>
            <Input.TextArea
              rows={3}
              value={inclusions}
              onChange={(e) => setInclusions(e.target.value)}
              className="rounded-xl text-xs"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
