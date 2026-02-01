import { useEffect } from 'react';

export function useKeyboardShortcut(
  key: string,
  modifier: 'meta' | 'ctrl' | 'mod' | 'alt' | 'shift' | null,
  callback: () => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: KeyboardEvent) => {
      const keyMatch = e.key.toLowerCase() === key.toLowerCase();
      let modifierMatch = true;
      if (modifier) {
        switch (modifier) {
          case 'meta':
            modifierMatch = e.metaKey;
            break;
          case 'ctrl':
            modifierMatch = e.ctrlKey;
            break;
          case 'mod':
            modifierMatch = e.metaKey || e.ctrlKey;
            break;
          case 'alt':
            modifierMatch = e.altKey;
            break;
          case 'shift':
            modifierMatch = e.shiftKey;
            break;
          default:
            modifierMatch = false;
        }
      }

      if (keyMatch && modifierMatch) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [key, modifier, callback, enabled]);
}
