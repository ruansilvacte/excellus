import ExcellusHeader from "@/components/excellus/ExcellusHeader";
import ExcellusHero from "@/components/excellus/ExcellusHero";
import ExcellusDifferentials from "@/components/excellus/ExcellusDifferentials";
import ExcellusAbout from "@/components/excellus/ExcellusAbout";
import ExcellusServices from "@/components/excellus/ExcellusServices";
import ExcellusDetails from "@/components/excellus/ExcellusDetails";
import ExcellusGallery from "@/components/excellus/ExcellusGallery";
import ExcellusTestimonials from "@/components/excellus/ExcellusTestimonials";
import ExcellusSocialAreas from "@/components/excellus/ExcellusSocialAreas";
import ExcellusContact from "@/components/excellus/ExcellusContact";
import ExcellusFooter from "@/components/excellus/ExcellusFooter";
import SeoHead from "@/components/SeoHead";

export default function Example() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoHead
        slug="/"
        fallbackTitle="Excellus Remodeling — Reformas de Alto Padrão em Orlando"
        fallbackDescription="Reformas de alto padrão em Orlando: banheiros, painéis exclusivos e acabamentos impecáveis com garantia. Solicite seu orçamento premium."
      />
      <ExcellusHeader />
      <main>
        <ExcellusHero />
        <ExcellusDifferentials />
        <ExcellusAbout />
        <ExcellusServices />
        <ExcellusDetails />
        <ExcellusGallery />
        <ExcellusTestimonials />
        <ExcellusSocialAreas />
        <ExcellusContact />
      </main>
      <ExcellusFooter />
    </div>
  );
}
