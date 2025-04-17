import { Severity, ESGCategory, Source, CategoryKey, SeverityLevel } from './publicType';

export type criticalIncident = {
  id: string;
  title: string;
  data: string;
  category: 'environmental' | 'social' | 'governance';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  location: string;
  riskScoreImpact: number;
  summary: string;
};
export type CriticalIncidents = {
  companyId: string;
  companyName: string;
  criticalIncidents: criticalIncident[];
};
type RiskScoreImpactType = {
  overall: number;
  environmental: number;
  social: number;
  governance: number;
};
export type combinedIncident = {
  id: string;
  title: string;
  date: string;
  category: CategoryKey;
  severity: SeverityLevel;
  description: string;
  location: string;
  riskScoreImpact: RiskScoreImpactType | number;
  summary: string;
  severityLevel?: Severity;
  sources?: Source[];
  categoryDetail?: ESGCategory;
};
