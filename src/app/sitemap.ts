import { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";
import { mainNavigation } from "@/constants/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = mainNavigation.map((route) => ({
    url: `${siteConfig.url}${route.href}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: route.href === "/" ? 1 : 0.8,
  }));

  return routes;
}
