"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { HeroDesktop } from "./hero/HeroDesktop";
import { HeroMobile } from "./hero/HeroMobile";
import { HeroStatic } from "./hero/HeroStatic";

export function Hero() {
  const reduceMotion = useReducedMotion();

  // useReducedMotion reads matchMedia synchronously, which the server can't
  // do — so its value differs between the SSR pass and the client's first
  // render. Rendering off it directly would hydrate one tree and immediately
  // swap to another. Render the static tree everywhere until mounted (server
  // and client agree on that), then switch to the animated build once the
  // browser confirms it's safe to.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || reduceMotion) {
    return (
      <div id="top">
        <HeroStatic />
        <div id="hero-sentinel" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div id="top">
      <HeroDesktop />
      <HeroMobile />
      {/* Both hero variants end in a 100svh sticky viewport that releases
          into normal flow one screen-height before the tall scroll-track's
          own end — pulling the sentinel up by the same 100svh lands its top
          edge exactly at that release point, on both breakpoints, without
          hardcoding either variant's track height. A sentinel placed at the
          track's literal end (net 0 offset) would fire ~100vh too late,
          leaving the navbar transparent over already-visible page content. */}
      <div id="hero-sentinel" aria-hidden="true" style={{ height: "100svh", marginTop: "-100svh" }} />
    </div>
  );
}
