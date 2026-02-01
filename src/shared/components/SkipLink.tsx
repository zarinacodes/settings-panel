export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] -translate-y-[200%] rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background motion-safe:transition-[transform] motion-safe:duration-200"
    >
      Skip to main content
    </a>
  );
}
