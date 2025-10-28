// src/lib/nlp-response-generator.ts
// Improved version — clear paragraph output, optional humor

interface KnowledgeEntry {
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

interface NLPResponse {
  text: string;
  confidence: number;
}

export type HumorLevel = "none" | "light" | "medium";

// ——— Utilities ———
function lcFirst(s: string) {
  return s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}
function clamp(str: string, max = 1000): string {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

// ——— Humor settings ———
const OPENERS = [
  "Here’s a quick overview:",
  "Sure — here’s what I found:",
  "Here’s a summary of his work:",
];
const CLOSERS = [
  "Hope that gives you a good picture!",
  "That’s the overview — clean and concise.",
  "And that’s how everything fits together.",
];
const QUIPS = [
  "Structured like clean code — readable and balanced.",
  "Simple, clear, and straight to the point.",
  "No TL;DR needed this time.",
  "Readable as a good commit message.",
];
const EMOJI = ["🤖", "💡", "🎯", "📚", "🧩"];
const pick = <T>(a: T[]) => a[Math.floor(Math.random() * a.length)];

function humorize(
  core: string,
  opts?: { level?: HumorLevel; bullets?: string[] }
): string {
  const level = opts?.level ?? "light";
  if (level === "none") return core;

  const opener = pick(OPENERS);
  const closer = pick(CLOSERS);
  const quip = pick(QUIPS);
  const emoji = pick(EMOJI);

  const bullets =
    opts?.bullets && opts.bullets.length
      ? "\n• " + opts.bullets.join("\n• ")
      : "";

  // Add proper newlines for readability
  return `${opener}\n\n${core}${bullets}\n\n${quip} ${emoji}\n${closer}`;
}

// ——— Keyword & query logic ———
function extractKeywords(query: string): string[] {
  const normalized = query.toLowerCase();
  const words = normalized.split(/\s+/);
  const stopWords = new Set([
    "what",
    "when",
    "where",
    "who",
    "how",
    "why",
    "is",
    "are",
    "was",
    "were",
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "from",
    "about",
    "can",
    "could",
    "would",
    "should",
    "do",
    "does",
    "did",
    "have",
    "has",
    "had",
    "tell",
    "me",
    "your",
    "you",
    "please",
    "give",
    "info",
    "information",
    "more",
    "him",
    "his",
  ]);
  return words.filter((w) => !stopWords.has(w) && w.length > 2);
}

function detectQuestionType(query: string): string {
  const q = query.toLowerCase();
  if (/^(what|which)/.test(q)) return "what";
  if (/^(who|whose)/.test(q)) return "who";
  if (/^(when|what time)/.test(q)) return "when";
  if (/^(where)/.test(q)) return "where";
  if (/^(how|in what way)/.test(q)) return "how";
  if (/^(why|what.*reason)/.test(q)) return "why";
  if (/^(can|could|is|are|do|does)/.test(q)) return "yes_no";
  return "general";
}

function detectExplicitCategory(query: string): string | null {
  const q = query.toLowerCase();
  if (q.includes("soft skill")) return "soft_skills";
  if (q.includes("hard skill") || q.includes("technical skill"))
    return "programming";
  if (q.includes("programming") || q.includes("coding")) return "programming";
  if (q.includes("academic") || q.includes("education")) return "academics";
  if (q.includes("project")) return "projects";
  if (q.includes("club") || q.includes("activity")) return "activities";
  if (
    q.includes("achievement") ||
    q.includes("award") ||
    q.includes("certificate")
  )
    return "achievements";
  if (q.includes("language") || q.includes("ielts") || q.includes("jlpt"))
    return "languages";
  if (q.includes("interest") || q.includes("goal")) return "interests";
  if (q.includes("about") || q.includes("overview") || q.includes("profile"))
    return "about";
  return null;
}

// ——— Response synthesis ———
function synthesizeResponse(
  query: string,
  knowledgeEntries: KnowledgeEntry[]
): NLPResponse {
  if (knowledgeEntries.length === 0) {
    return {
      text: "I don’t have specific info on that. Try asking about his academics, projects, programming, or achievements.",
      confidence: 0.3,
    };
  }

  const questionType = detectQuestionType(query);
  const keywords = extractKeywords(query);
  const explicitCategory = detectExplicitCategory(query);

  const scoredEntries = knowledgeEntries.map((entry) => {
    let score = 0;
    const entryText = `${entry.question} ${entry.answer}`.toLowerCase();

    for (const k of keywords) if (entryText.includes(k)) score += 2;

    const qWords = query.toLowerCase().split(/\s+/);
    const eWords = entry.question.toLowerCase().split(/\s+/);
    score += qWords.filter((w) => eWords.includes(w)).length;

    if (entry.category === "about" || entry.category === "projects")
      score += 0.5;
    if (explicitCategory && entry.category === explicitCategory) score += 8;

    return { entry, score };
  });

  scoredEntries.sort((a, b) => b.score - a.score);

  const topEntries = scoredEntries.slice(0, 3);
  const confidence = Math.min(0.9, 0.5 + (topEntries[0]?.score ?? 0) * 0.1);

  let response = "";
  if (topEntries.length === 1) {
    response = formatSingleAnswer(topEntries[0].entry, questionType);
  } else if (
    topEntries.length > 1 &&
    topEntries[0].entry.category === topEntries[1].entry.category
  ) {
    response = formatMultipleAnswers(
      topEntries.map((e) => e.entry),
      questionType
    );
  } else {
    response = formatCategorizedAnswers(
      topEntries.map((e) => e.entry),
      questionType
    );
  }

  return { text: clamp(response), confidence };
}

function formatSingleAnswer(entry: KnowledgeEntry, _qt: string): string {
  return entry.answer;
}

function formatMultipleAnswers(entries: KnowledgeEntry[], _qt: string): string {
  if (entries.length === 0) return "";
  if (entries.length === 1) return entries[0].answer;
  if (entries.length === 2)
    return `${entries[0].answer}\n\nAdditionally, ${lcFirst(
      entries[1].answer
    )}`;

  let response = entries[0].answer;
  for (let i = 1; i < entries.length - 1; i++)
    response += `\n\n${entries[i].answer}`;
  response += `\n\nFurthermore, ${lcFirst(entries[entries.length - 1].answer)}`;
  return response;
}

function formatCategorizedAnswers(
  entries: KnowledgeEntry[],
  _qt: string
): string {
  const byCat = new Map<string, KnowledgeEntry[]>();
  for (const e of entries) {
    if (!byCat.has(e.category)) byCat.set(e.category, []);
    byCat.get(e.category)!.push(e);
  }

  const cats = Array.from(byCat.entries());
  if (cats.length === 1) return formatMultipleAnswers(cats[0][1], _qt);

  let response = cats[0][1][0].answer;
  for (let i = 1; i < cats.length; i++) {
    const [category, group] = cats[i];
    if (!group.length) continue;
    response += `\n\nIn terms of ${category.toLowerCase()}, ${lcFirst(
      group[0].answer
    )}`;
  }
  return response;
}

// ——— Public API ———
export function generateNLPResponse(
  query: string,
  knowledgeEntries: KnowledgeEntry[],
  humor: HumorLevel = "light",
  showBullets = false
): string {
  const result = synthesizeResponse(query, knowledgeEntries);

  let core =
    result.confidence < 0.5
      ? `Based on what I know, ${lcFirst(result.text)}`
      : result.text;

  const bullets = showBullets
    ? knowledgeEntries.slice(0, 3).map((e) => `(${e.category}) ${e.question}`)
    : undefined;

  // Add humor only when confident
  if (result.confidence > 0.5) return humorize(core, { level: humor, bullets });
  return core;
}

export function generateNLPResponseStream(
  query: string,
  knowledgeEntries: KnowledgeEntry[],
  humor: HumorLevel = "light",
  showBullets = false
): string {
  return generateNLPResponse(query, knowledgeEntries, humor, showBullets);
}
