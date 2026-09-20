'use client';

import React from 'react';
import { CreatorPackage } from '@/types';
import { useAppDispatch } from '@/redux/hooks';
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

function getPackageVisual(pkg: CreatorPackage) {
  const type = (pkg.type || '').toLowerCase();
  const title = (pkg.title || '').toLowerCase();
  const platform = pkg.platform;

  // 1. Story Package
  if (type === 'story' || title.includes('story')) {
    return {
      icon: <Radio className="w-5 h-5 text-[#E1306C]" />,
      badgeBg: 'bg-gradient-to-tr from-amber-500/15 via-rose-500/20 to-purple-600/15 border border-[#E1306C]/30',
      label: 'Instagram Story',
      labelColor: 'text-[#C75D47] bg-[#FDF0ED]',
    };
  }

  // 2. Reel / Short Video
  if (type === 'reel' || title.includes('reel') || title.includes('short')) {
    return {
      icon: <Clapperboard className="w-5 h-5 text-[#FF2D78]" />,
      badgeBg: 'bg-[#FFF0F5] border border-[#FF2D78]/30',
      label: 'Video Reel',
      labelColor: 'text-[#FF2D78] bg-[#FFF0F5]',
    };
  }

  // 3. Feed Post / Carousel / Photo
  if (type === 'post' || title.includes('post') || title.includes('feed') || title.includes('photo') || title.includes('carousel')) {
    return {
      icon: <Layers className="w-5 h-5 text-[#2563EB]" />,
      badgeBg: 'bg-[#EFF6FF] border border-blue-200',
      label: 'Feed Post / Carousel',
      labelColor: 'text-[#2563EB] bg-[#EFF6FF]',
    };
  }

  // 4. YouTube Dedicated / Mid-roll
  if (platform === 'youtube' || type === 'video' || title.includes('youtube')) {
    return {
      icon: <Video className="w-5 h-5 text-[#DC2626]" />,
      badgeBg: 'bg-[#FEF2F2] border border-red-200',
      label: 'YouTube Video',
      labelColor: 'text-[#DC2626] bg-[#FEF2F2]',
    };
  }

  // 5. TikTok
  if (platform === 'tiktok') {
    return {
      icon: <Film className="w-5 h-5 text-white" />,
      badgeBg: 'bg-[#0A0A0A] border border-[#0A0A0A]',
      label: 'TikTok Video',
      labelColor: 'text-[#0A0A0A] bg-[#F4F4F0]',
    };
  }

  // 6. UGC / Ad Creatives / Custom
  return {
    icon: <Sparkles className="w-5 h-5 text-[#7C3AED]" />,
    badgeBg: 'bg-[#F5F3FF] border border-purple-200',
    label: 'UGC Creative',
    labelColor: 'text-[#7C3AED] bg-[#F5F3FF]',
  };
}

export function PackageCard({ packageItem, pkg, creator, onSelect }: PackageCardProps) {
  const dispatch = useAppDispatch();
  const currentPkg = packageItem || pkg;

  if (!currentPkg) return null;

  const visual = getPackageVisual(currentPkg);

  const handleSelectPackage = () => {
    if (onSelect) {
      onSelect(currentPkg);
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
