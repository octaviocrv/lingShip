import type { Metadata, Viewport } from "next";
import { Lora, Montserrat, Playfair_Display } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

// As mesmas três fontes do protótipo: Lora (títulos), Montserrat (texto) e Playfair Display (logo).
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000"),
  ),
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.subtitle}`,
    description: siteConfig.description,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: "/images/site/vanessa-hero-cafe.jpg" }],
  },
  // Versão em validação: não indexar até a Vanessa aprovar.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#faf7f4",
};

// Roda antes da primeira pintura, em todas as páginas: marca que há JS (só então os
// [data-reveal] começam ocultos). O que é só da home (abertura, voltar ao topo) fica em
// app/(site)/layout.tsx.
const HEAD_SCRIPT = `document.documentElement.classList.add("js");`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${lora.variable} ${montserrat.variable} ${playfair.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
