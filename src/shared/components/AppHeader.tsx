import { Bell, BellOff, Settings } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { usePreferencesStore } from '@/features/preferences/store/preferencesStore';

function getInitials(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return initials || 'U';
}

type AppHeaderProps = {
  sidebarCollapsed?: boolean;
  onOpenSettings?: () => void;
  settingsButtonRef?: React.RefObject<HTMLButtonElement | null>;
};

export function AppHeader({
  sidebarCollapsed = false,
  onOpenSettings,
  settingsButtonRef,
}: AppHeaderProps) {
  const displayName = usePreferencesStore(
    (state) => state.preferences.displayName
  );
  const notificationsEnabled = usePreferencesStore(
    (state) => state.preferences.notificationsEnabled
  );

  const initials = getInitials(displayName);

  return (
    <header
      className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6"
      role="banner"
    >
      <div className="flex items-center gap-3">
        {sidebarCollapsed && onOpenSettings && (
          <button
            ref={settingsButtonRef}
            type="button"
            onClick={onOpenSettings}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Open settings (Ctrl+B)"
          >
            <Settings className="size-4" aria-hidden />
          </button>
        )}
        <span className="text-sm font-semibold tracking-tight text-foreground">
          Console
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={
                notificationsEnabled
                  ? 'Notifications on'
                  : 'Notifications off'
              }
            >
              {notificationsEnabled ? (
                <Bell className="size-4" aria-hidden />
              ) : (
                <BellOff className="size-4" aria-hidden />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {notificationsEnabled ? 'Notifications on' : 'Notifications off'}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={displayName ? `Signed in as ${displayName}` : 'Account'}
            >
              {initials}
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {displayName ? `Signed in as ${displayName}` : 'Account'}
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
