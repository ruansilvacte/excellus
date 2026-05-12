import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { posts as staticPosts, categories as staticCategories, type BlogPost } from "@/data/blogPosts";

interface DbPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  read_time: string | null;
  published_at: string | null;
  status: string;
  categories: { name: string } | null;
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>(staticPosts);
  const [categories, setCategories] = useState<string[]>(staticCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, content, image_url, read_time, published_at, status, categories(name)")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error || !data || data.length === 0) {
        // Fallback to static data
        setLoading(false);
        return;
      }

      const dbPosts: BlogPost[] = (data as unknown as DbPost[]).map((p) => ({
        slug: p.slug,
        image: p.image_url || "/placeholder.svg",
        category: (p.categories as any)?.name || "Uncategorized",
        date: p.published_at
          ? new Date(p.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
          : "",
        readTime: p.read_time || "5 min read",
        title: p.title,
        excerpt: p.excerpt || "",
        content: p.content ? [p.content] : [],
      }));

      setPosts(dbPosts);

      // Build categories from DB
      const { data: catsData } = await supabase.from("categories").select("name").order("name");
      if (catsData && catsData.length > 0) {
        setCategories(["All", ...catsData.map((c: any) => c.name)]);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  return { posts, categories, loading };
}
