'use client';

import React from 'react';
import { ConfigProvider } from 'antd';

export function AntdConfig({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#0A0A0A',
            colorPrimaryHover: '#FF2D78',
            colorPrimaryActive: '#E01E69',
            colorLink: '#0A0A0A',
            colorLinkHover: '#FF2D78',
            colorLinkActive: '#E01E69',
            borderRadius: 14,
            fontFamily: "'Red Hat Display', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            colorSuccess: '#23744D',
            colorWarning: '#8C6819',
            colorError: '#A9432F',
            colorInfo: '#FF2D78',
            controlItemBgActive: '#F4F4F0',
            controlItemBgHover: '#FAFAF8',
            colorText: '#0A0A0A',
            colorTextSecondary: '#73736A',
            colorTextDescription: '#73736A',
          },
          components: {
            Button: {
              controlHeight: 44,
              borderRadius: 9999,
              fontWeight: 600,
              primaryColor: '#FFFFFF',
              colorPrimary: '#0A0A0A',
              colorPrimaryHover: '#FF2D78',
              colorPrimaryActive: '#E01E69',
              defaultBg: '#FFFFFF',
              defaultColor: '#0A0A0A',
              defaultBorderColor: '#E7E7E2',
              defaultHoverBg: '#FAFAF8',
              defaultHoverColor: '#0A0A0A',
              defaultHoverBorderColor: '#0A0A0A',
              defaultActiveBg: '#F5F5F0',
              defaultActiveColor: '#0A0A0A',
              defaultActiveBorderColor: '#0A0A0A',
            },
            Input: {
              controlHeight: 44,
              borderRadius: 14,
              fontFamily: "'Red Hat Display', sans-serif",
            },
            Select: {
              controlHeight: 44,
              borderRadius: 14,
              fontFamily: "'Red Hat Display', sans-serif",
              optionSelectedBg: '#F4F4F0',
              optionSelectedColor: '#0A0A0A',
              optionActiveBg: '#FAFAF8',
              optionSelectedFontWeight: 700,
              selectorBg: '#FFFFFF',
              colorBorder: '#E7E7E2',
            },
            Dropdown: {
              borderRadiusLG: 16,
              controlItemBgHover: '#FAFAF8',
              controlItemBgActive: '#F4F4F0',
            },
            Menu: {
              itemSelectedBg: '#F4F4F0',
              itemSelectedColor: '#0A0A0A',
              itemHoverBg: '#FAFAF8',
              itemHoverColor: '#0A0A0A',
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
  );
}
