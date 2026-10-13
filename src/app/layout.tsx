import type { Metadata } from 'next';
import { school, schoolName } from '@/constants/school';
import { Anton, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './provider';

const schoolDisplay = Anton({
  variable: '--font-school-display',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: schoolName,
  icons: { icon: { url: school.logo, type: 'image/webp' } },
  description: `${schoolName} school management system`,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${schoolDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
