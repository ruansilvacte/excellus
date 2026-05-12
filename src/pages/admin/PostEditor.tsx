const TINYMCE_API_KEY = "cone42pu9b8wkgqtf4u85eewkq8ifepggtsvx92thrhtzw6n";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Save, Eye, Upload } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import { motion } from "framer-motion";
import PostSeoPanel from "@/components/admin/PostSeoPanel";

interface Category {
  id: string;
  name: string;
}

export default function PostEditor() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { toast } = useToast();
  const editorRef = useRef<any>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [readTime, setReadTime] = useState("5 min read");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [publishedAt, setPublishedAt] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [initialContent, setInitialContent] = useState("");

  useEffect(() => {
    supabase.from("categories").select("id, name").then(({ data }) => {
      setCategories(data || []);
    });

    if (!isNew && id) {
      supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data, error }) => {
          if (error || !data) {
            toast({ title: "Post não encontrado", variant: "destructive" });
            navigate("/admin/posts");
            return;
          }
          setTitle(data.title);
          setSlug(data.slug);
          setCategoryId(data.category_id || "");
          setExcerpt(data.excerpt || "");
          setImageUrl(data.image_url || "");
          setReadTime(data.read_time || "5 min read");
          setStatus(data.status as "draft" | "published");
          setPublishedAt(data.published_at ? data.published_at.slice(0, 16) : "");
          if ((data as any).scheduled_at) {
            const d = new Date((data as any).scheduled_at);
            const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
            setScheduledAt(local);
          }
          setInitialContent(data.content || "");
          setLoading(false);
        });
    }
  }, [id, isNew]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (isNew || !slug) setSlug(generateSlug(value));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const ext = file.name.split(".").pop();
    const path = `posts/${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) {
      toast({ title: "Erro no upload", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
    setImageUrl(urlData.publicUrl);
    setUploading(false);
  };

  const getEditorContent = () => {
    return editorRef.current ? editorRef.current.getContent() : "";
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      toast({ title: "Preencha o título e slug", variant: "destructive" });
      return;
    }

    setSaving(true);
    const content = getEditorContent();
    const payload: Record<string, any> = {
      title: title.trim(),
      slug: slug.trim(),
      category_id: categoryId || null,
      excerpt: excerpt.trim() || null,
      content,
      image_url: imageUrl || null,
      read_time: readTime || null,
      status,
      published_at: status === "published" ? (publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString()) : null,
      scheduled_at: status === "draft" && scheduledAt ? new Date(scheduledAt).toISOString() : null,
    };

    let error;
    if (isNew) {
      ({ error } = await supabase.from("posts").insert(payload as any));
    } else {
      ({ error } = await supabase.from("posts").update(payload as any).eq("id", id));
    }

    setSaving(false);
    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isNew ? "Post criado!" : "Post atualizado!" });
      navigate("/admin/posts");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 max-w-4xl">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const selectedCategory = categories.find((c) => c.id === categoryId);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/posts")} className="rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "hsl(30 10% 15%)" }}>
            {isNew ? "Novo Post" : "Editar Post"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="w-4 h-4 mr-1" /> {showPreview ? "Editor" : "Preview"}
          </Button>
          <Button onClick={handleSave} disabled={saving} className="rounded-xl" style={{ background: "var(--gradient-gold)" }}>
            <Save className="w-4 h-4 mr-1" /> {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      {showPreview ? (
        /* Preview */
        <motion.div
          className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {imageUrl && (
            <div className="w-full h-64 md:h-80 relative overflow-hidden">
              <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(30 10% 15% / 0.7) 0%, transparent 60%)" }} />
            </div>
          )}
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {selectedCategory && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground bg-primary">
                  {selectedCategory.name}
                </span>
              )}
              {readTime && <span className="text-xs text-muted-foreground">{readTime}</span>}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "hsl(30 10% 15%)" }}>
              {title || "Título do post"}
            </h1>
            {excerpt && <p className="text-muted-foreground text-lg mb-6">{excerpt}</p>}
            <div
              className="blog-content max-w-none"
              dangerouslySetInnerHTML={{ __html: getEditorContent() }}
            />
          </div>
        </motion.div>
      ) : (
        /* Editor Form */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4 min-w-0">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Título</label>
              <Input
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Título do post"
                className="rounded-xl h-11 text-base"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Slug</label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="slug-do-post"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Resumo</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Resumo curto do artigo..."
                rows={3}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Conteúdo</label>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <Editor
                  apiKey={TINYMCE_API_KEY}
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue={initialContent}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "advlist", "autolink", "lists", "link", "image", "charmap",
                      "preview", "anchor", "searchreplace", "visualblocks", "code",
                      "fullscreen", "insertdatetime", "media", "table", "help", "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | bold italic forecolor backcolor | " +
                      "alignleft aligncenter alignright alignjustify | " +
                      "bullist numlist outdent indent | link image media | " +
                      "table | code fullscreen | removeformat | help",
                    content_style: `
                      body { font-family: 'DM Sans', sans-serif; font-size: 15px; color: #333; line-height: 1.7; padding: 8px; }
                      h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }
                      img { max-width: 100%; border-radius: 12px; }
                    `,
                    images_upload_handler: async (blobInfo) => {
                      const file = blobInfo.blob();
                      const ext = blobInfo.filename().split(".").pop();
                      const path = `posts/inline-${Date.now()}.${ext}`;
                      const { error } = await supabase.storage.from("media").upload(path, file);
                      if (error) throw new Error(error.message);
                      const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
                      return urlData.publicUrl;
                    },
                    promotion: false,
                    branding: false,
                    skin: "oxide",
                    valid_elements: "*[*]",
                    valid_children: "+body[style]",
                    extended_valid_elements: "style[type],link[rel|href|type],script[src|type]",
                    custom_elements: "style",
                    verify_html: false,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Categoria</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Sem categoria</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Tempo de leitura</label>
                <Input
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="5 min read"
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Data publicação</label>
                <Input
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              {status === "draft" && (
                <div className="border-t border-border pt-4">
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">📅 Agendar Publicação</label>
                  <Input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    className="rounded-xl"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {scheduledAt
                      ? `Será publicado automaticamente em ${new Date(scheduledAt).toLocaleString()}`
                      : "Defina uma data para publicação automática"}
                  </p>
                </div>
              )}
            </div>

            {/* Image */}
            <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-5 space-y-3">
              <label className="text-sm font-medium text-muted-foreground block">Imagem destaque</label>
              {imageUrl && (
                <img src={imageUrl} alt="" className="w-full h-32 object-cover rounded-xl" />
              )}
              <div className="flex gap-2">
                <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-dashed border-border text-sm text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="w-4 h-4" />
                  {uploading ? "Enviando..." : "Upload"}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
              </div>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Ou cole uma URL..."
                className="rounded-xl text-xs"
              />
            </div>

            {/* SEO Analysis */}
            <PostSeoPanel
              data={{
                title,
                slug,
                excerpt,
                content: getEditorContent(),
                imageUrl,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
