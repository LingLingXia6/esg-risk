import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Flex, Badge, Divider, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import { getCriticalIncident, getSeverityLevel, getIncidents } from '@/services/riskScoreService';
import { Incident as IncidentType } from '@/types/incidents';
import { combinedIncident as CriticalIncident } from '@/types/criticalIncidents';
import { Severity as SeverityLevelDetail, CategoryKey, SeverityLevel } from '@/types/publicType';
import styles from './CriticalIncidents.module.scss';

const CriticalIncidents: React.FC = () => {
  const [incidents, setIncidents] = useState<CriticalIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCriticalIncidents = async () => {
    try {
      setLoading(true);
      const [criticalIncidentsData, severityLevelsData, incidentsData] = await Promise.all([
        getCriticalIncident(),
        getSeverityLevel(),
        getIncidents()
      ]);

      console.log('获取到的数据:', { criticalIncidentsData, severityLevelsData, incidentsData });

      const criticalIncidents = criticalIncidentsData.criticalIncidents; // 假设 criticalIncidentsData 没有 incidents 属性，直接使用 criticalIncidentsData 作为 incidents 数据

      const severityLevels = severityLevelsData.severityLevels;
      const incidents = incidentsData.incidents || [];
      console.log('incidents', incidents);

      const combinedIncidents = criticalIncidents?.map(incident => {
        const severityDetail = severityLevels.find((level: SeverityLevelDetail) => level.id === incident.severity);

        const matchedIncident = incidents.find((subIncident: IncidentType) => incident.id === subIncident.id);
        console.log('criticalIncidents', criticalIncidents);
        const sources = matchedIncident ? matchedIncident?.sources : [];
        console.log('sources', sources, 'matchedIncident', matchedIncident);
        return {
          ...incident,
          ...matchedIncident,
          severityLevel: severityDetail,
          // 确保 category 和 severity 符合类型要求
          category: incident.category as CategoryKey,
          severity: incident.severity as SeverityLevel,
          sources
        };
      });
      console.log('处理后的事件数据mactchIncident:');
      // 筛选过去30天内的事件
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const filteredIncidents = combinedIncidents.filter(incident => {
        const incidentDate = new Date(incident.date);
        return incidentDate >= thirtyDaysAgo && (incident.severity === 'critical' || incident.severity === 'high');
      });

      setIncidents(filteredIncidents);
    } catch (err) {
      setError('无法加载关键事件数据');
      console.error('Error fetching critical incidents:', err);
    } finally {
      setLoading(false);
    }
  };

  // 获取关键事件数据
  useEffect(() => {
    fetchCriticalIncidents();
  }, []);

  // 获取类别对应的颜色
  const getCategoryColor = (category: CategoryKey) => {
    switch (category) {
      case 'environmental':
        return 'green';
      case 'social':
        return 'blue';
      case 'governance':
        return 'purple';
      default:
        return 'gray';
    }
  };

  // 获取严重程度对应的颜色 - 优先使用severityLevel中的color
  const getSeverityColor = (incident: CriticalIncident) => {
    if (incident.severityLevel?.color) {
      // 如果color是十六进制颜色代码，需要转换为Chakra UI的颜色名称
      // 这里简化处理，假设severityLevel.color已经是Chakra UI颜色名称
      return incident.severityLevel.color.replace('#', '');
    }

    // 回退到原来的逻辑
    switch (incident.severity) {
      case 'critical':
        return 'red';
      case 'high':
        return 'orange';
      default:
        return 'yellow';
    }
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // 背景和边框颜色
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  if (loading) {
    return (
      <Box className={styles['loading-container']}>
        <Text>加载关键事件中...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={styles['error-container']}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box className={styles['critical-incidents-container']}>
      <Heading as="h2" size="lg" mb={4} className={styles['section-title']}>
        关键风险事件
      </Heading>
      <Text mb={6} color="gray.600">
        过去30天内发生的高风险事件，这些事件对公司ESG风险评分有显著影响。
      </Text>

      {incidents.length === 0 ? (
        <Box p={6} textAlign="center" bg={bgColor} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
          <Text color="gray.500">过去30天内没有关键风险事件</Text>
        </Box>
      ) : (
        <VStack spacing={4} align="stretch">
          {incidents.map(incident => (
            <Box
              key={incident.id}
              p={5}
              bg={bgColor}
              borderRadius="md"
              borderWidth="1px"
              borderColor={borderColor}
              boxShadow="sm"
              className={styles['incident-card']}
            >
              <Flex justify="space-between" align="flex-start" mb={3}>
                <Heading as="h3" size="md" mb={2}>
                  {incident.title}
                </Heading>
                <HStack spacing={2}>
                  <Badge colorScheme={getCategoryColor(incident.category)} borderRadius="full" px={2} py={1}>
                    {incident.categoryDetail?.name || incident.category}
                  </Badge>
                  <Badge colorScheme={getSeverityColor(incident)} borderRadius="full" px={2} py={1}>
                    {incident.severityLevel?.name || incident.severity}
                  </Badge>
                </HStack>
              </Flex>
              <Text color="gray.500" fontSize="sm" mb={3}>
                {formatDate(incident.date)} · {incident.location}
              </Text>
              <Text mb={4}>{incident.description}</Text>
              <Divider mb={4} />
              <Box>
                <Text fontWeight="medium" mb={2}>
                  风险影响:
                </Text>
                <HStack spacing={4} mb={2}>
                  <Box>
                    <Text fontSize="sm" color="gray.500">
                      总体影响
                    </Text>
                    <Text
                      fontWeight="bold"
                      color={
                        typeof incident.riskScoreImpact === 'number'
                          ? incident.riskScoreImpact > 5
                            ? 'red.500'
                            : 'orange.500'
                          : incident.riskScoreImpact.overall > 5
                          ? 'red.500'
                          : 'orange.500'
                      }
                    >
                      +
                      {typeof incident.riskScoreImpact === 'number'
                        ? incident.riskScoreImpact.toFixed(1)
                        : incident.riskScoreImpact.overall.toFixed(1)}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">
                      环境
                    </Text>
                    <Text fontWeight="bold" color="green.500">
                      +
                      {typeof incident.riskScoreImpact === 'number'
                        ? (incident.riskScoreImpact * 0.8).toFixed(1)
                        : incident.riskScoreImpact.environmental.toFixed(1)}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">
                      社会
                    </Text>
                    <Text fontWeight="bold" color="blue.500">
                      +
                      {typeof incident.riskScoreImpact === 'number'
                        ? (incident.riskScoreImpact * 0.6).toFixed(1)
                        : incident.riskScoreImpact.social.toFixed(1)}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">
                      治理
                    </Text>
                    <Text fontWeight="bold" color="purple.500">
                      +
                      {typeof incident.riskScoreImpact === 'number'
                        ? (incident.riskScoreImpact * 0.7).toFixed(1)
                        : incident.riskScoreImpact.governance.toFixed(1)}
                    </Text>
                  </Box>
                </HStack>
              </Box>
              {incident.summary && (
                <>
                  <Divider my={4} />
                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      事件总结:
                    </Text>
                    <Text>{incident.summary}</Text>
                  </Box>
                </>
              )}
              {/* 添加信息来源部分 */}
              {incident.sources && incident.sources.length > 0 && (
                <>
                  <Divider my={4} />
                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      信息来源:
                    </Text>
                    <VStack align="stretch" spacing={2}>
                      {incident.sources.map((source, index) => (
                        <Box key={index}>
                          <Text as="a" href={source.url} color="blue.500" target="_blank" rel="noopener noreferrer">
                            {source.title}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            发布于: {formatDate(source.publishDate)}
                          </Text>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                </>
              )}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default CriticalIncidents;
