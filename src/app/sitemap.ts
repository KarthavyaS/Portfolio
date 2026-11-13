import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://karthavya.vercel.app";
  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-11-13"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/resume.pdf`,
      lastModified: new Date("2026-11-13"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

