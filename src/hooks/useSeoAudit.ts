import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AuditIssue {
  type: "error" | "warning" | "info";
  message: string;
}

export interface PageAuditResult {
  slug: string;
  name: string;
  score: number;
  issues: AuditIssue[];
}

export interface ContentIssue {
  context: string;
  type: "error" | "warning" | "info";
  message: string;
}

export interface SeoAuditResult {
  overallScore: number;
  pages: PageAuditResult[];
  contentIssues: ContentIssue[];
  totalPages: number;
  totalContentIssues: number;
  scannedAt: string;
}

export function useSeoAudit() {
  const [data, setData] = useState<SeoAuditResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAudit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke(
        "seo-audit"
      );
      if (fnError) throw fnError;
      if (!result?.success) throw new Error(result?.error || "Audit failed");
      setData(result as SeoAuditResult);
    } catch (err: any) {
      setError(err.message || "Erro ao escanear SEO");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, runAudit };
}
