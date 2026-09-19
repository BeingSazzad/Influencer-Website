export type UserRole = 'guest' | 'buyer' | 'agent' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  location?: string;
  agency?: string;
  bio?: string;
  socials?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    linkedin?: string;
  };
  rating?: number;
  reviewsCount?: number;
  salesVolume?: string;
  activeListingsCount?: number;
}

export type PropertyType = 'villa' | 'penthouse' | 'apartment' | 'mansion' | 'townhouse' | 'commercial';
export type PropertyStatus = 'for_sale' | 'for_rent' | 'sold' | 'pending';

export interface Property {
  id: string;
  title: string;
  tagline: string;
  slug: string;
  price: number;
  priceFormatted: string;
  type: PropertyType;
  status: PropertyStatus;
  isFeatured?: boolean;
  isVerified?: boolean;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  specs: {
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    garage: number;
    yearBuilt: number;
    lotSize?: string;
  };
  images: string[];
  videoTourUrl?: string;
  virtualTour3D?: boolean;
  description: string;
  amenities: string[];
  agent: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    phone: string;
    email: string;
    rating: number;
    verified: boolean;
    socialFollowers: string;
  };
  postedAt: string;
  viewsCount: number;
  savesCount: number;
}

export type LeadStatus = 'new' | 'contacted' | 'viewing_scheduled' | 'offer_made' | 'closed';

export interface Lead {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAvatar?: string;
  propertyId: string;
  propertyTitle: string;
  propertyPrice: string;
  propertyImage: string;
  message: string;
  preferredDate?: string;
  status: LeadStatus;
  createdAt: string;
  budgetRange: string;
  notes?: string;
}

export interface MarketInsight {
  id: string;
  title: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  authorAvatar: string;
  image: string;
  summary: string;
  views: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  rating: number;
  comment: string;
  date: string;
  propertyTitle?: string;
}

export interface PropertyFilterState {
  searchQuery: string;
  city: string;
  type: string;
  status: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'all';
  bathrooms: number | 'all';
  amenities: string[];
  sortBy: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}
