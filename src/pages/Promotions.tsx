import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import { Gift, RefreshCw, Sparkles, ArrowRight } from "lucide-react";

const promotions = [
  {
    icon: Gift,
    tag: "New Clients",
    title: "First Cleaning Special",
    description: "Experience our premium service at an introductory rate. First-time clients receive a special offer on their initial cleaning — because great impressions start with a clean space.",
    cta: "Claim Offer",
  },
  {
    icon: RefreshCw,
    tag: "Recurring Plans",
    title: "Recurring Service Savings",
    description: "Lock in exclusive rates with a weekly, bi-weekly, or monthly plan. Recurring clients enjoy priority scheduling, consistent quality, and savings that add up over time.",
    cta: "Start Saving",
  },
  {
    icon: Sparkles,
    tag: "Referral",
    title: "Refer a Friend",
    description: "Love our service? Share it. When you refer a friend and they book, both of you receive a special reward. Quality cleaning deserves to be shared.",
    cta: "Refer Now",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Promotions() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/promotions" fallbackTitle="Promotions — All Shine Up" />
      <Header />

      {/* Style 5: Progressive reveal */}
      <section className="w-full pt-36 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.span
            className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Special Offers
          </motion.span>
          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-[1.05] mt-4 max-w-3xl"
            style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--foreground))" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            Smart rewards, not cheap discounts.
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-base md:text-lg mt-5 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            Premium value for first-time clients and loyal customers — because quality deserves to be rewarded.
          </motion.p>
        </div>
      </section>

      {/* Promotions */}
      <section className="w-full py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {promotions.map((promo, i) => {
              const Icon = promo.icon;
              return (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  className="group relative rounded-2xl overflow-hidden border border-border bg-card transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                >
                  {/* Gradient top accent */}
                  <div
                    className="h-1.5 w-full"
                    style={{ background: "linear-gradient(90deg, hsl(43 74% 50%), hsl(43 60% 60%), hsl(43 58% 45%))" }}
                  />

                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: "var(--gradient-gold-card)" }}
                      >
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <span
                        className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                        style={{ background: "hsl(43 74% 50% / 0.1)", color: "hsl(43 74% 50%)" }}
                      >
                        {promo.tag}
                      </span>
                    </div>

                    <h3
                      className="text-xl font-bold text-foreground mb-3"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {promo.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {promo.description}
                    </p>

                    <a
                      href="/quote"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all"
                    >
                      {promo.cta}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
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
