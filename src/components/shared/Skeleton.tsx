'use client';

import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'light' | 'dark';
}

/**
 * Base atomic skeleton with smooth shimmer animation
 */
export function Skeleton({ className = '', variant = 'light', ...props }: SkeletonProps) {
  const shimmerClass = variant === 'dark' ? 'skeleton-shimmer-dark' : 'skeleton-shimmer';
  return (
    <div
      className={`rounded-xl transition-all duration-300 ${shimmerClass} ${className}`}
      {...props}
    />
  );
}

/**
 * Circular avatar skeleton
 */
export function SkeletonCircle({
  size = 40,
  className = '',
  variant = 'light',
}: {
  size?: number;
  className?: string;
  variant?: 'light' | 'dark';
}) {
  return (
    <Skeleton
      style={{ width: size, height: size }}
      className={`rounded-full shrink-0 ${className}`}
      variant={variant}
    />
  );
}

/**
 * Skeleton matching CreatorCard.tsx
 */
export function CreatorCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-5 border border-[#E7E7E2] shadow-xs flex flex-col justify-between space-y-4">
      {/* Top Media / Avatar Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <SkeletonCircle size={56} />
          <div className="space-y-2">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-3 w-20 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-7 w-7 rounded-full" />
      </div>

      {/* Bio / Description preview */}
      <div className="space-y-2 py-1">
        <Skeleton className="h-3.5 w-full rounded-md" />
        <Skeleton className="h-3.5 w-4/5 rounded-md" />
      </div>

      {/* Category Badges */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]/60">
        <div className="space-y-1.5 text-center">
          <Skeleton className="h-3 w-10 mx-auto rounded-md" />
          <Skeleton className="h-4 w-12 mx-auto rounded-md" />
        </div>
        <div className="space-y-1.5 text-center">
          <Skeleton className="h-3 w-10 mx-auto rounded-md" />
          <Skeleton className="h-4 w-12 mx-auto rounded-md" />
        </div>
        <div className="space-y-1.5 text-center">
          <Skeleton className="h-3 w-10 mx-auto rounded-md" />
          <Skeleton className="h-4 w-12 mx-auto rounded-md" />
        </div>
      </div>

      {/* Footer Pricing & CTA */}
      <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#E7E7E2]/60">
        <div className="space-y-1">
          <Skeleton className="h-2.5 w-12 rounded-md" />
          <Skeleton className="h-5 w-20 rounded-md" />
        </div>
        <Skeleton className="h-10 w-28 rounded-full" />
      </div>
    </div>
  );
}

/**
 * Grid of CreatorCardSkeletons
 */
export function CreatorGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CreatorCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Full page skeleton for Creator Profile (/creators/[id])
 */
export function CreatorProfileSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Cover & Profile Header Card */}
      <div className="bg-white rounded-3xl border border-[#E7E7E2] overflow-hidden shadow-xs">
        {/* Cover Skeleton */}
        <Skeleton className="h-48 sm:h-64 w-full rounded-none" />

        <div className="p-6 sm:p-10 -mt-16 sm:-mt-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <SkeletonCircle size={112} className="ring-4 ring-white shadow-lg" />
            <div className="space-y-2 pb-2">
              <Skeleton className="h-8 w-56 rounded-lg" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Skeleton className="h-11 w-28 rounded-full" />
            <Skeleton className="h-11 w-36 rounded-full" />
            <Skeleton className="h-11 w-11 rounded-full" />
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 border-t border-[#E7E7E2] bg-[#FAFAF8]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2 text-center sm:text-left">
              <Skeleton className="h-3 w-16 mx-auto sm:mx-0 rounded-md" />
              <Skeleton className="h-6 w-24 mx-auto sm:mx-0 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        <Skeleton className="h-10 w-28 rounded-full shrink-0" />
        <Skeleton className="h-10 w-32 rounded-full shrink-0" />
        <Skeleton className="h-10 w-28 rounded-full shrink-0" />
        <Skeleton className="h-10 w-24 rounded-full shrink-0" />
      </div>

      {/* Main Content & Packages Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E7E2] space-y-4">
            <Skeleton className="h-6 w-40 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E7E2] space-y-4">
            <Skeleton className="h-6 w-48 rounded-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Skeleton className="h-44 rounded-2xl" />
              <Skeleton className="h-44 rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Right Sidebar Packages Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E7E7E2] space-y-5">
            <Skeleton className="h-6 w-36 rounded-lg" />
            <Skeleton className="h-28 rounded-2xl" />
            <Skeleton className="h-28 rounded-2xl" />
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for Dashboard Workspaces (Brand & Creator)
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-8 p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-64 rounded-lg" />
          <Skeleton className="h-4 w-80 rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-36 rounded-full" />
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E7E7E2] shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-3.5 w-24 rounded-md" />
              <SkeletonCircle size={36} />
            </div>
            <Skeleton className="h-9 w-32 rounded-lg" />
            <Skeleton className="h-3 w-28 rounded-md" />
          </div>
        ))}
      </div>

      {/* Main Grid: Active Items & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E7E7E2]">
            <Skeleton className="h-6 w-44 rounded-lg" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]/60 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <SkeletonCircle size={44} />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-36 rounded-md" />
                    <Skeleton className="h-3 w-24 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-7 w-20 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column / Quick Activity */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-xs space-y-4">
          <Skeleton className="h-6 w-36 rounded-lg" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-[#E7E7E2]/40 last:border-none">
                <SkeletonCircle size={32} />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3.5 w-full rounded-md" />
                  <Skeleton className="h-3 w-20 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Generic Table / List Skeleton
 */
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white rounded-3xl border border-[#E7E7E2] overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-4 sm:p-6 bg-[#FAFAF8] border-b border-[#E7E7E2] flex items-center justify-between">
        <Skeleton className="h-5 w-36 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
      {/* Rows */}
      <div className="divide-y divide-[#E7E7E2]">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="p-4 sm:p-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SkeletonCircle size={36} />
              <div className="space-y-1">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-8">
              {Array.from({ length: cols - 2 }).map((_, c) => (
                <Skeleton key={c} className="h-4 w-20 rounded-md" />
              ))}
            </div>
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
