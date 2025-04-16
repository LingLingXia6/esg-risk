// 模拟 API 服务，获取公司风险总览数据
import companyRiskOverview from '@/data/company-risk-overview.json';

export const getCompanyRiskOverview = () => {
  return new Promise<typeof companyRiskOverview>(resolve => {
    setTimeout(() => {
      resolve(companyRiskOverview);
    }, 500); // 模拟网络延迟
  });
};
