export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://globalgreenconsults.com").replace(/\/$/, "");

export const companyName = "خبراء التطوير الصناعي والاستشارات الخضراء";
export const companyLegalName = "Global Experts for Industrial Development & Green Consultations";
export const companyEmail = "info@globalgreenconsults.com";
export const whatsappNumber = "0556260392";
export const whatsappInternationalNumber = "+971556260392";
export const companyPhone = "065613114";
export const directPhone = "0503646355";

export const defaultSeoDescription =
  "خدمات استشارية لتأسيس وتطوير المشاريع الصناعية والمستدامة في الإمارات، من الفكرة ودراسة الجدوى والتراخيص إلى التمويل والتشغيل.";

export const defaultKeywords = [
  "استشارات صناعية في الإمارات",
  "تأسيس مصنع في الإمارات",
  "دراسة جدوى صناعية",
  "تمويل مشاريع صناعية",
  "تراخيص صناعية",
  "استشارات الاستدامة",
  "الحياد الكربوني",
  "البصمة الكربونية",
  "أراضي صناعية خضراء",
  "تطوير المصانع"
];

export const defaultOgImage = "/images/all.png";

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function serviceUrl(slug) {
  return absoluteUrl(`/services/${slug}`);
}

export function jsonLdScript(data) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c")
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": `${siteUrl}/#organization`,
    name: companyName,
    legalName: companyLegalName,
    url: siteUrl,
    logo: absoluteUrl("/images/logo.jpeg"),
    image: absoluteUrl(defaultOgImage),
    email: companyEmail,
    telephone: directPhone,
    areaServed: ["United Arab Emirates", "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: whatsappInternationalNumber,
        contactType: "WhatsApp",
        availableLanguage: ["Arabic", "English"]
      },
      {
        "@type": "ContactPoint",
        telephone: directPhone,
        contactType: "customer service",
        availableLanguage: ["Arabic", "English"]
      },
      {
        "@type": "ContactPoint",
        telephone: companyPhone,
        contactType: "company office",
        availableLanguage: ["Arabic", "English"]
      }
    ],
    sameAs: []
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: companyName,
    inLanguage: "ar-AE",
    publisher: {
      "@id": `${siteUrl}/#organization`
    }
  };
}
