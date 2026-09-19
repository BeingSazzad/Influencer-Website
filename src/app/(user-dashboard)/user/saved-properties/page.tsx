'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { PropertyCard } from '@/components/shared/PropertyCard';
import { Heart, Building, ArrowRight } from 'lucide-react';
import { Button } from 'antd';

export default function UserSavedPropertiesPage() {
  const { properties, savedPropertyIds } = useAppSelector((state) => state.property);
  const savedProperties = properties.filter((p) => savedPropertyIds.includes(p.id));

  return (
    <div>
      <DashboardHeader
        title="Saved Trophy Wishlist"
        subtitle="Manage your private wishlist and comparison portfolio"
        actionButton={
          <Link href="/properties">
            <Button type="primary" className="font-semibold text-xs h-9">
              + Add More Estates
            </Button>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-7xl">
        {savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-md mx-auto shadow-xs">
            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">Your Wishlist is Empty</h3>
            <p className="text-xs text-slate-500 mb-6">
              Browse our verified trophy portfolio and click the heart icon to save estates here.
            </p>
            <Link href="/properties">
              <Button type="primary" className="font-semibold">
                Discover Properties
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
