import React, { useEffect, useState, useCallback } from 'react';
import { getCompanyRiskOverview } from '@/services/riskScoreService';
import styles from './RiskScoreOverall.module.scss';

type CategoryKey = 'environmental' | 'social' | 'governance';
type Category = {
  score: number;
  trend: string;
  changePercentage: number;
};
type Overview = {
  overallRiskScore: number;
  trend: { direction: string; percentage: number };
  lastUpdated: string;
  categories: Record<CategoryKey, Category>;
};

const getTrendInfo = (trend: string) => {
  if (trend === 'increasing') return { className: styles['trend-increasing'], icon: '▲' };
  if (trend === 'decreasing') return { className: styles['trend-decreasing'], icon: '▼' };
  return { className: styles['trend-stable'], icon: '—' }; // 使用破折号代替空字符
};

const categoryBgClassMap: Record<CategoryKey, string> = {
  environmental: styles['category-environmental'],
  social: styles['category-social'],
  governance: styles['category-governance']
};
const getCategoryBgClass = (category: string) => categoryBgClassMap[category as CategoryKey] || '';

const capitalize = (str: string) => str.replace(/(^|\s)\S/g, l => l.toUpperCase());

const RiskScoreOverall: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<Overview | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCompanyRiskOverview();
      setOverview(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div style={{ padding: 40 }}>加载中...</div>;
  if (!overview) return <div style={{ padding: 40 }}>暂无数据</div>;

  const { overallRiskScore, trend, lastUpdated, categories } = overview;
  const trendInfo = getTrendInfo(trend?.direction ?? '');

  return (
    <div className={styles['container']}>
      {/* 总览卡片 */}
      <div className={styles['overview-card']}>
        <div className={styles['title']}>Risk Score</div>
        <div className={styles['score-container']}>
          <span className={styles['score']}>{overallRiskScore}</span>
          <div className={styles['trend-container']}>
            <span className={`${styles['trend']} ${trendInfo.className}`}>
              {trendInfo.icon} {Math.abs(trend?.percentage ?? 0).toFixed(1)}%
            </span>
            <div className={styles['direction']}>{capitalize(trend?.direction ?? '')}</div>
          </div>
        </div>
        <div className={styles['last-updated']}>Last updated: {lastUpdated.replace('T', ' ').slice(0, 16)}</div>
      </div>

      {/* 分类卡片 */}
      <div className={styles['categories']}>
        {Object.entries(categories).map(([key, cat]) => {
          const catTrend = getTrendInfo(cat.trend);
          // 使用 category-trend-increasing 等类名
          const trendClassName = `category-trend-${cat.trend}`;

          const titleClass = `${styles['category-title']} ${styles[`category-title-${key}`] || ''}`;

          return (
            <div key={key} className={`${styles['category-card']} ${getCategoryBgClass(key)}`}>
              <div className={titleClass}>{capitalize(key)}</div>
              <div className={styles['category-score']}>{cat.score}</div>
              <div className={`${styles['category-trend']} ${styles[trendClassName]}`}>
                {catTrend.icon} {Math.abs(cat.changePercentage).toFixed(1)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RiskScoreOverall;
