import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading 组件', () => {
  it('默认渲染', () => {
    render(<Loading />);
    expect(screen.getByText('加载中...')).toBeInTheDocument();
    // Spinner 内部有 Loading... 文本
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('渲染自定义文本', () => {
    render(<Loading text="正在加载数据" />);
    expect(screen.getByText('正在加载数据')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('渲染自定义大小', () => {
    render(<Loading size="lg" />);
    // 只断言 Spinner 存在
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
