/**
 * TagGroup 组件
 *
 * 一个可复用的标签组组件，用于展示和选择多个标签项。
 * 支持自定义标签颜色、选中状态和点击事件。
 *
 * @example
 * ```tsx
 * // 基础用法
 * const items = [
 *   { id: '1', name: '环境', color: '#2E7D32' },
 *   { id: '2', name: '社会', color: '#1976D2' },
 *   { id: '3', name: '治理', color: '#7B1FA2' }
 * ];
 *
 * const [selectedIds, setSelectedIds] = useState<string[]>([]);
 *
 * <TagGroup
 *   items={items}
 *   selectedIds={selectedIds}
 *   onChange={(id) => {
 *     // 处理标签选择
 *     const newSelected = selectedIds.includes(id)
 *       ? selectedIds.filter(i => i !== id)
 *       : [...selectedIds, id];
 *     setSelectedIds(newSelected);
 *   }}
 *   title="标签组"
 * />
 * ```
 *
 * @param props
 * @param props.items - 标签项数组，每项包含 id、name 和 color
 * @param props.selectedIds - 已选中的标签 ID 数组
 * @param props.onChange - 标签选择变化时的回调函数
 * @param props.title - 可选，标签组的标题
 */

import React from 'react';
import { Box, Flex, Tag, Text } from '@chakra-ui/react';

function hexToRgb(hex: string): string {
  const sanitized = hex.replace('#', '');
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`; // 返回 RGB 格式
}

interface TagItem {
  id: string;
  name: string;
  color: string;
}

interface TagGroupProps {
  items: TagItem[];
  selectedIds: string[];
  onChange: (id: string) => void;
  title?: string;
}

export const TagGroup: React.FC<TagGroupProps> = ({ items, selectedIds, onChange, title }) => {
  return (
    <Box>
      {title && (
        <Text fontWeight="500" fontSize="sm" color="gray.600" mb={3}>
          {title}
        </Text>
      )}
      <Flex wrap="wrap" gap="2">
        {items.map(item => {
          const isSelected = selectedIds.includes(item.id);
          const backgroundColor = isSelected
            ? `rgba(${hexToRgb(item.color)}, 0.1)` // 使用 RGBA 格式
            : 'rgb(247, 250, 252)'; // Chakra UI 默认灰色背景

          return (
            <Tag
              key={item.id}
              size="md"
              borderRadius="full"
              variant="subtle"
              colorScheme="gray"
              cursor="pointer"
              borderWidth="1px"
              borderColor={isSelected ? item.color : 'transparent'}
              bg={backgroundColor}
              color={isSelected ? item.color : 'gray.600'}
              onClick={() => onChange(item.id)}
              px={3}
              py={2}
              data-testid={`tag-${item.id}`} // 添加 data-testid 确保可以选中
            >
              <Box as="span" w="2" h="2" borderRadius="full" bg={item.color} mr="2" />
              {item.name}
            </Tag>
          );
        })}
      </Flex>
    </Box>
  );
};
