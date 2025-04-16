import React, { createContext, useContext, useState, ReactNode } from 'react';

// 添加静态数据
const staticData = {
  riskLevels: ['低', '中', '高', '极高'],
  industries: ['金融', '制造', '能源', '科技', '医疗']
  // 其他静态数据...
};

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  // 可以添加更多全局状态
  staticData: typeof staticData; // 添加静态数据到上下文
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return <AppContext.Provider value={{ theme, toggleTheme, staticData }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
