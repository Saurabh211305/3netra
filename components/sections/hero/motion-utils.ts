/**
 * Maps a linear 0..1 progress value onto a "hill": silent until `inStart`,
 * ramps up to 1 across [inStart, inEnd], holds at 1 until `outStart`, then
 * ramps back down to 0 across [outStart, outEnd]. Used to stage each Security
 * Layer beat (rise, hold, hand off) from a single continuous scroll fraction.
 */
export function bump(v: number, inStart: number, inEnd: number, outStart: number, outEnd: number) {
  if (v <= inStart) return 0;
  if (v < inEnd) return (v - inStart) / (inEnd - inStart);
  if (v <= outStart) return 1;
  if (v < outEnd) return 1 - (v - outStart) / (outEnd - outStart);
  return 0;
}

/** Same as `bump`, but never falls back down — holds at 1 once reached. */
export function riseAndHold(v: number, inStart: number, inEnd: number) {
  if (v <= inStart) return 0;
  if (v < inEnd) return (v - inStart) / (inEnd - inStart);
  return 1;
}

export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;
