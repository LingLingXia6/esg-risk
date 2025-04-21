import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DateRangePicker } from './DateRangePicker';

describe('DateRangePicker', () => {
  it('渲染标题和初始日期', () => {
    render(<DateRangePicker value={{ start: '2024-01-01', end: '2024-01-31' }} onChange={() => {}} title="日期范围" />);
    expect(screen.getByText('日期范围')).toBeInTheDocument();
    expect(screen.getByLabelText(/Start/i)).toHaveValue('2024-01-01');
    expect(screen.getByLabelText(/End/i)).toHaveValue('2024-01-31');
  });

  it('修改日期会触发 onChange', () => {
    const handleChange = jest.fn();
    render(<DateRangePicker value={{ start: '2024-01-01', end: '2024-01-31' }} onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText(/Start/i), { target: { value: '2024-02-01' } });
    expect(handleChange).toHaveBeenCalledWith({ start: '2024-02-01', end: '2024-01-31' });
  });
});
