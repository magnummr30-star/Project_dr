import { BexonShellElements } from "./BexonShellElements";
import { BexonLanguageProvider } from "./BexonLanguageProvider";
import { Footer } from "./layout/Footer";
import { MobileHamburgerMenu } from "./layout/MobileHamburgerMenu";
import { OffcanvasMenu } from "./layout/OffcanvasMenu";
import { PrimaryHeader } from "./layout/PrimaryHeader";
import { StickyHeader } from "./layout/StickyHeader";
import { AboutSection } from "./sections/AboutSection";
import { BannerSection } from "./sections/BannerSection";
import { BlogSection } from "./sections/BlogSection";
import { ChooseSection } from "./sections/ChooseSection";
import { ContactSection } from "./sections/ContactSection";
import { FunFactSection } from "./sections/FunFactSection";
import { PricingSection } from "./sections/PricingSection";
import { ProjectSection } from "./sections/ProjectSection";
import { ServiceSection } from "./sections/ServiceSection";

export function BexonHomePage() {
  return (
    <>
      <BexonShellElements />
      <BexonLanguageProvider />
      <OffcanvasMenu />
      <MobileHamburgerMenu />
      <PrimaryHeader />
      <StickyHeader />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="primary" className="site-main">
            <div className="space-for-header" />
            <BannerSection />
            <ChooseSection />
            <AboutSection />
            <ServiceSection />
            <FunFactSection />
            <ProjectSection />
            <PricingSection />
            <ContactSection />
            <BlogSection />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
