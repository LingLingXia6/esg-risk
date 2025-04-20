import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define theme styles interface
export interface ThemeStyles {
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  titleColor: string;
  contentBg: string;
  dashboardBg: string;
  tabActiveBg: string;
  tabActiveColor: string;
}

// Define theme styles
const themeStyles: Record<'light' | 'dark', ThemeStyles> = {
  light: {
    cardBg: '#ffffff',
    cardBorder: '1px solid #e0e0e0',
    cardShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    titleColor: '#333333',
    contentBg: '#f7f4ef',
    dashboardBg: '#f5f5f5',
    tabActiveBg: 'rgba(0, 120, 212, 0.1)',
    tabActiveColor: '#0078d4'
  },
  dark: {
    cardBg: '#faf8f5',
    cardBorder: '1px solid rgba(56, 189, 248, 0.1)',
    cardShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    titleColor: '#f8fafc',
    contentBg: 'rgba(30, 41, 59, 0.6)',
    dashboardBg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    tabActiveBg: 'rgba(56, 189, 248, 0.15)',
    tabActiveColor: '#38bdf8'
  }
};

// Default theme
const defaultTheme: ThemeContextType = {
  currentTheme: 'dark',
  toggleTheme: () => {},
  styles: themeStyles.dark
};

interface ThemeContextType {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  styles: ThemeStyles;
}

const ThemeContext = createContext<ThemeContextType>(defaultTheme);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark'); // Default to dark theme

  const toggleTheme = () => {
    setCurrentTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Get current theme styles
  const styles = themeStyles[currentTheme];

  return <ThemeContext.Provider value={{ currentTheme, toggleTheme, styles }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
