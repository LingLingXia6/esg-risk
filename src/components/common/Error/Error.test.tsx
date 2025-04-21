import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from './Error';

describe('Error Component', () => {
  it('渲染默认错误信息', () => {
    render(<Error />);
    expect(screen.getByText('出错了')).toBeInTheDocument();
    expect(screen.getByText('加载数据时出错，请稍后重试')).toBeInTheDocument();
  });

  it('渲染自定义错误信息', () => {
    const customMessage = '自定义错误信息';
    render(<Error message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('点击重试按钮触发回调', () => {
    const mockRetry = jest.fn();
    render(<Error onRetry={mockRetry} />);
    screen.getByText('重试').click();
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it('没有重试回调时不显示按钮', () => {
    render(<Error onRetry={undefined} />);
    expect(screen.queryByText('重试')).not.toBeInTheDocument();
  });
});
