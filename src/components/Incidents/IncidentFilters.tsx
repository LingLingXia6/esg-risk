import React from 'react';
import { Box, Heading, Flex, Grid, Button, useColorModeValue } from '@chakra-ui/react';
import { DateRangePicker } from '../common/DateRangePicker/DateRangePicker';
import { TagGroup } from '../common/TagGroup/TagGroup';

// 类型定义
interface FiltersState {
  dateRange: {
    start: string;
    end: string;
  };
  categories: string[];
  severities: string[];
}

// ESG类别和严重程度的通用类型
interface CategoryOrSeverity {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface IncidentFiltersProps {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
  esgCategories: (CategoryOrSeverity & {
    subcategories: { id: string; name: string }[];
  })[];
  severityLevels: CategoryOrSeverity[];
}

const IncidentFilters: React.FC<IncidentFiltersProps> = ({ filters, setFilters, esgCategories, severityLevels }) => {
  // 处理日期范围变化
  const handleDateRangeChange = (dateRange: { start: string; end: string }) => {
    setFilters(prev => ({
      ...prev,
      dateRange
    }));
  };

  // 通用的处理选择变化的函数
  const handleSelectionChange = (id: string, type: 'categories' | 'severities') => {
    setFilters(prev => {
      const items = [...prev[type]];
      const index = items.indexOf(id);

      if (index === -1) {
        items.push(id);
      } else {
        items.splice(index, 1);
      }

      return {
        ...prev,
        [type]: items
      };
    });
  };

  // 重置所有筛选条件
  const resetFilters = () => {
    setFilters({
      dateRange: { start: '', end: '' },
      categories: [],
      severities: []
    });
  };

  // 处理类别和严重程度的变化
  const handleCategoryChange = (id: string) => {
    handleSelectionChange(id, 'categories');
  };

  const handleSeverityChange = (id: string) => {
    handleSelectionChange(id, 'severities');
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box bg={bgColor} borderRadius="lg" p={5} mb={6} boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
      <Flex justify="space-between" align="center" mb={5} pb={3} borderBottom="1px solid" borderColor={borderColor}>
        <Heading as="h3" size="md" fontWeight="600">
          Filter Events
        </Heading>
        <Button variant="ghost" size="sm" colorScheme="blue" onClick={resetFilters}>
          Reset
        </Button>
      </Flex>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
        <DateRangePicker value={filters.dateRange} onChange={handleDateRangeChange} title="Date Range" />

        <TagGroup
          items={esgCategories}
          selectedIds={filters.categories}
          onChange={handleCategoryChange}
          title="ESG Categories"
        />

        <TagGroup
          items={severityLevels}
          selectedIds={filters.severities}
          onChange={handleSeverityChange}
          title="Severity Levels"
        />
      </Grid>
    </Box>
  );
};

export default IncidentFilters;
