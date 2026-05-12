import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface AuditIssue {
  type: "error" | "warning" | "info";
  message: string;
}

interface PageResult {
  slug: string;
  name: string;
  score: number;
  issues: AuditIssue[];
}

interface ContentIssue {
  context: string;
  type: "error" | "warning";
  message: string;
}

function auditPage(page: any): PageResult {
  const issues: AuditIssue[] = [];
  let total = 0;
  let passed = 0;

  // 1. Meta title
  total++;
  const titleLen = page.meta_title?.trim().length || 0;
  if (titleLen === 0) {
    issues.push({ type: "error", message: "Título ausente" });
  } else if (titleLen < 10) {
    issues.push({ type: "warning", message: `Título muito curto (${titleLen} chars, mín. 10)` });
  } else if (titleLen > 60) {
    issues.push({ type: "warning", message: `Título longo (${titleLen}/60 chars)` });
  } else {
    passed++;
  }

  // 2. Meta description
  total++;
  const descLen = page.meta_description?.trim().length || 0;
  if (descLen === 0) {
    issues.push({ type: "error", message: "Meta description ausente" });
  } else if (descLen < 50) {
    issues.push({ type: "warning", message: `Meta description curta (${descLen} chars, mín. 50)` });
  } else if (descLen > 160) {
    issues.push({ type: "warning", message: `Meta description longa (${descLen}/160 chars)` });
  } else {
    passed++;
  }

  // 3. OG Title
  total++;
  if (!page.og_title || page.og_title.trim().length < 5) {
    issues.push({ type: "warning", message: "OG Title ausente ou muito curto" });
  } else {
    passed++;
  }

  // 4. OG Description
  total++;
  if (!page.og_description || page.og_description.trim().length < 10) {
    issues.push({ type: "warning", message: "OG Description ausente ou muito curta" });
  } else {
    passed++;
  }

  // 5. OG Image
  total++;
  if (!page.og_image || page.og_image.trim().length < 5) {
    issues.push({ type: "warning", message: "OG Image ausente" });
  } else {
    passed++;
  }

  // 6. Slug amigável
  total++;
  if (!page.page_slug || !/^\/[a-z0-9\-\/]*$/.test(page.page_slug)) {
    issues.push({ type: "warning", message: "Slug não amigável para SEO" });
  } else {
    passed++;
  }

  // 7. Page name
  total++;
  if (!page.page_name || page.page_name.trim().length < 2) {
    issues.push({ type: "info", message: "Nome da página ausente" });
  } else {
    passed++;
  }

  const score = total > 0 ? Math.round((passed / total) * 100) : 0;
  return { slug: page.page_slug, name: page.page_name || page.page_slug, score, issues };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 1. Audit page_seo entries
    const { data: pages, error: pErr } = await supabase
      .from("page_seo")
      .select("*")
      .order("page_slug");
    if (pErr) throw pErr;

    const pageResults: PageResult[] = (pages || []).map(auditPage);

    // 2. Audit published posts content
    const { data: posts } = await supabase
      .from("posts")
      .select("id, title, content, excerpt, image_url, slug")
      .eq("status", "published");

    const contentIssues: ContentIssue[] = [];

    (posts || []).forEach((post) => {
      // Check images without alt in content
      const imgMatches = post.content?.match(/<img[^>]*>/gi) || [];
      const withoutAlt = imgMatches.filter(
        (img: string) => !img.includes("alt=") || /alt=["']\s*["']/.test(img)
      );
      if (withoutAlt.length > 0) {
        contentIssues.push({
          context: `Post: ${post.title}`,
          type: "warning",
          message: `${withoutAlt.length} imagem(ns) sem alt text`,
        });
      }

      // Check excerpt
      if (!post.excerpt || post.excerpt.trim().length < 20) {
        contentIssues.push({
          context: `Post: ${post.title}`,
          type: "warning",
          message: "Excerpt ausente ou muito curto (mín. 20 chars)",
        });
      }

      // Check featured image
      if (!post.image_url) {
        contentIssues.push({
          context: `Post: ${post.title}`,
          type: "warning",
          message: "Imagem destacada ausente",
        });
      }
    });

    // 3. Audit services
    const { data: services } = await supabase
      .from("services")
      .select("id, title, description, image, intro, slug");

    (services || []).forEach((svc) => {
      if (!svc.image) {
        contentIssues.push({
          context: `Serviço: ${svc.title}`,
          type: "warning",
          message: "Imagem principal ausente",
        });
      }
      if (!svc.description || svc.description.trim().length < 30) {
        contentIssues.push({
          context: `Serviço: ${svc.title}`,
          type: "warning",
          message: "Descrição ausente ou muito curta",
        });
      }
      if (!svc.intro || svc.intro.trim().length < 20) {
        contentIssues.push({
          context: `Serviço: ${svc.title}`,
          type: "info",
          message: "Introdução ausente ou curta",
        });
      }
    });

    // Overall score
    const overallScore =
      pageResults.length > 0
        ? Math.round(
            pageResults.reduce((sum, r) => sum + r.score, 0) / pageResults.length
          )
        : 0;

    return new Response(
      JSON.stringify({
        success: true,
        overallScore,
        pages: pageResults,
        contentIssues,
        totalPages: pageResults.length,
        totalContentIssues: contentIssues.length,
        scannedAt: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("SEO audit error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
