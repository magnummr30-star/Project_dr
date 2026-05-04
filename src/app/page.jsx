import { ServicesShowcasePage } from "@/components/ServicesShowcasePage";
import { services } from "@/data/services";
import {
  absoluteUrl,
  companyName,
  jsonLdScript,
  organizationSchema,
  serviceUrl,
  siteUrl,
  websiteSchema
} from "@/lib/seo";

const homeDescription =
  "حلول استشارية واستثمارية لتأسيس المشاريع ودراسات الجدوى والتمويل والتراخيص والاستشارات الهندسية والصناعية.";

export const metadata = {
  title: `استشارات وتأسيس المشاريع | ${companyName}`,
  description: homeDescription
};

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema(),
    websiteSchema(),
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: `${siteUrl}/`,
      name: companyName,
      description: homeDescription,
      inLanguage: "ar-AE",
      isPartOf: {
        "@id": `${siteUrl}/#website`
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/all.png")
      }
    },
    {
      "@type": "OfferCatalog",
      "@id": `${siteUrl}/#services`,
      name: "خدمات التطوير الصناعي والاستشارات الخضراء",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        url: serviceUrl(service.slug),
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          provider: {
            "@id": `${siteUrl}/#organization`
          },
          areaServed: "United Arab Emirates"
        }
      }))
    }
  ]
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(homeStructuredData)} />
      <ServicesShowcasePage showParallelAdditions />
    </>
  );
}
