"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ArchitecturalSceneMobile } from "./ArchitecturalSceneMobile";
import { HeroSignal } from "./HeroSignal";
import { Button } from "../../Button";
import { EASE_PREMIUM } from "./motion-utils";
import { trackEvent } from "@/lib/analytics";

const TRUST_ITEMS = ["CCTV", "AI SURVEILLANCE", "ACCESS CONTROL", "MONITORING", "AMC"];

const copyVariants = {
  hidden: { opacity: 0, y: 22 },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: EASE_PREMIUM },
  }),
};

/**
 * Mobile gets the same Security Layer story, told on a timer instead of via
 * a pinned scroll — no scroll-jacking on a touch device. It plays once on
 * arrival and settles into ordinary document flow.
 */
export function HeroMobile() {
  const reduceMotion = useReducedMotion();
  const fov = useMotionValue(0);
  const zoneB = useMotionValue(0);
  const blind = useMotionValue(0);
  const zoneA = useMotionValue(0);
  const recede = useMotionValue(0);
  const [revealed, setRevealed] = useState(false);

  // The signal readout belongs to the scene, not the headline takeover —
  // fade it out as the scene recedes so it never collides with the copy.
  const blindSignalOpacity = useTransform([blind, recede], ([b, r]: number[]) => b * (1 - r));
  const zoneASignalOpacity = useTransform([zoneA, recede], ([z, r]: number[]) => z * (1 - r));

  useEffect(() => {
    if (reduceMotion) {
      fov.set(0);
      zoneB.set(1);
      blind.set(0);
      zoneA.set(1);
      recede.set(1);
      setRevealed(true);
      return;
    }

    const controls = [
      animate(fov, [0, 1, 1, 0], { duration: 1.8, times: [0, 0.3, 0.55, 1], delay: 0.2, ease: "easeInOut" }),
      animate(zoneB, [0, 1], { duration: 1, delay: 1.3, ease: "easeOut" }),
      animate(blind, [0, 1, 1, 0], { duration: 1.8, times: [0, 0.3, 0.6, 1], delay: 2.6, ease: "easeInOut" }),
      animate(zoneA, [0, 1], { duration: 1, delay: 4.1, ease: "easeOut" }),
      animate(recede, [0, 1], {
        duration: 1,
        delay: 5,
        ease: "easeOut",
        onComplete: () => setRevealed(true),
      }),
    ];

    return () => controls.forEach((c) => c.stop());
  }, [reduceMotion, fov, zoneB, blind, zoneA, recede]);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-onyx lg:hidden">
      <ArchitecturalSceneMobile fov={fov} zoneB={zoneB} blind={blind} zoneA={zoneA} recede={recede} className="absolute inset-0" />

      <div className="absolute left-6 top-[31%] flex flex-col gap-2.5">
        <motion.div style={{ opacity: blindSignalOpacity }}>
          <HeroSignal label="Blind Spot Detected" tone="alert" />
        </motion.div>
        <motion.div style={{ opacity: zoneASignalOpacity }} className="-mt-8">
          <HeroSignal label="Coverage Optimized" tone="positive" />
        </motion.div>
      </div>

      <div className="relative mt-auto px-6 pb-14 pt-32">
        <motion.p
          custom={0}
          initial="hidden"
          animate={revealed ? "shown" : "hidden"}
          variants={copyVariants}
          className="eyebrow mb-5 text-clay-light"
        >
          Intelligent Security Technology
        </motion.p>

        <h1>
          <motion.span
            custom={1}
            initial="hidden"
            animate={revealed ? "shown" : "hidden"}
            variants={copyVariants}
            className="block font-serif text-4xl leading-[1.05] text-white"
          >
            You don&rsquo;t need more cameras.
          </motion.span>
          <motion.span
            custom={2}
            initial="hidden"
            animate={revealed ? "shown" : "hidden"}
            variants={copyVariants}
            className="mt-1 block font-serif text-5xl italic leading-[1.02] text-clay-light"
          >
            You need fewer blind spots.
          </motion.span>
        </h1>

        <motion.p
          custom={3}
          initial="hidden"
          animate={revealed ? "shown" : "hidden"}
          variants={copyVariants}
          className="mt-6 max-w-sm text-base leading-relaxed text-white/70"
        >
          3NETRA identifies security gaps, designs the right protection system and
          keeps it working beyond installation.
        </motion.p>

        <motion.div
          custom={4}
          initial="hidden"
          animate={revealed ? "shown" : "hidden"}
          variants={copyVariants}
          className="mt-8 flex flex-col items-start gap-5"
        >
          <Button
            href="#security-audit"
            variant="solid-ivory"
            className="w-full justify-center sm:w-auto"
            onClick={() => trackEvent("hero_cta_click", { source: "hero_primary_mobile" })}
          >
            Book a Security Audit
          </Button>
          <Button
            href="#security-audit"
            variant="underline-light"
            withArrow={false}
            onClick={() => trackEvent("hero_cta_click", { source: "hero_secondary_mobile" })}
          >
            Tell Us Your Security Problem
          </Button>
        </motion.div>

        <motion.div
          custom={5}
          initial="hidden"
          animate={revealed ? "shown" : "hidden"}
          variants={copyVariants}
          className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-5"
        >
          {TRUST_ITEMS.map((item, i) => (
            <span
              key={item}
              className="flex items-center gap-4 text-[0.62rem] font-semibold tracking-widest2 text-white/40"
            >
              {item}
              {i < TRUST_ITEMS.length - 1 && <span className="h-1 w-1 rounded-full bg-white/25" />}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
