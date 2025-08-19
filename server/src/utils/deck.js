import crypto from "crypto";

export const ROLES = ["dictator", "mafia", "assassin", "thief", "magician"];
export const COPIES_PER_ROLE = 3;

export function generateCardId(role, i) {
  const uuid = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
  return `${role}-${i + 1}-${uuid}`;
}

export function buildBaseDeck() {
  const deck = [];
  for (const role of ROLES) {
    for (let i = 0; i < COPIES_PER_ROLE; i++) {
      deck.push({ id: generateCardId(role, i), role });
    }
  }
  return deck;
}

// Fisher–Yates shuffle
export function shuffle(array, rng = Math.random) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Optional deterministic RNG
export function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
