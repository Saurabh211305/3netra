"use client";

import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { ImageSlot } from "../ImageSlot";
import { Reveal } from "../Reveal";
import { trackEvent } from "@/lib/analytics";

const INDUSTRIES = [
  {
    id: "home",
    title: "Home",
    body: "Protect the people and spaces that matter.",
    cta: "Secure My Home",
    asset: "/images/industry-home.jpg",
    palette: "pearl" as const,
  },
  {
    id: "business",
    title: "Business",
    body: "Protect employees, customers, assets and operations.",
    cta: "Secure My Business",
    asset: "/images/industry-business.jpg",
    palette: "pine" as const,
  },
  {
    id: "industrial",
    title: "Industrial",
    body: "Perimeter, production, inventory and restricted areas.",
    cta: "Secure My Facility",
    asset: "/images/industry-industrial.jpg",
    palette: "onyx" as const,
  },
  {
    id: "construction",
    title: "Construction",
    body: "Monitor materials, equipment, access and site activity.",
    cta: "Secure My Site",
    asset: "/images/industry-construction.jpg",
    palette: "clay" as const,
  },
  {
    id: "institutional",
    title: "Institutional",
    body: "Security for high-footfall environments.",
    cta: "Discuss My Requirement",
    asset: "/images/industry-institutional.jpg",
    palette: "pine" as const,
  },
  {
    id: "government",
    title: "Government",
    body: "Security infrastructure designed around site requirements.",
    cta: "Discuss a Project",
    asset: "/images/industry-government.jpg",
    palette: "onyx" as const,
  },
];

export function Industries() {
  return (
    <section id="industries" className="bg-pearl py-24 md:py-32">
      <Container className="mb-12">
        <SectionHeading
          eyebrow="Industries"
          title={
            <>
              Different properties.
              <br />
              Different threats.
            </>
          }
        />
      </Container>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:px-10 lg:px-16">
        {INDUSTRIES.map((industry, i) => (
          <Reveal key={industry.id} delay={i * 0.05} className="shrink-0 snap-start">
            <a
              href="#security-audit"
              onClick={() => trackEvent("industry_click", { industry: industry.id })}
              className="group block w-[78vw] sm:w-[46vw] md:w-[32vw] lg:w-[22vw]"
            >
              <ImageSlot
                palette={industry.palette}
                assetHint={industry.asset}
                zoomOnHover
                className="aspect-[3/4] w-full rounded-sm"
              >
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="mb-2 font-serif text-xl text-white">{industry.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-white/70">{industry.body}</p>
                  <span className="text-xs font-semibold uppercase tracking-widest2 text-pearl">
                    {industry.cta} →
                  </span>
                </div>
              </ImageSlot>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
