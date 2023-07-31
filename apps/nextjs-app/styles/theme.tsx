import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import createPersistedState from 'use-persisted-state';

export const lightTheme = {
  background: '#FFF',
  borderColor: '#000',
  fontColor: '#000',
};

export type CustomTheme = typeof lightTheme;

export const darkTheme: CustomTheme = {
  background: '#000',
  borderColor: '#bababa',
  fontColor: '#bababa',
};

export type ThemeMode = 'light' | 'dark';

const useThemeModeState = createPersistedState<ThemeMode>('theme-mode');
export const useThemeMode = () => {
  const initialSetting: ThemeMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  return useThemeModeState(initialSetting);
};

export const ThemeModeProvider = ({ children }: PropsWithChildren) => {
  const [themeMode] = useThemeMode();

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <>{children}</>
    </ThemeProvider>
  );
};
