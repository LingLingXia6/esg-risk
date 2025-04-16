import React from 'react';
import { Incident } from '@/types/incidents';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
  Text,
  Heading,
  Badge,
  Divider,
  Grid,
  useColorModeValue
} from '@chakra-ui/react';

interface IncidentDetailProps {
  incident: Incident | null; // 修改为可能为 null
  onClose: () => void;
  getCategoryColor: (category: string) => string;
  getCategoryName: (category: string) => string;
  isOpen: boolean; // 添加 isOpen 属性
}

const IncidentDetail: React.FC<IncidentDetailProps> = ({
  incident,
  onClose,
  getCategoryColor,
  getCategoryName,
  isOpen
}) => {
  // 格式化日期
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // 格式化风险评分影响（正数添加+号，负数保持-号）
  const formatImpact = (value: number): string => {
    return value > 0 ? `+${value.toFixed(1)}` : value.toFixed(1);
  };

  // 设置背景色
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // 如果没有选中的事件，仍然渲染 Modal 但保持关闭状态
  if (!incident) {
    return (
      <Modal isOpen={false} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent />
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent bg={bgColor} borderRadius="md" boxShadow="xl" maxW="800px">
        <ModalCloseButton size="lg" />

        <ModalHeader p={6} borderBottom="1px solid" borderColor={borderColor}>
          <Heading as="h2" size="lg" mb={3}>
            {incident.title}
          </Heading>
          <Flex gap={3} flexWrap="wrap">
            <Badge px={3} py={1} borderRadius="full" bg={getCategoryColor(incident.category)} color="white">
              {getCategoryName(incident.category)}
            </Badge>
            <Badge
              px={3}
              py={1}
              borderRadius="full"
              colorScheme={
                incident.severity === 'critical'
                  ? 'red'
                  : incident.severity === 'high'
                  ? 'orange'
                  : incident.severity === 'medium'
                  ? 'yellow'
                  : 'green'
              }
            >
              {incident.severity}
            </Badge>
            <Text fontSize="sm" color="gray.500">
              {formatDate(incident.date)}
            </Text>
          </Flex>
        </ModalHeader>

        <ModalBody p={6}>
          <Box mb={4}>
            <Text fontWeight="bold" display="inline">
              Location:{' '}
            </Text>{' '}
            {incident.location}
          </Box>

          <Box mb={6}>
            <Text whiteSpace="pre-line">{incident.detailedDescription}</Text>
          </Box>

          <Box mb={6}>
            <Heading as="h3" size="md" mb={3}>
              Risk Score Impact
            </Heading>
            <Divider mb={4} />
            <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
              <Box p={3} borderRadius="md" borderLeft="4px solid" borderColor="gray.400" bg="gray.50">
                <Text fontSize="sm" color="gray.600">
                  Overall
                </Text>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color={incident.riskScoreImpact.overall < 0 ? 'green.500' : 'red.500'}
                >
                  {formatImpact(incident.riskScoreImpact.overall)}
                </Text>
              </Box>

              {Object.entries(incident.riskScoreImpact)
                .filter(([key]) => key !== 'overall')
                .map(([category, value]) => (
                  <Box
                    key={category}
                    p={3}
                    borderRadius="md"
                    borderLeft="4px solid"
                    borderColor={getCategoryColor(category)}
                    bg="gray.50"
                  >
                    <Text fontSize="sm" color="gray.600">
                      {getCategoryName(category)}
                    </Text>
                    <Text fontSize="xl" fontWeight="bold" color={value < 0 ? 'green.500' : 'red.500'}>
                      {formatImpact(value)}
                    </Text>
                  </Box>
                ))}
            </Grid>
          </Box>

          {incident.sources && incident.sources.length > 0 && (
            <Box>
              <Heading as="h3" size="md" mb={3}>
                Information Sources
              </Heading>
              <Divider mb={4} />
              {incident.sources.map((source, index) => (
                <Box key={index} mb={2} p={2} borderRadius="md" _hover={{ bg: 'gray.50' }}>
                  <Text
                    as="a"
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="blue.500"
                    fontWeight="medium"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {source.title}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(source.publishDate).toLocaleDateString('zh-CN')}
                  </Text>
                </Box>
              ))}
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default IncidentDetail;
