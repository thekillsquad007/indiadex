import type { MetadataRoute } from "next";
import { ASSETS } from "@/lib/assets";
import { COUNTRIES } from "@/lib/countries";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://indiadexswap.xyz";

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  for (const asset of ASSETS) {
    entries.push({
      url: `${baseUrl}/buy/${asset.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
    entries.push({
      url: `${baseUrl}/sell/${asset.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  for (const country of COUNTRIES) {
    entries.push({
      url: `${baseUrl}/country/${country.code}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return entries;
}
