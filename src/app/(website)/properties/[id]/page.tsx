'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleSaveProperty } from '@/redux/slices/propertySlice';
import { openInquiryModal } from '@/redux/slices/uiSlice';
import {
  Bed,
  Bath,
  Maximize2,
  Car,
  Calendar,
  MapPin,
  Heart,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Video,
  Play,
  Calculator,
  ArrowLeft,
  Sparkles,
  Phone,
  Mail,
  Instagram,
  Youtube
} from 'lucide-react';
import { Button, Tag, Slider, InputNumber, message } from 'antd';

export default function PropertyDetailPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { properties, savedPropertyIds } = useAppSelector((state) => state.property);

  const property = properties.find((p) => p.id === params.id) || properties[0];

  const isSaved = savedPropertyIds.includes(property.id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mortgage Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);

  const loanAmount = property.price * (1 - downPaymentPercent / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;
  const monthlyMortgage =
    monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : loanAmount / numberOfPayments;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      message.success('Property link copied to clipboard!');
    }
  };

  const handleScheduleTour = () => {
    dispatch(
      openInquiryModal({
        id: property.id,
        title: property.title,
        price: property.priceFormatted,
        image: property.images[0],
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link & Actions */}
        <div className="flex items-center justify-between">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Property Portfolio</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 bg-white rounded-full border border-slate-200 text-slate-700 hover:text-emerald-600 hover:bg-slate-50 transition-colors shadow-xs"
              title="Share Listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => dispatch(toggleSaveProperty(property.id))}
              className={`p-2.5 rounded-full border border-slate-200 transition-colors shadow-xs ${
                isSaved ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-slate-700 hover:text-rose-500'
              }`}
              title={isSaved ? 'Saved' : 'Save to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Hero Gallery Grid */}
        <div className="space-y-3">
          {/* Main Large Image */}
          <div className="relative h-[480px] sm:h-[580px] rounded-3xl overflow-hidden shadow-xl bg-slate-900">
            <img
              src={property.images[activeImageIndex] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1.5 bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold rounded-lg uppercase tracking-wider">
                {property.type}
              </span>
              <span className="px-3 py-1.5 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold rounded-lg flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Verified Escrow
              </span>
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                  activeImageIndex === idx ? 'border-emerald-600 shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content & Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left 2 Cols: Details & Specs */}
          <div className="lg:col-span-2 space-y-10">
            {/* Title & Price Header */}
            <div>
              <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-serif">
                  {property.title}
                </h1>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-800 font-serif">
                  {property.priceFormatted}
                </div>
              </div>
              <p className="text-base text-slate-600 font-medium italic mb-2">
                "{property.tagline}"
              </p>
              <p className="text-sm text-slate-500 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}, {property.address.country}
                </span>
              </p>
            </div>

            {/* Key Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Bed className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Bedrooms</div>
                  <div className="text-lg font-bold text-slate-900">{property.specs.bedrooms} Beds</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Bath className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Bathrooms</div>
                  <div className="text-lg font-bold text-slate-900">{property.specs.bathrooms} Baths</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Maximize2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Living Area</div>
                  <div className="text-lg font-bold text-slate-900">{property.specs.sqft.toLocaleString()} sqft</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Garage</div>
                  <div className="text-lg font-bold text-slate-900">{property.specs.garage} Cars</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-slate-950 font-serif">Architectural Overview</h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Verified Amenities */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-slate-950 font-serif">Luxury Amenities & Inclusions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4K Video Tour Preview Banner */}
            <div className="bg-slate-950 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 flex-shrink-0">
                  <Play className="w-6 h-6 ml-0.5 fill-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif">Cinematic 4K Walkthrough</h3>
                  <p className="text-xs text-slate-400">Produced by {property.agent.name} for global YouTube distribution.</p>
                </div>
              </div>
              <Button
                onClick={handleScheduleTour}
                type="primary"
                className="font-bold h-11 px-6 rounded-xl"
              >
                Watch VIP Tour
              </Button>
            </div>

            {/* Interactive Mortgage Calculator */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-xl font-bold text-slate-950 font-serif">Estimated Monthly Investment</h2>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-emerald-700 font-serif">
                    ${Math.round(monthlyMortgage).toLocaleString()}/mo
                  </div>
                  <div className="text-[11px] text-slate-400">Principal & Interest Estimate</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                    <span>Down Payment</span>
                    <span className="text-emerald-700">{downPaymentPercent}% (${Math.round((property.price * downPaymentPercent) / 100).toLocaleString()})</span>
                  </div>
                  <Slider
                    min={10}
                    max={50}
                    step={5}
                    value={downPaymentPercent}
                    onChange={setDownPaymentPercent}
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                    <span>Interest Rate</span>
                    <span className="text-emerald-700">{interestRate}%</span>
                  </div>
                  <Slider
                    min={4.0}
                    max={9.0}
                    step={0.1}
                    value={interestRate}
                    onChange={setInterestRate}
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                    <span>Loan Duration</span>
                    <span className="text-emerald-700">{loanTermYears} Years</span>
                  </div>
                  <Slider
                    min={15}
                    max={30}
                    step={15}
                    value={loanTermYears}
                    onChange={setLoanTermYears}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Broker Agent & Booking Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xl space-y-6 sticky top-28">
              {/* Price Callout */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200/60 rounded-2xl">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1">
                  Private Acquisition Price
                </div>
                <div className="text-3xl font-extrabold text-emerald-950 font-serif">
                  {property.priceFormatted}
                </div>
                <div className="text-[11px] text-emerald-800 mt-1">
                  Est. Escrow Deposit: ${(property.price * 0.05).toLocaleString()}
                </div>
              </div>

              {/* Agent Profile Box */}
              <div className="flex items-center gap-4">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-950 text-base">{property.agent.name}</h3>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-xs text-slate-500">{property.agent.title}</p>
                  <Tag color="green" className="mt-1 font-bold text-[10px]">
                    {property.agent.socialFollowers}
                  </Tag>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Button
                  type="primary"
                  block
                  size="large"
                  onClick={handleScheduleTour}
                  className="h-12 rounded-xl font-bold text-sm shadow-md"
                >
                  Schedule Private Viewing
                </Button>

                <Button
                  type="default"
                  block
                  size="large"
                  onClick={handleScheduleTour}
                  className="h-12 rounded-xl font-bold text-sm border-slate-300 text-slate-700 hover:border-emerald-600"
                >
                  Request Off-Market Dossier
                </Button>
              </div>

              {/* Agent Direct Contacts */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{property.agent.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{property.agent.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
