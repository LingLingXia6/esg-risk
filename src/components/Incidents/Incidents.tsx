import React, { useEffect, useState } from 'react';
import IncidentsTimeline from '@/components/Incidents/IncidentsTimeline';
import { getIncidents, getSeverityLevels, getESGCategories } from '@/services/incidentService';
import { Incident as ImportedIncident, ESGCategory } from '@/types/incidents';
import styles from './incidents.module.scss';

// 从 IncidentsTimeline 组件中导入类型定义
type CategoryKey = 'environmental' | 'social' | 'governance';
type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';

// 定义与 IncidentsTimeline 组件兼容的 Incident 类型
type Incident = {
  id: string;
  title: string;
  date: string;
  category: CategoryKey; // 这里使用 CategoryKey 而不是 string
  subcategory: string;
  severity: SeverityLevel;
  description: string;
  detailedDescription: string;
  location: string;
  riskScoreImpact: {
    overall: number;
  } & Record<CategoryKey, number>;
  sources: {
    title: string;
    url: string;
    publishDate: string;
  }[];
};

const IncidentsPage: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [severityLevels, setSeverityLevels] = useState<any[]>([]);
  const [esgCategories, setEsgCategories] = useState<ESGCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const [incidentsData, severityData, categoriesData] = await Promise.all([
          getIncidents(),
          getSeverityLevels(),
          getESGCategories()
        ]);

        const convertedIncidents = incidentsData.incidents.map((incident: ImportedIncident) => ({
          ...incident,
          category: incident.category as CategoryKey,
          severity: incident.severity as SeverityLevel
        }));

        setIncidents(convertedIncidents);
        setSeverityLevels(severityData.severityLevels);
        setEsgCategories(categoriesData.categories);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load event data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading event data...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>ESG Event Monitoring</h1>
      <p className={styles.pageDescription}>
        Track environmental, social, and governance events related to the company and understand their impact on ESG
        risk scores.
      </p>

      <IncidentsTimeline incidents={incidents} severityLevels={severityLevels} esgCategories={esgCategories} />
    </div>
  );
};

export default IncidentsPage;
