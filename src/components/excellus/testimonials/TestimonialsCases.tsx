import g1 from "@/assets/excellus-gallery-1.jpg";
import g2 from "@/assets/excellus-gallery-2.jpg";
import g3 from "@/assets/excellus-gallery-3.jpg";
import { Clock, Home, Star } from "lucide-react";

const cases = [
  {
    title: "Banheiro Master • Winter Garden",
    type: "Reforma de Banheiro",
    time: "3 semanas",
    result: "Valorização estimada de 15%",
    stars: 5,
    img: g1,
    desc: "Reforma completa com mármore importado, box de vidro fumê, banheira de imersão e iluminação LED integrada ao teto rebaixado.",
  },
  {
    title: "Cozinha Integrada • Lake Nona",
    type: "Cozinha + Sala",
    time: "5 semanas",
    result: "Ambiente 40% maior visualmente",
    stars: 5,
    img: g2,
    desc: "Integração de cozinha e sala com ilha central em quartzo, painel ripado como divisória decorativa e iluminação pendente premium.",
  },
  {
    title: "Painéis e Pisos • Orlando",
    type: "Revestimentos Completos",
    time: "2 semanas",
    result: "Estética completamente renovada",
    stars: 5,
    img: g3,
    desc: "Instalação de porcelanato grande formato, painel ripado em madeira natural e rodapés em perfil metálico sofisticado.",
  },
];

export default function TestimonialsCases() {
  return (
    <section className="py-12 md:py-16 bg-secondary/25 texture-noise">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="eyebrow">Cases de Sucesso</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-light text-foreground leading-tight">
            Projetos que <span className="text-gold-gradient">Inspiram</span>
          </h2>
          <div className="mt-5 flex justify-center"><span className="gold-divider" /></div>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {cases.map((c, i) => (
            <div key={c.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl shadow-[var(--shadow-luxe)] group ${i % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}>
              {/* Image */}
              <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden" style={{ direction: "ltr" }}>
                <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.6rem] tracking-[0.2em] uppercase font-medium text-white border border-white/25 backdrop-blur-md" style={{ background: "rgba(0,0,0,0.35)" }}>
                    <Home className="h-3 w-3" /> {c.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-10 md:p-12 bg-white" style={{ direction: "ltr" }}>
                <h3 className="font-[var(--font-heading)] text-2xl md:text-3xl font-light text-foreground leading-tight">{c.title}</h3>
                <div className="mt-4 h-px w-10 bg-gradient-to-r from-primary to-transparent" />
                <p className="mt-5 text-sm text-muted-foreground leading-relaxed font-light">{c.desc}</p>

                <div className="mt-7 grid grid-cols-2 gap-4">
                  <div className="bg-secondary/40 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-3.5 w-3.5 text-primary" strokeWidth={1.4} />
                      <span className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground font-medium">Duração</span>
                    </div>
                    <div className="text-sm font-medium text-foreground">{c.time}</div>
                  </div>
                  <div className="bg-secondary/40 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="h-3.5 w-3.5 text-primary" strokeWidth={1.4} />
                      <span className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground font-medium">Resultado</span>
                    </div>
                    <div className="text-sm font-medium text-foreground">{c.result}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
