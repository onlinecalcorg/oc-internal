import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Online Calculators",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1E40AF",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/screenshot1.jpg",
        sizes: "1280x720",
        type: "image/jpeg",
        platform: "wide",
        label: "Home page of Online Calculators",
      },
      {
        src: "/screenshots/screenshot2.jpg",
        sizes: "1280x720",
        type: "image/jpeg",
        platform: "wide",
        label: "Calculator page",
      },
    ],
    orientation: "portrait",
    categories: ["finance", "utilities", "productivity", "tools"],
    lang: "en-US",
    dir: "ltr",
  }
}
