"use client";

import { useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { PropertyScene } from "./PropertyScene";
import { JourneyIndicator } from "./JourneyIndicator";
import { HeroCopy } from "./HeroCopy";
import { Container } from "../../Container";
import { bump, riseAndHold } from "./motion-utils";

export function HeroDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scan = useTransform(scrollYProgress, (v) => bump(v, 0, 0.16, 0.16, 0.2));
  const camera = useTransform(scrollYProgress, (v) => riseAndHold(v, 0, 0.06));
  const zoneB = useTransform(scrollYProgress, (v) => riseAndHold(v, 0.22, 0.36));
  const zoneA = useTransform(scrollYProgress, (v) => riseAndHold(v, 0.28, 0.42));
  const blind = useTransform(scrollYProgress, (v) => riseAndHold(v, 0.46, 0.58));
  const optimize = useTransform(scrollYProgress, (v) => riseAndHold(v, 0.68, 0.8));

  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.45) setActiveIndex(0);
    else if (v < 0.65) setActiveIndex(1);
    else if (v < 0.85) setActiveIndex(2);
    else setActiveIndex(3);
  });

  return (
    <section ref={ref} className="relative hidden bg-onyx lg:block" style={{ height: "260vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute -inset-y-16 inset-x-0" style={{ y: parallaxY }}>
          <PropertyScene
            camera={camera}
            zoneA={zoneA}
            zoneB={zoneB}
            blind={blind}
            optimize={optimize}
            scan={scan}
            className="absolute inset-0"
          />
        </motion.div>

        <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-onyx/55 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full max-w-2xl bg-gradient-to-r from-onyx/40 via-onyx/12 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-onyx/60 to-transparent" />

        <Container className="relative flex h-full flex-col justify-center pb-24 pt-20">
          <HeroCopy ctaSource="hero_desktop" className="max-w-xl" />
        </Container>

        <Container className="absolute inset-x-0 bottom-10 flex items-center justify-between gap-10">
          <motion.button
            type="button"
            onClick={() => window.scrollBy({ top: window.innerHeight * 0.5, behavior: "smooth" })}
            style={{ opacity: cueOpacity }}
            className="flex shrink-0 items-center gap-4 text-left"
            aria-label="Scroll to see how 3NETRA eliminates blind spots"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white/80">
              <ArrowDown size={15} />
            </span>
            <span className="text-[0.65rem] font-semibold uppercase leading-tight tracking-widest2 text-white/55">
              Scroll to see
              <br />
              how 3NETRA eliminates blind spots
            </span>
          </motion.button>

          <JourneyIndicator
            activeIndex={activeIndex}
            lineWidth={lineWidth}
            className="hidden w-full max-w-md xl:flex"
          />
        </Container>
      </div>
    </section>
  );
}
