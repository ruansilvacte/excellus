import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Loader2, Eye, EyeOff, CheckCircle, AlertTriangle, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";

const SMTP_KEYS = ["smtp_host", "smtp_port", "smtp_user", "smtp_pass", "smtp_security", "smtp_from_name", "smtp_email_template"] as const;

type SmtpKey = typeof SMTP_KEYS[number];

interface SmtpSettings {
  smtp_host: string;
  smtp_port: string;
  smtp_user: string;
  smtp_pass: string;
  smtp_security: string;
  smtp_from_name: string;
  smtp_email_template: string;
}

const DEFAULT_TEMPLATE = `Olá {{name}},

Obrigado por entrar em contato conosco! Recebemos sua solicitação e retornaremos o mais breve possível.

Suas informações:
- Nome: {{name}}
- Email: {{email}}
- Telefone: {{phone}}
- CEP: {{zip_code}}
{{#notes}}- Observações: {{notes}}{{/notes}}

Aguardamos o prazer de atendê-lo!

Atenciosamente,
{{from_name}}`;

const defaults: SmtpSettings = {
  smtp_host: "",
  smtp_port: "587",
  smtp_user: "",
  smtp_pass: "",
  smtp_security: "TLS",
  smtp_from_name: "",
  smtp_email_template: DEFAULT_TEMPLATE,
};

export default function EmailSettings() {
  const [settings, setSettings] = useState<SmtpSettings>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string; details?: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", [...SMTP_KEYS]);

      if (data) {
        const map: Partial<SmtpSettings> = {};
        data.forEach((r) => {
          if (SMTP_KEYS.includes(r.key as SmtpKey)) {
            (map as Record<string, string>)[r.key] = r.value;
          }
        });
        setSettings({ ...defaults, ...map });
      }
      setLoading(false);
    };
    load();
  }, []);

  const set = (key: SmtpKey) => (val: string) => {
    setSettings((s) => ({ ...s, [key]: val }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const results = await Promise.all(
        SMTP_KEYS.map((key) =>
          supabase.from("site_settings").upsert(
            { key, value: settings[key], updated_at: new Date().toISOString() },
            { onConflict: "key" }
          )
        )
      );

      const failed = results.find((r) => r.error);
      if (failed?.error) throw failed.error;
      toast.success("SMTP settings saved!");
    } catch {
      toast.error("Error saving settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    if (!testEmail.includes("@")) {
      toast.error("Enter a valid test email address.");
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("send-lead-email", {
        body: { email: testEmail, test_only: true },
      });

      if (error) {
        setTestResult({ ok: false, message: "Failed to call backend function.", details: String(error) });
        toast.error("Error calling backend function.");
        return;
      }

      if (data?.emailSent) {
        setTestResult({ ok: true, message: `Test email sent successfully to ${testEmail}!` });
        toast.success("Test email sent!");
      } else {
        const errMsg = data?.emailError || "Unknown error";
        const logs = data?.logs?.join("\n") || "";
        setTestResult({ ok: false, message: errMsg, details: logs });
        toast.error("SMTP test failed. See details below.");
      }
    } catch {
      setTestResult({ ok: false, message: "Unexpected error sending test.", details: "" });
      toast.error("Unexpected error.");
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "hsl(30 10% 15%)" }}>
          Email (SMTP)
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Configure automatic email sending for lead notifications</p>
      </div>

      <Card className="rounded-2xl border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent" />
            SMTP Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm py-4">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading...
            </div>
          ) : (
            <div className="space-y-4">
              {/* Sender Name */}
              <div className="space-y-1.5">
                <Label htmlFor="from_name">Sender Name</Label>
                <Input
                  id="from_name"
                  placeholder="e.g. My Cleaning Service"
                  value={settings.smtp_from_name}
                  onChange={(e) => set("smtp_from_name")(e.target.value)}
                />
              </div>

              {/* Sender Email / User */}
              <div className="space-y-1.5">
                <Label htmlFor="smtp_user">Sender Email</Label>
                <Input
                  id="smtp_user"
                  type="email"
                  placeholder="noreply@yourdomain.com"
                  value={settings.smtp_user}
                  onChange={(e) => set("smtp_user")(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="smtp_pass">Password / App Password</Label>
                <div className="relative">
                  <Input
                    id="smtp_pass"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    value={settings.smtp_pass}
                    onChange={(e) => set("smtp_pass")(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  For Gmail, use an <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="text-accent underline">App Password</a>.
                </p>
              </div>

              {/* SMTP Host + Port side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="smtp_host">SMTP Host</Label>
                  <Input
                    id="smtp_host"
                    placeholder="smtp.gmail.com"
                    value={settings.smtp_host}
                    onChange={(e) => set("smtp_host")(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="smtp_port">SMTP Port</Label>
                  <Input
                    id="smtp_port"
                    placeholder="587"
                    value={settings.smtp_port}
                    onChange={(e) => set("smtp_port")(e.target.value)}
                    className="font-mono text-sm"
                    maxLength={5}
                  />
                </div>
              </div>

              {/* Security */}
              <div className="space-y-1.5">
                <Label>Security</Label>
                <Select value={settings.smtp_security} onValueChange={set("smtp_security")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select security" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TLS">TLS (STARTTLS — port 587)</SelectItem>
                    <SelectItem value="SSL">SSL (port 465)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Email Template */}
              <div className="space-y-1.5">
                <Label htmlFor="smtp_email_template">Email Message Template</Label>
                <Textarea
                  id="smtp_email_template"
                  placeholder="Write the email message that will be sent to the lead..."
                  value={settings.smtp_email_template}
                  onChange={(e) => set("smtp_email_template")(e.target.value)}
                  rows={10}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Use variables: <code className="bg-muted px-1 rounded">{"{{name}}"}</code>, <code className="bg-muted px-1 rounded">{"{{email}}"}</code>, <code className="bg-muted px-1 rounded">{"{{phone}}"}</code>, <code className="bg-muted px-1 rounded">{"{{zip_code}}"}</code>, <code className="bg-muted px-1 rounded">{"{{notes}}"}</code>, <code className="bg-muted px-1 rounded">{"{{from_name}}"}</code>. You can also paste links or HTML.
                </p>
              </div>

              <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving...</> : "Save Settings"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            SMTP Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Send a test email using the saved SMTP credentials. No credentials are exposed to the browser.
          </p>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="recipient@example.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
            />
            <Button variant="outline" onClick={handleTest} disabled={testing}>
              {testing ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Sending...</> : "Send Test"}
            </Button>
          </div>

          {testResult && (
            <div className={`rounded-lg border p-3 text-sm ${testResult.ok ? "border-green-300 bg-green-50 text-green-800" : "border-red-300 bg-red-50 text-red-800"}`}>
              <div className="flex items-start gap-2">
                {testResult.ok ? <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />}
                <span>{testResult.message}</span>
              </div>
              {!testResult.ok && testResult.details && (
                <Collapsible className="mt-2">
                  <CollapsibleTrigger className="flex items-center gap-1 text-xs underline cursor-pointer opacity-70 hover:opacity-100">
                    <ChevronDown className="w-3 h-3" /> Technical details
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <pre className="mt-1 text-xs bg-red-100 rounded p-2 overflow-x-auto whitespace-pre-wrap max-h-40">{testResult.details}</pre>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hint card */}
      <Card className="rounded-2xl border-border/50 shadow-sm bg-muted/40">
        <CardContent className="pt-4 pb-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Gmail:</strong> Use smtp.gmail.com · Port 587 · TLS · Enable 2FA and create an App Password.<br />
            <strong>Outlook/Hotmail:</strong> Use smtp-mail.outlook.com · Port 587 · TLS.<br />
            <strong>Amazon SES:</strong> Use your regional SMTP endpoint · Port 587 · TLS.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
