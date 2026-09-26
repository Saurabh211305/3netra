"use client";

import { MotionValue, motion } from "framer-motion";
import clsx from "clsx";

const STAGES = ["Scan", "Detect", "Optimize", "Protect"];

export function JourneyIndicator({
  activeIndex,
  lineWidth,
  className,
}: {
  activeIndex: number;
  lineWidth: MotionValue<string>;
  className?: string;
}) {
  return (
    <div className={clsx("relative flex items-center", className)}>
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/15" />
      <motion.span
        className="absolute inset-y-0 left-0 top-1/2 h-px -translate-y-1/2 bg-clay-light"
        style={{ width: lineWidth }}
      />

      <div className="relative flex w-full items-center justify-between">
        {STAGES.map((stage, i) => (
          <div key={stage} className="flex items-center gap-2 bg-onyx pr-3 first:pl-0 last:pr-0">
            <span
              className={clsx(
                "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                i <= activeIndex ? "bg-clay-light" : "bg-white/30"
              )}
            />
            <span
              className={clsx(
                "whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-widest2 transition-colors duration-500",
                i === activeIndex ? "inline text-clay-light" : "hidden sm:inline",
                i < activeIndex && "text-white/70",
                i > activeIndex && "text-white/40"
              )}
            >
              {String(i + 1).padStart(2, "0")} {stage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
