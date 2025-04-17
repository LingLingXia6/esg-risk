import React, { useEffect, useState } from 'react';
import RiskScoreOverall from '@/components/RiskScore/RiskScoreOverall';
import ESGCategoriesDetail from '../components/ESGCategories/ESGCategoriesDetail';
import RiskScoreHistory from '@/components/RiskHistory/RiskScoreHistory';
import { getCompanyRiskOverview, getRiskScoreHistory, getESGCategories } from '@/services/riskScoreService';
import { ESGCategory as ESGCategoryType } from '@/types/publicType';
import styles from './index.module.scss';
import Incidents from '@/components/Incidents/Incidents';
import CriticalIncidents from '@/components/CriticalIncidents/CriticalIncidents';

// Define common types at the top level for reuse
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

type HistoryDataPoint = {
  date: string;
  overall: number;
} & Record<CategoryKey, number>;

// 使用从types/incidents导入的ESGCategory类型
export default function Home() {
  // State management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [riskData, setRiskData] = useState<Overview | null>(null);
  const [esgCategoriesData, setEsgCategoriesData] = useState<ESGCategoryType[]>([]);
  const [historyData, setHistoryData] = useState<{
    data: HistoryDataPoint[];
    interval: string;
  }>({ data: [], interval: 'monthly' });

  // Fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // Fetch data in parallel for better performance
        const [overviewData, historyResult, categoriesData] = await Promise.all([
          getCompanyRiskOverview(),
          getRiskScoreHistory(),
          getESGCategories()
        ]);

        setRiskData(overviewData as Overview);
        setHistoryData(historyResult);
        setEsgCategoriesData(categoriesData.categories);
      } catch (error) {
        console.error('获取数据失败:', error);
        setError('无法加载数据，请稍后重试');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return <div className={styles['loading-container']}>加载中...</div>;
  }

  // Error state
  if (error) {
    return <div className={styles['error-container']}>{error}</div>;
  }

  // Render components
  return (
    <div className={styles['home-container']}>
      <div className={styles['content-wrapper']}>
        <div className={styles['section']}>
          <h2 className={styles['section-title']}>Risk Overall</h2>
          <RiskScoreOverall data={riskData} />
        </div>

        {riskData && (
          <div className={styles['section']}>
            <h2 className={styles['section-title']}>ESG Category Breakdown</h2>
            <ESGCategoriesDetail categories={riskData?.categories} esgCategoriesData={esgCategoriesData} />
          </div>
        )}

        <div className={styles['section']}>
          <h2 className={styles['section-title']}>ESG History</h2>
          <RiskScoreHistory data={historyData.data} interval={historyData.interval} />
        </div>
        <div className={styles['section']}>
          <h2 className={styles['section-title']}>Incidents</h2>
          <Incidents />
        </div>
        <CriticalIncidents />
      </div>
    </div>
  );
}
