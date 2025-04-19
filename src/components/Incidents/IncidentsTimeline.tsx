import React, { useState, useMemo } from 'react';
import { Incident } from '@/types/incidents';
import { Timeline } from '../common/Timeline/Timeline';
import styles from './IncidentsTimeline.module.scss';
import IncidentDetail from './IncidentDetail';
import IncidentFilters from './IncidentFilters';
import { Box, Heading, Text, Flex, Badge, Center, useColorModeValue } from '@chakra-ui/react';

interface IncidentsTimelineProps {
  incidents: Incident[];
  severityLevels: {
    id: string;
    name: string;
    description: string;
    color: string;
  }[];
  esgCategories: {
    id: string;
    name: string;
    description: string;
    color: string;
    subcategories: { id: string; name: string }[];
  }[];
}

const IncidentsTimeline: React.FC<IncidentsTimelineProps> = ({ incidents, severityLevels, esgCategories }) => {
  // 状态管理
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    categories: [] as string[],
    severities: [] as string[]
  });

  // 获取严重程度对应的颜色
  const getSeverityColor = (severity: string): string => {
    const level = severityLevels.find(level => level.id === severity);
    return level ? level.color : '#999999';
  };

  // 获取ESG类别对应的颜色
  const getCategoryColor = (category: string): string => {
    const cat = esgCategories.find(cat => cat.id === category);
    return cat ? cat.color : '#999999';
  };

  // 获取ESG类别名称
  const getCategoryName = (category: string): string => {
    const cat = esgCategories.find(cat => cat.id === category);
    return cat ? cat.name : category;
  };

  // 筛选事件
  const filteredIncidents = useMemo(() => {
    return incidents.filter(incident => {
      // 日期筛选
      const incidentDate = new Date(incident.date);
      const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
      const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : null;

      if (startDate && incidentDate < startDate) return false;
      if (endDate && incidentDate > endDate) return false;

      // 类别筛选
      if (filters.categories.length > 0 && !filters.categories.includes(incident.category)) {
        return false;
      }

      // 严重程度筛选
      if (filters.severities.length > 0 && !filters.severities.includes(incident.severity)) {
        return false;
      }

      return true;
    });
  }, [incidents, filters]);

  // 按日期排序
  const sortedIncidents = useMemo(() => {
    return [...filteredIncidents].sort((a, b) => {
      // 确保日期格式正确并进行比较
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      // 检查日期是否有效
      if (isNaN(dateA) || isNaN(dateB)) {
        console.warn('无效的日期格式:', a.date, b.date);
        return 0;
      }

      // 降序排列（最新的事件在前）
      return dateB - dateA;
    });
  }, [filteredIncidents]);

  // 处理事件点击
  const handleIncidentClick = (incident: Incident) => {
    setSelectedIncident(incident);
  };

  // 格式化日期
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // 背景和边框颜色
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const timelineBg = useColorModeValue('gray.50', 'gray.900');

  // 渲染单个事件项
  const renderIncident = (incident: Incident) => (
    <Box
      bg={bgColor}
      p={4}
      borderRadius="md"
      boxShadow="sm"
      cursor="pointer"
      borderWidth="1px"
      borderColor={borderColor}
      _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }}
      transition="all 0.2s"
      onClick={() => handleIncidentClick(incident)}
      className={styles.timelineContent}
    >
      <Flex justify="space-between" align="center" mb={2}>
        <Heading as="h3" size="md" color="black">
          {incident.title}
        </Heading>
        <Flex gap={2}>
          <Badge
            colorScheme={
              incident.category === 'environmental' ? 'green' : incident.category === 'social' ? 'blue' : 'purple'
            }
            px={2}
            py={1}
            borderRadius="full"
          >
            {getCategoryName(incident.category)}
          </Badge>
          <Badge
            colorScheme={
              incident.severity === 'critical'
                ? 'red'
                : incident.severity === 'high'
                ? 'orange'
                : incident.severity === 'medium'
                ? 'yellow'
                : 'green'
            }
            px={2}
            py={1}
            borderRadius="full"
          >
            {incident.severity}
          </Badge>
        </Flex>
      </Flex>
      <Text mb={2} color="gray.600">
        {incident.description}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {incident.location}
      </Text>
    </Box>
  );

  return (
    <Box className={styles.container}>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        ESG Event Timeline
      </Heading>

      <IncidentFilters
        filters={filters}
        setFilters={setFilters}
        esgCategories={esgCategories}
        severityLevels={severityLevels}
      />

      <Box bg={timelineBg} borderRadius="lg" p={5} boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
        {sortedIncidents.length === 0 ? (
          <Center py={10}>
            <Text color="gray.500">No events match the filter criteria</Text>
          </Center>
        ) : (
          <Timeline
            items={sortedIncidents.map(incident => ({
              ...incident,
              dotBorderColor: getSeverityColor(incident.severity)
            }))}
            renderItem={renderIncident}
            renderDate={formatDate}
          />
        )}
      </Box>

      <IncidentDetail
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        getCategoryColor={getCategoryColor}
        getCategoryName={getCategoryName}
        isOpen={selectedIncident !== null}
      />
    </Box>
  );
};

export default IncidentsTimeline;
