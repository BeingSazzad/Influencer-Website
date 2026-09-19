'use client';

import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { MetricCard } from '@/components/shared/MetricCard';
import { AGENT_ANALYTICS } from '@/Mockdata';
import {
  BarChart3,
  Eye,
  TrendingUp,
  Youtube,
  Instagram,
  Globe,
  Video,
  Users,
  Sparkles
} from 'lucide-react';
import { Progress, Tag } from 'antd';

export default function AgentAnalyticsPage() {
  return (
    <div>
      <DashboardHeader
        title="Social Reach & Media Performance"
        subtitle="Live distribution metrics across YouTube, Instagram, TikTok, and direct portals"
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-7xl">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <MetricCard
            title="Total Video Impressions"
            value="1.82M"
            change="+34.8% this month"
            isPositive={true}
            icon={Eye}
            color="emerald"
            subtitle="Architectural tour view count"
          />
          <MetricCard
            title="Average Watch Time"
            value="6m 42s"
            change="High Engagement"
            isPositive={true}
            icon={Video}
            color="sky"
            subtitle="Full mansion walk-through retention"
          />
          <MetricCard
            title="Inquiry Conversion Rate"
            value="4.12%"
            change="+0.8% benchmark"
            isPositive={true}
            icon={TrendingUp}
            color="purple"
            subtitle="Lead conversions per 1,000 views"
          />
        </div>

        {/* Traffic Channels & Monthly Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Traffic Breakdown */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-slate-950 font-serif flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Media Traffic Channel Distribution</span>
            </h3>

            <div className="space-y-4">
              {AGENT_ANALYTICS.trafficSources.map((source) => (
                <div key={source.source} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>{source.source}</span>
                    <span className="text-emerald-700">{source.percentage}%</span>
                  </div>
                  <Progress
                    percent={source.percentage}
                    showInfo={false}
                    strokeColor={{
                      '0%': '#10b981',
                      '100%': '#059669',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Views Progression */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-slate-950 font-serif flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              <span>6-Month Viewership Growth</span>
            </h3>

            <div className="grid grid-cols-6 gap-3 items-end h-52 pt-4">
              {AGENT_ANALYTICS.monthlyViews.map((item) => {
                const heightPercent = (item.views / 130000) * 100;
                return (
                  <div key={item.month} className="flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-bold text-slate-500">{(item.views / 1000).toFixed(0)}k</span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-xl shadow-xs"
                    />
                    <span className="text-xs font-bold text-slate-800">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
