export default function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 border-t border-white/10 px-6 py-8 text-center">
      <a href="mailto:info@nanopower.it" className="text-sm text-nano-slate transition-colors hover:text-nano-teal">
        info@nanopower.it
      </a>
      <a
        href="https://linkedin.com/company/fbosolution"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Fbosolution"
        className="text-nano-slate transition-colors hover:text-nano-teal"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9.98h4v10.02H3V9.98Zm7 0h3.83v1.37h.05c.53-.96 1.83-1.97 3.77-1.97 4.03 0 4.78 2.55 4.78 5.87v6.75h-4v-5.98c0-1.43-.03-3.26-2-3.26-2 0-2.3 1.53-2.3 3.15v6.09h-4V9.98Z" />
        </svg>
      </a>
      <p className="text-xs text-nano-slate/70">
        © 2026 Fbosolution.it · nanopower.it è un brand Fbosolution.it
      </p>
    </footer>
  );
}
