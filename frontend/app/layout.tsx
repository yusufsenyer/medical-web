import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MedWebify - Profesyonel Web Sitesi Tasarımı',
  description: 'MedWebify ile profesyonel web sitenizi tasarlayın. Modern, responsive ve SEO uyumlu web siteleri.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
