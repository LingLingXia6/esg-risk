import React from 'react';
import { Box, Text, Button, Flex, BoxProps, Icon } from '@chakra-ui/react';
import styles from './Error.module.scss';

interface ErrorProps extends BoxProps {
  message?: string;
  onRetry?: () => void;
}

const Error: React.FC<ErrorProps> = ({ message = '加载数据时出错，请稍后重试', onRetry, ...rest }) => {
  return (
    <Box className={styles.container} {...rest}>
      <Flex align="center" mb={4}>
        {/* 使用内联 SVG 替代 WarningIcon */}
        <Icon viewBox="0 0 24 24" color="red.500" boxSize={6} mr={2}>
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
          />
        </Icon>
        <Text fontWeight="bold" fontSize="lg" color="red.500">
          出错了
        </Text>
      </Flex>

      <Text color="gray.700" mb={onRetry ? 4 : 0}>
        {message}
      </Text>

      {onRetry && (
        <Button mt={2} colorScheme="blue" onClick={onRetry} size="sm">
          重试
        </Button>
      )}
    </Box>
  );
};

export default Error;
