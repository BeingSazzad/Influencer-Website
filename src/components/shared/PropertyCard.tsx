'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleSaveProperty } from '@/redux/slices/propertySlice';
import { openInquiryModal } from '@/redux/slices/uiSlice';
import {
  Bed,
  Bath,
  Maximize2,
  Heart,
  MapPin,
  Sparkles,
  ShieldCheck,
  Eye,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Video
} from 'lucide-react';
import { Button, Tag, Tooltip } from 'antd';

interface PropertyCardProps {
  property: Property;
  viewMode?: 'grid' | 'list';
}

export function PropertyCard({ property, viewMode = 'grid' }: PropertyCardProps) {
  const dispatch = useAppDispatch();
  const { savedPropertyIds } = useAppSelector((state) => state.property);
  const isSaved = savedPropertyIds.includes(property.id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  const handleToggleHeart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleSaveProperty(property.id));
  };

  const handleOpenInquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      openInquiryModal({
        id: property.id,
        title: property.title,
        price: property.priceFormatted,
        image: property.images[0],
      })
    );
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row group">
        {/* Image Section */}
        <div className="relative md:w-80 h-60 md:h-auto overflow-hidden bg-slate-100 flex-shrink-0">
          <img
            src={property.images[currentImageIndex] || property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold rounded-md uppercase tracking-wider">
              {property.type}
            </span>
            {property.isFeatured && (
              <span className="px-2.5 py-1 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold rounded-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
          </div>
          <button
            onClick={handleToggleHeart}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 ${
              isSaved ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-2xl font-extrabold text-slate-950 font-serif">
                {property.priceFormatted}
              </div>
              <span className="text-xs text-slate-400">{property.viewsCount.toLocaleString()} views</span>
            </div>
            <Link href={`/properties/${property.id}`} className="group-hover:text-emerald-700 transition-colors">
              <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{property.title}</h3>
            </Link>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 mb-3">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>{property.address.street}, {property.address.city}, {property.address.state}</span>
            </p>
            <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
              {property.description}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5"><Bed className="w-4 h-4 text-emerald-600" /> {property.specs.bedrooms} Beds</span>
              <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-emerald-600" /> {property.specs.bathrooms} Baths</span>
              <span className="flex items-center gap-1.5"><Maximize2 className="w-4 h-4 text-emerald-600" /> {property.specs.sqft.toLocaleString()} sqft</span>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleOpenInquiry} type="default" className="text-xs font-semibold">
                Schedule Tour
              </Button>
              <Link href={`/properties/${property.id}`}>
                <Button type="primary" className="text-xs font-semibold">
                  View Specs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group luxury-card">
      {/* Photo Carousel Container */}
      <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
        <Link href={`/properties/${property.id}`}>
          <img
            src={property.images[currentImageIndex] || property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Carousel Prev/Next Overlay Buttons */}
        {property.images.length > 1 && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handlePrevImage}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center backdrop-blur-xs transition-colors z-10"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center backdrop-blur-xs transition-colors z-10"
              aria-label="Next Image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold rounded-md uppercase tracking-wider shadow-xs">
            {property.type}
          </span>
          {property.isFeatured && (
            <span className="px-2.5 py-1 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold rounded-md flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3 h-3 text-emerald-200" />
              Featured
            </span>
          )}
          {property.virtualTour3D && (
            <span className="px-2 py-1 bg-sky-600/90 backdrop-blur-md text-white text-[10px] font-bold rounded-md flex items-center gap-1">
              <Video className="w-3 h-3" />
              3D Tour
            </span>
          )}
        </div>

        {/* Heart Favorite Button */}
        <button
          onClick={handleToggleHeart}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-transform active:scale-90 z-10 shadow-sm ${
            isSaved
              ? 'bg-rose-500 text-white'
              : 'bg-white/85 text-slate-700 hover:bg-white hover:text-rose-500'
          }`}
          title={isSaved ? 'Saved to Wishlist' : 'Save Property'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>

        {/* Image Dots Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
          {property.images.slice(0, 5).map((_, idx) => (
            <span
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                currentImageIndex === idx ? 'w-4 bg-white shadow-xs' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Views */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-2xl font-extrabold text-slate-950 font-serif tracking-tight">
              {property.priceFormatted}
            </span>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
              Verified Trophy
            </span>
          </div>

          {/* Title */}
          <Link href={`/properties/${property.id}`} className="group-hover:text-emerald-700 transition-colors">
            <h3 className="font-bold text-slate-900 text-base line-clamp-1 mb-1">
              {property.title}
            </h3>
          </Link>

          {/* Location */}
          <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="truncate">{property.address.street}, {property.address.city}, {property.address.state}</span>
          </p>

          {/* Specs Bar */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-semibold text-slate-700 text-center">
            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-[10px] font-normal uppercase">Beds</span>
              <span className="flex items-center gap-1 font-bold text-slate-900">
                <Bed className="w-3.5 h-3.5 text-emerald-600" />
                {property.specs.bedrooms}
              </span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-200/80">
              <span className="text-slate-400 text-[10px] font-normal uppercase">Baths</span>
              <span className="flex items-center gap-1 font-bold text-slate-900">
                <Bath className="w-3.5 h-3.5 text-emerald-600" />
                {property.specs.bathrooms}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-[10px] font-normal uppercase">Sq Ft</span>
              <span className="flex items-center gap-1 font-bold text-slate-900">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
                {property.specs.sqft.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer with Agent Info and Tour Button */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <Link href={`/agents/${property.agent.id}`} className="flex items-center gap-2 group/agent">
            <div className="relative">
              <img
                src={property.agent.avatar}
                alt={property.agent.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-900 group-hover/agent:text-emerald-600 transition-colors truncate max-w-[110px]">
                {property.agent.name}
              </div>
              <div className="text-[10px] text-slate-500 truncate">{property.agent.socialFollowers}</div>
            </div>
          </Link>

          <Button
            onClick={handleOpenInquiry}
            type="primary"
            size="small"
            className="text-xs font-semibold h-8 rounded-lg"
          >
            Schedule Tour
          </Button>
        </div>
      </div>
    </div>
  );
}
