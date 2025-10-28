import { Chatbot } from "./chatBot";
import { Sparkles } from "lucide-react";

export function ChatbotSection() {
  return (
    <section id="chatbot" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">AI Assistant</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Chat with my advanced AI assistant powered by intent classification,
            knowledge base retrieval, and gatekeeping. Ask anything about my
            background, skills, projects, or achievements. I tried to use:
          </p>

          {/* Technical Features */}
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
              Intent Classification
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
              RAG System
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
              Gatekeeping
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
              Knowledge Base
            </span>
          </div>
        </div>

        {/* Chatbot Component */}
        <Chatbot />
      </div>
    </section>
  );
}
