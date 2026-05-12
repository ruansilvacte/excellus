import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  zip_code: z.string().trim().min(3, "Zip Code is required").max(20),
  square_footage: z.string().trim().max(50).optional(),
  notes: z.string().trim().max(1000).optional(),
  service_id: z.string().optional(),
});

type LeadFields = z.infer<typeof leadSchema>;
type FieldErrors = Partial<Record<keyof LeadFields, string>>;

interface Props {
  open: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export default function LeadFormModal({ open, onClose, preselectedServiceId }: Props) {
  const [fields, setFields] = useState<LeadFields>({
    name: "", email: "", phone: "", zip_code: "", square_footage: "", notes: "", service_id: preselectedServiceId || "",
  });

  const { data: services = [] } = useQuery({
    queryKey: ["services_for_form"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("id, title").order("sort_order");
      if (error) throw error;
      return data as { id: string; title: string }[];
    },
    staleTime: 5 * 60 * 1000,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof LeadFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setErrorMsg("");

    const result = leadSchema.safeParse(fields);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof LeadFields;
        if (!fieldErrors[key]) fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");

    try {
      const { data, error } = await supabase.functions.invoke("send-lead-email", {
        body: result.data,
      });

      if (error) throw error;

      // Lead was saved — show success even if email failed
      setStatus("success");
      setFields({ name: "", email: "", phone: "", zip_code: "", square_footage: "", notes: "", service_id: "" });

      // Log email status for debugging
      if (data?.emailSent) {
        console.log("Lead saved and confirmation email sent.");
      } else if (data?.emailError) {
        console.warn("Lead saved but email failed:", data.emailError);
      } else {
        console.log("Lead saved. SMTP not configured — no email sent.");
      }
    } catch (err: any) {
      console.error("Lead submission error:", err);
      setStatus("error");
      const detail = err?.message || err?.details || "";
      if (detail.includes("Failed to save lead")) {
        setErrorMsg("Could not save your request. Please try again.");
      } else if (detail.includes("Missing required")) {
        setErrorMsg("Please fill in all required fields.");
      } else {
        setErrorMsg("Something went wrong. Please try again or call us directly.");
      }
    }
  };

  const handleClose = () => {
    if (status === "loading") return;
    setStatus("idle");
    setErrors({});
    setErrorMsg("");
    setFields({ name: "", email: "", phone: "", zip_code: "", square_footage: "", notes: "", service_id: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
          >
            {/* Header */}
            <div
              className="px-6 pt-6 pb-4"
              style={{ background: "linear-gradient(135deg, hsl(30 10% 10%), hsl(215 70% 20%))" }}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                Get Your Free Quote
              </h2>
              <p className="text-sm text-white/70">
                Fill in your details and we'll reach out shortly.
              </p>
            </div>

            {/* Body */}
            <div className="px-6 pb-6 pt-4">
              {status === "success" ? (
                <motion.div
                  className="flex flex-col items-center gap-3 py-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle className="w-14 h-14 text-green-500" />
                  <h3 className="text-lg font-bold text-foreground">Request Sent!</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Thank you! We've received your request and will get back to you soon. Check your inbox for a confirmation email.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name */}
                  <Field label="Name *" error={errors.name}>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={fields.name}
                      onChange={set("name")}
                      className={inputCls(!!errors.name)}
                    />
                  </Field>

                  {/* Email */}
                  <Field label="Email *" error={errors.email}>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={fields.email}
                      onChange={set("email")}
                      className={inputCls(!!errors.email)}
                    />
                  </Field>

                  {/* Phone + Zip side by side */}
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Phone *" error={errors.phone}>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={fields.phone}
                        onChange={set("phone")}
                        className={inputCls(!!errors.phone)}
                      />
                    </Field>
                    <Field label="Zip Code *" error={errors.zip_code}>
                      <input
                        type="text"
                        placeholder="02101"
                        value={fields.zip_code}
                        onChange={set("zip_code")}
                        className={inputCls(!!errors.zip_code)}
                      />
                    </Field>
                  </div>

                  {/* Square Footage */}
                  <Field label="Square Footage" error={errors.square_footage}>
                    <input
                      type="text"
                      placeholder="e.g. 1200 sqft"
                      value={fields.square_footage}
                      onChange={set("square_footage")}
                      className={inputCls(!!errors.square_footage)}
                    />
                  </Field>

                  {/* Service */}
                  {services.length > 0 && (
                    <Field label="Service">
                      <select
                        value={fields.service_id || ""}
                        onChange={(e) => setFields((f) => ({ ...f, service_id: e.target.value }))}
                        className={inputCls(false)}
                      >
                        <option value="">Select a service (optional)</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                      </select>
                    </Field>
                  )}

                  {/* Notes */}
                  <Field label="Notes (optional)" error={errors.notes}>
                    <textarea
                      placeholder="Any additional details or special requests..."
                      value={fields.notes}
                      onChange={set("notes")}
                      rows={3}
                      className={inputCls(!!errors.notes) + " resize-none"}
                    />
                  </Field>

                  {/* Global error */}
                  {status === "error" && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </button>

                  <p className="text-xs text-center text-muted-foreground">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-foreground/80">{label}</label>
      {children}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full px-3 py-2.5 rounded-lg text-sm border bg-background text-foreground placeholder:text-muted-foreground",
    "focus:outline-none focus:ring-2 focus:ring-ring transition-colors",
    hasError ? "border-destructive focus:ring-destructive/30" : "border-input",
  ].join(" ");
}
