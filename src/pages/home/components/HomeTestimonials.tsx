import { Quote } from "lucide-react";

const items = [
  {
    text: "Trabalho impecável do início ao fim. A equipe é extremamente profissional e o acabamento do piso de madeira ficou perfeito.",
    name: "John D.",
    location: "Newark, New Jersey",
  },
  {
    text: "Recomendo de olhos fechados. Combinaram preço justo com qualidade premium e cumpriram todos os prazos.",
    name: "Maria S.",
    location: "Brooklyn, New York",
  },
  {
    text: "Profissionalismo e capricho em cada detalhe. O resultado superou nossas expectativas em todos os ambientes.",
    name: "Robert K.",
    location: "Philadelphia, PA",
  },
];

export default function HomeTestimonials() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-primary/70 font-medium">
            Depoimentos
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-primary mt-4 leading-tight">
            O que Nossos <span className="italic text-primary/80">Clientes Dizem</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t) => (
            <figure
              key={t.name}
              className="relative p-8 rounded-2xl bg-card border border-border hover:border-accent/60 transition-all duration-500 hover:-translate-y-1"
            >
              <Quote className="h-10 w-10 text-accent mb-5" />
              <blockquote className="text-foreground/85 leading-relaxed mb-6">
                "{t.text}"
              </blockquote>
              <figcaption>
                <div className="font-semibold text-primary">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.location}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
