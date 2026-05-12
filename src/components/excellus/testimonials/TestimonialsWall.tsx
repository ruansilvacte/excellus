import { Star } from "lucide-react";

const wallReviews = [
  { name: "Ana P.", loc: "Orlando", text: "Simplesmente impecável. Recomendo de olhos fechados!", stars: 5 },
  { name: "John K.", loc: "Winter Park", text: "Equipe profissional, resultado extraordinário.", stars: 5 },
  { name: "Lucia F.", loc: "Lake Nona", text: "Banheiro dos sonhos entregue no prazo. Excelentes!", stars: 5 },
  { name: "David M.", loc: "Horizon West", text: "Qualidade premium em cada detalhe. Superou todas expectativas.", stars: 5 },
  { name: "Patricia S.", loc: "Winter Garden", text: "Profissionalismo e atenção que raramente encontramos.", stars: 5 },
  { name: "Carlos B.", loc: "Lake Mary", text: "Resultado digno de uma revista de arquitetura.", stars: 5 },
  { name: "Maria J.", loc: "Gotha", text: "Incrível do início ao fim. Equipe dedicada e caprichosa.", stars: 5 },
  { name: "Tom L.", loc: "Deltona", text: "Reforma completa entregue com perfeição. Recomendo!", stars: 5 },
  { name: "Fernanda C.", loc: "Orlando", text: "Transformaram nossa casa. Detalhismo impressionante.", stars: 5 },
];

export default function TestimonialsWall() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="eyebrow">Mural de Avaliações</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-light text-foreground leading-tight">
            Vozes de quem <span className="text-gold-gradient">viveu a experiência</span>
          </h2>
          <div className="mt-5 flex justify-center"><span className="gold-divider" /></div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 max-w-5xl mx-auto">
          {wallReviews.map((r) => (
            <div key={r.name + r.loc} className="break-inside-avoid mb-5 luxe-card p-6 group">
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 font-light leading-relaxed italic">"{r.text}"</p>
              <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                <div className="font-medium text-foreground text-sm">{r.name}</div>
                <div className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground font-light">{r.loc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
