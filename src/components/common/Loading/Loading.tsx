import React from 'react';
import { Spinner, Flex, Text, FlexProps } from '@chakra-ui/react';
import styles from './Loading.module.scss';

interface LoadingProps extends FlexProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Loading: React.FC<LoadingProps> = ({ text = '加载中...', size = 'md', ...rest }) => {
  return (
    <Flex direction="column" align="center" justify="center" className={styles.container} {...rest}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size={size}
        className={styles.spinner}
      />
      {text && (
        <Text mt={4} color="gray.600" fontSize="md">
          {text}
        </Text>
      )}
    </Flex>
  );
};

export default Loading;
