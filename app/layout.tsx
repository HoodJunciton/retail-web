import React from 'react';
import './globals.css';
import ReduxProvider from '../components/providers/ReduxProvider';
import MainLayout from '../components/layouts/MainLayout';

// These imports will be available once we install Next.js
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';

// Will uncomment once Next.js is properly installed
// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Retailer Web',
//   description: 'Retailer management application',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
