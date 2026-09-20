"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../Button";
import { Container } from "../Container";
import { ImageSlot } from "../ImageSlot";
import { SecurityStatus } from "../SecurityStatus";
import { trackEvent } from "@/lib/analytics";

const TRUST_ITEMS = ["CCTV", "AI SURVEILLANCE", "ACCESS CONTROL", "MONITORING", "AMC"];

export function Hero() {
  const [coverageOptimized, setCoverageOptimized] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setCoverageOptimized(true), 3400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-pearl pt-32 pb-16 md:pt-40 md:pb-24">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow mb-6 text-pine"
          >
            Intelligent Security Technology
          </motion.p>

          <h1 className="font-serif text-display-1 text-onyx">
            {["You don't need", "more cameras."].map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
            {["You need", "fewer blind spots."].map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="block text-pine"
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-md text-base leading-relaxed text-grey-soft md:text-lg"
          >
            3NETRA helps you identify security gaps, deploy the right technology and
            keep your property protected beyond installation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button
              href="#security-audit"
              variant="primary"
              onClick={() => trackEvent("hero_cta_click", { source: "hero_primary" })}
            >
              Book a Security Audit
            </Button>
            <Button
              href="#security-audit"
              variant="ghost-dark"
              withArrow={false}
              onClick={() => trackEvent("hero_cta_click", { source: "hero_secondary" })}
            >
              Tell Us Your Security Problem
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-14 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-onyx/10 pt-6"
          >
            {TRUST_ITEMS.map((item, i) => (
              <span key={item} className="flex items-center gap-5 text-[0.68rem] font-semibold tracking-widest2 text-onyx/45">
                {item}
                {i < TRUST_ITEMS.length - 1 && <span className="h-1 w-1 rounded-full bg-onyx/25" />}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <ImageSlot
            palette="onyx"
            assetHint="/images/hero-security.jpg"
            caption="Photography — premium residence, dusk, camera visible on facade"
            className="aspect-[4/5] w-full rounded-sm md:aspect-[5/6]"
          >
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 h-24 bg-gradient-to-b from-pine-light/0 via-pine-light/25 to-pine-light/0"
              animate={{ y: ["0%", "420%"] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="absolute left-6 top-16 flex flex-col gap-3 md:left-8 md:top-20">
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: coverageOptimized ? 0 : 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <SecurityStatus label="Blind Spot Detected" tone="alert" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: coverageOptimized ? 0 : 1, x: 0 }}
                transition={{ duration: 0.5, delay: 2.1 }}
              >
                <SecurityStatus label="Low Visibility Zone" tone="alert" />
              </motion.div>
            </div>

            <motion.div
              className="absolute left-6 top-16 md:left-8 md:top-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: coverageOptimized ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <SecurityStatus label="Security Coverage Optimized" tone="positive" />
            </motion.div>

            <div className="absolute bottom-16 right-6 md:bottom-20 md:right-8">
              <SecurityStatus label="Entry Point" tone="neutral" />
            </div>
          </ImageSlot>
        </motion.div>
      </Container>
    </section>
  );
}
