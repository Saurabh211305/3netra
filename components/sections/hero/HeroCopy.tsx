"use client";

import { motion } from "framer-motion";
import { Button } from "../../Button";
import { EASE_PREMIUM } from "./motion-utils";
import { trackEvent } from "@/lib/analytics";

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
 * does not wait on scroll — it renders immediately and stays visible
 * throughout the whole SCAN → PROTECT sequence, alongside the photo. No
 * stats row: the journey indicator (01 SCAN…04 PROTECT) already carries
 * whatever supporting information the hero needs, and any stat here would
 * be an unverified claim.
 */
export function HeroCopy({ ctaSource, className }: { ctaSource: string; className?: string }) {
  return (
    <div className={className}>
      <motion.p
        custom={0}
        initial="hidden"
        animate="shown"
        variants={copyVariants}
        className="eyebrow mb-6 text-white/60"
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
          className="block font-serif text-4xl leading-[1.05] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-display-2"
        >
          You don&rsquo;t need more cameras.
        </motion.span>
        <motion.span
          custom={2}
          initial="hidden"
          animate="shown"
          variants={copyVariants}
          className="mt-1 block font-serif text-4xl italic leading-[1.05] text-clay-light [text-shadow:0_2px_16px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-display-2"
        >
          You need fewer blind spots.
        </motion.span>
      </h1>

      <motion.p
        custom={3}
        initial="hidden"
        animate="shown"
        variants={copyVariants}
        className="mt-8 max-w-sm text-base leading-relaxed text-white/70"
      >
        3NETRA identifies security gaps, designs the right protection system and
        keeps it working beyond installation.
      </motion.p>

      <motion.div
        custom={4}
        initial="hidden"
        animate="shown"
        variants={copyVariants}
        className="mt-12 flex flex-wrap items-center gap-5"
      >
        <Button
          href="#security-audit"
          variant="solid-rose"
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
    </div>
  );
}
