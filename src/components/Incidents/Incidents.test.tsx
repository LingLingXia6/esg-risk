import React from 'react';
import { render, screen } from '@testing-library/react';
import IncidentsPage from './Incidents';

// mock 依赖组件
jest.mock('@/components/Incidents/IncidentsTimeline', () => {
  const MockComponent = () => <div>IncidentsTimelineMock</div>;
  MockComponent.displayName = 'IncidentsTimelineMock';
  return MockComponent;
});
jest.mock('./incidents.module.scss', () => ({
  loading: 'loading',
  error: 'error'
}));

// mock hooks
jest.mock('@/hooks/useQueries', () => ({
  useIncidents: jest.fn(),
  useSeverityLevel: jest.fn(),
  useESGCategories: jest.fn()
}));

const { useIncidents, useSeverityLevel, useESGCategories } = require('@/hooks/useQueries');

describe('IncidentsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('加载时显示 loading', () => {
    useIncidents.mockReturnValue({ isLoading: true });
    useSeverityLevel.mockReturnValue({ isLoading: false });
    useESGCategories.mockReturnValue({ isLoading: false });
    render(<IncidentsPage />);
    expect(screen.getByText('加载事件数据中...')).toBeInTheDocument();
  });

  it('出错时显示 error', () => {
    useIncidents.mockReturnValue({ isLoading: false, error: true });
    useSeverityLevel.mockReturnValue({ isLoading: false, error: null });
    useESGCategories.mockReturnValue({ isLoading: false, error: null });
    render(<IncidentsPage />);
    expect(screen.getByText('无法加载数据，请稍后重试')).toBeInTheDocument();
  });

  it('正常渲染 IncidentsTimeline', () => {
    useIncidents.mockReturnValue({
      isLoading: false,
      error: null,
      data: { incidents: [{ id: 1 }] }
    });
    useSeverityLevel.mockReturnValue({
      isLoading: false,
      error: null,
      data: { severityLevels: [{ id: 1 }] }
    });
    useESGCategories.mockReturnValue({
      isLoading: false,
      error: null,
      data: { categories: [{ id: 1 }] }
    });
    render(<IncidentsPage />);
    expect(screen.getByText('IncidentsTimelineMock')).toBeInTheDocument();
  });
});
