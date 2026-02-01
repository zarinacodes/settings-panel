import { useEffect } from 'react';
import { usePreferencesStore } from '../store/preferencesStore';

export function ThemeSync() {
  const { theme, accentColor } = usePreferencesStore(
    (state) => state.preferences
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.accent = accentColor;
  }, [theme, accentColor]);

  return null;
}
