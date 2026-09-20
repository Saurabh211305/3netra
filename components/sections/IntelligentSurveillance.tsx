"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { Button } from "../Button";
import { ImageSlot } from "../ImageSlot";
import { SecurityStatus } from "../SecurityStatus";

const DETECTIONS = [
  { label: "Person Detected", style: { left: "18%", top: "38%", width: "16%", height: "34%" } },
  { label: "Vehicle Detected", style: { left: "58%", top: "52%", width: "24%", height: "20%" } },
  { label: "Perimeter Movement", style: { left: "40%", top: "20%", width: "14%", height: "16%" } },
];

export function IntelligentSurveillance() {
  const [intelligentMode, setIntelligentMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setIntelligentMode((v) => !v), 4200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="intelligent-surveillance" className="bg-white py-24 md:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <SectionHeading
            eyebrow="Intelligent Surveillance"
            title={
              <>
                From recording what happened
                <br />
                to understanding what happened.
              </>
            }
            description="Traditional surveillance gives you footage. Intelligent surveillance helps identify events that deserve attention."
          />
          <div className="mt-9">
            <Button href="#security-audit" variant="secondary">
              Explore Intelligent Surveillance
            </Button>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <ImageSlot
            palette="onyx"
            assetHint="/images/ai-surveillance.jpg"
            caption="Photography — surveillance monitoring room"
            className="aspect-[4/3] w-full rounded-sm"
          >
            <div className="absolute left-5 top-5">
              <SecurityStatus
                label={intelligentMode ? "Intelligent Event Detection" : "Normal Camera Feed"}
                tone={intelligentMode ? "positive" : "neutral"}
              />
            </div>

            <AnimatePresence>
              {intelligentMode &&
                DETECTIONS.map((d, i) => (
                  <motion.div
                    key={d.label}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute rounded-sm border border-pine-light/80"
                    style={d.style}
                  >
                    <span className="absolute -top-6 left-0 whitespace-nowrap rounded-sm bg-pine-light/95 px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-wide text-white">
                      {d.label}
                    </span>
                  </motion.div>
                ))}
            </AnimatePresence>
          </ImageSlot>
        </div>
      </Container>
    </section>
  );
}
