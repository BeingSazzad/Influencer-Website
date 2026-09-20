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
      borderColor: 'hover:border-[#E4DCF5]',
      title: 'Find creators',
      description: 'Search vetted creators across all platforms and niches.',
    },
    {
      icon: Zap,
      bgColor: 'bg-[#EEF7F2]',
      iconColor: 'text-[#23744D]',
      borderColor: 'hover:border-[#D9EDE2]',
      title: 'Build partnerships',
      description: 'Connect, collaborate and manage everything in one place.',
    },
    {
      icon: TrendingUp,
      bgColor: 'bg-[#FAF6E8]',
      iconColor: 'text-[#8C6819]',
      borderColor: 'hover:border-[#F3ECCF]',
      title: 'Drive real results',
      description: 'Boost your brand with authentic content that converts.',
    },
    {
      icon: ShieldCheck,
      bgColor: 'bg-[#FFF0F5]',
      iconColor: 'text-[#FF2D78]',
      borderColor: 'hover:border-[#FFE0EB]',
      title: 'Secure & simple',
      description: 'Built-in payments, contracts and escrow protection for both sides.',
    },
    {
      icon: Heart,
      bgColor: 'bg-[#FDF0ED]',
      iconColor: 'text-[#C75D47]',
      borderColor: 'hover:border-[#F8DCD4]',
      title: 'For every brand',
      description: 'From startups to global brands — Influverse scales with you.',
    },
  ];

  return (
    <section className="py-24 bg-[#FAFAF8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading with Playfair Display accent */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0A] tracking-tight leading-[1.15] font-sans">
            Everything you need.{' '}
            <span className="font-editorial italic font-normal text-[#0A0A0A] block">
              In one place.
            </span>
          </h2>
          <p className="text-lg text-[#73736A] font-sans font-medium leading-[28px] mt-4 sm:mt-5">
            A frictionless marketplace engineered for modern marketing teams and high-caliber creators.
          </p>
        </div>

        {/* 5 Column Grid matching reference with smooth hover lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {valueProps.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-[#E7E7E2] ${prop.borderColor} hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group`}
              >
                {/* Pastel rounded square icon container */}
                <div
                  className={`w-14 h-14 rounded-2xl ${prop.bgColor} ${prop.iconColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-2xs`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#0A0A0A] mb-2 font-sans">
                  {prop.title}
                </h3>
                <p className="text-sm text-[#555550] leading-[22px] font-sans font-medium">
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
