'use client';

import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export function AntdConfig({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#059669',
            colorPrimaryHover: '#10b981',
            borderRadius: 8,
            fontFamily: 'inherit',
            colorSuccess: '#10b981',
            colorWarning: '#f59e0b',
            colorError: '#ef4444',
            colorInfo: '#0284c7',
          },
          components: {
            Button: {
              controlHeight: 42,
              borderRadius: 8,
              fontWeight: 600,
            },
            Input: {
              controlHeight: 42,
              borderRadius: 8,
            },
            Select: {
              controlHeight: 42,
              borderRadius: 8,
            },
            Card: {
              borderRadiusLG: 14,
            },
            Tabs: {
              itemSelectedColor: '#059669',
              inkBarColor: '#059669',
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
