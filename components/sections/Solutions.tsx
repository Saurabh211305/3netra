"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { ImageSlot } from "../ImageSlot";
import { trackEvent } from "@/lib/analytics";

const SOLUTIONS = [
  {
    id: "cctv",
    title: "Intelligent CCTV",
    body: "High-definition surveillance designed around actual coverage requirements.",
    cta: "Explore CCTV",
    asset: "/images/intelligent-cctv.jpg",
    palette: "pine" as const,
  },
  {
    id: "ai-surveillance",
    title: "AI Surveillance",
    body: "Detect activity and events that deserve attention.",
    cta: "Explore AI Security",
    asset: "/images/ai-surveillance.jpg",
    palette: "onyx" as const,
  },
  {
    id: "access-control",
    title: "Access Control",
    body: "Control who enters, where they enter and when.",
    cta: "Secure Access",
    asset: "/images/access-control.jpg",
    palette: "clay" as const,
  },
  {
    id: "video-door-phones",
    title: "Video Door Phones",
    body: "Smarter visitor identification and entry management.",
    cta: "Explore",
    asset: "/images/video-door-phones.jpg",
    palette: "pine" as const,
  },
  {
    id: "remote-monitoring",
    title: "Remote Monitoring",
    body: "Stay connected to critical areas beyond the property.",
    cta: "Explore Monitoring",
    asset: "/images/remote-monitoring.jpg",
    palette: "onyx" as const,
  },
  {
    id: "amc-maintenance",
    title: "AMC & Maintenance",
    body: "Keep your security infrastructure operational over time.",
    cta: "Protect My System",
    asset: "/images/amc-maintenance.jpg",
    palette: "clay" as const,
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="bg-white py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Solutions"
          title={
            <>
              One property. Multiple security problems.
              <br />
              One integrated solution.
            </>
          }
          className="mb-14 max-w-2xl"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((solution, i) => (
            <Reveal key={solution.id} delay={i * 0.06}>
              <a
                href="#security-audit"
                onClick={() => trackEvent("solution_click", { solution: solution.id })}
                className="group block"
              >
                <ImageSlot
                  palette={solution.palette}
                  assetHint={solution.asset}
                  zoomOnHover
                  className="aspect-[4/5] w-full rounded-sm"
                >
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                    <h3 className="mb-2 font-serif text-2xl text-white">{solution.title}</h3>
                    <p className="mb-5 max-w-[85%] text-sm leading-relaxed text-white/70">
                      {solution.body}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-pearl">
                      {solution.cta}
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 ease-premium group-hover:translate-x-1.5"
                      />
                    </span>
                  </div>
                </ImageSlot>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
