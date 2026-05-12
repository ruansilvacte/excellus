import { useEffect } from "react";
import { useSiteSetting } from "@/hooks/useSiteSettings";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

export default function FacebookPixel() {
  const { data: pixelId } = useSiteSetting("facebook_pixel_id");

  // Load/remove pixel script
  useEffect(() => {
    if (!pixelId) return;

    // Prevent duplicate
    if (document.getElementById("fb-pixel-script")) return;

    // Init fbq
    const f = window;
    const n = (f.fbq = function (...args: unknown[]) {
      (n as any).callMethod
        ? (n as any).callMethod.apply(n, args)
        : (n as any).queue.push(args);
    });
    (n as any).push = n;
    (n as any).loaded = true;
    (n as any).version = "2.0";
    (n as any).queue = [];
    f._fbq = n;

    const script = document.createElement("script");
    script.id = "fb-pixel-script";
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);

    window.fbq("init", pixelId);
    window.fbq("track", "PageView");

    // Noscript pixel
    const noscript = document.createElement("noscript");
    noscript.id = "fb-pixel-noscript";
    const img = document.createElement("img");
    img.height = 1;
    img.width = 1;
    img.style.display = "none";
    img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    document.body.appendChild(noscript);

    return () => {
      document.getElementById("fb-pixel-script")?.remove();
      document.getElementById("fb-pixel-noscript")?.remove();
    };
  }, [pixelId]);

  // Global click tracking
  useEffect(() => {
    if (!pixelId) return;

    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button, [role='button']");
      if (!target || !window.fbq) return;

      const text = (target as HTMLElement).innerText?.trim().slice(0, 100) || "";
      window.fbq("trackCustom", "ClickButton", {
        text,
        url: window.location.pathname,
      });
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [pixelId]);

  return null;
}
