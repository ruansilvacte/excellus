import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Upload, Copy, Trash2, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
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

interface MediaFile {
  name: string;
  url: string;
  created_at: string;
}

export default function Media() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteName, setDeleteName] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchFiles = async () => {
    const { data, error } = await supabase.storage.from("media").list("", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (error) {
      setLoading(false);
      return;
    }
    setFiles(
      (data || [])
        .filter((f) => f.name !== ".emptyFolderPlaceholder")
        .map((f) => ({
          name: f.name,
          url: supabase.storage.from("media").getPublicUrl(f.name).data.publicUrl,
          created_at: f.created_at || "",
        }))
    );
    setLoading(false);
  };

  // Also list files in subdirectories like posts/
  const fetchAllFiles = async () => {
    const [rootRes, postsRes] = await Promise.all([
      supabase.storage.from("media").list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } }),
      supabase.storage.from("media").list("posts", { limit: 100, sortBy: { column: "created_at", order: "desc" } }),
    ]);

    const rootFiles = (rootRes.data || [])
      .filter((f) => f.name !== ".emptyFolderPlaceholder" && f.id)
      .map((f) => ({
        name: f.name,
        url: supabase.storage.from("media").getPublicUrl(f.name).data.publicUrl,
        created_at: f.created_at || "",
      }));

    const postFiles = (postsRes.data || [])
      .filter((f) => f.name !== ".emptyFolderPlaceholder")
      .map((f) => ({
        name: `posts/${f.name}`,
        url: supabase.storage.from("media").getPublicUrl(`posts/${f.name}`).data.publicUrl,
        created_at: f.created_at || "",
      }));

    setFiles([...postFiles, ...rootFiles]);
    setLoading(false);
  };

  useEffect(() => { fetchAllFiles(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList?.length) return;
    setUploading(true);

    for (const file of Array.from(fileList)) {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file);
      if (error) {
        toast({ title: "Erro no upload", description: error.message, variant: "destructive" });
      }
    }

    toast({ title: "Upload concluído!" });
    setUploading(false);
    fetchAllFiles();
    e.target.value = "";
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: "URL copiada!" });
  };

  const handleDelete = async () => {
    if (!deleteName) return;
    const { error } = await supabase.storage.from("media").remove([deleteName]);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Arquivo excluído!" });
      setFiles((prev) => prev.filter((f) => f.name !== deleteName));
    }
    setDeleteName(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "hsl(30 10% 15%)" }}>
            Mídia
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Faça upload e gerencie imagens</p>
        </div>
        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground cursor-pointer transition-all hover:scale-105"
          style={{ background: "var(--gradient-gold)" }}>
          <Upload className="w-4 h-4" />
          {uploading ? "Enviando..." : "Upload"}
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <Skeleton key={i} className="aspect-square rounded-2xl" />)}
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">Nenhuma mídia enviada</p>
          <p className="text-sm">Faça upload de imagens para usar nos posts</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file, i) => (
            <motion.div
              key={file.name}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border/50 shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              <img src={file.url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={() => handleCopy(file.url)}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={() => setDeleteName(file.name)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs truncate">{file.name.split("/").pop()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteName} onOpenChange={() => setDeleteName(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir arquivo?</AlertDialogTitle>
            <AlertDialogDescription>O arquivo será removido permanentemente do storage.</AlertDialogDescription>
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
