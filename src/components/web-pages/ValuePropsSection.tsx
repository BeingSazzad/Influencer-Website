'use client';

import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Search, Zap, TrendingUp, ShieldCheck, Heart } from 'lucide-react';

export function ValuePropsSection() {
  const { t } = useAppSelector((state) => state.lang);

  const valueProps = [
    {
      icon: Search,
      bgColor: 'bg-[#F1EEF9]',
      iconColor: 'text-[#6444A6]',
      title: 'Find creators',
      description: 'Search vetted creators across all platforms and niches.',
    },
    {
      icon: Zap,
      bgColor: 'bg-[#EEF7F2]',
      iconColor: 'text-[#23744D]',
      title: 'Build partnerships',
      description: 'Connect, collaborate and manage everything in one place.',
    },
    {
      icon: TrendingUp,
      bgColor: 'bg-[#FAF6E8]',
      iconColor: 'text-[#8C6819]',
      title: 'Drive real results',
      description: 'Boost your brand with authentic content that converts.',
    },
    {
      icon: ShieldCheck,
      bgColor: 'bg-[#EBF3FE]',
      iconColor: 'text-[#2B7FFF]',
      title: 'Secure & simple',
      description: 'Built-in payments, contracts and escrow protection for both sides.',
    },
    {
      icon: Heart,
      bgColor: 'bg-[#FDF0ED]',
      iconColor: 'text-[#C75D47]',
      title: 'For every brand',
      description: 'From startups to global brands — Influverse scales with you.',
    },
  ];

  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-[#151515] tracking-tight leading-tight">
            {t?.valueProps?.title || 'Everything you need.\nIn one place.'}
          </h2>
          <p className="text-sm text-[#73736A] mt-3">
            A frictionless marketplace engineered for modern marketing teams and high-caliber creators.
          </p>
        </div>

        {/* 5 Column Grid matching reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {valueProps.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-[#E7E7E2] hover:border-[#D2D2CA] hover:shadow-sm transition-all group"
              >
                {/* Pastel rounded square icon container */}
                <div
                  className={`w-14 h-14 rounded-2xl ${prop.bgColor} ${prop.iconColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[#151515] mb-2">
                  {prop.title}
                </h3>
                <p className="text-xs text-[#73736A] leading-relaxed">
                  {prop.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
