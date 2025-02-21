declare module 'next-themes' {
    import { ReactNode } from 'react';
  
    export interface ThemeProviderProps {
      children: ReactNode;
      defaultTheme?: string;
      enableSystem?: boolean;
    }
  
    export const ThemeProvider: React.FC<ThemeProviderProps>;
    export const useTheme: () => {
      theme: string;
      setTheme: (theme: string) => void;
      resolvedTheme: string;
    };
  } 