import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import { Users, TrendingUp, Shield, Clock, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description: "Clear career progression with training and skill development for every team member.",
  },
  {
    icon: Shield,
    title: "Structured Operations",
    description: "Work within a well-organized system with detailed checklists and professional standards.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "We respect your time. Choose from flexible shifts that fit your lifestyle.",
  },
  {
    icon: Users,
    title: "Supportive Team",
    description: "Join a close-knit team led by Kassandra, where respect and communication come first.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Careers() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/careers" fallbackTitle="Careers — All Shine Up" />
      <Header />

      {/* Style 4: Dark section hero */}
      <section
        className="relative w-full pt-36 pb-24 overflow-hidden"
        style={{ background: "linear-gradient(175deg, hsl(30 10% 15%) 0%, hsl(30 10% 20%) 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-3xl"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            Build something meaningful with us.
          </motion.h1>
          <motion.p
            className="text-white/60 text-base md:text-lg mt-6 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Structure, growth, and a team that values your contribution — join All Shine Up.
          </motion.p>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-heading)", color: "hsl(30 10% 15%)" }}
            >
              Why work with{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(43 74% 50%), hsl(43 60% 60%))" }}
              >
                All Shine Up?
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  className="group rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "var(--gradient-gold-card)" }}
                  >
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3
                    className="text-xl font-bold mb-3 text-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-20 rounded-3xl p-10 md:p-16 text-center"
            style={{
              background: "var(--gradient-gold)",
              boxShadow: "0 16px 50px hsl(30 10% 15% / 0.28)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3
              className="text-2xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ready to make a difference?
            </h3>
            <p className="text-white/75 mb-8 max-w-xl mx-auto">
              We're always looking for reliable, detail-oriented professionals who take pride in their work.
              Join a team that delivers 400+ services monthly across Florida.
            </p>
            <motion.a
              href="/quote"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white transition-all"
              style={{ background: "hsl(0 0% 100% / 0.15)", border: "1px solid hsl(0 0% 100% / 0.3)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
