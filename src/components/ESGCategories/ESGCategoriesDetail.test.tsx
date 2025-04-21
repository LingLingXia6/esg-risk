import React from 'react';
import { render, screen } from '@testing-library/react';
import ESGCategoriesDetail from './ESGCategoriesDetail';

describe('ESGCategoriesDetail', () => {
  const categories = {
    environmental: { score: 80, trend: 'increasing', changePercentage: 5 },
    social: { score: 70, trend: 'decreasing', changePercentage: -3 },
    governance: { score: 60, trend: 'stable', changePercentage: 0 }
  };
  const esgCategoriesData = [
    {
      id: 'environmental',
      name: '环境',
      color: '#2c7a7b',
      description: '环境描述',
      subcategories: [{ id: 'e1', name: '碳排放' }]
    },
    {
      id: 'social',
      name: '社会',
      color: '#2b6cb0',
      description: '社会描述',
      subcategories: [{ id: 's1', name: '员工权益' }]
    },
    {
      id: 'governance',
      name: '治理',
      color: '#6b46c1',
      description: '治理描述',
      subcategories: [{ id: 'g1', name: '公司治理' }]
    }
  ];

  it('渲染所有类别卡片', () => {
    render(<ESGCategoriesDetail categories={categories} esgCategoriesData={esgCategoriesData} />);
    expect(screen.getByText('环境')).toBeInTheDocument();
    expect(screen.getByText('社会')).toBeInTheDocument();
    expect(screen.getByText('治理')).toBeInTheDocument();
    expect(screen.getByText('环境描述')).toBeInTheDocument();
    expect(screen.getByText('社会描述')).toBeInTheDocument();
    expect(screen.getByText('治理描述')).toBeInTheDocument();
    expect(screen.getByText('碳排放')).toBeInTheDocument();
    expect(screen.getByText('员工权益')).toBeInTheDocument();
    expect(screen.getByText('公司治理')).toBeInTheDocument();
  });

  it('无数据时显示暂无类别数据', () => {
    render(<ESGCategoriesDetail categories={undefined} />);
    expect(screen.getByText('暂无类别数据')).toBeInTheDocument();
  });
});
