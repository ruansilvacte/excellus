import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/excellus-hero.jpg";

export default function TestimonialsCTA() {
  return (
    <section className="relative py-8 md:py-36 overflow-hidden">
      <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover scale-110" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(30_10%_6%/0.93)] via-[hsl(30_10%_6%/0.82)] to-[hsl(30_10%_6%/0.70)]" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px opacity-25" style={{ background: "linear-gradient(90deg,transparent,hsl(44 90% 65%),transparent)" }} aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-25" style={{ background: "linear-gradient(90deg,transparent,hsl(44 90% 65%),transparent)" }} aria-hidden="true" />
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%,hsl(44 90% 60%),transparent)" }} aria-hidden="true" />

      <div className="relative container mx-auto px-4 md:px-6 text-center">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-5">
          <span className="gold-divider w-8 md:w-14" />
          <span className="eyebrow" style={{ color: "hsl(44 90% 72%)" }}>Next Showcase</span>
          <span className="gold-divider w-8 md:w-14" />
        </div>

        <h2 className="font-[var(--font-heading)] text-xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.1]" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}>
          Your project could be{" "}
          <br />
          <span style={{ fontStyle: "italic", color: "hsl(44 90% 72%)" }}>the next showcase.</span>
        </h2>

        <p className="mt-6 md:mt-8 text-[0.65rem] md:text-lg text-white/70 font-light max-w-lg mx-auto leading-relaxed">
          Join hundreds of satisfied customers who trusted Excellus to transform their spaces.
        </p>

        <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-5">
          <a
            href="https://wa.me/16893063140"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-6 md:px-10 h-11 md:h-16 rounded-full text-[0.6rem] md:text-sm tracking-[0.2em] uppercase font-medium text-white transition-all hover:scale-[1.04] hover:brightness-110"
            style={{ background: "linear-gradient(135deg,#c9a227,#8b6508)", boxShadow: "0 0 40px hsl(44 80% 50%/0.35),0 15px 35px -12px rgba(0,0,0,0.5)" }}
          >
            Request Premium Quote <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}