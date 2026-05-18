import { useState } from "react";
import HomeHeader from "./home/components/HomeHeader";
import HomeHero from "./home/components/HomeHero";
import HomeDifferentials from "./home/components/HomeDifferentials";
import HomeServices from "./home/components/HomeServices";
import HomeGallery from "./home/components/HomeGallery";
import HomeTestimonials from "./home/components/HomeTestimonials";
import HomeCta from "./home/components/HomeCta";
import HomeFooter from "./home/components/HomeFooter";
import QuoteModal from "./home/components/QuoteModal";
import SeoHead from "@/components/SeoHead";

export default function Index() {
  const [open, setOpen] = useState(false);
  const onQuote = () => setOpen(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoHead
        slug="/"
        fallbackTitle="New Creation Home Solutions — Instalação e Acabamento de Pisos em NJ, NY e PA"
        fallbackDescription="Excelência em instalação e acabamento de pisos. 14 anos de experiência em projetos residenciais e comerciais em New Jersey, Nova York e Pensilvânia."
      />
      <HomeHeader onQuote={onQuote} />
      <main>
        <HomeHero onQuote={onQuote} />
        <HomeDifferentials />
        <HomeServices onQuote={onQuote} />
        <HomeGallery />
        <HomeTestimonials />
        <HomeCta onQuote={onQuote} />
      </main>
      <HomeFooter />
      <QuoteModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
