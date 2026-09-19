'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { updateLeadStatus, deleteLead } from '@/redux/slices/leadSlice';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { LeadStatus, Lead } from '@/types';
import {
  Users,
  Calendar,
  Clock,
  Mail,
  Phone,
  DollarSign,
  CheckCircle2,
  Trash2,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { Tag, Select, Button, Modal, message } from 'antd';

export default function AgentLeadsPage() {
  const dispatch = useAppDispatch();
  const { leads } = useAppSelector((state) => state.lead);

  const stages: { key: LeadStatus; label: string; color: string; bg: string }[] = [
    { key: 'new', label: 'New Inquiries', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
    { key: 'contacted', label: 'Contacted', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
    { key: 'viewing_scheduled', label: 'VIP Viewing Set', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
    { key: 'offer_made', label: 'Offer / Escrow', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
    { key: 'closed', label: 'Closed Deal', color: 'text-slate-700', bg: 'bg-slate-100 border-slate-300' },
  ];

  const handleStatusChange = (id: string, status: LeadStatus) => {
    dispatch(updateLeadStatus({ id, status }));
    message.success('Lead moved to new pipeline stage');
  };

  const handleDeleteLead = (id: string) => {
    Modal.confirm({
      title: 'Archive Lead?',
      content: 'Are you sure you want to remove this inquiry from your active CRM pipeline?',
      onOk() {
        dispatch(deleteLead(id));
        message.success('Lead archived');
      },
    });
  };

  return (
    <div>
      <DashboardHeader
        title="Buyer Leads & CRM Pipeline"
        subtitle="Manage private high-net-worth client acquisitions and scheduled tours"
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-7xl">
        {/* Kanban Board Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4">
          {stages.slice(0, 4).map((stage) => {
            const stageLeads = leads.filter((l) => l.status === stage.key);
            return (
              <div key={stage.key} className="bg-slate-50 rounded-3xl border border-slate-200/80 p-4 flex flex-col min-h-[500px]">
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${stage.color === 'text-emerald-700' ? 'bg-emerald-500' : stage.color === 'text-blue-700' ? 'bg-blue-500' : stage.color === 'text-purple-700' ? 'bg-purple-500' : 'bg-amber-500'}`} />
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-800">
                      {stage.label}
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Cards in Column */}
                <div className="space-y-4 flex-1">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-3 hover:shadow-md transition-shadow"
                    >
                      {/* Property badge */}
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/properties/${lead.propertyId}`}
                          className="text-xs font-bold text-slate-900 hover:text-emerald-600 truncate max-w-[150px] flex items-center gap-1"
                        >
                          <span>{lead.propertyTitle}</span>
                          <ExternalLink className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        </Link>
                        <span className="text-[11px] font-extrabold text-emerald-700 font-serif">
                          {lead.propertyPrice}
                        </span>
                      </div>

                      {/* Client Info */}
                      <div className="flex items-center gap-2.5 pt-1">
                        <img
                          src={lead.clientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                          alt={lead.clientName}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold text-slate-900 truncate">{lead.clientName}</div>
                          <div className="text-[10px] text-slate-400 truncate">{lead.clientEmail}</div>
                        </div>
                      </div>

                      {/* Inquiry Message */}
                      <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded-lg italic">
                        "{lead.message}"
                      </p>

                      <div className="text-[11px] text-slate-400 space-y-0.5">
                        <div>Budget: <strong className="text-slate-700">{lead.budgetRange}</strong></div>
                        {lead.preferredDate && <div>Preferred: <strong className="text-slate-700">{lead.preferredDate}</strong></div>}
                      </div>

                      {/* Stage Selector */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <Select
                          size="small"
                          value={lead.status}
                          onChange={(val) => handleStatusChange(lead.id, val)}
                          className="w-full text-xs font-semibold"
                          options={stages.map((s) => ({ value: s.key, label: s.label }))}
                        />
                        <Button
                          size="small"
                          danger
                          icon={<Trash2 className="w-3 h-3" />}
                          onClick={() => handleDeleteLead(lead.id)}
                        />
                      </div>
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="text-center py-10 text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                      No inquiries in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
