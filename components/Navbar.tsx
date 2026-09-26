"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { Container } from "./Container";
import { CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

const NAV_LINKS = [
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "Technology", href: "#intelligent-surveillance" },
  { label: "Our Approach", href: "#process" },
  { label: "Resources", href: "#security-audit" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium",
        scrolled
          ? "border-b border-black/5 bg-white/80 backdrop-blur-lg"
          : "bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <a href="#top" aria-label="3NETRA home">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm font-medium transition-colors",
                scrolled ? "text-onyx/75 hover:text-onyx" : "text-white/80 hover:text-white"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={CONTACT.phoneHref}
            onClick={() => trackEvent("phone_click", { source: "navbar" })}
            className={clsx(
              "flex items-center gap-2 text-sm font-medium transition-colors",
              scrolled ? "text-onyx/75 hover:text-onyx" : "text-white/85 hover:text-white"
            )}
          >
            <Phone size={15} />
            {CONTACT.phoneDisplay}
          </a>
          <Button
            href="#security-audit"
            variant={scrolled ? "primary" : "solid-ivory"}
            className="py-3 text-[0.8rem]"
            onClick={() => trackEvent("hero_cta_click", { source: "navbar" })}
          >
            Book a Security Audit
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-full border lg:hidden",
            scrolled ? "border-onyx/15 text-onyx" : "border-white/25 text-white"
          )}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-black/5 bg-white lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-black/5 py-4 text-base font-medium text-onyx"
                >
                  {link.label}
                </a>
              ))}
              <Button href="#security-audit" variant="primary" className="mt-5 w-full" onClick={() => setOpen(false)}>
                Book Security Audit
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
