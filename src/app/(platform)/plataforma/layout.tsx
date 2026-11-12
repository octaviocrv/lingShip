import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DemoBar } from "@/features/demo/demo-bar";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    template: `%s · ${siteConfig.name} (protótipo)`,
    default: `Plataforma · ${siteConfig.name} (protótipo)`,
  },
  description: "Protótipo de demonstração da plataforma, com conteúdo e números ilustrativos.",
};

/**
 * Plataforma (área do aluno e painel da professora). Protótipo de demonstração:
 * dados fictícios, sem backend e sem login real.
 */
export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Seletor Aluno | Professora, só para a apresentação. Remover esta linha e features/demo/ */}
      <DemoBar />
      {children}
    </>
  );
}
