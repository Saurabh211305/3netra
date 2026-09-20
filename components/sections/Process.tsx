import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { Button } from "../Button";

const STEPS = [
  { n: "01", title: "Tell Us", body: "Tell us what you need to protect." },
  { n: "02", title: "Assess", body: "We evaluate the property and requirements." },
  { n: "03", title: "Design", body: "We recommend the appropriate security architecture." },
  { n: "04", title: "Deploy", body: "Installation, configuration and testing." },
  { n: "05", title: "Protect", body: "Maintenance, support and future upgrades." },
];

export function Process() {
  return (
    <section id="process" className="bg-white py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title={
            <>
              From problem to protection
              <br />
              in 5 steps.
            </>
          }
          className="mb-16"
        />

        <div className="flex flex-col">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.06}>
              <div className="flex items-center gap-8 border-t border-onyx/10 py-8 last:border-b md:gap-14">
                <span className="w-24 shrink-0 font-serif text-6xl leading-none text-clay md:w-40 md:text-8xl">
                  {step.n}
                </span>
                <div>
                  <h3 className="mb-1.5 text-xl font-semibold text-onyx md:text-2xl">{step.title}</h3>
                  <p className="max-w-md text-sm leading-relaxed text-grey-soft md:text-base">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14 flex flex-wrap gap-4">
          <Button href="#security-audit" variant="secondary">
            Start My Security Journey
          </Button>
          <Button href="#security-audit" variant="ghost-dark" withArrow={false}>
            Book Site Visit
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
