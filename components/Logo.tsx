import Image from "next/image";
import clsx from "clsx";
import logoMark from "@/public/logo/3netra-logo-compact.png";

/**
 * The official 3NETRA lockup (icon + wordmark), used exactly as supplied —
 * the master's flat white canvas was removed via flood-fill from its edges
 * (never touching an enclosed pixel of the mark itself, e.g. the lens
 * highlight) so it can sit directly over any background with no box
 * around it, and otherwise only cropped to trim blank margin.
 *
 * The source has no separate dark-mode artwork, so on dark backgrounds we
 * render it as a flat white silhouette via a CSS filter rather than boxing
 * it — a standard, non-destructive way to carry a single-color-capable mark
 * across light and dark contexts without redrawing it.
 */
export function Logo({
  className,
  height = 34,
  tone = "white",
}: {
  className?: string;
  height?: number;
  tone?: "white" | "natural";
}) {
  return (
    <span className={clsx("inline-flex items-center", className)}>
      <Image
        src={logoMark}
        alt="3NETRA — Intelligent Security. A Safer Tomorrow."
        height={height}
        style={{
          height: `${height}px`,
          width: "auto",
          filter: tone === "white" ? "brightness(0) invert(1)" : "none",
        }}
        priority
      />
    </span>
  );
}
