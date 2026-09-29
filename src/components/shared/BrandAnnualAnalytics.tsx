'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  Users,
  ChevronDown,
} from 'lucide-react';

interface MonthlyBrandRecord {
  month: string;
  fullName: string;
  spendEur: number;
  creatorsCount: number;
  creators: string[];
  isCurrent?: boolean;
}

interface YearBrandData {
  year: number;
  totalSpendEur: number;
  totalCreatorsCount: number;
  growthRatePct: number;
  peakMonth: string;
  months: MonthlyBrandRecord[];
}

const BRAND_ANALYTICS_DATA: Record<number, YearBrandData> = {
  2026: {
    year: 2026,
    totalSpendEur: 45300,
    totalCreatorsCount: 29,
    growthRatePct: 39.8,
    peakMonth: 'March',
    months: [
      { month: 'Jan', fullName: 'January 2026', spendEur: 2400, creatorsCount: 2, creators: ['Sophie Kim', 'Marcus Chen'] },
      { month: 'Feb', fullName: 'February 2026', spendEur: 3100, creatorsCount: 2, creators: ['Maya Lin', 'Elena Rostova'] },
      { month: 'Mar', fullName: 'March 2026', spendEur: 6200, creatorsCount: 4, creators: ['Sophie Kim', 'Marcus Chen', 'Lucas Vance', 'Chloé Martin'], isCurrent: true },
      { month: 'Apr', fullName: 'April 2026', spendEur: 4200, creatorsCount: 3, creators: ['Sophie Kim', 'Amara Okafor', 'Julian Rossi'] },
      { month: 'May', fullName: 'May 2026', spendEur: 3800, creatorsCount: 2, creators: ['Clara Dupont', 'Maya Lin'] },
      { month: 'Jun', fullName: 'June 2026', spendEur: 2900, creatorsCount: 2, creators: ['David K.', 'Sora Takahashi'] },
      { month: 'Jul', fullName: 'July 2026', spendEur: 2100, creatorsCount: 1, creators: ['Sophie Kim'] },
      { month: 'Aug', fullName: 'August 2026', spendEur: 1800, creatorsCount: 1, creators: ['Marcus Chen'] },
      { month: 'Sep', fullName: 'September 2026', spendEur: 4500, creatorsCount: 3, creators: ['Maya Lin', 'Elena Rostova', 'Lucas Vance'] },
      { month: 'Oct', fullName: 'October 2026', spendEur: 3600, creatorsCount: 2, creators: ['Amara Okafor', 'Julian Rossi'] },
      { month: 'Nov', fullName: 'November 2026', spendEur: 5800, creatorsCount: 4, creators: ['Sophie Kim', 'Marcus Chen', 'Chloé Martin', 'David K.'] },
      { month: 'Dec', fullName: 'December 2026', spendEur: 4900, creatorsCount: 3, creators: ['Maya Lin', 'Clara Dupont', 'Sora Takahashi'] },
    ],
  },
  2025: {
    year: 2025,
    totalSpendEur: 32400,
    totalCreatorsCount: 21,
    growthRatePct: 75.1,
    peakMonth: 'November',
    months: [
      { month: 'Jan', fullName: 'January 2025', spendEur: 1500, creatorsCount: 1, creators: ['Sophie Kim'] },
      { month: 'Feb', fullName: 'February 2025', spendEur: 1800, creatorsCount: 1, creators: ['Marcus Chen'] },
      { month: 'Mar', fullName: 'March 2025', spendEur: 2600, creatorsCount: 2, creators: ['Sophie Kim', 'Maya Lin'] },
      { month: 'Apr', fullName: 'April 2025', spendEur: 2200, creatorsCount: 2, creators: ['Elena Rostova', 'Lucas Vance'] },
      { month: 'May', fullName: 'May 2025', spendEur: 2900, creatorsCount: 2, creators: ['Amara Okafor', 'Julian Rossi'] },
      { month: 'Jun', fullName: 'June 2025', spendEur: 2400, creatorsCount: 2, creators: ['Clara Dupont', 'David K.'] },
      { month: 'Jul', fullName: 'July 2025', spendEur: 1600, creatorsCount: 1, creators: ['Sophie Kim'] },
      { month: 'Aug', fullName: 'August 2025', spendEur: 1400, creatorsCount: 1, creators: ['Marcus Chen'] },
      { month: 'Sep', fullName: 'September 2025', spendEur: 3200, creatorsCount: 2, creators: ['Maya Lin', 'Sora Takahashi'] },
      { month: 'Oct', fullName: 'October 2025', spendEur: 2800, creatorsCount: 2, creators: ['Lucas Vance', 'Elena Rostova'] },
      { month: 'Nov', fullName: 'November 2025', spendEur: 5200, creatorsCount: 3, creators: ['Sophie Kim', 'Marcus Chen', 'Chloé Martin'] },
      { month: 'Dec', fullName: 'December 2025', spendEur: 4800, creatorsCount: 3, creators: ['Maya Lin', 'Julian Rossi', 'Amara Okafor'] },
    ],
  },
  2024: {
    year: 2024,
    totalSpendEur: 18500,
    totalCreatorsCount: 12,
    growthRatePct: 0,
    peakMonth: 'December',
    months: [
      { month: 'Jan', fullName: 'January 2024', spendEur: 800, creatorsCount: 1, creators: ['Sophie Kim'] },
      { month: 'Feb', fullName: 'February 2024', spendEur: 1000, creatorsCount: 1, creators: ['Marcus Chen'] },
      { month: 'Mar', fullName: 'March 2024', spendEur: 1200, creatorsCount: 1, creators: ['Maya Lin'] },
      { month: 'Apr', fullName: 'April 2024', spendEur: 1100, creatorsCount: 1, creators: ['Elena Rostova'] },
      { month: 'May', fullName: 'May 2024', spendEur: 1500, creatorsCount: 1, creators: ['Amara Okafor'] },
      { month: 'Jun', fullName: 'June 2024', spendEur: 1400, creatorsCount: 1, creators: ['Lucas Vance'] },
      { month: 'Jul', fullName: 'July 2024', spendEur: 900, creatorsCount: 1, creators: ['Sophie Kim'] },
      { month: 'Aug', fullName: 'August 2024', spendEur: 900, creatorsCount: 1, creators: ['Marcus Chen'] },
      { month: 'Sep', fullName: 'September 2024', spendEur: 1800, creatorsCount: 1, creators: ['Julian Rossi'] },
      { month: 'Oct', fullName: 'October 2024', spendEur: 2100, creatorsCount: 1, creators: ['Clara Dupont'] },
      { month: 'Nov', fullName: 'November 2024', spendEur: 2800, creatorsCount: 2, creators: ['Sophie Kim', 'Maya Lin'] },
      { month: 'Dec', fullName: 'December 2024', spendEur: 3000, creatorsCount: 2, creators: ['Marcus Chen', 'Elena Rostova'] },
    ],
  },
};

export function BrandAnnualAnalytics() {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [activeMetric, setActiveMetric] = useState<'spend' | 'creators'>('spend');
  const [hoveredMonth, setHoveredMonth] = useState<MonthlyBrandRecord | null>(null);

  const yearData = BRAND_ANALYTICS_DATA[selectedYear] || BRAND_ANALYTICS_DATA[2026];

  // Calculate maximum for bar scale
  const maxSpend = Math.max(...yearData.months.map((m) => m.spendEur));
  const maxCreators = Math.max(...yearData.months.map((m) => m.creatorsCount));
  const currentMax = activeMetric === 'spend' ? maxSpend : maxCreators;

  // Highest performing month
  const peakMonthRecord = yearData.months.reduce((prev, current) => {
    if (activeMetric === 'spend') {
      return current.spendEur > prev.spendEur ? current : prev;
    }
    return current.creatorsCount > prev.creatorsCount ? current : prev;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E7E2] shadow-2xs space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E7E7E2]">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
            {activeMetric === 'spend' ? 'Campaign Spend' : 'Creator Hires'}
          </h2>
          <p className="text-sm text-[#73736A] mt-1 font-medium">
            {activeMetric === 'spend'
              ? `Influencer spend for ${selectedYear}.`
              : `Creators hired for ${selectedYear}.`}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
          {/* Metric Selector Pills */}
          <div className="bg-[#FAFAF8] p-1 rounded-2xl border border-[#E7E7E2] flex items-center gap-1">
            <button
              onClick={() => setActiveMetric('spend')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMetric === 'spend'
                  ? 'bg-[#0A0A0A] text-white shadow-2xs'
                  : 'text-[#73736A] hover:text-[#0A0A0A]'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Spend (€)</span>
            </button>
            <button
              onClick={() => setActiveMetric('creators')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMetric === 'creators'
                  ? 'bg-[#0A0A0A] text-white shadow-2xs'
                  : 'text-[#73736A] hover:text-[#0A0A0A]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Creators Hired</span>
            </button>
          </div>

          {/* Year Selector Dropdown */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl px-3 py-1.5 pr-8 text-xs font-extrabold text-[#0A0A0A] cursor-pointer focus:outline-none appearance-none"
            >
              {[2026, 2025, 2024].map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-[#73736A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>



      {/* 12-Month Bar Chart */}
      <div className="pt-2">
        <div className="h-72 w-full flex items-end justify-between gap-1.5 sm:gap-3 px-1 pt-6 pb-2 relative">
          {/* Subtle grid lines */}
          <div className="absolute inset-x-0 top-6 border-b border-dashed border-[#EAEAE3] pointer-events-none" />
          <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-[#EAEAE3] pointer-events-none" />

          {yearData.months.map((item) => {
            const val = activeMetric === 'spend' ? item.spendEur : item.creatorsCount;
            const pct = Math.max(12, Math.round((val / currentMax) * 100));
            const isHovered = hoveredMonth?.month === item.month;
            const isPeak = item.month === peakMonthRecord.month;

            return (
              <div
                key={item.month}
                onMouseEnter={() => setHoveredMonth(item)}
                onMouseLeave={() => setHoveredMonth(null)}
                className="flex-1 h-full flex flex-col justify-end items-center group cursor-pointer relative"
              >
                {/* Floating Micro-Value on Hover or Peak */}
                {(isHovered || isPeak) && (
                  <div
                    className={`absolute -top-7 px-2.5 py-0.5 rounded-md text-xs font-black tracking-tight whitespace-nowrap z-20 pointer-events-none transition-all ${
                      isHovered
                        ? activeMetric === 'spend'
                          ? 'bg-[#FF2D78] text-white shadow-md -translate-y-1'
                          : 'bg-[#0A0A0A] text-white shadow-md -translate-y-1'
                        : 'bg-[#0A0A0A] text-white shadow-xs'
                    }`}
                  >
                    {activeMetric === 'spend'
                      ? `€${val.toLocaleString()}`
                      : `${val} Creator${val === 1 ? '' : 's'}`}
                  </div>
                )}

                {/* Track Background */}
                <div className="w-full max-w-[42px] h-full flex items-end rounded-lg bg-[#FAFAF8] group-hover:bg-[#F4F4F0] p-0.5 transition-colors">
                  {/* Dynamic Height Bar */}
                  <div
                    style={{ height: `${pct}%` }}
                    className={`w-full rounded-md transition-all duration-300 ${
                      isHovered
                        ? activeMetric === 'spend'
                          ? 'bg-[#FF2D78] scale-102'
                          : 'bg-[#0A0A0A] scale-102 ring-2 ring-emerald-400/50'
                        : (item.isCurrent || isPeak)
                        ? 'bg-[#0A0A0A]'
                        : 'bg-[#D2D2CA] group-hover:bg-[#0A0A0A]'
                    }`}
                  />
                </div>

                {/* Month Label */}
                <span
                  className={`text-xs font-extrabold mt-2 transition-colors ${
                    isHovered || item.isCurrent
                      ? 'text-[#0A0A0A]'
                      : 'text-[#73736A] group-hover:text-[#0A0A0A]'
                  }`}
                >
                  {item.month}
                </span>

                {/* Current Month Under-dot */}
                {item.isCurrent && selectedYear === 2026 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D78] absolute -bottom-2" />
                )}
              </div>
            );
          })}
        </div>

      </div>

    </div>

  );
}
