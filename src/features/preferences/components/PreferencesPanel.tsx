import { PanelLeftClose } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { ACCENT_COLORS } from '@/constants';
import { usePreferencesStore } from '../store/preferencesStore';
import { ApiKeySection } from './ApiKeySection';
import { KeyboardShortcuts } from './KeyboardShortcuts';

type PreferencesPanelProps = {
  closeButtonRef?: React.RefObject<HTMLButtonElement | null>;
  onClose?: () => void;
};

export function PreferencesPanel({
  closeButtonRef,
  onClose,
}: PreferencesPanelProps) {
  const preferences = usePreferencesStore((state) => state.preferences);
  const updatePreference = usePreferencesStore(
    (state) => state.updatePreference
  );

  return (
    <>
      <SidebarHeader>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-tight text-sidebar-foreground truncate">
            Settings
          </h2>
          <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
            Account & preferences
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel id="profile-label">Profile</SidebarGroupLabel>
          <SidebarGroupContent
            className="flex flex-col gap-1.5"
            role="group"
            aria-labelledby="profile-label"
          >
            <Label
              htmlFor="display-name"
              className="text-[10px] text-muted-foreground"
            >
              Display name
            </Label>
            <input
              id="display-name"
              type="text"
              value={preferences.displayName}
              onChange={(e) => updatePreference('displayName', e.target.value)}
              placeholder="Enter your name"
              maxLength={32}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
            />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel id="appearance-label">
            Appearance
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-3">
            <div role="group" aria-labelledby="theme-label">
              <Label
                id="theme-label"
                className="text-[10px] text-muted-foreground block mb-1.5"
              >
                Theme
              </Label>
              <RadioGroup
                value={preferences.theme}
                onValueChange={(value) => {
                  if (value === 'light' || value === 'dark') {
                    updatePreference('theme', value);
                  }
                }}
                className="flex gap-3"
                aria-labelledby="theme-label"
              >
                <div className="flex items-center gap-1.5">
                  <RadioGroupItem value="light" id="theme-light" />
                  <Label
                    htmlFor="theme-light"
                    className="cursor-pointer font-normal text-xs"
                  >
                    Light
                  </Label>
                </div>
                <div className="flex items-center gap-1.5">
                  <RadioGroupItem value="dark" id="theme-dark" />
                  <Label
                    htmlFor="theme-dark"
                    className="cursor-pointer font-normal text-xs"
                  >
                    Dark
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div role="group" aria-labelledby="accent-label">
              <Label
                id="accent-label"
                className="text-[10px] text-muted-foreground block mb-1.5"
              >
                Accent
              </Label>
              <div
                className="grid grid-cols-2 gap-1.5"
                role="group"
                aria-labelledby="accent-label"
              >
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => updatePreference('accentColor', color)}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-medium capitalize transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      preferences.accentColor === color
                        ? 'bg-[var(--primary-soft)] text-primary-foreground shadow-sm'
                        : 'bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90'
                    }`}
                    aria-pressed={preferences.accentColor === color}
                    aria-label={`Set accent color to ${color}`}
                  >
                    <span
                      className="size-1.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: `var(--preview-${color})`,
                      }}
                      aria-hidden
                    />
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel id="display-label">
            Display & Notifications
          </SidebarGroupLabel>
          <SidebarGroupContent
            className="flex flex-col gap-2"
            role="group"
            aria-labelledby="display-label"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                id="compact-mode"
                checked={preferences.compactMode}
                onCheckedChange={(checked: boolean | 'indeterminate') =>
                  updatePreference('compactMode', checked === true)
                }
              />
              <Label
                htmlFor="compact-mode"
                className="cursor-pointer font-normal text-xs"
              >
                Compact mode
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="notifications"
                checked={preferences.notificationsEnabled}
                onCheckedChange={(checked: boolean | 'indeterminate') =>
                  updatePreference('notificationsEnabled', checked === true)
                }
              />
              <Label
                htmlFor="notifications"
                className="cursor-pointer font-normal text-xs"
              >
                In-app notifications
              </Label>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel id="shortcuts-label">
            Shortcuts & API
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-2">
            <KeyboardShortcuts />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel id="api-label">API key</SidebarGroupLabel>
          <SidebarGroupContent
            className="flex flex-col gap-2"
            role="group"
            aria-labelledby="api-label"
          >
            <ApiKeySection />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto shrink-0 border-t border-sidebar-border p-3">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar"
          aria-label="Close settings (Ctrl+B)"
        >
          <PanelLeftClose className="size-3.5" aria-hidden />
          Close
        </button>
      </div>
    </>
  );
}
