import { motion } from "framer-motion";
import { Clock, Calendar, Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { posts, categories } = useBlogPosts();

  const filtered = posts.filter((post) => {
    const matchCategory = activeCategory === "All" || post.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const goToPost = (slug: string) => navigate(`/blog/${slug}`);
  const showFeatured = activeCategory === "All" && !searchQuery && filtered.length > 0;
  const gridPosts = showFeatured ? filtered.slice(1) : filtered;

  return (
    <section className="w-full py-16 md:py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">

        {/* ── Header removed ── */}

        {/* ── Search & Filters ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mb-12 md:mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          <div className="relative w-full sm:max-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-[13px] bg-card border border-border text-foreground transition-all duration-300 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-accent text-white border-accent"
                    : "bg-card text-muted-foreground border-border hover:border-accent/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Featured Post ── */}
        {showFeatured && (
          <motion.article
            className="mb-12 md:mb-16 rounded-3xl overflow-hidden bg-card cursor-pointer group border border-border shadow-sm hover:shadow-lg transition-shadow duration-500"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            onClick={() => goToPost(filtered[0].slug)}
            whileHover={{ y: -2 }}
          >
            <div className="grid md:grid-cols-2">
              <div className="overflow-hidden h-56 md:h-[380px] relative">
                <img
                  src={filtered[0].image}
                  alt={filtered[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-accent">
                  Featured
                </span>
              </div>
              <div className="p-7 md:p-12 flex flex-col justify-center gap-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                  {filtered[0].category}
                </span>
                <h3
                  className="text-xl md:text-3xl font-extrabold leading-snug"
                  style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--brand-brown))" }}
                >
                  {filtered[0].title}
                </h3>
                <p className="text-sm md:text-[15px] leading-relaxed line-clamp-3 text-muted-foreground">
                  {filtered[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {filtered[0].date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {filtered[0].readTime}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold mt-1 text-accent group-hover:gap-2.5 transition-all duration-300">
                  Read Article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.article>
        )}

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {gridPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              className="group rounded-2xl overflow-hidden bg-card cursor-pointer flex flex-col border border-border shadow-sm hover:shadow-lg transition-shadow duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              onClick={() => goToPost(post.slug)}
              whileHover={{ y: -4 }}
            >
              <div className="overflow-hidden h-48 md:h-56 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-accent">
                  {post.category}
                </span>
              </div>
              <div className="p-5 md:p-7 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3
                  className="text-base md:text-lg font-bold leading-snug"
                  style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--brand-brown))" }}
                >
                  {post.title}
                </h3>
                <p className="text-[13px] leading-relaxed flex-1 line-clamp-3 text-muted-foreground">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-[12px] font-semibold mt-auto pt-2 text-accent group-hover:gap-2 transition-all duration-300">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── Empty ── */}
        {filtered.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-lg text-muted-foreground">
              No articles found. Try a different search or category.
            </p>
          </motion.div>
        )}

        {/* ── CTA ── */}
        <motion.div
          className="mt-16 md:mt-24 rounded-3xl overflow-hidden text-center"
          style={{ background: "#D4A017" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="p-8 md:p-16 flex flex-col items-center gap-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/50">
              Get Started Today
            </span>
            <h3
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight max-w-lg"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Need a Professional Cleaning?
            </h3>
            <p className="text-white/70 text-sm md:text-base max-w-md leading-relaxed">
              Get in touch with our team and request a free, no-obligation quote.
            </p>
            <a
              href="tel:+14696792875"
              className="mt-2 inline-flex items-center gap-2 px-8 py-3 rounded-full text-[13px] font-bold uppercase tracking-wider bg-white text-foreground hover:bg-white/90 transition-all duration-300 hover:scale-105"
            >
              Call Us: (469) 679-2875
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
