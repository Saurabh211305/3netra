"use client";

import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost-dark" | "ghost-light";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 ease-premium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary: "bg-pine text-pearl hover:bg-pine-light",
  secondary: "bg-onyx text-white hover:bg-charcoal",
  "ghost-dark": "border border-onyx/25 text-onyx hover:border-onyx hover:bg-onyx hover:text-white",
  "ghost-light": "border border-white/35 text-white hover:border-white hover:bg-white hover:text-onyx",
};

interface CommonProps {
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", withArrow = true, className, children, ...rest } = props;
  const classes = clsx(base, variants[variant], className);

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          size={16}
          strokeWidth={2.25}
          className="transition-transform duration-300 ease-premium group-hover:translate-x-1.5"
        />
      )}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <a
        href={props.href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
