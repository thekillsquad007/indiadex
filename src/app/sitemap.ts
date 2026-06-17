import type { MetadataRoute } from "next";
import { ASSETS } from "@/lib/assets";
import { COUNTRIES } from "@/lib/countries";

const BASE_URL = "https://indiadexswap.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  for (const asset of ASSETS) {
    urls.push({
      url: `${BASE_URL}/buy/${asset.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    urls.push({
      url: `${BASE_URL}/sell/${asset.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  for (const country of COUNTRIES) {
    urls.push({
      url: `${BASE_URL}/country/${country.code}`,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return urls;
}
