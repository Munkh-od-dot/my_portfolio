// src/lib/humor.ts
export type HumorLevel = "none" | "light" | "medium";

/**
 * Config: if true, NEVER prepend an opener like "TL;DR".
 * You can also set this from an env var when bundling.
 */
const DISABLE_OPENERS = true;

// Gentle, admissions-safe variants (no TL;DR by default)
const openers = DISABLE_OPENERS
  ? [""]
  : [
      "Here’s a quick overview:",
      "Sure — here’s what I found:",
      "Here’s a summary:",
    ];

const closers = [
  "Hope that gives you a clear picture.",
  "That’s the overview — clean and concise.",
  "Thanks for reading!",
];

const quips = [
  "Structured like clean code — readable and balanced.",
  "Simple, clear, and straight to the point.",
  "Readable as a good commit message.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function oneEmoji(): string {
  // Keep it subtle & admissions-safe
  const e = ["🤖", "💡", "🧠", "🎯", "📚", "🧩"];
  return pick(e);
}

/**
 * humorize(core, { level, addBullets })
 * - Adds *optional* opener/closer/quip with clean newlines.
 * - If level === "none", returns core untouched.
 * - If DISABLE_OPENERS is true, no opener text is added.
 */
export function humorize(
  core: string,
  opts: { level?: HumorLevel; addBullets?: string[] } = {}
): string {
  const level = opts.level ?? "light";
  if (level === "none") return core;

  const opener = pick(openers);
  const closer = pick(closers);
  const quip = pick(quips);
  const emoji = oneEmoji();

  const bullets =
    opts.addBullets && opts.addBullets.length
      ? "\n• " + opts.addBullets.join("\n• ")
      : "";

  // Build with real line breaks so paragraphs render nicely
  const openerBlock = opener ? opener + "\n\n" : "";

  if (level === "light") {
    return `${openerBlock}${core}${bullets}\n\n${quip} ${emoji}`;
  }

  // medium: add a closer line too
  return `${openerBlock}${core}${bullets}\n\n${quip} ${emoji}\n${closer}`;
}
