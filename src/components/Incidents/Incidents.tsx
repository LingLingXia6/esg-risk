import React from 'react';
import IncidentsTimeline from '@/components/Incidents/IncidentsTimeline';
import { useIncidents, useSeverityLevel, useESGCategories } from '@/hooks/useQueries';
import styles from './incidents.module.scss';

const IncidentsPage: React.FC = () => {
  // 使用 React Query hooks 获取数据
  const { data: incidentsData, isLoading: incidentsLoading, error: incidentsError } = useIncidents();

  const { data: severityData, isLoading: severityLoading, error: severityError } = useSeverityLevel();

  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useESGCategories();

  // 整合加载状态和错误状态
  const isLoading = incidentsLoading || severityLoading || categoriesLoading;
  const error = incidentsError || severityError || categoriesError;
  const errorMessage = error ? '无法加载数据，请稍后重试' : null;

  if (isLoading) {
    return <div className={styles.loading}>加载事件数据中...</div>;
  }

  if (errorMessage) {
    return <div className={styles.error}>{errorMessage}</div>;
  }

  // 提取数据
  const incidents = incidentsData?.incidents || [];
  const severityLevels = severityData?.severityLevels || [];
  const esgCategories = categoriesData?.categories || [];

  return (
    <div>
      <IncidentsTimeline incidents={incidents} severityLevels={severityLevels} esgCategories={esgCategories} />
    </div>
  );
};

export default IncidentsPage;
