// components/layout/PageWrapper.tsx
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function PageWrapper({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <main className={cn(
      'max-w-4xl mx-auto p-4 sm:p-6 md:p-8', // Responsive padding
      className
    )}>
      {children}
    </main>
  );
}
