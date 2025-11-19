import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Providers from './providers';

const pretendard = localFont({
  src: '../../public/fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '단디온나',
  description: '단디온나 온보딩 화면입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${pretendard.variable} bg-white min-h-screen flex flex-col justify-center items-center`}>
        <Providers>
          <div className='mx-auto bg-white'>
            <Toaster position='top-right' />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
