import { BrandProfile, User } from '@/types';

export const MOCK_BRANDS: BrandProfile[] = [
  {
    id: 'user_brand_01',
    companyName: 'Aura Skincare Paris',
    contactName: 'Elena Rostova',
    email: 'partnerships@aura-skincare.com',
    logo: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&h=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=85',
    verified: true,
    industry: 'Beauty, Cosmetics & Wellness',
    industryTags: ['Clean Beauty', 'Skincare', 'Organic', 'DTC', 'Cruelty-Free', 'Parisian'],
    website: 'https://aura-skincare.com',
    location: 'Paris, France',
    companySize: '11-50 employees (Growth stage)',
    bio: 'We formulate clean, organic skincare and botanical wellness rituals designed in our Parisian atelier. Certified 100% vegan, cruelty-free, and dermatologically vetted across European laboratories. We collaborate with aesthetic lifestyle, beauty, and UGC creators to tell authentic, relatable skincare stories.',
    foundedYear: '2021',
    stats: {
      escrowFundedRate: 100,
      rating: 4.9,
      reviewsCount: 38,
      avgResponseHours: 2,
      totalCampaigns: 24,
      avgPayoutEur: 1250,
    },
    activeCampaigns: [
      {
        id: 'camp-aura-01',
        title: 'Botanical Barrier Cream — Spring Awakening UGC Reels',
        platform: 'instagram',
        budgetFormatted: '€1,200 - €1,800',
        budgetEur: 1200,
        openSlots: 4,
        deadlineDate: '2026-04-15',
        description: 'Deliver 1x 45s authentic vertical routine reel showcasing our botanical barrier recovery cream with texture application and honest skin feel.',
        requirements: [
          'Show product bottle clearly within first 5 seconds',
          'Highlight natural scent & cold-pressed rosehip seed extract',
          'Clean natural lighting (morning or golden hour preferred)',
          'High quality 4K 9:16 vertical video format',
        ],
        category: 'Skincare & Beauty',
      },
      {
        id: 'camp-aura-02',
        title: 'Hydrating Glow Serum — 3-Second Hook Video Variations',
        platform: 'ugc',
        budgetFormatted: '€950 - €1,400',
        budgetEur: 950,
        openSlots: 2,
        deadlineDate: '2026-04-28',
        description: 'Create 2x organic UGC hooks demonstrating immediate skin hydration under clean studio or bathroom mirror lighting.',
        requirements: [
          '2 hook variations: 0-3s bold problem/solution statement',
          'Close-up pipette dropper texture release on cheek',
          'Includes whitelisted paid-social licensing for 30 days',
        ],
        category: 'UGC & Paid Ads',
      },
      {
        id: 'camp-aura-03',
        title: 'Evening Relax Ritual — YouTube Integration / Vlog Sponsor',
        platform: 'youtube',
        budgetFormatted: '€1,800 - €2,500',
        budgetEur: 1800,
        openSlots: 3,
        deadlineDate: '2026-05-10',
        description: '60-90 second organic integration during a self-care or night-routine vlog with trackable discount code and bio link.',
        requirements: [
          '60-90 seconds dedicated integration segment',
          'Include trackable link & exclusive coupon in description top 3 lines',
          'Visual cutaways while applying product on clean face',
        ],
        category: 'Lifestyle & Wellness',
      },
    ],
    pastCampaignsHighlights: [
      {
        id: 'past-01',
        title: 'Serum Launch 4K Reel',
        creatorName: 'Sophie Kim',
        creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        mediaUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
        mediaType: 'image',
        platform: 'instagram',
        views: '142K views',
      },
      {
        id: 'past-02',
        title: 'Alpine Recovery Balm Review',
        creatorName: 'Liam Carter',
        creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        mediaUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
        mediaType: 'image',
        platform: 'tiktok',
        views: '298K views',
      },
      {
        id: 'past-03',
        title: 'Parisian Glow Morning Routine',
        creatorName: 'Emma Watson',
        creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        mediaUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
        mediaType: 'image',
        platform: 'youtube',
        views: '89K views',
      },
    ],
    reviews: [
      {
        id: 'rev-01',
        creatorId: 'creator-01',
        creatorName: 'Sophie Kim',
        creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        creatorHandle: '@sophiekim',
        rating: 5,
        date: 'March 18, 2026',
        campaignTitle: 'Botanical Barrier Recovery Reel',
        comment: 'Working with Elena and Aura Skincare was an absolute pleasure! The creative brief was detailed and clear, the escrow funds were fully secured upfront, and deliverable sign-off happened within 24 hours of submission. High standard of communication.',
      },
      {
        id: 'rev-02',
        creatorId: 'creator-02',
        creatorName: 'Liam Carter',
        creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        creatorHandle: '@liamcarter',
        rating: 5,
        date: 'March 10, 2026',
        campaignTitle: 'Dolomites Sunrise SPF50 Integration',
        comment: 'Aura Skincare gave me fantastic creative freedom while keeping production goals crisp. Payment released automatically from escrow with zero delays. Would love to partner on their upcoming winter campaign.',
      },
      {
        id: 'rev-03',
        creatorId: 'creator-03',
        creatorName: 'Emma Watson',
        creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        creatorHandle: '@emmawatson',
        rating: 5,
        date: 'February 24, 2026',
        campaignTitle: 'Hydrating Glow Serum Launch',
        comment: 'Super professional brand team. Prompt responses in chat, clear milestone guidelines, and genuine appreciation for creator craft.',
      },
    ],
  },
  {
    id: 'brand-nordic',
    companyName: 'Nordic Glow Naturals',
    contactName: 'Kari Lindqvist',
    email: 'hello@nordicglownaturals.com',
    logo: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&h=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    verified: true,
    industry: 'Beauty, Cosmetics & Wellness',
    industryTags: ['Scandinavian', 'Minimalist', 'Cold-Pressed', 'Wild Berries', 'UGC'],
    website: 'https://nordicglownaturals.com',
    location: 'Helsinki, Finland',
    companySize: '11-50 employees (Growth stage)',
    bio: 'Purity inspired by the Arctic circle. We wild-harvest cloudberries, birch sap, and sea buckthorn to engineer ultra-nourishing barrier defence skincare for extreme European weather.',
    foundedYear: '2020',
    stats: {
      escrowFundedRate: 100,
      rating: 4.8,
      reviewsCount: 22,
      avgResponseHours: 3,
      totalCampaigns: 18,
      avgPayoutEur: 1100,
    },
    activeCampaigns: [
      {
        id: 'camp-nordic-01',
        title: 'Arctic Moisture Glaze — Outdoor Aesthetic TikToks',
        platform: 'tiktok',
        budgetFormatted: '€850 - €1,300',
        budgetEur: 850,
        openSlots: 5,
        deadlineDate: '2026-04-20',
        description: 'Vibrant winter-to-spring morning skincare routine highlighting dewy finish and protection from chilly winds.',
        requirements: ['Natural morning lighting', 'Highlight cloudberry seed oil', 'Upbeat trending audio'],
        category: 'Skincare',
      },
    ],
    pastCampaignsHighlights: [],
    reviews: [
      {
        id: 'rev-nordic-01',
        creatorId: 'creator-01',
        creatorName: 'Sophie Kim',
        creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        creatorHandle: '@sophiekim',
        rating: 5,
        date: 'January 14, 2026',
        campaignTitle: 'Arctic Dew Essence Launch',
        comment: 'Incredible brand values and very supportive team. Escrow was funded immediately upon sending the contract offer.',
      },
    ],
  },
  {
    id: 'brand-gymshark',
    companyName: 'Gymshark Europe',
    contactName: 'Marcus Bennett',
    email: 'partnerships-eu@gymshark.com',
    logo: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&h=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85',
    verified: true,
    industry: 'Fitness, Health & Nutrition',
    industryTags: ['Activewear', 'Athletic', 'Gym', 'Fitness', 'London', 'Apparel'],
    website: 'https://gymshark.com',
    location: 'London, United Kingdom',
    companySize: '500+ employees (Enterprise)',
    bio: 'Dedicated to the conditioning community. Empowering athletes and fitness enthusiasts across Europe with high-performance seamless activewear and lifestyle essentials.',
    foundedYear: '2012',
    stats: {
      escrowFundedRate: 100,
      rating: 4.9,
      reviewsCount: 64,
      avgResponseHours: 1,
      totalCampaigns: 52,
      avgPayoutEur: 2400,
    },
    activeCampaigns: [
      {
        id: 'camp-gym-01',
        title: 'Seamless V4 Drop — High-Energy Workout Reels',
        platform: 'instagram',
        budgetFormatted: '€2,000 - €3,200',
        budgetEur: 2000,
        openSlots: 3,
        deadlineDate: '2026-05-01',
        description: 'Dynamic gym training set demonstrating flexibility, sweat-wicking endurance, and fit.',
        requirements: ['High-energy gym footage', 'Show seamless contour lines', 'Clean gym audio'],
        category: 'Fitness & Apparel',
      },
    ],
    pastCampaignsHighlights: [],
    reviews: [],
  },
  {
    id: 'brand-velvet',
    companyName: 'Velvet & Vine Boutique',
    contactName: 'Chiara Moretti',
    email: 'press@velvetandvine.it',
    logo: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&h=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=85',
    verified: true,
    industry: 'Fashion, Apparel & Luxury',
    industryTags: ['Luxury', 'Milanese', 'Italian Leather', 'Sustainable Fashion', 'Accessories'],
    website: 'https://velvetandvine.it',
    location: 'Milan, Italy',
    companySize: '11-50 employees (Growth stage)',
    bio: 'Handcrafted luxury leather bags and slow-fashion outerwear tailored in Tuscany and Milan. Celebrating timeless Italian artistry for modern tastemakers.',
    foundedYear: '2019',
    stats: {
      escrowFundedRate: 100,
      rating: 5.0,
      reviewsCount: 19,
      avgResponseHours: 4,
      totalCampaigns: 14,
      avgPayoutEur: 1600,
    },
    activeCampaigns: [
      {
        id: 'camp-velvet-01',
        title: 'Milano Tote — City Stroll Lookbook Video',
        platform: 'instagram',
        budgetFormatted: '€1,400 - €2,000',
        budgetEur: 1400,
        openSlots: 2,
        deadlineDate: '2026-04-30',
        description: 'Cinematic street-style outfit transitions featuring the Milano leather tote.',
        requirements: ['Editorial street-style aesthetic', 'Show leather craftsmanship details', 'Italian chic mood'],
        category: 'Luxury Fashion',
      },
    ],
    pastCampaignsHighlights: [],
    reviews: [],
  },
  {
    id: 'brand-sephora',
    companyName: 'Sephora France',
    contactName: 'Camille Dubois',
    email: 'influence-paris@sephora.fr',
    logo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&h=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1600&q=85',
    verified: true,
    industry: 'Beauty, Cosmetics & Wellness',
    industryTags: ['Retail', 'Makeup', 'Beauty Community', 'France', 'Trending'],
    website: 'https://sephora.fr',
    location: 'Paris, France',
    companySize: '500+ employees (Enterprise)',
    bio: 'The premier destination for prestige beauty discovery. Showcasing global icons and breakthrough indie cosmetic brands across Europe.',
    foundedYear: '1970',
    stats: {
      escrowFundedRate: 100,
      rating: 4.9,
      reviewsCount: 88,
      avgResponseHours: 2,
      totalCampaigns: 76,
      avgPayoutEur: 2100,
    },
    activeCampaigns: [],
    pastCampaignsHighlights: [],
    reviews: [],
  },
];

/**
 * Resolves a BrandProfile by ID or slug, merging live Redux currentUser updates
 * if the requested brand matches the currently logged-in brand account.
 */
export function getBrandProfile(idOrSlug: string, currentUser?: User | null): BrandProfile {
  const cleanId = (idOrSlug || '').trim().toLowerCase();

  // If currentUser is a brand, check if requested profile matches currentUser
  const isCurrentBrand =
    currentUser?.role === 'brand' &&
    (currentUser.id.toLowerCase() === cleanId ||
      cleanId === 'user_brand_01' ||
      cleanId === 'brand-aura' ||
      cleanId === 'aura' ||
      cleanId === 'aura-skincare' ||
      (currentUser.companyName && cleanId.includes(currentUser.companyName.toLowerCase().slice(0, 4))));

  // Find base mock brand
  const found = MOCK_BRANDS.find((b) => {
    const bId = b.id.toLowerCase();
    const bName = b.companyName.toLowerCase();
    const bSlug = b.companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return (
      bId === cleanId ||
      bSlug === cleanId ||
      bName.includes(cleanId) ||
      cleanId.includes(bSlug) ||
      (cleanId.includes('aura') && bId.includes('aura')) ||
      (cleanId.includes('nordic') && bId.includes('nordic')) ||
      (cleanId.includes('gymshark') && bId.includes('gymshark')) ||
      (cleanId.includes('velvet') && bId.includes('velvet')) ||
      (cleanId.includes('sephora') && bId.includes('sephora'))
    );
  }) || MOCK_BRANDS[0];

  // If it's the current user brand, merge in reactive state from settings
  if (isCurrentBrand && currentUser) {
    return {
      ...found,
      id: currentUser.id || found.id,
      companyName: currentUser.companyName || found.companyName,
      contactName: currentUser.name || found.contactName,
      email: currentUser.email || found.email,
      logo: currentUser.avatar || found.logo,
      location: currentUser.location || found.location,
      website: currentUser.website || found.website,
      industry: currentUser.industry || found.industry,
      industryTags: currentUser.industryTags && currentUser.industryTags.length > 0 ? currentUser.industryTags : found.industryTags,
      companySize: currentUser.companySize || found.companySize,
      bio: currentUser.bio || found.bio,
    };
  }

  return found;
}
