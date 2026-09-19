'use client';

import React from 'react';
import { CreatorPackage } from '@/types';
import { useAppDispatch } from '@/redux/hooks';
import { openOfferModal } from '@/redux/slices/orderSlice';
import { ArrowRight, Check, Clock, RotateCcw, Smartphone, Video, Film, Sparkles } from 'lucide-react';

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

export function PackageCard({ packageItem, pkg, creator, onSelect }: PackageCardProps) {
  const dispatch = useAppDispatch();
  const currentPkg = packageItem || pkg;

  if (!currentPkg) return null;

  const platformIcons = {
    instagram: <Smartphone className="w-4 h-4 text-[#E1306C]" />,
    tiktok: <Film className="w-4 h-4 text-[#151515]" />,
    youtube: <Video className="w-4 h-4 text-[#FF0000]" />,
    ugc: <Sparkles className="w-4 h-4 text-[#7C5AC2]" />,
  };

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
      className="bg-white rounded-2xl border border-[#E7E7E2] p-5 hover:border-[#151515] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-xl bg-[#F4F4F0] flex items-center justify-center">
            {platformIcons[currentPkg.platform]}
          </div>
          <span className="text-xl font-extrabold text-[#151515] font-sans">
            €{currentPkg.priceEur.toLocaleString()}
          </span>
        </div>

        <h4 className="font-bold text-[#151515] text-base group-hover:text-[#2B7FFF] transition-colors mb-1.5">
          {currentPkg.title}
        </h4>
        <p className="text-xs text-[#52524B] leading-relaxed line-clamp-3 mb-4">
          {currentPkg.description}
        </p>

        {/* Inclusions */}
        {currentPkg.inclusions && currentPkg.inclusions.length > 0 && (
          <ul className="space-y-1.5 border-t border-[#F4F4F0] pt-3 text-xs text-[#52524B]">
            {currentPkg.inclusions.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#23744D] flex-shrink-0" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-3 border-t border-[#E7E7E2] flex items-center justify-between text-xs text-[#73736A]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {currentPkg.deliveryDays}d Delivery
          </span>
          <span className="flex items-center gap-1">
            <RotateCcw className="w-3.5 h-3.5" />
            {currentPkg.revisions} Rev
          </span>
        </div>

        <div className="w-8 h-8 rounded-full bg-[#F4F4F0] group-hover:bg-[#151515] group-hover:text-white flex items-center justify-center text-[#151515] transition-colors">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
