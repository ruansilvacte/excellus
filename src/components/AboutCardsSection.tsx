import { motion } from "framer-motion";
import { Bed, Gift, Palmtree, CheckCircle2, MapPin, Users, Star, Shield } from "lucide-react";
import logo from "@/assets/logo.png";
import { useHomeContent } from "@/hooks/useHomeContent";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const highlights = [
  {
    icon: Bed,
    text: "Deep cleaning for Airbnb & short-term rental turnovers",
  },
  {
    icon: Gift,
    text: "Eco-friendly products safe for families and pets",
  },
  {
    icon: Palmtree,
    text: "Serving 100+ ZIP codes across Florida's Gulf Coast",
  },
];

const stats = [
  { icon: MapPin, value: "100+", label: "ZIP Codes Covered" },
  { icon: Users, value: "400+", label: "Monthly Services" },
  { icon: Star, value: "5.0", label: "Google Rating" },
  { icon: Shield, value: "100%", label: "Quality Guarantee" },
];

export default function AboutCardsSection() {
  const { data: content } = useHomeContent();
  const scale = parseFloat(content?.home_font_scale_about || "1") || 1;

  return (
    <section className="w-full py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Card */}
        <motion.div
          className="rounded-3xl overflow-hidden border border-border/40 bg-card shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left — Image with overlay */}
            <div className="relative min-h-[320px] lg:min-h-[420px]">
              <img
                src={content?.home_about_image_1 || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"}
                alt="Premium living room staged for guests"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3
                  className="text-xl md:text-2xl font-bold text-white leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Your Home Is Our Priority
                </h3>
                <p className="text-white/70 text-sm mt-1">
                  Premium cleaning with consistency & care
                </p>
              </div>
            </div>

            {/* Right — Text + Checklist */}
            <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <motion.span
                className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: "hsl(43 65% 50%)" }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                About Us
              </motion.span>

              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "hsl(30 12% 35%)",
                  fontSize: `clamp(${1.5 * scale}rem, ${3 * scale}vw, ${2.25 * scale}rem)`,
                }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15, ease }}
              >
                {content?.home_about_title || "Who We Are"}
              </motion.h2>

              <motion.p
                className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8"
                style={{ fontSize: `${1 * scale}rem` }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
              >
                {content?.home_about_text_1 || "All Shine Up is a professional cleaning company based in Parrish, Florida, recognized for operational excellence and commitment to elevated quality standards. Founded and led by Kassandra, our model is driven by efficiency, consistency, and rigorous attention to detail — delivering superior results every time."}
              </motion.p>

              {/* Checklist items */}
              <div className="space-y-5">
                {highlights.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.08, ease }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "hsl(43 55% 92%)" }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: "hsl(43 65% 50%)" }}
                          strokeWidth={1.6}
                        />
                      </div>
                      <span
                        className="text-sm md:text-base font-medium pt-2"
                        style={{ color: "hsl(30 10% 25%)" }}
                      >
                        {item.text}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-5 text-center border border-border/60"
                style={{ background: "hsl(0 0% 100% / 0.8)" }}
              >
                <Icon
                  className="w-5 h-5 mx-auto mb-2"
                  style={{ color: "hsl(43 65% 50%)" }}
                  strokeWidth={1.8}
                />
                <p
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-heading)", color: "hsl(30 12% 35%)" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
