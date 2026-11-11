import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { DM_Mono, DM_Sans } from 'next/font/google';

import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  axes: ['opsz'],
});

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'TTMIK Stories Coupon',
  description: 'Apply your TTMIK Stories coupon code to your account.',
};

export const viewport: Viewport = {
  themeColor: '#031b30',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en' className={`${dmSans.variable} ${dmMono.variable}`}>
      <body className='min-h-full bg-midnight font-sans text-neutral-white antialiased'>
        {children}
      </body>
    </html>
  );
}
