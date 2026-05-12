import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, CheckCircle, PenLine, FolderOpen, Clock, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Stats {
  totalPosts: number;
  published: number;
  drafts: number;
  totalCategories: number;
}

interface RecentPost {
  id: string;
  title: string;
  status: string;
  created_at: string;
  category: string | null;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [postsRes, catsRes] = await Promise.all([
        supabase.from("posts").select("id, title, status, created_at, categories(name)"),
        supabase.from("categories").select("id"),
      ]);

      const posts = postsRes.data || [];
      const cats = catsRes.data || [];

      setStats({
        totalPosts: posts.length,
        published: posts.filter((p: any) => p.status === "published").length,
        drafts: posts.filter((p: any) => p.status === "draft").length,
        totalCategories: cats.length,
      });

      setRecentPosts(
        posts
          .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5)
          .map((p: any) => ({
            id: p.id,
            title: p.title,
            status: p.status,
            created_at: p.created_at,
            category: p.categories?.name || null,
          }))
      );
      setLoading(false);
    };
    fetchData();
  }, []);

  const statCards = [
    { label: "Total de Posts", value: stats?.totalPosts, icon: FileText, color: "hsl(30 10% 15%)" },
    { label: "Publicados", value: stats?.published, icon: CheckCircle, color: "hsl(150 60% 40%)" },
    { label: "Rascunhos", value: stats?.drafts, icon: PenLine, color: "hsl(35 90% 50%)" },
    { label: "Categorias", value: stats?.totalCategories, icon: FolderOpen, color: "hsl(43 65% 50%)" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "hsl(30 10% 15%)" }}>
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Visão geral do seu blog</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card className="rounded-2xl border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: card.color + "15" }}>
                  <card.icon className="w-6 h-6" style={{ color: card.color }} />
                </div>
                <div>
                  {loading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-bold" style={{ color: "hsl(30 10% 15%)" }}>{card.value}</p>
                  )}
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Posts */}
      <Card className="rounded-2xl border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg" style={{ fontFamily: "var(--font-heading)" }}>Posts Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-xl" />)}
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>Nenhum post criado ainda.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/admin/posts/${post.id}`)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate" style={{ color: "hsl(30 10% 15%)" }}>{post.title}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      {post.category && (
                        <span className="text-xs text-muted-foreground">{post.category}</span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(post.created_at).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      post.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {post.status === "published" ? "Publicado" : "Rascunho"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
