import React, { useMemo } from 'react';
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

interface RiskScoreOverallProps {
  data: Overview | null;
}
// 使用 useMemo 优化趋势信息计算
const getTrendInfo = (trend: string) => {
  if (trend === 'increasing') return { className: styles['trend-increasing'], icon: '▲' };
  if (trend === 'decreasing') return { className: styles['trend-decreasing'], icon: '▼' };
  return { className: styles['trend-stable'], icon: '—' };
};

const categoryBgClassMap: Record<CategoryKey, string> = {
  environmental: styles['category-environmental'],
  social: styles['category-social'],
  governance: styles['category-governance']
};
const getCategoryBgClass = (category: string) => categoryBgClassMap[category as CategoryKey] || '';

const capitalize = (str: string) => str.replace(/(^|\s)\S/g, l => l.toUpperCase());

// 提取卡片组件
const CategoryCard: React.FC<{ category: string; data: Category }> = ({ category, data }) => {
  const catTrend = getTrendInfo(data.trend);
  const trendClassName = `category-trend-${data.trend}`;
  const titleClass = `${styles['category-title']} ${styles[`category-title-${category}`] || ''}`;

  return (
    <div className={`${styles['category-card']} ${getCategoryBgClass(category)}`}>
      <div className={titleClass}>{capitalize(category)}</div>
      <div className={styles['category-score']}>{data.score}</div>
      <div className={`${styles['category-trend']} ${styles[trendClassName]}`}>
        {catTrend.icon} {Math.abs(data.changePercentage).toFixed(1)}%
      </div>
    </div>
  );
};

const RiskScoreOverall: React.FC<RiskScoreOverallProps> = ({ data }) => {
  // Move hooks before any conditional returns
  const trendInfo = useMemo(() => {
    if (!data?.trend?.direction) return getTrendInfo('');
    return getTrendInfo(data.trend.direction);
  }, [data?.trend?.direction]);

  const formattedDate = useMemo(() => {
    if (!data?.lastUpdated) return '';
    try {
      return data.lastUpdated.replace('T', ' ').slice(0, 16);
    } catch (error) {
      console.error('Date formatting error:', error);
      return data.lastUpdated || '';
    }
  }, [data?.lastUpdated]);

  // Now we can safely have conditional returns
  if (!data) return <div className={styles['loading-state']}>暂无数据</div>;

  const { overallRiskScore, trend, categories } = data;

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
        <div className={styles['last-updated']}>Last updated: {formattedDate}</div>
      </div>

      {/* 分类卡片 */}
      <div className={styles['categories']}>
        {Object.entries(categories).map(([key, cat]) => (
          <CategoryCard key={key} category={key} data={cat} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(RiskScoreOverall);
