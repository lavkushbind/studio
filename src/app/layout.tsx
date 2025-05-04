import type { Metadata } from 'next';
import { Geist } from 'next/font/google'; // Keep Geist Sans
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: 'LearnBase', // Updated App Name
  description: 'A Personalized Educational Marketplace', // Updated Description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          geistSans.variable // Use Geist Sans variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          {/* Add Footer if needed later */}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
