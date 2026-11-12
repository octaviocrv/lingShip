import type { ReactNode } from "react";

/**
 * Layout do site institucional (landing page). Rotas públicas de divulgação ficam neste grupo.
 *
 * Roda no começo do <body>, antes de a página aparecer: ao recarregar, a home sempre volta ao
 * topo (sem restaurar a rolagem nem pular para a âncora da URL) e liga a abertura ("splash")
 * quando o visitante não pediu menos movimento. Chegando de outra página com âncora (ex.: o
 * "Criar conta" do login aponta para /#planos), a âncora é respeitada. Fica aqui, e não no layout raiz, para não
 * afetar o login e as futuras páginas da plataforma.
 */
const SITE_SCRIPT = [
  `var d=document.documentElement;`,
  `try{history.scrollRestoration="manual"}catch(e){}`,
  `var n=performance.getEntriesByType("navigation")[0];`,
  `if(!location.hash||(n&&n.type==="reload")){`,
  `if(location.hash){history.replaceState(null,"",location.pathname+location.search)}`,
  `window.scrollTo(0,0)}`,
  `if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("splash")}`,
].join("");

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SITE_SCRIPT }} />
      {children}
    </>
  );
}
