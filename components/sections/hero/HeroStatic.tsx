"use client";

import { useMotionValue } from "framer-motion";
import { ArchitecturalScene } from "./ArchitecturalScene";
import { Button } from "../../Button";
import { trackEvent } from "@/lib/analytics";

const TRUST_ITEMS = ["CCTV", "AI SURVEILLANCE", "ACCESS CONTROL", "MONITORING", "AMC"];

/**
 * prefers-reduced-motion fallback. No pin, no scroll-jacking, no timed
 * sequence — the Security Layer story is told as a single settled
 * composition instead of an animation.
 */
export function HeroStatic() {
  const fov = useMotionValue(0);
  const zoneB = useMotionValue(1);
  const blind = useMotionValue(0);
  const zoneA = useMotionValue(1);
  const recede = useMotionValue(1);

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-onyx">
      <ArchitecturalScene
        fov={fov}
        zoneB={zoneB}
        blind={blind}
        zoneA={zoneA}
        recede={recede}
        fit="cover"
        className="absolute inset-0"
      />

      <div className="relative mt-auto px-6 pb-14 pt-32 lg:px-16 lg:pb-16">
        <div className="mx-auto max-w-content lg:px-0">
          <p className="eyebrow mb-5 text-clay-light lg:mb-6">Intelligent Security Technology</p>

          <h1 className="max-w-3xl">
            <span className="block font-serif text-4xl leading-[1.05] text-white lg:text-display-2">
              You don&rsquo;t need more cameras.
            </span>
            <span className="mt-1 block font-serif text-5xl italic leading-[1.02] text-clay-light lg:text-display-1">
              You need fewer blind spots.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 lg:mt-7 lg:text-lg">
            3NETRA identifies security gaps, designs the right protection system and
            keeps it working beyond installation.
          </p>

          <div className="mt-8 flex flex-col items-start gap-5 lg:mt-10 lg:flex-row lg:items-center lg:gap-8">
            <Button
              href="#security-audit"
              variant="solid-ivory"
              className="w-full justify-center sm:w-auto"
              onClick={() => trackEvent("hero_cta_click", { source: "hero_primary_static" })}
            >
              Book a Security Audit
            </Button>
            <Button
              href="#security-audit"
              variant="underline-light"
              withArrow={false}
              onClick={() => trackEvent("hero_cta_click", { source: "hero_secondary_static" })}
            >
              Tell Us Your Security Problem
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-6">
            {TRUST_ITEMS.map((item, i) => (
              <span
                key={item}
                className="flex items-center gap-5 text-[0.65rem] font-semibold tracking-widest2 text-white/40"
              >
                {item}
                {i < TRUST_ITEMS.length - 1 && <span className="h-1 w-1 rounded-full bg-white/25" />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
