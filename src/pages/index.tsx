import React, { useEffect, useState } from 'react';
import RiskScoreOverall from '@/components/RiskScore/RiskScoreOverall';
import ESGCategoriesDetail from '../components/ESGCategories/ESGCategoriesDetail';
import RiskScoreHistory from '@/components/RiskHistory/RiskScoreHistory';
import { getCompanyRiskOverview, getRiskScoreHistory, getESGCategories } from '@/services/riskScoreService';
import { ESGCategory as ESGCategoryType } from '@/types/publicType';
import { Overview, HistoryDataPoint } from '@/types/overview';
import styles from './index.module.scss';
import Incidents from '@/components/Incidents/Incidents';
import CriticalIncidents from '@/components/CriticalIncidents/CriticalIncidents';

export default function Home() {
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
