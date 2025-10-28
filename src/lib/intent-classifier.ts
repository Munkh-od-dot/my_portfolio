// Intent Classification - Determines if the question is about the portfolio owner
export type Intent =
  | "about_person" // Questions about the portfolio owner
  | "off_topic" // Questions not related to the portfolio owner
  | "greeting" // Greetings and pleasantries
  | "capabilities"; // Questions about what the chatbot can do

export interface IntentResult {
  intent: Intent;
  confidence: number;
  reasoning: string;
}

// Pattern-based intent classification (fast, rule-based)
export function classifyIntentLocal(message: string): IntentResult {
  const messageLower = message.toLowerCase();

  // Greeting patterns
  const greetingPatterns = [
    /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i,
    /^(what's up|how are you|howdy)/i,
  ];

  if (greetingPatterns.some((pattern) => pattern.test(messageLower))) {
    return {
      intent: "greeting",
      confidence: 0.95,
      reasoning: "Message matches greeting patterns",
    };
  }

  // Capabilities patterns
  const capabilityPatterns = [
    /what can you (do|tell me|help)/i,
    /how (do you work|does this work)/i,
    /what (are you|is this)/i,
  ];

  if (capabilityPatterns.some((pattern) => pattern.test(messageLower))) {
    return {
      intent: "capabilities",
      confidence: 0.9,
      reasoning: "Message asks about chatbot capabilities",
    };
  }

  // About person patterns (questions about the portfolio owner)
  const aboutPersonKeywords = [
    "you",
    "your",
    "education",
    "skills",
    "experience",
    "projects",
    "achievements",
    "certificates",
    "background",
    "interests",
    "passion",
    "work",
    "study",
    "university",
    "college",
    "technical",
    "programming",
  ];

  const hasPersonKeywords = aboutPersonKeywords.some((keyword) =>
    messageLower.includes(keyword)
  );

  // Off-topic patterns (clearly not about the person)
  const offTopicPatterns = [
    /weather/i,
    /recipe/i,
    /movie/i,
    /sports/i,
    /news/i,
    /stock/i,
    /price/i,
    /calculate/i,
    /math/i,
    /joke/i,
    /story/i,
  ];

  const isOffTopic = offTopicPatterns.some((pattern) =>
    pattern.test(messageLower)
  );

  if (isOffTopic) {
    return {
      intent: "off_topic",
      confidence: 0.85,
      reasoning: "Message contains off-topic keywords",
    };
  }

  if (hasPersonKeywords) {
    return {
      intent: "about_person",
      confidence: 0.8,
      reasoning: "Message contains keywords related to the portfolio owner",
    };
  }

  // Default to low confidence about_person for ambiguous queries
  return {
    intent: "about_person",
    confidence: 0.5,
    reasoning:
      "Ambiguous query, defaulting to about_person with low confidence",
  };
}
