import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "A Excellus transformou completamente nosso banheiro principal. O acabamento é impecável e a equipe tratou nossa casa com extremo cuidado. Recomendo sem reservas.",
    name: "Sarah L.",
    location: "Winter Garden, FL",
  },
  {
    text: "Profissionalismo do início ao fim. O painel ripado em LED ficou exatamente como imaginávamos. Nossa vacation home valorizou muito.",
    name: "Marcus T.",
    location: "Lake Nona, FL",
  },
  {
    text: "Sofisticação, prazo cumprido e zero dor de cabeça. A garantia oferecida nos deu total tranquilidade. Voltaremos a contratar.",
    name: "Emma R.",
    location: "Orlando, FL",
  },
];

export default function ExcellusTestimonials() {
  return (
    <section id="depoimentos" className="py-10 md:py-16 bg-secondary/30 texture-noise">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="eyebrow">Depoimentos</span>
          <h2 className="mt-4 text-2xl md:text-6xl font-light text-foreground leading-[1.05]">
            A Confiança de <span className="text-gold-gradient">Nossos Clientes</span>
          </h2>
          <div className="mt-5 flex justify-center">
            <span className="gold-divider w-12 md:w-14" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="luxe-card p-6 md:p-10 flex flex-col"
            >
              <Quote className="h-6 w-6 md:h-8 md:w-8 text-primary mb-5 md:mb-6 opacity-80" strokeWidth={1.3} />
              <blockquote className="text-foreground/85 leading-relaxed font-light text-[0.9rem] md:text-[0.98rem] flex-1">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-7 pt-6 border-t border-border/60">
                <div className="font-[var(--font-heading)] text-lg font-medium text-foreground">
                  {t.name}
                </div>
                <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground font-light mt-1">
                  {t.location}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
