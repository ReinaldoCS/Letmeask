import { createContext, ReactNode, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
  children: ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');
  const [isDark, setIsDark] = useState<boolean>(false);

  // function toggleTheme() {
  //   setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  //   setIsDark(!isDark);
  // }

  function toggleTheme(): void {
    const newMode = !isDark;
    document.documentElement.className = newMode ? `dark` : ``;
    setIsDark(!isDark);
    localStorage.setItem(`theme`, newMode ? `dark` : `light`);

    toast(`Bem vindo ao ${!isDark ? 'dark' : 'light'} mod!`, {
      icon: `${!isDark ? '🌚' : '🌞'}`,
      style: {
        borderRadius: '10px',
        background: `${!isDark ? '#333' : '#FFF'}`,
        color: `${!isDark ? '#fff' : '#333'}`,
      },
    });
  }

  useEffect(() => {
    if (window) {
      const storageMode = window.localStorage.getItem(`theme`) === `dark`;

      if (storageMode) {
        setCurrentTheme(
          window.localStorage.getItem(`theme`) === `dark` ? 'dark' : 'light',
        );
        setIsDark(window.localStorage.getItem(`theme`) === `dark`);
        document.documentElement.className = storageMode ? `dark` : ``;
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, isDark, toggleTheme }}>
      {/* <ThemeContext.Provider value={{ isDark, toggleTheme }}> */}
      {props.children}
    </ThemeContext.Provider>
  );
}
