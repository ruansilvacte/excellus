import { Quote, Star } from "lucide-react";

const reviews = [
  { name: "Sarah L.", location: "Winter Garden, FL", text: "A Excellus transformou nosso banheiro além do esperado. Equipe impecável, prazo cumprido e resultado de outro nível.", stars: 5 },
  { name: "Marcus T.", location: "Lake Nona, FL", text: "Profissionalismo do início ao fim. O painel ripado em LED ficou exatamente como imaginávamos.", stars: 5 },
  { name: "Emma R.", location: "Orlando, FL", text: "Sofisticação, prazo cumprido e zero dor de cabeça. Voltaremos a contratar com certeza.", stars: 5 },
];

const trust = [
  { value: "120+", label: "Projetos" },
  { value: "98%", label: "Satisfação" },
  { value: "5★", label: "Avaliação Média" },
];

export default function ContactSocialProof() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="eyebrow">Clientes Satisfeitos</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-light text-foreground leading-tight">
            O que dizem sobre nós
          </h2>
          <div className="mt-5 flex justify-center"><span className="gold-divider" /></div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-10 mb-12">
          {trust.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-[var(--font-heading)] text-4xl font-medium text-foreground">{value}</div>
              <div className="mt-1 text-[0.62rem] tracking-[0.2em] uppercase text-muted-foreground font-light">{label}</div>
            </div>
          ))}
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((r) => (
            <figure key={r.name} className="luxe-card p-8 flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                ))}
              </div>
              <Quote className="h-7 w-7 text-primary mb-4 opacity-70" strokeWidth={1.3} />
              <blockquote className="text-foreground/80 leading-relaxed font-light text-sm flex-1">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-border/50">
                <div className="font-[var(--font-heading)] text-base font-medium text-foreground">{r.name}</div>
                <div className="text-[0.62rem] tracking-[0.18em] uppercase text-muted-foreground font-light mt-0.5">{r.location}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="text-base text-muted-foreground font-light mb-6">
            Seu projeto pode ser o próximo destaque da Excellus.
          </p>
          <a
            href="https://wa.me/16893063140"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 h-14 rounded-full text-sm tracking-[0.2em] uppercase font-medium text-white transition-all hover:scale-[1.02] hover:brightness-110"
            style={{ background: "linear-gradient(135deg,#c9a227,#8b6508)", boxShadow: "0 8px 24px -8px hsl(38 60% 40%/0.5)" }}
          >
            Falar com a Equipe
          </a>
        </div>
      </div>
    </section>
  );
}
