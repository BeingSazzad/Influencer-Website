'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Calendar, MapPin, CheckCircle2, Clock, Phone, Mail } from 'lucide-react';
import { Tag, Button } from 'antd';

export default function UserInquiriesPage() {
  const { leads } = useAppSelector((state) => state.lead);

  return (
    <div>
      <DashboardHeader
        title="Scheduled Tours & Inquiries"
        subtitle="Track your private viewing itineraries and broker messages"
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-5xl">
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 font-serif">Active Viewing Requests ({leads.length})</h2>
            <span className="text-xs text-slate-500">Updated in real-time</span>
          </div>

          <div className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <div key={lead.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-slate-50/60 transition-colors">
                <div className="flex items-start gap-4">
                  <img
                    src={lead.propertyImage}
                    alt={lead.propertyTitle}
                    className="w-20 h-20 rounded-2xl object-cover border border-slate-200"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-950 font-serif">{lead.propertyTitle}</h3>
                      <Tag color={lead.status === 'new' ? 'processing' : lead.status === 'viewing_scheduled' ? 'success' : 'default'} className="capitalize font-bold text-[10px]">
                        {lead.status.replace('_', ' ')}
                      </Tag>
                    </div>
                    <div className="text-sm font-extrabold text-emerald-700 font-serif">{lead.propertyPrice}</div>
                    <p className="text-xs text-slate-600 italic">"{lead.message}"</p>
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-emerald-600" /> Preferred Date: {lead.preferredDate || 'TBD'}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Requested: {lead.createdAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/properties/${lead.propertyId}`}>
                    <Button type="default" className="text-xs font-semibold">
                      View Property
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
