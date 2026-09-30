import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cp-bg flex flex-col items-center justify-center p-6 text-center">
      <div className="glass-surface-deep p-8 md:p-12 max-w-lg border border-neon-cyan/30">
        <p className="micro-label text-neon-cyan mb-2">404 — DEEP WATERS</p>
        <h1 className="text-4xl font-display font-bold text-white mb-4">
          LOST AT SEA
        </h1>
        <p className="text-silver-muted mb-8 text-sm">
          The coordinate you dived toward does not exist in this sector of the ocean.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-full bg-neon-cyan/20 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-cp-bg transition-colors font-mono text-xs uppercase tracking-wider"
        >
          &larr; Return to ocean
        </Link>
      </div>
    </main>
  );
}
