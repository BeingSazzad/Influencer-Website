'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  Building2,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react';

interface MonthlyCreatorRecord {
  month: string;
  fullName: string;
  incomeEur: number;
  brandsCount: number;
  brands: string[];
  isCurrent?: boolean;
}

interface YearCreatorData {
  year: number;
  totalIncomeEur: number;
  totalBrandsCount: number;
  growthRatePct: number;
  peakMonth: string;
  months: MonthlyCreatorRecord[];
}

const CREATOR_ANALYTICS_DATA: Record<number, YearCreatorData> = {
  2026: {
    year: 2026,
    totalIncomeEur: 28400,
    totalBrandsCount: 24,
    growthRatePct: 25.6,
    peakMonth: 'March',
    months: [
      { month: 'Jan', fullName: 'January 2026', incomeEur: 2100, brandsCount: 2, brands: ['Aura Skincare Paris', 'Nord Minimal Studios'] },
      { month: 'Feb', fullName: 'February 2026', incomeEur: 2650, brandsCount: 2, brands: ['Vogue & Velour', 'Glow Botanical Labs'] },
      { month: 'Mar', fullName: 'March 2026', incomeEur: 3400, brandsCount: 3, brands: ['Aura Skincare Paris', 'Sephora France', 'Gymshark'], isCurrent: true },
      { month: 'Apr', fullName: 'April 2026', incomeEur: 2800, brandsCount: 2, brands: ['Dior Beauty', "L'Oréal Paris"] },
      { month: 'May', fullName: 'May 2026', incomeEur: 3100, brandsCount: 3, brands: ['Estée Lauder', 'Maison Margiela', 'Kith'] },
      { month: 'Jun', fullName: 'June 2026', incomeEur: 2900, brandsCount: 2, brands: ['Glossier', 'Zara Beauty'] },
      { month: 'Jul', fullName: 'July 2026', incomeEur: 2200, brandsCount: 2, brands: ['Summer Fridays', 'Rhode Skin'] },
      { month: 'Aug', fullName: 'August 2026', incomeEur: 1950, brandsCount: 1, brands: ['Revolve'] },
      { month: 'Sep', fullName: 'September 2026', incomeEur: 3200, brandsCount: 3, brands: ['Celine', 'Jacquemus', 'YSL Beauty'] },
      { month: 'Oct', fullName: 'October 2026', incomeEur: 2750, brandsCount: 2, brands: ['Prada Beauty', 'Farfetch'] },
      { month: 'Nov', fullName: 'November 2026', incomeEur: 4200, brandsCount: 4, brands: ['Charlotte Tilbury', 'Dyson Hair', 'Sephora', 'Aesop'] },
      { month: 'Dec', fullName: 'December 2026', incomeEur: 3800, brandsCount: 3, brands: ['Chanel Fragrance', 'Tiffany & Co', 'Cult Beauty'] },
    ],
  },
  2025: {
    year: 2025,
    totalIncomeEur: 22600,
    totalBrandsCount: 19,
    growthRatePct: 52.7,
    peakMonth: 'November',
    months: [
      { month: 'Jan', fullName: 'January 2025', incomeEur: 1200, brandsCount: 1, brands: ['Aura Skincare Paris'] },
      { month: 'Feb', fullName: 'February 2025', incomeEur: 1450, brandsCount: 1, brands: ['Glow Botanical Labs'] },
      { month: 'Mar', fullName: 'March 2025', incomeEur: 1900, brandsCount: 2, brands: ['Nord Minimal Studios', 'Kith'] },
      { month: 'Apr', fullName: 'April 2025', incomeEur: 1650, brandsCount: 1, brands: ['Vogue & Velour'] },
      { month: 'May', fullName: 'May 2025', incomeEur: 2100, brandsCount: 2, brands: ['Glossier', 'Zara Beauty'] },
      { month: 'Jun', fullName: 'June 2025', incomeEur: 1800, brandsCount: 2, brands: ['Sephora France', 'Summer Fridays'] },
      { month: 'Jul', fullName: 'July 2025', incomeEur: 1400, brandsCount: 1, brands: ['Rhode Skin'] },
      { month: 'Aug', fullName: 'August 2025', incomeEur: 1300, brandsCount: 1, brands: ['Revolve'] },
      { month: 'Sep', fullName: 'September 2025', incomeEur: 2200, brandsCount: 2, brands: ['Celine', 'Jacquemus'] },
      { month: 'Oct', fullName: 'October 2025', incomeEur: 2000, brandsCount: 2, brands: ['Farfetch', 'Prada Beauty'] },
      { month: 'Nov', fullName: 'November 2025', incomeEur: 3100, brandsCount: 3, brands: ['Charlotte Tilbury', 'Dyson Hair', 'Sephora'] },
      { month: 'Dec', fullName: 'December 2025', incomeEur: 2500, brandsCount: 2, brands: ['Chanel Fragrance', 'Cult Beauty'] },
    ],
  },
  2024: {
    year: 2024,
    totalIncomeEur: 14800,
    totalBrandsCount: 12,
    growthRatePct: 0,
    peakMonth: 'December',
    months: [
      { month: 'Jan', fullName: 'January 2024', incomeEur: 600, brandsCount: 1, brands: ['Local Studio'] },
      { month: 'Feb', fullName: 'February 2024', incomeEur: 800, brandsCount: 1, brands: ['Clean Skincare'] },
      { month: 'Mar', fullName: 'March 2024', incomeEur: 950, brandsCount: 1, brands: ['Nord Minimal Studios'] },
      { month: 'Apr', fullName: 'April 2024', incomeEur: 1100, brandsCount: 1, brands: ['Aura Skincare Paris'] },
      { month: 'May', fullName: 'May 2024', incomeEur: 1300, brandsCount: 1, brands: ['Organic Botanics'] },
      { month: 'Jun', fullName: 'June 2024', incomeEur: 1200, brandsCount: 1, brands: ['Zara Beauty'] },
      { month: 'Jul', fullName: 'July 2024', incomeEur: 900, brandsCount: 1, brands: ['Summer Drops'] },
      { month: 'Aug', fullName: 'August 2024', incomeEur: 850, brandsCount: 1, brands: ['Urban Apparel'] },
      { month: 'Sep', fullName: 'September 2024', incomeEur: 1400, brandsCount: 1, brands: ['Glossier'] },
      { month: 'Oct', fullName: 'October 2024', incomeEur: 1600, brandsCount: 1, brands: ['Farfetch'] },
      { month: 'Nov', fullName: 'November 2024', incomeEur: 1900, brandsCount: 2, brands: ['Charlotte Tilbury', 'Sephora'] },
      { month: 'Dec', fullName: 'December 2024', incomeEur: 2200, brandsCount: 2, brands: ['Dyson Hair', 'Cult Beauty'] },
    ],
  },
};

export function CreatorAnnualAnalytics() {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [activeMetric, setActiveMetric] = useState<'income' | 'brands'>('income');
  const [hoveredMonth, setHoveredMonth] = useState<MonthlyCreatorRecord | null>(null);

  const yearData = CREATOR_ANALYTICS_DATA[selectedYear] || CREATOR_ANALYTICS_DATA[2026];

  // Calculate maximum for bar scale
  const maxIncome = Math.max(...yearData.months.map((m) => m.incomeEur));
  const maxBrands = Math.max(...yearData.months.map((m) => m.brandsCount));
  const currentMax = activeMetric === 'income' ? maxIncome : maxBrands;

  // Highest performing month
  const peakMonthRecord = yearData.months.reduce((prev, current) => {
    if (activeMetric === 'income') {
      return current.incomeEur > prev.incomeEur ? current : prev;
    }
    return current.brandsCount > prev.brandsCount ? current : prev;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E7E2] shadow-2xs space-y-6">
      {/* Top Header: Title, Year Tabs & Metric Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E7E7E2]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
              Earnings Performance
            </h2>
            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D] inline-flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{yearData.growthRatePct}% YoY</span>
            </span>
          </div>
          <p className="text-sm text-[#73736A] mt-1.5 font-medium">
            Brand deal earnings and collaboration volume for {selectedYear}.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
          {/* Metric Selector Pills */}
          <div className="bg-[#FAFAF8] p-1 rounded-2xl border border-[#E7E7E2] flex items-center gap-1">
            <button
              onClick={() => setActiveMetric('income')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMetric === 'income'
                  ? 'bg-[#0A0A0A] text-white shadow-2xs'
                  : 'text-[#73736A] hover:text-[#0A0A0A]'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Income (€)</span>
            </button>
            <button
              onClick={() => setActiveMetric('brands')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMetric === 'brands'
                  ? 'bg-[#0A0A0A] text-white shadow-2xs'
                  : 'text-[#73736A] hover:text-[#0A0A0A]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Brand Collabs</span>
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
      <div className="space-y-3 pt-2">
        <div className="h-72 w-full flex items-end justify-between gap-1.5 sm:gap-3 px-1 pt-6 pb-2 border-b border-[#E7E7E2] relative">
          {/* Subtle grid lines */}
          <div className="absolute inset-x-0 top-6 border-b border-dashed border-[#EAEAE3] pointer-events-none" />
          <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-[#EAEAE3] pointer-events-none" />

          {yearData.months.map((item) => {
            const val = activeMetric === 'income' ? item.incomeEur : item.brandsCount;
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
                    className={`absolute -top-7 px-2 py-0.5 rounded-md text-xs font-black tracking-tight whitespace-nowrap z-20 pointer-events-none transition-all ${
                      isHovered
                        ? 'bg-[#0A0A0A] text-white shadow-md -translate-y-1'
                        : 'bg-[#EEF7F2] text-[#23744D] border border-[#23744D]/20'
                    }`}
                  >
                    {activeMetric === 'income' ? `€${val.toLocaleString()}` : `${val} Brands`}
                  </div>
                )}

                {/* Track Background */}
                <div className="w-full max-w-[42px] h-full flex items-end rounded-lg bg-[#FAFAF8] group-hover:bg-[#F4F4F0] p-0.5 transition-colors">
                  {/* Dynamic Height Bar */}
                  <div
                    style={{ height: `${pct}%` }}
                    className={`w-full rounded-md transition-all duration-300 ${
                      isHovered
                        ? 'bg-[#0A0A0A] scale-102'
                        : isPeak
                        ? activeMetric === 'income'
                          ? 'bg-[#23744D]'
                          : 'bg-[#6444A6]'
                        : item.isCurrent
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[#23744D] absolute -bottom-2" />
                )}
              </div>
            );
          })}
        </div>


      </div>
    </div>
  );
}
