import Link from 'next/link';
import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="w-full max-w-130 p-3">
        <Link href="/" title="홈으로 이동">
          <Image
            src="/icons/logo.svg"
            className="m-auto mb-2.5"
            width={200}
            height={280}
            alt="logo"
          />
        </Link>
        {children}
      </div>
    </main>
  );
}
