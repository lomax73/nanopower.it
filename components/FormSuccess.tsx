export default function FormSuccess({
  message,
  children,
}: {
  message: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-3 border border-nano-teal/40 bg-nano-teal/5 p-8 text-center">
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="11" stroke="#00A896" strokeWidth="1.5" />
        <path d="M7 12.5 10.2 16 17 8" stroke="#00A896" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-white">{message}</p>
      {children}
    </div>
  );
}
