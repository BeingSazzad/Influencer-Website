import React from 'react';
import { Skeleton } from '@/components/shared/Skeleton';

export default function LegalLoading() {
  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner Skeleton */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E7E2] shadow-xs space-y-4">
        <Skeleton className="h-6 w-36 rounded-full" />
        <Skeleton className="h-9 w-64 rounded-xl" />
        <Skeleton className="h-4 w-4/5 rounded-md" />
        <Skeleton className="h-3 w-48 rounded-md" />
      </div>

      {/* Sections Skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E7E2] shadow-xs space-y-3"
          >
            <Skeleton className="h-6 w-52 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
