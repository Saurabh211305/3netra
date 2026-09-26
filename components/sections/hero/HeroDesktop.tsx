"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArchitecturalScene } from "./ArchitecturalScene";
import { HeroSignal } from "./HeroSignal";
import { Button } from "../../Button";
import { bump, riseAndHold, EASE_PREMIUM } from "./motion-utils";
import { trackEvent } from "@/lib/analytics";

const TRUST_ITEMS = ["CCTV", "AI SURVEILLANCE", "ACCESS CONTROL", "MONITORING", "AMC"];

const copyVariants = {
  hidden: { opacity: 0, y: 28 },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.1, ease: EASE_PREMIUM },
  }),
};

export function HeroDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const fov = useTransform(scrollYProgress, (v) => bump(v, 0.05, 0.18, 0.2, 0.3));
  const zoneB = useTransform(scrollYProgress, (v) => riseAndHold(v, 0.16, 0.3));
  const blind = useTransform(scrollYProgress, (v) => bump(v, 0.34, 0.46, 0.5, 0.58));
  const zoneA = useTransform(scrollYProgress, (v) => riseAndHold(v, 0.52, 0.64));
  const recede = useTransform(scrollYProgress, (v) => riseAndHold(v, 0.62, 0.78));
  const cueOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  // The signal readout belongs to the scene, not the headline takeover —
  // fade it out as the scene recedes so it never collides with the copy.
  const blindSignalOpacity = useTransform([blind, recede], ([b, r]: number[]) => b * (1 - r));
  const zoneASignalOpacity = useTransform([zoneA, recede], ([z, r]: number[]) => z * (1 - r));

  const [revealed, setRevealed] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => setRevealed(v >= 0.78));

  return (
    <section ref={ref} className="relative hidden bg-onyx lg:block" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <ArchitecturalScene
          fov={fov}
          zoneB={zoneB}
          blind={blind}
          zoneA={zoneA}
          recede={recede}
          fit="cover"
          className="absolute inset-0"
        />

        {/* Signal readout — crossfades between beats in a fixed editorial position */}
        <div className="absolute left-16 top-[30%] flex flex-col gap-3">
          <motion.div style={{ opacity: blindSignalOpacity }}>
            <HeroSignal label="Blind Spot Detected" tone="alert" />
          </motion.div>
          <motion.div style={{ opacity: zoneASignalOpacity }} className="-mt-9">
            <HeroSignal label="Security Coverage Optimized" tone="positive" />
          </motion.div>
        </div>

        {/* Scroll cue — visible only at rest, before the narrative begins */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="text-[0.65rem] font-semibold uppercase tracking-widest2 text-white/60">
            Scroll
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>

        {/* Headline takeover */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-content px-16 pb-16">
            <motion.p
              custom={0}
              initial="hidden"
              animate={revealed ? "shown" : "hidden"}
              variants={copyVariants}
              className="eyebrow mb-6 text-clay-light"
            >
              Intelligent Security Technology
            </motion.p>

            <h1 className="max-w-3xl">
              <motion.span
                custom={1}
                initial="hidden"
                animate={revealed ? "shown" : "hidden"}
                variants={copyVariants}
                className="block font-serif text-display-2 text-white"
              >
                You don&rsquo;t need more cameras.
              </motion.span>
              <motion.span
                custom={2}
                initial="hidden"
                animate={revealed ? "shown" : "hidden"}
                variants={copyVariants}
                className="mt-1 block font-serif text-display-1 italic text-clay-light"
              >
                You need fewer blind spots.
              </motion.span>
            </h1>

            <motion.p
              custom={3}
              initial="hidden"
              animate={revealed ? "shown" : "hidden"}
              variants={copyVariants}
              className="mt-7 max-w-md text-base leading-relaxed text-white/70 md:text-lg"
            >
              3NETRA identifies security gaps, designs the right protection system
              and keeps it working beyond installation.
            </motion.p>

            <motion.div
              custom={4}
              initial="hidden"
              animate={revealed ? "shown" : "hidden"}
              variants={copyVariants}
              className="mt-10 flex flex-wrap items-center gap-8"
            >
              <Button
                href="#security-audit"
                variant="solid-ivory"
                onClick={() => trackEvent("hero_cta_click", { source: "hero_primary" })}
              >
                Book a Security Audit
              </Button>
              <Button
                href="#security-audit"
                variant="underline-light"
                withArrow={false}
                onClick={() => trackEvent("hero_cta_click", { source: "hero_secondary" })}
              >
                Tell Us Your Security Problem
              </Button>
            </motion.div>

            <motion.div
              custom={5}
              initial="hidden"
              animate={revealed ? "shown" : "hidden"}
              variants={copyVariants}
              className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-6"
            >
              {TRUST_ITEMS.map((item, i) => (
                <span
                  key={item}
                  className="flex items-center gap-5 text-[0.65rem] font-semibold tracking-widest2 text-white/40"
                >
                  {item}
                  {i < TRUST_ITEMS.length - 1 && <span className="h-1 w-1 rounded-full bg-white/25" />}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
