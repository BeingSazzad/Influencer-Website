'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Cpu,
  Dumbbell,
  UtensilsCrossed,
  Shirt,
  Plane,
  Briefcase,
  Palette,
  ArrowRight,
  TrendingUp,
  Users,
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  categoryParam: string;
  tagline: string;
  creatorCount: string;
  avgEngagement: string;
  avgPrice: string;
  icon: React.ReactNode;
  iconBg: string;
  gradientHover: string;
  popularTags: string[];
  avatars: string[];
}

export function CategoryShowcaseSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories: CategoryItem[] = [
    {
      id: 'beauty',
      name: 'Beauty & Skincare',
      categoryParam: 'Beauty',
      tagline: 'High-conversion GRWM, glow-ups, and dermatological reviews.',
      creatorCount: '1,240+',
      avgEngagement: '5.2%',
      avgPrice: '€320',
      iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
      gradientHover: 'group-hover:border-rose-300 group-hover:shadow-rose-500/10',
      icon: <Sparkles className="w-5 h-5 text-rose-600" />,
      popularTags: ['#GRWM', '#SkincareRoutine', '#GlowUp'],
      avatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      ],
    },
    {
      id: 'tech',
      name: 'Tech & Gaming UGC',
      categoryParam: 'Tech',
      tagline: 'Hardware unboxings, SaaS workflows, and gaming setups.',
      creatorCount: '760+',
      avgEngagement: '4.9%',
      avgPrice: '€480',
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      gradientHover: 'group-hover:border-indigo-300 group-hover:shadow-indigo-500/10',
      icon: <Cpu className="w-5 h-5 text-indigo-600" />,
      popularTags: ['#TechUnboxing', '#SaaSReview', '#DeskSetup'],
      avatars: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
      ],
    },
    {
      id: 'fitness',
      name: 'Fitness & Wellness',
      categoryParam: 'Fitness',
      tagline: 'High-energy workout challenges, meal prep, and sportswear UGC.',
      creatorCount: '1,340+',
      avgEngagement: '6.1%',
      avgPrice: '€290',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      gradientHover: 'group-hover:border-emerald-300 group-hover:shadow-emerald-500/10',
      icon: <Dumbbell className="w-5 h-5 text-emerald-600" />,
      popularTags: ['#WorkoutMotivation', '#Activewear', '#MacroNutrition'],
      avatars: [
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      ],
    },
    {
      id: 'food',
      name: 'Food & Culinary UGC',
      categoryParam: 'Food',
      tagline: 'Sensory ASMR recipes, restaurant reviews, and beverage mixing.',
      creatorCount: '890+',
      avgEngagement: '5.8%',
      avgPrice: '€260',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
      gradientHover: 'group-hover:border-amber-300 group-hover:shadow-amber-500/10',
      icon: <UtensilsCrossed className="w-5 h-5 text-amber-600" />,
      popularTags: ['#FoodieReels', '#ASMRCuisine', '#QuickRecipes'],
      avatars: [
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
      ],
    },
    {
      id: 'fashion',
      name: 'Fashion & Luxury',
      categoryParam: 'Fashion',
      tagline: 'Runway styling, seasonal hauls, and premium aesthetic lookbooks.',
      creatorCount: '980+',
      avgEngagement: '4.7%',
      avgPrice: '€420',
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
      gradientHover: 'group-hover:border-purple-300 group-hover:shadow-purple-500/10',
      icon: <Shirt className="w-5 h-5 text-purple-600" />,
      popularTags: ['#OOTD', '#LuxuryHaul', '#CapsuleWardrobe'],
      avatars: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      ],
    },
    {
      id: 'travel',
      name: 'Travel & Cinematic Vlog',
      categoryParam: 'Travel',
      tagline: 'Cinematic destination showcases, luxury resorts, and adventure gear.',
      creatorCount: '1,120+',
      avgEngagement: '6.4%',
      avgPrice: '€550',
      iconBg: 'bg-rose-50 text-[#FF2D78] border-rose-100',
      gradientHover: 'group-hover:border-rose-300 group-hover:shadow-rose-500/10',
      icon: <Plane className="w-5 h-5 text-[#FF2D78]" />,
      popularTags: ['#TravelVlog', '#CinematicDrone', '#ResortStay'],
      avatars: [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
      ],
    },
    {
      id: 'founder',
      name: 'Founder & SaaS UGC',
      categoryParam: 'Business',
      tagline: 'Direct-response B2B ads, founder storytelling, and product walkthroughs.',
      creatorCount: '420+',
      avgEngagement: '7.2%',
      avgPrice: '€510',
      iconBg: 'bg-pink-50 text-[#FF2D78] border-pink-100',
      gradientHover: 'group-hover:border-pink-300 group-hover:shadow-pink-500/10',
      icon: <Briefcase className="w-5 h-5 text-[#FF2D78]" />,
      popularTags: ['#FounderStory', '#B2BGrowth', '#ProductDemo'],
      avatars: [
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
      ],
    },
    {
      id: 'art',
      name: 'Digital Art & Visuals',
      categoryParam: 'Art',
      tagline: '3D VFX, motion design, creative tutorials, and visual storytelling.',
      creatorCount: '680+',
      avgEngagement: '5.5%',
      avgPrice: '€340',
      iconBg: 'bg-orange-50 text-orange-600 border-orange-100',
      gradientHover: 'group-hover:border-orange-300 group-hover:shadow-orange-500/10',
      icon: <Palette className="w-5 h-5 text-orange-600" />,
      popularTags: ['#3DDesign', '#MotionGraphics', '#CreativeDirector'],
      avatars: [
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100',
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAF8] relative font-sans overflow-hidden">
      {/* Subtle Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E7E2] shadow-2xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF2D78]" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#73736A] font-sans">
                POPULAR NICHES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#0A0A0A] tracking-tight leading-[1.15] font-sans">
              Find vetted creators in{' '}
              <span className="font-editorial italic font-normal text-[#0A0A0A]">
                your exact niche.
              </span>
            </h2>
            <p className="text-[18px] text-[#555550] leading-[28px] mt-4 font-sans font-medium">
              Browse top-performing content creators by category with verified engagement metrics and transparent pricing.
            </p>
          </div>

          <Link
            href="/creators"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white font-bold text-sm transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 shrink-0 self-start md:self-auto cursor-pointer"
          >
            <span>Browse All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4x2 Responsive Bento Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => router.push(`/creators?category=${cat.categoryParam}`)}
              className={`group bg-white rounded-3xl p-6 border border-[#E7E7E2] transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between relative overflow-hidden ${cat.gradientHover}`}
            >
              {/* Top Row: Icon Badge & Creator Count */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-2xs transition-transform duration-300 group-hover:scale-110 ${cat.iconBg}`}
                  >
                    {cat.icon}
                  </div>
                  <span className="text-xs font-black uppercase px-2.5 py-1 rounded-full bg-[#F4F4F0] text-[#73736A] group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors duration-300">
                    {cat.creatorCount}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg font-black text-[#0A0A0A] group-hover:text-[#FF2D78] transition-colors duration-200">
                  {cat.name}
                </h3>
                <p className="text-sm text-[#73736A] mt-1.5 line-clamp-2 leading-relaxed font-medium">
                  {cat.tagline}
                </p>

                {/* Micro Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {cat.popularTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-bold text-[#555550] bg-[#FAFAF8] border border-[#E7E7E2] px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Row: Stats & Action Arrow */}
              <div className="pt-5 mt-5 border-t border-[#F4F4F0] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Stacked Avatars */}
                  <div className="flex -space-x-2">
                    {cat.avatars.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Creator"
                        className="w-6 h-6 rounded-full ring-2 ring-white object-cover shadow-2xs"
                      />
                    ))}
                  </div>
                  <div className="text-xs">
                    <span className="font-black text-[#0A0A0A]">{cat.avgEngagement}</span>
                    <span className="text-[#73736A] font-medium ml-1">avg. ER</span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#F4F4F0] group-hover:bg-[#0A0A0A] text-[#73736A] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

