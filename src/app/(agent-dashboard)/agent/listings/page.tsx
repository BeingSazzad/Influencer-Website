'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { deleteProperty, updatePropertyStatus } from '@/redux/slices/propertySlice';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import {
  Building,
  PlusCircle,
  Search,
  Eye,
  Trash2,
  Edit,
  ExternalLink,
  Sparkles,
  MapPin
} from 'lucide-react';
import { Table, Tag, Button, Input, Select, Modal, message } from 'antd';
import { Property } from '@/types';

export default function AgentListingsPage() {
  const dispatch = useAppDispatch();
  const { properties } = useAppSelector((state) => state.property);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.address.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string, title: string) => {
    Modal.confirm({
      title: 'Remove Property Listing?',
      content: `Are you sure you want to withdraw "${title}" from the active luxury portal?`,
      okText: 'Yes, Withdraw',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        dispatch(deleteProperty(id));
        message.success(`Property "${title}" has been withdrawn.`);
      },
    });
  };

  const columns = [
    {
      title: 'Estate',
      dataIndex: 'title',
      key: 'title',
      render: (_: any, record: Property) => (
        <div className="flex items-center gap-3">
          <img
            src={record.images[0]}
            alt={record.title}
            className="w-16 h-12 rounded-xl object-cover border border-slate-200"
          />
          <div>
            <Link
              href={`/properties/${record.id}`}
              className="font-bold text-slate-900 text-xs hover:text-emerald-600 transition-colors flex items-center gap-1"
            >
              <span>{record.title}</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>{record.address.city}, {record.address.state}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'priceFormatted',
      key: 'price',
      render: (price: string) => (
        <span className="font-extrabold text-slate-950 text-xs font-serif">{price}</span>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag className="capitalize font-bold text-[10px] uppercase">{type}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Property) => (
        <Select
          size="small"
          value={record.status}
          onChange={(val) => {
            dispatch(updatePropertyStatus({ id: record.id, status: val }));
            message.success('Status updated');
          }}
          className="w-28 text-xs font-semibold"
          options={[
            { value: 'for_sale', label: 'For Sale' },
            { value: 'pending', label: 'In Escrow' },
            { value: 'sold', label: 'Sold Closed' },
            { value: 'for_rent', label: 'For Lease' },
          ]}
        />
      ),
    },
    {
      title: 'Views / Saves',
      key: 'metrics',
      render: (_: any, record: Property) => (
        <div className="text-xs text-slate-600">
          <div><strong>{record.viewsCount.toLocaleString()}</strong> views</div>
          <div className="text-[11px] text-slate-400">{record.savesCount} saves</div>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Property) => (
        <div className="flex items-center gap-2">
          <Link href={`/properties/${record.id}`}>
            <Button size="small" type="default" icon={<Eye className="w-3.5 h-3.5" />} />
          </Link>
          <Button
            size="small"
            danger
            icon={<Trash2 className="w-3.5 h-3.5" />}
            onClick={() => handleDelete(record.id, record.title)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <DashboardHeader
        title="Managed Property Inventory"
        subtitle={`Total ${properties.length} active luxury listings`}
        actionButton={
          <Link href="/agent/listings/new">
            <Button type="primary" className="font-bold flex items-center gap-1.5 h-9 rounded-lg">
              <PlusCircle className="w-4 h-4" />
              <span>Create New Listing</span>
            </Button>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-7xl">
        {/* Filter controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <Input
            prefix={<Search className="w-4 h-4 text-slate-400 mr-2" />}
            placeholder="Search by estate title or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 rounded-xl"
            allowClear
          />

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-500 uppercase">Status:</span>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-36 text-xs"
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'for_sale', label: 'For Sale' },
                { value: 'pending', label: 'In Escrow' },
                { value: 'sold', label: 'Sold' },
              ]}
            />
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
          <Table
            dataSource={filtered}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 6 }}
            className="text-xs"
          />
        </div>
      </div>
    </div>
  );
}
