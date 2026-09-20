import React from 'react';
import { Skeleton, CreatorGridSkeleton } from '@/components/shared/Skeleton';

export default function WebsiteLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Banner Skeleton */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E7E2] shadow-xs space-y-4">
        <Skeleton className="h-6 w-36 rounded-full" />
        <Skeleton className="h-10 w-96 max-w-full rounded-xl" />
        <Skeleton className="h-4 w-2/3 max-w-full rounded-md" />
      </div>

      {/* Filter / Tabs Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        <Skeleton className="h-10 w-28 rounded-full shrink-0" />
        <Skeleton className="h-10 w-32 rounded-full shrink-0" />
        <Skeleton className="h-10 w-28 rounded-full shrink-0" />
        <Skeleton className="h-10 w-24 rounded-full shrink-0" />
      </div>

      {/* Creator Grid Skeleton */}
      <CreatorGridSkeleton count={6} />
    </div>
  );
}
