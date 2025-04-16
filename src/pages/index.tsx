import React, { useEffect, useState } from 'react';
import RiskScoreOverall from '@/components/RiskScore/RiskScoreOverall';
import { getCompanyRiskOverview } from '@/services/riskScoreService';

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

export default function Home() {
  const [loading, setLoading] = useState(true);
  // 使用 Overview 类型
  const [riskData, setRiskData] = useState<Overview | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getCompanyRiskOverview();
        setRiskData(data as Overview);
      } catch (error) {
        console.error('获取风险数据失败:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return <div>{loading ? <div style={{ padding: 40 }}>加载中...</div> : <RiskScoreOverall data={riskData} />}</div>;
}
