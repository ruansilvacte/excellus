import ExcellusHeader from "@/components/excellus/ExcellusHeader";
import ExcellusFooter from "@/components/excellus/ExcellusFooter";
import AboutHero from "@/components/excellus/about/AboutHero";
import AboutHistory from "@/components/excellus/about/AboutHistory";
import AboutDifferentials from "@/components/excellus/about/AboutDifferentials";
import AboutPhilosophy from "@/components/excellus/about/AboutPhilosophy";
import AboutCTA from "@/components/excellus/about/AboutCTA";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ExcellusHeader />
      <main>
        <AboutHero />
        <AboutHistory />
        <AboutDifferentials />
        <AboutPhilosophy />
        <AboutCTA />
      </main>
      <ExcellusFooter />
    </div>
  );
}
