import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Search, FileText, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { analyzePostSeo } from "@/components/admin/PostSeoPanel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  image_url: string | null;
  read_time: string | null;
  created_at: string;
  category_name: string | null;
  content: string | null;
  excerpt: string | null;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("id, title, slug, status, image_url, read_time, created_at, content, excerpt, categories(name)")
      .order("created_at", { ascending: false });

    setPosts(
      (data || []).map((p: any) => ({
        ...p,
        category_name: p.categories?.name || null,
      }))
    );
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("posts").delete().eq("id", deleteId);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Post excluído" });
      setPosts((prev) => prev.filter((p) => p.id !== deleteId));
    }
    setDeleteId(null);
  };

  const filtered = posts.filter(
    (p) => p.title.toLowerCase().includes(search.toLowerCase())
  );

  const blogSeoScore = useMemo(() => {
    if (posts.length === 0) return 0;
    const total = posts.reduce((sum, p) => {
      const { score } = analyzePostSeo({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt || "",
        content: p.content || "",
        imageUrl: p.image_url || "",
      });
      return sum + score;
    }, 0);
    return Math.round(total / posts.length);
  }, [posts]);

  const getScoreColor = (s: number) => s >= 80 ? "text-green-600" : s >= 50 ? "text-yellow-600" : "text-red-600";
  const getProgressClass = (s: number) => s >= 80 ? "[&>div]:bg-green-500" : s >= 50 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "hsl(30 10% 15%)" }}>
            Posts
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Gerencie os artigos do blog</p>
        </div>
        <Button
          onClick={() => navigate("/admin/posts/new")}
          className="rounded-xl"
          style={{ background: "var(--gradient-gold)" }}
        >
          <Plus className="w-4 h-4 mr-1" /> Novo Post
        </Button>
      </div>

      {/* Blog SEO Score */}
      {!loading && posts.length > 0 && (
        <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">SEO Geral do Blog</span>
                <span className={`text-2xl font-bold ${getScoreColor(blogSeoScore)}`}>{blogSeoScore}%</span>
              </div>
              <Progress value={blogSeoScore} className={`h-2 ${getProgressClass(blogSeoScore)}`} />
              <p className="text-xs text-muted-foreground mt-1">
                Média de {posts.length} post(s) analisado(s)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">Nenhum post encontrado</p>
          <p className="text-sm">Crie seu primeiro artigo clicando em "Novo Post"</p>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Post</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4 hidden md:table-cell">Categoria</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4 hidden lg:table-cell">Data</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4 hidden lg:table-cell">Leitura</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4 hidden md:table-cell">SEO</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Status</th>
                  <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((post, i) => (
                  <motion.tr
                    key={post.id}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {post.image_url ? (
                          <img src={post.image_url} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                        <span className="font-medium text-sm truncate max-w-[200px]" style={{ color: "hsl(30 10% 15%)" }}>
                          {post.title}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-sm text-muted-foreground">{post.category_name || "—"}</td>
                    <td className="p-4 hidden lg:table-cell text-sm text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="p-4 hidden lg:table-cell text-sm text-muted-foreground">{post.read_time || "—"}</td>
                    <td className="p-4 hidden md:table-cell">
                      {(() => {
                        const { score } = analyzePostSeo({ title: post.title, slug: post.slug, excerpt: post.excerpt || "", content: post.content || "", imageUrl: post.image_url || "" });
                        return <span className={`text-xs font-bold ${getScoreColor(score)}`}>{score}%</span>;
                      })()}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        post.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {post.status === "published" ? "Publicado" : "Rascunho"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/posts/${post.id}`)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(post.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir post?</AlertDialogTitle>
            <AlertDialogDescription>Esta ação não pode ser desfeita. O post será removido permanentemente.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
