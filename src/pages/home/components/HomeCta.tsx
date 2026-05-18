import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomeCta({ onQuote }: { onQuote: () => void }) {
  return (
    <section id="contato" className="py-24 lg:py-32 bg-primary relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" aria-hidden />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
          Vamos Começar
        </span>
        <h2 className="font-heading text-4xl md:text-6xl text-white mt-5 leading-[1.05]">
          Pronto para <span className="italic text-accent">Transformar</span> seu Ambiente?
        </h2>
        <p className="text-lg text-white/80 mt-7 max-w-2xl mx-auto leading-relaxed">
          Entre em contato hoje mesmo e receba um orçamento gratuito e sem compromisso. Nossa
          equipe está pronta para ajudar você a escolher a melhor solução para seu projeto.
        </p>
        <Button
          onClick={onQuote}
          size="lg"
          className="mt-10 bg-accent text-primary hover:bg-accent/90 rounded-full px-9 h-14 text-base font-semibold group"
        >
          Solicite um Orçamento Gratuito
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}
