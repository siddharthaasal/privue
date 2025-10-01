function fade(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number) {
  return a + t * (b - a);
}

function grad(hash: number, x: number, y: number) {
  const h = hash & 3;
  const u = h < 2 ? x : y;
  const v = h < 2 ? y : x;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

// Generate permutation table once
const perm = new Uint8Array(512);
const p = new Uint8Array(256);
for (let i = 0; i < 256; i++) p[i] = i;
for (let i = 0; i < 256; i++) {
  const r = i + Math.floor(Math.random() * (256 - i));
  [p[i], p[r]] = [p[r], p[i]];
}
for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

/**
 * 2D Perlin noise function
 * @param x X coordinate
 * @param y Y coordinate
 * @returns noise value between -1 and 1
 */
export function perlin2(x: number, y: number): number {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;

  x -= Math.floor(x);
  y -= Math.floor(y);

  const u = fade(x);
  const v = fade(y);

  const A = perm[X] + Y;
  const B = perm[X + 1] + Y;

  return lerp(
    lerp(grad(perm[A], x, y), grad(perm[B], x - 1, y), u),
    lerp(grad(perm[A + 1], x, y - 1), grad(perm[B + 1], x - 1, y - 1), u),
    v,
  );
}
