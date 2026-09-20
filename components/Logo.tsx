import clsx from "clsx";

/**
 * Placeholder wordmark. No official 3NETRA logo asset exists in this
 * repository — replace this component's markup with the real logo file
 * (SVG/PNG) the moment one is supplied, without altering layout call sites.
 */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const ink = tone === "dark" ? "#0F3D3A" : "#F9EBE5";
  const text = tone === "dark" ? "text-onyx" : "text-white";

  return (
    <span className={clsx("inline-flex items-center gap-2.5 select-none", className)}>
      <svg width="26" height="26" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path
          d="M20 32C24 24 30 20 32 20C34 20 40 24 44 32C40 40 34 44 32 44C30 44 24 40 20 32Z"
          stroke={ink}
          strokeWidth="2.6"
        />
        <circle cx="32" cy="32" r="5.5" fill={ink} />
      </svg>
      <span className={clsx("font-serif text-[1.35rem] leading-none tracking-tight", text)}>
        3NETRA
      </span>
    </span>
  );
}
