import React, { useMemo } from 'react';
import { CategoryKey, Category } from '@/types/publicType';
import { ESGCategoryData } from '@/types/esg';
import styles from './ESGCategoriesDetail.module.scss';

interface ESGCategoriesDetailProps {
  categories: Record<CategoryKey, Category> | undefined;
  esgCategoriesData?: ESGCategoryData[];
}

// 获取趋势信息（图标和样式类）
const getTrendInfo = (trend: string) => {
  if (trend === 'increasing') return { className: styles['trend-increasing'], icon: '▲' };
  if (trend === 'decreasing') return { className: styles['trend-decreasing'], icon: '▼' };
  return { className: styles['trend-stable'], icon: '—' };
};

// 首字母大写
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// 子类别列表组件
const SubcategoryList: React.FC<{ subcategories: ESGCategoryData['subcategories'] }> = ({ subcategories }) => (
  <ul className={styles['detail-list']}>
    {subcategories.map(subcat => (
      <li key={subcat.id} style={{ color: '#333', fontWeight: 400 }}>
        {subcat.name}
      </li>
    ))}
  </ul>
);

// 类别卡片组件
const CategoryDetailCard: React.FC<{
  category: CategoryKey;
  data: Category;
  categoryDetails?: ESGCategoryData;
}> = ({ category, data, categoryDetails }) => {
  const { score, trend, changePercentage } = data;
  const trendInfo = getTrendInfo(trend);

  // 使用 useMemo 缓存样式计算结果
  const cardStyle = useMemo(() => {
    if (!categoryDetails) return {};

    // 增强卡片样式，使内容更加醒目
    return {
      borderTopColor: categoryDetails.color,
      background: `linear-gradient(to bottom, ${categoryDetails.color}25, #fff 15%)`,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e0e0e0'
    };
  }, [categoryDetails]);

  // 使用对象映射替代条件判断
  const titleColors: Record<CategoryKey, string> = {
    environmental: '#2c7a7b',
    social: '#2b6cb0',
    governance: '#6b46c1'
  };

  // 获取标题颜色
  const getTitleColor = () => titleColors[category] || '#333333';

  return (
    <div className={`${styles['category-card']} ${styles[`category-${category}`]}`} style={cardStyle}>
      <div className={styles['category-header']}>
        <h3 className={styles['category-title']} style={{ color: getTitleColor(), fontWeight: 600 }}>
          {categoryDetails?.name || capitalize(category)}
        </h3>
        <div className={`${styles['category-trend']} ${trendInfo.className}`}>
          {trendInfo.icon} {Math.abs(changePercentage).toFixed(1)}%
        </div>
      </div>

      {categoryDetails?.description && (
        <div className={styles['category-description']} style={{ color: '#4a5568', fontWeight: 500 }}>
          {categoryDetails.description}
        </div>
      )}

      <div className={styles['category-score-container']}>
        <div className={styles['category-score']} style={{ color: '#1a202c', fontWeight: 700, fontSize: '1.8rem' }}>
          {score}
        </div>
        <div className={styles['category-label']} style={{ color: '#4a5568', fontWeight: 500 }}>
          Risk Score
        </div>
      </div>

      <div className={styles['category-details']}>
        {categoryDetails && <SubcategoryList subcategories={categoryDetails.subcategories} />}
      </div>
    </div>
  );
};

const ESGCategoriesDetail: React.FC<ESGCategoriesDetailProps> = ({ categories, esgCategoriesData = [] }) => {
  const categoryDetailsMap = useMemo(() => {
    const map = new Map<string, ESGCategoryData>();
    esgCategoriesData.forEach(category => {
      map.set(category.id, category);
    });
    return map;
  }, [esgCategoriesData]);

  if (!categories) return <div className={styles['loading-state']}>暂无类别数据</div>;

  return (
    <div className={styles['container']} style={{ backgroundColor: '#ffffff' }}>
      <div className={styles['categories-grid']}>
        {Object.entries(categories).map(([key, data]) => {
          const categoryKey = key as CategoryKey;
          const categoryDetails = categoryDetailsMap.get(categoryKey);

          return <CategoryDetailCard key={key} category={categoryKey} data={data} categoryDetails={categoryDetails} />;
        })}
      </div>
    </div>
  );
};

export default React.memo(ESGCategoriesDetail);
