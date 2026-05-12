import { Award, Users, ThumbsUp, BadgeCheck } from "lucide-react";
import aboutImg from "@/assets/excellus-about.jpg";
import galleryImg from "@/assets/excellus-gallery-1.jpg";

const stats = [
  { icon: Award, value: "+120", label: "Projetos Entregues" },
  { icon: Users, value: "5", label: "Anos de Experiência" },
  { icon: ThumbsUp, value: "98%", label: "Satisfação dos Clientes" },
  { icon: BadgeCheck, value: "100%", label: "Compromisso" },
];

const timeline = [
  { year: "2019", title: "O Começo", desc: "Fundamos a Excellus com um sonho: elevar o padrão das reformas em Orlando. Começamos com um pequeno time, mas com grandes ambições." },
  { year: "2021", title: "Expansão", desc: "Ampliamos nossa atuação para toda a região de Orlando, conquistando dezenas de clientes exigentes e construindo nossa reputação." },
  { year: "2023", title: "Reconhecimento", desc: "Alcançamos a marca de 100 projetos entregues com 98% de satisfação, consolidando-nos como referência em reformas high-end na Flórida." },
  { year: "2025", title: "Excelência Plena", desc: "Hoje, a Excellus é sinônimo de sofisticação, qualidade e atendimento premium. Nossa história continua sendo escrita, projeto por projeto." },
];

export default function AboutHistory() {
  return (
    <section id="historia" className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
 
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-20">
          <span className="eyebrow">Nossa História</span>
          <h2 className="mt-5 text-2xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1]">
            Mais de 5 Anos de{" "}
            <span className="text-gold-gradient">Excelência</span>{" "}
            em Reformas de Luxo
          </h2>
          <div className="mt-6 flex justify-center">
            <span className="gold-divider w-12 md:w-14" />
          </div>
        </div>
 
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-16 md:mb-24">
          {/* Image column */}
          <div className="relative group">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[var(--shadow-luxe)]">
              <img
                src={aboutImg}
                alt="Equipe Excellus Remodeling em projeto de luxo"
                className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            </div>
            {/* Decorative floating image */}
            <div className="absolute -bottom-8 -right-8 hidden md:block w-48 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-[var(--shadow-luxe)]">
              <img src={galleryImg} alt="Detalhe de projeto premium" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -top-4 -left-4 h-20 w-20 rounded-2xl bg-primary/10 border border-primary/20 hidden md:block" aria-hidden="true" />
          </div>
 
          {/* Storytelling + stats */}
          <div className="lg:pl-6">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light mb-4">
              A Excellus Remodeling nasceu da paixão por transformar ambientes comuns em espaços extraordinários.
              Fundada em Orlando, Flórida, somos especialistas em reformas de alto padrão que unem design
              contemporâneo, materiais premium e execução impecável.
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
              Cada projeto é tratado com o mesmo rigor de um estúdio de arquitetura de classe mundial.
              Nossa equipe de especialistas cuida de cada detalhe, do planejamento à entrega final,
              garantindo resultados que superam expectativas.
            </p>
 
            {/* Stats */}
            <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center group">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3 transition-all group-hover:bg-primary/15 group-hover:border-primary/35">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.3} />
                  </div>
                  <div className="font-[var(--font-heading)] text-xl md:text-3xl font-medium text-foreground">{value}</div>
                  <div className="mt-1 text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground font-light leading-relaxed">
                    {label}
                  </div>
                </div>
              ))}
            </div>
 
            {/* Áreas */}
            <div className="mt-8 md:mt-10 bg-white/60 backdrop-blur p-5 md:p-6 rounded-2xl border border-primary/20 shadow-sm">
              <h4 className="text-[0.6rem] tracking-[0.3em] uppercase text-primary font-medium mb-3">Áreas de Atuação</h4>
              <p className="text-xs md:text-sm text-foreground/75 leading-relaxed font-light">
                Atendemos <strong>Orlando e regiões:</strong> Winter Garden, Winter Park, Horizon West, Lake Nona,
                Lake Mary, Z World, Gotha, Ocala, Deltona e Daytona.
              </p>
            </div>
          </div>
        </div>
 
        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="eyebrow">Nossa Trajetória</span>
          </div>
          <div className="relative">
            {/* Vertical gold line */}
            <div className="absolute left-[28px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden md:block" aria-hidden="true" />
 
            <div className="space-y-8 md:space-y-10">
              {timeline.map((item, i) => (
                <div key={item.year} className="flex gap-8 group">
                  {/* Year bubble */}
                  <div className="shrink-0 hidden md:flex flex-col items-center">
                    <div className="h-14 w-14 rounded-full border-2 border-primary/40 bg-background flex items-center justify-center text-xs font-medium text-primary tracking-wider group-hover:border-primary group-hover:bg-primary/5 transition-all">
                      {item.year}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="luxe-card flex-1 p-5 md:p-7">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="md:hidden text-[0.6rem] tracking-[0.3em] uppercase text-primary font-medium">{item.year}</span>
                      <h3 className="font-[var(--font-heading)] text-lg md:text-xl font-medium text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
