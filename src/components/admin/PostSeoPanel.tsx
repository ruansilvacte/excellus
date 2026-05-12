import { useMemo } from "react";
import { AlertTriangle, CheckCircle2, XCircle, Info, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export interface PostSeoInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
}

export interface SeoIssue {
  type: "error" | "warning" | "success";
  message: string;
}

export function analyzePostSeo(post: PostSeoInput): { score: number; issues: SeoIssue[] } {
  const issues: SeoIssue[] = [];
  let total = 0;
  let passed = 0;

  // 1. Title
  total++;
  const titleLen = post.title.trim().length;
  if (titleLen === 0) {
    issues.push({ type: "error", message: "Título ausente" });
  } else if (titleLen < 15) {
    issues.push({ type: "warning", message: `Título muito curto (${titleLen} chars, recomendado: 15-60)` });
  } else if (titleLen > 60) {
    issues.push({ type: "warning", message: `Título muito longo (${titleLen}/60 chars)` });
  } else {
    passed++;
    issues.push({ type: "success", message: `Título OK (${titleLen} chars)` });
  }

  // 2. Slug
  total++;
  const slugVal = post.slug.trim();
  if (!slugVal) {
    issues.push({ type: "error", message: "Slug ausente" });
  } else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slugVal)) {
    issues.push({ type: "warning", message: "Slug não está otimizado (use apenas letras minúsculas, números e hífens)" });
  } else if (slugVal.length > 75) {
    issues.push({ type: "warning", message: `Slug muito longo (${slugVal.length} chars)` });
  } else {
    passed++;
    issues.push({ type: "success", message: "Slug otimizado" });
  }

  // 3. Excerpt / Meta description
  total++;
  const excerptLen = post.excerpt.trim().length;
  if (excerptLen === 0) {
    issues.push({ type: "error", message: "Resumo (meta description) ausente" });
  } else if (excerptLen < 50) {
    issues.push({ type: "warning", message: `Resumo muito curto (${excerptLen} chars, mín. 50)` });
  } else if (excerptLen > 160) {
    issues.push({ type: "warning", message: `Resumo muito longo (${excerptLen}/160 chars)` });
  } else {
    passed++;
    issues.push({ type: "success", message: `Resumo OK (${excerptLen} chars)` });
  }

  // 4. Content length
  total++;
  const textContent = post.content.replace(/<[^>]*>/g, "").trim();
  const wordCount = textContent.split(/\s+/).filter(Boolean).length;
  if (wordCount === 0) {
    issues.push({ type: "error", message: "Conteúdo vazio" });
  } else if (wordCount < 100) {
    issues.push({ type: "warning", message: `Conteúdo curto (${wordCount} palavras, recomendado: 300+)` });
  } else if (wordCount < 300) {
    issues.push({ type: "warning", message: `Conteúdo razoável (${wordCount} palavras, ideal: 300+)` });
    passed += 0.5;
  } else {
    passed++;
    issues.push({ type: "success", message: `Conteúdo bom (${wordCount} palavras)` });
  }

  // 5. Headings in content
  total++;
  const hasH2 = /<h[2-3][^>]*>/i.test(post.content);
  if (!hasH2 && wordCount > 100) {
    issues.push({ type: "warning", message: "Sem subtítulos (H2/H3) no conteúdo" });
  } else if (wordCount <= 100) {
    issues.push({ type: "warning", message: "Conteúdo muito curto para avaliar subtítulos" });
  } else {
    passed++;
    issues.push({ type: "success", message: "Subtítulos presentes" });
  }

  // 6. Images
  total++;
  if (!post.imageUrl) {
    issues.push({ type: "error", message: "Imagem destacada ausente" });
  } else {
    passed++;
    issues.push({ type: "success", message: "Imagem destacada presente" });
  }

  // 7. Images alt text in content
  total++;
  const imgTags = post.content.match(/<img[^>]*>/gi) || [];
  const imgWithoutAlt = imgTags.filter(
    (img) => !img.includes("alt=") || /alt=["']\s*["']/.test(img)
  );
  if (imgTags.length === 0) {
    passed++;
    issues.push({ type: "success", message: "Sem imagens inline (OK)" });
  } else if (imgWithoutAlt.length > 0) {
    issues.push({ type: "warning", message: `${imgWithoutAlt.length} imagem(ns) sem alt text no conteúdo` });
  } else {
    passed++;
    issues.push({ type: "success", message: "Todas as imagens têm alt text" });
  }

  // 8. Internal links
  total++;
  const linkCount = (post.content.match(/<a\s/gi) || []).length;
  if (linkCount === 0 && wordCount > 200) {
    issues.push({ type: "warning", message: "Sem links no conteúdo" });
  } else {
    passed++;
    issues.push({ type: "success", message: linkCount > 0 ? `${linkCount} link(s) encontrado(s)` : "OK" });
  }

  const score = total > 0 ? Math.round((passed / total) * 100) : 0;
  return { score, issues };
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
}

function getProgressColor(score: number) {
  if (score >= 80) return "[&>div]:bg-green-500";
  if (score >= 50) return "[&>div]:bg-yellow-500";
  return "[&>div]:bg-red-500";
}

const iconMap = {
  error: <XCircle className="w-4 h-4 text-red-500 shrink-0" />,
  warning: <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0" />,
  success: <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />,
};

export default function PostSeoPanel({ data }: { data: PostSeoInput }) {
  const { score, issues } = useMemo(() => analyzePostSeo(data), [data]);

  const errors = issues.filter((i) => i.type === "error");
  const warnings = issues.filter((i) => i.type === "warning");
  const successes = issues.filter((i) => i.type === "success");

  return (
    <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-5 space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold">SEO do Post</span>
      </div>

      {/* Score */}
      <div className="text-center py-2">
        <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}%</span>
        <Progress value={score} className={`mt-2 h-2 ${getProgressColor(score)}`} />
        <p className="text-xs text-muted-foreground mt-1">
          {score >= 80 ? "Ótimo! Seu post está bem otimizado." : score >= 50 ? "Razoável. Melhore os itens abaixo." : "Precisa de atenção. Corrija os problemas."}
        </p>
      </div>

      {/* Issues */}
      <div className="space-y-1.5">
        {[...errors, ...warnings, ...successes].map((issue, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            {iconMap[issue.type]}
            <span className="text-muted-foreground leading-tight">{issue.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
