"use client";

import { MotionValue, motion, useTransform } from "framer-motion";

const WINDOWS = [
  { x: 315, y: 238, lit: false },
  { x: 415, y: 238, lit: true },
  { x: 515, y: 238, lit: false },
  { x: 315, y: 308, lit: false },
  { x: 415, y: 308, lit: false },
  { x: 515, y: 308, lit: true },
  { x: 315, y: 378, lit: true },
  { x: 415, y: 378, lit: false },
  { x: 515, y: 378, lit: false },
];

/**
 * A portrait-composed variant of the Security Layer scene for phone
 * viewports. The desktop scene's wide two-volume layout, when sliced to a
 * narrow aspect ratio, crops into the middle of a single building and loses
 * the property entirely. This composition is narrowed and shifted so both
 * volumes survive a phone-width "slice" crop (viewBox 700x1000, of which
 * roughly x:119–581 stays visible at typical phone aspect ratios) instead
 * of being a shrunk copy of the desktop scene.
 */
export function ArchitecturalSceneMobile({
  fov,
  zoneB,
  blind,
  zoneA,
  recede,
  className,
}: {
  fov: MotionValue<number>;
  zoneB: MotionValue<number>;
  blind: MotionValue<number>;
  zoneA: MotionValue<number>;
  recede: MotionValue<number>;
  className?: string;
}) {
  const fovOpacity = useTransform(fov, (v) => v * 0.85);
  const fovClipWidth = useTransform(fov, [0, 1], [0, 335]);

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
      <svg viewBox="0 0 700 1000" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <linearGradient id="mSkyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CFDAD3" />
            <stop offset="42%" stopColor="#F1EEE7" />
            <stop offset="100%" stopColor="#E3C7BE" />
          </linearGradient>
          <radialGradient id="mHorizonGlow" cx="50%" cy="100%" r="75%">
            <stop offset="0%" stopColor="#D99C8A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#D99C8A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="mGroundGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c1c1c" />
            <stop offset="100%" stopColor="#111111" />
          </linearGradient>
          <linearGradient id="mBuildingShade" x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0%" stopColor="#1f1f1f" />
            <stop offset="100%" stopColor="#0c0c0c" />
          </linearGradient>
          <linearGradient id="mGlassLit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F7F4EF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#B07878" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id="mGlassUnlit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2c2c2c" />
            <stop offset="100%" stopColor="#181818" />
          </linearGradient>
          <radialGradient id="mGrade" cx="50%" cy="34%" r="65%">
            <stop offset="0%" stopColor="#0F3D3A" stopOpacity="0" />
            <stop offset="100%" stopColor="#0A2B29" stopOpacity="0.16" />
          </radialGradient>
          <clipPath id="mFovClip">
            <motion.rect x="280" y="195" width={fovClipWidth} height="270" />
          </clipPath>
        </defs>

        {/* REAL PROPERTY */}
        <rect x="0" y="0" width="700" height="465" fill="url(#mSkyGradient)" />
        <rect x="0" y="200" width="700" height="265" fill="url(#mHorizonGlow)" />
        <rect x="0" y="460" width="700" height="540" fill="url(#mGroundGradient)" />
        <ellipse cx="375" cy="462" rx="300" ry="9" fill="#000000" opacity="0.3" />
        <rect x="0" y="459" width="700" height="2" fill="#0F3D3A" opacity="0.4" />

        {/* Foliage screening the alcove */}
        <path
          d="M82 465 C70 380, 115 310, 170 303 C220 297, 248 340, 238 395 C233 425, 218 452, 198 465 Z"
          fill="#0A2B29"
          opacity="0.94"
        />

        {/* Side alcove — the eventual blind spot */}
        <rect x="125" y="365" width="140" height="95" fill="url(#mBuildingShade)" />
        <rect x="118" y="357" width="154" height="10" fill="#0a0a0a" />
        <rect x="118" y="357" width="154" height="1.4" fill="#0F3D3A" opacity="0.5" />
        <rect x="152" y="393" width="70" height="52" fill="url(#mGlassUnlit)" />

        {/* Main volume */}
        <rect x="285" y="200" width="340" height="260" fill="url(#mBuildingShade)" />
        <rect x="270" y="186" width="370" height="14" fill="#0a0a0a" />
        <rect x="270" y="186" width="370" height="1.4" fill="#0F3D3A" opacity="0.5" />
        {WINDOWS.map((w, i) => (
          <rect
            key={i}
            x={w.x}
            y={w.y}
            width="72"
            height="52"
            fill={w.lit ? "url(#mGlassLit)" : "url(#mGlassUnlit)"}
          />
        ))}

        {/* Camera */}
        <g transform="translate(558,202) rotate(18)" opacity="0.9">
          <rect x="0" y="0" width="26" height="13" rx="2" fill="none" stroke="#F7F4EF" strokeWidth="1.5" />
          <circle cx="26" cy="6.5" r="4.5" fill="none" stroke="#F7F4EF" strokeWidth="1.5" />
        </g>

        {/* CAMERA FIELD OF VIEW */}
        <g clipPath="url(#mFovClip)">
          <motion.polygon points="571,210 305,460 615,460" fill="#0F3D3A" style={{ opacity: fovOpacity }} />
        </g>

        {/* SECURITY ZONE */}
        <motion.rect
          x="305"
          y="215"
          width="300"
          height="250"
          rx="8"
          fill="#0F3D3A"
          style={{ opacity: zoneBOpacity, scale: zoneBScale, transformOrigin: "455px 340px" }}
        />

        {/* BLIND SPOT */}
        <motion.rect
          x="118"
          y="358"
          width="155"
          height="112"
          rx="6"
          fill="none"
          stroke="#B07878"
          strokeWidth="2"
          strokeDasharray="9 6"
          style={{ opacity: blindOpacity }}
        />

        {/* OPTIMIZED COVERAGE */}
        <motion.rect
          x="118"
          y="358"
          width="155"
          height="112"
          rx="6"
          fill="#0F3D3A"
          style={{ opacity: zoneAOpacity, scale: zoneAScale, transformOrigin: "196px 414px" }}
        />

        <rect x="0" y="0" width="700" height="1000" fill="url(#mGrade)" />
      </svg>

      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-onyx via-onyx/10 to-transparent"
        style={{ opacity: scrimOpacity }}
      />
    </motion.div>
  );
}
