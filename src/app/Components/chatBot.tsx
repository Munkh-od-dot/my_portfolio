"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { classifyIntentLocal } from "@/lib/intent-classifier";
import { retrieveRelevantKnowledge } from "@/lib/knowledge-base";
import { generateNLPResponse } from "@/lib/nlp-response-generator";

type Msg = { id: string; role: "user" | "assistant"; text: string };

export function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const reply = (userText: string) => {
    const intent = classifyIntentLocal(userText);
    if (intent.intent === "off_topic") {
      return "I’m focused on questions about the portfolio owner (education, skills, projects, achievements). Try asking about those!";
    }
    if (intent.intent === "greeting") {
      return "Hi! Ask me about my education, skills, projects, or achievements.";
    }
    if (intent.intent === "capabilities") {
      return "I can answer questions about the portfolio owner using a small knowledge base + simple intent classification.";
    }
    const kb = retrieveRelevantKnowledge(userText, 3);
    return generateNLPResponse(userText, kb);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const id = crypto.randomUUID();
    setMessages((m) => [...m, { id, role: "user", text }]);

    // Local “inference”
    const out = reply(text);
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "assistant", text: out },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[600px] bg-background border border-border rounded-lg shadow-lg">
      {/* header ... keep your existing header */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          /* keep your empty-state block */
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <Bot className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Welcome to the AI Assistant</h4>
              <p className="text-sm text-muted-foreground">
                Try “Tell me about your projects”.
              </p>
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex gap-3",
              m.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {m.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {m.text}
            </div>
            {m.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about the portfolio owner..."
            className="flex-1 px-4 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="submit" size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
