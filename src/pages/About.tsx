import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";

const ease = [0.22, 1, 0.36, 1] as const;

const aboutSlides = [
  "/images/about-hero.png",
  "/images/about-slide-2.png",
  "/images/about-slide-3.png",
];

const qualityItems = [
  {
    image: "/images/quality-1.png",
    title: "ECO-FRIENDLY PRODUCTS",
    description: "Safe, natural cleaning supplies for your family.",
  },
  {
    image: "/images/quality-2.png",
    title: "PRECISION CLEANING",
    description: "Thorough attention to every surface and corner.",
  },
  {
    image: "/images/quality-3.png",
    title: "SPOTLESS RESULTS",
    description: "Consistent, impeccable quality every visit.",
  },
  {
    image: "/images/clean-bathroom.png",
    title: "TRUSTED PROFESSIONALS",
    description: "Experienced, reliable team you can count on.",
  },
];

export default function About() {
  const [current, setCurrent] = useState(0);

  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % aboutSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/about" fallbackTitle="About Us — All Shine Up" />
      <Header />

      {/* ── Banner with rotating images (topo) ── */}
      <section className="relative w-full min-h-[550px] md:min-h-[650px] overflow-hidden">
        {/* Rotating background images */}
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={aboutSlides[current]}
            alt={`About slide ${current + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        {/* Dark blue overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(30 10% 15% / 0.90) 0%, hsl(30 10% 20% / 0.80) 50%, hsl(43 58% 61% / 0.35) 100%)",
          }}
        />

        <motion.div
          className="relative z-10 max-w-3xl px-8 md:px-16 pt-32 md:pt-40 pb-20 md:pb-28 flex flex-col justify-center h-full"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            All Shine Up
          </h2>
          <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4">
            Based in Parrish, Florida, All Shine Up is a premium professional
            cleaning company led by Kassandra, serving a wide region from Tampa
            to Venice with a strong presence in Bradenton and Sarasota counties
            — covering over 100 ZIP codes.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            Our main focus is Airbnb and short-term rental owners, along with
            busy homeowners and small businesses. We deliver high-quality
            cleaning through a reliable team, structured processes, and a
            24-hour satisfaction guarantee. Your home is our priority.
          </p>
        </motion.div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-8 md:left-16 flex gap-3 z-10">
          {aboutSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: current === idx ? "3rem" : "0.75rem",
                background:
                  current === idx
                    ? "linear-gradient(90deg, hsl(43 74% 65%), hsl(43 60% 75%))"
                    : "hsl(210 20% 60%)",
              }}
            />
          ))}
        </div>
      </section>

      {/* ── Quality Standards ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-heading)", backgroundImage: "linear-gradient(135deg, hsl(43 74% 50%), hsl(43 60% 60%), hsl(210 80% 55%))" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            Quality Standards.
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {qualityItems.map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease }}
              >
                <div
                  className="w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden mb-4 md:mb-6 shadow-lg border-3 md:border-4"
                  style={{ borderColor: "hsl(30 15% 30%)" }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3
                  className="text-xs md:text-sm font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] mb-1 md:mb-2"
                  style={{ color: "hsl(30 15% 30%)" }}
                >
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm max-w-[220px] hidden md:block">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Split — Image + "Where Clean Meets Care" ── */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-7 min-h-[500px]">
          {/* Left — Image with blue overlay */}
          <div className="relative overflow-hidden min-h-[400px] md:min-h-[500px] md:order-2 md:col-span-4">
            <img
              src="/images/about-comfort.png"
              alt="Happy cleaning professional"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, hsl(30 10% 15% / 0.3) 0%, transparent 50%)",
              }}
            />
          </div>

          {/* Right — Text with gradient background */}
          <motion.div
            className="flex flex-col justify-center px-6 md:px-14 lg:px-20 py-10 md:py-14 text-white relative overflow-hidden md:order-1 md:col-span-3"
            style={{ background: "var(--gradient-gold)" }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, hsl(200 80% 70% / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 30%, hsl(43 55% 55% / 0.2) 0%, transparent 40%)",
              }}
            />
            <div className="relative z-10">
              <h2
                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 md:mb-8"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Where Clean Meets Care
              </h2>
              <p className="text-white/85 text-base md:text-lg leading-relaxed">
                All Shine Up is built on a foundation of quality, trust, and
                consistency. With 5-star ratings on Google and Turno, active
                presence on Instagram, Facebook, and Nextdoor, and integration
                with platforms like Turno for seamless scheduling, we continue
                to grow as the top cleaning choice across Florida's Gulf Coast.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          className="max-w-4xl mx-auto rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden"
          style={{ background: "var(--gradient-gold)" }}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, hsl(200 80% 70% / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 30%, hsl(43 55% 55% / 0.2) 0%, transparent 40%)",
            }}
          />
          <div className="relative z-10">
            <h2
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ready to experience the difference?
            </h2>
            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto mb-8">
              Let our family take care of yours. Get a free, no-obligation quote today.
            </p>
            <motion.a
              href="/quote"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold bg-white shadow-lg transition-all duration-300"
              style={{ color: "hsl(30 15% 30%)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone className="w-4 h-4" />
              Get a Free Quote
            </motion.a>
          </div>
        </motion.div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
