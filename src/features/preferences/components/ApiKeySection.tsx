import { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { usePreferencesStore } from '../store/preferencesStore';

export function ApiKeySection() {
  const apiKey = usePreferencesStore((state) => state.preferences.apiKey);
  const regenerateApiKey = usePreferencesStore(
    (state) => state.regenerateApiKey
  );
  const [copied, setCopied] = useState(false);

  const maskedApiKey = apiKey
    ? `${apiKey.slice(0, 8)}••••••••••••••••••••••${apiKey.slice(-4)}`
    : '';

  async function handleCopy() {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <div className="flex items-center gap-1.5">
        <code
          className="flex-1 truncate rounded-md border border-input bg-muted/50 px-2 py-1.5 font-mono text-[10px] text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          {copied ? 'Copied' : maskedApiKey}
        </code>
        <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Copy API key"
              >
                <Copy className="size-3.5" aria-hidden />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              Copy key
            </TooltipContent>
          </Tooltip>
      </div>
      <p className="text-[10px] text-muted-foreground m-0 mt-1">
        Used for local development only
      </p>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => regenerateApiKey()}
            className="inline-flex w-fit items-center gap-1.5 rounded-md px-2 py-1.5 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Regenerate API key"
          >
            <RefreshCw className="size-3" aria-hidden />
            Regenerate
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">
          Generate new key (invalidates current)
        </TooltipContent>
      </Tooltip>
    </>
  );
}
