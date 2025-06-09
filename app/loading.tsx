import Spinner from '@/components/common/Loading/Spinner';

export default function RootLoading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner className="h-10 w-10" />
    </div>
  );
}
