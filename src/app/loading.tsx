import React from 'react';
import { Skeleton, SkeletonCircle } from '@/components/shared/Skeleton';

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col font-sans">
      {/* Header skeleton */}
      <div className="w-full bg-white/80 border-b border-[#E7E7E2] px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <SkeletonCircle size={36} />
          <Skeleton className="h-6 w-32 rounded-lg" />
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
      </div>

      {/* Main content placeholder */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E7E2] space-y-4 shadow-xs">
          <Skeleton className="h-6 w-44 rounded-full" />
          <Skeleton className="h-10 w-96 max-w-full rounded-xl" />
          <Skeleton className="h-4 w-2/3 max-w-full rounded-md" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-[#E7E7E2] space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <SkeletonCircle size={48} />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28 rounded-md" />
                  <Skeleton className="h-3 w-20 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-16 w-full rounded-2xl" />
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-9 w-24 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
