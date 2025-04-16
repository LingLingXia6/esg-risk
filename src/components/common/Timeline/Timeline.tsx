import React from 'react';
import { Box, VStack } from '@chakra-ui/react';

/**
 * Timeline 组件
 *
 * 一个通用的时间轴组件，用于展示按时间顺序排列的事件列表。
 * 支持自定义渲染事件内容和日期格式，可以通过属性控制时间轴样式。
 *
 * @example
 * ```tsx
 * <Timeline
 *   items={events}
 *   renderItem={(event) => <EventCard {...event} />}
 *   renderDate={(date) => formatDate(date)}
 * />
 * ```
 *
 * @component
 */

/**
 * 时间轴项目的基础接口
 *
 * @interface TimelineItem
 * @property {string} id - 项目的唯一标识符
 * @property {string} date - 项目的日期，可以是任何有效的日期字符串
 * @property {string} [dotColor] - 可选，时间轴圆点的背景颜色
 * @property {string} [dotBorderColor] - 可选，时间轴圆点的边框颜色
 */
export interface TimelineItem {
  id: string;
  date: string;
  dotColor?: string;
  dotBorderColor?: string;
}

/**
 * Timeline 组件的属性接口
 *
 * @interface TimelineProps
 * @template T - 继承自 TimelineItem 的类型
 * @property {T[]} items - 要显示的项目数组
 * @property {(item: T) => React.ReactNode} renderItem - 自定义渲染每个项目的函数
 * @property {(date: string) => string} renderDate - 自定义渲染日期的函数
 */
interface TimelineProps<T extends TimelineItem> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  renderDate: (date: string) => string;
}

/**
 * Timeline 组件的布局结构：
 *
 * |-日期-|--o--|----内容----|
 *        |     |
 * |-日期-|--o--|----内容----|
 *        |     |
 * |-日期-|--o--|----内容----|
 *        |     |
 *
 * - 左侧固定宽度显示日期
 * - 中间是垂直时间轴线和圆点标记
 * - 右侧是内容区域
 */
export function Timeline<T extends TimelineItem>({ items, renderItem, renderDate }: TimelineProps<T>) {
  return (
    <VStack spacing={4} align="stretch" position="relative">
      <Box position="absolute" left="100px" top="0" bottom="0" width="2px" bg="gray.200" zIndex={1} />

      {items.map(item => (
        <Box key={item.id} position="relative" ml="120px">
          <Box position="absolute" left="-120px" top="0" width="120px" height="100%">
            <Box
              position="absolute"
              left="0"
              top="0"
              fontWeight="bold"
              color="gray.500"
              fontSize="sm"
              width="80px"
              textAlign="right"
            >
              {renderDate(item.date)}
            </Box>
            <Box
              position="absolute"
              left="99px"
              top="0"
              transform="translateX(-50%)"
              w="16px"
              h="16px"
              borderRadius="full"
              bg="white"
              border="3px solid"
              borderColor={item.dotBorderColor || 'gray.200'}
              zIndex={2}
            />
          </Box>
          {renderItem(item)}
        </Box>
      ))}
    </VStack>
  );
}

/**
 * 样式说明：
 *
 * 1. 时间轴线
 *    - 位置：距左边 100px
 *    - 宽度：2px
 *    - 颜色：gray.200
 *
 * 2. 时间点
 *    - 大小：16x16px
 *    - 边框：3px
 *    - 背景：白色
 *    - 位置：相对于时间轴线居中
 *
 * 3. 日期文本
 *    - 宽度：80px
 *    - 对齐：右对齐
 *    - 样式：加粗，灰色
 *
 * 4. 内容区域
 *    - 左边距：120px
 *    - 布局：弹性布局，垂直方向
 */

/**
 * 使用注意事项：
 *
 * 1. items 数组需要按日期排序（组件本身不处理排序）
 * 2. 每个 item 必须有唯一的 id
 * 3. renderItem 函数需要返回有效的 React 节点
 * 4. renderDate 函数需要返回格式化后的日期字符串
 * 5. dotColor 和 dotBorderColor 可选，默认使用主题颜色
 */
