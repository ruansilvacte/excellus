import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Reformas de Banheiros",
    desc: "Transformamos seu banheiro em um ambiente de luxo, funcional e sofisticado.",
    img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Instalação de Painéis",
    desc: "Painéis ripados e internos que elevam o design e a sofisticação do seu espaço.",
    img: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Pisos e Acabamentos",
    desc: "Instalação de porcelanato, LVP e laminados com perfeição e durabilidade.",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  },
];

export default function ExcellusServices() {
  return (
    <section id="servicos" className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <span className="eyebrow">Nossos Serviços</span>
          <h2 className="mt-4 text-2xl md:text-6xl font-light text-foreground leading-[1.05]">
            Soluções para <span className="text-gold-gradient">Transformar</span> Seu Espaço
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s) => (
            <article
              key={s.title}
              className="group relative h-[20rem] md:h-[30rem] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-luxe)] transition-all duration-700"
            >
              <img
                src={s.img}
                alt={s.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/10" />
              <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end text-white">
                <h3 className="font-[var(--font-heading)] text-lg md:text-3xl font-medium">{s.title}</h3>
                <p className="mt-2 text-[0.65rem] md:text-sm text-white/80 font-light leading-relaxed max-w-xs">
                  {s.desc}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="h-px w-8 md:w-10 bg-primary" />
                  <button
                    aria-label={`Saiba mais sobre ${s.title}`}
                    className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:scale-110"
                  >
                    <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 md:mt-14 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-primary/40 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary px-7 h-12 text-xs tracking-[0.2em] uppercase font-light"
          >
            <Link to="/servicos">Ver Todos os Serviços</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
