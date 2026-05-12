import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ServiceSection {
  heading: string;
  body: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  duration: string;
  description: string;
  image: string;
  includes: string[];
  intro: string;
  sections: ServiceSection[];
  not_included: string[];
  extras: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data || []).map((row) => ({
        ...row,
        sections: (row.sections as unknown) as ServiceSection[],
      })) as Service[];
    },
  });
}

export function useService(slug: string) {
  return useQuery({
    queryKey: ["services", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) throw error;
      return {
        ...data,
        sections: (data.sections as unknown) as ServiceSection[],
      } as Service;
    },
    enabled: !!slug,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (service: Omit<Service, "id" | "created_at" | "updated_at">) => {
      const payload = {
        ...service,
        sections: service.sections as unknown as import("@/integrations/supabase/types").Json,
      };
      const { data, error } = await supabase.from("services").insert(payload).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Serviço criado!");
    },
    onError: (e: any) => toast.error("Erro: " + e.message),
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Serviço removido!");
    },
    onError: (e: any) => toast.error("Erro: " + e.message),
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Service> & { id: string }) => {
      const payload = {
        ...updates,
        sections: updates.sections as unknown as import("@/integrations/supabase/types").Json,
      };
      const { error } = await supabase
        .from("services")
        .update(payload)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Serviço atualizado!");
    },
    onError: (e: any) => toast.error("Erro: " + e.message),
  });
}

