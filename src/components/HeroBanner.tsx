import { motion, AnimatePresence } from "framer-motion";
import { useHomeContent } from "@/hooks/useHomeContent";
import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";

const staggerChildren = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
  exit: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -25, transition: { duration: 0.4, ease: "easeIn" as const } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  exit: { opacity: 0, x: 30, transition: { duration: 0.35, ease: "easeIn" as const } },
};

export default function HeroBanner() {
  const { data: content } = useHomeContent();
  const navigate = useNavigate();
  const scale = parseFloat(content?.home_font_scale_hero || "1") || 1;

  return (
    <section className="relative w-full h-[85vh] md:h-screen min-h-[500px] md:min-h-[650px] overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay - strong left gradient for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, hsl(30 10% 6% / 0.92) 0%, hsl(30 10% 10% / 0.75) 45%, hsl(30 10% 12% / 0.35) 70%, transparent 100%)",
        }}
      />
      {/* Extra mobile overlay */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(30 10% 6% / 0.7) 0%, hsl(30 10% 8% / 0.5) 60%, hsl(30 10% 6% / 0.4) 100%)",
        }}
      />

      {/* Content - positioned left, vertically centered like reference */}
      <div className="relative z-10 h-full max-w-7xl mx-auto flex flex-col items-center justify-center pt-16 md:pt-24 px-5 md:px-16">
        <motion.div
          className="max-w-2xl text-center"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          {/* Subtitle - small uppercase like reference */}
          <motion.p
            variants={fadeLeft}
            className="text-[9px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.35em] font-bold mb-3 md:mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              color: "hsl(43 74% 65%)",
              fontSize: `${0.6875 * scale}rem`,
            }}
          >
            {content?.home_hero_subtitle || "Experience the freshness of a clean home"}
          </motion.p>

          {/* Title - large serif-like, matching reference proportions */}
          <h1
            className="text-[1.8rem] md:text-[3.5rem] lg:text-[4.2rem] font-extrabold leading-[1.1] tracking-tight mb-3 md:mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: `clamp(${1.8 * scale}rem, ${5 * scale}vw, ${4.2 * scale}rem)`,
            }}
          >
            <motion.span className="block text-white" variants={fadeUp}>
              {content?.home_hero_title_line1 || "Professional"}
            </motion.span>
            <motion.span
              className="block"
              variants={fadeUp}
              style={{ color: "hsl(43 74% 58%)" }}
            >
              {content?.home_hero_title_line2 || "Cleaning Services"}
            </motion.span>
            <motion.span className="block text-white" variants={fadeUp}>
              {content?.home_hero_title_line3 || "For Every Space"}
            </motion.span>
          </h1>

          {/* Description - smaller, max-width constrained like reference */}
          <motion.p
            variants={fadeUp}
            className="text-[11px] md:text-[15px] leading-relaxed mb-5 md:mb-8 max-w-md font-medium"
            style={{
              fontFamily: "var(--font-body)",
              color: "hsl(0 0% 80%)",
              textShadow: "0 1px 8px hsl(30 10% 6% / 0.5)",
              fontSize: `${0.9375 * scale}rem`,
            }}
          >
            {content?.home_hero_description ||
              "Let All Shine Up transform your home, office, or Airbnb into a pristine haven. Discover our tailored solutions today!"}
          </motion.p>

          {/* Two CTA buttons side by side like reference */}
          <motion.div className="flex flex-wrap items-center justify-center gap-3 md:gap-4" variants={fadeUp}>
            <button
              onClick={() => navigate("/services")}
              className="px-6 md:px-10 py-2.5 md:py-3.5 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                fontFamily: "var(--font-heading)",
                background: "hsl(43 74% 49%)",
                color: "white",
              }}
            >
              Our Services
            </button>
            <a
              href="tel:+14696792875"
              className="px-6 md:px-10 py-2.5 md:py-3.5 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:scale-105 border-2 border-white/40 hover:border-white/70 flex items-center gap-2.5"
              style={{
                fontFamily: "var(--font-heading)",
                background: "transparent",
                color: "white",
              }}
            >
              <Phone className="w-4 h-4" />
              (469) 679-2875
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
