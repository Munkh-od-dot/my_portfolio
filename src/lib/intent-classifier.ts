export type Intent = "about_person" | "off_topic" | "greeting" | "capabilities";

export interface IntentResult {
  intent: Intent;
  confidence: number;
  reasoning: string;
}

export function classifyIntentLocal(message: string): IntentResult {
  const messageLower = message.toLowerCase();

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

  return {
    intent: "about_person",
    confidence: 0.5,
    reasoning:
      "Ambiguous query, defaulting to about_person with low confidence",
  };
}
