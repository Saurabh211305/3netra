"use client";

import { MotionValue, motion, useTransform } from "framer-motion";

const WINDOWS_B = [
  { x: 525, y: 150, lit: false },
  { x: 645, y: 150, lit: true },
  { x: 765, y: 150, lit: false },
  { x: 885, y: 150, lit: false },
  { x: 525, y: 260, lit: false },
  { x: 645, y: 260, lit: false },
  { x: 765, y: 260, lit: true },
  { x: 885, y: 260, lit: false },
  { x: 525, y: 370, lit: true },
  { x: 645, y: 370, lit: false },
  { x: 765, y: 370, lit: false },
  { x: 885, y: 370, lit: false },
];

const WINDOWS_A = [
  { x: 150, y: 365, lit: false },
  { x: 250, y: 365, lit: true },
  { x: 350, y: 365, lit: false },
];

/**
 * The 3NETRA "Security Layer" visual language: a real property, rendered as
 * a restrained architectural illustration (never fake photography), onto
 * which security intelligence is progressively layered —
 *
 *   REAL PROPERTY → CAMERA FIELD OF VIEW → SECURITY ZONE → BLIND SPOT → OPTIMIZED COVERAGE
 *
 * Every beat below is driven by a single 0..1 MotionValue supplied by the
 * parent (HeroDesktop drives these from scroll progress, HeroMobile drives
 * them with a timed `animate()` sequence) so the same scene renders both
 * experiences identically.
 */
export function ArchitecturalScene({
  fov,
  zoneB,
  blind,
  zoneA,
  recede,
  fit,
  className,
}: {
  fov: MotionValue<number>;
  zoneB: MotionValue<number>;
  blind: MotionValue<number>;
  zoneA: MotionValue<number>;
  recede: MotionValue<number>;
  /**
   * "cover" (slice) fills the frame edge-to-edge — right for a desktop
   * viewport close to the scene's own 1200:750 aspect. "contain" (meet)
   * keeps the whole property in frame instead of cropping into one
   * building — right for narrow mobile viewports where slicing would zoom
   * into the middle of a single volume and lose the sense of a property.
   */
  fit: "cover" | "contain";
  className?: string;
}) {
  const fovOpacity = useTransform(fov, (v) => v * 0.85);
  const fovClipWidth = useTransform(fov, [0, 1], [0, 520]);

  const zoneBOpacity = useTransform(zoneB, (v) => v * 0.22);
  const zoneBScale = useTransform(zoneB, (v) => 0.97 + v * 0.03);

  const blindOpacity = useTransform(blind, (v) => v);

  const zoneAOpacity = useTransform(zoneA, (v) => v * 0.22);
  const zoneAScale = useTransform(zoneA, (v) => 0.97 + v * 0.03);

  const sceneScale = useTransform(recede, [0, 1], [1, 1.045]);
  const sceneOpacity = useTransform(recede, [0, 1], [1, 0.42]);
  const scrimOpacity = useTransform(recede, [0, 1], [0, 1]);

  return (
    <motion.div
      className={className}
      style={{ scale: sceneScale, opacity: sceneOpacity }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 750"
        preserveAspectRatio={fit === "cover" ? "xMidYMid slice" : "xMidYMid meet"}
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CFDAD3" />
            <stop offset="42%" stopColor="#F1EEE7" />
            <stop offset="100%" stopColor="#E3C7BE" />
          </linearGradient>
          <radialGradient id="horizonGlow" cx="50%" cy="100%" r="75%">
            <stop offset="0%" stopColor="#D99C8A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#D99C8A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="groundGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c1c1c" />
            <stop offset="100%" stopColor="#111111" />
          </linearGradient>
          <linearGradient id="buildingShade" x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0%" stopColor="#1f1f1f" />
            <stop offset="100%" stopColor="#0c0c0c" />
          </linearGradient>
          <linearGradient id="glassLit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F7F4EF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#B07878" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id="glassUnlit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2c2c2c" />
            <stop offset="100%" stopColor="#181818" />
          </linearGradient>
          <radialGradient id="grade" cx="50%" cy="38%" r="70%">
            <stop offset="0%" stopColor="#0F3D3A" stopOpacity="0" />
            <stop offset="100%" stopColor="#0A2B29" stopOpacity="0.16" />
          </radialGradient>
          <clipPath id="fovClip">
            <motion.rect x="480" y="95" width={fovClipWidth} height="390" />
          </clipPath>
        </defs>

        {/* REAL PROPERTY — base architectural scene */}
        <rect x="0" y="0" width="1200" height="478" fill="url(#skyGradient)" />
        <rect x="0" y="180" width="1200" height="298" fill="url(#horizonGlow)" />
        <rect x="0" y="470" width="1200" height="280" fill="url(#groundGradient)" />
        <ellipse cx="600" cy="473" rx="540" ry="10" fill="#000000" opacity="0.3" />
        <rect x="0" y="469" width="1200" height="2" fill="#0F3D3A" opacity="0.4" />

        {/* Foliage silhouette partially screening the side wing */}
        <path
          d="M65 475 C50 380, 105 300, 175 292 C235 285, 270 335, 258 400 C252 435, 235 465, 210 475 Z"
          fill="#0A2B29"
          opacity="0.94"
        />

        {/* Volume A — side wing (the eventual blind spot) */}
        <rect x="100" y="330" width="380" height="145" fill="url(#buildingShade)" />
        <rect x="88" y="317" width="404" height="14" fill="#0a0a0a" />
        <rect x="88" y="317" width="404" height="1.5" fill="#0F3D3A" opacity="0.5" />
        {WINDOWS_A.map((w, i) => (
          <rect
            key={`a-${i}`}
            x={w.x}
            y={w.y}
            width="80"
            height="70"
            fill={w.lit ? "url(#glassLit)" : "url(#glassUnlit)"}
          />
        ))}

        {/* Volume B — main block */}
        <rect x="470" y="110" width="560" height="365" fill="url(#buildingShade)" />
        <rect x="450" y="96" width="600" height="16" fill="#0a0a0a" />
        <rect x="450" y="96" width="600" height="1.5" fill="#0F3D3A" opacity="0.5" />
        {WINDOWS_B.map((w, i) => (
          <rect
            key={`b-${i}`}
            x={w.x}
            y={w.y}
            width="90"
            height="80"
            fill={w.lit ? "url(#glassLit)" : "url(#glassUnlit)"}
          />
        ))}

        {/* Camera — part of the system, not the focal point */}
        <g transform="translate(905,112) rotate(18)" opacity="0.9">
          <rect x="0" y="0" width="28" height="14" rx="2" fill="none" stroke="#F7F4EF" strokeWidth="1.6" />
          <circle cx="28" cy="7" r="5" fill="none" stroke="#F7F4EF" strokeWidth="1.6" />
        </g>

        {/* CAMERA FIELD OF VIEW — tracks left to right across the main block */}
        <g clipPath="url(#fovClip)">
          <motion.polygon
            points="919,120 495,475 995,475"
            fill="#0F3D3A"
            style={{ opacity: fovOpacity }}
          />
        </g>

        {/* SECURITY ZONE — confirmed coverage wash over the main block */}
        <motion.rect
          x="495"
          y="135"
          width="500"
          height="345"
          rx="8"
          fill="#0F3D3A"
          style={{ opacity: zoneBOpacity, scale: zoneBScale, transformOrigin: "745px 307px" }}
        />

        {/* BLIND SPOT — dashed outline over the side wing */}
        <motion.rect
          x="95"
          y="325"
          width="390"
          height="155"
          rx="6"
          fill="none"
          stroke="#B07878"
          strokeWidth="2"
          strokeDasharray="10 7"
          style={{ opacity: blindOpacity }}
        />

        {/* OPTIMIZED COVERAGE — the same zone, resolved */}
        <motion.rect
          x="95"
          y="325"
          width="390"
          height="155"
          rx="6"
          fill="#0F3D3A"
          style={{ opacity: zoneAOpacity, scale: zoneAScale, transformOrigin: "290px 402px" }}
        />

        <rect x="0" y="0" width="1200" height="750" fill="url(#grade)" />
      </svg>

      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-onyx via-onyx/10 to-transparent"
        style={{ opacity: scrimOpacity }}
      />
    </motion.div>
  );
}
