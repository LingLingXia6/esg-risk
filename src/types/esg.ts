import { CategoryKey, Category } from '@/types/publicType';
export type ESGCategoryData = {
  id: string;
  name: string;
  description: string;
  color: string;
  subcategories: {
    id: string;
    name: string;
  }[];
};

export interface ESGCategoriesDetailProps {
  categories: Record<CategoryKey, Category> | null;
  esgCategoriesData?: ESGCategoryData[];
}
