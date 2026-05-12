const team = [
  {
    name: "Carlos Mendes",
    role: "Fundador & Diretor",
    specialty: "Design de Interiores · Gestão de Obras",
    desc: "Mais de 8 anos de experiência em reformas de alto padrão. Fundou a Excellus com a visão de elevar o mercado de reformas em Orlando.",
    initials: "CM",
    gradient: "from-amber-900/80 to-stone-800/60",
  },
  {
    name: "Isabela Torres",
    role: "Arquiteta Sênior",
    specialty: "Arquitetura Premium · Banheiros & Cozinhas",
    desc: "Especialista em projetos residenciais de alto padrão. Combina funcionalidade e estética com maestria singular.",
    initials: "IT",
    gradient: "from-stone-700/80 to-amber-900/50",
  },
  {
    name: "Rodrigo Lima",
    role: "Gerente de Projetos",
    specialty: "Logística · Prazos · Qualidade",
    desc: "Responsável por garantir que cada projeto seja entregue no prazo e com os mais altos padrões de qualidade.",
    initials: "RL",
    gradient: "from-amber-800/70 to-stone-700/60",
  },
];

export default function AboutTeam() {
  return (
    <section className="py-12 md:py-16 bg-secondary/20 texture-noise">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="eyebrow">Nossa Equipe</span>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.05]">
            Os{" "}
            <span className="text-gold-gradient">Especialistas</span>{" "}
            por Trás dos Projetos
          </h2>
          <div className="mt-6 flex justify-center">
            <span className="gold-divider" />
          </div>
          <p className="mt-6 text-base text-muted-foreground font-light leading-relaxed">
            Uma equipe de profissionais apaixonados, cada um com expertise única
            e um compromisso inabalável com a excelência.
          </p>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member) => (
            <div
              key={member.name}
              className="group luxe-card overflow-hidden"
            >
              {/* Photo placeholder with initials */}
              <div className={`relative h-72 bg-gradient-to-br ${member.gradient} flex items-end overflow-hidden`}>
                {/* Large monogram */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-[var(--font-heading)] text-[7rem] font-light text-white/15 select-none leading-none group-hover:scale-110 transition-transform duration-700"
                    aria-hidden="true"
                  >
                    {member.initials}
                  </span>
                </div>
                {/* Name overlay */}
                <div className="relative w-full p-6 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                  <div className="text-[0.6rem] tracking-[0.35em] uppercase text-white/70 font-light mb-1">
                    {member.specialty}
                  </div>
                </div>
                {/* Gold accent line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-7">
                <h3 className="font-[var(--font-heading)] text-2xl font-medium text-foreground">
                  {member.name}
                </h3>
                <div className="mt-1 text-[0.65rem] tracking-[0.2em] uppercase text-primary font-medium">
                  {member.role}
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed font-light">
                  {member.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
