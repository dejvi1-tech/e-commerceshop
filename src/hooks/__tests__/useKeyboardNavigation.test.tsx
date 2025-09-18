import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useKeyboardNavigation } from '../useKeyboardNavigation';

describe('useKeyboardNavigation', () => {
  let mockContainer: HTMLDivElement;

  beforeEach(() => {
    mockContainer = document.createElement('div');
    document.body.appendChild(mockContainer);
  });

  it('should call onEscape when Escape key is pressed', () => {
    const onEscape = vi.fn();
    const ref = { current: mockContainer };

    renderHook(() =>
      useKeyboardNavigation(ref, { onEscape })
    );

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    mockContainer.dispatchEvent(escapeEvent);

    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('should call onEnter when Enter key is pressed', () => {
    const onEnter = vi.fn();
    const ref = { current: mockContainer };

    renderHook(() =>
      useKeyboardNavigation(ref, { onEnter })
    );

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    mockContainer.dispatchEvent(enterEvent);

    expect(onEnter).toHaveBeenCalledTimes(1);
  });

  it('should focus first element when autoFocus is true', () => {
    const button = document.createElement('button');
    button.textContent = 'Test Button';
    mockContainer.appendChild(button);

    const ref = { current: mockContainer };
    const focusSpy = vi.spyOn(button, 'focus');

    renderHook(() =>
      useKeyboardNavigation(ref, { autoFocus: true })
    );

    expect(focusSpy).toHaveBeenCalled();
  });

  it('should return helper functions', () => {
    const ref = { current: mockContainer };

    const { result } = renderHook(() =>
      useKeyboardNavigation(ref, {})
    );

    expect(result.current.getFocusableElements).toBeDefined();
    expect(result.current.focusFirst).toBeDefined();
    expect(result.current.focusLast).toBeDefined();
  });
});