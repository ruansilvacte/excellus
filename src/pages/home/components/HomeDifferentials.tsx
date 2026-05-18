import { Award, Gem, Hammer, MapPin } from "lucide-react";

const items = [
  {
    icon: Award,
    title: "14 Anos de Experiência",
    text: "Expertise comprovada no setor de pisos, com centenas de projetos entregues.",
  },
  {
    icon: Gem,
    title: "Materiais de Ponta",
    text: "Utilizamos apenas produtos de alta qualidade para garantir durabilidade.",
  },
  {
    icon: Hammer,
    title: "Mão de Obra Especializada",
    text: "Acabamento impecável realizado por profissionais qualificados.",
  },
  {
    icon: MapPin,
    title: "Atendimento Regional",
    text: "Cobrimos New Jersey, Nova York e Pensilvânia.",
  },
];

export default function HomeDifferentials() {
  return (
    <section id="sobre" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-primary/70 font-medium">
            Nossos Diferenciais
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-primary mt-4 leading-tight">
            Qualidade e Confiança em <span className="italic text-primary/80">Cada Detalhe</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => (
            <div
              key={it.title}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-accent/60 transition-all duration-500 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)] hover:-translate-y-1"
            >
              <div className="h-14 w-14 rounded-xl bg-primary text-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary transition-colors duration-500">
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl text-primary mb-2">{it.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
