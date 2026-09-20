import clsx from "clsx";

const PALETTES = {
  pine: "from-pine-dark via-pine to-[#1c433f]",
  onyx: "from-charcoal via-onyx to-[#1a1a1a]",
  clay: "from-clay-dark via-clay to-[#9c6c6c]",
  pearl: "from-[#e9d6cd] via-pearl to-white",
};

/**
 * Clearly-defined image slot standing in for real commercial photography.
 * Swap the inner element for a Next <Image> pointed at /images/<file> once
 * licensed photography is supplied — filename suggested via `assetHint`.
 */
export function ImageSlot({
  palette = "pine",
  assetHint,
  caption,
  className,
  frame = true,
  zoomOnHover = false,
  children,
}: {
  palette?: keyof typeof PALETTES;
  assetHint: string;
  caption?: string;
  className?: string;
  frame?: boolean;
  zoomOnHover?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      data-image-slot={assetHint}
      className={clsx("relative overflow-hidden", className)}
    >
      <div
        className={clsx(
          "absolute inset-0 bg-gradient-to-br transition-transform duration-700 ease-premium",
          PALETTES[palette],
          zoomOnHover && "group-hover:scale-[1.06]"
        )}
      >
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.28)_100%)]" />
      </div>

      {frame && (
        <>
          <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-white/35 md:left-6 md:top-6 md:h-6 md:w-6" />
          <span className="absolute right-4 top-4 h-4 w-4 border-r border-t border-white/35 md:right-6 md:top-6 md:h-6 md:w-6" />
          <span className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-white/35 md:bottom-6 md:left-6 md:h-6 md:w-6" />
          <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-white/35 md:bottom-6 md:right-6 md:h-6 md:w-6" />
        </>
      )}

      {caption && (
        <p className="absolute bottom-5 left-6 max-w-[75%] text-[0.65rem] uppercase tracking-widest2 text-white/55 md:bottom-7 md:left-8">
          {caption}
        </p>
      )}

      {children}
    </div>
  );
}
