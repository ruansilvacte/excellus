import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutImg from "@/assets/excellus-about.jpg";

export default function AboutHero() {
  return (
    <section
      className="relative flex items-center overflow-hidden min-h-[70svh] md:min-h-[50svh]"
    >
      {/* Background image */}
      <img
        src={aboutImg}
        alt="Excellus luxury interior"
        className="absolute inset-0 w-full h-full object-cover scale-110"
        aria-hidden="true"
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(30_10%_5%/0.85)] via-[hsl(30_10%_5%/0.60)] to-[hsl(30_10%_5%/0.30)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(30_10%_5%/0.70)] via-transparent to-[hsl(30_10%_5%/0.20)]" aria-hidden="true" />

      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"
        }}
        aria-hidden="true"
      />

      {/* Floating light orbs */}
      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-primary/60 blur-sm animate-float-slow" />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 rounded-full bg-white/70 blur-[1px] animate-float-slow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative container mx-auto px-4 md:px-6 pt-28 md:pt-36 pb-32 md:pb-16 max-w-4xl">
        <div className="animate-reveal">
          <div className="flex items-center gap-3 mb-5 md:mb-6">
            <span className="gold-divider w-8 md:w-14" />
            <span className="eyebrow" style={{ color: "hsl(44 90% 72%)" }}>
              Our Identity
            </span>
          </div>

          <h1
            className="font-[var(--font-heading)] text-2xl md:text-6xl font-light leading-[1.1] text-white tracking-tight"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.7), 0 1px 6px rgba(0,0,0,0.5)" }}
          >
            Our Story and <br />
            <span style={{ fontStyle: "italic", color: "hsl(44 90% 72%)" }}>
              Our Values
            </span>
          </h1>

          <p
            className="mt-8 md:mt-5 max-w-xl text-xs md:text-lg text-white/85 leading-relaxed font-light"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.8)" }}
          >
            Excellus Remodeling specializes in high-end renovations.
            We are dedicated to delivering every project with precision and unmatched quality.
          </p>

          <div className="mt-14 md:mt-10 flex flex-wrap items-center gap-5">
            <Button
              asChild
              size="lg"
              className="rounded-full px-6 md:px-8 h-11 md:h-14 text-[0.65rem] md:text-sm tracking-[0.2em] uppercase font-normal text-white border-0 shadow-[0_15px_35px_-12px_rgba(0,0,0,0.5)] transition-all hover:scale-[1.02] hover:brightness-110 hover:text-white"
              style={{ background: "linear-gradient(135deg, #b8860b 0%, #8b6508 100%)" }}
            >
              <a href="https://wa.me/16893063140" target="_blank" rel="noreferrer" className="flex items-center gap-3">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#historia"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-primary transition-colors"
        aria-label="Scroll"
      >
        <div className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center backdrop-blur">
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
        <span className="text-[0.6rem] tracking-[0.4em] uppercase font-light">Explore</span>
      </a>
    </section>
  );
}