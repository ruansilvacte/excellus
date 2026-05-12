import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone } from "lucide-react";
import faqBanner from "@/assets/faq-banner.jpg";

const faqs = [
  {
    question: "How do I book a cleaning?",
    answer: "Fill out the quote form on our website or call us directly. We confirm your appointment within 24 hours with all the details.",
  },
  {
    question: "How long does a session take?",
    answer: "Regular cleaning: 2–3 hours. Deep cleaning: 5–7 hours. Airbnb turnovers: 1.5–3 hours depending on the property size.",
  },
  {
    question: "What's included in each service?",
    answer: "Every service follows a detailed checklist. Regular covers surfaces, floors, kitchens & bathrooms. Deep cleaning adds baseboards, vents, and behind furniture. Check each service page for the full list.",
  },
  {
    question: "Do you offer a satisfaction guarantee?",
    answer: "Yes — a 24-hour guarantee. If anything doesn't meet your expectations, we'll come back and fix it at no extra cost.",
  },
  {
    question: "What about pricing?",
    answer: "Transparent pricing based on property size, condition, and service type. Free, no-obligation quotes. No hidden fees.",
  },
  {
    question: "Do you bring supplies?",
    answer: "Yes, we bring all professional-grade cleaning supplies and equipment. We also accommodate special product requests.",
  },
  {
    question: "Are you insured?",
    answer: "Fully insured and bonded. All team members are background-checked and professionally trained.",
  },
  {
    question: "Do you handle Airbnb turnovers?",
    answer: "It's our specialty. We integrate with Turno for seamless scheduling, and our standards are built for 5-star guest reviews.",
  },
  {
    question: "What areas do you serve?",
    answer: "The greater Tampa Bay area — from Tampa to Venice, including Bradenton, Sarasota, Parrish, Lakewood Ranch, and 100+ ZIP codes.",
  },
  {
    question: "Can I schedule recurring cleanings?",
    answer: "Absolutely. Weekly, bi-weekly, or monthly plans with flexible scheduling. Recurring clients get priority booking.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/faq" fallbackTitle="FAQ — All Shine Up" />
      <Header />

      {/* Hero Banner */}
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={faqBanner}
          alt="Clean modern home interior"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={640}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(30 10% 8% / 0.75) 0%, hsl(30 10% 12% / 0.6) 60%, hsl(30 10% 8% / 0.8) 100%)",
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5">
          <motion.span
            className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-3"
            style={{ color: "hsl(43 74% 65%)", fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.span>
          <motion.h1
            className="text-3xl md:text-5xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Got questions?{" "}
            <span style={{ color: "hsl(43 74% 58%)" }}>We've got answers.</span>
          </motion.h1>
          <motion.p
            className="text-sm md:text-base mt-3 max-w-lg"
            style={{ color: "hsl(0 0% 80%)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Everything you need to know about our cleaning services.
          </motion.p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border/60 bg-card px-5 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <AccordionTrigger className="text-sm md:text-base font-semibold text-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <motion.div
            className="mt-16 rounded-3xl overflow-hidden text-center"
            style={{ background: "#D4A017" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-8 md:p-16 flex flex-col items-center gap-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/50">
                Still Have Questions?
              </span>
              <h3
                className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight max-w-lg"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Let's make your property shine.
              </h3>
              <p className="text-white/70 text-sm md:text-base max-w-md leading-relaxed">
                Request your personalized quote in minutes. Every service is tailored to your property.
              </p>
              <motion.a
                href="/quote"
                className="mt-2 inline-flex items-center gap-2 px-8 py-3 rounded-full text-[13px] font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                style={{ background: "white", color: "hsl(30 10% 12%)" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone className="w-4 h-4" />
                Get a Free Quote
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
