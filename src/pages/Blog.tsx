import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import BlogSection from "@/components/BlogSection";
import SeoHead from "@/components/SeoHead";
import blogBanner from "@/assets/blog-banner.jpg";

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/blog" fallbackTitle="Blog — All Shine Up" />
      <Header />

      {/* Hero Banner */}
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={blogBanner}
          alt="Modern clean home interior"
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
            Fresh Reads
          </motion.span>
          <motion.h1
            className="text-3xl md:text-5xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Ideas, News &{" "}
            <span style={{ color: "hsl(43 74% 58%)" }}>Inspiration</span>
          </motion.h1>
          <motion.p
            className="text-sm md:text-base mt-3 max-w-lg"
            style={{ color: "hsl(0 0% 80%)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Expert cleaning advice, industry news, and behind-the-scenes of All Shine Up.
          </motion.p>
        </div>
      </section>

      <BlogSection />
      <Footer />
      <FloatingSocial />
    </div>
  );
}
