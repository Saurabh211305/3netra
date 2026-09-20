import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { Button } from "../Button";
import { ImageSlot } from "../ImageSlot";

const PROBLEMS = [
  {
    n: "01",
    title: "Blind Spots",
    body: "Areas your cameras simply cannot see.",
  },
  {
    n: "02",
    title: "Wrong Placement",
    body: "More cameras do not fix poor coverage.",
  },
  {
    n: "03",
    title: "No Real-Time Awareness",
    body: "Something happens. Nobody notices.",
  },
  {
    n: "04",
    title: "Unmanaged Access",
    body: "People enter where they should not.",
  },
  {
    n: "05",
    title: "System Downtime",
    body: "A camera can be installed but unavailable when you need it.",
  },
  {
    n: "06",
    title: "No Preventive Maintenance",
    body: "Small failures become major security gaps.",
  },
];

export function ProblemSection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="flex flex-col justify-between gap-12">
            <SectionHeading
              eyebrow="The Problem"
              title={
                <>
                  Your property may be covered.
                  <br />
                  But is it actually secure?
                </>
              }
              description="A camera does not automatically create security. Blind angles, poor placement, inactive equipment, weak storage, delayed response and unmanaged access can leave the same property exposed."
            />
            <Reveal delay={0.15}>
              <Button href="#security-audit" variant="secondary">
                Find My Security Gaps
              </Button>
            </Reveal>
          </div>

          <div className="grid gap-px overflow-hidden rounded-sm bg-grey-light sm:grid-cols-2">
            {PROBLEMS.map((problem, i) => (
              <Reveal key={problem.n} delay={i * 0.06}>
                <div className="flex h-full flex-col gap-4 bg-white p-7 md:p-8">
                  <span className="font-serif text-2xl text-clay">{problem.n}</span>
                  <h3 className="text-base font-semibold text-onyx">{problem.title}</h3>
                  <p className="text-sm leading-relaxed text-grey-soft">{problem.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2} className="mt-16">
          <ImageSlot
            palette="pine"
            assetHint="/images/security-audit.jpg"
            caption="Photography — architectural coverage view, camera sightlines"
            className="aspect-[21/9] w-full rounded-sm"
          />
        </Reveal>
      </Container>
    </section>
  );
}
