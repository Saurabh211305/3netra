import clsx from "clsx";

/**
 * The hero's own signal treatment — deliberately not the corner-badge/chip
 * used elsewhere on the site (see SecurityStatus). A dot, a hairline leader
 * and small-caps type read as restrained architectural signage rather than
 * a video-game HUD, matching the cinematic register of the hero.
 */
export function HeroSignal({
  label,
  tone,
  className,
}: {
  label: string;
  tone: "alert" | "positive";
  className?: string;
}) {
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <span
        className={clsx(
          "h-1.5 w-1.5 shrink-0 rounded-full animate-pulse-soft",
          tone === "alert" ? "bg-clay-light" : "bg-pine-light"
        )}
      />
      <span className="h-px w-6 shrink-0 bg-white/40" />
      <span className="whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-widest2 text-white/90">
        {label}
      </span>
    </div>
  );
}
