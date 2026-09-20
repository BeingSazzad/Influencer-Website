'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { CreatorCard } from '@/components/shared/CreatorCard';
import { Bookmark, Search, ArrowRight } from 'lucide-react';
import { Button } from 'antd';

export default function BrandSavedShortlistPage() {
  const { creators, savedCreatorIds } = useAppSelector((state) => state.creator);

  const savedCreators = creators.filter((c) => savedCreatorIds.includes(c.id));

  return (
    <div className="min-h-screen pb-16">
      <WorkspaceHeader
        title="Saved Creator Shortlist"
        subtitle={`You have ${savedCreators.length} bookmarked creators ready for outreach.`}
        action={
          <Link href="/creators">
            <Button
              type="primary"
              className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white hover:!text-white border-none flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>Explore More Creators</span>
            </Button>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 max-w-[1600px] mx-auto space-y-6">
        {savedCreators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
            {savedCreators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E7E2] shadow-2xs space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FAFAF8] text-[#73736A] flex items-center justify-center mx-auto">
              <Bookmark className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-[#0A0A0A] tracking-tight">Your shortlist is empty</h2>
            <p className="text-sm text-[#73736A] max-w-sm mx-auto font-medium leading-[22px]">
              Click the bookmark icon on any creator card across the marketplace to add them to your saved campaign talent pool.
            </p>
            <Link href="/creators">
              <Button
                type="primary"
                className="h-11 px-7 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white hover:!text-white border-none"
              >
                Browse Marketplace
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
