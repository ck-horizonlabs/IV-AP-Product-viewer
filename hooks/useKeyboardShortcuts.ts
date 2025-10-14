import { useEffect } from 'react';

interface KeyboardShortcutConfig {
  onExport?: () => void;
  onClear?: () => void;
  onEscape?: () => void;
}

export function useKeyboardShortcuts({ onExport, onClear, onEscape }: KeyboardShortcutConfig) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + S for export
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        onExport?.();
      }

      // Ctrl/Cmd + E for clear
      if ((event.ctrlKey || event.metaKey) && event.key === 'e') {
        event.preventDefault();
        onClear?.();
      }

      // Escape key
      if (event.key === 'Escape') {
        onEscape?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExport, onClear, onEscape]);
}
