import { Gem, ShieldCheck, Sparkles } from "lucide-react";

const items = [
  {
    icon: Gem,
    title: "Impeccable Finishes",
    text: "Superior quality standards at every stage of the project.",
  },
  {
    icon: ShieldCheck,
    title: "Service Guarantee",
    text: "A total commitment to deadlines, quality, and your peace of mind.",
  },
  {
    icon: Sparkles,
    title: "Cleanliness & Organization",
    text: "Respect for your space through clean and organized processes.",
  },
];

export default function ExcellusDifferentials() {
  return (
    <section
      id="diferenciais"
      className="relative py-10 md:py-20 bg-background texture-noise"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]" aria-hidden="true">
        <div
          className="absolute top-0 right-0 w-1/3 h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center max-w-5xl mx-auto mb-10 md:mb-14">
          <span className="eyebrow">Our Difference</span>
          <h2 className="mt-4 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1] md:whitespace-nowrap">
            Full-Service <span className="text-gold-gradient">Home Renovations</span>
          </h2>
          <div className="mt-5 flex justify-center">
            <span className="gold-divider w-12 md:w-14" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
          {items.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="luxe-card group p-6 md:p-11 text-center"
            >
              {/* subtle inner glow */}
              <div
                className="pointer-events-none absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 opacity-70"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(44 70% 75% / 0.9), transparent)",
                }}
                aria-hidden="true"
              />

              <div className="relative inline-flex items-center justify-center h-14 w-14 md:h-16 md:w-16 mx-auto mb-6 md:mb-7">
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
                  className="relative h-5 w-5 md:h-6 md:w-6 text-primary transition-transform duration-500 group-hover:scale-110"
                  strokeWidth={1.3}
                />
              </div>

              <h3 className="font-[var(--font-heading)] text-xl md:text-[1.65rem] font-medium text-foreground mb-3 tracking-tight">
                {title}
              </h3>
              <p className="text-[0.95rem] text-muted-foreground leading-relaxed font-light max-w-xs mx-auto">
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}