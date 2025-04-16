// ESG类别键
export type CategoryKey = 'environmental' | 'social' | 'governance';

// 风险评分影响
export type RiskScoreImpact = {
  overall: number;
} & Record<CategoryKey, number>;

// 信息来源
export type Source = {
  title: string;
  url: string;
  publishDate: string;
};

// 事件数据
export type Incident = {
  id: string;
  title: string;
  date: string;
  category: string;
  subcategory: string;
  severity: string;
  description: string;
  detailedDescription: string;
  location: string;
  riskScoreImpact: RiskScoreImpact;
  sources: Source[];
};

// 严重程度级别
export type SeverityLevel = string;

// ESG类别定义
export type ESGCategory = {
  id: string;
  name: string;
  description: string;
  color: string;
  subcategories: Array<{
    id: string;
    name: string;
  }>;
};

// 添加 SeverityLevelDefinition 类型
export interface SeverityLevelDefinition {
  id: string;
  name: string;
  description: string;
  color: string;
}
