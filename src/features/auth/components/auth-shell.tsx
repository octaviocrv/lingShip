import type { ReactNode } from "react";
import { Logo } from "@/components/brand/logo";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { AuthShowcase } from "./auth-showcase";

/**
 * Moldura das telas de acesso. Login hoje; cadastro e recuperação de senha podem reaproveitar.
 *
 * Composição fluida, sem posições fixas (medidas em globals.css, bloco "auth-scale"):
 * - a partir de 1024px: grade de duas colunas, 45% foto com borda curva e 55% conteúdo,
 *   como na referência. O painel acompanha a altura da página (no mínimo a da tela), então
 *   com zoom alto nada é cortado: a página só ganha rolagem vertical;
 * - abaixo de 1024px (janela estreita ou zoom forte num notebook): uma coluna, com o logo
 *   acima do formulário e a foto escondida. A versão mobile desenhada fica para depois.
 */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="auth-scale relative grid min-h-svh overflow-x-clip bg-[linear-gradient(180deg,#f5ecf6_0%,#f8f0f4_52%,#f6e9ed_100%)] text-ink-deep lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
      {/* manchas suaves do fundo: lilás no canto superior direito e rosa embaixo */}
      <div
        aria-hidden
        className="auth-fade pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(16vw_36vh_at_100%_16%,rgb(150_110_200/0.12),transparent_72%),radial-gradient(34vw_22vh_at_60%_104%,rgb(221_167_165/0.18),transparent_70%)]"
      />

      <AuthShowcase className="auth-panel hidden lg:flex" />

      <main className="relative flex min-w-0 flex-col items-center justify-center px-[var(--auth-gutter)] py-[clamp(2rem,calc(var(--s)*3.2),4.5rem)]">
        <div className="w-full max-w-[calc(var(--auth-fs)*34.6)]">
          <a
            href={routes.home}
            aria-label={`${siteConfig.name}, voltar ao site`}
            className="auth-in mb-[calc(var(--s)*2.6)] inline-flex rounded-xl lg:hidden"
          >
            <Logo />
          </a>
          {children}
        </div>
      </main>
    </div>
  );
}
