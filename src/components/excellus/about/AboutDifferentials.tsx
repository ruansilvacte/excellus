import { Gem, Shield, Star, Users, Clock, Eye } from "lucide-react";

const differentials = [
  {
    icon: Gem,
    title: "Acabamento Impecável",
    desc: "Cada superfície, cada detalhe, cada milímetro. Trabalhamos com padrões de qualidade que só encontra em projetos de alto padrão internacional.",
  },
  {
    icon: Shield,
    title: "Gestão Completa",
    desc: "Do planejamento ao pós-obra. Cuidamos de tudo para que você não precise se preocupar com nada além de curtir o resultado.",
  },
  {
    icon: Star,
    title: "Materiais Premium",
    desc: "Selecionamos os melhores materiais do mercado — mármores importados, porcelanatos de alta resistência, madeiras nobres e metais sofisticados.",
  },
  {
    icon: Users,
    title: "Equipe Especializada",
    desc: "Profissionais treinados e apaixonados pelo que fazem. Nossa equipe combina técnica apurada com sensibilidade estética refinada.",
  },
  {
    icon: Clock,
    title: "Pontualidade",
    desc: "Respeitamos prazos como um valor inegociável. Porque sabemos que seu tempo e seu lar são preciosos.",
  },
  {
    icon: Eye,
    title: "Transparência Total",
    desc: "Orçamentos claros, comunicação constante e zero surpresas. Você acompanha cada etapa com total confiança.",
  },
];

export default function AboutDifferentials() {
  return (
    <section className="py-10 md:py-16 bg-secondary/30 texture-noise">
      <div className="container mx-auto px-4 md:px-6">
 
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <span className="eyebrow">Nossos Diferenciais</span>
          <h2 className="mt-5 text-2xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1]">
            O que nos torna{" "}
            <span className="text-gold-gradient">Únicos</span>
          </h2>
          <div className="mt-6 flex justify-center">
            <span className="gold-divider w-12 md:w-14" />
          </div>
          <p className="mt-6 text-sm md:text-base text-muted-foreground font-light leading-relaxed">
            Não somos apenas uma empresa de reformas. Somos parceiros dedicados
            à transformação do seu espaço com precisão e sofisticação.
          </p>
        </div>
 
        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentials.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="luxe-card p-6 md:p-8 group cursor-default"
              style={{ background: "linear-gradient(160deg, hsl(0 0% 100% / 0.9), hsl(36 30% 97% / 0.75))" }}
            >
              {/* Icon with gold ring */}
              <div className="relative mb-6 inline-block">
                <div className="h-14 w-14 rounded-2xl bg-primary/8 border border-primary/20 flex items-center justify-center transition-all duration-500 group-hover:bg-primary/12 group-hover:border-primary/35 group-hover:scale-105">
                  <Icon className="h-6 w-6 text-primary" strokeWidth={1.3} />
                </div>
                {/* Gold glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "0 0 20px hsl(38 45% 52% / 0.2)" }} />
              </div>

              <h3 className="font-[var(--font-heading)] text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {desc}
              </p>

              {/* Bottom gold accent */}
              <div className="mt-6 h-px w-0 group-hover:w-full bg-gradient-to-r from-primary/50 to-transparent transition-all duration-700" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
