"use client";

import { motion } from "framer-motion";
import { Button } from "../../Button";
import { EASE_PREMIUM } from "./motion-utils";
import { trackEvent } from "@/lib/analytics";

const STATS = [
  { value: "500+", label: "Properties Secured" },
  { value: "99.9%", label: "Uptime & Monitoring" },
  { value: "40%", label: "Fewer Security Risks" },
];

const copyVariants = {
  hidden: { opacity: 0, y: 22 },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.09, ease: EASE_PREMIUM },
  }),
};

/**
 * The hero's brand message. Unlike the security visualization, this column
 * does not wait on scroll — the brief's own reference layout keeps it
 * visible throughout the whole SCAN → PROTECT sequence, alongside the
 * photo, not gated behind it.
 */
export function HeroCopy({ ctaSource, className }: { ctaSource: string; className?: string }) {
  return (
    <div className={className}>
      <motion.p
        custom={0}
        initial="hidden"
        animate="shown"
        variants={copyVariants}
        className="eyebrow mb-5 text-white/60"
      >
        Intelligent Surveillance
        <br />
        for Safer Spaces
      </motion.p>

      <h1 className="max-w-lg">
        <motion.span
          custom={1}
          initial="hidden"
          animate="shown"
          variants={copyVariants}
          className="block font-serif text-4xl leading-[1.05] text-white sm:text-5xl lg:text-display-2"
        >
          You don&rsquo;t need more cameras.
        </motion.span>
        <motion.span
          custom={2}
          initial="hidden"
          animate="shown"
          variants={copyVariants}
          className="mt-1 block font-serif text-4xl italic leading-[1.05] text-clay-light sm:text-5xl lg:text-display-2"
        >
          You need fewer blind spots.
        </motion.span>
      </h1>

      <motion.p
        custom={3}
        initial="hidden"
        animate="shown"
        variants={copyVariants}
        className="mt-6 max-w-sm text-base leading-relaxed text-white/70"
      >
        3NETRA identifies security gaps, designs the right protection system and
        keeps it working beyond installation.
      </motion.p>

      <motion.div
        custom={4}
        initial="hidden"
        animate="shown"
        variants={copyVariants}
        className="mt-8 flex flex-wrap items-center gap-4"
      >
        <Button
          href="#security-audit"
          variant="solid-ivory"
          className="w-full justify-center sm:w-auto"
          onClick={() => trackEvent("hero_cta_click", { source: `${ctaSource}_primary` })}
        >
          Book a Security Audit
        </Button>
        <Button
          href="#security-audit"
          variant="underline-light"
          withArrow={false}
          onClick={() => trackEvent("hero_cta_click", { source: `${ctaSource}_secondary` })}
        >
          Tell Us Your Security Problem
        </Button>
      </motion.div>

      <motion.div
        custom={5}
        initial="hidden"
        animate="shown"
        variants={copyVariants}
        className="mt-10 flex flex-wrap gap-x-7 gap-y-4 border-t border-white/10 pt-6"
      >
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="font-serif text-2xl text-white">{stat.value}</p>
            <p className="mt-0.5 whitespace-nowrap text-[0.6rem] uppercase tracking-[0.14em] text-white/45">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
