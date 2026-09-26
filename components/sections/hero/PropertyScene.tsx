"use client";

import Image from "next/image";
import { MotionValue, motion, useTransform } from "framer-motion";
import heroProperty from "@/public/images/hero-property.webp";

/**
 * The real architectural photograph with a security-visualization layer on
 * top. The SVG overlay shares the photo's exact native aspect ratio (and the
 * same slice/alignment as the <Image>'s object-fit), so every marker stays
 * pixel-locked to the property regardless of how the frame gets cropped at
 * a given viewport — the same photo, the same crop, drawn twice.
 */
export function PropertyScene({
  camera,
  zoneA,
  zoneB,
  blind,
  optimize,
  scan,
  viewBox = "0 0 1672 941",
  objectPosition = "center center",
  className,
}: {
  camera: MotionValue<number>;
  zoneA: MotionValue<number>;
  zoneB: MotionValue<number>;
  blind: MotionValue<number>;
  optimize: MotionValue<number>;
  scan: MotionValue<number>;
  /** The visible crop window, in the photo's own 1672x941 coordinate space. */
  viewBox?: string;
  objectPosition?: string;
  className?: string;
}) {
  const cameraOpacity = useTransform(camera, (v) => v * 0.9);

  // One bold coverage beam (zoneA/zoneB still drive it in a soft cascade —
  // whichever has risen further wins — so callers don't need to change
  // their staggered timing to get a single merged shape).
  const coverageOpacity = useTransform([zoneA, zoneB], ([a, b]: number[]) => Math.max(a, b) * 0.42);

  // Blind-spot marker fades in, then hands off to the optimized wash.
  const blindOpacity = useTransform([blind, optimize], ([b, o]: number[]) => b * (1 - o));
  const optimizeOpacity = useTransform(optimize, (v) => v);
  const optimizeWashOpacity = useTransform(optimize, (v) => v * 0.32);

  const scanY = useTransform(scan, [0, 1], [70, 860]);
  const scanOpacity = useTransform(scan, [0, 0.15, 0.85, 1], [0, 0.85, 0.85, 0]);

  return (
    <div className={className}>
      <Image
        src={heroProperty}
        alt="A modern residence at dusk, with camera coverage mapped across the entry and driveway"
        fill
        priority
        sizes="100vw"
        quality={88}
        style={{ objectFit: "cover", objectPosition }}
        className="select-none"
      />

      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <style>
            {
              "text { font-family: var(--font-body), Manrope, sans-serif; }"
            }
          </style>
        </defs>

        {/* SCAN — a single sweeping scan line */}
        <motion.rect
          x="0"
          width="1672"
          height="3"
          fill="#F7F4EF"
          style={{ y: scanY, opacity: scanOpacity }}
        />

        {/* Camera mount */}
        <motion.g transform="translate(1180,450) rotate(15)" style={{ opacity: cameraOpacity }}>
          <rect x="0" y="0" width="30" height="15" rx="2" fill="none" stroke="#F7F4EF" strokeWidth="1.8" />
          <circle cx="30" cy="7.5" r="5.5" fill="none" stroke="#F7F4EF" strokeWidth="1.8" />
        </motion.g>

        {/* CAMERA COVERAGE — one bold beam from the mount across the
            driveway and gate, stopping short of the blind-spot box
            (x < 1180) so the two never visually contradict each other. */}
        <motion.polygon
          points="1195,457 650,830 1150,830"
          fill="#17534F"
          stroke="#A9D2CB"
          strokeWidth="1.5"
          style={{ opacity: coverageOpacity }}
        />

        {/* BLIND SPOT — exterior perimeter wall, right of the gate.
            Kept inside x:[180,1500] — the crop window that survives a
            "slice" fit at both the widest (ultrawide) and narrowest
            (near-square) desktop viewports we support. */}
        <motion.g style={{ opacity: blindOpacity }}>
          <rect
            x="1180"
            y="380"
            width="320"
            height="340"
            rx="6"
            fill="none"
            stroke="#B07878"
            strokeWidth="2"
            strokeDasharray="9 6"
          />
          <line x1="1180" y1="380" x2="1143" y2="343" stroke="#B07878" strokeWidth="1.5" />
          <circle cx="1132" cy="332" r="12" fill="#C0554F" />
          <text x="1132" y="337" fontSize="15" fontWeight="700" fill="#F7F4EF" textAnchor="middle">
            !
          </text>
          <rect x="1152" y="313" width="150" height="40" rx="3" fill="#111111" opacity="0.82" />
          <text x="1166" y="332" fontSize="12.5" letterSpacing="0.8" fill="#F7F4EF" fontWeight="600">
            BLIND SPOT
          </text>
          <text x="1166" y="348" fontSize="12.5" letterSpacing="0.8" fill="#D99C8A" fontWeight="600">
            DETECTED
          </text>
        </motion.g>

        {/* OPTIMIZED — the same zone, resolved */}
        <motion.rect
          x="1180"
          y="380"
          width="320"
          height="340"
          rx="6"
          fill="#0F3D3A"
          stroke="#17534F"
          strokeWidth="1.5"
          style={{ opacity: optimizeWashOpacity }}
        />
        <motion.g style={{ opacity: optimizeOpacity }}>
          <line x1="1180" y1="380" x2="1143" y2="343" stroke="#17534F" strokeWidth="1.5" />
          <circle cx="1132" cy="332" r="12" fill="#17534F" />
          <path d="M1126,332 L1130,337 L1139,326" fill="none" stroke="#F7F4EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="1152" y="313" width="185" height="40" rx="3" fill="#111111" opacity="0.82" />
          <text x="1166" y="332" fontSize="12.5" letterSpacing="0.8" fill="#F7F4EF" fontWeight="600">
            SECURITY COVERAGE
          </text>
          <text x="1166" y="348" fontSize="12.5" letterSpacing="0.8" fill="#8FBBB6" fontWeight="600">
            OPTIMIZED
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
