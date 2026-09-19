'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addProperty } from '@/redux/slices/propertySlice';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import {
  Building2,
  MapPin,
  Image as ImageIcon,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Video,
  Plus
} from 'lucide-react';
import { Steps, Input, Select, Button, InputNumber, Checkbox, message } from 'antd';
import { Property, PropertyType, PropertyStatus } from '@/types';

export default function AddNewListingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  const [currentStep, setCurrentStep] = useState(0);

  // Form States
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [type, setType] = useState<PropertyType>('villa');
  const [status, setStatus] = useState<PropertyStatus>('for_sale');

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('Bel Air');
  const [stateName, setStateName] = useState('California');
  const [country, setCountry] = useState('USA');
  const [bedrooms, setBedrooms] = useState(5);
  const [bathrooms, setBathrooms] = useState(7);
  const [sqft, setSqft] = useState(8500);
  const [garage, setGarage] = useState(4);
  const [yearBuilt, setYearBuilt] = useState(2025);

  const [primaryImage, setPrimaryImage] = useState(
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
  );
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [virtualTour3D, setVirtualTour3D] = useState(true);

  const [price, setPrice] = useState(16500000);
  const [description, setDescription] = useState(
    'A newly constructed architectural masterpiece featuring dramatic floor-to-ceiling glass walls, cantilevered zero-edge pool, Italian travertine surfaces, private theater, and smart home automation throughout.'
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Infinity Edge Pool',
    'Wellness Spa & Sauna',
    'Private Cinema Theater',
    '1,200 Bottle Wine Cellar',
    'Smart Home Automation',
    'Gourmet Chef Kitchen',
  ]);

  const allAmenityOptions = [
    'Infinity Edge Pool',
    'Wellness Spa & Sauna',
    'Private Cinema Theater',
    '1,200 Bottle Wine Cellar',
    'Helipad Access',
    'Smart Home Automation',
    'Gourmet Chef Kitchen',
    'Gated Private Security',
    'Elevator Access',
    'Outdoor BBQ Pavilion',
    'Deepwater Yacht Dock',
    'Tennis / Pickleball Court',
  ];

  const handleNext = () => {
    if (currentStep === 0 && !title) {
      message.error('Please enter the estate title.');
      return;
    }
    if (currentStep === 1 && (!street || !city)) {
      message.error('Please enter property location.');
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handlePublish = () => {
    if (!price || !title) {
      message.error('Please fill in title and price.');
      return;
    }

    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      title: title,
      tagline: tagline || 'Architectural Sanctuary with Unrivaled Views',
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      price: price,
      priceFormatted: `$${price.toLocaleString()}`,
      type: type,
      status: status,
      isFeatured: true,
      isVerified: true,
      address: {
        street: street || '10200 Sunset Boulevard',
        city: city || 'Bel Air',
        state: stateName || 'California',
        country: country || 'USA',
        zipCode: '90077',
      },
      coordinates: {
        lat: 34.0837,
        lng: -118.4487,
      },
      specs: {
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        sqft: sqft,
        garage: garage,
        yearBuilt: yearBuilt,
        lotSize: '1.2 Acres',
      },
      images: [
        primaryImage,
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      ],
      videoTourUrl: videoUrl,
      virtualTour3D: virtualTour3D,
      description: description,
      amenities: selectedAmenities,
      agent: {
        id: currentUser?.id || 'agent_01',
        name: currentUser?.name || 'Sophia Vance',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        title: currentUser?.agency || 'Founding Partner & Luxury Director',
        phone: currentUser?.phone || '+1 (310) 555-0199',
        email: currentUser?.email || 'sophia@vancerealestate.com',
        rating: 4.98,
        verified: true,
        socialFollowers: '1.8M Followers',
      },
      postedAt: new Date().toISOString().split('T')[0],
      viewsCount: 1,
      savesCount: 0,
    };

    dispatch(addProperty(newProperty));
    message.success('New trophy property successfully published to the LUXE PRIME portal!');
    router.push('/agent/listings');
  };

  return (
    <div>
      <DashboardHeader
        title="Launch New Luxury Estate"
        subtitle="Create a bespoke multi-channel listing with 4K video distribution"
      />

      <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-8">
        {/* Ant Design Steps */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <Steps
            current={currentStep}
            items={[
              { title: 'Overview', icon: <Building2 className="w-4 h-4" /> },
              { title: 'Location & Specs', icon: <MapPin className="w-4 h-4" /> },
              { title: 'Media & 4K Tour', icon: <ImageIcon className="w-4 h-4" /> },
              { title: 'Pricing & Publish', icon: <DollarSign className="w-4 h-4" /> },
            ]}
          />
        </div>

        {/* Step Content */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          {/* Step 0: Overview */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-950 font-serif">1. Basic Property Information</h3>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Estate Title</label>
                <Input
                  size="large"
                  placeholder="e.g. The Bel Air Promontory Estate"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Promotional Tagline</label>
                <Input
                  size="large"
                  placeholder="e.g. Modern Glass Masterpiece with 360° Panoramic Ocean & City Vistas"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Asset Category</label>
                  <Select
                    size="large"
                    value={type}
                    onChange={setType}
                    className="w-full"
                    options={[
                      { value: 'villa', label: 'Architectural Luxury Villa' },
                      { value: 'penthouse', label: 'Sky Penthouse' },
                      { value: 'mansion', label: 'Waterfront Mansion' },
                      { value: 'apartment', label: 'Designer Apartment' },
                      { value: 'townhouse', label: 'Historic Townhouse' },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Listing Status</label>
                  <Select
                    size="large"
                    value={status}
                    onChange={setStatus}
                    className="w-full"
                    options={[
                      { value: 'for_sale', label: 'For Sale' },
                      { value: 'for_rent', label: 'For Lease' },
                      { value: 'pending', label: 'Under Offer' },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Location & Specs */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-950 font-serif">2. Location & Dimensions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Street Address</label>
                  <Input
                    size="large"
                    placeholder="e.g. 10240 Bellagio Road"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">City / Neighborhood</label>
                  <Input
                    size="large"
                    placeholder="e.g. Bel Air"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">State / Province</label>
                  <Input
                    size="large"
                    placeholder="e.g. California"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Country</label>
                  <Input
                    size="large"
                    placeholder="e.g. USA"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Bedrooms</label>
                  <InputNumber min={1} max={20} value={bedrooms} onChange={(val) => setBedrooms(val || 1)} className="w-full" size="large" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Bathrooms</label>
                  <InputNumber min={1} max={25} value={bathrooms} onChange={(val) => setBathrooms(val || 1)} className="w-full" size="large" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Living Sq Ft</label>
                  <InputNumber min={500} max={100000} value={sqft} onChange={(val) => setSqft(val || 1000)} className="w-full" size="large" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Garage Spaces</label>
                  <InputNumber min={1} max={30} value={garage} onChange={(val) => setGarage(val || 2)} className="w-full" size="large" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Media & Video */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-950 font-serif">3. High-Res Media & Video Tour</h3>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Hero Image URL</label>
                <Input
                  size="large"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={primaryImage}
                  onChange={(e) => setPrimaryImage(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              {primaryImage && (
                <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-200">
                  <img src={primaryImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">YouTube Walkthrough Video URL</label>
                <Input
                  size="large"
                  prefix={<Video className="w-4 h-4 text-rose-600 mr-1" />}
                  placeholder="https://youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="pt-2">
                <Checkbox
                  checked={virtualTour3D}
                  onChange={(e) => setVirtualTour3D(e.target.checked)}
                  className="font-semibold text-slate-800"
                >
                  Enable 3D Matterport / Virtual Tour Badge
                </Checkbox>
              </div>
            </div>
          )}

          {/* Step 3: Pricing & Publish */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-950 font-serif">4. Valuation & Inclusions</h3>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Listing Price (USD $)</label>
                <InputNumber
                  size="large"
                  min={100000}
                  max={500000000}
                  value={price}
                  onChange={(val) => setPrice(val || 1000000)}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  className="w-full font-bold text-emerald-700 text-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Architectural Narrative</label>
                <Input.TextArea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Select Verified Amenities</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {allAmenityOptions.map((amenity) => {
                    const isChecked = selectedAmenities.includes(amenity);
                    return (
                      <button
                        type="button"
                        key={amenity}
                        onClick={() => {
                          if (isChecked) {
                            setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
                          } else {
                            setSelectedAmenities([...selectedAmenities, amenity]);
                          }
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-colors ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span>{amenity}</span>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Actions */}
          <div className="pt-8 mt-6 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 0 ? (
              <Button onClick={handlePrev} className="flex items-center gap-1 font-semibold">
                <ArrowLeft className="w-4 h-4" />
                Previous Step
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <Button type="primary" onClick={handleNext} className="flex items-center gap-1 font-bold">
                Next Step
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={handlePublish}
                className="bg-emerald-600 hover:bg-emerald-500 font-bold px-8 h-11 text-sm shadow-lg shadow-emerald-600/30"
              >
                Publish Trophy Estate Live ⚡
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
