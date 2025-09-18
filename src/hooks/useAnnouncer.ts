import { useCallback } from 'react';

type AnnouncementPriority = 'polite' | 'assertive';

export const useAnnouncer = () => {
  const announce = useCallback((message: string, priority: AnnouncementPriority = 'polite') => {
    // Create or get existing live region
    let liveRegion = document.getElementById(`live-region-${priority}`);

    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = `live-region-${priority}`;
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }

    // Clear previous message
    liveRegion.textContent = '';

    // Add new message after a brief delay to ensure screen readers pick it up
    setTimeout(() => {
      if (liveRegion) {
        liveRegion.textContent = message;
      }
    }, 100);

    // Clear message after 5 seconds
    setTimeout(() => {
      if (liveRegion) {
        liveRegion.textContent = '';
      }
    }, 5000);
  }, []);

  const announcePolite = useCallback((message: string) => {
    announce(message, 'polite');
  }, [announce]);

  const announceAssertive = useCallback((message: string) => {
    announce(message, 'assertive');
  }, [announce]);

  return {
    announce,
    announcePolite,
    announceAssertive
  };
};