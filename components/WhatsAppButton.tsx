export default function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP;

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivici su WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_0_20px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 sm:h-12 sm:w-12"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-6 sm:w-6" fill="#0D1F33" aria-hidden="true">
        <path d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.93-.26-.1-.46-.15-.65.15-.2.29-.75.93-.92 1.12-.17.2-.34.22-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.6-2-.17-.29-.02-.44.13-.59.13-.13.29-.34.44-.5.15-.18.2-.3.29-.5.1-.19.05-.36-.02-.5-.07-.15-.65-1.58-.9-2.16-.24-.57-.48-.49-.65-.5h-.56c-.19 0-.5.07-.77.36-.26.29-1 .98-1 2.4s1.03 2.78 1.17 2.98c.15.19 2.02 3.08 4.89 4.32.68.3 1.22.47 1.63.6.68.22 1.31.19 1.8.11.55-.08 1.7-.7 1.94-1.36.24-.68.24-1.26.17-1.38-.07-.13-.26-.2-.55-.35Z" />
        <path d="M12 2C6.48 2 2 6.36 2 11.75c0 2.02.64 3.9 1.73 5.44L2.5 21.5l4.5-1.16A9.98 9.98 0 0 0 12 21.5c5.52 0 10-4.36 10-9.75S17.52 2 12 2Zm0 17.7c-1.63 0-3.15-.46-4.44-1.26l-.32-.19-2.67.69.72-2.55-.21-.33A7.83 7.83 0 0 1 4.02 11.75c0-4.3 3.58-7.79 7.98-7.79s7.98 3.49 7.98 7.79-3.58 7.95-7.98 7.95Z" />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded bg-nano-navy-light px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        Scrivici su WhatsApp
      </span>
    </a>
  );
}
