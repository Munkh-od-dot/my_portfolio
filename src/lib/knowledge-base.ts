// src/lib/knowledge-base.ts
// Curated info about the portfolio owner (third-person, admissions-friendly)

export interface KnowledgeEntry {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
}

export const knowledgeBase: KnowledgeEntry[] = [
  // ——— About ———
  {
    id: "about-1",
    category: "about",
    question: "Who is he? (overview)",
    answer:
      "He is a curious, hands-on student who blends strategy, design, and code. From Go boards to Git branches, he likes solving real problems with clean architecture, well-named variables, and collaborative workflows.",
    keywords: ["about", "overview", "bio", "summary", "profile"],
  },

  // ——— Academics ———
  {
    id: "academics-1",
    category: "academics",
    question: "What is his academic profile?",
    answer:
      "A well-rounded student with strong quantitative leanings and an eye for system design. In classes and internships he’s led collaborative projects, presented findings, and improved public speaking, coordination, and documentation.",
    keywords: [
      "academics",
      "education",
      "school",
      "grades",
      "study",
      "research",
      "presentation",
      "quantitative",
    ],
  },

  // ——— Programming / CS (hard skills) ———
  {
    id: "prog-1",
    category: "programming",
    question: "What are his programming skills?",
    answer:
      "Comfortable with C, Python, JavaScript/TypeScript, HTML, and CSS. Uses Next.js/React + Tailwind/ShadCN UI on the front end, Django on the back end, and small ML pipelines in Python. Daily Git/GitHub (branches, PRs, reviews). He cares about trade-offs, readable APIs, and practical data modeling.",
    keywords: [
      "programming",
      "coding",
      "developer",
      "python",
      "javascript",
      "typescript",
      "c language",
      "html",
      "css",
      "next.js",
      "react",
      "django",
      "git",
      "github",
      "api design",
      "architecture",
      "trade-offs",
    ],
  },

  // ——— Soft skills (kept separate on purpose) ———
  {
    id: "soft-1",
    category: "soft_skills",
    question: "What are his soft skills?",
    answer:
      "He scopes tasks, coordinates teammates, runs stand-ups, and presents concise demos. He writes clear READMEs, uses issue trackers, and keeps PRs small and reviewable—fewer surprises, more shipping.",
    keywords: [
      "soft skill",
      "soft skills",
      "communication",
      "leadership",
      "teamwork",
      "presentation",
      "presenting",
      "collaboration",
      "coordination",
      "public speaking",
      "documentation",
      "stand-ups",
      "project management",
    ],
  },

  // ——— Projects ———
  {
    id: "projects-1",
    category: "projects",
    question: "What projects has he built?",
    answer:
      "Highlights: (1) A portfolio chatbot with intent gating + lightweight retrieval; (2) Full-stack apps (Next.js/React, Django), including an Excel-style data system with inline edit/filter/delete and reusable form-row patterns; (3) Kaggle projects (card-image classifier; credit-default prediction); (4) Student apps like CyberMath/Haitan; (5) A local company dashboard (Datacare) with role-based access.",
    keywords: [
      "projects",
      "portfolio",
      "apps",
      "full stack",
      "next.js",
      "react",
      "django",
      "kaggle",
      "image classification",
      "credit default",
      "chatbot",
      "rag",
      "dashboard",
      "datacare",
      "cybermath",
      "haitan",
    ],
  },

  // ——— Activities / Clubs ———
  {
    id: "activities-1",
    category: "activities",
    question: "What clubs and activities is he involved in?",
    answer:
      "Go Club (strategy, tournaments, mentoring) and Eco Club (tree-planting, awareness projects, and a small web/game idea for environmental education). He likes turning extracurriculars into buildable prototypes.",
    keywords: [
      "clubs",
      "activities",
      "go club",
      "eco club",
      "extracurricular",
      "volunteer",
      "mentoring",
      "environment",
    ],
  },

  // ——— Achievements ———
  {
    id: "achievements-1",
    category: "achievements",
    question: "What are his achievements?",
    answer:
      "Competitive placements in Go (including top finishes and awards), CS/AI/ML/web certifications, completion of CS50 and project-based courses, internship experience (Datacare), and live portfolio projects.",
    keywords: [
      "achievements",
      "awards",
      "certificates",
      "recognition",
      "go tournament",
      "cs50",
      "internship",
      "datacare",
    ],
  },

  // ——— Languages ———
  {
    id: "languages-1",
    category: "languages",
    question: "What languages does he speak?",
    answer:
      "Mongolian (native), English (IELTS 6.5 overall), and ongoing Japanese study (aiming JLPT N4). Comfortable presenting technical content in English with concise slides and live demos.",
    keywords: ["language", "english", "mongolian", "japanese", "ielts", "jlpt"],
  },

  // ——— Interests & Goals ———
  {
    id: "interests-1",
    category: "interests",
    question: "What are his interests and goals?",
    answer:
      "Applied AI/ML (especially NLP/RAG and useful web systems), data-driven products, and long-term exploration of full-dive VR/BCI at an undergraduate-friendly level.",
    keywords: [
      "interests",
      "goals",
      "future",
      "ai",
      "ml",
      "nlp",
      "rag",
      "web",
      "vr",
      "bci",
    ],
  },

  // ——— Personality (light humor baked-in) ———
  {
    id: "personality-1",
    category: "personality",
    question: "What’s his vibe?",
    answer:
      "Strategic like a Go player, patient like a Python debugger, and allergic to vague variable names. Good UX should feel like good math: elegant and predictable.",
    keywords: ["fun", "humor", "personality", "vibe", "style", "go", "ux"],
  },
];

// ———————————————————————————————————————————————————————————————
// Retrieval function — finds relevant knowledge entries based on query
// (improved matching, but still lightweight and fast)
// ———————————————————————————————————————————————————————————————

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function retrieveRelevantKnowledge(
  query: string,
  topK = 3
): KnowledgeEntry[] {
  const q = normalize(query);
  if (!q) return knowledgeBase.slice(0, topK);

  const qTokens = new Set(q.split(" "));

  const scored = knowledgeBase.map((entry) => {
    const kw = entry.keywords.map(normalize);
    const textBag = normalize(entry.question + " " + entry.answer).split(" ");

    // Token overlap scoring
    let score = 0;

    // Keyword exact/substring matches
    for (const token of qTokens) {
      for (const k of kw) {
        if (k === token) score += 3;
        else if (k.includes(token) || token.includes(k)) score += 1.5;
      }
    }

    // Question/Answer token overlap (lightweight)
    for (const token of qTokens) {
      if (textBag.includes(token)) score += 0.75;
    }

    // Small category prior (help “about” & “projects” appear more often)
    if (entry.category === "about" || entry.category === "projects")
      score += 0.5;

    return { entry, score };
  });

  const results = scored
    .filter((s) => s.score > 0.5)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.entry);

  // Fallback: if nothing scored above threshold, return a helpful default
  if (results.length === 0) {
    return [
      {
        id: "fallback",
        category: "fallback",
        question: "Fallback answer",
        answer:
          "I focus on questions about the portfolio owner—academics, programming, projects, achievements, clubs, and goals. Try asking: “What projects has he built?” or “What are his programming skills?”",
        keywords: ["help", "fallback", "default", "not sure", "unknown"],
      },
    ];
  }

  return results;
}
