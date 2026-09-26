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

  const zoneAOpacity = useTransform(zoneA, (v) => v * 0.34);
  const zoneALabelOpacity = useTransform(zoneA, (v) => v);

  const zoneBOpacity = useTransform(zoneB, (v) => v * 0.34);
  const zoneBLabelOpacity = useTransform(zoneB, (v) => v);

  // Blind-spot brackets fade in, then hand off to the optimized wash.
  const blindOpacity = useTransform([blind, optimize], ([b, o]: number[]) => b * (1 - o));
  const optimizeOpacity = useTransform(optimize, (v) => v);
  const optimizeWashOpacity = useTransform(optimize, (v) => v * 0.3);

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

        {/* CAM 02 — Driveway coverage */}
        <motion.polygon
          points="905,545 1110,548 1130,652 878,652"
          fill="#0F3D3A"
          stroke="#8FBBB6"
          strokeWidth="1.25"
          style={{ opacity: zoneBOpacity }}
        />
        <motion.g style={{ opacity: zoneBLabelOpacity }}>
          <rect x="878" y="503" width="205" height="34" rx="3" fill="#111111" opacity="0.72" />
          <circle cx="896" cy="520" r="3.5" fill="#17534F" />
          <text x="910" y="525" fontSize="13" letterSpacing="0.5" fill="#F7F4EF">
            CAM 02 · DRIVEWAY
          </text>
        </motion.g>

        {/* CAM 01 — Front entry coverage */}
        <motion.polygon
          points="985,612 1120,612 1160,825 865,825"
          fill="#0F3D3A"
          stroke="#8FBBB6"
          strokeWidth="1.25"
          style={{ opacity: zoneAOpacity }}
        />
        <motion.g style={{ opacity: zoneALabelOpacity }}>
          <rect x="865" y="573" width="225" height="34" rx="3" fill="#111111" opacity="0.72" />
          <circle cx="883" cy="590" r="3.5" fill="#17534F" />
          <text x="897" y="595" fontSize="13" letterSpacing="0.5" fill="#F7F4EF">
            CAM 01 · FRONT ENTRY
          </text>
        </motion.g>

        {/* BLIND SPOT — exterior perimeter wall, right of the gate.
            Kept inside x:[180,1500] — the crop window that survives a
            "slice" fit at both the widest (ultrawide) and narrowest
            (near-square) desktop viewports we support. */}
        <motion.g style={{ opacity: blindOpacity }}>
          {[
            "M1180,410 L1180,380 L1210,380",
            "M1470,380 L1500,380 L1500,410",
            "M1500,690 L1500,720 L1470,720",
            "M1210,720 L1180,720 L1180,690",
          ].map((d) => (
            <path key={d} d={d} fill="none" stroke="#B07878" strokeWidth="2.5" />
          ))}
          <circle cx="1180" cy="378" r="4.5" fill="#B07878" />
          <line x1="1180" y1="378" x2="1150" y2="345" stroke="#B07878" strokeWidth="1.5" />
          <rect x="990" y="305" width="165" height="46" rx="3" fill="#111111" opacity="0.78" />
          <text x="1006" y="325" fontSize="12.5" letterSpacing="0.8" fill="#B07878" fontWeight="600">
            BLIND SPOT
          </text>
          <text x="1006" y="342" fontSize="12.5" letterSpacing="0.8" fill="#F7F4EF" fontWeight="600">
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
          <circle cx="1180" cy="378" r="4.5" fill="#17534F" />
          <line x1="1180" y1="378" x2="1150" y2="345" stroke="#17534F" strokeWidth="1.5" />
          <rect x="955" y="305" width="200" height="46" rx="3" fill="#111111" opacity="0.78" />
          <text x="971" y="325" fontSize="12.5" letterSpacing="0.8" fill="#F7F4EF" fontWeight="600">
            SECURITY COVERAGE
          </text>
          <text x="971" y="342" fontSize="12.5" letterSpacing="0.8" fill="#8FBBB6" fontWeight="600">
            OPTIMIZED
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
