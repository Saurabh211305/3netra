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
  const cameraOpacity = useTransform(camera, (v) => v * 0.85);

  // One restrained coverage field (zoneA/zoneB still drive it in a soft
  // cascade — whichever has risen further wins — so callers don't need to
  // change their staggered timing to get a single merged shape).
  const coverageOpacity = useTransform([zoneA, zoneB], ([a, b]: number[]) => Math.max(a, b));

  // Blind-spot marker fades in, then hands off to the optimized wash.
  const blindOpacity = useTransform([blind, optimize], ([b, o]: number[]) => b * (1 - o));
  const optimizeOpacity = useTransform(optimize, (v) => v);
  const optimizeWashOpacity = useTransform(optimize, (v) => v * 0.16);

  const scanY = useTransform(scan, [0, 1], [70, 860]);
  const scanOpacity = useTransform(scan, [0, 0.15, 0.85, 1], [0, 0.7, 0.7, 0]);

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
          <style>{"text { font-family: var(--font-body), Manrope, sans-serif; }"}</style>
          <radialGradient id="coverageField" cx="1195" cy="457" r="620" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#17534F" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#17534F" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#17534F" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* SCAN — a single sweeping scan line */}
        <motion.rect
          x="0"
          width="1672"
          height="1.5"
          fill="#F7F4EF"
          style={{ y: scanY, opacity: scanOpacity }}
        />

        {/* Camera mount */}
        <motion.g transform="translate(1180,450) rotate(15)" style={{ opacity: cameraOpacity }}>
          <rect x="0" y="0" width="26" height="13" rx="2" fill="none" stroke="#F7F4EF" strokeWidth="1.4" />
          <circle cx="26" cy="6.5" r="4.5" fill="none" stroke="#F7F4EF" strokeWidth="1.4" />
        </motion.g>

        {/* CAMERA COVERAGE — a restrained field-of-view: soft gradient fill,
            thin boundary, following the driveway toward the gate. Stops
            short of the blind-spot marker (x < 1180) so the two never
            visually contradict each other. */}
        <motion.polygon
          points="1195,457 650,830 1150,830"
          fill="url(#coverageField)"
          style={{ opacity: coverageOpacity }}
        />
        <motion.polygon
          points="1195,457 650,830 1150,830"
          fill="none"
          stroke="#8FBBB6"
          strokeWidth="1"
          style={{ opacity: useTransform(coverageOpacity, (v) => v * 0.8) }}
        />
        <motion.g style={{ opacity: useTransform(coverageOpacity, (v) => v * 0.85) }}>
          <line x1="1000" y1="780" x2="1000" y2="765" stroke="#8FBBB6" strokeWidth="1" />
          <text x="1008" y="782" fontSize="10.5" letterSpacing="1.2" fill="#D7E7E4">
            DRIVEWAY COVERAGE
          </text>
        </motion.g>

        {/* BLIND SPOT — a restrained target marker, not a large box. Kept
            inside x:[1130,1400] — the crop window that survives a "slice"
            fit at the desktop viewports we support. */}
        <motion.g style={{ opacity: blindOpacity }}>
          {[
            "M1170,410 L1170,395 L1185,395",
            "M1345,395 L1360,395 L1360,410",
            "M1360,570 L1360,585 L1345,585",
            "M1185,585 L1170,585 L1170,570",
          ].map((d) => (
            <path key={d} d={d} fill="none" stroke="#B07878" strokeWidth="1.5" />
          ))}
          <circle cx="1265" cy="490" r="13" fill="none" stroke="#B07878" strokeWidth="1.3" />
          <circle cx="1265" cy="490" r="2" fill="#B07878" />
          <line x1="1265" y1="503" x2="1265" y2="513" stroke="#B07878" strokeWidth="1.3" />
          <line x1="1265" y1="467" x2="1265" y2="477" stroke="#B07878" strokeWidth="1.3" />
          <line x1="1278" y1="490" x2="1288" y2="490" stroke="#B07878" strokeWidth="1.3" />
          <line x1="1242" y1="490" x2="1252" y2="490" stroke="#B07878" strokeWidth="1.3" />

          <rect x="1152" y="320" width="148" height="42" rx="2" fill="#111111" opacity="0.55" />
          <text x="1164" y="339" fontSize="12" letterSpacing="0.8" fill="#F7F4EF" fontWeight="600">
            BLIND SPOT DETECTED
          </text>
          <text x="1164" y="355" fontSize="10.5" letterSpacing="0.8" fill="#D9BDBD">
            REAR PERIMETER
          </text>
          <line x1="1230" y1="362" x2="1250" y2="478" stroke="#B07878" strokeWidth="1" opacity="0.6" />
        </motion.g>

        {/* OPTIMIZED — the same zone, resolved */}
        <motion.rect
          x="1170"
          y="395"
          width="190"
          height="190"
          rx="4"
          fill="#0F3D3A"
          style={{ opacity: optimizeWashOpacity }}
        />
        <motion.g style={{ opacity: optimizeOpacity }}>
          <circle cx="1265" cy="490" r="13" fill="none" stroke="#17534F" strokeWidth="1.3" />
          <path
            d="M1259,490 L1263,495 L1272,483"
            fill="none"
            stroke="#17534F"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="1152" y="320" width="185" height="42" rx="2" fill="#111111" opacity="0.55" />
          <text x="1164" y="339" fontSize="12" letterSpacing="0.8" fill="#F7F4EF" fontWeight="600">
            SECURITY COVERAGE
          </text>
          <text x="1164" y="355" fontSize="10.5" letterSpacing="0.8" fill="#8FBBB6">
            OPTIMIZED
          </text>
          <line x1="1230" y1="362" x2="1250" y2="478" stroke="#17534F" strokeWidth="1" opacity="0.6" />
        </motion.g>
      </svg>
    </div>
  );
}
