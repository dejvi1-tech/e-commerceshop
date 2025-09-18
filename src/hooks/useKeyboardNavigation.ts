import { useEffect, useRef } from 'react';

export interface KeyboardNavigationOptions {
  onEscape?: () => void;
  onEnter?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onTab?: () => void;
  onShiftTab?: () => void;
  trapFocus?: boolean;
  autoFocus?: boolean;
}

export const useKeyboardNavigation = (
  containerRef: React.RefObject<HTMLElement>,
  options: KeyboardNavigationOptions = {}
) => {
  const {
    onEscape,
    onEnter,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onTab,
    onShiftTab,
    trapFocus = false,
    autoFocus = false
  } = options;

  const focusableElementsSelector = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable]'
  ].join(', ');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, shiftKey } = event;

      switch (key) {
        case 'Escape':
          if (onEscape) {
            event.preventDefault();
            onEscape();
          }
          break;

        case 'Enter':
          if (onEnter) {
            event.preventDefault();
            onEnter();
          }
          break;

        case 'ArrowUp':
          if (onArrowUp) {
            event.preventDefault();
            onArrowUp();
          }
          break;

        case 'ArrowDown':
          if (onArrowDown) {
            event.preventDefault();
            onArrowDown();
          }
          break;

        case 'ArrowLeft':
          if (onArrowLeft) {
            event.preventDefault();
            onArrowLeft();
          }
          break;

        case 'ArrowRight':
          if (onArrowRight) {
            event.preventDefault();
            onArrowRight();
          }
          break;

        case 'Tab':
          if (trapFocus) {
            const focusableElements = container.querySelectorAll(focusableElementsSelector);
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (shiftKey) {
              if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement?.focus();
                if (onShiftTab) onShiftTab();
              }
            } else {
              if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement?.focus();
                if (onTab) onTab();
              }
            }
          }
          break;
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    // Auto focus first focusable element
    if (autoFocus) {
      const focusableElements = container.querySelectorAll(focusableElementsSelector);
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, onEscape, onEnter, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onTab, onShiftTab, trapFocus, autoFocus]);

  const getFocusableElements = (): HTMLElement[] => {
    const container = containerRef.current;
    if (!container) return [];

    return Array.from(container.querySelectorAll(focusableElementsSelector));
  };

  const focusFirst = () => {
    const elements = getFocusableElements();
    elements[0]?.focus();
  };

  const focusLast = () => {
    const elements = getFocusableElements();
    elements[elements.length - 1]?.focus();
  };

  return {
    getFocusableElements,
    focusFirst,
    focusLast
  };
};