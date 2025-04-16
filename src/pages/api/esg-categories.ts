import type { NextApiRequest, NextApiResponse } from 'next';
import esgCategoriesData from '@/data/esg-categories.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(esgCategoriesData);
}
