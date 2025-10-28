"use client";

import { useState } from "react";
import { achievements, categories } from "../../lib/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Bot, Code, Book, Users, Star } from "lucide-react";

const iconMap = {
  bot: Bot,
  trophy: Trophy,
  code: Code,
  book: Book,
  users: Users,
  star: Star,
};

export function AchievementsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredAchievements =
    selectedCategory === "All"
      ? achievements
      : achievements.filter(
          (achievement) => achievement.category === selectedCategory
        );

  return (
    <section id="achievements" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">Achievements</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Notable accomplishments and milestones in my academic and technical
            journey
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.achievements.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => {
            const Icon =
              iconMap[achievement.icon as keyof typeof iconMap] || Trophy;

            return (
              <Card
                key={achievement.id}
                className="p-6 hover:shadow-lg transition-shadow group"
              >
                {/* Icon and Category */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                    {achievement.category}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {achievement.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(achievement.date).toLocaleDateString("en-MN", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No achievements found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
