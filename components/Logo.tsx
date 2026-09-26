import Image from "next/image";
import clsx from "clsx";
import logoMark from "@/public/logo/3netra-logo-compact.png";

/**
 * The official 3NETRA lockup (icon + wordmark), used exactly as supplied —
 * only cropped to trim the master asset's blank canvas margin, no pixels of
 * the mark itself touched. The source has no dark-mode variant, so it sits
 * in a small white chip for guaranteed legibility over both the photographic
 * hero and the site's light sections.
 */
export function Logo({ className, height = 34 }: { className?: string; height?: number }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md bg-white px-2.5 py-1.5 shadow-sm",
        className
      )}
    >
      <Image
        src={logoMark}
        alt="3NETRA — Intelligent Security. A Safer Tomorrow."
        height={height}
        style={{ height: `${height}px`, width: "auto" }}
        priority
      />
    </span>
  );
}
