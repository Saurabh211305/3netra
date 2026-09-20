"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { Button } from "../Button";

const STATUS_ROWS = [
  { label: "Cameras", value: "24 / 24 Online", tone: "positive" as const },
  { label: "Storage", value: "92% Health", tone: "positive" as const },
  { label: "Network", value: "Stable", tone: "positive" as const },
  { label: "Recording", value: "Active", tone: "positive" as const },
  { label: "Maintenance", value: "Up To Date", tone: "positive" as const },
];

const METRICS = [
  { value: 5, suffix: "", label: "Security Stages" },
  { value: 360, suffix: "°", label: "Property View" },
  { value: 6, suffix: "+", label: "Solution Categories" },
  { value: 24, suffix: "/7", label: "Continuous Security Infrastructure" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1000;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <span ref={ref} className="font-serif text-5xl text-onyx md:text-6xl">
      {value}
      {suffix}
    </span>
  );
}

export function SecurityHealthDashboard() {
  return (
    <section className="bg-pearl py-24 md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col justify-between gap-12">
            <SectionHeading
              eyebrow="Beyond Installation"
              title={
                <>
                  Installation is day one.
                  <br />
                  Security is every day after.
                </>
              }
              description="Cameras need maintenance. Storage needs monitoring. Hardware fails. Requirements change. 3NETRA helps keep your security infrastructure ready after installation."
            />

            <Reveal delay={0.1} className="grid grid-cols-2 gap-x-8 gap-y-10">
              {METRICS.map((m) => (
                <div key={m.label}>
                  <Counter to={m.value} suffix={m.suffix} />
                  <p className="mt-2 text-xs uppercase tracking-widest2 text-grey-soft">
                    {m.label}
                  </p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.15} className="flex flex-wrap gap-4">
              <Button href="#security-audit" variant="secondary">
                Protect My Security System
              </Button>
              <Button href="#security-audit" variant="ghost-dark" withArrow={false}>
                Book AMC Consultation
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-sm border border-onyx/10 bg-onyx p-7 text-white md:p-9">
              <div className="mb-7 flex items-center justify-between">
                <p className="eyebrow text-white/50">System Status</p>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.6rem] uppercase tracking-widest2 text-white/50">
                  Illustrative — Conceptual Preview
                </span>
              </div>
              <div className="flex flex-col divide-y divide-white/10">
                {STATUS_ROWS.map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-4">
                    <span className="text-sm text-white/60">{row.label}</span>
                    <span className="flex items-center gap-2 text-sm font-medium text-white">
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-pine-light"
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
