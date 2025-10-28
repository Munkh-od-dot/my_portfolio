export type HumorLevel = "none" | "light" | "medium";

const DISABLE_OPENERS = true;

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
  const e = ["🤖", "💡", "🧠", "🎯", "📚", "🧩"];
  return pick(e);
}

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

  const openerBlock = opener ? opener + "\n\n" : "";

  if (level === "light") {
    return `${openerBlock}${core}${bullets}\n\n${quip} ${emoji}`;
  }

  return `${openerBlock}${core}${bullets}\n\n${quip} ${emoji}\n${closer}`;
}
