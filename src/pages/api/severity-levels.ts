import type { NextApiRequest, NextApiResponse } from 'next';
import severityLevelsData from '@/data/severity-levels.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(severityLevelsData);
}
