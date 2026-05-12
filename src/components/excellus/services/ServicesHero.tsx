import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import galleryImg from "@/assets/excellus-gallery-3.jpg";

export default function ServicesHero() {
  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "85svh" }}
    >
      {/* Background */}
      <img
        src={galleryImg}
        alt="Reforma de alto padrão Excellus"
        className="absolute inset-0 w-full h-full object-cover scale-110"
        aria-hidden="true"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(30_10%_5%/0.88)] via-[hsl(30_10%_5%/0.65)] to-[hsl(30_10%_5%/0.30)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(30_10%_5%/0.65)] via-transparent to-[hsl(30_10%_5%/0.20)]" aria-hidden="true" />

      {/* Gold horizontal lines */}
      <div className="absolute top-0 left-0 right-0 h-px opacity-20 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, hsl(44 90% 65%), transparent)" }}
        aria-hidden="true"
      />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-primary/60 blur-sm animate-float-slow" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full bg-white/60 blur-[1px] animate-float-slow" style={{ animationDelay: "2.5s" }} />
      </div>

      <div className="relative container mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-20">
        <div className="animate-reveal max-w-3xl">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="gold-divider w-8 md:w-14" />
            <span className="eyebrow" style={{ color: "hsl(44 90% 72%)" }}>
              Nossos Serviços · Alta Performance
            </span>
          </div>

          <h1
            className="font-[var(--font-heading)] text-2xl md:text-7xl font-light leading-[1.1] text-white tracking-tight"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.75), 0 1px 6px rgba(0,0,0,0.6)" }}
          >
            Reformas de Alto Padrão{" "}
            <br className="hidden md:block" />
            para{" "}
            <span style={{ fontStyle: "italic", color: "hsl(44 90% 72%)" }}>
              Ambientes Exclusivos
            </span>
          </h1>

          <p
            className="mt-6 md:mt-7 max-w-xl text-xs md:text-lg text-white/80 leading-relaxed font-light"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.85)" }}
          >
            Transformamos residências em espaços sofisticados, funcionais e valorizados.
            Cada serviço executado com maestria e atenção absoluta aos detalhes.
          </p>
 
          <div className="mt-10 md:mt-10">
            <Button
              asChild
              size="lg"
              className="rounded-full px-6 md:px-8 h-11 md:h-14 text-[0.65rem] md:text-sm tracking-[0.2em] uppercase font-normal text-white border-0 shadow-[0_15px_35px_-12px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.6)] transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #b8860b 0%, #8b6508 100%)" }}
            >
              <a href="https://wa.me/16893063140" target="_blank" rel="noreferrer" className="flex items-center gap-3">
                Solicite um Orçamento <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#servicos-grid"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-primary transition-colors"
        aria-label="Ver serviços"
      >
        <div className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center backdrop-blur">
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
        <span className="text-[0.6rem] tracking-[0.4em] uppercase font-light">Explorar</span>
      </a>
    </section>
  );
}
