
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css'; // Keep for basic styling
import { cn } from '@/lib/utils'; // Keep if used for body className

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Blanklearn - Minimal Layout Test',
  description: 'Testing minimal layout for debugging purposes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('Minimal RootLayout Rendered - Debugging /page error');
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          geistSans.variable
        )}
      >
        {/* Header and Toaster removed for testing */}
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
        {/* Toaster removed */}
      </body>
    </html>
  );
}
