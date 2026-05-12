import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSiteSetting, useUpdateSiteSetting } from "@/hooks/useSiteSettings";
import { BarChart3, Facebook, Loader2, Search, Upload, CheckCircle2, XCircle, FileText } from "lucide-react";
import { toast } from "sonner";

function PixelCard() {
  const { data: pixelId, isLoading } = useSiteSetting("facebook_pixel_id");
  const updateSetting = useUpdateSiteSetting();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (pixelId !== undefined) setValue(pixelId);
  }, [pixelId]);

  const handleSave = () => {
    const trimmed = value.trim();
    if (trimmed && !/^\d+$/.test(trimmed)) {
      toast.error("O Pixel ID deve conter apenas números.");
      return;
    }
    updateSetting.mutate(
      { key: "facebook_pixel_id", value: trimmed },
      {
        onSuccess: () => toast.success("Pixel ID salvo com sucesso!"),
        onError: () => toast.error("Erro ao salvar. Tente novamente."),
      }
    );
  };

  return (
    <Card className="rounded-2xl border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Facebook className="w-4 h-4 text-accent" /> Facebook Pixel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Insira seu Pixel ID para ativar o rastreamento automático em todas as páginas.
        </p>
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> Carregando...
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              placeholder="Ex: 123456789012345"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="font-mono"
              maxLength={20}
            />
            <Button onClick={handleSave} disabled={updateSetting.isPending}>
              {updateSetting.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar"}
            </Button>
          </div>
        )}
        {pixelId && (
          <p className="text-xs text-green-600 flex items-center gap-1">
            <BarChart3 className="w-3 h-3" /> Pixel ativo — rastreando todas as páginas
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function GoogleAnalyticsCard() {
  const { data: gaId, isLoading } = useSiteSetting("google_analytics_id");
  const updateSetting = useUpdateSiteSetting();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (gaId !== undefined) setValue(gaId);
  }, [gaId]);

  const handleSave = () => {
    const trimmed = value.trim();
    if (trimmed && !/^G-[A-Z0-9]+$/.test(trimmed)) {
      toast.error("O ID deve estar no formato G-XXXXXXXXXX.");
      return;
    }
    updateSetting.mutate(
      { key: "google_analytics_id", value: trimmed },
      {
        onSuccess: () => toast.success("Google Analytics ID salvo com sucesso!"),
        onError: () => toast.error("Erro ao salvar. Tente novamente."),
      }
    );
  };

  return (
    <Card className="rounded-2xl border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-accent" /> Google Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Insira seu Measurement ID (formato G-XXXXXXXXXX) para ativar o Google Analytics em todas as páginas.
        </p>
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> Carregando...
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              placeholder="Ex: G-T399TQ8044"
              value={value}
              onChange={(e) => setValue(e.target.value.toUpperCase())}
              className="font-mono"
              maxLength={20}
            />
            <Button onClick={handleSave} disabled={updateSetting.isPending}>
              {updateSetting.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar"}
            </Button>
          </div>
        )}
        {gaId && (
          <p className="text-xs text-green-600 flex items-center gap-1">
            <BarChart3 className="w-3 h-3" /> Google Analytics ativo — ID: {gaId}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function GoogleSearchCard() {
  const { data: gscTag, isLoading } = useSiteSetting("google_search_verification");
  const { data: gscFile } = useSiteSetting("google_search_verification_file");
  const updateSetting = useUpdateSiteSetting();
  const [value, setValue] = useState("");
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "checking" | "ok" | "fail">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gscTag !== undefined) setValue(gscTag);
  }, [gscTag]);

  const handleSave = () => {
    const trimmed = value.trim();
    updateSetting.mutate(
      { key: "google_search_verification", value: trimmed },
      {
        onSuccess: () => toast.success("Tag de verificação salva com sucesso!"),
        onError: () => toast.error("Erro ao salvar. Tente novamente."),
      }
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.startsWith("google") || !file.name.endsWith(".html")) {
      toast.error("Arquivo inválido. Envie o arquivo HTML de verificação do Google (ex: googleXXXX.html).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      updateSetting.mutate(
        { key: "google_search_verification_file", value: file.name },
        {
          onSuccess: () => toast.success(`Arquivo "${file.name}" registrado! Ele já está disponível no site.`),
          onError: () => toast.error("Erro ao registrar arquivo."),
        }
      );
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleVerify = async () => {
    setVerifyStatus("checking");
    try {
      // Check meta tag
      const metaOk = !!document.querySelector('meta[name="google-site-verification"]');
      
      // Check HTML file
      const fileToCheck = gscFile || "google132d68d6061924e1.html";
      let fileOk = false;
      try {
        const res = await fetch(`/${fileToCheck}`, { method: "HEAD" });
        fileOk = res.ok;
      } catch {
        fileOk = false;
      }

      if (metaOk || fileOk) {
        setVerifyStatus("ok");
        toast.success("Verificação OK! Meta tag e/ou arquivo HTML detectados.");
      } else {
        setVerifyStatus("fail");
        toast.error("Nenhuma verificação detectada. Adicione a meta tag ou o arquivo HTML.");
      }
    } catch {
      setVerifyStatus("fail");
      toast.error("Erro ao verificar integração.");
    }
  };

  return (
    <Card className="rounded-2xl border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Search className="w-4 h-4 text-accent" /> Google Search Console
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Meta tag section */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Método 1: Meta Tag</p>
          <p className="text-xs text-muted-foreground">
            Insira o código de verificação (valor do atributo content da meta tag).
          </p>
          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Carregando...
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Ex: DVs4DudlitgL7zHJLSvekA-..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="font-mono"
              />
              <Button onClick={handleSave} disabled={updateSetting.isPending} size="sm">
                {updateSetting.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar"}
              </Button>
            </div>
          )}
          {gscTag && (
            <p className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Meta tag ativa
            </p>
          )}
        </div>

        {/* File upload section */}
        <div className="space-y-2 border-t border-border/50 pt-4">
          <p className="text-sm font-medium">Método 2: Arquivo HTML</p>
          <p className="text-xs text-muted-foreground">
            Faça upload do arquivo HTML de verificação fornecido pelo Google (ex: google1234abcd.html).
          </p>
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".html"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="gap-2"
            >
              <Upload className="w-4 h-4" /> Enviar arquivo HTML
            </Button>
          </div>
          {gscFile && (
            <p className="text-xs text-green-600 flex items-center gap-1">
              <FileText className="w-3 h-3" /> Arquivo registrado: {gscFile}
            </p>
          )}
        </div>

        {/* Verification check */}
        <div className="border-t border-border/50 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleVerify}
            disabled={verifyStatus === "checking"}
            className="gap-2"
          >
            {verifyStatus === "checking" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            Verificar integração
          </Button>
          {verifyStatus === "ok" && (
            <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
              <CheckCircle2 className="w-3 h-3" /> Integração verificada com sucesso!
            </p>
          )}
          {verifyStatus === "fail" && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-2">
              <XCircle className="w-3 h-3" /> Verificação falhou — confira as configurações acima.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function MarketingSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "hsl(30 10% 15%)" }}>
          Marketing
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Pixels e rastreamento</p>
      </div>

      <GoogleAnalyticsCard />
      <GoogleSearchCard />
      <PixelCard />
    </div>
  );
}
