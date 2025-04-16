import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './RiskScoreHistory.module.scss';

// Define data types
type CategoryKey = 'environmental' | 'social' | 'governance';
type HistoryDataPoint = {
  date: string;
  overall: number;
} & Record<CategoryKey, number>;
interface RiskScoreHistoryProps {
  data: HistoryDataPoint[];
  interval: string;
}

const CATEGORIES = {
  OVERALL: 'overall',
  ENVIRONMENTAL: 'environmental',
  SOCIAL: 'social',
  GOVERNANCE: 'governance'
} as const;

// 颜色映射
const CATEGORY_COLORS: Record<string, string> = {
  [CATEGORIES.OVERALL]: '#333333',
  [CATEGORIES.ENVIRONMENTAL]: '#7a944b',
  [CATEGORIES.SOCIAL]: '#c48a3a',
  [CATEGORIES.GOVERNANCE]: '#5472b3'
};

// 类别名称映射
const CATEGORY_NAMES: Record<string, string> = {
  [CATEGORIES.OVERALL]: 'Overall',
  [CATEGORIES.ENVIRONMENTAL]: 'Environmental',
  [CATEGORIES.SOCIAL]: 'Social',
  [CATEGORIES.GOVERNANCE]: 'Governance'
};

// 时间间隔标题映射
const INTERVAL_TITLES: Record<string, string> = {
  weekly: 'Weekly Risk Score Trend',
  monthly: 'Monthly Risk Score Trend',
  quarterly: 'Quarterly Risk Score Trend',
  yearly: 'Yearly Risk Score Trend'
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(date);
};

const RiskScoreHistory: React.FC<RiskScoreHistoryProps> = ({ data, interval }) => {
  // Process data to ensure date format is correct
  const chartData = useMemo(() => {
    return data.map(item => ({
      ...item,
      formattedDate: formatDate(item.date)
    }));
  }, [data]);

  // 如果没有数据，显示提示信息
  if (!data || data.length === 0) {
    return <div className={styles['no-data']}>No historical data available</div>;
  }

  // 创建图表线条配置
  const createLineConfig = (category: string, isMain = false) => ({
    type: 'monotone' as const,
    dataKey: category,
    name: category,
    stroke: CATEGORY_COLORS[category] || '#999999',
    strokeWidth: isMain ? 3 : 2,
    dot: { r: isMain ? 4 : 3 },
    activeDot: isMain ? { r: 6 } : undefined
  });

  return (
    <div className={styles.container}>
      <h2 className={styles['chart-title']}>{INTERVAL_TITLES[interval] || 'Historical Risk Score Trend'}</h2>

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
              formatter={(value: number, name: string) => [`${value}`, CATEGORY_NAMES[name] || name]}
              labelFormatter={label => `Date: ${label}`}
            />
            <Legend formatter={value => CATEGORY_NAMES[value] || value} wrapperStyle={{ paddingTop: 15 }} />

            <Line {...createLineConfig(CATEGORIES.OVERALL, true)} />
            <Line {...createLineConfig(CATEGORIES.ENVIRONMENTAL)} />
            <Line {...createLineConfig(CATEGORIES.SOCIAL)} />
            <Line {...createLineConfig(CATEGORIES.GOVERNANCE)} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles['chart-footer']}>
        <div className={styles['interval-info']}>Data Frequency: {interval}</div>
        <div className={styles['data-points-info']}>Data Points: {data.length}</div>
      </div>
    </div>
  );
};

export default React.memo(RiskScoreHistory);
