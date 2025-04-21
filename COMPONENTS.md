````markdown:/Users/xialingling/work/esg-risk/COMPONENTS.md
# 组件库使用说明

本文件记录了 `src/components` 目录下主要组件的用途、用法示例及参数说明。

---

## 1. IncidentsTimeline

**用途**：展示事件的时间轴。

**用法示例**：
```tsx
import IncidentsTimeline from '@/components/Incidents/IncidentsTimeline';

<IncidentsTimeline
  incidents={incidents}
  severityLevels={severityLevels}
  esgCategories={esgCategories}
/>
````

**参数说明**：

| 参数名         | 类型  | 说明         |
| -------------- | ----- | ------------ |
| incidents      | array | 事件数据数组 |
| severityLevels | array | 严重等级数组 |
| esgCategories  | array | ESG 类别数组 |

---

## 2. RiskScoreOverall

**用途**：展示整体风险分数及各分类分数。

**用法示例**：

```tsx
import RiskScoreOverall from '@/components/RiskScore/RiskScoreOverall';

<RiskScoreOverall data={riskData} />;
```

**参数说明**：

| 参数名 | 类型   | 说明                   |
| ------ | ------ | ---------------------- |
| data   | object | 风险总览及分类分数数据 |

---

## 3. ESGCategoriesDetail

**用途**：详细展示 ESG 各类别的分数、趋势和描述。

**用法示例**：

```tsx
import ESGCategoriesDetail from '@/components/ESGCategories/ESGCategoriesDetail';

<ESGCategoriesDetail categories={categories} esgCategoriesData={esgCategoriesData} />;
```

**参数说明**：

| 参数名            | 类型   | 说明             |
| ----------------- | ------ | ---------------- |
| categories        | object | 各类别分数对象   |
| esgCategoriesData | array  | 类别详细信息数组 |

---

## 4. RiskScoreHistory

**用途**：展示风险分数的历史趋势（如折线图）。

**用法示例**：

```tsx
import RiskScoreHistory from '@/components/RiskHistory/RiskScoreHistory';

<RiskScoreHistory data={historyData} interval="monthly" />;
```

**参数说明**：

| 参数名   | 类型   | 说明         |
| -------- | ------ | ------------ |
| data     | array  | 历史分数数组 |
| interval | string | 时间间隔     |

---

## 5. TagGroup

**用途**：标签选择组件，支持多选。

**用法示例**：

```tsx
import { TagGroup } from '@/components/common/TagGroup/TagGroup';

<TagGroup items={items} selectedIds={selectedIds} onChange={handleChange} title="标签组" />;
```

**参数说明**：

| 参数名      | 类型     | 说明                             |
| ----------- | -------- | -------------------------------- |
| items       | array    | 标签项数组（含 id、name、color） |
| selectedIds | string[] | 已选中的标签 id 数组             |
| onChange    | function | 标签选择变化回调                 |
| title       | string   | 可选，标签组标题                 |

---

## 6. Timeline

**用途**：通用时间轴组件，支持自定义内容和日期格式。

**用法示例**：

```tsx
import { Timeline } from '@/components/common/Timeline/Timeline';

<Timeline items={items} renderItem={item => <div>{item.content}</div>} renderDate={date => date} />;
```

**参数说明**：

| 参数名     | 类型     | 说明             |
| ---------- | -------- | ---------------- |
| items      | array    | 时间轴项数组     |
| renderItem | function | 自定义渲染每个项 |
| renderDate | function | 自定义日期格式   |

---

## 7. Loading

**用途**：加载状态组件。

**用法示例**：

```tsx
import Loading from '@/components/common/Loading/Loading';

<Loading text="正在加载..." />;
```

**参数说明**：

| 参数名 | 类型   | 说明           |
| ------ | ------ | -------------- |
| text   | string | 可选，加载文本 |

---

## 8. Error

**用途**：错误提示组件。

**用法示例**：

```tsx
import Error from '@/components/common/Error/Error';

<Error message="加载失败" onRetry={handleRetry} />;
```

**参数说明**：

| 参数名  | 类型     | 说明                   |
| ------- | -------- | ---------------------- |
| message | string   | 可选，自定义错误信息   |
| onRetry | function | 可选，点击重试按钮回调 |

---
