'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { CreatorCard } from '@/components/shared/CreatorCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Bookmark, Search } from 'lucide-react';
import { Button } from 'antd';

export default function BrandSavedShortlistPage() {
  const { creators, savedCreatorIds } = useAppSelector((state) => state.creator);

  const savedCreators = creators.filter((c) => savedCreatorIds.includes(c.id));

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Saved Creator Shortlist"
        subtitle={`You have ${savedCreators.length} bookmarked creators ready for outreach.`}
        action={
          <Link href="/creators">
            <Button
              type="primary"
              className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white hover:!text-white border-none flex items-center gap-1.5 shadow-sm cursor-pointer"
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
          <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E7E7E2] shadow-2xs">
            <EmptyState
              color="neutral"
              icon={<Bookmark className="w-8 h-8" />}
              badge="Shortlist"
              title="Your Shortlist is Empty"
              description="Click the bookmark icon on any creator card across the marketplace to add them to your saved campaign talent pool."
              primaryAction={{
                label: 'Browse Marketplace',
                href: '/creators',
              }}
              variant="plain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
