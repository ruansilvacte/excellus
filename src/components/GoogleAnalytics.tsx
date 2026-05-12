import { useEffect } from "react";
import { useSiteSetting } from "@/hooks/useSiteSettings";

export default function GoogleAnalytics() {
  const { data: gaId } = useSiteSetting("google_analytics_id");
  const { data: gscTag } = useSiteSetting("google_search_verification");

  useEffect(() => {
    if (!gaId) return;
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`)) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    const inline = document.createElement("script");
    inline.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(inline);

    return () => {
      script.remove();
      inline.remove();
    };
  }, [gaId]);

  useEffect(() => {
    if (!gscTag) return;
    const existing = document.querySelector('meta[name="google-site-verification"]');
    if (existing) {
      existing.setAttribute("content", gscTag);
      return;
    }
    const meta = document.createElement("meta");
    meta.name = "google-site-verification";
    meta.content = gscTag;
    document.head.appendChild(meta);

    return () => { meta.remove(); };
  }, [gscTag]);

  return null;
}
