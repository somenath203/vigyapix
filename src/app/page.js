import Header from "./_components/landing_page_components/Header";
import HeroSection from "./_components/landing_page_components/HeroSection";
import FeatureSection from "./_components/landing_page_components/FeatureSection";
import ShowcaseSection from "./_components/landing_page_components/ShowcaseSection";
import HowItWorks from "./_components/landing_page_components/HowItWorks";
import CTASection from "./_components/landing_page_components/CTASection";
import FAQSection from "./_components/landing_page_components/FAQSection";
import Footer from "./_components/landing_page_components/Footer";

export default function Page() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <FeatureSection />
        <ShowcaseSection />
        <HowItWorks />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}