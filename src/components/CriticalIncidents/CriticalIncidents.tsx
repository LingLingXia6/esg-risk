import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { getCriticalIncident, getSeverityLevel, getIncidents } from '@/services/riskScoreService';
import { Incident as IncidentType } from '@/types/incidents';
import { combinedIncident as CriticalIncident } from '@/types/criticalIncidents';
import { Severity as SeverityLevelDetail, CategoryKey, SeverityLevel } from '@/types/publicType';
import styles from './CriticalIncidents.module.scss';

// 常量定义
const THIRTY_DAYS = 30;

const CriticalIncidents: React.FC = () => {
  const [incidents, setIncidents] = useState<CriticalIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取关键事件数据
  useEffect(() => {
    fetchCriticalIncidents();
  }, []);

  // 获取关键事件数据的函数
  const fetchCriticalIncidents = async () => {
    try {
      setLoading(true);
      const [criticalIncidentsData, severityLevelsData, incidentsData] = await Promise.all([
        getCriticalIncident(),
        getSeverityLevel(),
        getIncidents()
      ]);

      const criticalIncidents = criticalIncidentsData.criticalIncidents;
      const severityLevels = severityLevelsData.severityLevels;
      const incidents = incidentsData.incidents || [];

      // 合并事件数据
      const combinedIncidents = criticalIncidents?.map(incident => {
        const severityDetail = severityLevels.find((level: SeverityLevelDetail) => level.id === incident.severity);
        const matchedIncident = incidents.find((subIncident: IncidentType) => incident.id === subIncident.id);
        const sources = matchedIncident ? matchedIncident?.sources : [];

        return {
          ...incident,
          ...matchedIncident,
          severityLevel: severityDetail,
          category: incident.category as CategoryKey,
          severity: incident.severity as SeverityLevel,
          sources
        };
      });

      // 筛选过去30天内的高风险事件
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - THIRTY_DAYS);

      const filteredIncidents = combinedIncidents.filter(incident => {
        const incidentDate = new Date(incident.date);
        return incidentDate >= thirtyDaysAgo && (incident.severity === 'critical' || incident.severity === 'high');
      });

      setIncidents(filteredIncidents);
    } catch (err) {
      setError('Failed to load critical incidents data');
      console.error('Error fetching critical incidents:', err);
    } finally {
      setLoading(false);
    }
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // 渲染加载状态
  if (loading) {
    return <div className={styles['loading-container']}>Loading critical incidents...</div>;
  }

  // 渲染错误状态
  if (error) {
    return <div className={styles['error-container']}>{error}</div>;
  }

  return (
    <div className={styles['critical-incidents-container']}>
      <h2 className={styles['section-title']}>Critical Risk Incidents</h2>
      <p className={styles['section-description']}>
        High-risk incidents that occurred in the past 30 days, which significantly impact the company&apos;s ESG risk
        score.
      </p>

      {incidents.length === 0 ? (
        <div className={styles['empty-state']}>No critical risk incidents in the past 30 days</div>
      ) : (
        <div>
          {incidents.map(incident => (
            <div key={incident.id} className={styles['incident-card']}>
              {/* 标题和标签 */}
              <div className={styles['header-container']}>
                <h3 className={styles['incident-title']}>{incident.title}</h3>
                <div className={styles['badges-container']}>
                  <span className={`${styles['custom-badge']} ${styles[incident.category]}`}>
                    {incident.categoryDetail?.name || incident.category}
                  </span>
                  <span className={`${styles['custom-badge']} ${styles[incident.severity]}`}>
                    {incident.severityLevel?.name || incident.severity}
                  </span>
                </div>
              </div>

              {/* 日期和位置 */}
              <div className={styles['meta-info']}>
                {formatDate(incident.date)} · {incident.location}
              </div>

              {/* 描述 */}
              <p className={styles['description']}>{incident.description}</p>

              <div className={styles['divider']}></div>

              {/* 风险影响 */}
              <div>
                <h4 className={styles['section-label']}>Risk Impact:</h4>
                <div className={styles['impact-grid']}>
                  <div className={styles['impact-item']}>
                    <div className={styles['impact-label']}>Overall Impact</div>
                    <div
                      className={`${styles['impact-value']} ${styles['overall']} ${
                        typeof incident.riskScoreImpact === 'number'
                          ? incident.riskScoreImpact > 5
                            ? styles['high-impact']
                            : ''
                          : incident.riskScoreImpact.overall > 5
                          ? styles['high-impact']
                          : ''
                      }`}
                    >
                      +
                      {typeof incident.riskScoreImpact === 'number'
                        ? incident.riskScoreImpact.toFixed(1)
                        : incident.riskScoreImpact.overall.toFixed(1)}
                    </div>
                  </div>
                  <div className={styles['impact-item']}>
                    <div className={styles['impact-label']}>Environmental</div>
                    <div className={`${styles['impact-value']} ${styles['environmental']}`}>
                      +
                      {typeof incident.riskScoreImpact === 'number'
                        ? (incident.riskScoreImpact * 0.8).toFixed(1)
                        : incident.riskScoreImpact.environmental.toFixed(1)}
                    </div>
                  </div>
                  <div className={styles['impact-item']}>
                    <div className={styles['impact-label']}>Social</div>
                    <div className={`${styles['impact-value']} ${styles['social']}`}>
                      +
                      {typeof incident.riskScoreImpact === 'number'
                        ? (incident.riskScoreImpact * 0.6).toFixed(1)
                        : incident.riskScoreImpact.social.toFixed(1)}
                    </div>
                  </div>
                  <div className={styles['impact-item']}>
                    <div className={styles['impact-label']}>Governance</div>
                    <div className={`${styles['impact-value']} ${styles['governance']}`}>
                      +
                      {typeof incident.riskScoreImpact === 'number'
                        ? (incident.riskScoreImpact * 0.7).toFixed(1)
                        : incident.riskScoreImpact.governance.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>

              {/* 事件总结 */}
              {incident.summary && (
                <>
                  <>
                    <div className={styles['divider']}></div>
                    <div>
                      <h4 className={styles['section-label']}>Incident Summary:</h4>
                      <p className={styles['description']}>{incident.summary}</p>
                    </div>
                  </>
                </>
              )}

              {/* 信息来源 */}
              {incident.sources && incident.sources.length > 0 && (
                <>
                  <div className={styles['divider']}></div>
                  <div>
                    <h4 className={styles['section-label']}>Information Sources:</h4>
                    <div className={styles['sources-list']}>
                      {incident.sources.map((source, index) => (
                        <div key={index} className={styles['source-item']}>
                          <a
                            href={source.url}
                            className={styles['source-link']}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {source.title}
                          </a>
                          <div className={styles['source-date']}>Published on: {formatDate(source.publishDate)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CriticalIncidents;
