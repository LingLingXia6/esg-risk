import React from 'react';
import { Box } from '@chakra-ui/react';
import RiskScoreOverall from '@/components/RiskScore/RiskScoreOverall';
import ESGCategoriesDetail from '@/components/ESGCategories/ESGCategoriesDetail';
import RiskScoreHistory from '@/components/RiskHistory/RiskScoreHistory';
import { useCompanyRiskOverview, useRiskScoreHistory, useESGCategories } from '@/hooks/useQueries';
import { Error } from '@/components/common/Error';
import { Loading } from '@/components/common/Loading';
import { useTheme } from '@/contexts/ThemeContext'; // 导入主题 hook

const DashboardOverview: React.FC = () => {
  // 获取主题样式
  const { styles } = useTheme();

  // 获取数据
  const { data: riskData, isLoading: riskLoading, error: riskError } = useCompanyRiskOverview();
  const { data: historyData, isLoading: historyLoading, error: historyError } = useRiskScoreHistory();
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useESGCategories();

  // 整合加载状态和错误状态
  const isLoading = riskLoading || historyLoading || categoriesLoading;
  const error = riskError || historyError || categoriesError;
  const errorMessage = error ? 'Unable to load data. Please try again later.' : null;

  // 提取数据
  const esgCategoriesData = categoriesData?.categories || [];

  // 加载状态
  if (isLoading) {
    return <Loading text="Loading dashboard data..." />;
  }

  // 错误状态
  if (errorMessage) {
    return <Error message={errorMessage} />;
  }

  return (
    <Box>
      <RiskScoreOverall data={riskData} />
      <ESGCategoriesDetail categories={riskData?.categories} esgCategoriesData={esgCategoriesData} />
      <RiskScoreHistory data={historyData?.data || []} interval={historyData?.interval || 'monthly'} />
    </Box>
  );
};

export default DashboardOverview;
