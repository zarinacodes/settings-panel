import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Preferences } from '../types/preferences';
import { generateApiKey, initialPreferences } from './initialPreferences';

type PreferencesState = {
  preferences: Preferences;
  _hasHydrated: boolean;
};

type PreferencesActions = {
  updatePreference: <K extends keyof Preferences>(
    key: K,
    value: Preferences[K]
  ) => void;
  resetPreferences: () => void;
  regenerateApiKey: () => void;
  setHasHydrated: (state: boolean) => void;
};

export const usePreferencesStore = create<
  PreferencesState & PreferencesActions
>()(
  persist(
    (set) => ({
      preferences: initialPreferences,
      _hasHydrated: false,

      updatePreference: (key, value) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            [key]: value,
          },
        })),

      resetPreferences: () =>
        set({
          preferences: {
            ...initialPreferences,
            apiKey: generateApiKey(),
          },
        }),

      regenerateApiKey: () =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            apiKey: generateApiKey(),
          },
        })),

      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'user-preferences',
      version: 5,
      partialize: (state) => ({ preferences: state.preferences }),
      onRehydrateStorage: () => () => {
        usePreferencesStore.getState().setHasHydrated(true);
      },
      migrate: (persisted: unknown) => {
        const raw = persisted as { preferences?: Record<string, unknown> };
        const prefs = raw?.preferences ?? {};
        const { emailDigest: _emailDigest, ...rest } = prefs as Record<
          string,
          unknown
        >;
        void _emailDigest;
        return {
          preferences: {
            ...initialPreferences,
            ...rest,
            accentColor: rest.accentColor ?? 'blue',
            sidebarCollapsed: rest.sidebarCollapsed ?? false,
            displayName: rest.displayName ?? '',
            apiKey: rest.apiKey ?? generateApiKey(),
          },
        };
      },
    }
  )
);
