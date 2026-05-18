import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomeHero({ onQuote }: { onQuote: () => void }) {
  return (
    <section id="inicio" className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80')",
        }}
        aria-hidden
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/40" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-white/5 backdrop-blur-sm mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-xs tracking-[0.25em] uppercase text-accent font-medium">
              14 Anos de Experiência · NJ · NY · PA
            </span>
          </div>

          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white mb-7">
            Excelência em Pisos que{" "}
            <span className="italic text-accent">Transforma</span> Ambientes.
          </h1>

          <p className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed mb-10">
            Com 14 anos de experiência, a New Creation Home Solutions oferece instalação e
            acabamento impecáveis para projetos residenciais e comerciais em New Jersey, Nova York
            e Pensilvânia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onQuote}
              size="lg"
              className="bg-accent text-primary hover:bg-accent/90 rounded-full px-8 h-14 text-base font-semibold group"
            >
              Solicite um Orçamento Gratuito
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-14 text-base border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#servicos">Conheça Nossos Serviços</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent z-0" />
    </section>
  );
}
