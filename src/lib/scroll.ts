/**
 * Custom damping function to smoothly interpolate values toward targets without maath dependency.
 * @param current Current value
 * @param target Target value
 * @param lambda Smoothing factor (higher is faster)
 * @param delta Elapsed time in seconds
 */
export function damp(current: number, target: number, lambda: number, delta: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}

/**
 * Clamp a number between min and max bounds.
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

/**
 * Linearly interpolate between a and b.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
