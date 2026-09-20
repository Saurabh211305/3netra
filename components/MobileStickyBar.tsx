"use client";

import { Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-black/10 bg-white/95 backdrop-blur-lg lg:hidden">
      <a
        href={CONTACT.phoneHref}
        onClick={() => trackEvent("phone_click", { source: "sticky_bar" })}
        className="flex flex-col items-center gap-1 border-r border-black/10 py-3 text-onyx"
      >
        <Phone size={17} strokeWidth={2} />
        <span className="text-[0.62rem] font-semibold uppercase tracking-wide">Call</span>
      </a>
      <a
        href={CONTACT.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { source: "sticky_bar" })}
        className="flex flex-col items-center gap-1 border-r border-black/10 py-3 text-pine"
      >
        <MessageCircle size={17} strokeWidth={2} />
        <span className="text-[0.62rem] font-semibold uppercase tracking-wide">WhatsApp</span>
      </a>
      <a
        href="#security-audit"
        onClick={() => trackEvent("hero_cta_click", { source: "sticky_bar" })}
        className="flex flex-col items-center gap-1 bg-onyx py-3 text-white"
      >
        <ShieldCheck size={17} strokeWidth={2} />
        <span className="text-[0.62rem] font-semibold uppercase tracking-wide">Book Audit</span>
      </a>
    </div>
  );
}
