import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useUpdateSiteSetting } from "@/hooks/useSiteSettings";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Save, Layout, MessageSquareQuote, Info, Users, Image, Type, Check } from "lucide-react";
import { toast } from "sonner";
import ImageUploadField from "@/components/admin/ImageUploadField";

const ALL_KEYS = [
  // Hero Banner
  "home_hero_subtitle", "home_hero_title_line1", "home_hero_title_line2", "home_hero_title_line3",
  "home_hero_description",
  // About Cards Section
  "home_about_title", "home_about_text_1", "home_about_image_1",
  // Why It Matters
  "home_why_section_title", "home_why_section_subtitle",
  "home_why_title_1", "home_why_description_1", "home_why_tagline_1",
  "home_why_title_2", "home_why_description_2", "home_why_tagline_2",
  "home_why_title_3", "home_why_description_3", "home_why_tagline_3",
  // Bento Grid Images
  "home_bento_image_1", "home_bento_image_2", "home_bento_image_3",
  "home_bento_image_4", "home_bento_image_5", "home_bento_image_6",
  // Service section header + per-card pitch & CTA label
  "home_services_eyebrow", "home_services_title_part1", "home_services_title_part2",
  "home_card_pitch_airbnb", "home_card_cta_airbnb",
  "home_card_pitch_residential", "home_card_cta_residential",
  "home_card_pitch_commercial", "home_card_cta_commercial",
  "home_card_pitch_deep", "home_card_cta_deep",
  "home_card_pitch_post_construction", "home_card_cta_post_construction",
  "home_card_pitch_platform", "home_card_cta_platform",
  // Testimonials
  "home_testimonial_name_1", "home_testimonial_location_1", "home_testimonial_text_1",
  "home_testimonial_name_2", "home_testimonial_location_2", "home_testimonial_text_2",
  "home_testimonial_name_3", "home_testimonial_location_3", "home_testimonial_text_3",
  "home_testimonial_name_4", "home_testimonial_location_4", "home_testimonial_text_4",
  "home_testimonial_name_5", "home_testimonial_location_5", "home_testimonial_text_5",
  "home_testimonial_name_6", "home_testimonial_location_6", "home_testimonial_text_6",
  // Font scale by section (1.0 = default, range 0.7 – 1.6)
  "home_font_scale_hero", "home_font_scale_about", "home_font_scale_why",
  "home_font_scale_bento", "home_font_scale_testimonials", "home_font_scale_service_buttons",
];

const DEFAULTS: Record<string, string> = {
  home_hero_subtitle: "Experience the freshness of a clean home",
  home_hero_title_line1: "Professional",
  home_hero_title_line2: "Cleaning Services",
  home_hero_title_line3: "For Every Space",
  home_hero_description: "Let All Shine Up transform your home, office, or Airbnb into a pristine haven. Discover our tailored solutions today!",
  home_about_title: "Who We Are",
  home_about_text_1: "All Shine Up is a professional cleaning company based in Parrish, Florida, recognized for operational excellence and commitment to elevated quality standards. Founded and led by Kassandra, our model is driven by efficiency, consistency, and rigorous attention to detail — delivering superior results every time.",
  home_about_image_1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  // Why It Matters
  home_why_section_title: "More Than a Cleaning Service",
  home_why_section_subtitle: "You're investing in consistency, reliability, and peace of mind — not just a cleaning.",
  home_why_title_1: "Trust & Reliability",
  home_why_description_1: "Letting someone into your property requires trust — and we take that seriously. We operate with a high-trust team, clear communication, and proven systems that guarantee accountability.",
  home_why_tagline_1: "Your property is in safe hands",
  home_why_title_2: "Quality & Consistency",
  home_why_description_2: "One of the biggest frustrations in cleaning services is inconsistency. That's why we've built our operation around repeatable systems and detailed checklists tailored for each type of service.",
  home_why_tagline_2: "Consistent results, every single time",
  home_why_title_3: "Peace of Mind",
  home_why_description_3: "Our goal is simple: remove the stress from your routine. With All Shine Up, you don't need to double-check, follow up, or worry about the outcome.",
  home_why_tagline_3: "Focus on what matters — we handle the rest",
  // Bento Grid
  home_bento_image_1: "/images/clean-floor.png",
  home_bento_image_2: "/images/clean-table.png",
  home_bento_image_3: "/images/clean-bedroom.png",
  home_bento_image_4: "/images/clean-bathroom.png",
  home_bento_image_5: "/images/cleaning-window-new.png",
  home_bento_image_6: "/images/clean-laundry.png",
  // Services section header + cards
  home_services_eyebrow: "✦ What We Offer",
  home_services_title_part1: "Professional services for",
  home_services_title_part2: "every need",
  home_card_pitch_airbnb: "Guest-ready turnovers that protect your 5-star rating and Superhost status.",
  home_card_cta_airbnb: "Learn more",
  home_card_pitch_residential: "A pristine home you'll genuinely love coming back to — every single time.",
  home_card_cta_residential: "Learn more",
  home_card_pitch_commercial: "Spotless offices and storefronts that quietly elevate your brand.",
  home_card_cta_commercial: "Learn more",
  home_card_pitch_deep: "Top-to-bottom reset that genuinely changes how your space feels.",
  home_card_cta_deep: "Learn more",
  home_card_pitch_post_construction: "Move-in ready handover after every renovation — final-walkthrough quality.",
  home_card_cta_post_construction: "Learn more",
  home_card_pitch_platform: "One trusted partner connected across Turno, Nextdoor and your hosting tools.",
  home_card_cta_platform: "Get a quote",
  // Testimonials
  home_testimonial_name_1: "Marcus T.", home_testimonial_location_1: "21 February 2025",
  home_testimonial_text_1: "All Shine Up transformed our Airbnb. Every guest comments on how spotless it is. Our reviews went from 4.2 to 4.9 stars since hiring them!",
  home_testimonial_name_2: "Sarah L.", home_testimonial_location_2: "20 February 2025",
  home_testimonial_text_2: "Kassandra and her team are incredible. They clean our vacation rental between every guest and never miss a detail. Truly guest-ready every time.",
  home_testimonial_name_3: "Jennifer K.", home_testimonial_location_3: "20 February 2025",
  home_testimonial_text_3: "We manage 12 short-term rentals and All Shine Up handles all of them. The consistency across properties is remarkable.",
  home_testimonial_name_4: "David R.", home_testimonial_location_4: "18 February 2025",
  home_testimonial_text_4: "The 24-hour guarantee sealed the deal for me. One time I had a concern, they came back same day and fixed it.",
  home_testimonial_name_5: "Michael C.", home_testimonial_location_5: "15 February 2025",
  home_testimonial_text_5: "Their structured process is what sets them apart. You can tell they have checklists — nothing gets missed.",
  home_testimonial_name_6: "Amanda W.", home_testimonial_location_6: "12 February 2025",
  home_testimonial_text_6: "After our renovation, All Shine Up did the post-construction cleanup. They removed every speck of dust and debris.",
  // Font scales
  home_font_scale_hero: "1",
  home_font_scale_about: "1",
  home_font_scale_why: "1",
  home_font_scale_bento: "1",
  home_font_scale_testimonials: "1",
  home_font_scale_service_buttons: "1",
};

function useHomeSettings() {
  return useQuery({
    queryKey: ["site_settings", "home_editor_all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ALL_KEYS);
      if (error) throw error;
      const map: Record<string, string> = {};
      data?.forEach((row) => { map[row.key] = row.value; });
      return map;
    },
    staleTime: 60 * 1000,
  });
}

export default function HomeEditor() {
  const { data: settings, isLoading } = useHomeSettings();
  const update = useUpdateSiteSetting();
  const [values, setValues] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const lastSavedRef = useRef<Record<string, string>>({});

  useEffect(() => {
    if (settings && !loaded) {
      const merged: Record<string, string> = {};
      ALL_KEYS.forEach((k) => { merged[k] = settings[k] || DEFAULTS[k] || ""; });
      setValues(merged);
      lastSavedRef.current = { ...merged };
      setLoaded(true);
    }
  }, [settings, loaded]);

  const set = (key: string, val: string) => setValues((v) => ({ ...v, [key]: val }));
  const get = (key: string) => values[key] || "";

  const handleSave = async (silent = false) => {
    setSaving(true);
    try {
      const toSave = ALL_KEYS.filter((k) => (values[k] ?? "") !== (lastSavedRef.current[k] ?? ""));
      if (toSave.length === 0) {
        if (!silent) toast.info("No changes detected.");
        setSaving(false);
        return;
      }
      for (const key of toSave) {
        await update.mutateAsync({ key, value: values[key] ?? "" });
        lastSavedRef.current[key] = values[key] ?? "";
      }
      setSavedAt(new Date());
      if (!silent) toast.success(`${toSave.length} field(s) saved successfully!`);
    } catch {
      if (!silent) toast.error("Error saving. Please try again.");
    } finally { setSaving(false); }
  };

  const isDirty = ALL_KEYS.some((k) => (values[k] ?? "") !== (lastSavedRef.current[k] ?? ""));

  if (isLoading) {
    return <div className="flex items-center gap-2 text-muted-foreground p-8"><Loader2 className="w-4 h-4 animate-spin" /> Loading...</div>;
  }

  const TextField = ({ k, label, multiline }: { k: string; label: string; multiline?: boolean }) => (
    <div>
      <label className="text-sm font-medium text-foreground mb-1 block">{label}</label>
      {multiline ? (
        <Textarea value={get(k)} onChange={(e) => set(k, e.target.value)} placeholder={DEFAULTS[k] || ""} rows={3} />
      ) : (
        <Input value={get(k)} onChange={(e) => set(k, e.target.value)} placeholder={DEFAULTS[k] || ""} />
      )}
    </div>
  );

  const ImgField = ({ k, label }: { k: string; label: string }) => (
    <ImageUploadField value={get(k)} onChange={(url) => set(k, url)} label={label} />
  );

  const FontScale = ({ k, label }: { k: string; label: string }) => {
    const raw = parseFloat(get(k) || "1");
    const value = isNaN(raw) ? 1 : raw;
    return (
      <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Type className="w-4 h-4 text-accent" /> {label}
          </span>
          <span className="text-xs font-mono text-muted-foreground">{Math.round(value * 100)}%</span>
        </div>
        <Slider
          value={[value]}
          min={0.7}
          max={1.6}
          step={0.05}
          onValueChange={(v) => set(k, String(v[0]))}
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>Smaller</span><span>Default</span><span>Larger</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "hsl(30 10% 15%)" }}>Home Editor</h1>
          <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2">
            Click <strong>Save All</strong> to persist your changes
            {isDirty && !saving && <span className="text-xs text-amber-600">• Unsaved changes</span>}
            {saving && <span className="inline-flex items-center gap-1 text-xs"><Loader2 className="w-3 h-3 animate-spin" /> Saving…</span>}
            {!saving && savedAt && <span className="inline-flex items-center gap-1 text-xs text-green-600"><Check className="w-3 h-3" /> Saved {savedAt.toLocaleTimeString()}</span>}
          </p>
        </div>
        <Button onClick={() => handleSave(false)} disabled={saving} className="gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["hero"]} className="space-y-3">
        {/* ──── HERO BANNER ──── */}
        <AccordionItem value="hero" className="border rounded-2xl border-border/50 shadow-sm overflow-hidden">
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <span className="flex items-center gap-2 text-base font-semibold"><Layout className="w-4 h-4 text-accent" /> Hero Banner</span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 space-y-4">
            <TextField k="home_hero_subtitle" label="Subtitle" />
            <TextField k="home_hero_title_line1" label="Title — Line 1 (white)" />
            <TextField k="home_hero_title_line2" label="Title — Line 2 (gold)" />
            <TextField k="home_hero_title_line3" label="Title — Line 3 (white)" />
            <TextField k="home_hero_description" label="Description" multiline />
            <FontScale k="home_font_scale_hero" label="Font size — Hero" />
          </AccordionContent>
        </AccordionItem>

        {/* ──── ABOUT SECTION ──── */}
        <AccordionItem value="about" className="border rounded-2xl border-border/50 shadow-sm overflow-hidden">
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <span className="flex items-center gap-2 text-base font-semibold"><Users className="w-4 h-4 text-accent" /> About Us Section</span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 space-y-4">
            <ImgField k="home_about_image_1" label="Left Image" />
            <TextField k="home_about_title" label="Section Title" />
            <TextField k="home_about_text_1" label="About paragraph" multiline />
            <FontScale k="home_font_scale_about" label="Font size — About" />
          </AccordionContent>
        </AccordionItem>

        {/* ──── SERVICE TYPE BUTTONS ──── */}
        <AccordionItem value="service_buttons" className="border rounded-2xl border-border/50 shadow-sm overflow-hidden">
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <span className="flex items-center gap-2 text-base font-semibold"><Layout className="w-4 h-4 text-accent" /> Service Type Buttons</span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 space-y-4">
            <div className="rounded-xl bg-muted/30 p-4 text-xs text-muted-foreground">
              <p>The 3 buttons (Airbnb, Commercial, Residential) on the homepage are linked to the <strong>Services</strong> database. Edit titles and pitches there.</p>
            </div>
            <FontScale k="home_font_scale_service_buttons" label="Font size — Service buttons" />
          </AccordionContent>
        </AccordionItem>

        {/* ──── WHY IT MATTERS ──── */}
        <AccordionItem value="why" className="border rounded-2xl border-border/50 shadow-sm overflow-hidden">
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <span className="flex items-center gap-2 text-base font-semibold"><Info className="w-4 h-4 text-accent" /> Why It Matters Section</span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 space-y-4">
            <TextField k="home_why_section_title" label="Section Title" />
            <TextField k="home_why_section_subtitle" label="Section Subtitle" multiline />
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-border/30">
                <CardHeader className="pb-2"><CardTitle className="text-sm">Card {i} — {["🛡️ Trust", "✨ Quality", "🧠 Peace of Mind"][i - 1]}</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <TextField k={`home_why_title_${i}`} label="Title" />
                  <TextField k={`home_why_description_${i}`} label="Description" multiline />
                  <TextField k={`home_why_tagline_${i}`} label="Tagline" />
                </CardContent>
              </Card>
            ))}
            <FontScale k="home_font_scale_why" label="Font size — Why It Matters" />
          </AccordionContent>
        </AccordionItem>

        {/* ──── SERVICE CHECKLIST (info only) ──── */}
        <AccordionItem value="services" className="border rounded-2xl border-border/50 shadow-sm overflow-hidden">
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <span className="flex items-center gap-2 text-base font-semibold"><Image className="w-4 h-4 text-accent" /> Service Checklist Cards (Home)</span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Section header</h4>
              <div className="space-y-3">
                <TextField k="home_services_eyebrow" label="Eyebrow (small label)" />
                <TextField k="home_services_title_part1" label="Title — first part (dark)" />
                <TextField k="home_services_title_part2" label="Title — highlighted part (gold)" />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Hover CTA on each card</h4>
              <p className="text-xs text-muted-foreground mb-3">Edit the mini-pitch shown when the user hovers over a card and the button label.</p>
              <div className="space-y-3">
                {[
                  { key: "airbnb", label: "Airbnb / Short-Term Rental" },
                  { key: "residential", label: "Residential Cleaning" },
                  { key: "commercial", label: "Commercial Cleaning" },
                  { key: "deep", label: "Deep Cleaning" },
                  { key: "post_construction", label: "Post-Construction Cleaning" },
                  { key: "platform", label: "Platform Integrations" },
                ].map((c) => (
                  <Card key={c.key} className="border-border/30">
                    <CardHeader className="pb-2"><CardTitle className="text-sm">{c.label}</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                      <TextField k={`home_card_pitch_${c.key}`} label="Mini-pitch (hover)" multiline />
                      <TextField k={`home_card_cta_${c.key}`} label="CTA button label" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-muted/30 p-4 text-xs text-muted-foreground">
              <p>Card titles, checklist items and images are managed in <strong>Services</strong> in the admin sidebar.</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ──── BENTO GRID IMAGES ──── */}
        <AccordionItem value="bento" className="border rounded-2xl border-border/50 shadow-sm overflow-hidden">
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <span className="flex items-center gap-2 text-base font-semibold"><Image className="w-4 h-4 text-accent" /> Photo Bento Grid</span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 space-y-4">
            <p className="text-xs text-muted-foreground mb-2">Upload or replace the 6 images in the photo grid. Image 6 is mobile-only.</p>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ImgField key={i} k={`home_bento_image_${i}`} label={`Image ${i}${i === 6 ? " (mobile only)" : ""}`} />
              ))}
            </div>
            <FontScale k="home_font_scale_bento" label="Font size — Bento section heading" />
          </AccordionContent>
        </AccordionItem>

        {/* ──── TESTIMONIALS ──── */}
        <AccordionItem value="testimonials" className="border rounded-2xl border-border/50 shadow-sm overflow-hidden">
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <span className="flex items-center gap-2 text-base font-semibold"><MessageSquareQuote className="w-4 h-4 text-accent" /> Testimonials</span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="border-border/30">
                <CardHeader className="pb-2"><CardTitle className="text-sm">Review {i}</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <TextField k={`home_testimonial_name_${i}`} label="Client name" />
                  <TextField k={`home_testimonial_location_${i}`} label="Date" />
                  <TextField k={`home_testimonial_text_${i}`} label="Review text" multiline />
                </CardContent>
              </Card>
            ))}
            <FontScale k="home_font_scale_testimonials" label="Font size — Testimonials" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-end pb-8">
        <Button onClick={() => handleSave(false)} disabled={saving} size="lg" className="gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save All Changes
        </Button>
      </div>
    </div>
  );
}
