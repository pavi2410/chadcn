import { persistentAtom } from '@nanostores/persistent';

export type Theme = 'light' | 'dark' | 'system';

// Create a persistent store for the theme
export const themeStore = persistentAtom<Theme>(
  'ui-theme', // storage key
  'system',   // default value
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

// Helper function to get the effective theme (resolving 'system' to actual theme)
export function getEffectiveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

// Helper function to apply theme to document
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  const effectiveTheme = getEffectiveTheme(theme);
  
  root.classList.remove('light', 'dark');
  root.classList.add(effectiveTheme);
}

// Set up system theme change listener
export function setupThemeListener(): () => void {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = () => {
    const currentTheme = themeStore.get();
    if (currentTheme === 'system') {
      applyTheme('system');
    }
  };
  
  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
}
