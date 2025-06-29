import clsx from 'clsx';

type SpinnerProps = {
  className?: string;
};

export default function Spinner({ className = 'text-primary' }: SpinnerProps) {
  return (
    <svg
      className={clsx('animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <circle
        className="opacity-75"
        stroke="currentColor"
        strokeWidth="4"
        cx="12"
        cy="12"
        r="10"
        fill="none"
        strokeDasharray={2 * Math.PI * 10}
        strokeDashoffset={2 * Math.PI * 10 * 0.7}
        strokeLinecap="round"
      />
    </svg>
  );
}
