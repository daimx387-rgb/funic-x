export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-mute">
          404
        </p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3.4rem)] font-semibold tracking-[-0.04em] text-ink">
          Page not found
        </h1>
        <a
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-paper"
        >
          Back home
        </a>
      </div>
    </div>
  );
}
