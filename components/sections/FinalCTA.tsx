"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Container } from "../Container";
import { ImageSlot } from "../ImageSlot";
import { Button } from "../Button";
import { CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

type FormState = {
  name: string;
  phone: string;
  propertyType: string;
  location: string;
  requirement: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
  propertyType: "",
  location: "",
  requirement: "",
};

export function FinalCTA() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent("lead_form_submit", { form: "final_cta" });
    trackEvent("proposal_request");
    setSubmitted(true);
  }

  return (
    <section className="relative overflow-hidden bg-onyx py-24 md:py-32">
      <ImageSlot
        palette="onyx"
        assetHint="/images/final-cta-building.jpg"
        caption=""
        frame={false}
        className="absolute inset-0 opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/85 to-onyx/40" />

      <Container className="relative grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <p className="eyebrow mb-6 text-clay-light">Ready When You Are</p>
          <h2 className="font-serif text-display-2 text-white">
            Don&rsquo;t wait for a security problem
            <br />
            to tell you where the gaps are.
          </h2>
          <p className="mt-7 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
            Tell us what you&rsquo;re protecting. We&rsquo;ll help identify what needs to be
            secured.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#security-audit" variant="primary">
              Book My Security Audit
            </Button>
            <Button href="#security-audit" variant="ghost-light" withArrow={false}>
              Tell Us Your Security Problem
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-6">
            <a
              href={CONTACT.phoneHref}
              onClick={() => trackEvent("phone_click", { source: "final_cta" })}
              className="flex items-center gap-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              <Phone size={15} /> Call 3NETRA
            </a>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "final_cta" })}
              className="flex items-center gap-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              <MessageCircle size={15} /> WhatsApp 3NETRA
            </a>
          </div>
        </div>

        <div className="rounded-sm border border-white/12 bg-white/[0.04] p-7 backdrop-blur-sm md:p-9">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4 py-10 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-pine-light/15 text-pine-light">
                  <ShieldCheck size={26} strokeWidth={1.75} />
                </span>
                <h3 className="font-serif text-2xl text-white">Thank you.</h3>
                <p className="max-w-sm text-sm leading-relaxed text-white/60">
                  Your security requirement has been received. Our team will contact you
                  shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                onFocus={() => trackEvent("lead_form_start", { form: "final_cta" })}
                className="flex flex-col gap-4"
              >
                <p className="mb-1 eyebrow text-white/45">Start My Security Assessment</p>
                <Field
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  required
                />
                <Field
                  label="Phone"
                  type="tel"
                  placeholder="+91"
                  value={form.phone}
                  onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                  required
                />
                <Field
                  label="Property Type"
                  value={form.propertyType}
                  onChange={(v) => setForm((f) => ({ ...f, propertyType: v }))}
                  required
                />
                <Field
                  label="Location"
                  value={form.location}
                  onChange={(v) => setForm((f) => ({ ...f, location: v }))}
                  required
                />
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-white/60">Requirement (optional)</span>
                  <textarea
                    rows={3}
                    value={form.requirement}
                    onChange={(e) => setForm((f) => ({ ...f, requirement: e.target.value }))}
                    className="resize-none rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-pine-light"
                  />
                </label>
                <Button type="submit" variant="primary" className="mt-2 w-full justify-center">
                  Start My Security Assessment
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
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
      <span className="font-medium text-white/60">
        {label}
        {required && <span className="text-clay-light"> *</span>}
      </span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-pine-light"
      />
    </label>
  );
}
