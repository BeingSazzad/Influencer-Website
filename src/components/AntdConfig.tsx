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
            colorPrimary: '#0A0A0A',
            colorPrimaryHover: '#2B7FFF',
            borderRadius: 14,
            fontFamily: "'Red Hat Display', system-ui, -apple-system, sans-serif",
            colorSuccess: '#23744D',
            colorWarning: '#8C6819',
            colorError: '#A9432F',
            colorInfo: '#2B7FFF',
          },
          components: {
            Button: {
              controlHeight: 44,
              borderRadius: 9999,
              fontWeight: 700,
            },
            Input: {
              controlHeight: 44,
              borderRadius: 14,
            },
            Select: {
              controlHeight: 44,
              borderRadius: 14,
            },
            Card: {
              borderRadiusLG: 20,
            },
            Tabs: {
              itemSelectedColor: '#0A0A0A',
              inkBarColor: '#0A0A0A',
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
