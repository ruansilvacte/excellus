import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import { Star, Shield, Users } from "lucide-react";

const partners = [
  {
    name: "Turno",
    description: "Automated scheduling and seamless integration for short-term rental turnovers. Our 5-star rating on Turno reflects our commitment to consistent, guest-ready results.",
    icon: Star,
    stats: "5.0 ★ Rating",
  },
  {
    name: "Nextdoor",
    description: "Trusted by local communities across Tampa Bay. Our presence on Nextdoor connects us with homeowners who value reliability, quality, and neighborhood trust.",
    icon: Users,
    stats: "Top Recommended",
  },
  {
    name: "Google Business",
    description: "Verified business with consistent 5-star reviews. Our Google presence ensures transparency and trust for every potential client who finds us.",
    icon: Shield,
    stats: "5.0 ★ Reviews",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Partnerships() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/partnerships" fallbackTitle="Partnerships — All Shine Up" />
      <Header />

      {/* Style 3: Full-width impact phrase */}
      <section className="w-full pt-36 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05]"
            style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--foreground))" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            Platforms that trust our quality.
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-base md:text-lg mt-6 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Verified on Turno, Google, and Nextdoor — our reputation speaks through every platform.
          </motion.p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="w-full py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {partners.map((partner, i) => {
              const Icon = partner.icon;
              return (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  className="group relative rounded-2xl border border-border bg-card p-8 text-center transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-110"
                    style={{ background: "var(--gradient-gold-card)" }}
                  >
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3
                    className="text-xl font-bold text-foreground mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {partner.name}
                  </h3>
                  <span
                    className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
                    style={{ background: "hsl(43 74% 50% / 0.1)", color: "hsl(43 74% 50%)" }}
                  >
                    {partner.stats}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {partner.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
