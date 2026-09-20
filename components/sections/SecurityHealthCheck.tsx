"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MessageCircle, ShieldCheck } from "lucide-react";
import clsx from "clsx";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { Button } from "../Button";
import { CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

const PROPERTY_TYPES = [
  "Home",
  "Office",
  "Factory",
  "Warehouse",
  "Construction Site",
  "School",
  "Hotel",
  "Retail",
  "Other",
];

const CURRENT_SETUP = [
  "CCTV",
  "AI Cameras",
  "Access Control",
  "Video Door Phone",
  "Alarm System",
  "Remote Monitoring",
  "None",
];

const CONCERNS = [
  "Theft",
  "Unauthorized Entry",
  "Employee Monitoring",
  "Asset Protection",
  "Perimeter Security",
  "Remote Monitoring",
  "Existing System Failure",
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  location: string;
};

export function SecurityHealthCheck() {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [setup, setSetup] = useState<string[]>([]);
  const [concern, setConcern] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", phone: "", email: "", location: "" });

  const totalSteps = 4; // 0,1,2 = questions, 3 = contact capture
  const progress = useMemo(() => ((step + 1) / totalSteps) * 100, [step]);

  function markStarted() {
    if (!started) {
      setStarted(true);
      trackEvent("security_audit_start");
    }
  }

  function toggleSetup(item: string) {
    markStarted();
    setSetup((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  }

  function selectProperty(item: string) {
    markStarted();
    setPropertyType(item);
    setStep(1);
  }

  function selectConcern(item: string) {
    setConcern(item);
    setStep(3);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent("security_audit_complete", {
      propertyType,
      setup,
      concern,
    });
    trackEvent("lead_form_submit", { form: "security_health_check" });
    setSubmitted(true);
  }

  return (
    <section id="security-audit" className="bg-pearl py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Security Health Check"
          title="How secure is your property?"
          description="Answer a few questions and identify the areas that may need attention."
          align="center"
          className="mx-auto mb-14 max-w-2xl"
        />

        <div className="mx-auto max-w-2xl overflow-hidden rounded-sm border border-onyx/10 bg-white shadow-[0_30px_80px_-40px_rgba(15,61,58,0.35)]">
          <div className="h-1 w-full bg-grey-light">
            <motion.div
              className="h-full bg-pine"
              animate={{ width: `${submitted ? 100 : progress}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center gap-4 py-6 text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-pine/10 text-pine">
                    <ShieldCheck size={26} strokeWidth={1.75} />
                  </span>
                  <h3 className="font-serif text-2xl text-onyx">Thank you.</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-grey-soft">
                    Your security requirement has been received. Our team will contact you
                    shortly to walk through your assessment.
                  </p>
                </motion.div>
              ) : step === 0 ? (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <QuestionLabel step="Step 01" question="What are you securing?" />
                  <OptionGrid>
                    {PROPERTY_TYPES.map((item) => (
                      <OptionButton
                        key={item}
                        label={item}
                        selected={propertyType === item}
                        onClick={() => selectProperty(item)}
                      />
                    ))}
                  </OptionGrid>
                </motion.div>
              ) : step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <QuestionLabel step="Step 02" question="What do you currently have?" />
                  <OptionGrid>
                    {CURRENT_SETUP.map((item) => (
                      <OptionButton
                        key={item}
                        label={item}
                        selected={setup.includes(item)}
                        onClick={() => toggleSetup(item)}
                      />
                    ))}
                  </OptionGrid>
                  <div className="mt-8 flex justify-end">
                    <Button variant="secondary" withArrow onClick={() => setStep(2)}>
                      Continue
                    </Button>
                  </div>
                </motion.div>
              ) : step === 2 ? (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <QuestionLabel step="Step 03" question="What is your biggest concern?" />
                  <OptionGrid>
                    {CONCERNS.map((item) => (
                      <OptionButton
                        key={item}
                        label={item}
                        selected={concern === item}
                        onClick={() => selectConcern(item)}
                      />
                    ))}
                  </OptionGrid>
                </motion.div>
              ) : (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-7 flex items-center gap-2.5 text-pine">
                    <Check size={16} strokeWidth={2.5} />
                    <span className="text-sm font-semibold uppercase tracking-wide">
                      Security Assessment Ready
                    </span>
                  </div>
                  <h3 className="mb-1 font-serif text-2xl text-onyx">
                    Where should we send it?
                  </h3>
                  <p className="mb-7 text-sm text-grey-soft">
                    Share your details and a security expert will reach out with your
                    assessment.
                  </p>

                  <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Name"
                      value={form.name}
                      onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                      required
                    />
                    <Field
                      label="Phone"
                      type="tel"
                      value={form.phone}
                      onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                      placeholder="+91"
                      required
                    />
                    <Field
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    />
                    <Field
                      label="Location"
                      value={form.location}
                      onChange={(v) => setForm((f) => ({ ...f, location: v }))}
                      required
                    />
                    <div className="mt-2 flex flex-wrap gap-4 sm:col-span-2">
                      <Button type="submit" variant="primary">
                        Get My Security Assessment
                      </Button>
                      <Button
                        href={CONTACT.whatsappHref}
                        variant="ghost-dark"
                        withArrow={false}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent("whatsapp_click", { source: "health_check" })}
                      >
                        <MessageCircle size={15} className="mr-1.5" />
                        WhatsApp Instead
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}

function QuestionLabel({ step, question }: { step: string; question: string }) {
  return (
    <div className="mb-7">
      <p className="eyebrow mb-2 text-clay">{step}</p>
      <h3 className="font-serif text-2xl text-onyx md:text-[1.75rem]">{question}</h3>
    </div>
  );
}

function OptionGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{children}</div>;
}

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={clsx(
        "rounded-sm border px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ease-premium",
        selected
          ? "border-pine bg-pine text-pearl"
          : "border-onyx/12 text-onyx/80 hover:border-onyx/40"
      )}
    >
      {label}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-onyx/70">
        {label}
        {required && <span className="text-clay"> *</span>}
      </span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-sm border border-onyx/15 bg-white px-4 py-3 text-onyx outline-none transition-colors focus:border-pine"
      />
    </label>
  );
}
