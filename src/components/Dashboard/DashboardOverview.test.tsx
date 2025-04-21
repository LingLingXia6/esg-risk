import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardOverview from './DashboardOverview';

// mock 依赖组件
jest.mock('@/components/RiskScore/RiskScoreOverall', () => {
  const MockComponent = () => React.createElement('div', null, 'RiskScoreOverallMock');
  MockComponent.displayName = 'RiskScoreOverallMock';
  return MockComponent;
});
jest.mock('@/components/ESGCategories/ESGCategoriesDetail', () => {
  const MockComponent = () => React.createElement('div', null, 'ESGCategoriesDetailMock');
  MockComponent.displayName = 'ESGCategoriesDetailMock';
  return MockComponent;
});
jest.mock('@/components/RiskHistory/RiskScoreHistory', () => {
  const MockComponent = () => React.createElement('div', null, 'RiskScoreHistoryMock');
  MockComponent.displayName = 'RiskScoreHistoryMock';
  return MockComponent;
});
jest.mock('@/components/common/Error', () => ({
  Error: ({ message }: { message: string }) => <div>ErrorMock: {message}</div>
}));
jest.mock('@/components/common/Loading', () => ({
  Loading: ({ text }: { text: string }) => <div>LoadingMock: {text}</div>
}));
jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({ styles: {} })
}));

// mock hooks
jest.mock('@/hooks/useQueries', () => ({
  useCompanyRiskOverview: jest.fn(),
  useRiskScoreHistory: jest.fn(),
  useESGCategories: jest.fn()
}));

const { useCompanyRiskOverview, useRiskScoreHistory, useESGCategories } = require('@/hooks/useQueries');

describe('DashboardOverview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('加载时显示 Loading', () => {
    useCompanyRiskOverview.mockReturnValue({ isLoading: true });
    useRiskScoreHistory.mockReturnValue({ isLoading: false });
    useESGCategories.mockReturnValue({ isLoading: false });
    render(<DashboardOverview />);
    expect(screen.getByText(/LoadingMock: Loading dashboard data.../)).toBeInTheDocument();
  });

  it('出错时显示 Error', () => {
    useCompanyRiskOverview.mockReturnValue({ isLoading: false, error: true });
    useRiskScoreHistory.mockReturnValue({ isLoading: false, error: null });
    useESGCategories.mockReturnValue({ isLoading: false, error: null });
    render(<DashboardOverview />);
    expect(screen.getByText(/ErrorMock: Unable to load data/)).toBeInTheDocument();
  });

  it('正常渲染所有子组件', () => {
    useCompanyRiskOverview.mockReturnValue({
      isLoading: false,
      error: null,
      data: { categories: { environmental: {} } }
    });
    useRiskScoreHistory.mockReturnValue({
      isLoading: false,
      error: null,
      data: { data: [1, 2, 3], interval: 'monthly' }
    });
    useESGCategories.mockReturnValue({
      isLoading: false,
      error: null,
      data: { categories: [{ id: 'environmental' }] }
    });
    render(<DashboardOverview />);
    expect(screen.getByText('RiskScoreOverallMock')).toBeInTheDocument();
    expect(screen.getByText('ESGCategoriesDetailMock')).toBeInTheDocument();
    expect(screen.getByText('RiskScoreHistoryMock')).toBeInTheDocument();
  });
});
