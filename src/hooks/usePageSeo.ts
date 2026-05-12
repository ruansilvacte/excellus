import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PageSeo {
  id: string;
  page_slug: string;
  page_name: string;
  meta_title: string;
  meta_description: string;
  og_title: string;
  og_description: string;
  og_image: string;
  created_at: string;
  updated_at: string;
}

export function useAllPageSeo() {
  return useQuery({
    queryKey: ["page_seo"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_seo")
        .select("*")
        .order("page_slug");
      if (error) throw error;
      return data as PageSeo[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function usePageSeo(slug: string) {
  return useQuery({
    queryKey: ["page_seo", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_seo")
        .select("*")
        .eq("page_slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data as PageSeo | null;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpsertPageSeo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (seo: Partial<PageSeo> & { page_slug: string }) => {
      const { error } = await supabase
        .from("page_seo")
        .upsert(
          { ...seo, updated_at: new Date().toISOString() },
          { onConflict: "page_slug" }
        );
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["page_seo"] });
    },
  });
}
