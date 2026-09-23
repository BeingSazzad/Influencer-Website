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
  Youtube,
  Instagram,
  Layers,
  Edit3,
  ShieldCheck,
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

export function getPackageChannels(pkg: CreatorPackage): { id: string; label: string; icon: React.ReactNode }[] {
  const rawPlatforms =
    pkg.platforms && pkg.platforms.length > 0
      ? pkg.platforms
      : pkg.platform === 'all' || pkg.platform === 'multi'
      ? ['instagram', 'tiktok', 'youtube']
      : [pkg.platform];

  return rawPlatforms.map((p) => {
    switch (p) {
      case 'instagram':
        return { id: 'instagram', label: 'Instagram', icon: <Instagram className="w-3 h-3 text-[#FF2D78]" /> };
      case 'tiktok':
        return { id: 'tiktok', label: 'TikTok', icon: <Film className="w-3 h-3 text-[#0A0A0A]" /> };
      case 'youtube':
        return { id: 'youtube', label: 'YouTube', icon: <Youtube className="w-3 h-3 text-red-500" /> };
      case 'ugc':
        return { id: 'ugc', label: 'UGC', icon: <Sparkles className="w-3 h-3 text-purple-600" /> };
      default:
        return { id: p, label: 'Omni', icon: <Layers className="w-3 h-3 text-amber-600" /> };
    }
  });
}

export function PackageCard({ packageItem, pkg, creator, onSelect }: PackageCardProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const currentPkg = packageItem || pkg;

  if (!currentPkg) return null;

  const channels = getPackageChannels(currentPkg);

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
      className={`rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg cursor-pointer group font-sans relative bg-white ${
        currentPkg.popular
          ? 'border-[#0A0A0A] ring-1 ring-[#0A0A0A]'
          : 'border-[#E7E7E2] hover:border-[#0A0A0A]'
      }`}
    >
      {currentPkg.popular && (
        <div className="absolute -top-3 left-6 bg-[#0A0A0A] text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Featured Deal</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Header row: Channel Tags + Price */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {channels.map((ch) => (
              <span
                key={ch.id}
                className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FAFAF8] text-[#0A0A0A] border border-[#E7E7E2] inline-flex items-center gap-1"
              >
                {ch.icon}
                <span>{ch.label}</span>
              </span>
            ))}
          </div>

          <span className="text-2xl font-black text-[#0A0A0A]">
            €{currentPkg.priceEur.toLocaleString()}
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h4 className="font-black text-[#0A0A0A] text-base group-hover:text-zinc-700 transition-colors leading-snug">
            {currentPkg.title}
          </h4>
          <p className="text-xs text-[#73736A] mt-1.5 leading-relaxed line-clamp-2">
            {currentPkg.description}
          </p>
        </div>

        {/* Inclusions Checklist */}
        {currentPkg.inclusions && currentPkg.inclusions.length > 0 && (
          <ul className="space-y-1.5 border-t border-[#F4F4F0] pt-3 text-xs text-[#44443E]">
            {currentPkg.inclusions.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#23744D] shrink-0" />
                <span className="truncate font-medium">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer Specs & CTA */}
      <div className="pt-4 mt-4 border-t border-[#E7E7E2] space-y-3">
        <div className="flex items-center justify-between text-xs text-[#73736A] font-bold">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#73736A]" />
            {currentPkg.deliveryDays}d turnaround
          </span>
          <span className="flex items-center gap-1">
            <RotateCcw className="w-3.5 h-3.5 text-[#73736A]" />
            {currentPkg.revisions} revisions
          </span>
        </div>

        <button
          type="button"
          className="w-full h-10 rounded-full font-bold text-xs bg-[#0A0A0A] group-hover:bg-zinc-800 text-white transition-all flex items-center justify-center gap-1.5 shadow-2xs"
        >
          {isSelf ? (
            <>
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Rate Card</span>
            </>
          ) : (
            <>
              <span>Book Deal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
