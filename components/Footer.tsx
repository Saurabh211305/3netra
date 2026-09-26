import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { CONTACT } from "@/lib/contact";

const FOOTER_COLUMNS = [
  {
    title: "Solutions",
    links: ["CCTV", "AI Surveillance", "Access Control", "Video Door Phones", "Monitoring", "AMC"],
  },
  {
    title: "Company",
    links: ["About", "Industries", "How It Works", "Contact"],
  },
  {
    title: "Support",
    links: ["Book Service", "Request Site Visit", "AMC", "Customer Support"],
  },
];

const LEGAL_LINKS = ["Privacy Policy", "Terms", "Cookie Policy"];

export function Footer() {
  return (
    <footer className="bg-charcoal pb-8 pt-20 text-white/70">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo />
            <p className="eyebrow mt-6 text-white/40">
              Intelligent Security.
              <br />
              A Safer Tomorrow.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-white/40">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#security-audit" className="text-sm text-white/65 transition-colors hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-white/40">
                Contact
              </p>
              <ul className="flex flex-col gap-2.5 text-sm text-white/65">
                <li className="flex items-center gap-2">
                  <Phone size={13} /> <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle size={13} />
                  <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={13} /> <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={13} /> {CONTACT.location}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} 3NETRA. All rights reserved.</p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <a key={link} href="#" className="transition-colors hover:text-white/70">
                {link}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
