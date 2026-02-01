import { useCallback, useRef, useState } from 'react';
import { PreferencesPanel } from '../features/preferences/components/PreferencesPanel';
import { ThemeSync } from '../features/preferences/components/ThemeSync';
import { PreviewArea } from '../features/preview/PreviewArea';
import { SkipLink } from '../shared/components/SkipLink';
import { AppHeader } from '../shared/components/AppHeader';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from '../components/ui/sidebar';
import { usePreferencesStore } from '../features/preferences/store/preferencesStore';
import { useKeyboardShortcut } from '../shared/hooks/useKeyboardShortcut';
import { Announcer } from '../shared/components/Announcer';

export function AppLayout() {
  const sidebarCollapsed = usePreferencesStore(
    (state) => state.preferences.sidebarCollapsed
  );
  const updatePreference = usePreferencesStore(
    (state) => state.updatePreference
  );
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const [announceMessage, setAnnounceMessage] = useState('');

  const toggleSidebar = useCallback(() => {
    const willExpand = sidebarCollapsed;
    updatePreference('sidebarCollapsed', !sidebarCollapsed);
    if (willExpand) {
      setAnnounceMessage(
        'Settings panel opened. Use Ctrl+B or Cmd+B to toggle.'
      );
      setTimeout(() => setAnnounceMessage(''), 1000);
    } else {
      requestAnimationFrame(() => expandButtonRef.current?.focus());
    }
  }, [sidebarCollapsed, updatePreference]);

  useKeyboardShortcut('b', 'mod', toggleSidebar);

  const handleExpand = useCallback(() => {
    updatePreference('sidebarCollapsed', false);
    setAnnounceMessage(
      'Settings panel opened. Use Ctrl+B or Cmd+B to toggle.'
    );
    setTimeout(() => setAnnounceMessage(''), 1000);
    requestAnimationFrame(() => {
      firstFocusableRef.current?.focus();
    });
  }, [updatePreference]);

  return (
    <>
      <ThemeSync />
      <SkipLink />
      <Announcer message={announceMessage} />
      <SidebarProvider collapsed={sidebarCollapsed}>
        {!sidebarCollapsed && (
          <Sidebar collapsible="none" aria-label="Settings">
            <PreferencesPanel
              closeButtonRef={firstFocusableRef}
              onClose={() => {
                updatePreference('sidebarCollapsed', true);
                requestAnimationFrame(() => expandButtonRef.current?.focus());
              }}
            />
          </Sidebar>
        )}
        <SidebarInset id="main-content" tabIndex={-1} className="flex flex-col">
          <AppHeader
            sidebarCollapsed={sidebarCollapsed}
            onOpenSettings={handleExpand}
            settingsButtonRef={expandButtonRef}
          />
          <PreviewArea />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
