"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Sparkles, Star, Shield, Clock } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
  }

  .bg-grid-theme {
    background-size: 60px 60px;
    background-image: 
      linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
      linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .text-3d-matte {
    color: var(--color-foreground);
    text-shadow: 
      0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent), 
      0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }

  .text-silver-matte {
    background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: 
      drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent)) 
      drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }

  .text-card-silver-matte {
    background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: 
      drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
      drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  .premium-depth-card {
    background: linear-gradient(145deg, hsl(215 70% 25%) 0%, hsl(215 60% 8%) 100%);
    box-shadow: 
      0 40px 100px -20px rgba(0, 0, 0, 0.9),
      0 20px 40px -20px rgba(0, 0, 0, 0.8),
      inset 0 1px 2px rgba(255, 255, 255, 0.2),
      inset 0 -2px 4px rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.04);
    position: relative;
  }

  .card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
    mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .iphone-bezel {
    background-color: #111;
    box-shadow: 
      inset 0 0 0 2px #52525B, 
      inset 0 0 0 7px #000, 
      0 40px 80px -15px rgba(0,0,0,0.9),
      0 15px 25px -5px rgba(0,0,0,0.7);
    transform-style: preserve-3d;
  }

  .screen-glare {
    background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
    background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
    box-shadow: 
      0 10px 20px rgba(0,0,0,0.3),
      inset 0 1px 1px rgba(255,255,255,0.05),
      inset 0 -1px 1px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
    backdrop-filter: blur(24px); 
    -webkit-backdrop-filter: blur(24px);
    box-shadow: 
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 25px 50px -12px rgba(0, 0, 0, 0.8),
      inset 0 1px 1px rgba(255,255,255,0.2),
      inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .btn-modern-light {
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
    color: #0F172A;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }

  .btn-modern-dark {
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    background: linear-gradient(180deg, hsl(210 85% 34%) 0%, hsl(215 60% 20%) 100%);
    color: #FFFFFF;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover {
    transform: translateY(-3px);
    background: linear-gradient(180deg, hsl(210 85% 40%) 0%, hsl(215 60% 25%) 100%);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.8);
  }

  .progress-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    stroke-dasharray: 402;
    stroke-dashoffset: 402;
    stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  brandName = "Navy Cleaning",
  tagline1 = "Experience the difference,",
  tagline2 = "in every detail.",
  cardHeading = "Professional cleaning, redefined.",
  cardDescription = (
    <>
      With a structured digital presence across allshineup.com, Instagram, Facebook, and 5-star ratings on Google and Turno, All Shine Up delivers efficient communication, well-defined processes, and a 24-hour service guarantee — trusted by over 400 clients monthly across Massachusetts.
    </>
  ),
  metricValue = 500,
  metricLabel = "Happy Clients",
  ctaHeading = "Book your cleaning today.",
  ctaDescription = "Join hundreds of satisfied families across Massachusetts who trust Navy Cleaning Solutions for their homes.",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // Mouse interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // GSAP scroll timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 30 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.2, autoAlpha: 1, y: 0, ease: "power3.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=0.8");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });
    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div ref={containerRef} className={cn("relative w-full h-screen overflow-hidden", className)} style={{ perspective: "1200px" }} {...props}>
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* Background Grid */}
      <div className="bg-grid-theme absolute inset-0 z-0" />

      {/* Hero Text */}
      <div className="hero-text-wrapper absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
        <p className="text-track text-sm md:text-base font-semibold uppercase tracking-[0.3em] mb-6" style={{ color: "hsl(210 85% 45%)" }}>
          {brandName}
        </p>
        <h2
          className="text-track text-4xl md:text-6xl lg:text-8xl font-bold text-center leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="text-3d-matte">{tagline1}</span>
          <br />
          <span className="text-days text-silver-matte">{tagline2}</span>
        </h2>
      </div>

      {/* Main Card */}
      <div
        ref={mainCardRef}
        className="main-card premium-depth-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center overflow-hidden"
        style={{ width: "85vw", maxWidth: "1400px", height: "80vh", borderRadius: "40px" }}
      >
        <div className="card-sheen" />
        <div className="film-grain" />

        {/* Card Content - Text + Phone side by side */}
        <div className="absolute inset-0 z-30 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-6 md:px-16">
          {/* Left Text */}
          <div className="card-left-text flex-1 max-w-lg">
            <h3 className="text-card-silver-matte text-3xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              {cardHeading}
            </h3>
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6">
              {cardDescription}
            </p>
            <div className="flex flex-wrap gap-3">
              {["5★ Google & Turno", "400+ Services/Month", "allshineup.com"].map((tag) => (
                <span key={tag} className="floating-ui-badge px-4 py-2 rounded-full text-white text-xs font-medium flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Phone */}
          <div className="card-right-text flex-shrink-0">
          <div className="mockup-scroll-wrapper" style={{ perspective: "1200px" }}>
            <div ref={mockupRef} className="iphone-bezel relative rounded-[3rem] p-3 w-[220px] md:w-[280px] h-[440px] md:h-[560px]">
              {/* Screen */}
              <div className="relative w-full h-full rounded-[2.4rem] overflow-hidden bg-gradient-to-br from-[hsl(215_60%_12%)] to-[hsl(215_60%_6%)]">
                <div className="screen-glare absolute inset-0 z-10 rounded-[2.4rem]" />

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-b-2xl z-20" />

                {/* Phone Content */}
                <div className="relative z-5 p-5 pt-10 flex flex-col items-center h-full">
                  {/* Widget 1 - Counter */}
                  <div className="phone-widget widget-depth rounded-2xl p-4 w-full mb-3 flex items-center gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <svg viewBox="0 0 140 140" className="w-full h-full">
                        <circle cx="70" cy="70" r="64" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                        <circle cx="70" cy="70" r="64" fill="none" stroke="hsl(210 85% 45%)" strokeWidth="8" className="progress-ring" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Star className="w-5 h-5 text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white text-2xl font-bold">
                        <span className="counter-val">0</span>+
                      </p>
                      <p className="text-zinc-500 text-xs">{metricLabel}</p>
                    </div>
                  </div>

                  {/* Widget 2 - Status */}
                  <div className="phone-widget widget-depth rounded-2xl p-4 w-full mb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <p className="text-white text-sm font-medium">Trusted Service</p>
                    </div>
                    <p className="text-zinc-500 text-xs">Professional cleaning since 2009</p>
                  </div>

                  {/* Widget 3 */}
                  <div className="phone-widget widget-depth rounded-2xl p-4 w-full">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <p className="text-white text-sm font-medium">Quick Booking</p>
                    </div>
                    <p className="text-zinc-500 text-xs">Schedule your cleaning in minutes</p>
                  </div>
                </div>
              </div>

              {/* Hardware Buttons */}
              <div className="absolute -right-[3px] top-[120px] w-[3px] h-[40px] rounded-r-sm" style={{ background: "linear-gradient(90deg, #404040 0%, #171717 100%)" }} />
              <div className="absolute -right-[3px] top-[180px] w-[3px] h-[60px] rounded-r-sm" style={{ background: "linear-gradient(90deg, #404040 0%, #171717 100%)" }} />
              <div className="absolute -left-[3px] top-[140px] w-[3px] h-[30px] rounded-l-sm" style={{ background: "linear-gradient(270deg, #404040 0%, #171717 100%)" }} />
            </div>
          </div>
          </div>
        </div>

        {/* Floating Badges */}
        <div className="floating-badge floating-ui-badge absolute top-8 right-8 md:top-12 md:right-20 z-40 px-4 py-2 rounded-full flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-white text-xs font-medium">15+ Years</span>
        </div>
        <div className="floating-badge floating-ui-badge absolute bottom-8 left-8 md:bottom-12 md:left-20 z-40 px-4 py-2 rounded-full flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-white text-xs font-medium">5-Star Rated</span>
        </div>

      </div>
    </div>
  );
}
