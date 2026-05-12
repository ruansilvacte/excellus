import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, Briefcase, BedDouble, ArrowRight, Sparkles, Hammer } from "lucide-react";
import { useServices } from "@/hooks/useServices";
import { useHomeContent } from "@/hooks/useHomeContent";
import type { LucideIcon } from "lucide-react";

/**
 * Maps each service slug → icon + short pitch shown on hover.
 * The button title comes straight from the Services DB (admin-editable).
 */
const SERVICE_META: Record<string, { icon: LucideIcon; pitch: string; label: string }> = {
  "airbnb-short-term-rental": {
    icon: BedDouble,
    label: "Airbnb",
    pitch: "Guest-ready turnovers that protect your 5-star rating.",
  },
  "commercial-cleaning": {
    icon: Briefcase,
    label: "Commercial",
    pitch: "Spotless offices and storefronts that impress clients and staff.",
  },
  "residential-cleaning": {
    icon: Home,
    label: "Residential",
    pitch: "A pristine home you'll come back to — every single time.",
  },
  "deep-cleaning": {
    icon: Sparkles,
    label: "Deep",
    pitch: "Top-to-bottom reset for a truly fresh space.",
  },
  "post-construction-cleaning": {
    icon: Hammer,
    label: "Post-Construction",
    pitch: "Move-in ready after every renovation.",
  },
};

const PRIMARY_SLUGS = ["airbnb-short-term-rental", "commercial-cleaning", "residential-cleaning"];

export default function ServiceTypeButtons() {
  const navigate = useNavigate();
  const { data: services = [] } = useServices();
  const { data: content } = useHomeContent();

  const scale = parseFloat(content?.home_font_scale_service_buttons || "1") || 1;

  // Pick the 3 primary services in the desired order, fall back to first 3 if missing.
  const buttons = PRIMARY_SLUGS
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean) as typeof services;

  const list = buttons.length === 3 ? buttons : services.slice(0, 3);

  if (list.length === 0) return null;

  return (
    <section className="w-full pt-10 pb-6 md:pt-14 md:pb-10 px-4 bg-[hsl(210_20%_96%)]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          className="font-bold tracking-[0.25em] uppercase mb-4"
          style={{ color: "hsl(30 70% 50%)", fontSize: `${0.75 * scale}rem` }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          ✦ Choose Your Service
        </motion.p>
        <motion.h2
          className="font-bold leading-[1.15] tracking-tight mb-3"
          style={{
            fontFamily: "var(--font-heading)",
            color: "hsl(30 15% 30%)",
            fontSize: `clamp(${1.875 * scale}rem, ${4 * scale}vw, ${3.5 * scale}rem)`,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Cleaning <em className="not-italic" style={{ color: "hsl(43 74% 55%)" }}>built around your space</em>
        </motion.h2>
        <motion.p
          className="text-muted-foreground max-w-2xl mx-auto mb-10"
          style={{ fontSize: `${1 * scale}rem` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Pick the experience you need — every service is run by the same trained, trusted Parrish team.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {list.map((s, i) => {
            const meta = SERVICE_META[s.slug] || {
              icon: Home,
              label: s.title,
              pitch: s.description?.slice(0, 90) || "Tap to learn more.",
            };
            const Icon = meta.icon;
            return (
              <motion.button
                key={s.id}
                onClick={() => navigate(`/services/${s.slug}`)}
                className="group relative rounded-2xl bg-card border border-border/60 p-6 md:p-7 text-left overflow-hidden hover:border-accent hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, hsl(43 74% 55% / 0.08), transparent 60%)" }}
                />

                <div className="relative flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{ background: "hsl(43 74% 55% / 0.12)" }}
                  >
                    <Icon className="w-6 h-6" style={{ color: "hsl(43 74% 45%)" }} />
                  </div>
                  <ArrowRight
                    className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-500"
                  />
                </div>

                <h3
                  className="font-bold mb-2 text-foreground"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: `${1.375 * scale}rem`,
                    lineHeight: 1.2,
                  }}
                >
                  {meta.label}
                </h3>

                {/* Default tagline (collapses on hover) */}
                <p
                  className="text-muted-foreground transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-1"
                  style={{ fontSize: `${0.875 * scale}rem` }}
                >
                  {s.title}
                </p>

                {/* Pitch (revealed on hover) */}
                <p
                  className="absolute left-6 right-6 md:left-7 md:right-7 bottom-6 md:bottom-7 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 font-medium"
                  style={{
                    color: "hsl(30 15% 30%)",
                    fontSize: `${0.875 * scale}rem`,
                    lineHeight: 1.45,
                  }}
                >
                  {meta.pitch}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}