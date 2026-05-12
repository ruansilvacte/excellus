import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/excellus-hero.jpg";

export default function AboutCTA() {
  return (
    <section className="relative py-8 md:py-24 overflow-hidden">
      {/* Background */}
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-105"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(30_10%_6%/0.92)] via-[hsl(30_10%_6%/0.80)] to-[hsl(30_10%_6%/0.70)]" aria-hidden="true" />
 
      {/* Decorative architecture elements */}
      <div className="absolute top-0 left-0 right-0 h-px opacity-30 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, hsl(44 90% 65%), transparent)" }}
        aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-30 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, hsl(44 90% 65%), transparent)" }}
        aria-hidden="true"
      />
 
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(44 90% 60%), transparent)" }}
        aria-hidden="true"
      />
 
      <div className="relative container mx-auto px-4 md:px-6 text-center">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-5">
          <span className="gold-divider w-8 md:w-14" />
          <span className="eyebrow" style={{ color: "hsl(44 90% 72%)" }}>Your Next Step</span>
          <span className="gold-divider w-8 md:w-14" />
        </div>
 
        <h2
          className="font-[var(--font-heading)] text-xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.1]"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}
        >
          Your home deserves a{" "}
          <br />
          <span style={{ fontStyle: "italic", color: "hsl(44 90% 72%)" }}>
            new standard of sophistication.
          </span>
        </h2>
 
        <p className="mt-8 md:mt-6 text-[0.65rem] md:text-lg text-white/75 font-light max-w-xl mx-auto leading-relaxed">
          Connect with our team to discover how we can transform your
          space into a functional masterpiece.
        </p>
 
        <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-5">
          <Button
            asChild
            size="lg"
            className="rounded-full px-6 md:px-10 h-11 md:h-16 text-[0.6rem] md:text-sm tracking-[0.2em] uppercase font-medium text-white border-0 transition-all hover:scale-[1.04] hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, #c9a227 0%, #8b6508 100%)",
              boxShadow: "0 0 40px hsl(44 80% 50% / 0.35), 0 15px 35px -12px rgba(0,0,0,0.5)"
            }}
          >
            <a href="https://wa.me/16893063140" target="_blank" rel="noreferrer" className="flex items-center gap-3">
              Request a Premium Consultation <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}