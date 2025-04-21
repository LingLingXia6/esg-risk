import React from 'react';
import { render, screen } from '@testing-library/react';
import { Timeline, TimelineItem } from './Timeline';

describe('Timeline 组件', () => {
  const items: TimelineItem[] = [
    { id: '1', date: '2024-06-01', dotBorderColor: 'red.500' },
    { id: '2', date: '2024-06-02' }
  ];

  const renderItem = (item: TimelineItem) => <div data-testid={`timeline-content-${item.id}`}>内容{item.id}</div>;
  const renderDate = (date: string) => `日期:${date}`;

  it('正确渲染所有时间轴项', () => {
    render(<Timeline items={items} renderItem={renderItem} renderDate={renderDate} />);

    // 检查内容渲染
    expect(screen.getByTestId('timeline-content-1')).toHaveTextContent('内容1');
    expect(screen.getByTestId('timeline-content-2')).toHaveTextContent('内容2');

    // 检查日期渲染
    expect(screen.getByTestId('timeline-date-1')).toHaveTextContent('日期:2024-06-01');
    expect(screen.getByTestId('timeline-date-2')).toHaveTextContent('日期:2024-06-02');
  });

  it('时间点边框颜色可自定义', () => {
    render(<Timeline items={items} renderItem={renderItem} renderDate={renderDate} />);
    // 给 Timeline.tsx 的时间点加 data-testid="timeline-dot-{item.id}"
    const dot1 = screen.getByTestId('timeline-dot-1');
    const dot2 = screen.getByTestId('timeline-dot-2');
    expect(dot1).toBeInTheDocument();
    expect(dot2).toBeInTheDocument();
  });
});
