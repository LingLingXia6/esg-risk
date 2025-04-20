import React, { createContext, useContext, useState, ReactNode } from 'react';

// 定义主题样式
interface ThemeStyles {
  backgroundColor: string;
  cardBackground: string;
  textColor: string;
  titleColor: string;
  borderColor: string;
  accentColor: string;
}

// 主题样式配置
const themeStyles: Record<'light' | 'dark', ThemeStyles> = {
  light: {
    backgroundColor: '#ffffff',
    cardBackground: '#f8f9fa',
    textColor: '#333333',
    titleColor: '#1a202c',
    borderColor: '#e2e8f0',
    accentColor: '#3182ce'
  },
  dark: {
    backgroundColor: '#1a202c',
    cardBackground: 'rgba(26, 32, 44, 0.8)',
    textColor: '#e2e8f0',
    titleColor: '#ffffff',
    borderColor: '#2d3748',
    accentColor: '#63b3ed'
  }
};

// 添加静态数据
const staticData = {
  riskLevels: ['低', '中', '高', '极高'],
  industries: ['金融', '制造', '能源', '科技', '医疗']
  // 其他静态数据...
};

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  styles: ThemeStyles;
  staticData: typeof staticData;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // 获取当前主题的样式
  const styles = themeStyles[theme];

  return <AppContext.Provider value={{ theme, toggleTheme, styles, staticData }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
