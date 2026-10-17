import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { siteConfig, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.lastUpdated);
  const routes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/demo", priority: 0.9, changeFrequency: "weekly" },
    { path: "/come-funziona", priority: 0.8, changeFrequency: "monthly" },
    { path: "/funzionalita", priority: 0.8, changeFrequency: "monthly" },
    { path: "/soluzioni", priority: 0.8, changeFrequency: "monthly" },
    { path: "/prezzi", priority: 0.7, changeFrequency: "monthly" },
    { path: "/risorse", priority: 0.8, changeFrequency: "weekly" },
    { path: "/contatti", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}/risorse/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries];
}
