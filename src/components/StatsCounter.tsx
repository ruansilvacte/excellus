import { motion } from "framer-motion";
import { Users, Home, Award, Star } from "lucide-react";

const stats = [
  { icon: Home, number: "100+", label: "ZIP Codes Covered" },
  { icon: Users, number: "400+", label: "Monthly Services" },
  { icon: Star, number: "5.0", label: "Star Rating" },
  { icon: Award, number: "15+", label: "Team Members" },
];

export default function StatsCounter() {
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-5xl mx-auto rounded-3xl px-8 py-12 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(30 10% 10%), hsl(30 10% 16%), hsl(35 14% 11%))" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 50%, hsl(43 74% 55% / 0.15) 0%, transparent 50%), radial-gradient(circle at 85% 30%, hsl(43 60% 50% / 0.1) 0%, transparent 40%)",
          }}
        />
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-3 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <stat.icon className="w-10 h-10 md:w-12 md:h-12 text-[hsl(43_74%_55%)]" strokeWidth={1.5} />
            <span className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              {stat.number}
            </span>
            <span className="text-white/80 text-sm md:text-base">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
