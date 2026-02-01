import { useState } from 'react';
import { Keyboard } from 'lucide-react';
import { KEYBOARD_SHORTCUTS } from '@/constants';

export function KeyboardShortcuts() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-expanded={isExpanded}
        aria-controls="shortcuts-list"
      >
        <span className="flex items-center gap-1.5">
          <Keyboard className="size-3.5" aria-hidden />
          View shortcuts
        </span>
        <span
          className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          aria-hidden
        >
          ▼
        </span>
      </button>
      {isExpanded && (
        <div
          id="shortcuts-list"
          className="mt-2 space-y-2 rounded-md border border-sidebar-border bg-sidebar-accent/50 p-2"
          role="region"
          aria-label="Keyboard shortcuts list"
        >
          {KEYBOARD_SHORTCUTS.map(({ keys, action }) => (
            <div
              key={action}
              className="flex items-center justify-between gap-2 text-xs"
            >
              <span className="text-sidebar-foreground">{action}</span>
              <kbd className="inline-flex items-center gap-0.5 rounded border border-sidebar-border bg-sidebar px-1.5 py-0.5 font-mono text-[10px]">
                {keys.join(' + ')}
              </kbd>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
