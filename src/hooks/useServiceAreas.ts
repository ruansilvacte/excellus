import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ServiceArea {
  id: string;
  name: string;
  city: string;
  region: string;
  sort_order: number;
  active: boolean;
  created_at: string;
}

export function useServiceAreas(onlyActive = false) {
  return useQuery({
    queryKey: ["service_areas", onlyActive],
    queryFn: async () => {
      let q = supabase.from("service_areas").select("*").order("sort_order");
      if (onlyActive) q = q.eq("active", true);
      const { data, error } = await q;
      if (error) throw error;
      return data as ServiceArea[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateServiceArea() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (area: Omit<ServiceArea, "id" | "created_at">) => {
      const { error } = await supabase.from("service_areas").insert(area);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["service_areas"] }),
  });
}

export function useUpdateServiceArea() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<ServiceArea> & { id: string }) => {
      const { error } = await supabase.from("service_areas").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["service_areas"] }),
  });
}

export function useDeleteServiceArea() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("service_areas").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["service_areas"] }),
  });
}
