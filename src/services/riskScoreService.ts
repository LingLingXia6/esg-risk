// 模拟 API 服务，获取公司风险总览数据
import companyRiskOverview from '@/data/company-risk-overview.json';
import riskScoreHistory from '@/data/risk-score-history.json';
import esgCategories from '@/data/esg-categories.json';
import criticalIncident from '@/data/critical-incidents.json';
import severityLevel from '@/data/severity-levels.json';
import incidents from '@/data/incidents.json';

export function getData<T>(data: T, delay: number = 300): Promise<T> {
  return new Promise<T>(resolve => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}
export function getIncidents() {
  return getData(incidents, 500);
}
export function getRiskScoreHistory() {
  return getData(riskScoreHistory, 350);
}
export function getCompanyRiskOverview() {
  return getData(companyRiskOverview, 500);
}

export const getESGCategories = () => {
  return getData(esgCategories, 500);
};

export const getSeverityLevel = () => {
  return getData(severityLevel, 500);
};

export const getCriticalIncident = () => {
  return getData(criticalIncident, 500);
};
