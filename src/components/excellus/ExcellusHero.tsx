import { ArrowRight, Gem, ShieldCheck, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingCards = [
  { icon: Gem, title: "Impeccable Finishes", text: "Superior quality standards" },
  { icon: ShieldCheck, title: "Service Guarantee", text: "Complete dedication to your project" },
  { icon: Users, title: "Expert Team", text: "Experienced and dedicated professionals" },
];

export default function ExcellusHero() {
  return (
    <section
      id="home"
      className="relative flex items-center overflow-hidden min-h-[85svh] md:min-h-screen"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
        aria-hidden="true"
      >
        <source src="/videos/30fps-1.mp4" type="video/mp4" />
      </video>

      {/* Cinematic overlays — stronger for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(30_10%_5%/0.80)] via-[hsl(30_10%_5%/0.55)] to-[hsl(30_10%_5%/0.30)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(30_10%_5%/0.60)] via-transparent to-[hsl(30_10%_5%/0.25)]" aria-hidden="true" />

      {/* Subtle light particles */}
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
        <div className="absolute top-1/4 left-1/3 w-1 h-1 rounded-full bg-primary/60 blur-[1px] animate-float-slow" />
        <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 rounded-full bg-white/50 blur-[1px] animate-float-slow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/5 w-1 h-1 rounded-full bg-primary/50 blur-[1px] animate-float-slow" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative container mx-auto px-4 md:px-6 pt-28 md:pt-28 pb-24 md:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left content */}
        <div className="lg:col-span-7 text-white animate-reveal">
          <div className="flex items-center gap-3 mb-4 md:mb-5">
            <span className="gold-divider w-8 md:w-14" />
            <span className="eyebrow" style={{ color: "hsl(44 90% 72%)", textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>
              Excellence · Sophistication · Trust
            </span>
          </div>
 
          <h1
            className="font-[var(--font-heading)] text-2xl sm:text-5xl md:text-6xl lg:text-[3.75rem] leading-[1.1] font-normal tracking-tight text-white"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.75), 0 1px 6px rgba(0,0,0,0.6)" }}
          >
            Luxury Home Remodeling in Orlando:{" "}
            <span style={{ fontStyle: "italic", color: "hsl(44 90% 72%)", textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}>Impeccable Finishes</span> and Guaranteed Service.
          </h1>
 
          <p
            className="mt-6 md:mt-5 max-w-xl text-xs md:text-base text-white leading-relaxed font-light"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.85)" }}
          >
            Experts in transforming bathrooms and living spaces with exclusive
            standards for discerning homes in Orlando and the surrounding area.
          </p>
 
          <div className="mt-10 md:mt-9 flex flex-wrap items-center gap-5">
            <Button
              asChild
              size="lg"
              className="rounded-full px-5 md:px-7 h-11 md:h-14 text-[0.65rem] md:text-sm tracking-[0.2em] uppercase font-normal text-white shadow-[0_15px_35px_-12px_rgba(0,0,0,0.5)] transition-all hover:scale-[1.02] border-0 hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #b8860b 0%, #8b6508 100%)", backgroundColor: "#b8860b" }}
            >
              <a href="https://wa.me/16893063140" target="_blank" rel="noreferrer" className="flex items-center gap-3">
                Request a Premium Quote <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Floating glassmorphism card */}
        <div className="lg:col-span-5 lg:pl-10 hidden lg:block">
          <div className="relative ml-auto max-w-sm rounded-2xl border border-white/25 bg-black/30 backdrop-blur-2xl p-7 shadow-[0_30px_80px_-20px_hsl(0_0%_0%/0.55)] animate-float-slow">
            <div className="absolute -inset-px rounded-2xl pointer-events-none ring-1 ring-inset ring-white/10" />
            <ul className="space-y-5">
              {floatingCards.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center text-primary shrink-0">
                    <Icon className="h-5 w-5" strokeWidth={1.4} />
                  </div>
                  <div>
                    <div className="text-white font-semibold tracking-wide" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>{title}</div>
                    <div className="text-xs text-white/85 font-light mt-0.5">{text}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#diferenciais"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 hover:text-primary transition-colors"
        aria-label="Scroll down"
      >
        <div className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center backdrop-blur">
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
        <span className="text-[0.6rem] tracking-[0.4em] uppercase font-light">Scroll</span>
      </a>
    </section>
  );
}