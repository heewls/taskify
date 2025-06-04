import QueryProvider from '@/querys/QueryProvider';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <QueryProvider>
        <body>{children}</body>
      </QueryProvider>
    </html>
  );
}
