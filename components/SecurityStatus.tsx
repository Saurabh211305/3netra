import clsx from "clsx";

type Tone = "alert" | "positive" | "neutral";

const TONE_STYLES: Record<Tone, string> = {
  alert: "bg-clay",
  positive: "bg-pine-light",
  neutral: "bg-white/60",
};

export function SecurityStatus({
  label,
  tone = "neutral",
  className,
}: {
  label: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 rounded-sm border border-white/20 bg-black/45 px-3 py-1.5 backdrop-blur-sm",
        className
      )}
    >
      <span className={clsx("h-1.5 w-1.5 rounded-full animate-pulse-soft", TONE_STYLES[tone])} />
      <span className="text-[0.62rem] font-semibold uppercase tracking-widest2 text-white/85">
        {label}
      </span>
    </div>
  );
}
