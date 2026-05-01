import "./globals.css";
import { FloatingContactBanner } from "@/components/FloatingContactBanner";
import { FloatingInquiryWidget } from "@/components/FloatingInquiryWidget";
import { absoluteUrl, companyName, defaultKeywords, defaultOgImage, defaultSeoDescription, siteUrl } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: companyName,
  title: {
    default: `${companyName} | استشارات صناعية واستدامة في الإمارات`,
    template: `%s | ${companyName}`
  },
  description: defaultSeoDescription,
  keywords: defaultKeywords,
  authors: [{ name: companyName }],
  creator: companyName,
  publisher: companyName,
  category: "Industrial consulting",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "ar_AE",
    url: "/",
    siteName: companyName,
    title: `${companyName} | استشارات صناعية واستدامة في الإمارات`,
    description: defaultSeoDescription,
    images: [
      {
        url: absoluteUrl(defaultOgImage),
        width: 1200,
        height: 630,
        alt: companyName
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${companyName} | استشارات صناعية واستدامة في الإمارات`,
    description: defaultSeoDescription,
    images: [absoluteUrl(defaultOgImage)]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="ltr" className="no-js" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" type="image/x-icon" href="/assets/images/fav.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if("scrollRestoration"in history){history.scrollRestoration="manual";}window.scrollTo(0,0);document.documentElement.scrollTop=0;}catch(error){}})();`
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var locale="ar";document.documentElement.lang=locale;document.documentElement.dir="ltr";document.documentElement.dataset.locale=locale;var font='"Cairo", Tahoma, Arial, sans-serif';document.documentElement.style.setProperty("--tj-ff-body",font);document.documentElement.style.setProperty("--tj-ff-heading",font);}catch(error){document.documentElement.dataset.locale="ar";}})();`
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Noto+Kufi+Arabic:wght@500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap"
        />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/font-awesome-pro.min.css" />
        <link rel="stylesheet" href="/assets/css/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/bexon-icons.css" />
        <link rel="stylesheet" href="/assets/css/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/swiper.min.css" />
        <link rel="stylesheet" href="/assets/css/venobox.min.css" />
        <link rel="stylesheet" href="/assets/css/odometer-theme-default.css" />
        <link rel="stylesheet" href="/assets/css/meanmenu.css" />
        <link id="bexon-main-style" rel="stylesheet" href="/assets/css/main.css" />
      </head>
      <body>
        {children}
        <FloatingContactBanner />
        <FloatingInquiryWidget />
      </body>
    </html>
  );
}
