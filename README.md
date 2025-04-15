# ESG Risk 项目

这是一个基于 Next.js 的现代化 React 应用，用于 ESG 风险评估和管理。

## 项目特点

- 基于 Next.js 的 SSR/CSR 混合渲染
- TypeScript 强类型支持
- Chakra UI 组件库
- React Query 数据获取与缓存
- 完整的测试支持
- Docker 容器化部署

## 快速开始

### 环境要求

- Node.js 16+
- pnpm 8+

### 安装依赖

```bash
# 安装 pnpm (如果尚未安装)
npm install pnpm -g

# 安装项目依赖
pnpm install
```

### 开发模式开发

```
pnpm run start
```

### 构建生产版本

```bash
pnpm run build
```

## 项目架构

### 技术栈 类别 技术 说明 前端框架

Next.js (基于 React)

支持 SSR / ISR / CSR，适合构建高性能 Web 应用 语言

TypeScript

强类型、增强可维护性和开发效率 UI 框架

Chakra UI

支持可访问性（a11y），组件风格现代、开发体验佳 状态管理

React Context

管理全局状态（如用户信息、主题设置等） 数据获取

React Query

管理异步请求（含缓存、加载、错误状态） API 调用

Axios

封装 HTTP 请求，与 React Query 集成 测试

Jest + React Testing Library

单元测试和组件测试 样式方案

Chakra UI + SCSS Module

组件样式与全局样式分离

```
/src
  /components  - 可复用的组件
  /contexts    - React Context 上下文
  /layouts     - 页面布局组件
  /pages       - 页面组件和路由
  /services    - API 服务和数据获取
  /styles      - 全局样式
```

### 核心功能实现

#### 应用入口

\_app.tsx 作为应用入口，负责：

#### - 初始化 React Query 客户端

- 提供 Chakra UI 主题
- 处理页面布局
- 设置页面元数据
  状态管理

使用 React Context API 实现全局状态管理：

- AppContext 提供主题切换等功能
- 自定义 Hook useApp() 简化状态访问 API 服务
  使用 Axios 封装 API 调用：
- 统一的请求配置
- 请求和响应拦截器
- 错误处理 路由系统
  遵循 Next.js 的约定式路由：
- 文件系统路由
- 动态路由支持
- 布局系统

## 开发规范

- 使用 ESLint 和 Prettier 进行代码格式化
- 使用 husky 和 lint-staged 在提交前检查代码
- 遵循组件化开发原则
- 编写单元测试确保代码质量
