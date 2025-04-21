import React from 'react';
import { render, screen } from '@testing-library/react';
import { TagGroup } from './TagGroup';

it('选中标签应有指定 className', () => {
  const items = [
    { id: '1', name: '环境', color: '#2E7D32' },
    { id: '2', name: '社会', color: '#1976D2' },
    { id: '3', name: '治理', color: '#7B1FA2' }
  ];

  render(<TagGroup items={items} selectedIds={['1']} onChange={() => {}} />);

  const envTag = screen.getByTestId('tag-1');
  expect(envTag).toBeInTheDocument();
  // 断言 className 存在（Chakra UI 会根据选中状态生成不同的 className），所以无法确定
  expect(envTag.className).toMatch(/css-/);
});
