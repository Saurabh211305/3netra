"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { Button } from "../Button";

const STAGES = [
  { n: "01", title: "Assess", body: "Identify vulnerabilities and blind spots." },
  { n: "02", title: "Design", body: "Build the right surveillance architecture." },
  { n: "03", title: "Deploy", body: "Professional installation and configuration." },
  { n: "04", title: "Monitor", body: "Create visibility across critical areas." },
  { n: "05", title: "Maintain", body: "Keep your security infrastructure operational." },
  { n: "06", title: "Improve", body: "Upgrade as requirements evolve." },
];

export function SecuritySystem() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(STAGES.length - 1, Math.floor(v * STAGES.length));
    setActive(idx);
  });

  return (
    <section ref={ref} className="relative bg-onyx" style={{ height: `${STAGES.length * 34}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
        <Container>
          <SectionHeading
            eyebrow="The 3NETRA Security System"
            title="Security is more than a camera."
            description="We assess the problem, design the right security architecture, deploy the technology and help keep it operational."
            tone="light"
            className="mb-14"
          />

          <div className="relative mb-10 h-px w-full bg-white/12">
            <motion.div className="absolute left-0 top-0 h-px bg-clay" style={{ width: lineWidth }} />
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {STAGES.map((stage, i) => (
              <div
                key={stage.n}
                className={clsx(
                  "flex flex-col gap-3 border-t pt-5 transition-all duration-500 ease-premium",
                  i <= active ? "border-clay opacity-100" : "border-white/12 opacity-40"
                )}
              >
                <span
                  className={clsx(
                    "font-serif text-2xl transition-colors duration-500",
                    i <= active ? "text-clay" : "text-white/50"
                  )}
                >
                  {stage.n}
                </span>
                <h3 className="text-base font-semibold text-white">{stage.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{stage.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <Button href="#security-audit" variant="ghost-light">
              Build My Security System
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
