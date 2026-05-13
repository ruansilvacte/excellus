import { Star } from "lucide-react";

const wallReviews = [
  { name: "Ana P.", loc: "Orlando", text: "Simply impeccable. I recommend it with my eyes closed!", stars: 5 },
  { name: "John K.", loc: "Winter Park", text: "Professional team, extraordinary results.", stars: 5 },
  { name: "Lucia F.", loc: "Lake Nona", text: "Dream bathroom delivered on time. Excellent!", stars: 5 },
  { name: "David M.", loc: "Horizon West", text: "Premium quality in every detail. Exceeded all expectations.", stars: 5 },
  { name: "Patricia S.", loc: "Winter Garden", text: "Professionalism and attention that are rarely found.", stars: 5 },
  { name: "Carlos B.", loc: "Lake Mary", text: "A result worthy of an architectural magazine.", stars: 5 },
  { name: "Maria J.", loc: "Gotha", text: "Incredible from start to finish. Dedicated and meticulous team.", stars: 5 },
  { name: "Tom L.", loc: "Deltona", text: "Complete renovation delivered perfectly. I recommend it!", stars: 5 },
  { name: "Fernanda C.", loc: "Orlando", text: "They transformed our home. Impressive attention to detail.", stars: 5 },
];

export default function TestimonialsWall() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="eyebrow">Reviews Wall</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-light text-foreground leading-tight">
            Voices of those who <span className="text-gold-gradient">experienced it</span>
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