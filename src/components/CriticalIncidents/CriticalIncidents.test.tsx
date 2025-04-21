import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import CriticalIncidents from './CriticalIncidents';

// mock 样式和服务
jest.mock('./CriticalIncidents.module.scss', () => ({}));
jest.mock('@/services/riskScoreService', () => ({
  getCriticalIncident: jest.fn().mockResolvedValue({
    criticalIncidents: [
      {
        id: '1',
        title: 'Test Incident',
        date: '2024-06-01',
        location: 'Shanghai',
        description: 'desc',
        severity: 'critical',
        category: 'environmental',
        riskScoreImpact: 7.5,
        summary: 'summary',
        categoryDetail: { name: '环境' } // 新增
      }
    ]
  }),
  getSeverityLevel: jest.fn().mockResolvedValue({
    severityLevels: [{ id: 'critical', name: 'Critical' }]
  }),
  getIncidents: jest.fn().mockResolvedValue({
    incidents: [
      {
        id: '1',
        sources: [{ url: 'http://test.com', title: 'Test Source', publishDate: '2024-06-01' }]
      }
    ]
  })
}));

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2024-06-15'));
});
afterAll(() => {
  jest.useRealTimers();
});

// 屏蔽 act 警告
const originalError = console.error;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (typeof args[0] === 'string' && args[0].includes('not wrapped in act')) {
      return;
    }
    originalError.call(console, ...args);
  });
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore?.();
});

describe('CriticalIncidents', () => {
  it('加载时显示 loading', () => {
    render(<CriticalIncidents />);
    expect(screen.getByText(/Loading critical incidents/i)).toBeInTheDocument();
  });

  it('渲染关键事件内容', async () => {
    render(<CriticalIncidents />);
    await waitFor(() => {
      expect(screen.getByText(content => content.includes('Critical Risk Incidents'))).toBeInTheDocument();
      expect(screen.getByText(/环境|environmental/)).toBeInTheDocument();
      const criticalTags = screen.getAllByText(/critical/i);
      expect(criticalTags.length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('desc')).toBeInTheDocument();
      expect(screen.getByText('summary')).toBeInTheDocument();
      expect(screen.getByText('Test Source')).toBeInTheDocument();
    });
  });
});
