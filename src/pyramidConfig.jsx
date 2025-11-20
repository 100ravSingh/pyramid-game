// PYRAMID SHAPE  (same as before)
export const ROW_BLOCKS = [
  1,   // Layer 0 (top)
  2,   // Layer 1
  5,   // Layer 2
  10,  // Layer 3
  15,  // Layer 4
  20,  // Layer 5
  25   // Layer 6 (bottom)
];

// POINTS — Difficulty increases bottom → top
export const ROW_POINTS = [
  70,  // Layer 0 (top - hardest)
  60,  // Layer 1
  50,  // Layer 2
  40,  // Layer 3
  30,  // Layer 4
  20,  // Layer 5
  10   // Layer 6 (bottom - easiest)
];

// COLOR GRADIENT — Darker at top (harder)
export const LAYER_COLORS = [
  "#D97706", // Layer 0 top: dark amber (hardest)
  "#F59E0B",
  "#FBBF24",
  "#FFC72A",
  "#FFD84A",
  "#FFE97D",
  "#FFF7B2"  // Layer 6 bottom: light yellow (easiest)
];
