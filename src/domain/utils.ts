/**
 * Deterministic pseudo-random number generator based on a seed value.
 *
 * DETERMINISM GUARANTEE: Given the same seed, this function always returns
 * the same value. This is intentional — it ensures consistent visual rendering
 * of tree canopies and other random-looking course features across re-renders.
 *
 * @param seed - A numeric seed value
 * @returns A deterministic pseudo-random number in the range [0, 1)
 */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}
