import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './RiskScoreHistory.module.scss';

// 定义数据类型
type CategoryKey = 'environmental' | 'social' | 'governance';
type HistoryDataPoint = {
  date: string;
  overall: number;
} & Record<CategoryKey, number>;

interface RiskScoreHistoryProps {
  data: HistoryDataPoint[];
  interval: string;
}

// 格式化日期显示
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// 获取类别颜色
const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'overall':
      return '#333333';
    case 'environmental':
      return '#7a944b';
    case 'social':
      return '#c48a3a';
    case 'governance':
      return '#5472b3';
    default:
      return '#999999';
  }
};

// 获取类别中文名称
const getCategoryName = (category: string): string => {
  switch (category) {
    case 'overall':
      return '总体';
    case 'environmental':
      return '环境';
    case 'social':
      return '社会';
    case 'governance':
      return '治理';
    default:
      return category;
  }
};

const RiskScoreHistory: React.FC<RiskScoreHistoryProps> = ({ data, interval }) => {
  // 处理数据，确保日期格式正确
  const chartData = useMemo(() => {
    return data.map(item => ({
      ...item,
      formattedDate: formatDate(item.date)
    }));
  }, [data]);

  // 获取图表标题
  const getChartTitle = () => {
    switch (interval) {
      case 'weekly':
        return '每周风险评分趋势';
      case 'monthly':
        return '每月风险评分趋势';
      case 'quarterly':
        return '季度风险评分趋势';
      case 'yearly':
        return '年度风险评分趋势';
      default:
        return '风险评分历史趋势';
    }
  };

  if (!data || data.length === 0) {
    return <div className={styles['no-data']}>暂无历史数据</div>;
  }

  return (
    <div className={styles['container']}>
      <h2 className={styles['chart-title']}>{getChartTitle()}</h2>

      <div className={styles['chart-container']}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="formattedDate" tick={{ fontSize: 12 }} tickMargin={10} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} tickMargin={10} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                borderRadius: '4px'
              }}
              formatter={(value: number, name: string) => [`${value}`, getCategoryName(name)]}
              labelFormatter={label => `日期: ${label}`}
            />
            <Legend formatter={value => getCategoryName(value)} wrapperStyle={{ paddingTop: 15 }} />

            {/* 绘制总体风险评分线 */}
            <Line
              type="monotone"
              dataKey="overall"
              name="overall"
              stroke={getCategoryColor('overall')}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            {/* 绘制各类别风险评分线 */}
            <Line
              type="monotone"
              dataKey="environmental"
              name="environmental"
              stroke={getCategoryColor('environmental')}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="social"
              name="social"
              stroke={getCategoryColor('social')}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="governance"
              name="governance"
              stroke={getCategoryColor('governance')}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles['chart-footer']}>
        <div className={styles['interval-info']}>
          数据频率:{' '}
          {interval === 'weekly'
            ? '每周'
            : interval === 'monthly'
            ? '每月'
            : interval === 'quarterly'
            ? '季度'
            : '年度'}
        </div>
        <div className={styles['data-points-info']}>数据点: {data.length}</div>
      </div>
    </div>
  );
};

export default React.memo(RiskScoreHistory);
