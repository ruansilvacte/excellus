import { motion } from "framer-motion";
import { Heart, Users, Clock, Shield } from "lucide-react";
import { useHomeContent } from "@/hooks/useHomeContent";

const stats = [
  { icon: Clock, value: "15+", label: "Years of Experience" },
  { icon: Users, value: "500+", label: "Happy Families" },
  { icon: Heart, value: "100%", label: "Family Owned" },
  { icon: Shield, value: "0", label: "Hidden Fees" },
];

const defaultImages = [
  "/images/clean-floor.png",
  "/images/clean-bedroom.png",
  "/images/clean-bathroom.png",
  "/images/clean-table.png",
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  const { data: content } = useHomeContent();

  const images = [
    content?.home_about_image_1 || defaultImages[0],
    content?.home_about_image_2 || defaultImages[1],
    content?.home_about_image_3 || defaultImages[2],
    content?.home_about_image_4 || defaultImages[3],
  ];

  return (
    <section id="about" className="w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Images */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -60, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden h-56">
                  <img src={images[0]} alt="Clean floor" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-3xl overflow-hidden h-72">
                  <img src={images[1]} alt="Clean bedroom" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-3xl overflow-hidden h-72">
                  <img src={images[2]} alt="Clean bathroom" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-3xl overflow-hidden h-56">
                  <img src={images[3]} alt="Clean table" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-4 rounded-2xl backdrop-blur-xl shadow-xl border border-white/20 flex items-center gap-3"
              style={{ background: "linear-gradient(135deg, hsl(43 74% 50% / 0.95), hsl(43 60% 60% / 0.9))" }}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
            >
              <Heart className="w-5 h-5 text-white fill-white" />
              <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                Family Owned Since 2010
              </span>
            </motion.div>
          </motion.div>

          {/* Right — Text */}
          <div>
            <motion.div
              className="flex items-center gap-2 mb-4"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease }}
            >
              <span className="text-xl" style={{ color: "hsl(43 65% 50%)" }}>✦</span>
              <span className="text-sm md:text-base font-semibold uppercase tracking-[0.25em]" style={{ color: "hsl(43 65% 50%)" }}>
                About Us
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "hsl(30 15% 30%)" }}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              A family story built on{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(43 74% 50%), hsl(43 60% 60%), hsl(210 80% 55%))" }}>
                trust & care
              </span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              {content?.home_about_text_1 || "Navy Cleaning Solutions started 15 years ago when a mom needed a career with flexibility to raise her family. What began as a one‑person mission quickly became the family's main project — built on hard work, honesty, and heart."}
            </motion.p>

            <motion.p
              className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
            >
              {content?.home_about_text_2 || "Today we're a small, dedicated team of two serving busy families, working parents, couples, and small offices across Massachusetts. Every clean is personal — because we treat your home the way we treat ours. No hidden fees, no travel charges, just reliable results every time."}
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="rounded-2xl p-4 text-center border border-border/60" style={{ background: "hsl(210 30% 96% / 0.6)" }}>
                    <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: "hsl(43 65% 50%)" }} strokeWidth={1.8} />
                    <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "hsl(30 15% 30%)" }}>{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
