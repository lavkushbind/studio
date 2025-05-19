
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Blanklearn - Find Your Teacher',
  description: 'Find the perfect teacher for personalized learning (Grades 1-10).',
  // It's good practice to have a favicon, but ensure /public/favicon.ico exists
  // or remove this line if you don't have one to avoid potential 404s for the icon itself.
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          geistSans.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 py-6">{children}</main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
