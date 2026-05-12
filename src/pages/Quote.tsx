import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle, Loader2, AlertCircle, Phone, Mail, MapPin, ShieldCheck,
  ChevronRight, ChevronLeft, CalendarDays, Clock, Sun, CloudSun, Sparkles, DollarSign
} from "lucide-react";
import { z } from "zod";
import { format, addDays, isSunday } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { Calendar } from "@/components/ui/calendar";

/* ── validation ── */
const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  zip_code: z.string().trim().min(3, "Zip Code is required").max(20),
  square_footage: z.string().trim().max(50).optional(),
  notes: z.string().trim().max(1000).optional(),
});

type LeadFields = z.infer<typeof leadSchema>;
type FieldErrors = Partial<Record<keyof LeadFields, string>>;

const MORNING_SLOTS = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
];
const AFTERNOON_SLOTS = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
];
const ALL_TIME_SLOTS = [...MORNING_SLOTS, ...AFTERNOON_SLOTS];

const trustBadges = [
  { icon: ShieldCheck, text: "Licensed & Insured" },
  { icon: Phone, text: "Fast Response" },
  { icon: MapPin, text: "Serving Florida's Gulf Coast" },
];

export default function Quote() {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState<LeadFields>({
    name: "", email: "", phone: "", zip_code: "", square_footage: "", notes: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});
  const [scheduleError, setScheduleError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof LeadFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  /* fetch booked slots when date changes */
  useEffect(() => {
    if (!selectedDate) return;
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    if (bookedSlots[dateStr]) return;

    supabase
      .from("leads")
      .select("scheduled_time")
      .eq("scheduled_date", dateStr)
      .not("scheduled_time", "is", null)
      .then(({ data }) => {
        const times = (data || []).map((r) => r.scheduled_time).filter(Boolean) as string[];
        setBookedSlots((prev) => ({ ...prev, [dateStr]: times }));
      });
  }, [selectedDate]);

  const availableTimes = selectedDate
    ? ALL_TIME_SLOTS.filter((t) => !(bookedSlots[format(selectedDate, "yyyy-MM-dd")] || []).includes(t))
    : ALL_TIME_SLOTS;

  /* step 1 → step 2 */
  const goToStep2 = () => {
    setErrors({});
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
    setStep(2);
  };

  /* final submit */
  const handleSubmit = async () => {
    setScheduleError("");
    setErrorMsg("");

    if (!selectedDate || !selectedTime) {
      setScheduleError("Please select a date and time for your appointment.");
      return;
    }

    setStatus("loading");

    try {
      const { data, error } = await supabase.functions.invoke("send-lead-email", {
        body: {
          ...fields,
          scheduled_date: format(selectedDate, "yyyy-MM-dd"),
          scheduled_time: selectedTime,
        },
      });

      if (error) throw error;

      if (data?.error?.includes("duplicate") || data?.error?.includes("unique")) {
        setScheduleError("This time slot was just booked. Please choose another time.");
        setStatus("idle");
        return;
      }

      setStatus("success");
      setFields({ name: "", email: "", phone: "", zip_code: "", square_footage: "", notes: "" });
      setSelectedDate(undefined);
      setSelectedTime("");

      if (data?.emailSent) console.log("Lead saved and confirmation email sent.");
      else if (data?.emailError) console.warn("Lead saved but email failed:", data.emailError);
      else console.log("Lead saved.");
    } catch (err: any) {
      console.error("Lead submission error:", err);
      const detail = err?.message || err?.details || "";
      if (detail.includes("duplicate") || detail.includes("unique") || detail.includes("idx_leads_unique_schedule")) {
        setScheduleError("This time slot was just booked. Please choose another.");
        setStatus("idle");
        return;
      }
      setStatus("error");
      setErrorMsg(detail.includes("Failed to save lead")
        ? "Could not save your request. Please try again."
        : "Something went wrong. Please try again or call us directly.");
    }
  };

  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || isSunday(date);
  };

  return (
    <>
      <SeoHead
        slug="quote"
        fallbackTitle="Get a Free Quote | All Shine Up"
        fallbackDescription="Request a free cleaning quote and schedule your service. Fill in your details and pick a convenient time."
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Cinematic Hero — matches ServiceDetail style */}
        <section className="relative w-full h-[70vh] min-h-[480px] max-h-[700px] overflow-hidden">
          <motion.img
            src="/images/service-residential.jpg"
            alt="Get a Free Quote"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, hsl(30 10% 8% / 0.35) 0%, hsl(30 10% 8% / 0.25) 50%, hsl(30 10% 8% / 0.50) 100%)",
            }}
          />

          <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 lg:px-20 max-w-6xl">
            <motion.p
              className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-white/50 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Free Estimate · All Shine Up
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Get Your Free Quote
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-white/70 max-w-xl mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Fill in your details, choose a convenient time, and we'll confirm your appointment within 24 hours.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-5 mt-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              {trustBadges.map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 text-white/60 text-sm">
                  <badge.icon className="w-4 h-4 text-white/40" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-5 md:px-8">

            {step === 1 ? (
              /* ── STEP 1: side-by-side layout ── */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                {/* Left — info */}
                <motion.div className="flex flex-col justify-center"
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-heading)", color: "hsl(30 15% 30%)" }}>
                    Why choose{" "}
                    <span className="bg-clip-text text-transparent"
                      style={{ backgroundImage: "linear-gradient(135deg, hsl(43 74% 50%), hsl(43 60% 60%))" }}>
                      All Shine Up?
                    </span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Professional cleaning services across Florida's Gulf Coast. Reliable, fast, and committed to exceeding your expectations.
                  </p>
                  <div className="space-y-5">
                    {[
                      { icon: ShieldCheck, title: "Trusted & Insured", desc: "Fully insured with consistent 5-star ratings across the Gulf Coast." },
                      { icon: Phone, title: "Quick Response", desc: "We respond to all quote requests within 24 hours." },
                      { icon: Mail, title: "Transparent Pricing", desc: "No hidden fees, no travel charges. What we quote is what you pay." },
                    ].map((item) => (
                      <div key={item.title} className="flex gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, hsl(43 40% 92%), hsl(43 35% 88%))" }}>
                          <item.icon className="w-5 h-5" style={{ color: "hsl(43 74% 50%)" }} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold mb-0.5" style={{ color: "hsl(30 15% 30%)" }}>{item.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right — form card */}
                <div>
                  {status === "success" ? (
                    <SuccessCard onReset={() => { setStatus("idle"); setStep(1); }} />
                  ) : (
                    <motion.div
                      className="rounded-3xl border border-border bg-card p-7 md:p-10"
                      style={{ boxShadow: "0 8px 40px hsl(30 10% 15% / 0.06), 0 1px 3px hsl(30 10% 15% / 0.03)" }}
                      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <StepBadge num={1} active={true} completed={false} />
                        <div className="flex-1 h-0.5 rounded-full" style={{ background: "hsl(35 15% 90%)" }} />
                        <StepBadge num={2} active={false} completed={false} />
                      </div>

                      <div className="mb-5">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                          Request Your Free Estimate
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1.5 tracking-wide">Step 1 of 2 — Your information</p>
                      </div>

                      <div className="space-y-4">
                        <Field label="Full Name *" error={errors.name}>
                          <input type="text" placeholder="Your full name" value={fields.name} onChange={set("name")} className={inputCls(!!errors.name)} />
                        </Field>
                        <Field label="Email Address *" error={errors.email}>
                          <input type="email" placeholder="your@email.com" value={fields.email} onChange={set("email")} className={inputCls(!!errors.email)} />
                        </Field>
                        <div className="grid grid-cols-2 gap-4">
                          <Field label="Phone *" error={errors.phone}>
                            <input type="tel" placeholder="(555) 000-0000" value={fields.phone} onChange={set("phone")} className={inputCls(!!errors.phone)} />
                          </Field>
                          <Field label="Zip Code *" error={errors.zip_code}>
                            <input type="text" placeholder="34219" value={fields.zip_code} onChange={set("zip_code")} className={inputCls(!!errors.zip_code)} />
                          </Field>
                        </div>
                        <Field label="Square Footage" error={errors.square_footage}>
                          <input type="text" placeholder="e.g. 1200 sqft" value={fields.square_footage} onChange={set("square_footage")} className={inputCls(!!errors.square_footage)} />
                        </Field>
                        <Field label="Additional Details (optional)" error={errors.notes}>
                          <textarea placeholder="Tell us about your space, preferred schedule, or any special requests..." value={fields.notes} onChange={set("notes")} rows={3} className={inputCls(!!errors.notes) + " resize-none"} />
                        </Field>
                      </div>

                      <button onClick={goToStep2}
                        className="w-full mt-6 py-4 rounded-2xl text-base font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2"
                        style={{ background: "var(--gradient-gold)" }}>
                        Continue to Scheduling
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              /* ── STEP 2: stacked layout — title + cards on top, booking below ── */
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {status === "success" ? (
                  <div className="max-w-2xl mx-auto">
                    <SuccessCard onReset={() => { setStatus("idle"); setStep(1); }} />
                  </div>
                ) : (
                  <>
                    {/* Top: Back arrow + Title */}
                    <div className="mb-10">
                      <button
                        onClick={() => setStep(1)}
                        className="flex items-center gap-2 text-sm font-medium mb-4 px-3 py-2 rounded-xl border border-border bg-card hover:bg-accent transition-colors"
                        style={{ color: "hsl(30 12% 50%)" }}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Step 1
                      </button>
                      <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-3"
                          style={{ fontFamily: "var(--font-heading)", color: "hsl(30 15% 30%)" }}>
                          Almost there!
                        </h2>
                        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
                          Pick a date and time that works for you. We'll confirm within 24 hours.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-3xl mx-auto">
                      {[
                        { icon: ShieldCheck, title: "Trusted & Insured", desc: "5-star rated professionals" },
                        { icon: Sparkles, title: "Fast Response", desc: "Confirmed within 24h" },
                        { icon: DollarSign, title: "Transparent Pricing", desc: "No hidden fees ever" },
                        { icon: MapPin, title: "Gulf Coast Coverage", desc: "100+ ZIP codes served" },
                      ].map((item) => (
                        <div key={item.title}
                          className="flex flex-col items-center text-center p-4 rounded-2xl border border-border bg-card"
                          style={{ boxShadow: "0 2px 12px hsl(30 10% 15% / 0.04)" }}>
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                            style={{ background: "linear-gradient(135deg, hsl(43 40% 92%), hsl(43 35% 88%))" }}>
                            <item.icon className="w-4 h-4" style={{ color: "hsl(43 74% 50%)" }} />
                          </div>
                          <h4 className="text-xs font-semibold mb-0.5" style={{ color: "hsl(30 15% 30%)" }}>{item.title}</h4>
                          <p className="text-[11px] text-muted-foreground leading-tight">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Center: Booking card */}
                    <div className="max-w-3xl mx-auto">
                      <motion.div
                        className="rounded-3xl border border-border bg-card p-7 md:p-10"
                        style={{ boxShadow: "0 8px 40px hsl(30 10% 15% / 0.06), 0 1px 3px hsl(30 10% 15% / 0.03)" }}
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                      >
                        {/* Step indicator */}
                        <div className="flex items-center gap-3 mb-8">
                          <StepBadge num={1} active={false} completed={true} onClick={() => setStep(1)} />
                          <div className="flex-1 h-0.5 rounded-full" style={{ background: "hsl(43 74% 50%)" }} />
                          <StepBadge num={2} active={true} completed={false} />
                        </div>

                        <div className="mb-6">
                          <h3 className="text-xl md:text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                            Choose your time
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1.5 tracking-wide">Step 2 of 2</p>
                        </div>

                        {/* Calendar + Time in 2 columns on lg */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                          {/* Calendar */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <CalendarDays className="w-4 h-4" style={{ color: "hsl(43 74% 50%)" }} />
                              <span className="text-sm font-semibold text-foreground">Select a Date</span>
                            </div>
                            <div className="rounded-2xl border border-border p-3 bg-background overflow-hidden"
                              style={{ boxShadow: "0 2px 12px hsl(30 10% 15% / 0.04)" }}>
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(d) => { setSelectedDate(d); setSelectedTime(""); setScheduleError(""); }}
                                disabled={disabledDays}
                                fromDate={new Date()}
                                toDate={addDays(new Date(), 60)}
                                className="pointer-events-auto w-full"
                              />
                            </div>
                          </div>

                          {/* Time slots */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Clock className="w-4 h-4" style={{ color: "hsl(43 74% 50%)" }} />
                              <span className="text-sm font-semibold text-foreground">Select a Time</span>
                            </div>
                            {selectedDate ? (
                              <div className="space-y-5 max-h-[340px] overflow-y-auto pr-1">
                                <div>
                                  <div className="flex items-center gap-2 mb-2.5">
                                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Morning</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    {MORNING_SLOTS.map((time) => {
                                      const booked = (bookedSlots[format(selectedDate, "yyyy-MM-dd")] || []).includes(time);
                                      const sel = selectedTime === time;
                                      return (
                                        <TimeSlotButton key={time} time={time} booked={booked} selected={sel}
                                          onClick={() => { setSelectedTime(time); setScheduleError(""); }} />
                                      );
                                    })}
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-2.5">
                                    <CloudSun className="w-3.5 h-3.5 text-orange-400" />
                                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Afternoon</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    {AFTERNOON_SLOTS.map((time) => {
                                      const booked = (bookedSlots[format(selectedDate, "yyyy-MM-dd")] || []).includes(time);
                                      const sel = selectedTime === time;
                                      return (
                                        <TimeSlotButton key={time} time={time} booked={booked} selected={sel}
                                          onClick={() => { setSelectedTime(time); setScheduleError(""); }} />
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center h-[160px] text-center rounded-2xl border border-dashed border-border bg-muted/20">
                                <CalendarDays className="w-7 h-7 text-muted-foreground/40 mb-2" />
                                <p className="text-sm text-muted-foreground">Select a date to see available times</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Selected summary */}
                        {selectedDate && selectedTime && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="mb-5 p-4 rounded-2xl border flex items-center gap-3"
                            style={{ borderColor: "hsl(43 74% 50% / 0.2)", background: "hsl(43 74% 50% / 0.04)" }}>
                            <CalendarDays className="w-5 h-5 shrink-0" style={{ color: "hsl(43 74% 50%)" }} />
                            <p className="text-sm font-medium text-foreground">
                              {format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
                            </p>
                          </motion.div>
                        )}

                        {scheduleError && (
                          <div className="mb-4 flex items-start gap-2 p-3 rounded-2xl bg-destructive/10 border border-destructive/20">
                            <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                            <p className="text-sm text-destructive">{scheduleError}</p>
                          </div>
                        )}

                        {status === "error" && (
                          <div className="mb-4 flex items-start gap-2 p-3 rounded-2xl bg-destructive/10 border border-destructive/20">
                            <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                            <p className="text-sm text-destructive">{errorMsg}</p>
                          </div>
                        )}

                        {/* CTA */}
                        <button onClick={handleSubmit} disabled={status === "loading" || !selectedDate || !selectedTime}
                          className="w-full py-4 rounded-2xl text-base font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-2 mb-3"
                          style={{ background: "var(--gradient-gold)" }}>
                          {status === "loading" ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                          ) : (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              Confirm Appointment
                            </>
                          )}
                        </button>

                        <button onClick={() => setStep(1)}
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium border border-border bg-background text-muted-foreground hover:bg-muted transition-colors">
                          <ChevronLeft className="w-4 h-4" /> Back to Details
                        </button>

                        <p className="text-xs text-center text-muted-foreground mt-4">
                          🔒 We respect your privacy. No spam, ever.
                        </p>
                      </motion.div>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ── Success Card ── */
function SuccessCard({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-5 py-16 text-center rounded-3xl border border-border bg-card shadow-xl"
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
    >
      <div className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, hsl(145 70% 45%), hsl(160 65% 50%))" }}>
        <CheckCircle className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
        Appointment Requested!
      </h2>
      <p className="text-muted-foreground max-w-sm px-6">
        Thank you! We've received your request and will confirm your appointment soon. Check your inbox for a confirmation email.
      </p>
      <button onClick={onReset}
        className="mt-2 px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
        style={{ background: "var(--gradient-gold)" }}>
        Send Another Request
      </button>
    </motion.div>
  );
}

/* ── Step badge ── */
function StepBadge({ num, active, completed, onClick }: { num: number; active: boolean; completed: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={[
        "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2",
        active
          ? "text-white border-transparent shadow-md"
          : completed
            ? "text-white border-transparent cursor-pointer hover:scale-105"
            : "bg-background text-muted-foreground border-border",
      ].join(" ")}
      style={active || completed ? { background: "var(--gradient-gold)" } : undefined}
    >
      {completed ? <CheckCircle className="w-4 h-4" /> : num}
    </button>
  );
}

/* ── Time Slot Button (pill style) ── */
function TimeSlotButton({ time, booked, selected, onClick }: { time: string; booked: boolean; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      disabled={booked}
      onClick={onClick}
      className={[
        "py-2.5 px-3 rounded-full text-sm font-medium transition-all border text-center",
        booked
          ? "opacity-30 cursor-not-allowed border-border bg-muted text-muted-foreground line-through"
          : selected
            ? "text-white border-transparent shadow-md scale-[1.03]"
            : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5 hover:scale-[1.02]",
      ].join(" ")}
      style={selected ? { background: "var(--gradient-gold)" } : undefined}
    >
      {time}
      {booked && <span className="block text-[9px] no-underline leading-tight mt-0.5">Booked</span>}
    </button>
  );
}

/* ── Field ── */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground/80">{label}</label>
      {children}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full px-4 py-3 rounded-xl text-sm border bg-background text-foreground placeholder:text-muted-foreground",
    "focus:outline-none focus:ring-2 focus:ring-ring transition-colors",
    hasError ? "border-destructive focus:ring-destructive/30" : "border-input",
  ].join(" ");
}
