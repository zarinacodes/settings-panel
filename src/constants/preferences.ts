import type { AccentColor } from '@/features/preferences/types/preferences';

export const ACCENT_COLORS: readonly AccentColor[] = [
  'blue',
  'emerald',
  'violet',
  'amber',
];

export const KEYBOARD_SHORTCUTS = [
  { keys: ['⌘', 'B'], action: 'Toggle sidebar' },
  { keys: ['Tab'], action: 'Navigate' },
] as const;
