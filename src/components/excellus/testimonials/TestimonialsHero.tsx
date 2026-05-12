import { ChevronDown } from "lucide-react";
import galleryImg from "@/assets/excellus-gallery-4.jpg";

export default function TestimonialsHero() {
  return (
    <section className="relative flex items-center overflow-hidden min-h-[70svh] md:min-h-[50svh]">
      <img src={galleryImg} alt="" className="absolute inset-0 w-full h-full object-cover scale-110" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(30_10%_5%/0.88)] via-[hsl(30_10%_5%/0.62)] to-[hsl(30_10%_5%/0.28)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(30_10%_5%/0.60)] via-transparent to-[hsl(30_10%_5%/0.15)]" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-25" style={{ background: "linear-gradient(90deg,transparent,hsl(44 90% 65%),transparent)" }} aria-hidden="true" />

      <div className="relative container mx-auto px-4 md:px-6 pt-28 md:pt-36 pb-32 md:pb-12 animate-reveal">
        <div className="flex items-center gap-3 mb-5 md:mb-6">
          <span className="gold-divider w-8 md:w-14" />
          <span className="eyebrow" style={{ color: "hsl(44 90% 72%)" }}>Autoridade · Exclusividade · Confiança</span>
        </div>
        <h1 className="font-[var(--font-heading)] text-2xl md:text-7xl font-light text-white leading-[1.03] max-w-3xl" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.7)" }}>
          A Confiança de{" "}
          <span style={{ fontStyle: "italic", color: "hsl(44 90% 72%)" }}>Clientes Exigentes</span>
        </h1>
        <p className="mt-8 md:mt-6 max-w-xl text-xs md:text-lg text-white/80 leading-relaxed font-light" style={{ textShadow: "0 1px 10px rgba(0,0,0,0.8)" }}>
          Projetos transformados com excelência, sofisticação e atenção absoluta aos detalhes.
          Veja o que nossos clientes dizem sobre a experiência Excellus.
        </p>
      </div>

      <a href="#stats" className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-primary transition-colors" aria-label="Ver depoimentos">
        <div className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center backdrop-blur">
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
        <span className="text-[0.6rem] tracking-[0.4em] uppercase font-light">Depoimentos</span>
      </a>
    </section>
  );
}
