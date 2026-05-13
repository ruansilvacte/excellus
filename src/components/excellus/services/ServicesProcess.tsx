import { MessageSquare, Ruler, HardHat, Sparkles } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Consultation",
    desc: "Initial meeting to understand your vision, needs, and budget. We present references and possibilities to align expectations and build the project's foundation.",
  },
  {
    icon: Ruler,
    step: "02",
    title: "Planning",
    desc: "Detailed project development with material selection, schedule definition and transparent budget. Every detail is considered before execution.",
  },
  {
    icon: HardHat,
    step: "03",
    title: "Execution",
    desc: "Our specialized team begins the work with technical rigor and respect for your space. Constant communication and regular updates for your peace of mind.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Premium Completion",
    desc: "Thorough finishing inspection, impeccable cleaning, and formal project delivery. Service warranty and post-completion follow-up included.",
  },
];

export default function ServicesProcess() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30 texture-noise">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow">Our Process</span>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.05]">
            From Dream to{" "}
            <span className="text-gold-gradient">Reality</span>
          </h2>
          <div className="mt-6 flex justify-center">
            <span className="gold-divider" />
          </div>
          <p className="mt-6 text-base text-muted-foreground font-light leading-relaxed">
            A carefully structured process to ensure each project
            is delivered with perfection, on time and without surprises.
          </p>
        </div>

        {/* Process steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line desktop */}
          <div className="absolute top-[3.5rem] left-[10%] right-[10%] h-px hidden lg:block"
            style={{ background: "linear-gradient(90deg, transparent, hsl(38 55% 55% / 0.5) 20%, hsl(44 80% 65% / 0.7) 50%, hsl(38 55% 55% / 0.5) 80%, transparent)" }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="group text-center">
                {/* Step number + icon */}
                <div className="relative inline-flex flex-col items-center mb-6">
                  {/* Step number */}
                  <span
                    className="absolute -top-3 -right-3 text-[0.55rem] tracking-[0.2em] font-medium text-white bg-primary rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {step}
                  </span>
                  {/* Icon circle */}
                  <div className="h-16 w-16 rounded-full border-2 border-primary/30 bg-background flex items-center justify-center transition-all duration-500 group-hover:border-primary group-hover:bg-primary/5 group-hover:scale-105 shadow-[0_0_0_6px_hsl(38_45%_52%/0.07)]">
                    <Icon className="h-7 w-7 text-primary" strokeWidth={1.3} />
                  </div>
                </div>

                <h3 className="font-[var(--font-heading)] text-xl md:text-2xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {desc}
                </p>

                {/* Bottom accent */}
                <div className="mt-5 h-px w-0 group-hover:w-16 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}