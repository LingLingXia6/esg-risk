import { useQuery } from '@tanstack/react-query';
import {
  getCompanyRiskOverview,
  getRiskScoreHistory,
  getESGCategories,
  getIncidents,
  getSeverityLevel,
  getCriticalIncident
} from '@/services/riskScoreService';

// 定义查询键
export const QUERY_KEYS = {
  companyRiskOverview: 'companyRiskOverview',
  riskScoreHistory: 'riskScoreHistory',
  esgCategories: 'esgCategories',
  incidents: 'incidents',
  severityLevel: 'severityLevel',
  criticalIncident: 'criticalIncident'
};

// 公司风险总览
export const useCompanyRiskOverview = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.companyRiskOverview],
    queryFn: getCompanyRiskOverview
  });
};

// 风险评分历史
export const useRiskScoreHistory = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.riskScoreHistory],
    queryFn: getRiskScoreHistory
  });
};

// ESG 类别
export const useESGCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.esgCategories],
    queryFn: getESGCategories
  });
};

// 事件列表
export const useIncidents = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.incidents],
    queryFn: getIncidents
  });
};

// 严重程度级别
export const useSeverityLevel = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.severityLevel],
    queryFn: getSeverityLevel
  });
};

// 关键事件
export const useCriticalIncident = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.criticalIncident],
    queryFn: getCriticalIncident
  });
};
