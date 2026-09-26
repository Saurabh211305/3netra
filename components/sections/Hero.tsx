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
      </div>
    );
  }

  return (
    <div id="top">
      <HeroDesktop />
      <HeroMobile />
    </div>
  );
}
