"use client";

import { useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { PropertyScene } from "./PropertyScene";
import { JourneyIndicator } from "./JourneyIndicator";
import { HeroCopy } from "./HeroCopy";
import { Container } from "../../Container";
import { bump, riseAndHold } from "./motion-utils";
import heroProperty from "@/public/images/hero-property.webp";

/**
 * Mobile keeps the same real photo and the same Security Layer story, but
 * as its own composition rather than a shrunk desktop layout: the brand
 * message reads first in normal flow (no text-over-photo legibility risk),
 * then a shorter pinned block carries the SCAN → PROTECT sequence on an
 * image crop biased toward the gate/driveway/perimeter — the side of the
 * photo the security markers actually live on.
 */
export function HeroMobile() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scan = useTransform(scrollYProgress, (v) => bump(v, 0, 0.16, 0.16, 0.2));
  const camera = useTransform(scrollYProgress, (v) => riseAndHold(v, 0, 0.06));
  const zoneB = useTransform(scrollYProgress, (v) => riseAndHold(v, 0.22, 0.36));
  const zoneA = useTransform(scrollYProgress, (v) => riseAndHold(v, 0.28, 0.42));
  const blind = useTransform(scrollYProgress, (v) => riseAndHold(v, 0.46, 0.58));
  const optimize = useTransform(scrollYProgress, (v) => riseAndHold(v, 0.68, 0.8));

  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.45) setActiveIndex(0);
    else if (v < 0.65) setActiveIndex(1);
    else if (v < 0.85) setActiveIndex(2);
    else setActiveIndex(3);
  });

  return (
    <div className="lg:hidden">
      <section className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden bg-onyx px-6 pb-14 pt-28">
        <Image
          src={heroProperty}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={60}
          style={{ objectFit: "cover", objectPosition: "80% center" }}
          className="pointer-events-none select-none opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-onyx/92 via-onyx/65 to-onyx/92" />
        <HeroCopy ctaSource="hero_mobile" className="relative" />
      </section>

      <section ref={ref} className="relative bg-onyx" style={{ height: "180vh" }}>
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden bg-onyx">
          {/* A defined image block, not an edge-to-edge bleed: mobile's tall,
              narrow viewport would otherwise force a "cover" crop so severe
              the gate/driveway/blind-spot markers fall out of frame entirely. */}
          <div className="relative h-[64svh] shrink-0 overflow-hidden">
            <motion.div className="absolute -inset-y-8 inset-x-0" style={{ y: parallaxY }}>
              <PropertyScene
                camera={camera}
                zoneA={zoneA}
                zoneB={zoneB}
                blind={blind}
                optimize={optimize}
                scan={scan}
                viewBox="780 40 850 861"
                objectPosition="72% center"
                className="absolute inset-0"
              />
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-onyx to-transparent" />
          </div>

          <Container className="relative flex flex-1 flex-col justify-center gap-6">
            <motion.button
              type="button"
              onClick={() => window.scrollBy({ top: window.innerHeight * 0.5, behavior: "smooth" })}
              style={{ opacity: cueOpacity }}
              className="flex items-center gap-3"
              aria-label="Scroll to see how 3NETRA eliminates blind spots"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white/80">
                <ArrowDown size={13} />
              </span>
              <span className="text-[0.6rem] font-semibold uppercase leading-tight tracking-widest2 text-white/55">
                Scroll to see how 3NETRA
                <br />
                eliminates blind spots
              </span>
            </motion.button>

            <JourneyIndicator activeIndex={activeIndex} lineWidth={lineWidth} />
          </Container>
        </div>
      </section>
    </div>
  );
}
