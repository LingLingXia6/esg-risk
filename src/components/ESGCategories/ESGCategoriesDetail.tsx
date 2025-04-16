import React, { useMemo } from 'react';
import styles from './ESGCategoriesDetail.module.scss';

type CategoryKey = 'environmental' | 'social' | 'governance';
type Category = {
  score: number;
  trend: string;
  changePercentage: number;
};

// 定义 ESG 类别数据类型
type ESGCategoryData = {
  id: string;
  name: string;
  description: string;
  color: string;
  subcategories: Array<{
    id: string;
    name: string;
  }>;
};

interface ESGCategoriesDetailProps {
  categories: Record<CategoryKey, Category> | null;
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
      <li key={subcat.id}>{subcat.name}</li>
    ))}
  </ul>
);

// 默认子类别列表
const DefaultSubcategoryList: React.FC<{ category: CategoryKey }> = ({ category }) => {
  const subcategories = {
    environmental: ['碳排放', '资源使用', '废弃物管理', '环境政策'],
    social: ['员工关系', '社区参与', '人权', '产品责任'],
    governance: ['董事会结构', '商业道德', '透明度', '风险管理']
  };

  return (
    <ul className={styles['detail-list']}>
      {subcategories[category].map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

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
    return {
      borderTopColor: categoryDetails.color,
      background: `linear-gradient(to bottom, ${categoryDetails.color}10, #fff 15%)`
    };
  }, [categoryDetails]);

  return (
    <div className={`${styles['category-card']} ${styles[`category-${category}`]}`} style={cardStyle}>
      <div className={styles['category-header']}>
        <h3 className={styles['category-title']}>{categoryDetails?.name || capitalize(category)}</h3>
        <div className={`${styles['category-trend']} ${trendInfo.className}`}>
          {trendInfo.icon} {Math.abs(changePercentage).toFixed(1)}%
        </div>
      </div>

      {categoryDetails?.description && (
        <div className={styles['category-description']}>{categoryDetails.description}</div>
      )}

      <div className={styles['category-score-container']}>
        <div className={styles['category-score']}>{score}</div>
        <div className={styles['category-label']}>Risk Score</div>
      </div>

      <div className={styles['category-details']}>
        {categoryDetails ? (
          <SubcategoryList subcategories={categoryDetails.subcategories} />
        ) : (
          <DefaultSubcategoryList category={category} />
        )}
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

  // Now we can have conditional returns
  if (!categories) return <div className={styles['loading-state']}>暂无类别数据</div>;

  return (
    <div className={styles['container']}>
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
