'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CreatorPackage } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { openOfferModal } from '@/redux/slices/orderSlice';
import {
  ArrowRight,
  Check,
  Clock,
  RotateCcw,
  Video,
  Film,
  Sparkles,
  Clapperboard,
  Layers,
  Radio,
} from 'lucide-react';

interface PackageCardProps {
  packageItem?: CreatorPackage;
  pkg?: CreatorPackage;
  creator?: {
    id: string;
    name: string;
    handle: string;
    avatar: string;
  };
  onSelect?: (pkg: CreatorPackage) => void;
}

export function getPackageVisual(pkg: CreatorPackage) {
  const title = (pkg.title || '').toLowerCase();
  const desc = (pkg.description || '').toLowerCase();

  if (title.includes('reel') || desc.includes('reel') || pkg.platform === 'instagram') {
    return {
      icon: <Film className="w-5 h-5 text-[#E1306C]" />,
      badgeBg: 'bg-[#FFF0F5] border border-rose-200',
      label: 'Instagram Reel',
      labelColor: 'text-[#E1306C] bg-[#FFF0F5]',
    };
  }
  if (title.includes('tiktok') || desc.includes('tiktok') || pkg.platform === 'tiktok') {
    return {
      icon: <Video className="w-5 h-5 text-[#0A0A0A]" />,
      badgeBg: 'bg-[#F4F4F0] border border-[#E7E7E2]',
      label: 'TikTok Video',
      labelColor: 'text-[#0A0A0A] bg-[#F4F4F0]',
    };
  }
  if (title.includes('youtube') || desc.includes('youtube') || pkg.platform === 'youtube') {
    return {
      icon: <Clapperboard className="w-5 h-5 text-[#FF0000]" />,
      badgeBg: 'bg-[#FEF2F2] border border-red-200',
      label: 'YouTube Feature',
      labelColor: 'text-[#FF0000] bg-[#FEF2F2]',
    };
  }
  if (title.includes('bundle') || title.includes('campaign')) {
    return {
      icon: <Layers className="w-5 h-5 text-[#2563EB]" />,
      badgeBg: 'bg-[#EFF6FF] border border-blue-200',
      label: 'Multi-Asset Bundle',
      labelColor: 'text-[#2563EB] bg-[#EFF6FF]',
    };
  }
  return {
    icon: <Sparkles className="w-5 h-5 text-[#7C3AED]" />,
    badgeBg: 'bg-[#F5F3FF] border border-purple-200',
    label: 'UGC Creative',
    labelColor: 'text-[#7C3AED] bg-[#F5F3FF]',
  };
}

export function PackageCard({ packageItem, pkg, creator, onSelect }: PackageCardProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const currentPkg = packageItem || pkg;

  if (!currentPkg) return null;

  const visual = getPackageVisual(currentPkg);

  const isSelf =
    currentUser?.role === 'creator' &&
    (creator?.id === currentUser.id || creator?.id === 'creator-01');

  const handleSelectPackage = () => {
    if (onSelect) {
      onSelect(currentPkg);
      return;
    }

    if (isSelf) {
      router.push('/creator/packages');
      return;
    }

    if (creator) {
      dispatch(
        openOfferModal({
          id: creator.id,
          name: creator.name,
          handle: creator.handle,
          avatar: creator.avatar,
          packageId: currentPkg.id,
          packageTitle: currentPkg.title,
          priceEur: currentPkg.priceEur,
          platform: currentPkg.platform,
        })
      );
    }
  };

  return (
    <div
      onClick={handleSelectPackage}
      className="bg-white rounded-3xl border border-[#E7E7E2] p-6 hover:border-[#0A0A0A] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-5 group font-sans"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-300 ${visual.badgeBg}`}>
            {visual.icon}
          </div>
          <span className="text-2xl font-black text-[#0A0A0A]">
            €{currentPkg.priceEur.toLocaleString()}
          </span>
        </div>

        <h4 className="font-black text-[#0A0A0A] text-base group-hover:text-[#FF2D78] transition-colors mb-2 leading-snug">
          {currentPkg.title}
        </h4>
        <p className="text-sm text-[#555550] leading-[22px] line-clamp-3 mb-4 font-normal">
          {currentPkg.description}
        </p>

        {/* Inclusions */}
        {currentPkg.inclusions && currentPkg.inclusions.length > 0 && (
          <ul className="space-y-2 border-t border-[#F4F4F0] pt-4 text-sm text-[#555550]">
            {currentPkg.inclusions.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#23744D] flex-shrink-0" />
                <span className="truncate font-medium">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-4 border-t border-[#E7E7E2] flex items-center justify-between text-sm text-[#73736A] font-bold">
        <div className="flex items-center gap-3.5">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#73736A]" />
            {currentPkg.deliveryDays}d Delivery
          </span>
          <span className="flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-[#73736A]" />
            {currentPkg.revisions} Rev
          </span>
        </div>

        <div className="w-8 h-8 rounded-full bg-[#F4F4F0] group-hover:bg-[#0A0A0A] group-hover:text-white flex items-center justify-center text-[#0A0A0A] transition-colors">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
