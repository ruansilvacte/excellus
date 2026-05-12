import { Bath, Monitor, Layers, Star, CheckCircle, Clock } from "lucide-react";

const detailItems = [
  {
    icon: Bath,
    title: "Banheiros e Cozinhas",
    text: "Foco total em reformas de banheiros e cozinhas, utilizando materiais de alta qualidade para garantir durabilidade, funcionalidade e estética superior.",
  },
  {
    icon: Monitor,
    title: "Painéis Diferenciados",
    text: "Especialistas na instalação de painéis ripados, de TV, travertino, mosaicos e projetos com iluminação LED, atendendo residências e comércios.",
  },
  {
    icon: Layers,
    title: "Pisos e Revestimentos",
    text: "Instalação especializada de diversos tipos de pisos: tile, vinil, laminado, porcelanato e LVP, proporcionando o acabamento perfeito para sua reforma.",
  },
  {
    icon: Star,
    title: "Acabamento High-End",
    text: "Trabalho focado em clientes exigentes de alto padrão, entregando um acabamento impecável (high ticket) e sofisticação em cada detalhe.",
  },
  {
    icon: CheckCircle,
    title: "Garantia e Organização",
    text: "Oferecemos garantia de serviço e um processo de trabalho extremamente organizado, mantendo o local limpo após a conclusão da obra.",
  },
  {
    icon: Clock,
    title: "Experiência Comprovada",
    text: "Mais de 5 anos de experiência sólida do nosso principal profissional, garantindo técnica apurada e resultados que superam expectativas.",
  },
];

export default function ExcellusDetails() {
  return (
    <section className="py-10 md:py-20 bg-background/50 border-y border-white/5">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <span className="eyebrow">Excelência Técnica</span>
          <h2 className="mt-4 text-2xl sm:text-4xl md:text-5xl font-light text-foreground leading-[1.2]">
            Especialidades que <span className="text-gold-gradient">Valorizam</span> Seu Imóvel
          </h2>
          <p className="mt-6 text-muted-foreground font-light text-xs md:text-base leading-relaxed">
            Combinamos anos de experiência prática com um olhar apurado para o design contemporâneo, 
            entregando soluções completas para quem não abre mão da qualidade.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {detailItems.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="luxe-card group p-6 md:p-10 text-center flex flex-col items-center"
            >
              <div
                className="pointer-events-none absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 opacity-70"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(44 70% 75% / 0.9), transparent)",
                }}
                aria-hidden="true"
              />

              <div className="relative inline-flex items-center justify-center h-12 w-12 md:h-14 md:w-14 mb-5 md:mb-6">
                <span
                  className="absolute inset-0 rounded-full opacity-90"
                  style={{ background: "var(--gradient-gold-soft)" }}
                  aria-hidden="true"
                />
                <span
                  className="absolute inset-[2px] rounded-full bg-card"
                  aria-hidden="true"
                />
                <Icon
                  className="relative h-4 w-4 md:h-5 md:w-5 text-primary transition-transform duration-500 group-hover:scale-110"
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="font-[var(--font-heading)] text-lg md:text-2xl font-medium text-foreground mb-3 md:mb-4 tracking-tight">
                {title}
              </h3>
              <p className="text-[0.85rem] md:text-[0.9rem] text-muted-foreground leading-relaxed font-light">
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
