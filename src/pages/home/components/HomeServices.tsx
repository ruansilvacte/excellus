import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Pisos de Madeira e Engineered",
    text: "Instalação de pisos sólidos e engenheirados com acabamento sob medida.",
    img: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Pisos Laminados e Vinílicos",
    text: "Soluções modernas, resistentes e perfeitas para qualquer ambiente.",
    img: "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Cerâmica",
    text: "Pisos, chuveiros e backsplashes com acabamento profissional.",
    img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Carpetes",
    text: "Instalação especializada de carpetes residenciais e comerciais.",
    img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Lixamento e Acabamento",
    text: "Restauração e acabamento de pisos de madeira como novos.",
    img: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80",
  },
];

export default function HomeServices({ onQuote }: { onQuote: () => void }) {
  return (
    <section id="servicos" className="py-24 lg:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs tracking-[0.3em] uppercase text-primary/70 font-medium">
              Especialidades
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-primary mt-4 leading-tight">
              Nossas Especialidades em <span className="italic text-primary/80">Pisos</span>
            </h2>
          </div>
          <Button
            onClick={onQuote}
            variant="ghost"
            className="text-primary hover:text-primary hover:bg-primary/5 self-start"
          >
            Ver Todos os Serviços
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <article
              key={s.title}
              className={`group relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.35)] transition-all duration-700 ${
                i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
              </div>
              <div className="p-7">
                <h3 className="font-heading text-2xl text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
              <span className="absolute top-5 right-5 h-9 w-9 rounded-full bg-accent text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <ArrowRight className="h-4 w-4" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
