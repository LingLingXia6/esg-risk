// 模拟 API 服务，获取公司风险总览数据
import companyRiskOverview from '@/data/company-risk-overview.json';
import riskScoreHistory from '@/data/risk-score-history.json';
import esgCategories from '@/data/esg-categories.json';

export const getCompanyRiskOverview = () => {
  return new Promise<typeof companyRiskOverview>(resolve => {
    setTimeout(() => {
      resolve(companyRiskOverview);
    }, 500); // 模拟网络延迟
  });
};

// 获取风险评分历史数据
export const getRiskScoreHistory = () => {
  return new Promise<typeof riskScoreHistory>(resolve => {
    setTimeout(() => {
      resolve(riskScoreHistory);
    }, 700); // 模拟网络延迟
  });
};

// 获取ESG类别数据
export const getESGCategories = () => {
  return new Promise<typeof esgCategories>(resolve => {
    setTimeout(() => {
      resolve(esgCategories);
    }, 300); // 模拟网络延迟
  });
};
