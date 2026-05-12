import marbleImg from "@/assets/excellus-marble.jpg";

const phrases = [
  "Cada escolha de material é uma declaração de intenção.",
  "Cada linha é traçada com propósito.",
  "Cada resultado é a expressão de um padrão irredutível.",
];

export default function AboutPhilosophy() {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-background">
      {/* Decorative gold line */}
      <div
        className="absolute left-0 right-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, hsl(38 55% 55% / 0.4) 30%, hsl(44 80% 65% / 0.6) 50%, hsl(38 55% 55% / 0.4) 70%, transparent 100%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute left-0 right-0 bottom-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, hsl(38 55% 55% / 0.4) 30%, hsl(44 80% 65% / 0.6) 50%, hsl(38 55% 55% / 0.4) 70%, transparent 100%)" }}
        aria-hidden="true"
      />

      {/* Background marble texture faded */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <img src={marbleImg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </div>

      <div className="relative container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="eyebrow">Nossa Filosofia</span>
 
          <h2
            className="mt-6 font-[var(--font-heading)] text-2xl md:text-6xl lg:text-7xl font-light text-foreground leading-[1.1]"
          >
            Excelência em{" "}
            <span className="text-gold-gradient">Cada Detalhe</span>
          </h2>
 
          <div className="mt-6 flex justify-center">
            <span className="gold-divider w-12 md:w-14" />
          </div>
 
          <p className="mt-8 text-sm md:text-xl text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
            Acreditamos que uma reforma de alto padrão vai muito além de materiais caros ou
            técnicas sofisticadas. É sobre a compreensão profunda de como um espaço deve se sentir —
            como deve impactar quem vive nele e quem o visita.
          </p>
 
          <p className="mt-4 text-xs md:text-base text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
            Nossa filosofia é simples: nenhum compromisso com a qualidade. Nenhum atalho. Nenhuma
            solução que não seja a melhor possível. É com essa mentalidade que entregamos projetos
            que resistem ao tempo e elevam o padrão de vida dos nossos clientes.
          </p>
 
          {/* Phrases */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/40">
            {phrases.map((phrase, i) => (
              <div
                key={i}
                className="bg-background/80 backdrop-blur px-6 py-8 md:px-8 md:py-10 group hover:bg-primary/3 transition-colors duration-500"
              >
                <div
                  className="h-6 md:h-8 w-px mx-auto mb-5 md:mb-6 bg-gradient-to-b from-transparent via-primary to-transparent group-hover:scale-y-125 transition-transform duration-500"
                  aria-hidden="true"
                />
                <p
                  className="font-[var(--font-heading)] text-base md:text-lg font-light text-foreground/80 italic leading-relaxed group-hover:text-foreground transition-colors duration-300"
                >
                  "{phrase}"
                </p>
              </div>
            ))}
          </div>
 
          {/* Big italic quote */}
          <blockquote className="mt-16 md:mt-20 relative">
            <div
              className="absolute -top-6 left-1/2 -translate-x-1/2 font-[var(--font-heading)] text-[5rem] md:text-[8rem] text-primary/10 leading-none select-none pointer-events-none"
              aria-hidden="true"
            >
              "
            </div>
            <p className="relative font-[var(--font-heading)] text-xl md:text-3xl lg:text-4xl font-light italic text-foreground/75 leading-relaxed">
              Não construímos apenas reformas.{" "}
              <br className="hidden md:block" />
              Construímos{" "}
              <span className="text-gold-gradient not-italic font-normal">
                legados de sofisticação.
              </span>
            </p>
            <div className="mt-6 flex justify-center">
              <span className="text-[0.68rem] tracking-[0.4em] uppercase text-primary font-medium">
                Excellus Remodeling
              </span>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
