import React, { useMemo } from 'react';
import { Box, Heading, Text, Grid, Flex, List, ListItem } from '@chakra-ui/react';
import { CategoryKey, Category } from '@/types/publicType';
import { ESGCategoryData, ESGCategoriesDetailProps } from '@/types/esg';
import styles from './ESGCategoriesDetail.module.scss';

const TREND_CONFIG = {
  increasing: { className: styles['trend-increasing'], icon: '▲' },
  decreasing: { className: styles['trend-decreasing'], icon: '▼' },
  stable: { className: styles['trend-stable'], icon: '—' }
};

const CATEGORY_COLOR_MAP: Record<CategoryKey, string> = {
  environmental: styles['environmental-color'],
  social: styles['social-color'],
  governance: styles['governance-color']
};

// 获取趋势信息
const getTrendInfo = (trend: string) => {
  return TREND_CONFIG[trend as keyof typeof TREND_CONFIG] || TREND_CONFIG.stable;
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// 子类别列表组件
const SubcategoryList: React.FC<{ subcategories: any[] }> = ({ subcategories }) => (
  <List className={styles['subcategories-list']}>
    {subcategories.map(subcategory => (
      <ListItem key={subcategory.id} className={styles['subcategory-item']}>
        {subcategory.name}
      </ListItem>
    ))}
  </List>
);

// 类别卡片组件
const CategoryDetailCard: React.FC<{
  category: CategoryKey;
  data: Category;
  categoryDetails?: ESGCategoryData;
}> = ({ category, data, categoryDetails }) => {
  const { score, trend, changePercentage } = data;
  const trendInfo = getTrendInfo(trend);
  const colorClassName = CATEGORY_COLOR_MAP[category] || '';
  const hasSubcategories = Array.isArray(categoryDetails?.subcategories) && categoryDetails.subcategories.length > 0;

  return (
    <Box className={styles['category-card']}>
      {/* 顶部彩色条 */}
      <Box className={`${styles['color-bar']} ${colorClassName}`} />

      <Box className={styles['card-content']}>
        {/* 标题和趋势 */}
        <Flex className={styles['category-header']}>
          <Heading as="h3" className={`${styles['category-title']} ${styles[category]}`}>
            {categoryDetails?.name || capitalize(category)}
          </Heading>
          <Text className={`${styles['category-trend']} ${trendInfo.className}`}>
            {trendInfo.icon} {Math.abs(changePercentage).toFixed(1)}%
          </Text>
        </Flex>

        {categoryDetails?.description && (
          <Text className={styles['category-description']}>{categoryDetails.description}</Text>
        )}

        <Flex className={styles['score-container']}>
          <Text className={styles['score-value']}>{score}</Text>
          <Box className={styles['score-label']}>Risk Score</Box>
        </Flex>

        {hasSubcategories && (
          <Box className={styles['subcategories-container']}>
            <Box className={styles['subcategories-title']}>
              <Text as="span" className={styles['subcategories-title-text']}>
                Subcategories
              </Text>
              <Box className={styles['subcategories-divider']} />
            </Box>
            <SubcategoryList subcategories={categoryDetails.subcategories} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

// 主组件
const ESGCategoriesDetail: React.FC<ESGCategoriesDetailProps> = ({ categories, esgCategoriesData = [] }) => {
  const categoryDetailsMap = useMemo(() => {
    const map = new Map<string, ESGCategoryData>();
    esgCategoriesData.forEach(category => {
      map.set(category.id, category);
    });
    return map;
  }, [esgCategoriesData]);

  // 无数据处理
  if (!categories) {
    return <Box className={styles['loading-state']}>暂无类别数据</Box>;
  }

  return (
    <Box className={styles['container']}>
      <Heading as="h2" className={styles['section-title']}>
        ESG Category Breakdown
      </Heading>
      <Box className={styles['title-underline']} />

      <Grid className={styles['categories-grid']}>
        {Object.entries(categories).map(([key, data]) => {
          const categoryKey = key as CategoryKey;
          const categoryDetails = categoryDetailsMap.get(categoryKey);

          return <CategoryDetailCard key={key} category={categoryKey} data={data} categoryDetails={categoryDetails} />;
        })}
      </Grid>
    </Box>
  );
};

export default React.memo(ESGCategoriesDetail);
