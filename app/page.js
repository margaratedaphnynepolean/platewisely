import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import SiteFooter from "@/components/SiteFooter";

// The home screen: just puts the pieces in order, top to bottom.
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
      </main>
      <SiteFooter />
    </>
  );
}
