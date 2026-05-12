import { Award, Users, ThumbsUp, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import aboutImg from "@/assets/excellus-about.jpg";

const stats = [
  { icon: Award, value: "+120", label: "Projetos Entregues" },
  { icon: Users, value: "5", label: "Anos de Experiência" },
  { icon: ThumbsUp, value: "98%", label: "Satisfação dos Clientes" },
  { icon: BadgeCheck, value: "100%", label: "Compromisso com Qualidade" },
];

export default function ExcellusAbout() {
  return (
    <section id="sobre" className="relative py-10 md:py-16 bg-secondary/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image with play button */}
          <div className="relative group lg:col-span-5">
            <div className="relative aspect-[4/5] max-w-sm mx-auto overflow-hidden rounded-2xl shadow-[var(--shadow-luxe)]">
              <img
                src={aboutImg}
                alt="Interior de luxo — projeto Excellus Remodeling"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-2xl bg-primary/10 border border-primary/20 hidden md:block" aria-hidden="true" />
          </div>

          {/* Text content */}
          <div className="lg:col-span-7 text-center md:text-left">
            <span className="eyebrow">Sobre Nós</span>
            <h2 className="mt-5 text-2xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1]">
              Mais de 5 Anos de <span className="text-gold-gradient">Excelência</span> em Reformas de Luxo
            </h2>
            <div className="mt-6 gold-divider w-12 md:w-14 mx-auto md:mx-0" />
            <p className="mt-6 text-sm md:text-lg text-muted-foreground leading-relaxed font-light">
              A Excellus Remodeling é especializada em reformas de alto padrão em
              Orlando, Flórida. Transformamos ambientes com design, qualidade e
              precisão, entregando resultados que superam expectativas.
            </p>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center">
                  <Icon className="h-4 w-4 text-primary mx-auto mb-2" strokeWidth={1.3} />
                  <div className="font-[var(--font-heading)] text-xl md:text-3xl font-medium text-foreground">{value}</div>
                  <div className="mt-1 text-[0.6rem] tracking-[0.15em] uppercase text-muted-foreground font-light">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center md:justify-start">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-primary/40 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary px-7 h-12 text-xs tracking-[0.2em] uppercase font-light"
              >
                <Link to="/sobre">Conheça Nossa História</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
