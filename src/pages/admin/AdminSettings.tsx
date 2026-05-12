import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, User, Database, Calendar, Save, Loader2, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useUpdateSiteSetting } from "@/hooks/useSiteSettings";
import { toast } from "sonner";

export default function AdminSettings() {
  const { user } = useAuth();
  const update = useUpdateSiteSetting();
  const [calendlyKey, setCalendlyKey] = useState("");
  const [calendlyUser, setCalendlyUser] = useState("");
  const [saving, setSaving] = useState(false);

  const { data: settings } = useQuery({
    queryKey: ["site_settings", "calendly"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("key, value").in("key", ["calendly_api_key", "calendly_user_uri"]);
      if (error) throw error;
      const map: Record<string, string> = {};
      data?.forEach((r) => { map[r.key] = r.value; });
      return map;
    },
  });

  useEffect(() => {
    if (settings) {
      setCalendlyKey(settings.calendly_api_key || "");
      setCalendlyUser(settings.calendly_user_uri || "");
    }
  }, [settings]);

  const handleSaveCalendly = async () => {
    setSaving(true);
    try {
      await update.mutateAsync({ key: "calendly_api_key", value: calendlyKey });
      await update.mutateAsync({ key: "calendly_user_uri", value: calendlyUser });
      toast.success("Calendly settings saved!");
    } catch {
      toast.error("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "hsl(30 10% 15%)" }}>
          Configurações
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Informações do sistema e integrações</p>
      </div>

      <Card className="rounded-2xl border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="w-4 h-4 text-accent" /> Conta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">ID</span>
            <span className="font-mono text-xs text-muted-foreground">{user?.id}</span>
          </div>
        </CardContent>
      </Card>

      {/* Calendly Integration */}
      <Card className="rounded-2xl border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent" /> Calendly Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Configure your Calendly Personal Access Token and User URI to enable scheduling.
          </p>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">API Key (Personal Access Token)</label>
              <Input
                type="password"
                placeholder="eyJraWQiOiIx..."
                value={calendlyKey}
                onChange={(e) => setCalendlyKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Get your token at{" "}
                <a href="https://calendly.com/integrations/api_webhooks" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                  Calendly Integrations <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Calendly User URI</label>
              <Input
                placeholder="https://api.calendly.com/users/XXXXXXXX"
                value={calendlyUser}
                onChange={(e) => setCalendlyUser(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Your user URI from the Calendly API. Found at /users/me endpoint.
              </p>
            </div>
            <Button onClick={handleSaveCalendly} disabled={saving} className="gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Calendly Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent" /> Segurança
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            O acesso ao painel é controlado por roles no banco de dados. Apenas usuários com a role "admin" podem acessar este painel.
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Database className="w-4 h-4 text-accent" /> Backend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            O blog utiliza Lovable Cloud para banco de dados, autenticação e storage de imagens.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
