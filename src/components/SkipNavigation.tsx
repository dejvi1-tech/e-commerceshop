export const SkipNavigation = () => {
  return (
    <div className="sr-only focus:not-sr-only">
      <a
        href="#main-content"
        className="absolute top-4 left-4 z-50 bg-brand-500 text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className="absolute top-4 left-36 z-50 bg-brand-500 text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
      >
        Skip to navigation
      </a>
    </div>
  );
};