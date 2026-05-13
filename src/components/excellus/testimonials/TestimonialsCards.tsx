import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah L.",
    location: "Winter Garden, FL",
    stars: 5,
    text: "Excellus completely transformed our master bathroom. The finish is impeccable, and the team treated our home with extreme care and respect. I wholeheartedly recommend them to anyone seeking true quality.",
    project: "Bathroom Remodel",
    gradient: "from-amber-900/70 to-stone-800/50",
    initials: "SL",
  },
  {
    name: "Marcus T.",
    location: "Lake Nona, FL",
    stars: 5,
    text: "Professionalism from start to finish. The slatted LED panel turned out exactly as we imagined — sophisticated and functional. Our vacation home significantly increased in value after the project.",
    project: "Decorative Panels",
    gradient: "from-stone-700/70 to-amber-900/50",
    initials: "MT",
  },
  {
    name: "Emma R.",
    location: "Orlando, FL",
    stars: 5,
    text: "Sophistication, on-time completion, and zero headaches. The warranty offered gave us complete peace of mind. We will definitely hire them again and have already referred them to 3 other friends.",
    project: "Full Renovation",
    gradient: "from-amber-800/60 to-stone-700/50",
    initials: "ER",
  },
  {
    name: "James O.",
    location: "Horizon West, FL",
    stars: 5,
    text: "Incredible team, very attentive and detail-oriented. The master bathroom looks like it's from an architecture magazine. It exceeded all our expectations. Impeccable work.",
    project: "Master Bathroom",
    gradient: "from-stone-800/70 to-amber-900/55",
    initials: "JO",
  },
  {
    name: "Carolina M.",
    location: "Winter Park, FL",
    stars: 5,
    text: "From the first contact, we realized we were in professional hands. The result of the integrated kitchen is simply beautiful. Work of the highest standard.",
    project: "Integrated Kitchen",
    gradient: "from-amber-900/65 to-stone-700/55",
    initials: "CM",
  },
  {
    name: "Robert A.",
    location: "Lake Mary, FL",
    stars: 5,
    text: "We hired them for a complete renovation of two bathrooms and the flooring throughout the house. The result is impressive. Quality and detailing rarely seen in the market.",
    project: "Residential Renovation",
    gradient: "from-stone-700/65 to-amber-800/55",
    initials: "RA",
  },
];

export default function TestimonialsCards() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow">Premium Testimonials</span>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.05]">
            Stories of <span className="text-gold-gradient">Transformation</span>
          </h2>
          <div className="mt-6 flex justify-center"><span className="gold-divider" /></div>
          <p className="mt-6 text-base text-muted-foreground font-light leading-relaxed">
            Each testimonial is an expression of a project delivered with excellence and a client whose expectations were exceeded.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.name} className="luxe-card flex flex-col overflow-hidden group">
              {/* Photo area with monogram */}
              <div className={`h-24 bg-gradient-to-br ${t.gradient} flex items-center px-8 relative`}>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center text-white font-[var(--font-heading)] text-lg font-light">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{t.name}</div>
                    <div className="text-white/70 text-[0.62rem] tracking-wider uppercase font-light">{t.location}</div>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="flex-1 p-7">
                <Quote className="h-7 w-7 text-primary mb-4 opacity-70" strokeWidth={1.3} />
                <blockquote className="text-foreground/80 leading-relaxed font-light text-[0.95rem]">
                  "{t.text}"
                </blockquote>
              </div>

              {/* Project tag */}
              <div className="px-7 pb-6">
                <span className="inline-block px-3 py-1 text-[0.6rem] tracking-[0.2em] uppercase font-medium text-primary bg-primary/8 border border-primary/20 rounded-full">
                  {t.project}
                </span>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}