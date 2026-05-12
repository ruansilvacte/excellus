import ExcellusHeader from "@/components/excellus/ExcellusHeader";
import ExcellusFooter from "@/components/excellus/ExcellusFooter";
import ServicesHero from "@/components/excellus/services/ServicesHero";
import ServicesGrid from "@/components/excellus/services/ServicesGrid";
import ServicesProcess from "@/components/excellus/services/ServicesProcess";
import ServicesMaterials from "@/components/excellus/services/ServicesMaterials";
import ServicesCTA from "@/components/excellus/services/ServicesCTA";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ExcellusHeader />
      <main>
        <ServicesHero />
        <ServicesGrid />
        <ServicesProcess />
        <ServicesMaterials />
        <ServicesCTA />
      </main>
      <ExcellusFooter />
    </div>
  );
}
