import type { Metadata } from 'next';
import QueryProvider from '@/querys/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Taskify',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex h-screen flex-col overflow-hidden">
        <QueryProvider>
          <div className="overflow-y-auto">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
