// src/components/sections/CertificatesSection.tsx
"use client";

import { useState } from "react";
import {
  certificates as initialCertificates,
  categories,
} from "../../lib/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CertificatesSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [certificates, setCertificates] = useState(initialCertificates);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      setUploading(false);

      if (!res.ok || !data?.secure_url) {
        console.error("Upload failed:", data);
        alert("Upload failed. See console.");
        return;
      }

      const newCert = {
        id: Date.now().toString(),
        title: "New Uploaded Certificate",
        issuer: "Uploaded by User",
        date: new Date().toISOString().slice(0, 7), // YYYY-MM
        category: "Academic",
        imageUrl: data.secure_url, // ✅ Cloudinary URL
      };

      setCertificates((prev) => [newCert, ...prev]);
    } catch (err) {
      setUploading(false);
      console.error(err);
      alert("Unexpected error. See console.");
    } finally {
      e.currentTarget.value = "";
    }
  };

  const filtered =
    selectedCategory === "All"
      ? certificates
      : certificates.filter((c) => c.category === selectedCategory);

  return (
    <section id="certificates" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground">Certificates</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Key certifications and courses completed to enhance my technical and
            individuality expertise.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <input
            type="file"
            accept="image/*"
            id="file-upload"
            className="hidden"
            onChange={handleUpload}
          />
          <label htmlFor="file-upload">
            <Button asChild disabled={uploading}>
              <span>{uploading ? "Uploading..." : "Upload Certificate"}</span>
            </Button>
          </label>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.certificates.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cert) => (
            <Card
              key={cert.id}
              className="overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-muted overflow-hidden">
                <Image
                  src={cert.imageUrl || "/placeholder.svg"}
                  alt={cert.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                    {cert.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {cert.issuer}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  {new Date(cert.date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No certificates found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
