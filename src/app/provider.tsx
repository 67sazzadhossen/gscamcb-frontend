'use client';
import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import ReduxProvider from '@/redux/ReduxProvider';
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      {children}
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
    </ReduxProvider>
  );
}
