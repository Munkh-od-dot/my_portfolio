import { Code, Brain, Rocket, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const highlights = [
  {
    icon: Brain,
    title: "Deep learning",

    description:
      "I consistently demonstrate the deep, structured thinking and remarkable fast learning which is connected to the ancient strategy game named GO",
  },
  {
    icon: Code,
    title: "High CS knowledge",
    description:
      "Proficient in JS, Python, CSS, HTML, C, React, Next.js, Django etc and completed many online coarses such as CS50x, CS50p, Meta ets. Also did internship at software company named DataCare LLC",
  },
  {
    icon: Rocket,
    title: "Innovation Passioned",
    description:
      "Passionate about contributing biotech, especially in full-drive VR technology field and ultimately, establish school that mostly managed by students",
  },
  {
    icon: Users,
    title: "environmentalist",
    description:
      "I'm the sectoral leader of my school's eco club and out of that I friquently participated event like CleanUp Day",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Curiosity drives me. Discovering Go taught me patience and deep
            thinking. On the other hand, coding gave me a way to build those
            ideas. I’m excited to study data science and or AI/ML and create
            technology that is simple, reliable, and helpful to others.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <Card
                key={highlight.title}
                className="p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {highlight.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Why Universities Should Choose Me
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I believe universities should choose me because I’m someone who
                keeps learning and improving, no matter the situation. Living in
                a foreign country at a young age taught me how to adapt, and
                playing Go helped me develop patience and strategy. Over time,
                I’ve turned those lessons into a passion for technology. For
                building small projects, studying data science, and working on
                ideas which is make learning more enjoyable. I’m not perfect,
                but I’m always curious, open to feedback, and willing to put in
                the effort to grow and contribute wherever I can.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
