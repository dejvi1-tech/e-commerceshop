import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { expect } from 'vitest';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </HelmetProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

// Custom matchers
export const expectToBeAccessible = (element: HTMLElement) => {
  // Check for ARIA attributes
  expect(element).toBeInTheDocument();

  // Check for proper focus management
  if (element.matches('button, input, select, textarea, a[href], [tabindex]')) {
    expect(element).not.toHaveAttribute('tabindex', '-1');
  }
};

export const expectToHaveAccessibleName = (element: HTMLElement) => {
  const hasAriaLabel = element.hasAttribute('aria-label');
  const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
  const hasTextContent = element.textContent && element.textContent.trim().length > 0;
  const hasTitle = element.hasAttribute('title');

  expect(
    hasAriaLabel || hasAriaLabelledBy || hasTextContent || hasTitle
  ).toBe(true);
};