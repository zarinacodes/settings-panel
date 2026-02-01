export type Theme = 'light' | 'dark';

export type AccentColor = 'blue' | 'emerald' | 'violet' | 'amber';

export type Preferences = {
  theme: Theme;
  accentColor: AccentColor;
  compactMode: boolean;
  notificationsEnabled: boolean;
  sidebarCollapsed: boolean;
  displayName: string;
  apiKey: string;
};
