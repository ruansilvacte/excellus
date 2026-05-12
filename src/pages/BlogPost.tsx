import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import BlogSection from "@/components/BlogSection";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { posts } = useBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center max-w-2xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-4" style={{ color: "hsl(30 15% 30%)" }}>
            Article not found
          </h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ background: "var(--gradient-gold)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = posts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <article className="pt-24">
        {/* Hero Image */}
        <motion.div
          className="w-full h-64 sm:h-80 md:h-[420px] relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, hsl(30 10% 15% / 0.7) 0%, transparent 60%)",
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 -mt-16 relative z-10">
          <motion.div
            className="bg-card rounded-3xl border border-border shadow-lg p-8 md:p-12 overflow-hidden"
            style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Back button */}
            <button
              onClick={() => navigate("/blog")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ background: "hsl(43 74% 50%)" }}
              >
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-3xl md:text-4xl font-bold leading-tight mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "hsl(30 15% 30%)" }}
            >
              {post.title}
            </h1>

            {/* Body */}
            <div className="space-y-5">
              {post.content.length === 1 && post.content[0].startsWith("<") ? (
                <motion.div
                  className="blog-content max-w-none"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  dangerouslySetInnerHTML={{ __html: post.content[0] }}
                />
              ) : (
                post.content.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    className="text-base md:text-lg leading-relaxed text-muted-foreground"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                  >
                    {paragraph}
                  </motion.p>
                ))
              )}
            </div>
          </motion.div>

        </div>
      </article>

      <div className="py-8 md:py-12" />

      <Footer />
      <FloatingSocial />
    </div>
  );
}
