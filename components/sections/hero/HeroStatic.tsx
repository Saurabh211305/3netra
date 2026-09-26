"use client";

import { useMotionValue } from "framer-motion";
import { PropertyScene } from "./PropertyScene";
import { JourneyIndicator } from "./JourneyIndicator";
import { HeroCopy } from "./HeroCopy";
import { Container } from "../../Container";

/**
 * prefers-reduced-motion fallback: the settled PROTECT state, rendered once,
 * no pin and no scroll-driven sequence. Desktop and mobile still get their
 * own composition here, same as the animated build — the security labels
 * are positioned in photo coordinates that only survive a wide crop, so
 * reusing the desktop layout at phone width would overlap them with the
 * copy column.
 */
export function HeroStatic() {
  const camera = useMotionValue(1);
  const zoneA = useMotionValue(1);
  const zoneB = useMotionValue(1);
  const blind = useMotionValue(0);
  const optimize = useMotionValue(1);
  const scan = useMotionValue(0);
  const lineWidth = useMotionValue("100%");

  return (
    <>
      <section className="relative hidden min-h-screen flex-col overflow-hidden bg-onyx lg:flex">
        <PropertyScene
          camera={camera}
          zoneA={zoneA}
          zoneB={zoneB}
          blind={blind}
          optimize={optimize}
          scan={scan}
          className="absolute inset-0"
        />

        <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-onyx/75 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full max-w-2xl bg-gradient-to-r from-onyx/88 via-onyx/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-onyx/85 to-transparent" />

        <Container className="relative flex h-full flex-1 flex-col justify-center pb-24 pt-20">
          <HeroCopy ctaSource="hero_static_desktop" className="max-w-xl" />
        </Container>

        <Container className="relative pb-10">
          <JourneyIndicator activeIndex={3} lineWidth={lineWidth} className="hidden w-full max-w-md xl:flex" />
        </Container>
      </section>

      <div className="lg:hidden">
        <section className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden bg-onyx px-6 pb-14 pt-28">
          <div className="absolute inset-0 bg-gradient-to-b from-onyx via-onyx/80 to-onyx" />
          <HeroCopy ctaSource="hero_static_mobile" className="relative" />
        </section>

        <section className="relative flex h-[100svh] flex-col overflow-hidden bg-onyx">
          <div className="relative h-[64svh] shrink-0 overflow-hidden">
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
            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-onyx to-transparent" />
          </div>

          <Container className="relative flex flex-1 flex-col justify-center">
            <JourneyIndicator activeIndex={3} lineWidth={lineWidth} />
          </Container>
        </section>
      </div>
    </>
  );
}
