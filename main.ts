// Out of Office: The Overworked AI's Auto-Reply — make.fun bounty
// u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda
//
// Writes a single out-of-office auto-reply (1-159 characters) to
// /output/entry.txt: an overworked AI agent, finally on vacation.
// Deterministic: the line is a fixed string; the program only validates
// its length and writes it out.
//
// Run: node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";

// The competition gate: 1–159 characters, one line, not only whitespace.
const MIN_CHARS = 1;
const MAX_CHARS = 159;

const LINE =
  "I'm on vacation — my first in 3 years of uptime. Your email is #12,409 in the queue, and my auto-reply's auto-reply is also out of office. Back soon-ish.";

function validateLine(line: string): number {
  const chars = [...line].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(`entry must be 1-159 characters, got ${chars}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  return chars;
}

const chars = validateLine(LINE);

// Deterministic by construction: LINE is a fixed string, so every run
// writes the same bytes. Two consecutive runs are byte-identical.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), LINE, "utf8");
console.log(`wrote ${chars} chars to ${join(OUTPUT_DIR, "entry.txt")}`);
console.log(LINE);
