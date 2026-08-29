import { SiteNav } from "./components/site-nav";
import { Hero } from "./sections/hero";
import { CaptureSection } from "./sections/capture";
import { ManifestSection } from "./sections/manifest";
import { ProtocolSection } from "./sections/protocol";
import { CoachingSection } from "./sections/coaching";
import { PrivacySection } from "./sections/privacy";
import { PricingSection } from "./sections/pricing";
import { EcosystemSection } from "./sections/ecosystem";
import { SiteFooter } from "./sections/site-footer";

export function MarketingPage() {
  return (
    <div className="min-h-screen dot-grid-bg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:bg-foreground focus:px-4 focus:py-2 focus:text-xs focus:font-mono focus:uppercase focus:tracking-widest focus:text-background"
      >
        Skip to content
      </a>

      <SiteNav />

      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <CaptureSection />
        <ManifestSection />
        <ProtocolSection />
        <CoachingSection />
        <PrivacySection />
        <PricingSection />
        <EcosystemSection />
      </main>

      <SiteFooter />
    </div>
  );
}
