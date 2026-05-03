import { createContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export const STORAGE_KEY = 'workforce-dashboard-theme';

export type ThemeContextValue = {
  mode: ThemeMode;
  toggleMode: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
