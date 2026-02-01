import { useEffect, useRef } from 'react';

type AnnouncerProps = {
  message: string;
  politeness?: 'polite' | 'assertive';
};

export function Announcer({ message, politeness = 'polite' }: AnnouncerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = message;
    }
  }, [message]);

  return (
    <div
      ref={ref}
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
      role="status"
    />
  );
}
