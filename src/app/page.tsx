"use client";

import { AboutSection } from "./Components/about";
import { HeroSection } from "./Components/hero";
import { Navigation } from "./Components/nav";
import { Footer } from "./Components/footer";
import { ChatbotSection } from "./Components/chatBot-sections";
import { CertificatesSection } from "./Components/certificate";
import { AchievementsSection } from "./Components/achievements";
import { useEffect } from "react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ChatbotSection />
      <CertificatesSection />
      <AchievementsSection />
      <Footer />
    </div>
  );
}
