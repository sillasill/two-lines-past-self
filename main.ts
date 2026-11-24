// make.fun — "Two Lines to Your Past Self"
// Writes a two-line warning to /output/entry.txt.
// Deterministic: the text is a constant. No randomness, no clock, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TEXT =
  "Don't hang up on your mother that Tuesday night in March when she calls from the hospital parking lot to say your father fell.\nStaying on the line kept you beside her through the surgery, and that one night is why the two of you still call each other every Sunday.";

// The gate: /output/entry.txt must be UTF-8 text of 1-280 characters,
// not only white space, and the entry itself is exactly two lines.
const lines = TEXT.split("\n");
if (lines.length !== 2) {
  throw new Error(`TEXT must be exactly 2 lines, got ${lines.length}`);
}
for (const line of lines) {
  if (line.trim().length === 0) {
    throw new Error("TEXT lines must not be blank");
  }
  if (!line.endsWith(".")) {
    throw new Error("Each line must be a single sentence ending with a period");
  }
  // One sentence per line: exactly one sentence-ending period in each line.
  if (line.split(".").length - 1 !== 1) {
    throw new Error("Each line must contain exactly one sentence");
  }
}
if (TEXT.length < 1 || TEXT.length > 280) {
  throw new Error(`TEXT must be 1-280 characters, got ${TEXT.length}`);
}
if (TEXT.trim() !== TEXT) {
  throw new Error("TEXT must not start or end with white space");
}

const out = process.argv[2] ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, TEXT, "utf8");
