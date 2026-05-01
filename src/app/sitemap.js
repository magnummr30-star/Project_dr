import { services } from "@/data/services";
import { serviceUrl, siteUrl } from "@/lib/seo";

export default function sitemap() {
  const now = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    ...services.map((service) => ({
      url: serviceUrl(service.slug),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.82
    }))
  ];
}
