export type CategoryKey = 'environmental' | 'social' | 'governance';
export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';
export interface Severity {
  id: string;
  name: string;
  description: string;
  color: string;
}
// ESG类别定义
export type ESGCategory = {
  id: string;
  name: string;
  description: string;
  color: string;
  subcategories: {
    id: string;
    name: string;
  }[];
};
export type Source = {
  title: string;
  url: string;
  publishDate: string;
};
export type Category = {
  score: number;
  trend: string;
  changePercentage: number;
};
export type HistoryDataPoint = {
  date: string;
  overall: number;
} & Record<CategoryKey, number>;

export interface RiskScoreHistoryProps {
  data: HistoryDataPoint[];
  interval: string;
}
