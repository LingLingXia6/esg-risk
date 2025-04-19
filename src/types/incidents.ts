import { Source, CategoryKey } from './publicType';

export type RiskScoreImpact = {
  overall: number;
} & Record<CategoryKey, number>;
export interface CategoryOrSeverity {
  id: string;
  name: string;
  description: string;
  color: string;
}

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

export type SeverityLevel = string;
