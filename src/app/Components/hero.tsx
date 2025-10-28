"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 pt-16"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Content */}
        <div className="space-y-6">
          <div className="inline-block">
            <span className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full">
              University Applicant
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance">
            Portfolio
            <br />{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Munkh-Od Bayarlakh
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            Explore my portfolio and chat with my first AI assistant to learn
            more.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <a href="#chatbot">
              <Button size="lg" className="gap-2">
                Try my first AI Assistant
                <ArrowDown className="w-4 h-4" />
              </Button>
            </a>
            <a href="#certificates">
              <Button size="lg" variant="outline">
                View Credentials
              </Button>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center pt-8">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="https://github.com/Munkh-od-dot"
              >
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            ></Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a href="mailto:munkhodbayarlakh@gmail.com">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
