import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import AdSense from '@/components/AdSense';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import MobileRefreshWrapper from '@/components/MobileRefreshWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://orangediscounts.com'),
  title: {
    default: 'Cuse Student Deals - Syracuse University Student Discounts',
    template: '%s | Cuse Student Deals',
  },
  description:
    'Every legit student discount in Syracuse — verified, local, and updated. Find student deals on food, entertainment, services, and more near Syracuse University.',
  keywords: [
    'Syracuse student discounts',
    'Syracuse University student deals',
    'SU student discounts',
    'student discounts near Syracuse University',
    'Syracuse student savings',
  ],
  authors: [{ name: 'Cuse Student Deals' }],
  openGraph: {
    title: 'Cuse Student Deals - Syracuse University Student Discounts',
    description:
      'Every legit student discount in Syracuse — verified, local, and updated.',
    url: 'https://orangediscounts.com',
    siteName: 'Cuse Student Deals',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cuse Student Deals - Syracuse University Student Discounts',
    description:
      'Every legit student discount in Syracuse — verified, local, and updated.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <GoogleAnalytics />
        <AdSense />
        <ServiceWorkerRegistration />
        <MobileRefreshWrapper>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </MobileRefreshWrapper>
      </body>
    </html>
  );
}
