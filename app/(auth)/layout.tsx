import Link from 'next/link';
import Logo from '@/public/icons/logo.svg';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="w-full max-w-130 px-3">
        <Link href="/" title="홈으로 이동">
          <Logo className="m-auto mb-2.5" width={200} height={280} />
        </Link>
        {children}
      </div>
    </main>
  );
}
