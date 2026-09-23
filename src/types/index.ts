export type UserRole = 'brand' | 'creator';
export type Language = 'en' | 'de';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  companyName?: string;
  handle?: string;
  location?: string;
  bio?: string;
  balanceEur?: number;
}

export type PlatformType = 'instagram' | 'tiktok' | 'youtube' | 'ugc' | 'all' | 'multi';

export interface CreatorPlatformInfo {
  followers: number;
  followersFormatted: string;
  handle: string;
  engagementRate: string;
  avgViews: string;
}

export interface CreatorPackage {
  id: string;
  platform: PlatformType;
  platforms?: PlatformType[];
  title: string;
  type: 'story' | 'reel' | 'post' | 'video' | 'ugc_video' | 'integrated' | 'bundle';
  description: string;
  priceEur: number;
  deliveryDays: number;
  revisions: number;
  inclusions: string[];
  popular?: boolean;
  usageRights?: string;
  category?: string;
  priceFormatted?: string;
  features?: string[];
}

export interface PortfolioItem {
  id: string;
  brandName: string;
  brandLogo?: string;
  campaignTitle: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  videoPreviewUrl?: string;
  views?: string;
  likes?: string;
  comments?: string;
  shares?: string;
  engagementRate?: string;
  duration?: string;
  aspectRatio?: '9:16' | '16:9' | '1:1';
  platform: PlatformType;
  deliverableType?: string;
  description?: string;
  soundTrack?: string;
  completedDate?: string;
  packagePriceEur?: number;
}

export interface AudienceDemographics {
  topCountries: { country: string; percentage: number }[];
  genderSplit: { female: number; male: number };
  topAgeGroup: string;
}

export interface CreatorReview {
  id: string;
  brandName: string;
  brandLogo: string;
  rating: number;
  comment: string;
  campaignName: string;
  date: string;
}

export interface CreatorPhoto {
  id: string;
  url: string;
  caption: string;
  category?: 'headshot' | 'lifestyle' | 'modeling' | 'bts' | 'outdoors' | 'studio' | 'photo' | string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  date?: string;
  location?: string;
  cameraGear?: string;
  tags?: string[];
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  location: string;
  verified: boolean;
  categories: string[];
  tags: string[];
  platforms: {
    instagram?: CreatorPlatformInfo;
    tiktok?: CreatorPlatformInfo;
    youtube?: CreatorPlatformInfo;
    ugc?: { avgDelivery: string; turnaround: string };
    multi?: { avgDelivery: string; turnaround: string };
    all?: { avgDelivery: string; turnaround: string };
  };
  startingPriceEur: number;
  rating: number;
  reviewsCount: number;
  totalCollaborations: number;
  packages: CreatorPackage[];
  portfolio: PortfolioItem[];
  photos?: CreatorPhoto[];
  aestheticVibe?: string;
  audience: AudienceDemographics;
  reviews: CreatorReview[];
}

export type OrderStatus =
  | 'offer_sent'
  | 'accepted'
  | 'in_production'
  | 'deliverable_submitted'
  | 'approved'
  | 'completed'
  | 'declined';

export interface OrderDeliverable {
  id: string;
  title: string;
  fileUrl?: string;
  previewUrl?: string;
  livePostUrl?: string;
  submittedAt: string;
  notes?: string;
}

export interface OrderMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
}

export interface Order {
  id: string;
  brandId: string;
  brandName: string;
  brandLogo: string;
  creatorId: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  packageId?: string;
  packageTitle: string;
  collaborationType: 'content_creation' | 'sponsored_post';
  platform: PlatformType;
  basePriceEur: number;
  platformFeeEur: number;
  totalEur: number;
  status: OrderStatus;
  brief: string;
  requirements: string[];
  deadlineDate: string;
  createdAt: string;
  escrowFunded: boolean;
  escrowReleased: boolean;
  deliverables: OrderDeliverable[];
  messages: OrderMessage[];
  reviewSubmitted?: {
    rating: number;
    comment: string;
    date: string;
  };
}

export interface CreatorFilterState {
  searchQuery: string;
  category: string;
  platform: PlatformType | 'all';
  location: string;
  minPrice: number;
  maxPrice: number;
  followerRange: 'all' | 'nano' | 'micro' | 'macro' | 'mega';
  sortBy: 'relevance' | 'price_asc' | 'price_desc' | 'followers' | 'rating';
}
