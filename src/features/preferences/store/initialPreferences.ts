import type { Preferences } from '../types/preferences';

export function generateApiKey() {
  return `sk_${crypto.randomUUID().replace(/-/g, '')}`;
}

export const initialPreferences: Preferences = {
  theme: 'light',
  accentColor: 'blue',
  compactMode: false,
  notificationsEnabled: true,
  sidebarCollapsed: false,
  displayName: '',
  apiKey: generateApiKey(),
};
