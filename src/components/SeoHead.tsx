import { useEffect } from "react";
import { usePageSeo } from "@/hooks/usePageSeo";

interface Props {
  slug: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export default function SeoHead({ slug, fallbackTitle, fallbackDescription }: Props) {
  const { data: seo } = usePageSeo(slug);

  useEffect(() => {
    const title = seo?.meta_title || fallbackTitle || "Navy Cleaning Solutions";
    const description = seo?.meta_description || fallbackDescription || "";
    const ogTitle = seo?.og_title || title;
    const ogDescription = seo?.og_description || description;
    const ogImage = seo?.og_image || "";

    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      if (!content) return;
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", description);
    setMeta("og:title", ogTitle, true);
    setMeta("og:description", ogDescription, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", window.location.href, true);
    if (ogImage) setMeta("og:image", ogImage, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", ogTitle);
    setMeta("twitter:description", ogDescription);
    if (ogImage) setMeta("twitter:image", ogImage);
  }, [seo, fallbackTitle, fallbackDescription]);

  return null;
}
