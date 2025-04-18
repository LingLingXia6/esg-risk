import { CategoryKey, Category } from '@/types/publicType';
export type Overview = {
  overallRiskScore: number;
  trend: { direction: string; percentage: number };
  lastUpdated: string;
  categories: Record<CategoryKey, Category>;
};

export type HistoryDataPoint = {
  date: string;
  overall: number;
} & Record<CategoryKey, number>;
