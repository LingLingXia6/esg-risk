import type { NextApiRequest, NextApiResponse } from 'next';
import incidentsData from '@/data/incidents.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 可以在这里添加额外的处理逻辑，如分页、筛选等
  res.status(200).json(incidentsData);
}
